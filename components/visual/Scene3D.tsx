"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; z: number };

function createSphere(count: number): Point[] {
  const points: Point[] = [];

  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = Math.PI * (3 - Math.sqrt(5)) * i;
    points.push({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
    });
  }

  return points;
}

export default function Scene3D({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const points = createSphere(140);
    const pointer = { x: 0, y: 0 };
    let frame = 0;
    let animation = 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(canvas.clientWidth, 1) * ratio;
      canvas.height = Math.max(canvas.clientHeight, 1) * ratio;
    };

    const onMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - bounds.left) / bounds.width - 0.5;
      pointer.y = (event.clientY - bounds.top) / bounds.height - 0.5;
    };

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      context.clearRect(0, 0, width, height);

      const yaw = (reducedMotion ? 0.8 : frame * 0.007) + pointer.x * 0.9;
      const tilt = pointer.y * 0.7;
      const centerX = width / 2;
      const centerY = height / 2;
      const scale = Math.min(width, height) * 0.34;
      const projected = points.map((point) => {
        const cosYaw = Math.cos(yaw);
        const sinYaw = Math.sin(yaw);
        const x1 = point.x * cosYaw - point.z * sinYaw;
        const z1 = point.x * sinYaw + point.z * cosYaw;
        const cosTilt = Math.cos(tilt);
        const sinTilt = Math.sin(tilt);
        const y2 = point.y * cosTilt - z1 * sinTilt;
        const z2 = point.y * sinTilt + z1 * cosTilt;
        const depth = 2.4 / (2.4 - z2);

        return {
          x: centerX + x1 * scale * depth,
          y: centerY + y2 * scale * depth,
          z: z2,
        };
      });

      for (let i = 0; i < projected.length; i += 1) {
        for (let j = i + 1; j < projected.length; j += 1) {
          const start = projected[i];
          const end = projected[j];
          const distance = Math.hypot(start.x - end.x, start.y - end.y);
          const limit = scale * 0.22;

          if (distance < limit) {
            const alpha = (1 - distance / limit) * 0.6;
            context.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
            context.lineWidth = Math.max(1, width / 900);
            context.beginPath();
            context.moveTo(start.x, start.y);
            context.lineTo(end.x, end.y);
            context.stroke();
          }
        }
      }

      projected.forEach((point) => {
        context.fillStyle =
          point.z > 0 ? "rgba(94, 234, 212, 1)" : "rgba(167, 139, 250, 0.85)";
        context.beginPath();
        context.arc(point.x, point.y, (point.z + 1.5) * (width / 900), 0, Math.PI * 2);
        context.fill();
      });

      frame += 1;
      animation = window.requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointermove", onMove);
    draw();

    return () => {
      window.cancelAnimationFrame(animation);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`block h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}

import Link from "next/link";

export default function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-3 select-none">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#221c4a] text-sm font-bold text-teal-300 shadow-md">
        BA
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-bold tracking-[0.18em] text-[#221c4a]">
          BYTE
        </span>
        <span className="block text-[11px] uppercase tracking-[0.28em] text-gray-500">
          Analytics
        </span>
      </span>
    </Link>
  );
}

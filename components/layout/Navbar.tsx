"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

const navItems = [
  {
    label: "About us",
    submenu: ["Overview", "Careers", "Blog", "Podcast", "FAQs"],
  },
  {
    label: "Our services",
    submenuGroups: [
      {
        title: "AI Consultancy",
        items: ["AI Strategy", "PoC Factory", "Consultancy", "Custom GPT"],
      },
      {
        title: "AI Development",
        items: [
          "GenAI for Business",
          "Agnostic AI",
          "Customer Analytics",
          "Answer Generation",
          "Information Finder",
          "Report Generator",
          "AI Agents",
          "Ai Automation",
        ],
      },
      {
        title: "Data Engineering",
        items: [
          "Data Structuring",
          "Design Architecture",
          "MLOps",
          "Data Migration",
          "Data Governance",
        ],
      },
    ],
  },
  { label: "Our products", href: "/products" },
  {
    label: "AI in industry",
    submenu: [
      "Overview",
      "Ai in Construction",
      "Ai in Finance",
      "Ai in Healthcare",
      "Ai in Real Estate",
      "Ai in Retail",
      "Ai in Natural Resoures",
      "Ai in Marketing",
    ],
  },
  { label: "Case studies", href: "/" },
  { label: "Login", href: "/admin/login" },
];

// ✅ simple submenu route mapping (About us + AI in industry)
const submenuRouteMap: Record<string, Record<string, string>> = {
  "About us": {
    Overview: "/about",
    Careers: "/careers",
    FAQs: "/FAQ",
    Blog: "/blog",
    // Blog / Podcast can be added later if you have routes
  },
  "AI in industry": {
    Overview: "/ai-in-industry",
    "Ai in Construction": "/ai-in-construction",
    "Ai in Finance": "/ai-in-finance",
    "Ai in Healthcare": "/ai-in-healthcare",
    "Ai in Real Estate": "/ai-in-real-estate",
    "Ai in Retail": "/ai-in-retail",
    "Ai in Natural Resoures": "/ai-in-natural-resources",
    "Ai in Marketing": "/ai-in-marketing",
  },
};

// ✅ mapping service labels -> query param keys for agnostic-ai tabs
const tabMap: Record<string, string> = {
  "Customer Analytics": "customer-analytics",
  "Answer Generation": "answer-generator",
  "Information Finder": "information-finder",
  "Report Generator": "report-generator",
  "AI Agents": "ai-agents",
};

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSubGroup, setOpenSubGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setOpenSubGroup(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (label: string) =>
    setOpenMenu((prev) => (prev === label ? null : label));

  const toggleSubGroup = (title: string) =>
    setOpenSubGroup((prev) => (prev === title ? null : title));

  const triggerAgnosticScroll = () => {
    setTimeout(() => {
      window.dispatchEvent(new Event("nav-scroll"));
    }, 180);
  };

  return (
    <nav ref={navRef} className="w-full bg-white sticky top-0 z-[9999]">
      <div className="lg:max-w-[75%] mx-auto px-6 py-3 flex lg:justify-between items-center">
        {/* LOGO */}
        <div className="flex-[1.2] flex justify-center lg:justify-start">
          <Link
            href="/"
            className="cursor-pointer select-none transition hover:opacity-80"
          >
            <Image
              src="/logo.png"
              alt="YourCompany Logo"
              width={180}
              height={80}
              priority
            />
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <div className="flex-[6] hidden lg:flex justify-center">
          <ul className="hidden lg:flex gap-2 items-center text-sm text-gray-700 relative lg:pl-20">
            {navItems.map((item) => (
              <li key={item.label} className="relative">
                {(item.submenu || item.submenuGroups) ? (
                  // items with dropdown
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md transition cursor-pointer ${
                      openMenu === item.label
                        ? "text-gray-700"
                        : "hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-200 ${
                        openMenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  // items without dropdown → direct link
                  <Link
                    href={item.href || "/"}
                    onClick={() => setOpenMenu(null)}
                    className="px-2 py-1 rounded-md hover:text-blue-600 transition cursor-pointer"
                  >
                    {item.label}
                  </Link>
                )}

                {/* SIMPLE DROPDOWN (About us, AI in industry) */}
                {item.submenu && openMenu === item.label && (
                  <div className="absolute top-full left-0 mt-3 w-56 bg-white border border-gray-200 shadow-lg rounded-md py-3 px-2 animate-fadeIn z-50">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub}
                        href={submenuRouteMap[item.label]?.[sub] || "/"}
                        onClick={() => setOpenMenu(null)}
                        className="block text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 hover:text-brand-accent transition"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}

                {/* MULTI-COLUMN DROPDOWN (Our services) */}
                {item.submenuGroups && openMenu === item.label && (
                  <div className="absolute top-full left-0 mt-3 bg-white border border-gray-200 shadow-2xl rounded-md grid grid-cols-3 gap-1 p-6 w-[520px] animate-fadeIn z-50">
                    {item.submenuGroups.map((group) => (
                      <div key={group.title}>
                        <p className="font-semibold text-gray-900 mb-3">
                          {group.title}
                        </p>
                        <ul className="space-y-1">
                          {group.items.map((sub) => (
                            <li key={sub}>
                              {/* agnostic-ai tab items */}
                              {tabMap[sub] ? (
                                <Link
                                  href={`/agnostic-ai?content=${tabMap[sub]}`}
                                  onClick={() => {
                                    setOpenMenu(null);
                                    triggerAgnosticScroll();
                                  }}
                                  className="block text-sm text-gray-700 px-2 py-1.5 rounded-md hover:bg-gray-100 hover:text-brand-accent transition"
                                >
                                  {sub}
                                </Link>
                              ) : (
                                // normal service routes
                                <Link
                                  href={
                                    sub === "AI Strategy"
                                      ? "/ai-strategy"
                                      : sub === "PoC Factory"
                                      ? "/poc-factory"
                                      : sub === "Consultancy"
                                      ? "/Consultancy"
                                      : sub === "Custom GPT"
                                      ? "/custom-gpt"
                                      : sub === "GenAI for Business"
                                      ? "/genai-for-business"
                                      : sub === "Agnostic AI"
                                      ? "/agnostic-ai"
                                      : sub === "Ai Automation"
                                      ? "/automation"
                                      : sub === "Data Structuring"
                                      ? "/data-structuring"
                                      : sub === "Design Architecture"
                                      ? "/design-architecture"
                                      : sub === "MLOps"
                                      ? "/mlops"
                                      : sub === "Data Governance"
                                      ? "/data-governance"
                                      : sub === "Data Migration"
                                      ? "/data-migration"
                                      : "/"
                                  }
                                  onClick={() => setOpenMenu(null)}
                                  className="block text-sm text-gray-700 px-2 py-1.5 rounded-md hover:bg-gray-100 hover:text-brand-accent transition"
                                >
                                  {sub}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT BUTTON */}
        <div className="flex-[1] hidden lg:flex justify-end">
          <button
            onClick={() => {
              router.push("/contact");
            }}
            className="hidden lg:block bg-[#605BAD] text-white text-xs px-5 py-2 rounded-md hover:bg-violet-900 transition-all shadow-md cursor-pointer"
          >
            CONTACT US
          </button>
        </div>

        {/* HAMBURGER (mobile) */}
        <div className="flex lg:hidden justify-end flex-[1] max-w-[10%]">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-[9998]"
            onClick={() => setMobileOpen(false)}
          ></div>

          <div className="fixed top-0 right-0 w-72 h-full bg-white shadow-2xl z-[9999] p-6 overflow-y-auto animate-slideIn">
            <ul className="space-y-2 text-gray-700 font-medium">
              {navItems.map((item) => (
                <li key={item.label}>
                  {(item.submenu || item.submenuGroups) ? (
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className="flex justify-between w-full items-center py-2 px-2 rounded-md hover:bg-gray-100 transition"
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          openMenu === item.label
                            ? "rotate-180 text-brand-accent"
                            : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href || "/"}
                      onClick={() => {
                        setMobileOpen(false);
                        setOpenMenu(null);
                        setOpenSubGroup(null);
                      }}
                      className="block py-2 px-2 rounded-md hover:bg-gray-100 transition"
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* SIMPLE MOBILE SUBMENU (About us, AI in industry) */}
                  {item.submenu && openMenu === item.label && (
                    <ul className="pl-4 py-2 space-y-1">
                      {item.submenu.map((sub) => (
                        <li key={sub}>
                          <Link
                            href={submenuRouteMap[item.label]?.[sub] || "/"}
                            onClick={() => {
                              setMobileOpen(false);
                              setOpenMenu(null);
                              setOpenSubGroup(null);
                            }}
                            className="block px-3 py-1.5 text-sm rounded-md hover:bg-gray-100 transition"
                          >
                            {sub}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* MOBILE GROUPS (Our services) */}
                  {item.submenuGroups && openMenu === item.label && (
                    <div className="pl-4 py-2 space-y-1">
                      {item.submenuGroups.map((group) => (
                        <div key={group.title}>
                          <button
                            onClick={() => toggleSubGroup(group.title)}
                            className="flex justify-between w-full items-center text-sm font-semibold py-1.5 px-2 rounded-md hover:bg-gray-100"
                          >
                            {group.title}
                            <ChevronDown
                              size={14}
                              className={`transition-transform duration-200 ${
                                openSubGroup === group.title
                                  ? "rotate-180 text-brand-accent"
                                  : ""
                              }`}
                            />
                          </button>

                          {openSubGroup === group.title && (
                            <ul className="pl-3 py-1 space-y-1">
                              {group.items.map((sub) => (
                                <li key={sub}>
                                  {tabMap[sub] ? (
                                    <Link
                                      href={`/agnostic-ai?content=${tabMap[sub]}`}
                                      onClick={() => {
                                        setMobileOpen(false);
                                        setOpenMenu(null);
                                        setOpenSubGroup(null);
                                        triggerAgnosticScroll();
                                      }}
                                      className="block text-sm px-3 py-1.5 rounded-md hover:bg-gray-100 transition"
                                    >
                                      {sub}
                                    </Link>
                                  ) : (
                                    <Link
                                      href={
                                        sub === "AI Strategy"
                                          ? "/ai-strategy"
                                          : sub === "PoC Factory"
                                          ? "/poc-factory"
                                          : sub === "Consultancy"
                                          ? "/Consultancy"
                                          : sub === "Custom GPT"
                                          ? "/custom-gpt"
                                          : sub === "GenAI for Business"
                                          ? "/genai-for-business"
                                          : sub === "Agnostic AI"
                                          ? "/agnostic-ai"
                                          : sub === "Ai Automation"
                                          ? "/automation"
                                          : sub === "Data Structuring"
                                          ? "/data-structuring"
                                          : sub === "Design Architecture"
                                          ? "/design-architecture"
                                          : sub === "MLOps"
                                          ? "/mlops"
                                          : sub === "Data Governance"
                                          ? "/data-governance"
                                          : sub === "Data Migration"
                                          ? "/data-migration"
                                          : "/"
                                      }
                                      onClick={() => {
                                        setMobileOpen(false);
                                        setOpenMenu(null);
                                        setOpenSubGroup(null);
                                      }}
                                      className="block text-sm px-3 py-1.5 rounded-md hover:bg-gray-100 transition"
                                    >
                                      {sub}
                                    </Link>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </nav>
  );
}


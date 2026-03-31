"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useEscapeKey } from "@/hooks/useEscapeKey";

const NAV_LINKS = [
  { label: "HOME", href: "https://mdnpublicidad.com/italymarble" },
  {
    label: "SERVICES",
    href: "https://mdnpublicidad.com/italymarble/services/",
  },
  { label: "GALLERY", href: "https://mdnpublicidad.com/italymarble/gallery/" },
  { label: "LIVE INVENTORY", href: "/" },
  { label: "CONTACT", href: "https://mdnpublicidad.com/italymarble/contact/" },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useBodyScrollLock(drawerOpen);
  useEscapeKey(closeDrawer);

  return (
    <>
      <nav className="w-full z-50 bg-[#1b1b1b]">
        <div className="flex justify-between items-center w-full px-5 lg:px-0  py-4.5 max-w-285 mx-auto ">
          {/* Logo */}
          <Link
            href="https://www.mdnpublicidad.com/italymarble"
            className="pl-1"
          >
            <Image
              src="/brand-logo.webp"
              alt="Brand Logo"
              width={117}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex gap-7.5 font-headline uppercase  text-sm items-center pr-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white transition-colors hover:text-white/70  font-medium text-[17px]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Hamburger button (mobile only) */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-12 h-7 border border-surface  gap-[4px]"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block w-7 h-px bg-white transition-all duration-300 origin-center ${
                drawerOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`block w-7 h-px bg-white transition-all duration-300 ${
                drawerOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-7 h-px bg-white transition-all duration-300 origin-center ${
                drawerOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-white/10 transition-all duration-1000 md:hidden ${
          drawerOpen ? "translate-x-0" : "delay-200 -translate-x-100"
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-76 bg-white shadow-xl  transition-transform duration-800 ease-in-out md:hidden flex flex-col ${
          drawerOpen ? "delay-400 translate-x-0" : "delay-0 -translate-x-100"
        }`}
      >
        {/* Drawer header with logo */}
        <div className="px-6 py-3 ">
          <Link href="#" onClick={closeDrawer}>
            <Image
              src="/brand-logo-dark.webp"
              alt="Brand Logo"
              width={120}
              height={36}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Drawer nav links */}
        <nav className="flex flex-col px-6 py-8 gap-6 font-headline font-medium uppercase  text-[17px]">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeDrawer}
              className={`transition-colors ${
                i === 0 ? "text-gray-400" : "text-gray-900 hover:text-gray-600"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}

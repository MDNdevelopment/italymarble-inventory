import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full z-50 bg-[#131313]/60 backdrop-blur-xl bg-linear-to-b from-[#1c1b1b] to-transparent">
      <div className="flex justify-between items-center w-full px-12 py-6 max-w-285 mx-auto">
        <div className="text-2xl font-bold tracking-tight text-white font-headline">
          STONE GALLERY
        </div>
        <div className="hidden md:flex gap-12 font-['Plus_Jakarta_Sans'] uppercase tracking-[0.15em] text-sm items-center">
          <a className="text-white transition-colors" href="#">
            HOME
          </a>

          <a className="text-white transition-colors" href="#">
            SERVICES
          </a>
          <a className="text-white transition-colors" href="#">
            GALLERY
          </a>
          <a className="text-white border-white pb-1" href="#">
            LIVE INVENTORY
          </a>
          <a className="text-white transition-colors" href="#">
            CONTACT
          </a>
        </div>
      </div>
    </nav>
  );
}

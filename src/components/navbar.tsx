export default function Navbar() {
  return (
    <nav className="w-full z-50 bg-[#131313]/60 backdrop-blur-xl bg-gradient-to-b from-[#1c1b1b] to-transparent">
      <div className="flex justify-between items-center w-full px-12 py-6 max-w-[1920px] mx-auto">
        <div className="text-2xl font-bold tracking-tight text-white font-headline">
          STONE GALLERY
        </div>
        <div className="hidden md:flex gap-12 font-['Plus_Jakarta_Sans'] uppercase tracking-[0.15em] text-sm items-center">
          <a
            className="text-white/60 hover:text-white transition-colors"
            href="#"
          >
            HOME
          </a>
          <a className="text-white border-b border-white pb-1" href="#">
            CATALOG
          </a>
          <a
            className="text-white/60 hover:text-white transition-colors"
            href="#"
          >
            SERVICES
          </a>
          <a
            className="text-white/60 hover:text-white transition-colors"
            href="#"
          >
            CONTACT
          </a>
        </div>
        <div className="flex gap-8 items-center text-white">
          <button className="hover:opacity-80 transition-opacity duration-300 scale-95 active:scale-90 transition-transform">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
          <button className="hover:opacity-80 transition-opacity duration-300 scale-95 active:scale-90 transition-transform">
            <span className="material-symbols-outlined">person</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

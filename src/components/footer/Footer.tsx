export default function Footer() {
  return (
    <footer className="bg-surface border-t border-outline-variant mt-24">
      <div className="max-w-[1440px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-xl font-bold tracking-tight text-on-background font-headline mb-4">
              STONE GALLERY
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Premium natural stone sourced from the finest quarries in Italy,
              Brazil, and India. Curated for architects and interior designers.
            </p>
            <div className="flex gap-4 mt-6">
              {["instagram", "pinterest", "houzz"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-on-surface-variant hover:text-primary transition-colors capitalize text-xs tracking-widest"
                >
                  {s.toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-on-background text-xs font-semibold tracking-[0.18em] uppercase mb-6">
              Collections
            </h3>
            <ul className="space-y-3">
              {["Marble", "Granite", "Quartzite", "Limestone", "Travertine", "Onyx"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-on-surface-variant hover:text-on-surface text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-on-background text-xs font-semibold tracking-[0.18em] uppercase mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {[
                "Custom Fabrication",
                "Project Consulting",
                "Sample Library",
                "Installation Network",
                "Trade Program",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-on-surface-variant hover:text-on-surface text-sm transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-on-background text-xs font-semibold tracking-[0.18em] uppercase mb-6">
              Contact
            </h3>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">
                  location_on
                </span>
                <span>
                  Via della Pietra 42
                  <br />
                  Milano, 20121 Italy
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px] text-primary">
                  call
                </span>
                <span>+39 02 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px] text-primary">
                  mail
                </span>
                <span>info@stonegallery.it</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant text-xs">
            © 2026 Stone Gallery S.r.l. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-on-surface-variant hover:text-on-surface text-xs transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

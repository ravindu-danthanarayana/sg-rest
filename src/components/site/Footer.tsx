import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-forest-deep text-white/85">
      <div className="container-narrow grid gap-12 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="heading-display text-3xl text-white">
            Sungreen <span className="text-gold">Habarana</span>
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
            A nature-inspired dining sanctuary nestled within the heart of Habarana — where
            authentic Sri Lankan flavours meet modern luxury hospitality.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition-colors hover:border-gold hover:text-gold">
              <Instagram size={16} />
            </a>
            <a href="#" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition-colors hover:border-gold hover:text-gold">
              <Facebook size={16} />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              { to: "/menu", label: "Our Menu" },
              { to: "/about", label: "About Us" },
              { to: "/reservation", label: "Reservations" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-white/75 transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Visit</p>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            <li className="flex gap-3"><MapPin size={16} className="mt-0.5 text-gold" /> Habarana, Sri Lanka</li>
            <li className="flex gap-3"><Phone size={16} className="mt-0.5 text-gold" /> +94 66 227 0000</li>
            <li className="flex gap-3"><Mail size={16} className="mt-0.5 text-gold" /> dine@sungreenhabarana.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-narrow flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} Sungreen Habarana Restaurant. All rights reserved.</p>
          <p>Designed & Developed by{" "}
            <a
              href="https://www.linkedin.com/in/ravindudanthanarayana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold transition-colors hover:text-white"
            >
              Ravindu Danthanarayana
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

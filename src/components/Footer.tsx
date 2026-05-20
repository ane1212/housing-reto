import React, { useState } from "react";
 
/* ────────────────────────────────────────────────────────────────────────────
 *  Types
 * ────────────────────────────────────────────────────────────────────────── */
 
export interface FooterLink {
  label: string;
  href: string;
}
 
export interface FooterColumn {
  title: string;
  links: FooterLink[];
}
 
export interface SocialLink {
  name: "twitter" | "instagram" | "facebook" | "linkedin" | "youtube";
  href: string;
}
 
interface PropertyFooterProps {
  /** Brand name shown in the footer. */
  brandName?: string;
  /** Tagline displayed under the brand. */
  tagline?: string;
  /** Navigation columns. Defaults to a real-estate portal layout. */
  columns?: FooterColumn[];
  /** Social media links. */
  socials?: SocialLink[];
  /** Available languages. */
  languages?: { code: string; label: string }[];
  /** Currently selected language code. */
  currentLanguage?: string;
  /** Called when the user changes the language. */
  onLanguageChange?: (code: string) => void;
  /** Called when the user submits the newsletter form. */
  onNewsletterSubmit?: (email: string) => void;
}
 
/* ────────────────────────────────────────────────────────────────────────────
 *  Default content (real-estate portal style)
 * ────────────────────────────────────────────────────────────────────────── */
 
const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Comprar",
    links: [
      { label: "Pisos en venta", href: "/comprar/pisos" },
      { label: "Casas y chalets", href: "/comprar/casas" },
      { label: "Obra nueva", href: "/comprar/obra-nueva" },
      { label: "Áticos", href: "/comprar/aticos" },
      { label: "Locales comerciales", href: "/comprar/locales" },
    ],
  },
  {
    title: "Alquilar",
    links: [
      { label: "Pisos en alquiler", href: "/alquilar/pisos" },
      { label: "Habitaciones", href: "/alquilar/habitaciones" },
      { label: "Alquiler vacacional", href: "/alquilar/vacacional" },
      { label: "Oficinas", href: "/alquilar/oficinas" },
    ],
  },
  {
    title: "Profesionales",
    links: [
      { label: "Inmobiliarias", href: "/profesionales/inmobiliarias" },
      { label: "Publicar anuncio", href: "/publicar" },
      { label: "Tasaciones", href: "/tasaciones" },
      { label: "Hipotecas", href: "/hipotecas" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre nosotros", href: "/about" },
      { label: "Prensa", href: "/prensa" },
      { label: "Trabaja con nosotros", href: "/empleo" },
      { label: "Contacto", href: "/contacto" },
      { label: "Blog", href: "/blog" },
    ],
  },
];
 
const DEFAULT_SOCIALS: SocialLink[] = [
  { name: "twitter", href: "https://twitter.com" },
  { name: "instagram", href: "https://instagram.com" },
  { name: "facebook", href: "https://facebook.com" },
  { name: "linkedin", href: "https://linkedin.com" },
  { name: "youtube", href: "https://youtube.com" },
];
 
const DEFAULT_LANGUAGES = [
  { code: "es", label: "Español" },
  { code: "ca", label: "Català" },
  { code: "eu", label: "Euskara" },
  { code: "gl", label: "Galego" },
  { code: "en", label: "English" },
];
 
const LEGAL_LINKS: FooterLink[] = [
  { label: "Aviso legal", href: "/legal" },
  { label: "Política de privacidad", href: "/privacidad" },
  { label: "Política de cookies", href: "/cookies" },
  { label: "Condiciones de uso", href: "/condiciones" },
  { label: "Accesibilidad", href: "/accesibilidad" },
];
 
/* ────────────────────────────────────────────────────────────────────────────
 *  Social icons (inline SVG)
 * ────────────────────────────────────────────────────────────────────────── */
 
const SocialIcon: React.FC<{ name: SocialLink["name"] }> = ({ name }) => {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true as const,
  };
 
  switch (name) {
    case "twitter":
      return (
        <svg {...common}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
  }
};
 
/* ────────────────────────────────────────────────────────────────────────────
 *  Component
 * ────────────────────────────────────────────────────────────────────────── */
 
const PropertyFooter: React.FC<PropertyFooterProps> = ({
  brandName = "VALORA",
  tagline = "Predicción de Alquiler",
  columns = DEFAULT_COLUMNS,
  socials = DEFAULT_SOCIALS,
  languages = DEFAULT_LANGUAGES,
  currentLanguage = "es",
  onLanguageChange,
  onNewsletterSubmit,
}) => {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const currentYear = new Date().getFullYear();
 
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onNewsletterSubmit?.(email.trim());
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };
 
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLanguageChange?.(e.target.value);
  };
 
  return (
    <footer role="contentinfo" aria-label="Pie de página">
      {/* Brand + newsletter */}
      <section aria-labelledby="footer-brand">
        <div>
          <h2 id="footer-brand">{brandName}</h2>
          <p>{tagline}</p>
        </div>
 
        <form onSubmit={handleNewsletterSubmit} aria-label="Suscripción al boletín">
          <label htmlFor="footer-newsletter">
            Recibe nuevos inmuebles en tu correo
          </label>
          <div>
            <input
              id="footer-newsletter"
              type="email"
              required
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="newsletter-status"
            />
            <button type="submit">Suscribirme</button>
          </div>
          <p id="newsletter-status" role="status" aria-live="polite">
            {submitted ? "¡Gracias por suscribirte!" : ""}
          </p>
        </form>
      </section>
 
      {/* Navigation columns */}
      <nav aria-label="Enlaces del pie de página">
        <ul>
          {columns.map((column) => (
            <li key={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
 
      {/* Utility row: language + socials */}
      <section aria-label="Idioma y redes sociales">
        <div>
          <label htmlFor="footer-language">Idioma:</label>
          <select
            id="footer-language"
            value={currentLanguage}
            onChange={handleLanguageChange}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
 
        <ul aria-label="Redes sociales">
          {socials.map((social) => (
            <li key={social.name}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <SocialIcon name={social.name} />
              </a>
            </li>
          ))}
        </ul>
      </section>
 
      {/* Legal bar */}
      <section aria-label="Información legal">
        <ul>
          {LEGAL_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <p>
          © {currentYear} {brandName}. Todos los derechos reservados.
        </p>
      </section>
    </footer>
  );
};
 
export default PropertyFooter;
 
/* ────────────────────────────────────────────────────────────────────────────
 *  Usage example
 * ────────────────────────────────────────────────────────────────────────────
 *
 *  import PropertyFooter from "./PropertyFooter";
 *
 *  function App() {
 *    return (
 *      <PropertyFooter
 *        brandName="Habitat"
 *        onNewsletterSubmit={(email) => console.log("Suscrito:", email)}
 *        onLanguageChange={(code) => console.log("Idioma:", code)}
 *      />
 *    );
 *  }
 *
 * ──────────────────────────────────────────────────────────────────────── */
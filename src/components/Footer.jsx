import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Footer.css";
import Logo from "../assets/LogoBranca.png";
import {
  FaWhatsapp, FaLinkedin, FaInstagram,
  FaEnvelope, FaGithub, FaCheckCircle,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const links = {
  Produto:  ["E-commerce", "Sites institucionais", "Agendamentos", "Aplicativos"],
  Empresa:  ["Sobre nós", "Projetos", "Carreira", "Clientes"],
  Suporte:  ["Email", "Central de ajuda", "Status", "Contato"],
  Legal:    ["Privacidade", "Termos de uso", "Cookies", "Licenças"],
};

const socials = [
  // { Icon: FaXTwitter,  href: "#",                                   label: "Twitter / X"  },
  // { Icon: FaGithub,    href: "#",                                   label: "GitHub"       },
  // { Icon: FaLinkedin,  href: "#",                                   label: "LinkedIn"     },
  { Icon: FaWhatsapp,  href: "https://wa.me/5584996002433",         label: "WhatsApp"     },
  { Icon: FaInstagram, href: "https://instagram.com/alison_tkd",    label: "Instagram"    },
  { Icon: FaEnvelope,  href: "mailto:ryanalison2020@gmail.com",     label: "E-mail"       },
];

export default function Footer() {
  const [email, setEmail]           = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError]           = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) { setError(true); return; }
    setSubscribed(true);
    setEmail("");
    setError(false);
  };

  return (
    <footer className="footer">
      <div className="footer__container">

        {/* ── TOP ── */}
        <div className="footer__top">

          {/* Brand col */}
          <div className="footer__brand">
            <img src={Logo} alt="CodeWave" className="footer__logo" />
            <p className="footer__tagline">
              Construindo sites que transformam empresas e constroem o futuro.
            </p>
            <div className="footer__socials">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="footer__social"
                  whileHover={{ scale: 1.15, borderColor: "var(--verde)", color: "var(--verde)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links grid */}
          <div className="footer__links-grid">
            {Object.entries(links).map(([category, items]) => (
              <div key={category} className="footer__link-group">
                <p className="footer__link-category">{category}</p>
                <ul className="footer__link-list">
                  {items.map((item) => (
                    <li key={item}>
                      <a href="#" className="footer__link">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── NEWSLETTER ── */}
        <div className="footer__newsletter">
          <div className="footer__newsletter-text">
            <p className="footer__newsletter-title">Fique por dentro</p>
            <p className="footer__newsletter-sub">
              Novidades, atualizações e artigos enviados direto para você.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {subscribed ? (
              <motion.div
                key="ok"
                className="footer__subscribed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <FaCheckCircle size={16} color="var(--verde)" />
                Inscrito com sucesso!
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="footer__form"
                onSubmit={handleSubscribe}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(false); }}
                  className={`footer__input ${error ? "footer__input--error" : ""}`}
                />
                <button type="submit" className="footer__subscribe-btn">
                  Inscrever
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* ── DIVIDER ── */}
        <div className="footer__divider" />

        {/* ── BOTTOM ── */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} CodeWave. Todos os direitos reservados. Desenvolvido por{" "}
            <span>Alison Ryan</span>.
          </p>
          <div className="footer__bottom-links">
            {["Privacidade", "Termos", "Cookies"].map((item) => (
              <a key={item} href="#" className="footer__bottom-link">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
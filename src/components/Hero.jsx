import "../styles/Hero.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Alison from "../assets/Eu.png";
import { FaWhatsapp, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

const ROLES = ["Programador Front-end", "React Developer", "UI/UX Enthusiast"];

const socialLinks = [
  { Icon: FaWhatsapp,  href: "https://wa.me/5584996002433",       label: "WhatsApp", color: "#25D366" },
  { Icon: FaLinkedin,  href: "#",                                  label: "LinkedIn", color: "#0A66C2" },
  { Icon: FaInstagram, href: "https://instagram.com/alison_tkd",   label: "Instagram", color: "#E1306C" },
  { Icon: FaEnvelope,  href: "mailto:ryanalison2020@gmail.com",    label: "E-mail",   color: "#EA4335" },
];

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const delay = deleting ? speed / 2 : charIdx === current.length ? pause : speed;

    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setWordIdx(i => (i + 1) % words.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay } },
});

const fadeLeft = {
  hidden: { opacity: 0, x: 80, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.9, ease: "easeOut", delay: 0.2 } },
};

export default function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <section className="hero">
      {/* grid background */}
      <div className="hero__grid" aria-hidden="true" />

      {/* glow orb */}
      <div className="hero__orb" aria-hidden="true" />

      <div className="hero__content">
        {/* ── LEFT ── */}
        <div className="hero__left">

          <motion.div className="hero__badge" initial="hidden" animate="visible" variants={fadeUp(0)}>
            <span className="hero__badge-dot" />
            Disponível para projetos
          </motion.div>

          <motion.p className="hero__greeting" initial="hidden" animate="visible" variants={fadeUp(0.1)}>
            <span className="hero__greeting-line" />
            Olá, eu sou
          </motion.p>

          <motion.h1 className="hero__name" initial="hidden" animate="visible" variants={fadeUp(0.2)}>
            Alison <br id="pular_linha"/>
            <span className="hero__name-accent">Ryan</span>
          </motion.h1>

          <motion.div className="hero__role" initial="hidden" animate="visible" variants={fadeUp(0.35)}>
            <span className="hero__role-prefix">// </span>
            <span className="hero__role-text">{role}</span>
            <span className="hero__cursor" aria-hidden="true">|</span>
          </motion.div>

          <motion.p className="hero__desc" initial="hidden" animate="visible" variants={fadeUp(0.45)}>
            Transformo ideias em interfaces rápidas, acessíveis e memoráveis.
          </motion.p>

          {/* social icons */}
          <motion.div className="hero__socials" initial="hidden" animate="visible" variants={fadeUp(0.55)}>
            {socialLinks.map(({ Icon, href, label, color }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hero__icon"
                whileHover={{ scale: 1.15, borderColor: color }}
                whileTap={{ scale: 0.9 }}
                style={{ "--icon-color": color }}
              >
                <Icon size={20} color="#fff" />
              </motion.a>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div className="hero__ctas" initial="hidden" animate="visible" variants={fadeUp(0.65)}>
            <a href="#projetos" className="hero__btn hero__btn--primary">Ver Projetos</a>
            <a href="mailto:ryanalison2020@gmail.com" className="hero__btn hero__btn--ghost">Fale Comigo</a>
          </motion.div>
        </div>

        {/* ── RIGHT ── */}
        <motion.div className="hero__right" initial="hidden" animate="visible" variants={fadeLeft}>
          <div className="hero__img-frame">
            <div className="hero__img-glow" />
            <img src={Alison} alt="Alison Ryan — Front-end Developer" className="hero__img" />
            <div className="hero__img-border" />
          </div>

          {/* floating tag */}
          <motion.div
            className="hero__tag"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <span className="hero__tag-dot" />
            Front-end Dev
          </motion.div>
        </motion.div>
      </div>

      {/* bottom scroll hint */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <span>scroll</span>
        <div className="hero__scroll-line" />
      </motion.div>
    </section>
  );
}
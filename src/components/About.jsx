import { motion } from "framer-motion";
import { FaDownload, FaWhatsapp, FaCode } from "react-icons/fa";
import foto from "../assets/Eu.png";
import "../styles/About.css";

const skills = ["React", "JavaScript", "TypeScript", "CSS", "HTML", "Node.js", "PHP", "WordPress", "Git"];

const stats = [
  { value: "2+",  label: "Anos de exp." },
  { value: "20+", label: "Projetos" },
  { value: "15+", label: "Clientes" },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay } },
});

export default function About() {
  return (
    <section className="about" id="sobre">
      {/* ── Image col ── */}
      <motion.div
        className="about__img-col"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="about__img-frame">
          <div className="about__img-glow" />
          <img src={foto} alt="Alison Ryan" className="about__img" />

          {/* corner accents */}
          <span className="about__corner about__corner--tl" />
          <span className="about__corner about__corner--br" />
        </div>

        {/* floating available badge */}
        <motion.div
          className="about__available"
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <span className="about__available-dot" />
          Disponível para projetos
        </motion.div>

        {/* floating code badge */}
        <motion.div
          className="about__code-badge"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
        >
          <FaCode size={12} color="var(--verde)" />
          Front-end Dev
        </motion.div>
      </motion.div>

      {/* ── Content col ── */}
      <div className="about__content">
        <motion.p
          className="about__eyebrow"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp(0)}
        >
          // sobre mim
        </motion.p>

        <motion.h2
          className="about__title"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp(0.1)}
        >
          Olá, sou o{" "}
          <span className="about__title-accent">Alison Ryan</span>
        </motion.h2>

        <motion.p
          className="about__desc"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp(0.2)}
        >
          Programador Front-end apaixonado por criar experiências digitais bonitas e
          funcionais. Trabalho com React, JavaScript, Node.js, PHP e WordPress para
          transformar ideias em interfaces que as pessoas amam usar.
          Sempre em busca de novos desafios e projetos que façam diferença.
        </motion.p>

        {/* stats */}
        <motion.div
          className="about__stats"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp(0.3)}
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="about__stat">
              <strong className="about__stat-value">{value}</strong>
              <span className="about__stat-label">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* skills */}
        <motion.div
          className="about__skills"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp(0.4)}
        >
          {skills.map((s, i) => (
            <motion.span
              key={s}
              className="about__skill"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.08 }}
            >
              {s}
            </motion.span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="about__btns"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp(0.55)}
        >
          <a href="/cv-alison.pdf" download className="about__btn about__btn--primary">
            <FaDownload size={13} /> Baixar CV
          </a>
          <a
            href="https://wa.me/5584996002433"
            target="_blank"
            rel="noopener noreferrer"
            className="about__btn about__btn--secondary"
          >
            <FaWhatsapp size={14} /> Me contate
          </a>
        </motion.div>
      </div>
    </section>
  );
}
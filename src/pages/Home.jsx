import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Project from "../components/Project.jsx";
import projects from "../data/Sites.json";
import "../styles/Home.css";
import CodeBackground from "../components/CodeBackground.jsx";
import { FaExternalLinkAlt } from "react-icons/fa";
import ContactForm from "../components/ContactForm.jsx";
import About from "../components/About.jsx";
import Footer from "../components/Footer.jsx";

function Home() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const categories = useMemo(() => {
    const cats = projects.map((p) => p.categoria).filter(Boolean);
    return ["Todos", ...Array.from(new Set(cats))];
  }, []);

  const filtered = useMemo(() => {
    const pool = activeFilter === "Todos" ? projects : projects.filter((p) => p.categoria === activeFilter);
    return pool.slice(0, 6);
  }, [activeFilter]);

  return (
    <>
      <Header />
      <Hero />
      <CodeBackground />

      <main>
        {/* ── Projects section ── */}
        <section className="projects-section" id="projetos">

          {/* Section heading */}
          <div className="section-heading">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="section-eyebrow"> meu trabalho</p>
              <h2 className="section-title">
                Meus <span className="section-title-accent">Projetos</span>
              </h2>
              <p className="section-subtitle">
                Uma seleção dos projetos que desenvolvi com foco em performance e design.
              </p>
            </motion.div>
          </div>

          {/* Filters */}
          {categories.length > 1 && (
            <motion.div
              className="filter-bar"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${activeFilter === cat ? "filter-btn--active" : ""}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}

          {/* Cards grid */}
          <div className="cards-grid">
            {filtered.map((project, i) => (
              <Project key={project.id} project={project} index={i} />
            ))}
          </div>

          {/* See all CTA */}
          <motion.div
            className="projects-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button className="btn-see-all">
              Ver todos os projetos
              <FaExternalLinkAlt size={12} />
            </button>
          </motion.div>
        </section>

        <About />
        <ContactForm />
      </main>

      <hr className="section-divider" />
      <Footer />
    </>
  );
}

export default Home;
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Project.css";
import { FaExternalLinkAlt, FaCode, FaTimes, FaLayerGroup } from "react-icons/fa";

export default function ProjectCard({ project, index = 0 }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { titulo, imagem, categoria, link, descricao, tecnologias } = project;

  return (
    <>
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      >
        {/* Image + overlay */}
        <div className="card__img-wrap">
          <img src={imagem} alt={titulo} className="card__img" />
          <div className="card__overlay">
            <a href={link} target="_blank" rel="noreferrer" className="card__overlay-btn">
              <FaExternalLinkAlt size={14} /> Ver site
            </a>
            <button className="card__overlay-btn card__overlay-btn--ghost" onClick={() => setModalOpen(true)}>
              <FaCode size={14} /> Detalhes
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="card__body">
          <span className="card__category">{categoria}</span>
          <h3 className="card__title">{titulo}</h3>
          <p className="card__desc">{descricao?.slice(0, 72)}…</p>

          <div className="card__tech-row">
            {tecnologias?.slice(0, 3).map((t) => (
              <span key={t} className="card__tech-pill">{t}</span>
            ))}
            {tecnologias?.length > 3 && (
              <span className="card__tech-pill card__tech-pill--more">+{tecnologias.length - 3}</span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.88, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 30 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="modal__header">
                <div className="modal__title-wrap">
                  <FaLayerGroup size={18} color="var(--verde)" />
                  <h2 className="modal__title">{titulo}</h2>
                </div>
                <button className="modal__close" onClick={() => setModalOpen(false)} aria-label="Fechar">
                  <FaTimes size={14} />
                </button>
              </div>

              {/* Image */}
              <div className="modal__img-wrap">
                <img src={imagem} alt={titulo} className="modal__img" />
                <span className="modal__category-badge">{categoria}</span>
              </div>

              {/* Desc */}
              <p className="modal__desc">{descricao}</p>

              {/* Footer */}
              <div className="modal__footer">
                <div className="modal__tags-section">
                  <span className="modal__label">
                    <FaCode size={10} /> Tecnologias
                  </span>
                  <div className="modal__tags">
                    {tecnologias.map((t) => (
                      <span key={t} className="modal__tag">{t}</span>
                    ))}
                  </div>
                </div>

                <a href={link} target="_blank" rel="noreferrer" className="modal__cta">
                  <FaExternalLinkAlt size={12} /> Acessar projeto
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/ContactForm.css";
import Logo from "../assets/LogoBranca.png";
import { FaWhatsapp, FaLinkedin, FaInstagram, FaEnvelope, FaCheckCircle, FaPaperPlane } from "react-icons/fa";

const PHONE = "5584996002433";

const socials = [
  { Icon: FaWhatsapp,  href: "https://wa.me/5584996002433",        label: "WhatsApp", color: "#25D366" },
  { Icon: FaLinkedin,  href: "#",                                   label: "LinkedIn", color: "#0A66C2" },
  { Icon: FaInstagram, href: "https://instagram.com/alison_tkd",    label: "Instagram", color: "#E1306C" },
  { Icon: FaEnvelope,  href: "mailto:ryanalison2020@gmail.com",     label: "E-mail",   color: "#EA4335" },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay } },
});

export default function ContactForm() {
  const [form, setForm] = useState({ nome: "", telefone: "", assunto: "", mensagem: "" });
  const [errors, setErrors] = useState({});
  const [enviado, setEnviado] = useState(false);

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: false });
  };

  const validate = () => {
    const e = {};
    if (!form.nome.trim())     e.nome = true;
    if (!form.mensagem.trim()) e.mensagem = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const enviar = () => {
    if (!validate()) return;
    const { nome, telefone, assunto, mensagem } = form;
    const texto = [
      `*Novo contato pelo portfólio!*`,
      `👤 *Nome:* ${nome}`,
      telefone  && `📞 *Telefone:* ${telefone}`,
      assunto   && `📌 *Assunto:* ${assunto}`,
      `💬 *Mensagem:* ${mensagem}`,
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(texto)}`, "_blank");
    setEnviado(true);
    setForm({ nome: "", telefone: "", assunto: "", mensagem: "" });
    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <section className="contact" id="contato">
      {/* heading */}
      <motion.div
        className="contact__heading"
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp(0)}
      >
        <p className="contact__eyebrow">// fale comigo</p>
        <h2 className="contact__title">
          Entre em <span className="contact__title-accent">Contato</span>
        </h2>
        <p className="contact__subtitle">
          Tem um projeto em mente? Me manda uma mensagem e respondo pelo WhatsApp.
        </p>
      </motion.div>

      <div className="contact__card">
        {/* ── LEFT ── */}
        <motion.div
          className="contact__left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img src={Logo} alt="Logo" className="contact__logo" />

          <div className="contact__info">
            <p className="contact__info-label">Responde em até</p>
            <p className="contact__info-value">24 horas</p>
          </div>

          <div className="contact__divider" />

          <p className="contact__social-label">Me siga nas redes</p>
          <div className="contact__socials">
            {socials.map(({ Icon, href, label, color }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="contact__social-btn"
                whileHover={{ scale: 1.15, borderColor: color }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08 }}
                style={{ "--s-color": color }}
              >
                <Icon size={18} color="#fff" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT — form ── */}
        <motion.div
          className="contact__right"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {enviado ? (
              <motion.div
                key="success"
                className="contact__success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <FaCheckCircle size={40} color="var(--verde)" />
                <p className="contact__success-title">Mensagem enviada!</p>
                <p className="contact__success-sub">Redirecionando para o WhatsApp…</p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="contact__row">
                  <div className={`contact__field ${errors.nome ? "contact__field--error" : ""}`}>
                    <label>Nome <span>*</span></label>
                    <input name="nome" value={form.nome} onChange={handle} placeholder="Seu nome completo" />
                    {errors.nome && <span className="contact__error-msg">Campo obrigatório</span>}
                  </div>

                  <div className="contact__field">
                    <label>Telefone</label>
                    <input name="telefone" value={form.telefone} onChange={handle} placeholder="(84) 99999-9999" />
                  </div>
                </div>

                <div className="contact__field">
                  <label>Assunto</label>
                  <select name="assunto" value={form.assunto} onChange={handle}>
                    <option value="">Selecione um assunto…</option>
                    <option>Solicitar orçamento</option>
                    <option>Dúvida sobre projeto</option>
                    <option>Parceria</option>
                    <option>Outro</option>
                  </select>
                </div>

                <div className={`contact__field ${errors.mensagem ? "contact__field--error" : ""}`}>
                  <label>Mensagem <span>*</span></label>
                  <textarea name="mensagem" value={form.mensagem} onChange={handle} placeholder="Descreva o que você precisa…" />
                  {errors.mensagem && <span className="contact__error-msg">Campo obrigatório</span>}
                </div>

                <motion.button
                  className="contact__submit"
                  onClick={enviar}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FaPaperPlane size={14} />
                  Enviar pelo WhatsApp
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
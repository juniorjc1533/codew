import { useState, useEffect } from 'react';
import '../styles/Header.css';
import LogoBranca from '../assets/LogoBranca.png';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setMenuOpen(prev => !prev);
    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
            <div className="nav__logo">
                <img src={LogoBranca} alt="Logo" />
            </div>

            <nav className={`nav__right ${menuOpen ? 'nav__right--open' : ''}`} aria-label="Menu principal">
                <ul className="nav__links">
                    {['Home', 'Projetos', 'Agende', 'Sobre'].map((item) => (
                        <li key={item} className="nav__item">
                            <a href={`#${item.toLowerCase()}`} className="nav__link" onClick={closeMenu}>
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
                <button className="nav__cta" onClick={closeMenu}>
                    Entre em Contato
                </button>
            </nav>

            <button
                className={`nav__hamburger ${menuOpen ? 'nav__hamburger--open' : ''}`}
                onClick={toggleMenu}
                aria-label="Abrir menu"
                aria-expanded={menuOpen}
            >
                <span />
                <span />
                <span />
            </button>
        </header>
    );
}

export default Header;
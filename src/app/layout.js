// src/app/layout.js
import Script from 'next/script';
import './globals.css';
import { Inter } from 'next/font/google';
import ThemeToggle from '../components/ThemeToggle';
import AgeGate from '../components/AgeGate'; // Importação do filtro de idade
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Shibari Lab | Mathias',
  description: 'Portfólio, Workshops e Pesquisas sobre a arte do Shibari.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Filtro de idade posicionado no topo para rodar imediatamente */}
        <AgeGate />

        <Script id="theme-strategy" strategy="beforeInteractive">
          {`
            (function() {
              try {
                const theme = localStorage.getItem('theme') || 'light';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            })()
          `}
        </Script>

        <header className="main-header">
          <nav className="nav-container">
            <div className="logo">
              SHIBARI <span>LAB</span>
            </div>
            <ul className="nav-links">
              <li><a href="/">Home</a></li>
              <li><a href="/portfolio">Portfólio</a></li>
              <li><a href="/agenda">Agenda</a></li>
              <li><a href="/lab">Lab</a></li>
              <li><a href="/loja">Loja</a></li>
              <li><a href="/contato">Contato</a></li>
            </ul>
            <ThemeToggle />
          </nav>
        </header>

        <main>{children}</main>

        <Analytics />

        <footer className="main-footer">
          <p>&copy; {new Date().getFullYear()} Shibari Lab - Rio de Janeiro.</p>
        </footer>
      </body>
    </html>
  );
}
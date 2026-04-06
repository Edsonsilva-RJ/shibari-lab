// src/app/layout.js
import Script from 'next/script';
import './globals.css';
import { Inter } from 'next/font/google';
import ThemeToggle from '../components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Shibari Lab | Edson',
  description: 'Portfólio, Workshops e Pesquisas sobre a arte do Shibari.',
};

export default function RootLayout({ children }) {
  return (
    /* A ADIÇÃO DA PROPRIEDADE ABAIXO É A CHAVE:
       suppressHydrationWarning diz ao React para ignorar a diferença de atributos 
       na tag html causada pelo nosso script de tema.
    */
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
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
            <div className="logo">Shibari Lab</div>
            <ul className="nav-links">
              <li><a href="/">Home</a></li>
              <li><a href="/portfolio">Portfólio</a></li>
              <li><a href="/workshops">Workshops</a></li>
              <li><a href="/lab">Lab</a></li>
              <li><a href="/contato">Contato</a></li>
            </ul>
            <ThemeToggle />
          </nav>
        </header>

        <main>{children}</main>

        <footer className="main-footer">
          <p>&copy; {new Date().getFullYear()} Shibari Lab - Edson. Rio de Janeiro.</p>
        </footer>
      </body>
    </html>
  );
}
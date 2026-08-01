// src/app/layout.js
import Script from 'next/script';
import './globals.css';
import { Inter } from 'next/font/google';
import ThemeToggle from '../components/ThemeToggle';
import AgeGate from '../components/AgeGate'; // Importação do filtro de idade
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Shibari Lab | Mathias',
  description: 'Portfólio, Workshops e Pesquisas sobre a arte do Shibari.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        {/* 1ª TAG DO GTM: Script principal no <head> */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MWJPRGN3');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {/* 2ª TAG DO GTM: Fallback noscript logo após a abertura do <body> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MWJPRGN3"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-R955WTWDJD"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-R955WTWDJD');
          `}
        </Script>
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
        <SpeedInsights />

        <footer className="main-footer">
          <p>&copy; {new Date().getFullYear()} Shibari Lab - Rio de Janeiro.</p>
        </footer>
      </body>
    </html>
  );
}
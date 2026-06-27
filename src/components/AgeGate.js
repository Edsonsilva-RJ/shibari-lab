"use client";
import { useState, useEffect } from "react";
import styles from "./ageGate.module.css";

export default function AgeGate() {
  const [exibirModal, setExibirModal] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já confirmou a idade anteriormente
    const maiorDeIdade = localStorage.getItem("maior_de_idade");
    if (!maiorDeIdade) {
      setExibirModal(true);
    }
  }, []);

  const confirmarIdade = () => {
    localStorage.setItem("maior_de_idade", "true");
    setExibirModal(false);
  };

  const recusarIdade = () => {
    // Redireciona o usuário para fora do site (ex: Google)
    window.location.href = "https://www.google.com";
  };

  if (!exibirModal) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1 className={styles.logo}>SHIBARI LAB</h1>
        <h2>Conteúdo Restrito</h2>
        <p>
          Este site contém registros fotográficos artísticos de amarrações corporais, 
          estudos estéticos e pesquisas técnicas que podem conter teor sensual ou sensível.
        </p>
        <p className={styles.question}>Você tem 18 anos ou mais?</p>
        
        <div className={styles.buttons}>
          <button onClick={confirmarIdade} className={styles.btnSim}>
            Sim, tenho 18 anos ou mais
          </button>
          <button onClick={recusarIdade} className={styles.btnNao}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
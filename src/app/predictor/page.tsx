"use client";

import styles from './predictor.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Predictor() {
    const [ranking, setRanking] = useState(1860.14);
    const [ranking1, setRanking1] = useState(1669.44);
    const [rankingDif, setRankingDif] = useState(1.11);
    const [prediction, setPrediction] = useState(null);
    const [probability, setProbability] = useState(null);
    const [Empate, setEmpate] = useState(null);
    const [Derrota, setDerrota] = useState(null);
    const [Victoria, setVictoria] = useState(null);

    useEffect(() => {
      setRankingDif(ranking / ranking1);
  }, [ranking, ranking1]);

    const handlePredict = async () => {
        const data = {
          Ranking: ranking,
          'Ranking.1': ranking1,
          RankingDif: rankingDif
        };

        try {
            const response = await axios.post('https://api-ml-pagt.onrender.com/predict', data);
            setPrediction(response.data.prediction);
            setProbability(response.data.probability);
            setEmpate(response.data.Empate);
            setDerrota(response.data.Derrota);
            setVictoria(response.data.Victoria);
          } catch (error) {
            console.error('Error making prediction:', error);
          }
        };

    return (
        <>
      <div className={styles.section}>
      <h1>Predicción</h1><br />
      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handlePredict();}}>

        <div className={styles.label}>
          <label htmlFor="ranking">Puntos del ranking del Primer Equipo</label>
          <input
            type="number"
            id="ranking"
            value={ranking}
            onChange={(e) => setRanking(Number(e.target.value))}
          />
        </div>

        <div className={styles.label}>
          <label htmlFor="ranking1">Puntos del ranking del Segundo Equipo</label>
          <input
            type="number"
            id="ranking1"
            value={ranking1}
            onChange={(e) => setRanking1(Number(e.target.value))}

          />
        </div>

        <div className={styles.btn}>
          <button type="submit">Obtener Predicción</button>
        </div>
      </form>
      <br /><br />
      {prediction !== null && (
      <div>
        <h3>Resultado de la Predicción</h3>
        
        {prediction === -1 && <p>Predicción: Empate</p>}
        {prediction === 0 && <p>Predicción: Derrota</p>}
        {prediction === 1 && <p>Predicción: Victoria</p>}

        <p>Empate: {Empate}</p>
        <p>Derrota: {Derrota}</p>
        <p>Victoria: {Victoria}</p>
      </div>
)}

    </div>
        </>
    );
}
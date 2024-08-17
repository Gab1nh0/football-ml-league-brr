"use client";

import { useState, useEffect } from 'react';
import { db } from '@/app/Config/firebase';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import styles from './playerComparison.module.css';
import Flag from 'react-world-flags';
import RadarChartAttackCompare from '../Components/chartradialAttackCompare';
import RadarChartDefenseCompare from '../Components/chartradialDefenseCompare';
import RadarChartPasseskCompare from '../Components/chartradialPassesCompare';

type Country = 'Colombia' | 'Uruguay' | 'Venezuela' | 'Argentina' | 'Panama';

const countryNameToCode: Record<Country, string> = {
    Colombia: 'CO',
    Uruguay: 'UY',
    Venezuela: 'VE',
    Argentina: 'AR',
    Panama: 'PA',
};

interface Player {
    id: string;
    player_name: string;
    country: string;
    img: string,
    position: string;
    //atack
    Standard_Gls: number,
    Standard_Sh: number,
    Standard_SoT: number,
    Expected_xG: number,
    Standard_FK: number,
    Standard_PK: number;
    //defense
    Tackles_Tkl: number,
    Tackles_TklW: number,
    Tackles_Def: number,
    Tackles_Mid: number,
    Tackles_Att: number,
    Int: number;
    //passses
    Ast: number,
    xAG: number,
    KP: number,
    PrgP: number,
    Total_Att: number,
    Total_Cmp: number;
}


export default function PlayerComparison() {
    const [data, setData] = useState<Player[]>([]);
    const [dataStats, setDataStats] = useState<Player[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [selectedPlayerStats, setSelectedPlayerStats] = useState<Player | null>(null);

    
    const [data2, setData2] = useState<Player[]>([]);
    const [dataStats2, setDataStats2] = useState<Player[]>([]);
    const [searchText2, setSearchText2] = useState<string>("");
    const [selectedPlayer2, setSelectedPlayer2] = useState<Player | null>(null);
    const [selectedPlayerStats2, setSelectedPlayerStats2] = useState<Player | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [playersSnapshot, attackSnapshot, defenseSnapshot, passesSnapshot] = await Promise.all([
                    getDocs(collection(db, 'player')),
                    getDocs(collection(db, 'attack')),
                    getDocs(collection(db, 'defense')),
                    getDocs(collection(db, 'passes'))
                ]);
    
                const players = playersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Player[];
    
                // Aquí debes combinar las estadísticas con los jugadores o guardarlas por separado
                const attackStats = attackSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Player[];
    
                const defenseStats = defenseSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Player[];
    
                const passesStats = passesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Player[];
    
                setData(players);
                setData2(players);
    
                // Aquí combinamos las estadísticas y las almacenamos
                setDataStats([...attackStats, ...defenseStats, ...passesStats]);
                setDataStats2([...attackStats, ...defenseStats, ...passesStats]);
    
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
    
        fetchData();
    }, []);
    

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        setSelectedPlayer(null);
    };

    const handleSelectPlayer = (player: Player) => {
        setSelectedPlayer(player);
        setSearchText("");
    
        const stats = dataStats.find(stat => stat.id === player.id);
        setSelectedPlayerStats(stats || null);
    };
    
    const handleSelectPlayer2 = (player2: Player) => {
        setSelectedPlayer2(player2);
        setSearchText2("");
    
        const stats2 = dataStats2.find(stat2 => stat2.id === player2.id);
        setSelectedPlayerStats2(stats2 || null);
    };
    

    const filteredData = data.filter(player =>
        player.player_name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSearchChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText2(event.target.value);
        setSelectedPlayer2(null);
    };

    const filteredData2 = data2.filter(player2 =>
        player2.player_name.toLowerCase().includes(searchText2.toLowerCase())
    );

    return (
      <div className={styles.container}>
        <div className={styles.playerIzq}>
            <input type="text" placeholder="Search player" value={searchText} onChange={handleSearchChange} className={styles.searchInput}/>
            {searchText && (
                <ul className={styles.searchResults}>
                    {filteredData.map((player) => (
                        <li
                            key={player.id}
                            className={styles.resultItem}
                            onClick={() => handleSelectPlayer(player)}
                        >
                            <h3>{player.player_name}</h3>
                        </li>
                    ))}
                </ul>
            )}

            {selectedPlayer && (
                <div className={styles.playerInfo}>
                    <div className={styles.playerData1}>
                        <h2>{selectedPlayer.player_name}</h2>
                        <li>
                            <Flag code={countryNameToCode[selectedPlayer.country as Country]} alt={selectedPlayer.country} className={styles.flag} />
                            <p>{selectedPlayer.country}</p>
                        </li>
                        <p>{selectedPlayer.position}</p>
                    </div>
                    <img src={selectedPlayer.img} className={styles.playerimg} alt="" />
                </div>
            )}
        </div>

        <div className={styles.RadarChart}>
            <RadarChartAttackCompare
                dataStats1={selectedPlayerStats ? [selectedPlayerStats] : []}
                dataStats2={selectedPlayerStats2 ? [selectedPlayerStats2] : []}
            />
            <RadarChartPasseskCompare
                dataStats1={selectedPlayerStats ? [selectedPlayerStats] : []}
                dataStats2={selectedPlayerStats2 ? [selectedPlayerStats2] : []}
            />
            <RadarChartDefenseCompare
                dataStats1={selectedPlayerStats ? [selectedPlayerStats] : []}
                dataStats2={selectedPlayerStats2 ? [selectedPlayerStats2] : []}
            />
        </div>

        <div className={styles.playerDer}>
            <input
                type="text"
                placeholder="Search player"
                value={searchText2}
                onChange={handleSearchChange2}
                className={styles.searchInput}
            />
            {searchText2 && (
                <ul className={styles.searchResults}>
                    {filteredData2.map((player2) => (
                        <li
                            key={player2.id}
                            className={styles.resultItem}
                            onClick={() => handleSelectPlayer2(player2)}
                        >
                            <h3>{player2.player_name}</h3>
                        </li>
                    ))}
                </ul>
            )}
            {selectedPlayer2 && (
                <div className={styles.playerInfo}>
                    <div className={styles.playerData}>
                        <h2>{selectedPlayer2.player_name}</h2>
                        <li>
                            <Flag code={countryNameToCode[selectedPlayer2.country as Country]} alt={selectedPlayer2.country} className={styles.flag} />
                            <p>{selectedPlayer2.country}</p>
                        </li>
                        <p>{selectedPlayer2.position}</p>
                    </div>
                    <img src={selectedPlayer2.img} className={styles.playerimg} alt="" /> 
                </div>
            )}
        </div>
      </div>
    );
}

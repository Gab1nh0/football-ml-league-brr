"use client";
import { useState, useEffect } from 'react';
import { db } from '@/app/Config/firebase';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import styles from './player.module.css';
import RadarChartAttack from '@/app/Components/chartradialAttack';
import RadarChartDefense from '@/app/Components/chartradialDefense';
import RadarChartPasses from '@/app/Components/chartradialPasses';
import Flag from 'react-world-flags';


interface Player {
    id: string,
    player_name: string,
    player_nickname: string,
    country: string,
    img: string,
    position: string;
}

interface Passes {
    id: string,
    Ast: number,
    xAG: number,
    KP: number,
    PrgP: number,
    Total_Att: number,
    Total_Cmp: number;

}

interface Attack {
    id: string,
    Standard_Gls: number,
    Standard_Sh: number,
    Standard_SoT: number,
    Expected_xG: number,
    Standard_FK: number,
    Standard_PK: number,
}

interface Defense {
    id: string,
    Tackles_Tkl: number,
    Tackles_TklW: number,
    Tackles_Def: number,
    Tackles_Mid: number,
    Tackles_Att: number,
    Int: number;

}

type CountryName = 'Colombia' | 'Uruguay' | 'Venezuela' | 'Argentina' | 'Panama' | 'Brazil' | 'Canada';


const countryNameToCode: Record<CountryName, string> = {
    Colombia: 'COL',
    Uruguay: 'URY',
    Venezuela: 'VEN',
    Argentina: 'ARG',
    Panama: 'PAN',
    Brazil: 'BRA',
    Canada: 'CAN',
};



export default function Player({ params }: { params: { player_id: string } }) {


    const [dataP, setDataP] = useState<Player[]>([]);
    const [dataA, setDataA] = useState<Passes[]>([]);
    const [dataS, setDataS] = useState<Attack[]>([]);
    const [dataD, setDataD] = useState<Defense[]>([]);

    useEffect(() => {
        const fetchData = async () => {

            const querySnapshot = await getDocs(collection(db, 'player'));

            const querySnapshot2 = await getDocs(collection(db, 'attack'));

            const players: Player[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                ...doc.data() as Player,
                id: doc.id,
            }));

            const passes: Passes[] = querySnapshot2.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                ...doc.data() as Passes,
                id: doc.id,
            }));

            const attack: Attack[] = querySnapshot2.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                ...doc.data() as Attack,
                id: doc.id,
            }));

            const defense: Defense[] = querySnapshot2.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                ...doc.data() as Defense,
                id: doc.id,
            }));

            const player = players.filter(p => p.id === params.player_id);
            setDataP(player);

            const pass = passes.filter(a => a.id === params.player_id);
            setDataA(pass);

            const att = attack.filter(p => p.id === params.player_id);
            setDataS(att);

            const def = defense.filter(d => d.id === params.player_id);
            setDataD(def);
        };

        fetchData();
    }, [params.player_id]);


    if (!dataP) {
        return <p>Loading...</p>;
    }

    const country = dataP.length > 0 ? dataP[0].country : 'N/A';
    
    const countryCode = countryNameToCode[country as CountryName] || 'N/A';


    return (
        <div className={styles.TopPlayers}>
            <div className={styles.TopPlayersIzq}>
                <div className={styles.playerinfo}>

                    <p className={styles.playertext}><Flag style={{ height: '28px', margin: '0' }} code={countryCode} />  {dataP.length > 0 ? dataP[0].country : 'N/A'}</p>

                    
                    <p className={styles.playername}>{dataP.length > 0 ? dataP[0].player_nickname : 'N/A'}</p>
                    <p className={styles.playertext}>{dataP.length > 0 ? dataP[0].position : 'N/A'}</p>
                </div>
                    
                <img className={styles.playerimg} src={dataP.length > 0 ? dataP[0].img : 'https://firebasestorage.googleapis.com/v0/b/footballleague-479b8.appspot.com/o/img-players%2Fnan.png?alt=media&token=9191fe8f-e0cf-48af-92cd-7436ab22f219'} />
            </div>
            <div className={styles.TopPlayersDer}>
                <div className={styles.TopPlayersChart}>
                    <h2 className={styles.TopPlayersh2}>Overview Stats</h2>
                    <table className={styles.TopPlayerstable}>
                        <tbody>
                            <tr>
                                <td className={styles.TopPlayerstr}>Apparences</td>
                                <td className={styles.TopPlayerstr2}>6</td>
                            </tr>
                            <tr>
                                <td className={styles.TopPlayerstr}>Goals</td>
                                <td className={styles.TopPlayerstr2}>{dataS.length > 0 ? dataS[0].Standard_Gls : 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className={styles.TopPlayerstr}>Assists</td>
                                <td className={styles.TopPlayerstr2}>{dataA.length > 0 ? dataA[0].Ast : 'N/A'}</td>
                            </tr>
                            <tr>
                                <td className={styles.TopPlayerstr}>Wins</td>
                                <td className={styles.TopPlayerstr2}>4</td>
                            </tr>
                            <tr>
                                <td className={styles.TopPlayerstr}>Loses</td>
                                <td className={styles.TopPlayerstr2}>1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.TopPlayersChart}>
                    <h2 className={styles.TopPlayersh2}>Attack Stats</h2>
                    <RadarChartAttack dataS={dataS} />
                </div>
                <div className={styles.TopPlayersChart}>
                    <h2 className={styles.TopPlayersh2}>Passes Stats</h2>
                    <RadarChartPasses dataA={dataA}/>
                </div>
                <div className={styles.TopPlayersChart}>
                    <h2 className={styles.TopPlayersh2}>Defense Stats</h2>
                    <RadarChartDefense dataD={dataD}/>
                </div>
            </div>
        </div>
    );
}

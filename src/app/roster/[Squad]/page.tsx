"use client";
import { useState, useEffect } from 'react';
import { db } from '../../Config/firebase';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import styles from './roster.module.css';
import Link from 'next/link';

interface Player {
    id: string,
    player_name: string,
    country: string,
    position: string;
}

interface Team {
    id: string,
    Squad: string,
    color: string,
    img: string;
}

export default function Roster({ params }: { params: { Squad: string } }) {
    const [data, setData] = useState<Player[]>([]);
    const [datalogo, setDatalogo] = useState<Team | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const playerSnapshot = await getDocs(collection(db, 'player'));
            const teamSnapshot = await getDocs(collection(db, 'teams'));

            const players: Player[] = playerSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                ...doc.data() as Player,
                id: doc.id,
            }));

            // Decode the Squad parameter to ensure it matches the data correctly
            const decodedSquad = decodeURIComponent(params.Squad);
            const filteredPlayers = players.filter(p => p.country === decodedSquad);
            setData(filteredPlayers);

            const teams: Team[] = teamSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                ...doc.data() as Team,
                id: doc.id,
            }));

            const team = teams.find(t => t.Squad === decodedSquad);
            setDatalogo(team || null);
        };

        fetchData();
    }, [params.Squad]);

    return (
        <>
            {datalogo && (
                <div className={styles.rosterheader} style={{ backgroundColor: datalogo.color }}>
                    <div className={styles.imglogo}>
                        <img src={datalogo.img} alt={`${datalogo.Squad} logo`} />
                    </div>
                    <div className={styles.titlelogo}>
                        <h1>{datalogo.Squad}</h1>
                    </div>
                </div>
            )}
            <main className={styles.roster}>
                <h3>Goalkeepers</h3>
                {data
                    .filter(item => item.position === "Goalkeeper")
                    .map(item => (
                        <div key={item.id}>
                            <ul><Link href={`/player/${item.id}`}>{item.player_name}</Link></ul>
                        </div>
                    ))}
                <hr />
                <h3>Defenders</h3>
                {data
                    .filter(item => item.position === "Defender")
                    .map(item => (
                        <div key={item.id}>
                            <ul><Link href={`/player/${item.id}`}>{item.player_name}</Link></ul>
                        </div>
                    ))}
                <hr />
                <h3>Midfielders</h3>
                {data
                    .filter(item => item.position === "Midfilder")
                    .map(item => (
                        <div key={item.id}>
                            <ul><Link href={`/player/${item.id}`}>{item.player_name}</Link></ul>
                        </div>
                    ))}
                <hr />
                <h3>Forwards</h3>
                {data
                    .filter(item => item.position === "Forward")
                    .map(item => (
                        <div key={item.id}>
                            <ul><Link href={`/player/${item.id}`}>{item.player_name}</Link></ul>
                        </div>
                    ))}
                <hr />
                <h3>All Players</h3>
                {data
                    
                    .map(item => (
                        <div key={item.id}>
                            <ul><Link href={`/player/${item.id}`}>{item.player_name}</Link></ul>
                        </div>
                    ))}
            </main>
        </>
    );
}

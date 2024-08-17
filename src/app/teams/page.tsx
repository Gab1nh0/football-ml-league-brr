"use client";
import { useState, useEffect } from 'react';
import { db } from '../Config/firebase';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import styles from './teams.module.css';
import Link from 'next/link';

interface Team {
    id: string;
    Squad: string;
    color: string;
    img: string;
}

export default function Teams() {
    const [data, setData] = useState<Team[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'teams'));
                const documents: Team[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                    ...doc.data() as Team,
                    id: doc.id,
                }));
                setData(documents);
            } catch (error) {
                console.error("Error fetching teams: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.section}>
            <h1>Equipos</h1>
            <br />
            {data.map((item) => (
                <div key={item.id}>
                    <div className={styles.teamcontainer} style={{ backgroundColor: item.color }}>
                        <div className={styles.teamimgcontainer}>
                            <img src={item.img} alt={item.Squad} />
                        </div>
                        
                        <Link href={`/roster/${item.Squad}`}>
                            <h1>{item.Squad}</h1>
                        </Link>
                    </div>
                    <br />
                </div>
            ))}
        </div>
    );
}

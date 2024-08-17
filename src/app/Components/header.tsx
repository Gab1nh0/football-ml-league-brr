import styles from './header.module.css'
import React from 'react';
import Link from 'next/link';

function Header() {
  return (
    <header className={styles.headercontent}>
        <div>
            <Link className={styles.logo} href="/"><h1>ML Football League.</h1></Link>
        </div>

        <div className={styles.headerlinks}>

            <li><Link href="/compare">Compare Players</Link></li>
            <li><Link href="/teams">Teams</Link></li>
            <li><Link href="/predictor">Predictors</Link></li>
          
        </div>
    </header>
  );
}

export default Header;
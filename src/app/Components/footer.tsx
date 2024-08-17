import styles from '../Components/footer.module.css'
import React from 'react';


function Footer(){
    return(
        <footer className={styles.footer}>
            <div className={styles.footerlogo}>
                <h1>ML Football League</h1>
            </div>
            <div className={styles.footercontent}>
                <div className={styles.footersocialmedia}>
                    <h3>Social Media</h3>
                    <li>Instagram</li>
                    <li>X</li>
                    <li>Youtube</li>
                    <li>Email</li>
                </div>
                <div className={styles.footerhiring}>
                    <h3>About Me</h3>
                    <li>Go to my Portfolio</li>
                </div>
                <div className={styles.footerml}>
                    <h3>Data Analyst in Football</h3>
                    <li>Learn ML in Football</li>
                </div>
            </div>
            <div className={styles.footerbottom}>
                <p>Developed by <a href="https://github.com/Gab1nh0">Gabo🐧</a></p>
            </div>

        </footer>
    );   
}

export default Footer
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <main className={styles.main}>

        <div className={styles.homesup}>
          <div className={styles.homeder}>
            <img src="https://i2-prod.chroniclelive.co.uk/sport/article7087172.ece/ALTERNATES/s1227b/WA358223.jpg" alt=""/>
          </div>

          <div className={styles.homeizq}>
            <br/>
            <h1 className={styles.hometitle}>Asprilla lead the win against Liverpool</h1>
            <br/>
            <p className={styles.hometext}>In a stunning turn of events, Newcastle United pulled off a remarkable victory against Liverpool in a match that will be etched in football history. The clash between the underdogs and the title contenders was nothing short of a spectacle, leaving fans on the edge of their seats.</p>
          </div>
        </div>
        <div className={styles.homeinf}>
          <h1>Copa America Highlights</h1>
          <div className={styles.highlightsvideos}>
            <iframe src="https://www.youtube.com/embed/P_9nUzsB7jU?si=iFoQfRgzVNZZ_5MW" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/_FFFuHlFlKw?si=bR1VQ_ROQbRqnl0Z" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/CmsP6FyeBFw?si=XVslUt03rJwoCtYk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>  
          </div>
        </div>      
    </main>
    <img className={styles.imgbackground} src="https://res.cloudinary.com/dnvwjkcpj/image/upload/v1721488819/ybu1e8u34dlczyhsdugj.png" alt="" />  
    </>
  );
}

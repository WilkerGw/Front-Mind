import styles from "./page.module.css";
import '../styles/globals.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.logoContainer}>
        <img src="../images/logo-cinza.png" alt="logo" className={styles.logo}/>
        <p className={styles.subtitle}>A tecnologia a favor do seu negócio</p>
      </div>
      
    </div>
  );
}

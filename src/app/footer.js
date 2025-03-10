import React from 'react';
import styles from '../components/Footer.module.css';
import localfont from 'next/font/local';


const nugget = localfont(
  {
    src: [
      {
        path: "../../public/fonts/AudioNugget.ttf"
      }
    ],
    variable: "--font-nugget",
  }
);

const Footer = () => {
  return (
    <div className={styles.Main}>
      <div className={styles.Foot}>
        <div>
          <p className={nugget.className}>YAPPING</p>
        </div>
        <div className={styles.iconList}>
          <div className={styles.Icons}><i class="fa-brands fa-reddit-alien"></i></div>
          <div className={styles.Icons}></div>
          <div className={styles.Icons}></div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

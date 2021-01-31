import React from "react";
import styles  from './footer.module.css';

function Footer() {
  return (
    <div className={styles.footer}>
        <span className={styles.footer_span}>
          Powered by{' '}
          <img src="/vercel.svg" alt="Teylas Solutions Sp. z o.o." className={styles.footer_logo} />
        </span>
    </div>
  );
}

export default Footer;
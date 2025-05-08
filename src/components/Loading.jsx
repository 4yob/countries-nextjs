import React from "react";
import styles from "../styles/Loading.module.css";
import Image from "next/image";

export default function Loading() {
    return (
        <div className={styles.loading}>
            <Image src="/images/world.gif" alt="Loading" width={100} height={100} className={styles.world} />
            <p>Carregando países...</p>
        </div>
    );
}

import React from "react";
import styles from "./Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { Button } from "antd";

export default function Home() {
    return (
        <div className={styles.container}>
            <Image src={"/images/maiko.png"} alt="Maiko Xikixiki" width={200} height={200} className={styles.image} />
            <h1 className={styles.title}> Maiko Xikixiki Bahia</h1>
            <div className={styles.description}>
                <p>Tá perdido no código? Relaxa e vem de Maiko, que vamos te mostrar a usar:</p>
                <ul className={styles.list}>
                    <li>Next.js (App Router)</li>
                    <li>CSS Modules</li>
                    <li>React Components</li>
                    <li>React Hooks</li>
                    <li>PreLoad</li>
                    <li>PreFetch</li>
                    <li>Fetch Axios</li>
                    <li>LocalStorage</li>
                    <li>React Toastify</li>
                    <li>AntD</li>
                    <li>Skeleton</li>
                </ul>
            </div>
            <Link href="/countries" prefetch={true}>
                <Button className={styles.button}>Acessar Países</Button>
            </Link>
        </div>
    );
}

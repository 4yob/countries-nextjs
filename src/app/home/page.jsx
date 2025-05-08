"use client";

import React from "react";
import { useEffect, useState } from "react";

import styles from "./Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { Button } from "antd";
import { Skeleton } from "antd";

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [])

    return (
        <div className={styles.container}>
            {isLoading ? (
                <>
                <Skeleton.Avatar active size={200} shape="circle" className={styles.skeleton} />
                <Skeleton active size={200} className={styles.skeleton} />

                </>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
}

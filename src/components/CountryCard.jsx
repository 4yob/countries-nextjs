import React from "react";
import styles from "../styles/CountryCard.module.css";
import Image from "next/image";
import { Card } from "antd";

export default function CountryCard({ country, onClick }) {
  return (
    <Card className={styles.card} onClick={() => onClick(country)}>
      <Image src={country.flags.png} alt={`Bandeira de ${country.translations.por.common}`} width={100} height={100} className={styles.flag} />
      <h3 className={styles.name}>{country.translations.por.common}</h3>
    </Card>
  );
}

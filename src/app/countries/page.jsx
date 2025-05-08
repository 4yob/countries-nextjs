"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import CountryCard from "../../components/CountryCard";
import CountryModal from "../../components/CountryModal";
import Loading from "../../components/Loading";
import styles from "./Countries.module.css";
import { Button } from "antd";
import { Pagination } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "antd";

const regions = ["africa", "americas", "antarctic", "asia", "europe", "oceania"];

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchComCache = async () => {
      const cacheKey = 'countriesData';
      const cache = sessionStorage.getItem(cacheKey);

      if (cache) {
        setCountries(JSON.parse(cache));
        setIsLoading(false);
        return;
      }

      try {
        const resposta = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(resposta.data);
        sessionStorage.setItem(cacheKey, JSON.stringify(resposta.data));
      } catch (erro) {
        alert('Erro ao buscar países');
      }
    };

    fetchComCache();
  }, []);


  const fetchCountries = async (region = "") => {
    setIsLoading(true);
    try {
      const url = region
        ? `https://restcountries.com/v3.1/region/${region}`
        : "https://restcountries.com/v3.1/all";
      const response = await axios.get(url);
      setCountries(response.data);
      if (!region) {
        setAllCountries(response.data);
        toast.success("Países carregados com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao carregar países:", error);
      toast.error("Erro ao carregar países. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetFilter = () => fetchCountries();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCountries = countries.slice(startIndex, endIndex);
  const handleCardClick = (country) => {
    toast.info(`Você clicou em: ${country.name.common}`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  return (
    <div className={styles.container}>
      <h1>Lista de Países do Mundo</h1>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        />
      <div>
        {regions.map((region) => (
          <Button
            key={region}
            className={styles.button}
            onClick={() => {
              setCurrentPage(1);
              fetchCountries(region);
            }}>
            {region.charAt(0).toUpperCase() + region.slice(1)}
          </Button>
        ))}
        <Button className={styles.buttonReset} onClick={resetFilter}>
          Mostrar Todos
        </Button>
      </div>

      <div className={styles.cardContainer}>
        {isLoading ? (
          <Skeleton
            active
            paragraph={{ rows: 3 }}
            title={{ width: 500 }}
          />
        ) : (
          currentCountries.map((country, index) => (
            <CountryCard
              key={index}
              country={country}
              onClick={() => setSelectedCountry(country)}
              onCardClick={handleCardClick}
            />
          ))
        )}
      </div>

      <Pagination
        defaultCurrent={1}
        current={currentPage}
        pageSize={itemsPerPage}
        total={countries.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: "20px", textAlign: "center" }}
      />

      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </div>
  );
}
import React, { useState, useEffect, useRef } from "react";
import Body from "./body/Body";
import Filter from "./filter/Filter";
import { useTheme } from "./context/ThemeContext";

const url = "https://restcountries.com/v3.1/all";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const inputRef = useRef();

  const { theme } = useTheme();

  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch(url);
      const countries = await response.json();
      // Sort countries alphabetically by name
      const sortedCountries = countries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      setCountries(sortedCountries);
      inputRef.current.focus();
    };

    fetchCountryData();
  }, []);

  const onSearchChange = (e) => {
    setSearchField(e.target.value.toLocaleLowerCase());
  };

  const onSelectRegion = (region) => {
    setSelectedRegion(region);
  };

  const handlePageChange = (pageNumber) => {
    setPageNumber(pageNumber);
  };

  // Filter countries based on search field and selected region
  const filteredCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(searchField) &&
      (selectedRegion === "" || country.region === selectedRegion)
  );

  const countriesPerPage = 20;
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);
  const currentPage = filteredCountries.slice(
    (pageNumber - 1) * countriesPerPage,
    pageNumber * countriesPerPage
  );

  return (
    <div className={`Countries ${theme === "light" ? "light-theme" : ""}`}>
      <Filter
        onChangeHandler={onSearchChange}
        onSelectRegion={onSelectRegion}
        input={inputRef} //useRef was used to pass this which simply focuses on the search bar when you reload the browser
      />
      <div className="container grid">
        {currentPage.map((country, i) => {
          const { name, population, region, capital, flags, ccn3 } = country;

          // console.log("ccn3:", ccn3);

          const key = ccn3 || i;
          return (
            <Body
              key={key} // Use ccn3 as the key
              countryKey={ccn3}
              name={name.common}
              population={population.toLocaleString()}
              region={region}
              flag={flags.png}
              capital={capital}
            />
          );
        })}
      </div>
      <div className="pagination">
        {/* {pageNumber > 1 && (
          <button
            className="pagination-button"
            onClick={() => handlePageChange(1)}
          >
            First
          </button>
        )} */}
        {pageNumber > 1 && (
          <button
            className="pagination-button"
            onClick={() => handlePageChange(pageNumber - 1)}
          >
            Previous
          </button>
        )}
        {Array(totalPages)
          .fill(0)
          .map((_, i) => (
            <React.Fragment key={i}>
              {i + 1 === pageNumber ? (
                <button className="pagination-button active">{i + 1}</button>
              ) : i + 1 === 1 ||
                i + 1 === totalPages ||
                (pageNumber === 1 && i + 1 <= 3) ||
                (pageNumber === totalPages && i + 1 >= totalPages - 2) ||
                (i + 1 >= pageNumber - 2 && i + 1 <= pageNumber + 2) ? (
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ) : (
                <span className="ellipsis">...</span>
              )}
            </React.Fragment>
          ))}
        {pageNumber < totalPages && (
          <button
            className="pagination-button"
            onClick={() => handlePageChange(pageNumber + 1)}
          >
            Next
          </button>
        )}
        {/* {pageNumber < totalPages && (
          <button
            className="pagination-button"
            onClick={() => handlePageChange(totalPages)}
          >
            Last
          </button>
        )} */}
      </div>
    </div>
  );
};

export default Countries;

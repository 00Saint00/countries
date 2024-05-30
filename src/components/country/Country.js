import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { Link, useParams } from "react-router-dom";
import "./country.css";

const Country = () => {
  const [country, setCountry] = useState([]);
  const [relatedCountries, setRelatedCountries] = useState([]);
  const { name } = useParams();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch(`https://restcountries.com/v2/name/${name}`);
      const country = await response.json();
      setCountry(country);
      console.log(country);
    };

    fetchCountryData();
  }, []);

  useEffect(() => {
    const fetchRelatedCountries = async () => {
      if (country[0] && country[0].borders) {
        const responses = await Promise.all(
          country[0].borders.map((borders) =>
            fetch(`https://restcountries.com/v2/alpha/${borders}`)
          )
        );
        const relatedCountries = await Promise.all(
          responses.map((response) => response.json())
        );
        setRelatedCountries(relatedCountries.slice(0, 4)); // only show 4 flags
      }
    };

    fetchRelatedCountries();
  }, [country]);

  return (
    <div className="Countries">
      <section className="country">
        <Link
          to="/"
          className={`btn btn-light ${theme === "light" ? "" : "light-theme"}`}
        >
          <i className="fas fa-arrow-left"></i> Back Home
        </Link>
        {country.map((c) => {
          const {
            numericCode,
            name,
            flag,
            nativeName,
            population,
            region,
            subregion,
            capital,
            topLevelDomain,
            currencies,
            languages,
            borders,
          } = c;

          return (
            <article key={numericCode}>
              <div>
                <div className="country-inner">
                  <div className="flag">
                    <img
                      src={flag}
                      alt={name.common}
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div className="country-outer">
                    <div className="country-details">
                      <div>
                        <h2>{name}</h2>
                        <h5>
                          Native Name:
                          <span> {nativeName}</span>
                        </h5>
                        <h5>
                          Population:
                          <span> {population.toLocaleString()}</span>
                        </h5>
                        <h5>
                          Region:
                          <span> {region}</span>
                        </h5>
                        <h5>
                          Subregion:
                          <span> {subregion}</span>
                        </h5>
                        <h5>
                          Capital:
                          <span> {capital}</span>
                        </h5>
                      </div>
                      <div>
                        <h5>
                          Top Level Domain:
                          <span> {topLevelDomain}</span>
                        </h5>
                        <h5>
                          Currencies:
                          <span> {currencies[0].name}</span>
                        </h5>
                        <h5>
                          Languages:
                          <span> {languages[0].name}</span>
                        </h5>
                      </div>
                    </div>
                    <div className="border">
                      <h3>
                        Border Countries:
                        <div
                          className={`borders ${
                            theme === "light" ? "" : "light-theme"
                          }`}
                        >
                          {borders && borders.length > 0 ? (
                            borders.map((border) => (
                              <ul key={border}>
                                <li>{border}</li>
                              </ul>
                            ))
                          ) : (
                            <p>No border countries</p>
                          )}
                        </div>
                      </h3>
                      {/* <h3>
                        Related Countries:
                        <div className="related-countries">
                          {relatedCountries.map((country) => (
                            <img
                              src={country.flag}
                              alt={country.name}
                              key={country.numericCode}
                              style={{ width: "20%", margin: "10px" }}
                            />
                          ))}
                        </div>
                      </h3> */}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default Country;

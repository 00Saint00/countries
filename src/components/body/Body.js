import React from "react";
import "./body.css";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Body = ({
  flag,
  name,
  population,
  region,
  capital,
  countryKey,
  removeCountry,
}) => {
  const { theme } = useTheme();

  return (
    <div>
      <Link className="click" to={`/countries/${name}`}>
        <img src={flag} alt={name} />
        <div className={`details ${theme === "light" ? "" : "light-theme"}`}>
          <h3>{name}</h3>
          <h4>
            Population: <span>{population}</span>
          </h4>
          <h4>
            Region: <span>{region}</span>
          </h4>
          <h4>
            Capital: <span>{capital}</span>
          </h4>
        </div>
      </Link>
    </div>
  );
};

export default Body;

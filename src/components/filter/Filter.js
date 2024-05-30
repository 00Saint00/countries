import React from "react";
import "./Filter.css";
import { useTheme } from "../context/ThemeContext";

const Filter = ({ onChangeHandler, onSelectRegion, input }) => {
  const { theme } = useTheme();

  const handleRegionChange = (e) => {
    onSelectRegion(e.target.value);
  };

  return (
    <section className={`container filter`}>
      <form
        className={`form-control ${theme === "light" ? "" : "light-theme"}`}
      >
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search for a country"
          onChange={onChangeHandler}
          ref={input}
        />
      </form>

      <div
        className={`region-filter ${theme === "light" ? "" : "light-theme"} `}
      >
        <select
          name="select"
          id="select"
          className="select"
          onChange={handleRegionChange}
        >
          <option value="Filter by region">Filter by region</option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </section>
  );
};

export default Filter;

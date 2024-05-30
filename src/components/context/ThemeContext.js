// import React, { createContext, useContext, useState } from "react";

// const ThemeContext = createContext();

// export const useTheme = () => useContext(ThemeContext);

// export const ThemeProvider = ({ children }) => {
//   const [iconClass, setIconClass] = useState(
//     document.body.classList.contains("light-theme")
//       ? "fas fa-moon"
//       : "fas fa-sun"
//   );

//   const toggleTheme = () => {
//     document.body.classList.toggle("light-theme");
//     document.querySelector(".header").classList.toggle("light-theme");
//     const detailsElements = document.querySelectorAll(".details");
//     const uls = document.querySelectorAll("ul");
//     // Iterate over NodeList and toggle class for each element
//     detailsElements.forEach((detail) => {
//       detail.classList.toggle("light-theme");
//     });
//     uls.forEach((ul) => {
//       ul.classList.toggle("light-theme");
//     });

//     if (document.querySelector(".btn")) {
//       backToggle();
//     }

//     const iconClass = document.body.classList.contains("light-theme")
//       ? "fas fa-moon"
//       : "fas fa-sun";
//     setIconClass(iconClass);

//     if (document.querySelector("#search")) {
//       filterToggle();
//     }
//   };

//   const backToggle = () => {
//     document.querySelector(".btn").classList.toggle("light-theme");
//   };

//   const filterToggle = () => {
//     document.querySelector("#search").classList.toggle("light-theme");
//     document.querySelector("select").classList.toggle("light-theme");
//   };

//   return (
//     <ThemeContext.Provider value={{ iconClass, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    document.body.classList.toggle("light-theme");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`${theme === "light" ? "" : "light-theme"}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

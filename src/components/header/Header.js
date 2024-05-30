// import React from "react";
// import { useTheme } from "../context/ThemeContext";
// import "./header.css";

// const Header = () => {
//   const { iconClass, toggleTheme } = useTheme();

//   const getModeText = () => {
//     return iconClass.includes("moon") ? "Dark Mode" : "Light Mode";
//   };

//   // useEffect(() => {
//   //   const changeTheme = () => {
//   //     document.body.classList.toggle("light-theme");
//   //   };

//   //   const moon = document.querySelector(".fa-moon");
//   //   moon.addEventListener("click", changeTheme);

//   //   return () => {
//   //     moon.removeEventListener("click", changeTheme);
//   //   };
//   // }, []); // Empty dependency array ensures the effect runs only once

//   return (
//     <div>
//       <header className="header">
//         <div className="container heading">
//           <div>
//             <h1>Where in the world</h1>
//           </div>

//           <div>
//             <i className={iconClass} onClick={toggleTheme}>
//               {" "}
//               {getModeText()}
//             </i>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Header;

import React from "react";
import { useTheme } from "../context/ThemeContext";
import "./header.css";

const Header = () => {
  const { theme, toggleTheme } = useTheme(); // Use 'theme' instead of 'iconClass'

  const getModeText = () => {
    return theme === "light" ? "Dark Mode" : "Light Mode";
  };

  return (
    <div>
      <header className={`header ${theme === "light" ? "" : "light-theme"}`}>
        <div className="container heading">
          <div>
            <h1>Where in the world</h1>
          </div>

          <div>
            <i
              className={theme === "light" ? "fas fa-moon" : "fas fa-sun"}
              onClick={toggleTheme}
            >
              {" "}
              {getModeText()}
            </i>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

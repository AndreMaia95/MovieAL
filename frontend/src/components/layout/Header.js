import React, { useContext, useEffect, useState } from "react";
import classes from "./Header.module.css";
import { ReactComponent as IconSun } from "../../assets/sun.svg";
import { ReactComponent as IconMoon } from "../../assets/moon.svg";
import { ReactComponent as IconUser } from "../../assets/user.svg";
import { ColorModeContext } from "../../context/ColorModeContext";
import SearchField from "./SearchField";

const Header = ({ onShow }) => {
  const { changeMode, isDarkMode } = useContext(ColorModeContext);
  const [pageScrolled, setPageScrolled] = useState(false);

  useEffect(() => {
    const scrollPage = () => {
      if (window.scrollY > 16) {
        setPageScrolled(true);
      } else {
        setPageScrolled(false);
      }
    };

    window.addEventListener("scroll", scrollPage);

    return () => {
      window.removeEventListener("scroll", scrollPage);
    };
  }, []);

  return (
    <header
      className={`${classes.header} ${pageScrolled ? classes.scroll : ""}`}
    >
      <div className={`container ${classes.container}`}>
        <span className={classes.logo}>MovieAL</span>

        <SearchField />

        <button className={classes.user} onClick={onShow}>
          <span className={classes.amount}>
            <IconUser />
          </span>
        </button>

        <button
          className={classes.btnColorMode}
          onClick={changeMode}
          title={isDarkMode ? "Ativar White Mode" : "Ativar Dark Mode"}
        >
          {isDarkMode ? <IconSun /> : <IconMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;

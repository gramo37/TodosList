import React, { useState, useEffect } from "react";
import "./navbar.css";
import { useRef } from "react";
import NavItem from "./NavItem";

const Navbar = () => {
  const hamburgerRef = useRef(null);
  const menuRef = useRef(null);
  const [hamOpen, sethamOpen] = useState(true);

  useEffect(() => {
    menuRef.current.classList.add("nav-menu-close");
    menuRef.current.classList.remove("nav-menu-open");
  }, []);

  const hamClicked = () => {
    if (hamOpen) {
      sethamOpen(false);
      hamburgerRef.current.classList.add("change");
      menuRef.current.classList.add("nav-menu-open");
      menuRef.current.classList.remove("nav-menu-close");
    } else if (!hamOpen) {
      sethamOpen(true);
      hamburgerRef.current.classList.remove("change");
      menuRef.current.classList.add("nav-menu-close");
      menuRef.current.classList.remove("nav-menu-open");
    }
  };
  return (
    <>
      <div className="container" onClick={hamClicked} ref={hamburgerRef}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>

      <menu className="nav-menu" ref={menuRef}>
        <NavItem />
      </menu>

      <nav className="nav-container">
        <NavItem />
      </nav>
    </>
  );
};

export default Navbar;

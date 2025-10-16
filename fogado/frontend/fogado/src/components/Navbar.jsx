import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/Navbar.css";

function Navbar(){
  const [open, setOpen] = useState(false);

  const handleMenu = () => setOpen((o) => !o);
  const closeMenu = () => setOpen(false);

  return (
    <nav className={`navbar${open ? " open" : ""}`}>
      <button className="menu-btn" onClick={handleMenu} aria-label="Menü">
        &#9776;
      </button>
      <ul onClick={closeMenu}>
        <li><Link to="/">Főoldal</Link></li>
        <li><Link to="/hettorpe">A hét törpe fogadó</Link></li>
        <li><Link to="/kihasznaltsag">Szobák kihasználtsága</Link></li>
        <li><Link to="/foglaltsag">Szobafoglaltság</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
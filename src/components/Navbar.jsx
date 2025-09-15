'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const linkDict = [
  {name : "HomePage", link : "/", className : ""},
  {name : "Games", link : "/games", className : ""},
  {name : "Events", link : "/events", className : ""},
  {name : "Friends", link : "/friends", className : ""},
  {name : "profile", link : "/profile", className : ""},
  {name : "login", link : "/login", className : "text-lg"},
  {name : "register", link : "/register", className : "text-lg"}
]

export default function Navbar() {
  const pathName = usePathname();
  console.log(pathName);
  const [menuOpen, setMenuOpen] = useState(false);
  console.log(menuOpen);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Vérifie aussi au premier rendu
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
// usepathname
  return (
  <>
  <nav className="navbar flex justify-between items-center px-6 py-4 text-xl">
    <h1>logo</h1>
    <ul className="navbar_link md:flex gap-4 hidden">
      {linkDict.map(({name, link, className}, index) => (
        <li key={index}><Link href={`${link}`} className={className  + ((pathName === link) ? " active" : "")}>{name}</Link></li>
      ))}
    </ul>
    <button className={`navbar_menuBurger md:hidden ${(menuOpen) ? 'rotate' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
      <div></div>
      <div></div>
      <div></div>
    </button>
  </nav>
  <div className={`mobile-panel ${menuOpen ? 'open' : ''}`}>
        <ul className="flex flex-col  gap-6 text-xl">
          {linkDict.map(({name, link, className}, index) => (
            <li key={index}><Link href={`${link}`} className={className + ((pathName == link) ? " active" : "")} onClick={() => setMenuOpen(false)}>{name}</Link></li>
          ))}
        </ul>
  </div>
  </>
);
}
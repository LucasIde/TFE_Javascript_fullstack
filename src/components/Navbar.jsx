'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "./auth/authContext";



export default function Navbar() {
  const pathName = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const {logout, isAuthenticated} = useAuth();

  const linkDict = [
    {name : "HomePage", link : "/", className : ""},
    {name : "Events", link : "/events", className : ""},
    {name : "Friends", link : "/friends", className : `${(!isAuthenticated) && "hidden"}`},
    {name : "Profile", link : "/profile", className : `${(!isAuthenticated) && "hidden"}`},
    {name : "Login", link : "/login", className : `text-lg ${(isAuthenticated) && "hidden"}`},
    {name : "Register", link : "/register", className : `text-lg ${(isAuthenticated) && "hidden"}`}
  ]
  
  
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
  
  return (
    <>
  <nav className="navbar flex justify-between items-center px-6 py-4 text-xl">
    <h1>logo</h1>
    <ul className="navbar_link md:flex gap-4 hidden">
      {linkDict.map(({name, link, className}, index) => (
        <li key={index}><Link href={`${link}`} className={className  + ((pathName === link) ? " active" : "")}>{name}</Link></li>
      ))}
      {(isAuthenticated) && <li><button onClick={() => logout()}>logout</button></li>}
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
          {(isAuthenticated) && <li><button onClick={() => logout()}>logout</button></li>}
        </ul>
  </div>
  </>
);
}
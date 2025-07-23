import React from "react";
import HomeIcon from "../assets/icons8-home-24.png";
import { Link } from 'react-router-dom';
export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
     
      <li>
        <Link to="/callaroundtheworld" className="text-white hover:text-teal-400 transition-colors duration-200 text-lg">
        Call Around the World
    </Link>
        </li>
        <li>
          <a
          href="https://forms.gle/mcTYDSDLCk24zR1y6"
          className="text-white hover:text-teal-400 transition-colors duration-200 text-lg"
          >
          Submit RC    
          </a>
        </li>
    </ul>
  );

  return (
    <div className="w-full bg-aiesecBlue">
      {/* Navbar */}
      
      <nav className="sticky top-0 left-0 right-0 z-50 w-full bg-transparent shadow py-4">
  <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
    <Link to="/" className="text-white text-xl font-semibold tracking-wide">
      <img src={ HomeIcon } alt="Home Icon" />
    </Link>

    <div className="hidden lg:block">{navList}</div>

    {/* Mobile menu button */}
    <button
      className="lg:hidden text-white"
      onClick={() => setOpenNav(!openNav)}
      aria-label="Toggle menu"
    >
      {openNav ? (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )}
    </button>
  </div>

  {/* Mobile nav items */}
  {openNav && <div className="mt-4 lg:hidden px-4">{navList}</div>}
</nav>


      {/* Content */}

    </div>
  );
}

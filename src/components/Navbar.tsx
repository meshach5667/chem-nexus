import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  AtomIcon, 
  Search, 
  FlaskConical 
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <AtomIcon size={24} className="text-primary" />
          <span className="font-bold text-xl">ChemNexus</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/elements" className="text-foreground/80 hover:text-primary transition-colors">
            Periodic Table
          </Link>
          <Link to="/compounds" className="text-foreground/80 hover:text-primary transition-colors">
            Compounds
          </Link>
          <Link to="/reactions" className="text-foreground/80 hover:text-primary transition-colors">
            Reactions
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col p-4 gap-4 bg-background border-b">
            <Link
              to="/"
              className="flex items-center gap-2 py-2 hover:text-primary"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/elements"
              className="flex items-center gap-2 py-2 hover:text-primary"
              onClick={closeMenu}
            >
              Periodic Table
            </Link>
            <Link
              to="/compounds"
              className="flex items-center gap-2 py-2 hover:text-primary"
              onClick={closeMenu}
            >
              Compounds
            </Link>
            <Link
              to="/reactions"
              className="flex items-center gap-2 py-2 hover:text-primary"
              onClick={closeMenu}
            >
              Reactions
            </Link>
            <div className="flex items-center gap-2 pt-2 border-t">
              <Button variant="outline" size="sm" className="w-full" onClick={closeMenu}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;


import React from "react";
import { AtomIcon, Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-background border-t">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <Link to="/" className="flex items-center gap-2">
              <AtomIcon size={24} className="text-primary" />
              <span className="font-bold text-xl">ChemNexus</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Explore the world of chemistry with comprehensive data on elements,
              compounds, and molecular structures.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Explore</h3>
              <ul className="space-y-1">
                <li>
                  <Link to="/elements" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Periodic Table
                  </Link>
                </li>
                <li>
                  <Link to="/compounds" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Compounds
                  </Link>
                </li>
                <li>
                  <Link to="/drugs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Pharmaceuticals
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-1">
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Connect</h3>
            <div className="flex gap-4">
              <a href="https://github.com/meshach5667/chem-nexus" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://x.com/MeshachZakumi" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">X</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ChemNexus Explorer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

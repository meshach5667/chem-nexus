
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AtomIcon, BeakerIcon, FlaskConical, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    // Navigate to compounds search with the query
    navigate(`/compounds?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-background to-muted py-20 molecule-bg">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Discover the World of <span className="text-primary">Chemistry</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Explore elements, compounds, and pharmaceutical data in an interactive platform designed for students, researchers and chemistry enthusiasts.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <SearchBar onSearch={handleSearch} placeholder="Search for compounds..." />
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link to="/elements">Explore the Periodic Table</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/compounds">Browse Compounds</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Floating elements animation */}
          <div className="absolute top-40 left-10 opacity-30 animate-float">
            <AtomIcon size={60} className="text-primary" />
          </div>
          <div className="absolute bottom-20 right-10 opacity-20 animate-float animation-delay-2000">
            <BeakerIcon size={40} className="text-secondary" />
          </div>
          <div className="absolute top-60 right-40 opacity-25 animate-float animation-delay-1000">
            <FlaskConical size={50} className="text-accent" />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">Periodic Table</CardTitle>
                  <CardDescription>
                    Interactive exploration of elements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-4">
                    <AtomIcon size={48} className="text-primary" />
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    Discover detailed information about chemical elements, including properties, electron configuration, and more.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/elements">Explore Elements</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">Compounds</CardTitle>
                  <CardDescription>
                    Molecular structures and properties
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-4">
                    <FlaskConical size={48} className="text-secondary" />
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    Search and learn about chemical compounds, including formulas, structures, and physical properties.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/compounds">View Compounds</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">Pharmaceuticals</CardTitle>
                  <CardDescription>
                    Drugs and medical compounds
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-4">
                    <BeakerIcon size={48} className="text-accent" />
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    Explore pharmaceutical compounds, their structures, and basic information about their applications.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/drugs">Discover Drugs</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">About ChemNexus</h2>
                <p className="text-muted-foreground mb-4">
                  ChemNexus Explorer is designed to make chemistry accessible and engaging for everyone. Whether you're a student, educator, or chemistry enthusiast, our platform provides accurate and detailed information about the building blocks of our world.
                </p>
                <p className="text-muted-foreground">
                  Our data is sourced from PubChem and other reliable chemistry databases to ensure you have access to the most accurate and up-to-date information.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-72 h-72">
                  <div className="absolute inset-0 bg-gradient-radial from-secondary/20 to-transparent rounded-full animate-pulse-slow"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AtomIcon size={120} className="text-secondary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

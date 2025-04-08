
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PeriodicTable from '@/components/PeriodicTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { elements, getElementBySymbol } from '@/utils/elementData';
import ElementCard from '@/components/ElementCard';
import { Search, ChevronLeft } from 'lucide-react';

const Elements = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      const element = getElementBySymbol(searchQuery);
      if (element) {
        setSelectedElement(element.symbol);
      }
    }
  };

  const filteredElements = searchQuery
    ? elements.filter(
        element =>
          element.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          element.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const elementDetail = selectedElement
    ? elements.find(el => el.symbol.toLowerCase() === selectedElement.toLowerCase())
    : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container px-4 py-8 md:px-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2"
            onClick={() => navigate('/')}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Periodic Table of Elements</h1>
        </div>

        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex w-full max-w-sm gap-2 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by element name or symbol"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>

          {/* Quick search results */}
          {searchQuery && filteredElements.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Search Results:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {filteredElements.slice(0, 6).map(element => (
                  <ElementCard
                    key={element.number}
                    element={element}
                    className="cursor-pointer"
                    onClick={() => setSelectedElement(element.symbol)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <Tabs defaultValue="periodic-table" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="periodic-table">Periodic Table</TabsTrigger>
            {elementDetail && (
              <TabsTrigger value="element-detail">
                {elementDetail.name} Details
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="periodic-table" className="mt-2">
            <div className="bg-card p-4 rounded-lg shadow-sm">
              <PeriodicTable />
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Element Categories</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {[
                  { name: "Nonmetal", color: "bg-element-nonmetal" },
                  { name: "Noble Gas", color: "bg-element-noble-gas" },
                  { name: "Alkali Metal", color: "bg-element-alkali-metal" },
                  { name: "Alkaline Earth", color: "bg-element-alkaline-earth" },
                  { name: "Metalloid", color: "bg-element-metalloid" },
                  { name: "Halogen", color: "bg-element-halogen" },
                  { name: "Transition Metal", color: "bg-element-transition-metal" },
                  { name: "Metal", color: "bg-element-metal" },
                  { name: "Lanthanide", color: "bg-element-lanthanide" },
                  { name: "Actinide", color: "bg-element-actinide" }
                ].map(category => (
                  <div key={category.name} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                    <span className="text-sm">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          {elementDetail && (
            <TabsContent value="element-detail" className="mt-2">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <ElementCard element={elementDetail} expanded className="mb-6" />
                  <div className="bg-card p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-4">Electron Configuration</h3>
                    <p className="text-lg font-mono">{elementDetail.electron_configuration}</p>
                    <div className="mt-4">
                      <h4 className="text-md font-semibold mb-2">Electron Shells</h4>
                      <div className="flex items-center justify-center gap-4 py-4">
                        {Array.from({ length: elementDetail.period }, (_, i) => (
                          <div 
                            key={i} 
                            className={`
                              w-${8 + i * 4} h-${8 + i * 4} 
                              rounded-full border-2 border-dashed 
                              border-primary/40 flex items-center 
                              justify-center relative
                            `}
                            style={{ 
                              width: `${(i + 1) * 40}px`,
                              height: `${(i + 1) * 40}px`
                            }}
                          >
                            {i === elementDetail.period - 1 && (
                              <div className="w-3 h-3 bg-primary rounded-full animate-ping absolute"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Element Information</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-md font-semibold">Description</h4>
                      <p className="mt-1 text-muted-foreground">
                        {elementDetail.name} (symbol: {elementDetail.symbol}) is a{" "}
                        {elementDetail.category.replace('-', ' ')} with atomic number {elementDetail.number}.
                        It belongs to period {elementDetail.period}
                        {elementDetail.group ? ` and group ${elementDetail.group}` : ''} of the periodic table.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-md font-semibold">Physical Properties</h4>
                      <p className="mt-1 text-muted-foreground">
                        The atomic mass of {elementDetail.name} is {elementDetail.atomic_mass.toFixed(4)} u.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-md font-semibold">Position in Periodic Table</h4>
                      <p className="mt-1 text-muted-foreground">
                        {elementDetail.name} is located in period {elementDetail.period}
                        {elementDetail.group ? ` and group ${elementDetail.group}` : ''}.
                        It belongs to the {elementDetail.block}-block elements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Elements;

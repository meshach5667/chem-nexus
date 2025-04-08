
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import MoleculeViewer from '@/components/MoleculeViewer';
import chemistryApi, { CompoundData } from '@/services/chemistryApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const Compounds = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<CompoundData[]>([]);
  const [selectedCompound, setSelectedCompound] = useState<CompoundData | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get search query from URL if present
  const queryParams = new URLSearchParams(location.search);
  const queryFromUrl = queryParams.get('q');

  useEffect(() => {
    if (queryFromUrl) {
      handleSearch(queryFromUrl);
    }
  }, [queryFromUrl]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setSelectedCompound(null);
    
    try {
      const results = await chemistryApi.searchCompounds(query);
      setSearchResults(results);
      
      // Update URL with search query
      navigate(`/compounds?q=${encodeURIComponent(query)}`);
      
      if (results.length === 0) {
        toast({
          title: "No compounds found",
          description: `No results found for "${query}"`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error searching compounds:', error);
      toast({
        title: "Search Error",
        description: "An error occurred while searching for compounds",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompoundSelect = (compound: CompoundData) => {
    setSelectedCompound(compound);
  };

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
          <h1 className="text-3xl font-bold">Chemical Compounds</h1>
        </div>

        <div className="w-full max-w-xl mx-auto mb-8">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search for compounds (e.g., aspirin, caffeine, acetone)" 
            className="w-full"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Searching compounds...</span>
          </div>
        ) : (
          <>
            {searchResults.length > 0 && (
              <Tabs defaultValue={selectedCompound ? "details" : "results"} className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="results">Search Results</TabsTrigger>
                  {selectedCompound && (
                    <TabsTrigger value="details">Compound Details</TabsTrigger>
                  )}
                </TabsList>
                <TabsContent value="results" className="mt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((compound) => (
                      <Card key={compound.cid} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCompoundSelect(compound)}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{compound.iupac_name || `Compound #${compound.cid}`}</CardTitle>
                          {compound.molecular_formula && (
                            <CardDescription>{compound.molecular_formula}</CardDescription>
                          )}
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="w-full aspect-square max-h-32 flex items-center justify-center bg-muted/50 rounded-md overflow-hidden">
                            {compound.image_url ? (
                              <img 
                                src={compound.image_url} 
                                alt={`Structure of ${compound.iupac_name || `Compound #${compound.cid}`}`}
                                className="max-w-full max-h-full object-contain"
                              />
                            ) : (
                              <p className="text-muted-foreground">No structure available</p>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" size="sm" className="w-full" onClick={() => handleCompoundSelect(compound)}>
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                {selectedCompound && (
                  <TabsContent value="details" className="mt-2">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-1">
                        <MoleculeViewer 
                          name={selectedCompound.iupac_name || `Compound #${selectedCompound.cid}`}
                          formula={selectedCompound.molecular_formula}
                          imageUrl={selectedCompound.image_url}
                          smiles={selectedCompound.smiles}
                          className="h-full"
                        />
                      </div>
                      <div className="lg:col-span-2">
                        <Card className="h-full">
                          <CardHeader>
                            <CardTitle>{selectedCompound.iupac_name || `Compound #${selectedCompound.cid}`}</CardTitle>
                            <CardDescription>PubChem CID: {selectedCompound.cid}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-sm font-medium">Molecular Formula</h3>
                                <p className="text-xl font-mono">{selectedCompound.molecular_formula || 'N/A'}</p>
                              </div>
                              <Separator />
                              <div>
                                <h3 className="text-sm font-medium">Molecular Weight</h3>
                                <p>{selectedCompound.molecular_weight ? `${selectedCompound.molecular_weight} g/mol` : 'N/A'}</p>
                              </div>
                              <Separator />
                              <div>
                                <h3 className="text-sm font-medium">SMILES Notation</h3>
                                <p className="text-sm font-mono break-all">{selectedCompound.smiles || 'N/A'}</p>
                              </div>
                              <Separator />
                              <div>
                                <h3 className="text-sm font-medium">InChI</h3>
                                <p className="text-sm font-mono break-all">{selectedCompound.inchi || 'N/A'}</p>
                              </div>
                              <div className="pt-4">
                                <Button 
                                  variant="outline" 
                                  onClick={() => window.open(`https://pubchem.ncbi.nlm.nih.gov/compound/${selectedCompound.cid}`, '_blank')}
                                >
                                  View on PubChem
                                  <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            )}

            {searchResults.length === 0 && !isLoading && !queryFromUrl && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-2">Search for Chemical Compounds</h2>
                <p className="text-muted-foreground mb-6">
                  Enter a compound name like "caffeine", "aspirin", or "glucose" to get started
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8">
                  {["water", "aspirin", "caffeine"].map((example) => (
                    <Button 
                      key={example} 
                      variant="outline"
                      onClick={() => handleSearch(example)}
                    >
                      Search "{example}"
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Compounds;

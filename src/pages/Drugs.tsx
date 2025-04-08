
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import MoleculeViewer from '@/components/MoleculeViewer';
import chemistryApi, { CompoundData } from '@/services/chemistryApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Drugs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [drugs, setDrugs] = useState<CompoundData[]>([]);
  const [selectedDrug, setSelectedDrug] = useState<CompoundData | null>(null);
  const [searchResults, setSearchResults] = useState<CompoundData[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadDrugs();
  }, []);

  const loadDrugs = async () => {
    setIsLoading(true);
    try {
      const results = await chemistryApi.getDrugs(12);
      setDrugs(results);
    } catch (error) {
      console.error('Error loading drugs:', error);
      toast({
        title: "Error",
        description: "Failed to load pharmaceutical data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setSelectedDrug(null);
    
    try {
      const results = await chemistryApi.searchCompounds(query);
      setSearchResults(results);
      
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

  const handleDrugSelect = (drug: CompoundData) => {
    setSelectedDrug(drug);
    setSearchResults([]);
  };

  const displayedCompounds = searchResults.length > 0 ? searchResults : drugs;

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
          <h1 className="text-3xl font-bold">Pharmaceutical Compounds</h1>
        </div>

        <div className="w-full max-w-xl mx-auto mb-8">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search for pharmaceutical compounds" 
            className="w-full"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading pharmaceutical data...</span>
          </div>
        ) : (
          <Tabs defaultValue={selectedDrug ? "details" : "list"} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="list">
                {searchResults.length > 0 ? 'Search Results' : 'Common Pharmaceuticals'}
              </TabsTrigger>
              {selectedDrug && (
                <TabsTrigger value="details">Compound Details</TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="list" className="mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {displayedCompounds.map((drug) => (
                  <Card 
                    key={drug.cid} 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleDrugSelect(drug)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{drug.iupac_name || `Compound #${drug.cid}`}</CardTitle>
                      {drug.molecular_formula && (
                        <CardDescription>{drug.molecular_formula}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="w-full aspect-square max-h-32 flex items-center justify-center bg-muted/50 rounded-md overflow-hidden">
                        {drug.image_url ? (
                          <img 
                            src={drug.image_url} 
                            alt={`Structure of ${drug.iupac_name || `Compound #${drug.cid}`}`}
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : (
                          <p className="text-muted-foreground">No structure available</p>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-4"
                        onClick={() => handleDrugSelect(drug)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            {selectedDrug && (
              <TabsContent value="details" className="mt-2">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <MoleculeViewer 
                      name={selectedDrug.iupac_name || `Compound #${selectedDrug.cid}`}
                      formula={selectedDrug.molecular_formula}
                      imageUrl={selectedDrug.image_url}
                      smiles={selectedDrug.smiles}
                      className="h-full"
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle>{selectedDrug.iupac_name || `Compound #${selectedDrug.cid}`}</CardTitle>
                        <CardDescription>PubChem CID: {selectedDrug.cid}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium">Molecular Formula</h3>
                            <p className="text-xl font-mono">{selectedDrug.molecular_formula || 'N/A'}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">Molecular Weight</h3>
                            <p>{selectedDrug.molecular_weight ? `${selectedDrug.molecular_weight} g/mol` : 'N/A'}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">SMILES Notation</h3>
                            <p className="text-sm font-mono break-all">{selectedDrug.smiles || 'N/A'}</p>
                          </div>
                          <div className="pt-4">
                            <Button 
                              variant="outline" 
                              onClick={() => window.open(`https://pubchem.ncbi.nlm.nih.gov/compound/${selectedDrug.cid}`, '_blank')}
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
      </main>

      <Footer />
    </div>
  );
};

export default Drugs;

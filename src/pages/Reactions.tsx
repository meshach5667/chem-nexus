
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
import { ChevronLeft, ChevronRight, FlaskConical, TestTubes, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Reaction {
  id: string;
  name: string;
  description: string;
  reactants: CompoundData[];
  products: CompoundData[];
  type: 'synthesis' | 'decomposition' | 'single-replacement' | 'double-replacement';
}

const commonReactions: Reaction[] = [
  {
    id: '1',
    name: 'Water Formation',
    description: 'Hydrogen gas reacts with oxygen gas to form water',
    type: 'synthesis',
    reactants: [
      { cid: 783, molecular_formula: 'H2', iupac_name: 'Hydrogen' },
      { cid: 977, molecular_formula: 'O2', iupac_name: 'Oxygen' }
    ],
    products: [
      { cid: 962, molecular_formula: 'H2O', iupac_name: 'Water' }
    ]
  },
  {
    id: '2',
    name: 'Salt Formation',
    description: 'Sodium metal reacts with chlorine gas to form table salt',
    type: 'synthesis',
    reactants: [
      { cid: 5360545, molecular_formula: 'Na', iupac_name: 'Sodium' },
      { cid: 24526, molecular_formula: 'Cl2', iupac_name: 'Chlorine' }
    ],
    products: [
      { cid: 5234, molecular_formula: 'NaCl', iupac_name: 'Sodium chloride' }
    ]
  }
];

const Reactions = () => {
  const [selectedReaction, setSelectedReaction] = useState<Reaction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      // Filter reactions by name or description
      const results = commonReactions.filter(reaction => 
        reaction.name.toLowerCase().includes(query.toLowerCase()) ||
        reaction.description.toLowerCase().includes(query.toLowerCase())
      );
      
      if (results.length === 0) {
        toast({
          title: "No reactions found",
          description: `No results found for "${query}"`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error searching reactions:', error);
      toast({
        title: "Search Error",
        description: "An error occurred while searching for reactions",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
          <h1 className="text-3xl font-bold">Chemical Reactions Explorer</h1>
        </div>

        <div className="w-full max-w-xl mx-auto mb-8">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search for chemical reactions" 
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commonReactions.map((reaction) => (
            <Card 
              key={reaction.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedReaction(reaction)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{reaction.name}</CardTitle>
                  <FlaskConical className="h-5 w-5 text-primary" />
                </div>
                <CardDescription>{reaction.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between gap-4 text-sm">
                  <div className="flex-1">
                    <p className="font-medium mb-1">Reactants:</p>
                    {reaction.reactants.map((reactant, index) => (
                      <div key={index} className="text-muted-foreground">
                        {reactant.molecular_formula}
                      </div>
                    ))}
                  </div>
                  <ArrowRight className="h-4 w-4" />
                  <div className="flex-1">
                    <p className="font-medium mb-1">Products:</p>
                    {reaction.products.map((product, index) => (
                      <div key={index} className="text-muted-foreground">
                        {product.molecular_formula}
                      </div>
                    ))}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedReaction && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
            <div className="container flex items-center justify-center min-h-screen">
              <Card className="w-full max-w-3xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{selectedReaction.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedReaction(null)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>{selectedReaction.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Reactants</h3>
                      {selectedReaction.reactants.map((reactant, index) => (
                        <div key={index} className="mb-4">
                          <MoleculeViewer
                            name={reactant.iupac_name || ''}
                            formula={reactant.molecular_formula || ''}
                            imageUrl={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${reactant.cid}/PNG`}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Products</h3>
                      {selectedReaction.products.map((product, index) => (
                        <div key={index} className="mb-4">
                          <MoleculeViewer
                            name={product.iupac_name || ''}
                            formula={product.molecular_formula || ''}
                            imageUrl={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${product.cid}/PNG`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Reactions;

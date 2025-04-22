import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import MoleculeViewer from '@/components/MoleculeViewer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, FlaskConical, ArrowRight, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import chemistryApi, { CompoundData } from '@/services/chemistryApi';

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
  const [filteredReactions, setFilteredReactions] = useState<Reaction[]>(commonReactions);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const results = commonReactions.filter(reaction =>
        reaction.name.toLowerCase().includes(query.toLowerCase()) ||
        reaction.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredReactions(results);

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

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedReaction(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container px-4 py-8 md:px-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="mr-2" onClick={() => navigate('/')}>
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

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReactions.map((reaction) => (
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
                      {reaction.reactants.map((r, i) => (
                        <div key={i} className="text-muted-foreground">
                          {r.molecular_formula}
                        </div>
                      ))}
                    </div>
                    <ArrowRight className="h-4 w-4" />
                    <div className="flex-1">
                      <p className="font-medium mb-1">Products:</p>
                      {reaction.products.map((p, i) => (
                        <div key={i} className="text-muted-foreground">
                          {p.molecular_formula}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

{selectedReaction && (
  <div
    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-8"
    onClick={() => setSelectedReaction(null)}
  >
    <div
      className="bg-white dark:bg-background rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">{selectedReaction.name}</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setSelectedReaction(null)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <CardDescription className="text-base mt-2">{selectedReaction.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Reactants</h3>
              {selectedReaction.reactants.map((r, i) => (
                <div key={i} className="mb-6">
                  <MoleculeViewer
                    name={r.iupac_name}
                    formula={r.molecular_formula}
                    imageUrl={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${r.cid}/PNG`}
                  />
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              {selectedReaction.products.map((p, i) => (
                <div key={i} className="mb-6">
                  <MoleculeViewer
                    name={p.iupac_name}
                    formula={p.molecular_formula}
                    imageUrl={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${p.cid}/PNG`}
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

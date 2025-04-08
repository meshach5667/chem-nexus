
// Using PubChem PUG REST API: https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest

const BASE_URL = "https://pubchem.ncbi.nlm.nih.gov/rest/pug";

export interface ElementData {
  number: number;
  symbol: string;
  name: string;
  atomic_mass: number;
  category: string;
  group: number | null;
  period: number;
  electron_configuration: string;
  density?: number | null;
  discovery_year?: number | null;
  description?: string;
  properties?: Record<string, any>;
}

export interface CompoundData {
  cid: number;
  iupac_name?: string;
  molecular_formula?: string;
  molecular_weight?: number;
  smiles?: string;
  inchi?: string;
  description?: string;
  properties?: Record<string, any>;
  image_url?: string;
}

const chemistryApi = {
  // Get compound data by CID (PubChem Compound ID)
  async getCompoundByCID(cid: number): Promise<CompoundData> {
    try {
      // Get basic compound information
      const response = await fetch(`${BASE_URL}/compound/cid/${cid}/JSON`);
      if (!response.ok) throw new Error('Failed to fetch compound data');
      const data = await response.json();

      // Get property data
      const propsResponse = await fetch(`${BASE_URL}/compound/cid/${cid}/property/MolecularFormula,MolecularWeight,InChI,InChIKey,CanonicalSMILES,IUPACName/JSON`);
      let properties = {};
      if (propsResponse.ok) {
        const propsData = await propsResponse.json();
        properties = propsData.PropertyTable.Properties[0] || {};
      }

      return {
        cid,
        molecular_formula: properties.MolecularFormula || '',
        molecular_weight: properties.MolecularWeight || null,
        iupac_name: properties.IUPACName || '',
        smiles: properties.CanonicalSMILES || '',
        inchi: properties.InChI || '',
        image_url: `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG`
      };
    } catch (error) {
      console.error("Error fetching compound data:", error);
      return { cid };
    }
  },

  // Search for compounds by name
  async searchCompounds(query: string, limit: number = 10): Promise<CompoundData[]> {
    try {
      const response = await fetch(`${BASE_URL}/compound/name/${encodeURIComponent(query)}/cids/JSON`);
      if (!response.ok) throw new Error('Failed to fetch compounds');
      
      const data = await response.json();
      const cids = data.IdentifierList?.CID || [];
      
      // Limit results
      const limitedCids = cids.slice(0, limit);
      
      // Get full data for each compound
      const compounds = await Promise.all(
        limitedCids.map((cid: number) => this.getCompoundByCID(cid))
      );
      
      return compounds;
    } catch (error) {
      console.error("Error searching compounds:", error);
      return [];
    }
  },

  // Get a list of FDA approved drugs
  async getDrugs(limit: number = 20): Promise<CompoundData[]> {
    try {
      // Using drugs collection from PubChem
      const response = await fetch(`${BASE_URL}/compound/listkey/xrxgtpj7tdoofm-KNFSKDLFBGCSGL-UHFFFAOYSA-N/cids/JSON?list_return=listkey`);
      if (!response.ok) throw new Error('Failed to fetch drugs');
      
      const data = await response.json();
      const listKey = data.IdentifierList?.ListKey;
      
      if (!listKey) return [];
      
      // Get compounds from the listkey
      const cidsResponse = await fetch(`${BASE_URL}/compound/listkey/${listKey}/cids/JSON`);
      if (!cidsResponse.ok) throw new Error('Failed to fetch drug CIDs');
      
      const cidsData = await cidsResponse.json();
      const cids = cidsData.IdentifierList?.CID || [];
      
      // Limit results and get full data for each drug
      const limitedCids = cids.slice(0, limit);
      const drugs = await Promise.all(
        limitedCids.map((cid: number) => this.getCompoundByCID(cid))
      );
      
      return drugs;
    } catch (error) {
      console.error("Error fetching drugs:", error);
      // Return some fallback common drugs if the API fails
      const fallbackCids = [2244, 5962, 2519, 5790, 4594];
      const drugs = await Promise.all(
        fallbackCids.map((cid: number) => this.getCompoundByCID(cid))
      );
      return drugs;
    }
  }
};

export default chemistryApi;

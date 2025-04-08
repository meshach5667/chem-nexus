
export interface Element {
  number: number;
  symbol: string;
  name: string;
  atomic_mass: number;
  category: string;
  group?: number;
  period: number;
  block: string;
  electron_configuration: string;
}

// First 36 elements of the periodic table with their basic properties
export const elements: Element[] = [
  {
    number: 1,
    symbol: "H",
    name: "Hydrogen",
    atomic_mass: 1.008,
    category: "nonmetal",
    group: 1,
    period: 1,
    block: "s",
    electron_configuration: "1s¹"
  },
  {
    number: 2,
    symbol: "He",
    name: "Helium",
    atomic_mass: 4.0026,
    category: "noble-gas",
    group: 18,
    period: 1,
    block: "s",
    electron_configuration: "1s²"
  },
  {
    number: 3,
    symbol: "Li",
    name: "Lithium",
    atomic_mass: 6.94,
    category: "alkali-metal",
    group: 1,
    period: 2,
    block: "s",
    electron_configuration: "[He] 2s¹"
  },
  {
    number: 4,
    symbol: "Be",
    name: "Beryllium",
    atomic_mass: 9.0122,
    category: "alkaline-earth",
    group: 2,
    period: 2,
    block: "s",
    electron_configuration: "[He] 2s²"
  },
  {
    number: 5,
    symbol: "B",
    name: "Boron",
    atomic_mass: 10.81,
    category: "metalloid",
    group: 13,
    period: 2,
    block: "p",
    electron_configuration: "[He] 2s² 2p¹"
  },
  {
    number: 6,
    symbol: "C",
    name: "Carbon",
    atomic_mass: 12.011,
    category: "nonmetal",
    group: 14,
    period: 2,
    block: "p",
    electron_configuration: "[He] 2s² 2p²"
  },
  {
    number: 7,
    symbol: "N",
    name: "Nitrogen",
    atomic_mass: 14.007,
    category: "nonmetal",
    group: 15,
    period: 2,
    block: "p",
    electron_configuration: "[He] 2s² 2p³"
  },
  {
    number: 8,
    symbol: "O",
    name: "Oxygen",
    atomic_mass: 15.999,
    category: "nonmetal",
    group: 16,
    period: 2,
    block: "p",
    electron_configuration: "[He] 2s² 2p⁴"
  },
  {
    number: 9,
    symbol: "F",
    name: "Fluorine",
    atomic_mass: 18.998,
    category: "halogen",
    group: 17,
    period: 2,
    block: "p",
    electron_configuration: "[He] 2s² 2p⁵"
  },
  {
    number: 10,
    symbol: "Ne",
    name: "Neon",
    atomic_mass: 20.180,
    category: "noble-gas",
    group: 18,
    period: 2,
    block: "p",
    electron_configuration: "[He] 2s² 2p⁶"
  },
  {
    number: 11,
    symbol: "Na",
    name: "Sodium",
    atomic_mass: 22.990,
    category: "alkali-metal",
    group: 1,
    period: 3,
    block: "s",
    electron_configuration: "[Ne] 3s¹"
  },
  {
    number: 12,
    symbol: "Mg",
    name: "Magnesium",
    atomic_mass: 24.305,
    category: "alkaline-earth",
    group: 2,
    period: 3,
    block: "s",
    electron_configuration: "[Ne] 3s²"
  },
  {
    number: 13,
    symbol: "Al",
    name: "Aluminum",
    atomic_mass: 26.982,
    category: "metal",
    group: 13,
    period: 3,
    block: "p",
    electron_configuration: "[Ne] 3s² 3p¹"
  },
  {
    number: 14,
    symbol: "Si",
    name: "Silicon",
    atomic_mass: 28.085,
    category: "metalloid",
    group: 14,
    period: 3,
    block: "p",
    electron_configuration: "[Ne] 3s² 3p²"
  },
  {
    number: 15,
    symbol: "P",
    name: "Phosphorus",
    atomic_mass: 30.974,
    category: "nonmetal",
    group: 15,
    period: 3,
    block: "p",
    electron_configuration: "[Ne] 3s² 3p³"
  },
  {
    number: 16,
    symbol: "S",
    name: "Sulfur",
    atomic_mass: 32.06,
    category: "nonmetal",
    group: 16,
    period: 3,
    block: "p",
    electron_configuration: "[Ne] 3s² 3p⁴"
  },
  {
    number: 17,
    symbol: "Cl",
    name: "Chlorine",
    atomic_mass: 35.45,
    category: "halogen",
    group: 17,
    period: 3,
    block: "p",
    electron_configuration: "[Ne] 3s² 3p⁵"
  },
  {
    number: 18,
    symbol: "Ar",
    name: "Argon",
    atomic_mass: 39.948,
    category: "noble-gas",
    group: 18,
    period: 3,
    block: "p",
    electron_configuration: "[Ne] 3s² 3p⁶"
  },
  {
    number: 19,
    symbol: "K",
    name: "Potassium",
    atomic_mass: 39.098,
    category: "alkali-metal",
    group: 1,
    period: 4,
    block: "s",
    electron_configuration: "[Ar] 4s¹"
  },
  {
    number: 20,
    symbol: "Ca",
    name: "Calcium",
    atomic_mass: 40.078,
    category: "alkaline-earth",
    group: 2,
    period: 4,
    block: "s",
    electron_configuration: "[Ar] 4s²"
  },
  // First few transition metals
  {
    number: 21,
    symbol: "Sc",
    name: "Scandium",
    atomic_mass: 44.956,
    category: "transition-metal",
    group: 3,
    period: 4,
    block: "d",
    electron_configuration: "[Ar] 4s² 3d¹"
  },
  {
    number: 22,
    symbol: "Ti",
    name: "Titanium",
    atomic_mass: 47.867,
    category: "transition-metal",
    group: 4,
    period: 4,
    block: "d",
    electron_configuration: "[Ar] 4s² 3d²"
  },
  {
    number: 23,
    symbol: "V",
    name: "Vanadium",
    atomic_mass: 50.942,
    category: "transition-metal",
    group: 5,
    period: 4,
    block: "d",
    electron_configuration: "[Ar] 4s² 3d³"
  },
  {
    number: 24,
    symbol: "Cr",
    name: "Chromium",
    atomic_mass: 51.996,
    category: "transition-metal",
    group: 6,
    period: 4,
    block: "d",
    electron_configuration: "[Ar] 4s¹ 3d⁵"
  },
  {
    number: 25,
    symbol: "Mn",
    name: "Manganese",
    atomic_mass: 54.938,
    category: "transition-metal",
    group: 7,
    period: 4,
    block: "d",
    electron_configuration: "[Ar] 4s² 3d⁵"
  },
  {
    number: 26,
    symbol: "Fe",
    name: "Iron",
    atomic_mass: 55.845,
    category: "transition-metal",
    group: 8,
    period: 4,
    block: "d",
    electron_configuration: "[Ar] 4s² 3d⁶"
  },
  {
    number: 27,
    symbol: "Co",
    name: "Cobalt",
    atomic_mass: 58.933,
    category: "transition-metal",
    group: 9,
    period: 4,
    block: "d",
    electron_configuration: "[Ar] 4s² 3d⁷"
  },
  {
    number: 28,
    symbol: "Ni",
    name: "Nickel",
    atomic_mass: 58.693,
    category: "transition-metal",
    group: 10,
    period: 4,
    block: "d",
    electron_configuration: "[Ar] 4s² 3d⁸"
  },
  {
    number: 29,
    symbol: "Cu",
    name: "Copper",
    atomic_mass: 63.546,
    category: "transition-metal",
    group: 11,
    period: 4,
    block: "d",
    electron_configuration: "[Ar] 4s¹ 3d¹⁰"
  },
  {
    number: 30,
    symbol: "Zn",
    name: "Zinc",
    atomic_mass: 65.38,
    category: "transition-metal",
    group: 12,
    period: 4,
    block: "d",
    electron_configuration: "[Ar] 4s² 3d¹⁰"
  },
  {
    number: 31,
    symbol: "Ga",
    name: "Gallium",
    atomic_mass: 69.723,
    category: "metal",
    group: 13,
    period: 4,
    block: "p",
    electron_configuration: "[Ar] 4s² 3d¹⁰ 4p¹"
  },
  {
    number: 32,
    symbol: "Ge",
    name: "Germanium",
    atomic_mass: 72.630,
    category: "metalloid",
    group: 14,
    period: 4,
    block: "p",
    electron_configuration: "[Ar] 4s² 3d¹⁰ 4p²"
  },
  {
    number: 33,
    symbol: "As",
    name: "Arsenic",
    atomic_mass: 74.922,
    category: "metalloid",
    group: 15,
    period: 4,
    block: "p",
    electron_configuration: "[Ar] 4s² 3d¹⁰ 4p³"
  },
  {
    number: 34,
    symbol: "Se",
    name: "Selenium",
    atomic_mass: 78.971,
    category: "nonmetal",
    group: 16,
    period: 4,
    block: "p",
    electron_configuration: "[Ar] 4s² 3d¹⁰ 4p⁴"
  },
  {
    number: 35,
    symbol: "Br",
    name: "Bromine",
    atomic_mass: 79.904,
    category: "halogen",
    group: 17,
    period: 4,
    block: "p",
    electron_configuration: "[Ar] 4s² 3d¹⁰ 4p⁵"
  },
  {
    number: 36,
    symbol: "Kr",
    name: "Krypton",
    atomic_mass: 83.798,
    category: "noble-gas",
    group: 18,
    period: 4,
    block: "p",
    electron_configuration: "[Ar] 4s² 3d¹⁰ 4p⁶"
  }
];

export const getElementBySymbol = (symbol: string): Element | undefined => {
  return elements.find(el => el.symbol.toLowerCase() === symbol.toLowerCase());
};

export const getElementByNumber = (number: number): Element | undefined => {
  return elements.find(el => el.number === number);
};

// Get category color class
export const getCategoryColorClass = (category: string): string => {
  const categoryMap: Record<string, string> = {
    "nonmetal": "bg-element-nonmetal",
    "noble-gas": "bg-element-noble-gas",
    "alkali-metal": "bg-element-alkali-metal",
    "alkaline-earth": "bg-element-alkaline-earth",
    "metalloid": "bg-element-metalloid",
    "halogen": "bg-element-halogen",
    "transition-metal": "bg-element-transition-metal",
    "metal": "bg-element-metal",
    "lanthanide": "bg-element-lanthanide",
    "actinide": "bg-element-actinide",
  };
  
  return categoryMap[category] || "bg-gray-300";
};

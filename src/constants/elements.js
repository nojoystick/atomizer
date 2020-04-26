import Theme from '../stylesheets/Theme.js';

const elements = theme => {
  if (!theme) {
    theme = Theme.light;
  }
  return [
    {
      atomicNumber: 1,
      key: 1,
      label: `<b>H</b>`,
      dropdownLabel: 'H',
      title: 'Hydrogen',
      opacity: 0.5,
      color: theme.nonMetal,
      category: 'nonMetal',
      weight: 1.008,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 2,
      key: 2,
      label: `<b>He</b>`,
      dropdownLabel: 'He',
      title: 'Helium',
      color: theme.nobleGas,
      category: 'nobleGas',
      weight: 4.0026,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 3,
      key: 3,
      label: `<b>Li</b>`,
      dropdownLabel: 'Li',
      title: 'Lithium',
      color: theme.alkaliMetal,
      category: 'alkaliMetal',
      weight: 6.94,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 4,
      key: 4,
      label: `<b>Be</b>`,
      dropdownLabel: 'Be',
      title: 'Beryllium',
      color: theme.alkaliMetal,
      category: 'alkaliMetal',
      weight: 9.0122,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 5,
      key: 5,
      label: `<b>B</b>`,
      dropdownLabel: 'B',
      title: 'Boron',
      color: theme.metalloid,
      category: 'metalloid',
      weight: 10.81,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 6,
      key: 6,
      label: `<b>C</b>`,
      dropdownLabel: 'C',
      title: 'Carbon',
      color: theme.nonMetal,
      category: 'nonMetal',
      weight: 12.011,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 7,
      key: 7,
      label: `<b>N</b>`,
      dropdownLabel: 'N',
      title: 'Nitrogen',
      color: theme.nonMetal,
      category: 'nonMetal',
      weight: 14.007,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 8,
      key: 8,
      label: `<b>O</b>`,
      dropdownLabel: 'O',
      title: 'Oxygen',
      color: theme.nonMetal,
      category: 'nonMetal',
      weight: 15.999,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 9,
      key: 9,
      label: `<b>F</b>`,
      dropdownLabel: 'F',
      title: 'Fluorine',
      color: theme.nonMetal,
      category: 'nonMetal',
      weight: 18.998,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 10,
      key: 10,
      label: `<b>Ne</b>`,
      dropdownLabel: 'Ne',
      title: 'Neon',
      color: theme.nobleGas,
      category: 'nobleGas',
      weight: 20.18,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 11,
      key: 11,
      label: `<b>Na</b>`,
      dropdownLabel: 'Na',
      title: 'Sodium',
      color: theme.alkaliMetal,
      category: 'alkaliMetal',
      weight: 22.99,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 12,
      key: 12,
      label: `<b>Mg</b>`,
      dropdownLabel: 'Mg',
      title: 'Magnesium',
      color: theme.alkaliMetal,
      category: 'alkaliMetal',
      weight: 24.305,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 13,
      key: 13,
      label: `<b>Al</b>`,
      dropdownLabel: 'Al',
      title: 'Aluminum',
      color: theme.postTransitionMetal,
      category: 'postTransitionMetal',
      weight: 26.982,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 14,
      key: 14,
      label: `<b>Si</b>`,
      dropdownLabel: 'Si',
      title: 'Silicon',
      color: theme.metalloid,
      category: 'metalloid',
      weight: 28.085,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 15,
      key: 15,
      label: `<b>P</b>`,
      dropdownLabel: 'P',
      title: 'Phosphorus',
      color: theme.nonMetal,
      category: 'nonMetal',
      weight: 30.974,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 16,
      key: 16,
      label: `<b>S</b>`,
      dropdownLabel: 'S',
      title: 'Sulfur',
      color: theme.nonMetal,
      category: 'nonMetal',
      weight: 32.06,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 17,
      key: 17,
      label: `<b>Cl</b>`,
      dropdownLabel: 'Cl',
      title: 'Chlorine',
      color: theme.nonMetal,
      category: 'nonMetal',
      weight: 35.45,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 18,
      key: 18,
      label: `<b>Ar</b>`,
      dropdownLabel: 'Ar',
      title: 'Argon',
      color: theme.nobleGas,
      category: 'nobleGas',
      weight: 39.948,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 19,
      key: 19,
      label: `<b>K</b>`,
      dropdownLabel: 'K',
      title: 'Potassium',
      color: theme.alkaliMetal,
      category: 'alkaliMetal',
      weight: 39.098,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 20,
      key: 20,
      label: `<b>Ca</b>`,
      dropdownLabel: 'Ca',
      title: 'Calcium',
      color: theme.alkaliMetal,
      category: 'alkaliMetal',
      weight: 40.078,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 21,
      key: 21,
      label: `<b>Sc</b>`,
      dropdownLabel: 'Sc',
      title: 'Scandium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 44.956,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 22,
      key: 22,
      label: `<b>Ti</b>`,
      dropdownLabel: 'Ti',
      title: 'Titanium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 47.867,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 23,
      key: 23,
      label: `<b>V</b>`,
      dropdownLabel: 'V',
      title: 'Vanadium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 50.942,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 24,
      key: 24,
      label: `<b>Cr</b>`,
      dropdownLabel: 'Cr',
      title: 'Chromium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 51.996,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 25,
      key: 25,
      label: `<b>Mn</b>`,
      dropdownLabel: 'Mn',
      title: 'Manganese',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 54.938,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 26,
      key: 26,
      label: `<b>Fe</b>`,
      dropdownLabel: 'Fe',
      title: 'Iron',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 55.845,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 27,
      key: 27,
      label: `<b>Co</b>`,
      dropdownLabel: 'Co',
      title: 'Cobalt',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 58.933,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 28,
      key: 28,
      label: `<b>Ni</b>`,
      dropdownLabel: 'Ni',
      title: 'Nickel',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 58.693,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 29,
      key: 29,
      label: `<b>Cu</b>`,
      dropdownLabel: 'Cu',
      title: 'Copper',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 63.546,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 30,
      key: 30,
      label: `<b>Zn</b>`,
      dropdownLabel: 'Zn',
      title: 'Zinc',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 65.38,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 31,
      key: 31,
      label: `<b>Ga</b>`,
      dropdownLabel: 'Ga',
      title: 'Gallium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 69.723,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 32,
      key: 32,
      label: `<b>Ge</b>`,
      dropdownLabel: 'Ge',
      title: 'Germanium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 72.63,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 33,
      key: 33,
      label: `<b>As</b>`,
      dropdownLabel: 'As',
      title: 'Arsenic',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 74.922,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 34,
      key: 34,
      label: `<b>Se</b>`,
      dropdownLabel: 'Se',
      title: 'Selenium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 78.971,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 35,
      key: 35,
      label: `<b>Br</b>`,
      dropdownLabel: 'Br',
      title: 'Bromine',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 79.904,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 36,
      key: 36,
      label: `<b>Kr</b>`,
      dropdownLabel: 'Kr',
      title: 'Krypton',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 83.798,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 37,
      key: 37,
      label: `<b>Rb</b>`,
      dropdownLabel: 'Rb',
      title: 'Rubidium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 85.468,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 38,
      key: 38,
      label: `<b>Sr</b>`,
      dropdownLabel: 'Sr',
      title: 'Strontium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 87.62,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 39,
      key: 39,
      label: `<b>Y</b>`,
      dropdownLabel: 'Y',
      title: 'Yttrium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 88.9,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 40,
      key: 40,
      label: `<b>Zr</b>`,
      dropdownLabel: 'Zr',
      title: 'Zirconium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 91.224,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 41,
      key: 41,
      label: `<b>Nb</b>`,
      dropdownLabel: 'Nb',
      title: 'Niobium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 92.906,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 42,
      key: 42,
      label: `<b>Mo</b>`,
      dropdownLabel: 'Mo',
      title: 'Molybdeum',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 95.95,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 43,
      key: 43,
      label: `<b>Tc</b>`,
      dropdownLabel: 'Tc',
      title: 'Technetium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 98,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 44,
      key: 44,
      label: `<b>Ru</b>`,
      dropdownLabel: 'Ru',
      title: 'Ruthenium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 101.07,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 45,
      key: 45,
      label: `<b>Rh</b>`,
      dropdownLabel: 'Rh',
      title: 'Rhodium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 102.91,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 46,
      key: 46,
      label: `<b>Pd</b>`,
      dropdownLabel: 'Pd',
      title: 'Palladium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 106.42,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 47,
      key: 47,
      label: `<b>Ag</b>`,
      dropdownLabel: 'Ag',
      title: 'Silver',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 107.87,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 48,
      key: 48,
      label: `<b>Cd</b>`,
      dropdownLabel: 'Cd',
      title: 'Cadmium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 112.41,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 49,
      key: 49,
      label: `<b>In</b>`,
      dropdownLabel: 'In',
      title: 'Indium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 114.82,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 50,
      key: 50,
      label: `<b>Sn</b>`,
      dropdownLabel: 'Sn',
      title: 'Tin',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 118.71,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 51,
      key: 51,
      label: `<b>Sb</b>`,
      dropdownLabel: 'Sb',
      title: 'Antimony',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 121.76,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 52,
      key: 52,
      label: `<b>Te</b>`,
      dropdownLabel: 'Te',
      title: 'Tellurium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 127.6,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 53,
      key: 53,
      label: `<b>I</b>`,
      dropdownLabel: 'I',
      title: 'Iodine',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 126.9,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 54,
      key: 54,
      label: `<b>Xe</b>`,
      dropdownLabel: 'Xe',
      title: 'Xenon',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 131.29,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 55,
      key: 55,
      label: `<b>Cs</b>`,
      dropdownLabel: 'Cs',
      title: 'Caesium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 132.91,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 56,
      key: 56,
      label: `<b>Ba</b>`,
      dropdownLabel: 'Ba',
      title: 'Barium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 137.33,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 57,
      key: 57,
      label: `<b>La</b>`,
      dropdownLabel: 'La',
      title: 'Lanthanium',
      color: theme.lanthanide,
      category: 'lanthanide',
      weight: 138.91,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 58,
      key: 58,
      label: `<b>Ce</b>`,
      dropdownLabel: 'Ce',
      title: 'Cerium',
      color: theme.lanthanide,
      category: 'lanthanide',
      weight: 140.12,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 59,
      key: 59,
      label: `<b>Pr</b>`,
      dropdownLabel: 'Pr',
      title: 'Praseodymium',
      color: theme.lanthanide,
      category: 'lanthanide',
      weight: 140.91,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 60,
      key: 60,
      label: `<b>Nd</b>`,
      dropdownLabel: 'Nd',
      title: 'Neodymium',
      color: theme.lanthanide,
      category: 'lanthanide',
      weight: 144.24,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 61,
      key: 61,
      label: `<b>Pm</b>`,
      dropdownLabel: 'Pm',
      title: 'Prometheum',
      color: theme.lanthanide,
      category: 'lanthanide',
      weight: 145,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 62,
      key: 62,
      label: `<b>Sm</b>`,
      dropdownLabel: 'Sm',
      title: 'Samarium',
      color: theme.lanthanide,
      category: 'lanthanide',
      weight: 150.36,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 63,
      key: 63,
      label: `<b>Eu</b>`,
      dropdownLabel: 'Eu',
      title: 'Europium',
      color: theme.lanthanide,
      category: 'lanthanide',
      weight: 151.96,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 64,
      key: 64,
      label: `<b>Gd</b>`,
      dropdownLabel: 'Gd',
      title: 'Gadolinium',
      color: theme.lanthanide,
      category: 'lanthanide',
      weight: 157.25,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 65,
      key: 65,
      label: `<b>Tb</b>`,
      dropdownLabel: 'Tb',
      title: 'Terbium',
      color: theme.lanthanide,
      category: 'lanthanide',
      weight: 158.93,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 66,
      key: 66,
      label: `<b>Dy</b>`,
      dropdownLabel: 'Dy',
      title: 'Dysprosium',
      color: theme.lanthanide,
      category: 'lanthanide',
      weight: 162.5,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 67,
      key: 67,
      label: `<b>Ho</b>`,
      dropdownLabel: 'Ho',
      title: 'Holmium',
      color: theme.lanthanide,
      category: 'lanthanide',
      weight: 164.93,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 68,
      key: 68,
      label: `<b>Er</b>`,
      dropdownLabel: 'Er',
      title: 'Erbium',
      color: theme.lanthanide,
      category: 'lanthanide',
      weight: 167.26,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 69,
      key: 69,
      label: `<b>Tm</b>`,
      dropdownLabel: 'Tm',
      title: 'Thulium',
      color: theme.lanthanide,
      category: 'lanthanide',
      weight: 168.93,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 70,
      key: 70,
      label: `<b>Yb</b>`,
      dropdownLabel: 'Yb',
      title: 'Ytterbium',
      color: theme.lanthanide,
      category: 'lanthanide',
      weight: 173.05,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 71,
      key: 71,
      label: `<b>Lu</b>`,
      dropdownLabel: 'Lu',
      title: 'Lutetium',
      color: theme.lanthanide,
      category: 'lanthanide',
      weight: 174.97,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 72,
      key: 72,
      label: `<b>Hf</b>`,
      dropdownLabel: 'Hf',
      title: 'Hafnium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 178.49,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 73,
      key: 73,
      label: `<b>Ta</b>`,
      dropdownLabel: 'Ta',
      title: 'Tantalum',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 180.95,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 74,
      key: 74,
      label: `<b>W</b>`,
      dropdownLabel: 'W',
      title: 'Tungsten',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 183.84,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 75,
      key: 75,
      label: `<b>Re</b>`,
      dropdownLabel: 'Re',
      title: 'Rhenium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 186.21,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 76,
      key: 76,
      label: `<b>Os</b>`,
      dropdownLabel: 'Os',
      title: 'Osmium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 190.23,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 77,
      key: 77,
      label: `<b>Ir</b>`,
      dropdownLabel: 'Ir',
      title: 'Iridium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 192.22,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 78,
      key: 78,
      label: `<b>Pt</b>`,
      dropdownLabel: 'Pt',
      title: 'Platinum',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 195.08,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 79,
      key: 79,
      label: `<b>Au</b>`,
      dropdownLabel: 'Au',
      title: 'Gold',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 196.97,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 80,
      key: 80,
      label: `<b>Hg</b>`,
      dropdownLabel: 'Hg',
      title: 'Mercury',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 200.59,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 81,
      key: 81,
      label: `<b>Tl</b>`,
      dropdownLabel: 'Tl',
      title: 'Thallium',
      color: theme.postTransitionMetal,
      category: 'postTransitionMetal',
      weight: 204.38,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 82,
      key: 82,
      label: `<b>Pb</b>`,
      dropdownLabel: 'Pb',
      title: 'Lead',
      color: theme.postTransitionMetal,
      category: 'postTransitionMetal',
      weight: 174.97,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 83,
      key: 83,
      label: `<b>Bi</b>`,
      dropdownLabel: 'Bi',
      title: 'Bismuth',
      color: theme.postTransitionMetal,
      category: 'postTransitionMetal',
      weight: 174.97,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 84,
      key: 84,
      label: `<b>Po</b>`,
      dropdownLabel: 'Po',
      title: 'Polonium',
      color: theme.postTransitionMetal,
      category: 'postTransitionMetal',
      weight: 174.97,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 85,
      key: 85,
      label: `<b>At</b>`,
      dropdownLabel: 'At',
      title: 'Astatine',
      color: theme.metalloid,
      category: 'metalloid',
      weight: 174.97,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 86,
      key: 86,
      label: `<b>Rn</b>`,
      dropdownLabel: 'Rn',
      title: 'Radon',
      color: theme.nobleGas,
      category: 'nobleGas',
      weight: 222,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 87,
      key: 87,
      label: `<b>Fr</b>`,
      dropdownLabel: 'Fr',
      title: 'Francium',
      color: theme.alkaliMetal,
      category: 'alkaliMetal',
      weight: 223,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 88,
      key: 88,
      label: `<b>Ra</b>`,
      dropdownLabel: 'Ra',
      title: 'Radium',
      color: theme.alkaliMetal,
      category: 'alkaliMetal',
      weight: 226,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 89,
      key: 89,
      label: `<b>Ac</b>`,
      dropdownLabel: 'Ac',
      title: 'Actinium',
      color: theme.actinide,
      category: 'actinide',
      weight: 227,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 90,
      key: 90,
      label: `<b>Th</b>`,
      dropdownLabel: 'Th',
      title: 'Thorium',
      color: theme.actinide,
      category: 'actinide',
      weight: 232.04,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 91,
      key: 91,
      label: `<b>Pa</b>`,
      dropdownLabel: 'Pa',
      title: 'Protactinium',
      color: theme.actinide,
      category: 'actinide',
      weight: 231.04,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 92,
      key: 92,
      label: `<b>U</b>`,
      dropdownLabel: 'U',
      title: 'Uranium',
      color: theme.actinide,
      category: 'actinide',
      weight: 238.03,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 93,
      key: 93,
      label: `<b>Np</b>`,
      dropdownLabel: 'Np',
      title: 'Neptunium',
      color: theme.actinide,
      category: 'actinide',
      weight: 237,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 94,
      key: 94,
      label: `<b>Pu</b>`,
      dropdownLabel: 'Pu',
      title: 'Plutonium',
      color: theme.actinide,
      category: 'actinide',
      weight: 244,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 95,
      key: 95,
      label: `<b>Am</b>`,
      dropdownLabel: 'Am',
      title: 'Americium',
      color: theme.actinide,
      category: 'actinide',
      weight: 243,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 96,
      key: 96,
      label: `<b>Cm</b>`,
      dropdownLabel: 'Cm',
      title: 'Curium',
      color: theme.actinide,
      category: 'actinide',
      weight: 247,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 97,
      key: 97,
      label: `<b>Bk</b>`,
      dropdownLabel: 'Bk',
      title: 'Berkelium',
      color: theme.actinide,
      category: 'actinide',
      weight: 247,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 98,
      key: 98,
      label: `<b>Cf</b>`,
      dropdownLabel: 'Cf',
      title: 'Californium',
      color: theme.actinide,
      category: 'actinide',
      weight: 251,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 99,
      key: 99,
      label: `<b>Es</b>`,
      dropdownLabel: 'Es',
      title: 'Einsteinium',
      color: theme.actinide,
      category: 'actinide',
      weight: 252,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 100,
      key: 100,
      label: `<b>Fm</b>`,
      dropdownLabel: 'Fm',
      title: 'Fermium',
      color: theme.actinide,
      category: 'actinide',
      weight: 257,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 101,
      key: 101,
      label: `<b>Md</b>`,
      dropdownLabel: 'Md',
      title: 'Mendelevium',
      color: theme.actinide,
      category: 'actinide',
      weight: 258,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 102,
      key: 102,
      label: `<b>No</b>`,
      dropdownLabel: 'No',
      title: 'Nobelium',
      color: theme.actinide,
      category: 'actinide',
      weight: 259,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 103,
      key: 103,
      label: `<b>Lr</b>`,
      dropdownLabel: 'Rf',
      title: 'Lawrencium',
      color: theme.actinide,
      category: 'actinide',
      weight: 266,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 104,
      key: 104,
      label: `<b>Rf</b>`,
      dropdownLabel: 'Rf',
      title: 'Rutherfordium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 267,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 105,
      key: 105,
      label: `<b>Db</b>`,
      dropdownLabel: 'Db',
      title: 'Dubnium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 268,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 106,
      key: 106,
      label: `<b>Sg</b>`,
      dropdownLabel: 'Sg',
      title: 'Seaborgium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 269,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 107,
      key: 107,
      label: `<b>Bh</b>`,
      dropdownLabel: 'Bh',
      title: 'Bohrium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 270,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 108,
      key: 108,
      label: `<b>Hs</b>`,
      dropdownLabel: 'Hs',
      title: 'Hassium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 270,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 109,
      key: 109,
      label: `<b>Mt</b>`,
      dropdownLabel: 'Mt',
      title: 'Meitnerium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 278,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 110,
      key: 110,
      label: `<b>Ds</b>`,
      dropdownLabel: 'Ds',
      title: 'Darmstadtium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 281,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 111,
      key: 111,
      label: `<b>Rg</b>`,
      dropdownLabel: 'Rg',
      title: 'Roentgenium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 282,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 112,
      key: 112,
      label: `<b>Cn</b>`,
      dropdownLabel: 'Cn',
      title: 'Copernicium',
      color: theme.transitionMetal,
      category: 'transitionMetal',
      weight: 285,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 113,
      key: 113,
      label: `<b>Nh</b>`,
      dropdownLabel: 'Nh',
      title: 'Nihonium',
      color: theme.postTransitionMetal,
      category: 'postTransitionMetal',
      weight: 286,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 114,
      key: 114,
      label: `<b>Fl</b>`,
      dropdownLabel: 'Fl',
      title: 'Flerovium',
      color: theme.postTransitionMetal,
      category: 'postTransitionMetal',
      weight: 289,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 115,
      key: 115,
      label: `<b>Mc</b>`,
      dropdownLabel: 'Mc',
      title: 'Moscovium',
      color: theme.postTransitionMetal,
      category: 'postTransitionMetal',
      weight: 290,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 116,
      key: 116,
      label: `<b>Lv</b>`,
      dropdownLabel: 'Lv',
      title: 'Livermorium',
      color: theme.postTransitionMetal,
      category: 'postTransitionMetal',
      weight: 293,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 117,
      key: 117,
      label: `<b>Ts</b>`,
      dropdownLabel: 'Ts',
      title: 'Tennessine',
      color: theme.postTransitionMetal,
      category: 'postTransitionMetal',
      weight: 294,
      shadow: {
        enabled: true,
        color: theme.boxShadowColor
      }
    },
    {
      atomicNumber: 118,
      key: 118,
      label: `<b>Og</b>`,
      dropdownLabel: 'Og',
      title: 'Oganesson',
      color: theme.nobleGas,
      category: 'nobleGas',
      weight: 294
    }
  ];
};

export default elements;

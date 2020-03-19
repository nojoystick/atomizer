import ColorVariables from '../stylesheets/Colors.scss';

const elements = [
  {
    id: 0,
    atomicNumber: 0,
    key: 0,
    label: `<b>root</b>`,
    dropdownLabel: 'root',
    title: 'root node',
    color: ColorVariables.root,
    widthConstraint: 150
  },
  {
    atomicNumber: 1,
    key: 1,
    label: `<b>H</b>`,
    dropdownLabel: 'H',
    title: 'Hydrogen',
    color: ColorVariables.nonMetal,
    weight: 1.008
  },
  {
    atomicNumber: 2,
    key: 2,
    label: `<b>He</b>`,
    dropdownLabel: 'He',
    title: 'Helium',
    color: ColorVariables.nobleGas,
    weight: 4.0026
  },
  {
    atomicNumber: 3,
    key: 3,
    label: `<b>Li</b>`,
    dropdownLabel: 'Li',
    title: 'Lithium',
    color: ColorVariables.alkaliMetal,
    weight: 6.94
  },
  {
    atomicNumber: 4,
    key: 4,
    label: `<b>Be</b>`,
    dropdownLabel: 'Be',
    title: 'Beryllium',
    color: ColorVariables.alkaliMetal,
    weight: 9.0122
  },
  {
    atomicNumber: 5,
    key: 5,
    label: `<b>B</b>`,
    dropdownLabel: 'B',
    title: 'Boron',
    color: ColorVariables.metalloid,
    weight: 10.81
  },
  {
    atomicNumber: 6,
    key: 6,
    label: `<b>C</b>`,
    dropdownLabel: 'C',
    title: 'Carbon',
    color: ColorVariables.nonMetal,
    weight: 12.011
  },
  {
    atomicNumber: 7,
    key: 7,
    label: `<b>N</b>`,
    dropdownLabel: 'N',
    title: 'Nitrogen',
    color: ColorVariables.nonMetal,
    weight: 14.007
  },
  {
    atomicNumber: 8,
    key: 8,
    label: `<b>O</b>`,
    dropdownLabel: 'O',
    title: 'Oxygen',
    color: ColorVariables.nonMetal,
    weight: 15.999
  },
  {
    atomicNumber: 9,
    key: 9,
    label: `<b>F</b>`,
    dropdownLabel: 'F',
    title: 'Fluorine',
    color: ColorVariables.nonMetal,
    weight: 18.998
  },
  {
    atomicNumber: 10,
    key: 10,
    label: `<b>Ne</b>`,
    dropdownLabel: 'Ne',
    title: 'Neon',
    color: ColorVariables.nobleGas,
    weight: 20.18
  },
  {
    atomicNumber: 11,
    key: 11,
    label: `<b>Na</b>`,
    dropdownLabel: 'Na',
    title: 'Sodium',
    color: ColorVariables.alkaliMetal,
    weight: 22.99
  },
  {
    atomicNumber: 12,
    key: 12,
    label: `<b>Mg</b>`,
    dropdownLabel: 'Mg',
    title: 'Magnesium',
    color: ColorVariables.alkaliMetal,
    weight: 24.305
  },
  {
    atomicNumber: 13,
    key: 13,
    label: `<b>Al</b>`,
    dropdownLabel: 'Al',
    title: 'Aluminum',
    color: ColorVariables.postTransitionMetal,
    weight: 26.982
  },
  {
    atomicNumber: 14,
    key: 14,
    label: `<b>Si</b>`,
    dropdownLabel: 'Si',
    title: 'Silicon',
    color: ColorVariables.metalloid,
    weight: 28.085
  },
  {
    atomicNumber: 15,
    key: 15,
    label: `<b>P</b>`,
    dropdownLabel: 'P',
    title: 'Phosphorus',
    color: ColorVariables.nonMetal,
    weight: 30.974
  },
  {
    atomicNumber: 16,
    key: 16,
    label: `<b>S</b>`,
    dropdownLabel: 'S',
    title: 'Sulfur',
    color: ColorVariables.nonMetal,
    weight: 32.06
  },
  {
    atomicNumber: 17,
    key: 17,
    label: `<b>Cl</b>`,
    dropdownLabel: 'Cl',
    title: 'Chlorine',
    color: ColorVariables.nonMetal,
    weight: 35.45
  },
  {
    atomicNumber: 18,
    key: 18,
    label: `<b>Ar</b>`,
    dropdownLabel: 'Ar',
    title: 'Argon',
    color: ColorVariables.nobleGas,
    weight: 39.948
  },
  {
    atomicNumber: 19,
    key: 19,
    label: `<b>K</b>`,
    dropdownLabel: 'K',
    title: 'Potassium',
    color: ColorVariables.alkaliMetal,
    weight: 39.098
  },
  {
    atomicNumber: 20,
    key: 20,
    label: `<b>Ca</b>`,
    dropdownLabel: 'Ca',
    title: 'Calcium',
    color: ColorVariables.alkaliMetal,
    weight: 40.078
  },
  {
    atomicNumber: 21,
    key: 21,
    label: `<b>Sc</b>`,
    dropdownLabel: 'Sc',
    title: 'Scandium',
    color: ColorVariables.transitionMetal,
    weight: 44.956
  },
  {
    atomicNumber: 22,
    key: 22,
    label: `<b>Ti</b>`,
    dropdownLabel: 'Ti',
    title: 'Titanium',
    color: ColorVariables.transitionMetal,
    weight: 47.867
  },
  {
    atomicNumber: 23,
    key: 23,
    label: `<b>V</b>`,
    dropdownLabel: 'V',
    title: 'Vanadium',
    color: ColorVariables.transitionMetal,
    weight: 50.942
  },
  {
    atomicNumber: 24,
    key: 24,
    label: `<b>Cr</b>`,
    dropdownLabel: 'Cr',
    title: 'Chromium',
    color: ColorVariables.transitionMetal,
    weight: 51.996
  },
  {
    atomicNumber: 25,
    key: 25,
    label: `<b>Mn</b>`,
    dropdownLabel: 'Mn',
    title: 'Manganese',
    color: ColorVariables.transitionMetal,
    weight: 54.938
  },
  {
    atomicNumber: 26,
    key: 26,
    label: `<b>Fe</b>`,
    dropdownLabel: 'Fe',
    title: 'Iron',
    color: ColorVariables.transitionMetal,
    weight: 55.845
  },
  {
    atomicNumber: 27,
    key: 27,
    label: `<b>Co</b>`,
    dropdownLabel: 'Co',
    title: 'Cobalt',
    color: ColorVariables.transitionMetal,
    weight: 58.933
  },
  {
    atomicNumber: 28,
    key: 28,
    label: `<b>Ni</b>`,
    dropdownLabel: 'Ni',
    title: 'Nickel',
    color: ColorVariables.transitionMetal,
    weight: 58.693
  },
  {
    atomicNumber: 29,
    key: 29,
    label: `<b>Cu</b>`,
    dropdownLabel: 'Cu',
    title: 'Copper',
    color: ColorVariables.transitionMetal,
    weight: 63.546
  },
  {
    atomicNumber: 30,
    key: 30,
    label: `<b>Zn</b>`,
    dropdownLabel: 'Zn',
    title: 'Zinc',
    color: ColorVariables.transitionMetal,
    weight: 65.38
  },
  {
    atomicNumber: 31,
    key: 31,
    label: `<b>Ga</b>`,
    dropdownLabel: 'Ga',
    title: 'Gallium',
    color: ColorVariables.transitionMetal,
    weight: 69.723
  },
  {
    atomicNumber: 32,
    key: 32,
    label: `<b>Ge</b>`,
    dropdownLabel: 'Ge',
    title: 'Germanium',
    color: ColorVariables.transitionMetal,
    weight: 72.63
  },
  {
    atomicNumber: 33,
    key: 33,
    label: `<b>As</b>`,
    dropdownLabel: 'As',
    title: 'Arsenic',
    color: ColorVariables.transitionMetal,
    weight: 74.922
  },
  {
    atomicNumber: 34,
    key: 34,
    label: `<b>Se</b>`,
    dropdownLabel: 'Se',
    title: 'Selenium',
    color: ColorVariables.transitionMetal,
    weight: 78.971
  },
  {
    atomicNumber: 35,
    key: 35,
    label: `<b>Br</b>`,
    dropdownLabel: 'Br',
    title: 'Bromine',
    color: ColorVariables.transitionMetal,
    weight: 79.904
  },
  {
    atomicNumber: 36,
    key: 36,
    label: `<b>Kr</b>`,
    dropdownLabel: 'Kr',
    title: 'Krypton',
    color: ColorVariables.transitionMetal,
    weight: 83.798
  },
  {
    atomicNumber: 37,
    key: 37,
    label: `<b>Rb</b>`,
    dropdownLabel: 'Rb',
    title: 'Rubidium',
    color: ColorVariables.transitionMetal,
    weight: 85.468
  },
  {
    atomicNumber: 38,
    key: 38,
    label: `<b>Sr</b>`,
    dropdownLabel: 'Sr',
    title: 'Strontium',
    color: ColorVariables.transitionMetal,
    weight: 87.62
  },
  {
    atomicNumber: 39,
    key: 39,
    label: `<b>Y</b>`,
    dropdownLabel: 'Y',
    title: 'Yttrium',
    color: ColorVariables.transitionMetal,
    weight: 88.9
  },
  {
    atomicNumber: 40,
    key: 40,
    label: `<b>Zr</b>`,
    dropdownLabel: 'Zr',
    title: 'Zirconium',
    color: ColorVariables.transitionMetal,
    weight: 91.224
  },
  {
    atomicNumber: 41,
    key: 41,
    label: `<b>Nb</b>`,
    dropdownLabel: 'Nb',
    title: 'Niobium',
    color: ColorVariables.transitionMetal,
    weight: 92.906
  },
  {
    atomicNumber: 42,
    key: 42,
    label: `<b>Mo</b>`,
    dropdownLabel: 'Mo',
    title: 'Molybdeum',
    color: ColorVariables.transitionMetal,
    weight: 95.95
  },
  {
    atomicNumber: 43,
    key: 43,
    label: `<b>Tc</b>`,
    dropdownLabel: 'Tc',
    title: 'Technetium',
    color: ColorVariables.transitionMetal,
    weight: 98
  },
  {
    atomicNumber: 44,
    key: 44,
    label: `<b>Ru</b>`,
    dropdownLabel: 'Ru',
    title: 'Ruthenium',
    color: ColorVariables.transitionMetal,
    weight: 101.07
  },
  {
    atomicNumber: 45,
    key: 45,
    label: `<b>Rh</b>`,
    dropdownLabel: 'Rh',
    title: 'Rhodium',
    color: ColorVariables.transitionMetal,
    weight: 102.91
  },
  {
    atomicNumber: 46,
    key: 46,
    label: `<b>Pd</b>`,
    dropdownLabel: 'Pd',
    title: 'Palladium',
    color: ColorVariables.transitionMetal,
    weight: 106.42
  },
  {
    atomicNumber: 47,
    key: 47,
    label: `<b>Ag</b>`,
    dropdownLabel: 'Ag',
    title: 'Silver',
    color: ColorVariables.transitionMetal,
    weight: 107.87
  },
  {
    atomicNumber: 48,
    key: 48,
    label: `<b>Cd</b>`,
    dropdownLabel: 'Cd',
    title: 'Cadmium',
    color: ColorVariables.transitionMetal,
    weight: 112.41
  },
  {
    atomicNumber: 49,
    key: 49,
    label: `<b>In</b>`,
    dropdownLabel: 'In',
    title: 'Indium',
    color: ColorVariables.transitionMetal,
    weight: 114.82
  },
  {
    atomicNumber: 50,
    key: 50,
    label: `<b>Sn</b>`,
    dropdownLabel: 'Sn',
    title: 'Tin',
    color: ColorVariables.transitionMetal,
    weight: 118.71
  },
  {
    atomicNumber: 51,
    key: 51,
    label: `<b>Sb</b>`,
    dropdownLabel: 'Sb',
    title: 'Antimony',
    color: ColorVariables.transitionMetal,
    weight: 121.76
  },
  {
    atomicNumber: 52,
    key: 52,
    label: `<b>Te</b>`,
    dropdownLabel: 'Te',
    title: 'Tellurium',
    color: ColorVariables.transitionMetal,
    weight: 127.6
  },
  {
    atomicNumber: 53,
    key: 53,
    label: `<b>I</b>`,
    dropdownLabel: 'I',
    title: 'Iodine',
    color: ColorVariables.transitionMetal,
    weight: 126.9
  },
  {
    atomicNumber: 54,
    key: 54,
    label: `<b>Xe</b>`,
    dropdownLabel: 'Xe',
    title: 'Xenon',
    color: ColorVariables.transitionMetal,
    weight: 131.29
  },
  {
    atomicNumber: 55,
    key: 55,
    label: `<b>Cs</b>`,
    dropdownLabel: 'Cs',
    title: 'Caesium',
    color: ColorVariables.transitionMetal,
    weight: 132.91
  },
  {
    atomicNumber: 56,
    key: 56,
    label: `<b>Ba</b>`,
    dropdownLabel: 'Ba',
    title: 'Barium',
    color: ColorVariables.transitionMetal,
    weight: 137.33
  },
  {
    atomicNumber: 57,
    key: 57,
    label: `<b>La</b>`,
    dropdownLabel: 'La',
    title: 'Lanthanium',
    color: ColorVariables.lanthanide,
    weight: 138.91
  },
  {
    atomicNumber: 58,
    key: 58,
    label: `<b>Ce</b>`,
    dropdownLabel: 'Ce',
    title: 'Cerium',
    color: ColorVariables.lanthanide,
    weight: 140.12
  },
  {
    atomicNumber: 59,
    key: 59,
    label: `<b>Pr</b>`,
    dropdownLabel: 'Pr',
    title: 'Praseodymium',
    color: ColorVariables.lanthanide,
    weight: 140.91
  },
  {
    atomicNumber: 60,
    key: 60,
    label: `<b>Nd</b>`,
    dropdownLabel: 'Nd',
    title: 'Neodymium',
    color: ColorVariables.lanthanide,
    weight: 144.24
  },
  {
    atomicNumber: 61,
    key: 61,
    label: `<b>Pm</b>`,
    dropdownLabel: 'Pm',
    title: 'Prometheum',
    color: ColorVariables.lanthanide,
    weight: 145
  },
  {
    atomicNumber: 62,
    key: 62,
    label: `<b>Sm</b>`,
    dropdownLabel: 'Sm',
    title: 'Samarium',
    color: ColorVariables.lanthanide,
    weight: 150.36
  },
  {
    atomicNumber: 63,
    key: 63,
    label: `<b>Eu</b>`,
    dropdownLabel: 'Eu',
    title: 'Europium',
    color: ColorVariables.lanthanide,
    weight: 151.96
  },
  {
    atomicNumber: 64,
    key: 64,
    label: `<b>Gd</b>`,
    dropdownLabel: 'Gd',
    title: 'Gadolinium',
    color: ColorVariables.lanthanide,
    weight: 157.25
  },
  {
    atomicNumber: 65,
    key: 65,
    label: `<b>Tb</b>`,
    dropdownLabel: 'Tb',
    title: 'Terbium',
    color: ColorVariables.lanthanide,
    weight: 158.93
  },
  {
    atomicNumber: 66,
    key: 66,
    label: `<b>Dy</b>`,
    dropdownLabel: 'Dy',
    title: 'Dysprosium',
    color: ColorVariables.lanthanide,
    weight: 162.5
  },
  {
    atomicNumber: 67,
    key: 67,
    label: `<b>Ho</b>`,
    dropdownLabel: 'Ho',
    title: 'Holmium',
    color: ColorVariables.lanthanide,
    weight: 164.93
  },
  {
    atomicNumber: 68,
    key: 68,
    label: `<b>Er</b>`,
    dropdownLabel: 'Er',
    title: 'Erbium',
    color: ColorVariables.lanthanide,
    weight: 167.26
  },
  {
    atomicNumber: 69,
    key: 69,
    label: `<b>Tm</b>`,
    dropdownLabel: 'Tm',
    title: 'Thulium',
    color: ColorVariables.lanthanide,
    weight: 168.93
  },
  {
    atomicNumber: 70,
    key: 70,
    label: `<b>Yb</b>`,
    dropdownLabel: 'Yb',
    title: 'Ytterbium',
    color: ColorVariables.lanthanide,
    weight: 173.05
  },
  {
    atomicNumber: 71,
    key: 71,
    label: `<b>Lu</b>`,
    dropdownLabel: 'Lu',
    title: 'Lutetium',
    color: ColorVariables.lanthanide,
    weight: 174.97
  },
  {
    atomicNumber: 72,
    key: 72,
    label: `<b>Hf</b>`,
    dropdownLabel: 'Hf',
    title: 'Hafnium',
    color: ColorVariables.transitionMetal,
    weight: 178.49
  },
  {
    atomicNumber: 73,
    key: 73,
    label: `<b>Ta</b>`,
    dropdownLabel: 'Ta',
    title: 'Tantalum',
    color: ColorVariables.transitionMetal,
    weight: 180.95
  },
  {
    atomicNumber: 74,
    key: 74,
    label: `<b>W</b>`,
    dropdownLabel: 'W',
    title: 'Tungsten',
    color: ColorVariables.transitionMetal,
    weight: 183.84
  },
  {
    atomicNumber: 75,
    key: 75,
    label: `<b>Re</b>`,
    dropdownLabel: 'Re',
    title: 'Rhenium',
    color: ColorVariables.transitionMetal,
    weight: 186.21
  },
  {
    atomicNumber: 76,
    key: 76,
    label: `<b>Os</b>`,
    dropdownLabel: 'Os',
    title: 'Osmium',
    color: ColorVariables.transitionMetal,
    weight: 190.23
  },
  {
    atomicNumber: 77,
    key: 77,
    label: `<b>Ir</b>`,
    dropdownLabel: 'Ir',
    title: 'Iridium',
    color: ColorVariables.transitionMetal,
    weight: 192.22
  },
  {
    atomicNumber: 78,
    key: 78,
    label: `<b>Pt</b>`,
    dropdownLabel: 'Pt',
    title: 'Platinum',
    color: ColorVariables.transitionMetal,
    weight: 195.08
  },
  {
    atomicNumber: 79,
    key: 79,
    label: `<b>Au</b>`,
    dropdownLabel: 'Au',
    title: 'Gold',
    color: ColorVariables.transitionMetal,
    weight: 196.97
  },
  {
    atomicNumber: 80,
    key: 80,
    label: `<b>Hg</b>`,
    dropdownLabel: 'Hg',
    title: 'Mercury',
    color: ColorVariables.transitionMetal,
    weight: 200.59
  },
  {
    atomicNumber: 81,
    key: 81,
    label: `<b>Tl</b>`,
    dropdownLabel: 'Tl',
    title: 'Thallium',
    color: ColorVariables.postTransitionMetal,
    weight: 204.38
  },
  {
    atomicNumber: 82,
    key: 82,
    label: `<b>Pb</b>`,
    dropdownLabel: 'Pb',
    title: 'Lead',
    color: ColorVariables.postTransitionMetal,
    weight: 174.97
  },
  {
    atomicNumber: 83,
    key: 83,
    label: `<b>Bi</b>`,
    dropdownLabel: 'Bi',
    title: 'Bismuth',
    color: ColorVariables.postTransitionMetal,
    weight: 174.97
  },
  {
    atomicNumber: 84,
    key: 84,
    label: `<b>Po</b>`,
    dropdownLabel: 'Po',
    title: 'Polonium',
    color: ColorVariables.postTransitionMetal,
    weight: 174.97
  },
  {
    atomicNumber: 85,
    key: 85,
    label: `<b>At</b>`,
    dropdownLabel: 'At',
    title: 'Astatine',
    color: ColorVariables.metalloid,
    weight: 174.97
  },
  {
    atomicNumber: 86,
    key: 86,
    label: `<b>Rn</b>`,
    dropdownLabel: 'Rn',
    title: 'Radon',
    color: ColorVariables.nobleGas,
    weight: 222
  },
  {
    atomicNumber: 87,
    key: 87,
    label: `<b>Fr</b>`,
    dropdownLabel: 'Fr',
    title: 'Francium',
    color: ColorVariables.alkaliMetal,
    weight: 223
  },
  {
    atomicNumber: 88,
    key: 88,
    label: `<b>Ra</b>`,
    dropdownLabel: 'Ra',
    title: 'Radium',
    color: ColorVariables.alkaliMetal,
    weight: 226
  },
  {
    atomicNumber: 89,
    key: 89,
    label: `<b>Ac</b>`,
    dropdownLabel: 'Ac',
    title: 'Actinium',
    color: ColorVariables.actinide,
    weight: 227
  },
  {
    atomicNumber: 90,
    key: 90,
    label: `<b>Th</b>`,
    dropdownLabel: 'Th',
    title: 'Thorium',
    color: ColorVariables.actinide,
    weight: 232.04
  },
  {
    atomicNumber: 91,
    key: 91,
    label: `<b>Pa</b>`,
    dropdownLabel: 'Pa',
    title: 'Protactinium',
    color: ColorVariables.actinide,
    weight: 231.04
  },
  {
    atomicNumber: 92,
    key: 92,
    label: `<b>U</b>`,
    dropdownLabel: 'U',
    title: 'Uranium',
    color: ColorVariables.actinide,
    weight: 238.03
  },
  {
    atomicNumber: 93,
    key: 93,
    label: `<b>Np</b>`,
    dropdownLabel: 'Np',
    title: 'Neptunium',
    color: ColorVariables.actinide,
    weight: 237
  },
  {
    atomicNumber: 94,
    key: 94,
    label: `<b>Pu</b>`,
    dropdownLabel: 'Pu',
    title: 'Plutonium',
    color: ColorVariables.actinide,
    weight: 244
  },
  {
    atomicNumber: 95,
    key: 95,
    label: `<b>Am</b>`,
    dropdownLabel: 'Am',
    title: 'Americium',
    color: ColorVariables.actinide,
    weight: 243
  },
  {
    atomicNumber: 96,
    key: 96,
    label: `<b>Cm</b>`,
    dropdownLabel: 'Cm',
    title: 'Curium',
    color: ColorVariables.actinide,
    weight: 247
  },
  {
    atomicNumber: 97,
    key: 97,
    label: `<b>Bk</b>`,
    dropdownLabel: 'Bk',
    title: 'Berkelium',
    color: ColorVariables.actinide,
    weight: 247
  },
  {
    atomicNumber: 98,
    key: 98,
    label: `<b>Cf</b>`,
    dropdownLabel: 'Cf',
    title: 'Californium',
    color: ColorVariables.actinide,
    weight: 251
  },
  {
    atomicNumber: 99,
    key: 99,
    label: `<b>Es</b>`,
    dropdownLabel: 'Es',
    title: 'Einsteinium',
    color: ColorVariables.actinide,
    weight: 252
  },
  {
    atomicNumber: 100,
    key: 100,
    label: `<b>Fm</b>`,
    dropdownLabel: 'Fm',
    title: 'Fermium',
    color: ColorVariables.actinide,
    weight: 257
  },
  {
    atomicNumber: 101,
    key: 101,
    label: `<b>Md</b>`,
    dropdownLabel: 'Md',
    title: 'Mendelevium',
    color: ColorVariables.actinide,
    weight: 258
  },
  {
    atomicNumber: 102,
    key: 102,
    label: `<b>No</b>`,
    dropdownLabel: 'No',
    title: 'Nobelium',
    color: ColorVariables.actinide,
    weight: 259
  },
  {
    atomicNumber: 103,
    key: 103,
    label: `<b>Lr</b>`,
    dropdownLabel: 'Rf',
    title: 'Lawrencium',
    color: ColorVariables.actinide,
    weight: 266
  },
  {
    atomicNumber: 104,
    key: 104,
    label: `<b>Rf</b>`,
    dropdownLabel: 'Rf',
    title: 'Rutherfordium',
    color: ColorVariables.transitionMetal,
    weight: 267
  },
  {
    atomicNumber: 105,
    key: 105,
    label: `<b>Db</b>`,
    dropdownLabel: 'Db',
    title: 'Dubnium',
    color: ColorVariables.transitionMetal,
    weight: 268
  },
  {
    atomicNumber: 106,
    key: 106,
    label: `<b>Sg</b>`,
    dropdownLabel: 'Sg',
    title: 'Seaborgium',
    color: ColorVariables.transitionMetal,
    weight: 269
  },
  {
    atomicNumber: 107,
    key: 107,
    label: `<b>Bh</b>`,
    dropdownLabel: 'Bh',
    title: 'Bohrium',
    color: ColorVariables.transitionMetal,
    weight: 270
  },
  {
    atomicNumber: 108,
    key: 108,
    label: `<b>Hs</b>`,
    dropdownLabel: 'Hs',
    title: 'Hassium',
    color: ColorVariables.transitionMetal,
    weight: 270
  },
  {
    atomicNumber: 109,
    key: 109,
    label: `<b>Mt</b>`,
    dropdownLabel: 'Mt',
    title: 'Meitnerium',
    color: ColorVariables.transitionMetal,
    weight: 278
  },
  {
    atomicNumber: 110,
    key: 110,
    label: `<b>Ds</b>`,
    dropdownLabel: 'Ds',
    title: 'Darmstadtium',
    color: ColorVariables.transitionMetal,
    weight: 281
  },
  {
    atomicNumber: 111,
    key: 111,
    label: `<b>Rg</b>`,
    dropdownLabel: 'Rg',
    title: 'Roentgenium',
    color: ColorVariables.transitionMetal,
    weight: 282
  },
  {
    atomicNumber: 112,
    key: 112,
    label: `<b>Cn</b>`,
    dropdownLabel: 'Cn',
    title: 'Copernicium',
    color: ColorVariables.transitionMetal,
    weight: 285
  },
  {
    atomicNumber: 113,
    key: 113,
    label: `<b>Nh</b>`,
    dropdownLabel: 'Nh',
    title: 'Nihonium',
    color: ColorVariables.postTransitionMetal,
    weight: 286
  },
  {
    atomicNumber: 114,
    key: 114,
    label: `<b>Fl</b>`,
    dropdownLabel: 'Fl',
    title: 'Flerovium',
    color: ColorVariables.postTransitionMetal,
    weight: 289
  },
  {
    atomicNumber: 115,
    key: 115,
    label: `<b>Mc</b>`,
    dropdownLabel: 'Mc',
    title: 'Moscovium',
    color: ColorVariables.postTransitionMetal,
    weight: 290
  },
  {
    atomicNumber: 116,
    key: 116,
    label: `<b>Lv</b>`,
    dropdownLabel: 'Lv',
    title: 'Livermorium',
    color: ColorVariables.postTransitionMetal,
    weight: 293
  },
  {
    atomicNumber: 117,
    key: 117,
    label: `<b>Ts</b>`,
    dropdownLabel: 'Ts',
    title: 'Tennessine',
    color: ColorVariables.postTransitionMetal,
    weight: 294
  },
  {
    atomicNumber: 118,
    key: 118,
    label: `<b>Og</b>`,
    dropdownLabel: 'Og',
    title: 'Oganesson',
    color: ColorVariables.nobleGas,
    weight: 294
  }
];

export default elements;

export const categories = [
  {
    id: 'mosfet',
    name: 'MOSFET',
    description: 'High-performance Metal Oxide Semiconductor Field Effect Transistors for switching and amplification.',
    subcategories: [
      { id: 'n-channel', name: 'N-Channel MOSFETs' },
      { id: 'p-channel', name: 'P-Channel MOSFETs' },
      { id: 'power', name: 'Power MOSFETs' },
      { id: 'small-signal', name: 'Small Signal MOSFETs' }
    ]
  },
  {
    id: 'integrated-circuits',
    name: 'INTEGRATED CIRCUITS',
    description: 'Advanced silicon chips including microcontrollers, amplifiers, PMICs, and logic circuits.',
    subcategories: [
      { id: 'pmic', name: 'Power Management ICs (PMIC)' },
      { id: 'op-amps', name: 'Linear & Operational Amplifiers' },
      { id: 'mcu', name: 'Microcontrollers (MCUs)' }
    ]
  },
  {
    id: 'transistors',
    name: 'TRANSISTORS',
    description: 'BJT, IGBT, and Darlington transistors for robust power regulation and signal amplification.',
    subcategories: [
      { id: 'bjt', name: 'Bipolar BJTs' },
      { id: 'igbt', name: 'IGBT Modules' }
    ]
  },
  {
    id: 'diodes',
    name: 'DIODES',
    description: 'Schottky, Zener, Rectifier, and TVS diodes for circuit protection and rectification.',
    subcategories: [
      { id: 'schottky', name: 'Schottky Diodes' },
      { id: 'zener', name: 'Zener Diodes' }
    ]
  }
];

export const products = [
  {
    id: 'nce1540ka',
    name: 'NCE1540KA TO-252-2L NCE POWER',
    brand: 'NCE Power',
    category: 'mosfet',
    subcategory: 'power',
    price: 17,
    package: 'TO-252-2L',
    description: 'The NCE1540KA uses advanced trench technology and design to provide excellent RDS(ON) with low gate charge. It is quite suitable for power switching, converters, and motor control applications.',
    features: [
      'High density cell design for ultra low Rdson',
      'Fully characterized avalanche voltage and current',
      'Excellent package for good heat dissipation',
      'Special process technology for high ESD capability',
      '100% avalanche tested',
      'RoHS & Halogen-Free Compliant'
    ],
    specs: {
      'Drain-Source Voltage (Vdss)': '150V',
      'Continuous Drain Current (Id)': '40A',
      'RDS(ON) (at Vgs=10V)': '< 22mΩ',
      'Gate-Source Voltage (Vgs)': '±20V',
      'Single Pulse Avalanche Energy (Eas)': '220 mJ',
      'Operating Temperature': '-55°C to 175°C'
    }
  },
  {
    id: 'nce0106r',
    name: 'NCE0106R SOT-223-3L NCEPOWER',
    brand: 'NCE Power',
    category: 'mosfet',
    subcategory: 'n-channel',
    price: 4,
    package: 'SOT-223-3L',
    description: 'The NCE0106R is an N-Channel enhancement mode power MOSFET, providing excellent RDS(ON) and low gate charge. Ideal for low voltage switching circuits and load switch operations.',
    features: [
      'Ultra low gate charge',
      'Low reverse transfer capacitance',
      'Fast switching speed',
      'Trench Power LV MOSFET technology',
      'RoHS and Green compliant',
      'Excellent thermal performance'
    ],
    specs: {
      'Drain-Source Voltage (Vdss)': '100V',
      'Continuous Drain Current (Id)': '6A',
      'RDS(ON) (at Vgs=10V)': '< 120mΩ',
      'Gate-Source Voltage (Vgs)': '±20V',
      'Power Dissipation (Pd)': '3W',
      'Operating Temperature': '-55°C to 150°C'
    }
  },
  {
    id: 'crjq190n65gcf',
    name: 'CRJQ190N65GCF SJMOS N-MOSFET 650V, 185mΩ, 23A',
    brand: 'CR Micro',
    category: 'mosfet',
    subcategory: 'power',
    price: 77,
    package: 'TO-247',
    description: 'CRJQ190N65GCF is a Super Junction N-Channel Power MOSFET combining high efficiency with fast switching. It is optimized for server power supplies, telecom systems, and high-frequency inverter circuits.',
    features: [
      'Super Junction technology',
      'Ultra low gate charge (Qg)',
      'Exceptional dv/dt capability',
      'Optimized body diode recovery',
      '100% avalanche tested',
      'Improved switching behavior and EMI characteristics'
    ],
    specs: {
      'Drain-Source Voltage (Vdss)': '650V',
      'Continuous Drain Current (Id)': '23A',
      'RDS(ON) (typ)': '185mΩ',
      'Gate Charge (Qg)': '45 nC',
      'Package Type': 'TO-247',
      'Operating Temperature': '-55°C to 150°C'
    }
  },
  {
    id: 'mt7606eh',
    name: 'MT7606EH MAXIC, 500V, SOT89-3, TO252-3, ESOP8',
    brand: 'MAXIC',
    category: 'integrated-circuits',
    subcategory: 'pmic',
    price: 77,
    package: 'TO-252-3',
    description: 'MT7606EH is a high-current precision linear LED driver. The output constant current is adjustable via an external resistor. It is highly integrated and offers line regulation compensation and thermal foldback protection.',
    features: [
      'High precision output current (<±3% accuracy)',
      'Adjustable LED current via external resistor',
      'Over-temperature regulation / thermal foldback',
      'Simplest system setup without inductors or caps',
      'High power factor and low harmonic distortion',
      'Supports SOT89-3, TO252-3, and ESOP8 packages'
    ],
    specs: {
      'Input Voltage Range': 'Up to 500V',
      'Output Current Range': '5mA - 120mA (adjustable)',
      'Current Accuracy': '±3%',
      'Protections': 'OTP, Short Circuit Protection',
      'Efficiency': '> 90%',
      'Package Options': 'SOT89-3, TO252-3, ESOP8'
    }
  },
  {
    id: 'irfz44npbf',
    name: 'IRFZ44NPBF INFINEON MOSFET N-CH 55V 49A TO220AB',
    brand: 'Infineon',
    category: 'mosfet',
    subcategory: 'n-channel',
    price: 9,
    package: 'TO-220AB',
    description: 'Third generation HEXFET Power MOSFETs from Infineon provide the designer with the best combination of fast switching, ruggedized device design, low on-resistance, and cost-effectiveness.',
    features: [
      'Advanced Process Technology',
      'Ultra Low On-Resistance',
      'Dynamic dv/dt Rating',
      '175°C Operating Temperature',
      'Fast Switching',
      'Fully Avalanche Rated'
    ],
    specs: {
      'Drain-Source Voltage (Vdss)': '55V',
      'Continuous Drain Current (Id)': '49A',
      'RDS(ON) (at Vgs=10V)': '< 17.5mΩ',
      'Gate-Source Voltage (Vgs)': '±20V',
      'Single Pulse Avalanche Energy (Eas)': '230 mJ',
      'Power Dissipation (Pd)': '94W'
    }
  },
  {
    id: 'stw48n60m2',
    name: 'STW48N60M2 MOSFET N-CH 600V 42A TO247-4L',
    brand: 'STMicroelectronics',
    category: 'mosfet',
    subcategory: 'power',
    price: 84,
    package: 'TO-247-4L',
    description: 'This device is an N-channel Power MOSFET developed using MDmesh M2 technology. Thanks to its strip layout and improved vertical structure, the device exhibits low on-resistance and optimized switching behavior.',
    features: [
      'Extremely low gate charge',
      'Excellent output capacitance (Coss) profile',
      '100% avalanche tested',
      'Zener-protected gate',
      'High-speed switching performance',
      'TO-247-4L package for improved switching speed'
    ],
    specs: {
      'Drain-Source Voltage (Vdss)': '600V',
      'Continuous Drain Current (Id)': '42A',
      'RDS(ON) (typ)': '91mΩ',
      'Gate Charge (Qg)': '54 nC',
      'Package Type': 'TO-247-4L',
      'Operating Temperature': '-55°C to 150°C'
    }
  },
  {
    id: 'dmn6140l-13',
    name: 'DMN6140L-13 MOSFET N-CH 60V 1.6A SOT-23',
    brand: 'Diodes Inc.',
    category: 'mosfet',
    subcategory: 'small-signal',
    price: 11,
    package: 'SOT-23',
    description: 'DMN6140L-13 is a small-signal N-Channel MOSFET featuring ultra-low threshold voltage, optimized for logic level interfaces. Ideal for battery charging, power management, and level-shifting applications.',
    features: [
      'Low On-Resistance',
      'Very Low Gate Threshold Voltage (Vgs(th) < 2.5V)',
      'High Transition/Switching Speed',
      'ESD Protected Gate to 2kV',
      'RoHS Compliant and halogen-free',
      'Ultra-small SOT-23 surface mount package'
    ],
    specs: {
      'Drain-Source Voltage (Vdss)': '60V',
      'Continuous Drain Current (Id)': '1.6A',
      'RDS(ON) (at Vgs=10V)': '< 140mΩ',
      'Gate-Source Voltage (Vgs)': '±20V',
      'Gate Threshold Voltage (Vgs(th))': '1.0V - 2.5V',
      'Package Type': 'SOT-23'
    }
  },
  {
    id: 'um66t19lk-1',
    name: 'UM66T19LK-1 TO92 UTC melody generator',
    brand: 'UTC',
    category: 'integrated-circuits',
    subcategory: 'op-amps',
    price: 5,
    package: 'TO-92',
    description: 'The UM66T series is a CMOS LSI designed for melody generator. It has a built-in ROM programmed with a classic melody, an internal RC oscillator, and pre-amp circuit to directly drive small speakers or buzzers.',
    features: [
      'Very low power consumption (operating current typ. 15µA)',
      'Built-in RC oscillator',
      'One-shot or level-hold melody playback modes',
      'Dynamic speaker driver capability',
      'Compact and easy to use TO-92 package',
      'Pre-programmed with classic melodies (e.g. For Elise)'
    ],
    specs: {
      'Operating Voltage Range': '1.5V - 4.5V',
      'Operating Current': '15µA (typ)',
      'Output Type': 'Melody Audio Output',
      'Oscillator Frequency': '64kHz',
      'Package Type': 'TO-92',
      'Operating Temperature': '-10°C to 60°C'
    }
  },
  {
    id: 'nce6080k',
    name: 'NCE6080K 10A 10V NCE N-Channel Enhancement Mode Power MOSFET',
    brand: 'NCE Power',
    category: 'mosfet',
    subcategory: 'n-channel',
    price: 7,
    package: 'TO-252-TL',
    description: 'The NCE6080K uses advanced trench technology to provide excellent RDS(ON), low gate charge and operation with gate voltages as low as 4.5V. This device is suitable for high-density DC-DC and load switching applications.',
    features: [
      'High density cell design for ultra low Rdson',
      'Fully characterized avalanche voltage and current',
      'Excellent package for good heat dissipation',
      'High speed switching, high reliability',
      '100% avalanche tested',
      'Lead-free design'
    ],
    specs: {
      'Drain-Source Voltage (Vdss)': '60V',
      'Continuous Drain Current (Id)': '80A',
      'RDS(ON) (at Vgs=10V)': '< 8mΩ',
      'Gate Charge (Qg)': '28 nC',
      'Package Type': 'TO-252-TL',
      'Operating Temperature': '-55°C to 175°C'
    }
  },
  {
    id: 'nce6050ka',
    name: 'NCE6050KA 10V 50A N-Channel Power MOSFET NCE POWER',
    brand: 'NCE Power',
    category: 'mosfet',
    subcategory: 'power',
    price: 7,
    package: 'TO-252-TL',
    description: 'The NCE6050KA uses trench technology to offer low gate charge and optimized RDS(ON) values. Designed to deliver high efficiency switching in synchronous rectifiers, motor controllers, and automotive DC-DC converters.',
    features: [
      'Trench Power MOSFET technology',
      'Ultra low Rdson and low gate charge',
      'Exceptional thermal performance and robustness',
      'Avalanche energy rated',
      'Fast recovery body diode',
      'RoHS & Green compliant'
    ],
    specs: {
      'Drain-Source Voltage (Vdss)': '60V',
      'Continuous Drain Current (Id)': '50A',
      'RDS(ON) (at Vgs=10V)': '< 12mΩ',
      'Gate Charge (Qg)': '24 nC',
      'Package Type': 'TO-252-TL',
      'Operating Temperature': '-55°C to 175°C'
    }
  },
  {
    id: 'nce3050k',
    name: 'NCE3050K TO-252 N-Channel NCE POWER',
    brand: 'NCE Power',
    category: 'mosfet',
    subcategory: 'n-channel',
    price: 3.5,
    package: 'TO-252',
    description: 'The NCE3050K is a trench N-channel power MOSFET designed for high efficiency switching, DC-DC converter applications, and consumer electronics power management.',
    features: [
      'High speed switching',
      'Low on-resistance and low gate charge',
      'Standard TO-252 (DPAK) surface mount package',
      'Good heat dissipation package structure',
      '100% avalanche tested',
      'Highly stable parameters over temperature'
    ],
    specs: {
      'Drain-Source Voltage (Vdss)': '30V',
      'Continuous Drain Current (Id)': '50A',
      'RDS(ON) (at Vgs=10V)': '< 9mΩ',
      'Gate-Source Voltage (Vgs)': '±20V',
      'Gate Charge (Qg)': '18 nC',
      'Operating Temperature': '-55°C to 175°C'
    }
  },
  {
    id: 'nce01p13',
    name: 'NCE01P13 -13A -10V P-Channel TO-252 NCE POWER',
    brand: 'NCE Power',
    category: 'mosfet',
    subcategory: 'p-channel',
    price: 8,
    package: 'TO-252',
    description: 'The NCE01P13 is a P-channel enhancement mode power MOSFET, using advanced trench technology to provide excellent RDS(ON) and ultra-low gate charge, making it perfect for high side switching application.',
    features: [
      'Ultra-low RDS(ON) and low gate charge',
      'Exceptional dv/dt and switching capability',
      'P-Channel configuration for simplified gate drive',
      'RoHS & Green compliant',
      'Excellent thermal performance in DPAK (TO-252)',
      '100% single pulse avalanche energy tested'
    ],
    specs: {
      'Drain-Source Voltage (Vdss)': '-100V',
      'Continuous Drain Current (Id)': '-13A',
      'RDS(ON) (at Vgs=-10V)': '< 150mΩ',
      'Gate-Source Voltage (Vgs)': '±20V',
      'Gate Charge (Qg)': '22 nC',
      'Operating Temperature': '-55°C to 150°C'
    }
  }
];

export const getProductsByCategory = (catId) => {
  return products.filter(p => p.category === catId);
};

export const getProductById = (id) => {
  return products.find(p => p.id === id);
};

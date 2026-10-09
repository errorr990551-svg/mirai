import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const contactInfoBlock = {
  phones: ["+91 93213 98188", "+91 98201 22744", "+91 91368 10360"],
  office: "401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007",
  registered: "B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034"
};

const commonActive = [
  "Integrated circuits from Texas Instruments, STMicroelectronics, NXP, Microchip and Analog Devices",
  "Power MOSFETs from Infineon, ON Semi, STMicroelectronics and Vishay",
  "BJT transistors, plus IGBTs on request (send part numbers to confirm availability)",
  "Microcontrollers for industrial automation, IoT and embedded electronics",
  "Voltage regulators: buck, boost and LDO"
];

const commonPassives = [
  "SMD chip resistors, 1% precision, 0402 to 1210, rated -55°C to +155°C",
  "Through-hole resistors, E24 values, 1/4W to 1W (1,300+ resistor SKUs in total)",
  "SMD ceramic capacitors (MLCC), 384+ SKUs, 0402 to 1812, C0G/NP0 and X7R, 16V to 50V",
  "Radial electrolytic and SMD tantalum capacitors",
  "SMD power inductors, 390+ SKUs, shielded ferrite"
];

const commonPassivesWithTantalumSizes = [
  "SMD chip resistors, 1% precision, 0402 to 1210, rated -55°C to +155°C",
  "Through-hole resistors, E24 values, 1/4W to 1W (1,300+ resistor SKUs in total)",
  "SMD ceramic capacitors (MLCC), 384+ SKUs, 0402 to 1812, C0G/NP0 and X7R, 16V to 50V",
  "Radial electrolytic and SMD tantalum capacitors (case sizes A to D)",
  "SMD power inductors, 390+ SKUs, shielded ferrite"
];

const commonDiodes = [
  "Zener, Schottky, rectifier and TVS diodes",
  "LEDs and crystal oscillators"
];

const commonDiodesUjjain = [
  "Zener, Schottky, rectifier and TVS diodes",
  "LEDs in 3mm/5mm through-hole and 0603 to 1206 SMD, plus crystal oscillators"
];

const commonConnectors = [
  "Pin headers, JST connectors, terminal blocks, FFC/FPC and USB/DC connectors",
  "Switches, and electromechanical or reed relays with 3V to 24V DC coils and up to 10A contacts"
];

export const mpCitiesData = [
  // 1. INDORE
  {
    city: "Indore",
    state: "Madhya Pradesh",
    slug: "/electronic-component-distributor-in-indore",
    metaTitle: "Electronic Components & MOSFET Distributor in Indore | Mirai Technologies",
    metaDescription: "Genuine MOSFETs, ICs, capacitors, resistors, connectors and relays for Indore's Sanwer Road, Rau, Laxmibai Nagar and Super Corridor units. CoC, IGST invoice, low MOQ.",
    primaryKeyword: "electronic components distributor in Indore",
    secondaryKeywords: "electronic components dealer in Indore, MOSFET distributor in Indore, buy electronic components Indore, semiconductor distributor Indore, MOSFET dealer Indore, power MOSFET supplier Indore, UPS MOSFET Indore, LED driver components Indore, food processing machine drive components, EV charger components Indore, electronic components Sanwer Road, electronic components Laxmibai Nagar, electronic components Rau, electronic components near IIT Indore, electronic spare parts Indore, relay supplier Indore, electronic components with GST invoice, IRFB7546 Indore, IPP037N08N3 Indore, IPP65R190C6 Indore",
    h1: "Electronic Components and MOSFET Distributor in Indore: Genuine Parts for Sanwer Road, Rau, Laxmibai Nagar and the Super Corridor",
    heroSub: "Embedded and IoT teams, UPS and inverter builders, food-processing and packaging engineers, auto-ancillary suppliers, campus labs and repair shops in Indore get authentic MOSFETs, ICs, passives, connectors and relays from Mirai Technologies, with a Certificate of Conformance and a proper GST invoice.",
    trustBadges: [
      "Authorized distributor and stockist since 1999",
      "Certificate of Conformance on genuine parts",
      "GST invoice for Input Tax Credit",
      "Low MOQ, from prototype to production",
      "Dispatch from our Mumbai office; timing confirmed in your quote"
    ],
    heroButtons: [
      { text: "Request Instant GST Quote", action: "rfq" },
      { text: "Browse Products", link: "/products" }
    ],
    whyTrust: {
      h2: "Why Indore Buyers Choose Mirai",
      content: [
        "Indore is the commercial capital of Madhya Pradesh, and it behaves like one. It is a city of traders, makers and food lovers, known for the Rajwada palace, the Sarafa night market, the Chhappan Dukan food street, and for poha-jalebi and namkeen that travel across the country. It has also been named India's cleanest city in the national cleanliness survey several years running.",
        "Behind that sits a working industrial city. Food-processing and packaging plants, pharma and auto-ancillary units, textile and soya-processing firms, and a growing technology and startup scene all buy electronic components. These buyers are quick, price-aware and used to asking questions. They want to know the part is genuine before they ask the price. Mirai Technologies has supplied active and passive components since 1999 from Lamington Road, Mumbai. We source from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      ]
    },
    landscape: {
      h2: "The Indore Industrial Picture",
      items: [
        {
          h3: "Sanwer Road, Laxmibai Nagar and Polo Ground industrial areas",
          content: "Long-established estates inside and around the city, packed with engineering, plastics, packaging, food-processing, electrical and manufacturing units and the repair trade that supports them."
        },
        {
          h3: "Rau and the Pithampur road belt",
          content: "Industrial areas towards Pithampur with engineering, pharma, auto-component and electronics units. Pithampur itself, the large auto and manufacturing cluster, has its own page, and many Indore suppliers serve it."
        },
        {
          h3: "Super Corridor, Crystal IT Park and the SEZ",
          content: "The city's technology side, with software, embedded and hardware firms, design houses and startups that buy small lots of ICs, MCUs, connectors and passives for prototypes."
        },
        {
          h3: "Food processing and packaging",
          content: "Namkeen, snack, bakery, dairy and soya-processing units, with fryers, conveyors, mixers, packing lines and chillers on motors, heaters and drives."
        },
        {
          h3: "Textile and apparel",
          content: "Weaving, processing and garment units in the Indore belt use motors, compressors and controllers."
        },
        {
          h3: "Education and research",
          content: "IIT Indore at Simrol, IIM Indore, Devi Ahilya University and many engineering colleges produce steady demand for small lots of ICs, MCUs and MOSFETs for projects and labs."
        },
        {
          h3: "Trade, healthcare and homes",
          content: "Large wholesale markets, hospitals, malls and townships generate a steady trade in UPS units, inverters and LED lighting."
        }
      ]
    },
    whatWeSupply: {
      h2: "What We Supply in Indore",
      categories: {
        active: {
          title: "Active Components",
          items: commonActive
        },
        passives: {
          title: "Passive Components (1,700+ SKUs)",
          items: commonPassives
        },
        diodes: {
          title: "Diodes, LEDs and Timing (485+ Diode SKUs)",
          items: commonDiodes
        },
        connectors: {
          title: "Connectors and Electromechanical (340+ Connectors, 185+ Electromechanical)",
          items: commonConnectors
        }
      }
    },
    mosfetDistributor: {
      h2: "MOSFET Distributor in Indore",
      intro: "Indore's MOSFET demand is broad and practical. Food-plant drives, UPS and inverter stages, LED drivers and EV chargers need rugged parts, while the technology side needs compact and logic-level parts for embedded builds. Hot, dry summers and a busy grid keep the repair trade busy.",
      applications: [
        "Motor drives and soft-starters for fryer, conveyor, mixer and packing-line motors in food plants.",
        "UPS, inverter and battery systems for hospitals, malls, shops and homes.",
        "LED drivers and power supplies for lighting products.",
        "EV and e-bike chargers and controllers for the growing electric-mobility trade.",
        "Solar inverters and MPPT charge controllers.",
        "Compact converters and load switches on embedded, IoT and startup boards.",
        "Repair of failed drives and power supplies, where a genuine part and the exact part number decide whether the repair holds."
      ],
      popularParts: [
        {
          partNumber: "IRFB7546",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "60 V | 7.3 mΩ max at 10 V",
          vds: "60 V",
          rdsOn: "7.3 mΩ",
          package: "TO-220",
          application: "12V to 24V battery, inverter and charger stages"
        },
        {
          partNumber: "IPP037N08N3 G",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "80 V | 3.7 mΩ max at 10 V",
          vds: "80 V",
          rdsOn: "3.7 mΩ",
          package: "TO-220",
          application: "48V battery, motor and converter stages"
        },
        {
          partNumber: "IPP65R190C6",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "650 V | 0.19 Ω",
          vds: "650 V",
          rdsOn: "0.19 Ω",
          package: "TO-220",
          application: "Mains-side SMPS, LED-driver and inverter stages"
        },
        {
          partNumber: "STP20N65M5",
          manufacturer: "STMicroelectronics",
          brand: "STMicroelectronics",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "650 V | 0.19 Ω",
          vds: "650 V",
          rdsOn: "0.19 Ω",
          package: "TO-220",
          application: "Mains-side power supplies and drive stages"
        },
        {
          partNumber: "FQP13N06L",
          manufacturer: "ON Semiconductor",
          brand: "ON Semi",
          channel: "N-channel logic level",
          polarity: "N-channel logic level",
          ratings: "60 V | 13.6 A | 0.11 Ω",
          vds: "60 V",
          rdsOn: "0.11 Ω",
          id: "13.6 A",
          package: "TO-220",
          application: "12V to 24V switching driven from 5V logic"
        },
        {
          partNumber: "SPD30P06P G",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "P-channel",
          polarity: "P-channel",
          ratings: "-60 V | -30 A | 75 mΩ",
          vds: "-60 V",
          rdsOn: "75 mΩ",
          id: "-30 A",
          package: "TO-252 (DPAK)",
          application: "Reverse-polarity protection and high-side switching on battery systems"
        },
        {
          partNumber: "Si2301CDS",
          manufacturer: "Vishay",
          brand: "Vishay",
          channel: "P-channel small-signal",
          polarity: "P-channel small-signal",
          ratings: "-20 V | 0.1 Ω",
          vds: "-20 V",
          rdsOn: "0.1 Ω",
          package: "SOT-23",
          application: "Compact battery load switches on embedded boards"
        }
      ],
      howToPick: {
        title: "How to Pick a MOSFET for Food-Plant Drives, UPS and Embedded Boards",
        tips: [
          "Voltage: a rectified 230V supply gives about 325V DC, and spikes sit on top, so 600V and 650V parts are common on the mains side. Battery stages use 40V to 100V parts, with margin for charging voltage and spikes.",
          "Heat: fryer halls, hot dry summers and sealed enclosures eat into thermal headroom, so derate generously and use a real heatsink with a good thermal pad.",
          "Surface-mount boards: DPAK and similar packages rely on board copper, so the PCB layout sets the real thermal resistance.",
          "Oil, steam and dust: food plants are greasy, steamy or dusty, so use sealed enclosures, conformal coating and quality terminal blocks, and clean heatsinks and fans regularly.",
          "Gate drive: make sure the driver supplies enough gate voltage and current, and add a gate resistor and a pull-down.",
          "Find the cause of a failure: when replacing a failed MOSFET, check the gate driver, snubber, supply and cooling, or the new part will fail too."
        ]
      }
    },
    mosfetCalculator: {
      h2: "MOSFET Thermal and Power Loss Calculator",
      defaultPart: "IRFB7546",
      defaultIrms: 10,
      defaultRdsOn: 7.3,
      defaultTa: 40,
      defaultThetaJa: 62,
      workedExample: "Worked Example (IRFB7546): IRFB7546 in a 24V inverter stage. R_DS(on) 7.3 mΩ, T_A 40°C, θ_JA 62°C/W (TO-220, free air). At 10 A: P_cond = 10 x 10 x 0.0073 = 0.73 W. Temp rise = 45.3°C. T_J = 85.3°C (Safe). At 20 A: P_cond = 20 x 20 x 0.0073 = 2.92 W. Temp rise = 181°C. T_J = 221°C (Warning). Heat grows with the square of the current, so doubling the current quadruples the loss. A heatsink lowers the thermal resistance and provides real safety margin.",
      disclaimer: "Disclaimer: this is a quick estimate. Real designs also include switching loss, duty cycle, PCB cooling and the rise of R_DS(on) with temperature. Check the datasheet."
    },
    qualityCompliance: {
      h2: "Supply for Plants, Tech Teams and Documented Buyers",
      points: [
        "Certificate of Conformance with genuine parts",
        "ISO 9001:2015 certified quality management",
        "ANSI/ESD S20.20 compliant handling, which protects static-sensitive MOSFETs and ICs",
        "RoHS and REACH compliance verification",
        "Low MOQ, so a small shop can buy what the next job needs and a design team can buy ten pieces to validate a board",
        "Buffer stock under rolling forecasts: share a forecast and we plan stock with you, which helps most for buyers far from Mumbai",
        "Cross-referencing support when a part goes on allocation or end-of-life",
        "Tantalum capacitors in case sizes A to D and wide-temperature SMD resistors (-55°C to +155°C) for compact, high-reliability designs",
        "One quote for the whole BOM or repair list: MOSFETs, ICs, diodes, capacitors, relays and connectors",
        "Institutions should share billing details and purchase-order requirements with the RFQ so the invoice is right the first time. Your design team decides what your product needs. We supply genuine parts with the paperwork to support it."
      ],
      registeredAddressNote: "Mirai Technologies supplies active and passive components with full manufacturer traceability and GST invoicing. Registered Office: B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034. Central Dispatch: 401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007."
    },
    serviceAreas: {
      h2: "Indore Areas We Serve",
      areas: "Sanwer Road, Laxmibai Nagar, Polo Ground, Rau, Super Corridor, Crystal IT Park, Simrol, Mhow, Sanwer, Depalpur, Betma, Pithampur, Dewas border areas, Ujjain border areas and the wider Indore region. Tell us your location in the RFQ and we confirm dispatch details in the quote."
    },
    howToOrder: {
      h2: "How to Order from Indore",
      steps: [
        "Send your BOM, part numbers or repair list by WhatsApp, email or the quote form. A photo of the board or part markings also helps.",
        "We reply within 24 hours with pricing, availability and traceability.",
        "We confirm dispatch for your Indore location.",
        "Your order ships from Mumbai with GST invoice and CoC.",
        "For repeat parts, share a forecast so we can plan stock."
      ]
    },
    contactInfo: contactInfoBlock,
    faqs: [
      {
        q: "Do you have an Indore office?",
        a: "No. We dispatch from our Lamington Road office in Mumbai to Indore and across India. Your quote confirms the arrangement and timing for your location."
      },
      {
        q: "Will I get a GST invoice for ITC, and which tax applies?",
        a: "Yes, every B2B order carries a GST invoice. Because we are in Maharashtra and you are in Madhya Pradesh, a sale to you is an inter-state supply, so the invoice carries IGST. Confirm treatment with your accountant, and send your GSTIN with the RFQ."
      },
      {
        q: "What is the minimum order quantity?",
        a: "We offer low MOQ flexibility, from single repair quantities to production lots. The exact MOQ is confirmed in your quote."
      },
      {
        q: "Are the components genuine and traceable?",
        a: "Yes. We source from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      },
      {
        q: "Which MOSFETs suit UPS, LED drivers and food-plant drives?",
        a: "It depends on your topology, voltage and current. Mains-side stages commonly use 600V to 650V N-channel parts, and battery or low-voltage stages use 40V to 100V parts. Send your part numbers or requirements, and we confirm availability and suggest alternatives if a part is unavailable."
      },
      {
        q: "Do you supply institutes, colleges and startups?",
        a: "Yes. Send your list of ICs, MCUs, MOSFETs and connectors, and share your institution's billing details and purchase-order requirements with the RFQ so the invoice is right the first time."
      }
    ],
    relatedCities: [
      { name: "Pithampur-Dhar", slug: "/electronic-component-distributor-in-pithampur-dhar" },
      { name: "Dewas", slug: "/electronic-component-distributor-in-dewas" },
      { name: "Ujjain", slug: "/electronic-component-distributor-in-ujjain" },
      { name: "Bhopal", slug: "/electronic-component-distributor-in-bhopal" }
    ],
    internalLinks: [
      { text: "Pithampur-Dhar Component Hub", url: "/electronic-component-distributor-in-pithampur-dhar" },
      { text: "Dewas Industrial Belt", url: "/electronic-component-distributor-in-dewas" },
      { text: "Ujjain Regional Supply", url: "/electronic-component-distributor-in-ujjain" },
      { text: "Bhopal Capital Sector", url: "/electronic-component-distributor-in-bhopal" }
    ]
  },

  // 2. BHOPAL
  {
    city: "Bhopal",
    state: "Madhya Pradesh",
    slug: "/electronic-component-distributor-in-bhopal",
    metaTitle: "Electronic Components & MOSFET Distributor in Bhopal | Mirai Technologies",
    metaDescription: "Genuine MOSFETs, ICs, capacitors, resistors, connectors and relays for Bhopal's Govindpura, Mandideep, Bairagarh and campus users. CoC, IGST invoice, low MOQ. Since 1999.",
    primaryKeyword: "electronic components distributor in Bhopal",
    secondaryKeywords: "electronic components dealer in Bhopal, MOSFET distributor in Bhopal, buy electronic components Bhopal, semiconductor distributor Bhopal, MOSFET dealer Bhopal, power MOSFET supplier Bhopal, UPS MOSFET Bhopal, LED street light driver components, solar inverter MOSFET Bhopal, EV charger components Bhopal, electronic components Govindpura, electronic components Mandideep, electronic components Bairagarh, electronic components near MANIT, electronic spare parts Bhopal, relay supplier Bhopal, electronic components with GST invoice, IRFB4410Z Bhopal, IRFP4228 Bhopal, STP25NM60N Bhopal",
    h1: "Electronic Components and MOSFET Distributor in Bhopal: Genuine Parts for Govindpura, Mandideep, Bairagarh and Campus Labs",
    heroSub: "Power-equipment and panel builders, UPS and inverter technicians, LED-lighting and solar installers, hospital and campus teams, electrical contractors and repair shops in Bhopal get authentic MOSFETs, ICs, passives, connectors and relays from Mirai Technologies, with a Certificate of Conformance and a proper GST invoice.",
    trustBadges: [
      "Authorized distributor and stockist since 1999",
      "Certificate of Conformance on genuine parts",
      "GST invoice for Input Tax Credit",
      "Low MOQ, from prototype to production",
      "Dispatch from our Mumbai office; timing confirmed in your quote"
    ],
    heroButtons: [
      { text: "Request Instant GST Quote", action: "rfq" },
      { text: "Browse Products", link: "/products" }
    ],
    whyTrust: {
      h2: "Why Bhopal Buyers Choose Mirai",
      content: [
        "Bhopal is the capital of Madhya Pradesh and is known as the City of Lakes, with the Upper Lake and Lower Lake at its centre, old mosques and palaces in the old city and wide, green roads in the new one. The Sanchi stupa, the Bhimbetka rock shelters and the Bhojpur temple lie within an easy drive.",
        "A capital city buys differently from a factory town. Government offices, hospitals, universities and townships are large, steady buyers of backup power, lighting and electrical equipment, and they ask for paperwork. Alongside them sits a real industrial side: a major heavy-electrical manufacturing complex, with many vendors around it, and industrial belts at Govindpura, Mandideep and Bairagarh. Summers are hot and the monsoon is humid, so equipment works hard, and a counterfeit part that fails in a week is the most expensive kind of saving. Mirai Technologies has supplied active and passive components since 1999 from Lamington Road, Mumbai, and has supplied defence units. We source from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      ]
    },
    landscape: {
      h2: "The Bhopal Industrial and Institutional Picture",
      items: [
        {
          h3: "Heavy-electrical belt",
          content: "Bhopal hosts a large public-sector heavy-electrical manufacturing complex that makes power-plant and rail-related equipment, and a wide ring of vendors, fabricators and panel builders has grown up around it. These vendors use welding inverters, cranes, drives and test power supplies."
        },
        {
          h3: "Govindpura Industrial Area",
          content: "A long-established estate on the city's edge, with engineering, electrical, plastics, packaging and small manufacturing units and the repair trade around them."
        },
        {
          h3: "Mandideep and Obaidullaganj",
          content: "A large industrial belt south-east of the city, with engineering, food-processing, pharma, chemical and auto-component units."
        },
        {
          h3: "Bairagarh, Achharpura and Ratibad",
          content: "Further industrial and warehousing areas with workshops, fabricators and small manufacturers."
        },
        {
          h3: "Government, smart-city and utilities",
          content: "Offices, street lighting, water pumping and smart-city projects use LED drivers, controllers, UPS units and solar installations, and electrical contractors serve them."
        },
        {
          h3: "Hospitals and healthcare",
          content: "A large medical institute, medical colleges and many hospitals depend on UPS and DC backup systems that must not fail, and their facilities teams maintain them."
        },
        {
          h3: "Education and research",
          content: "MANIT, IISER Bhopal, RGPV, the School of Planning and Architecture, Barkatullah University and many engineering colleges produce steady demand for small lots of ICs, MCUs, MOSFETs and connectors for labs and student projects."
        },
        {
          h3: "Solar and electric mobility",
          content: "Rooftop solar, inverters, battery systems and e-rickshaw and EV charging are growing across the city."
        }
      ]
    },
    whatWeSupply: {
      h2: "What We Supply in Bhopal",
      categories: {
        active: {
          title: "Active Components",
          items: commonActive
        },
        passives: {
          title: "Passive Components (1,700+ SKUs)",
          items: commonPassivesWithTantalumSizes
        },
        diodes: {
          title: "Diodes, LEDs and Timing (485+ Diode SKUs)",
          items: commonDiodes
        },
        connectors: {
          title: "Connectors and Electromechanical (340+ Connectors, 185+ Electromechanical)",
          items: commonConnectors
        }
      }
    },
    mosfetDistributor: {
      h2: "MOSFET Distributor in Bhopal",
      intro: "Bhopal's MOSFET demand is built around backup power and electrical equipment. UPS and inverter systems for offices and hospitals, LED street and building lighting, solar and EV charging, and the test supplies and welders used by electrical vendors all need a mix of mains-side and battery-side parts, with a lot of attention to reliability. Hot summers and humid monsoon months add stress.",
      applications: [
        "UPS, inverter and battery-backup systems for offices, hospitals, schools, banks and homes.",
        "LED street-lighting and building-lighting drivers, including smart controllers.",
        "Rooftop solar inverters and MPPT charge controllers.",
        "E-rickshaw, e-bike and EV chargers and controllers.",
        "Welding inverters, test power supplies and DC drives used by electrical and fabrication vendors.",
        "Research, thesis and startup builds at campus labs, including motor drivers, converters and robotics.",
        "Repair of failed power supplies, drives and chargers, where a genuine part and the exact part number decide whether the repair holds."
      ],
      popularParts: [
        {
          partNumber: "IRFB4410Z",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "100 V | 9 mΩ max at 10 V",
          vds: "100 V",
          rdsOn: "9 mΩ",
          package: "TO-220",
          application: "48V battery, inverter and charger stages"
        },
        {
          partNumber: "IRFP4228",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "150 V | 83 A | 15 mΩ max at 10 V",
          vds: "150 V",
          rdsOn: "15 mΩ",
          id: "83 A",
          package: "TO-247",
          application: "UPS bridge, DC bus and higher-power battery stages"
        },
        {
          partNumber: "STP25NM60N",
          manufacturer: "STMicroelectronics",
          brand: "STMicroelectronics",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "600 V | 21 A | 0.17 Ω",
          vds: "600 V",
          rdsOn: "0.17 Ω",
          id: "21 A",
          package: "TO-220",
          application: "Mains-side SMPS, UPS and drive stages"
        },
        {
          partNumber: "FQP7N80C",
          manufacturer: "ON Semiconductor",
          brand: "ON Semi",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "800 V | 6.6 A | 1.9 Ω max at 10 V",
          vds: "800 V",
          rdsOn: "1.9 Ω",
          id: "6.6 A",
          package: "TO-220",
          application: "High-voltage off-line supplies and LED-driver stages"
        },
        {
          partNumber: "IRLZ34N",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel logic level",
          polarity: "N-channel logic level",
          ratings: "55 V | 27 A | 35 mΩ",
          vds: "55 V",
          rdsOn: "35 mΩ",
          id: "27 A",
          package: "TO-220",
          application: "12V to 24V switching driven from 5V logic"
        },
        {
          partNumber: "Si4425DDY",
          manufacturer: "Vishay",
          brand: "Vishay",
          channel: "P-channel",
          polarity: "P-channel",
          ratings: "-30 V | a few tens of mΩ",
          vds: "-30 V",
          package: "SO-8",
          application: "Compact reverse-polarity protection and load switching"
        },
        {
          partNumber: "BSS138",
          manufacturer: "ON Semiconductor",
          brand: "ON Semi",
          channel: "N-channel small-signal",
          polarity: "N-channel small-signal",
          ratings: "50 V | 0.22 A | 3.5 Ω max at 10 V",
          vds: "50 V",
          rdsOn: "3.5 Ω",
          id: "0.22 A",
          package: "SOT-23",
          application: "Level shifting and signal switching on embedded and student boards"
        }
      ],
      howToPick: {
        title: "How to Pick a MOSFET for UPS, Lighting Drivers and Charger Stages",
        tips: [
          "Voltage: a rectified 230V supply gives about 325V DC, and spikes sit on top, so 600V to 800V parts are common on the mains side. Battery stages use 40V to 150V parts, with margin for charging voltage and spikes.",
          "Reliability: hospital and office backup must work during an outage, so derate generously and protect against inrush and surges.",
          "Heat: hot summers and sealed inverter boxes eat into thermal headroom, so use a real heatsink with a good thermal pad.",
          "Humidity: monsoon damp corrodes leads, connectors and board traces, so use conformal coating and quality terminal blocks, and check for corrosion on every repair.",
          "Surface-mount boards: SO-8 and similar packages rely on board copper, so the PCB layout sets the real thermal resistance.",
          "Gate drive: make sure the driver supplies enough gate voltage and current, and add a gate resistor and a pull-down.",
          "Find the cause of a failure: when replacing a failed MOSFET, check the gate driver, snubber, supply and cooling, or the new part will fail too."
        ]
      }
    },
    mosfetCalculator: {
      h2: "MOSFET Thermal and Power Loss Calculator",
      defaultPart: "IRFB4410Z",
      defaultIrms: 12,
      defaultRdsOn: 9,
      defaultTa: 42,
      defaultThetaJa: 62,
      workedExample: "Worked Example (IRFB4410Z): IRFB4410Z in a 48V inverter stage. R_DS(on) 9 mΩ, T_A 42°C (a warm enclosure in a hot summer), θ_JA 62°C/W (TO-220, free air). At 12 A: P_cond = 12 x 12 x 0.009 = 1.3 W. Temp rise = 80.4°C. T_J = 122.4°C (Safe). At 20 A: P_cond = 20 x 20 x 0.009 = 3.6 W. Temp rise = 223.2°C. T_J = 265.2°C (Warning). Heat grows with the square of the current, so a 67% increase in current nearly triples the loss. A heatsink is essential.",
      disclaimer: "Disclaimer: this is a quick estimate. Real designs also include switching loss, duty cycle, PCB cooling and the rise of R_DS(on) with temperature. Check the datasheet."
    },
    qualityCompliance: {
      h2: "Supply for Vendors, Institutions and Documented Buyers",
      points: [
        "Certificate of Conformance with genuine parts",
        "ISO 9001:2015 certified quality management",
        "ANSI/ESD S20.20 compliant handling, which protects static-sensitive MOSFETs and ICs",
        "RoHS and REACH compliance verification",
        "Low MOQ, so a small shop can buy what the next job needs and a lab can buy ten pieces to validate a board",
        "Buffer stock under rolling forecasts: share a forecast and we plan stock with you, which helps most for buyers far from Mumbai",
        "Cross-referencing support when a part goes on allocation or end-of-life",
        "Tantalum capacitors in case sizes A to D and wide-temperature SMD resistors (-55°C to +155°C) for compact, high-reliability designs",
        "We have supplied defence units since 1999. Tell us which documents your vendor or purchase process needs.",
        "One quote for the whole BOM or repair list: MOSFETs, ICs, diodes, capacitors, relays and connectors",
        "Institutions should share billing details and purchase-order requirements with the RFQ so the invoice is right the first time. Your design team decides what your product needs. We supply genuine parts with the paperwork to support it."
      ],
      registeredAddressNote: "Supplying defence, medical and heavy-electrical vendor establishments with full audit compliance since 1999. Registered Address: B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034. Central Dispatch: 401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007."
    },
    serviceAreas: {
      h2: "Bhopal Areas We Serve",
      areas: "Govindpura, Bairagarh, Achharpura, Ratibad, Kolar, Misrod, Mandideep, Obaidullaganj, Piplani, Habibganj, MP Nagar, Berasia, Sehore, Raisen, Vidisha, Sanchi, Narmadapuram (Hoshangabad), Itarsi and the wider Bhopal region. Tell us your location in the RFQ and we confirm dispatch details in the quote."
    },
    howToOrder: {
      h2: "How to Order from Bhopal",
      steps: [
        "Send your BOM, part numbers or repair list by WhatsApp, email or the quote form. A photo of the board or part markings also helps.",
        "We reply within 24 hours with pricing, availability and traceability.",
        "We confirm dispatch for your Bhopal location.",
        "Your order ships from Mumbai with GST invoice and CoC.",
        "For repeat parts, share a forecast so we can plan stock."
      ]
    },
    contactInfo: contactInfoBlock,
    faqs: [
      {
        q: "Do you have a Bhopal office?",
        a: "No. We dispatch from our Lamington Road office in Mumbai to Bhopal and across India. Your quote confirms the arrangement and timing for your location."
      },
      {
        q: "Will I get a GST invoice for ITC, and which tax applies?",
        a: "Yes, every B2B order carries a GST invoice. Because we are in Maharashtra and you are in Madhya Pradesh, a sale to you is an inter-state supply, so the invoice carries IGST. Confirm treatment with your accountant, and send your GSTIN with the RFQ."
      },
      {
        q: "What is the minimum order quantity?",
        a: "We offer low MOQ flexibility, from single repair quantities to production lots. The exact MOQ is confirmed in your quote."
      },
      {
        q: "Are the components genuine and traceable?",
        a: "Yes. We source from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      },
      {
        q: "Which MOSFETs suit UPS, inverter and LED street-light stages?",
        a: "It depends on your topology, voltage and current. Mains-side stages commonly use 600V to 800V N-channel parts, and battery-side stages use 40V to 150V parts. Send your part numbers or requirements, and we confirm availability and suggest alternatives if a part is unavailable."
      },
      {
        q: "Do you supply institutes, colleges and hospitals?",
        a: "Yes. Send your list of ICs, MCUs, MOSFETs and connectors, and share your institution's billing details and purchase-order requirements with the RFQ so the invoice is right the first time."
      }
    ],
    relatedCities: [
      { name: "Indore", slug: "/electronic-component-distributor-in-indore" },
      { name: "Jabalpur", slug: "/electronic-component-distributor-in-jabalpur" },
      { name: "Ujjain", slug: "/electronic-component-distributor-in-ujjain" },
      { name: "Sagar", slug: "/electronic-component-distributor-in-sagar" }
    ],
    internalLinks: [
      { text: "Indore Commercial Hub", url: "/electronic-component-distributor-in-indore" },
      { text: "Jabalpur Industrial Corridor", url: "/electronic-component-distributor-in-jabalpur" },
      { text: "Ujjain Regional Supply", url: "/electronic-component-distributor-in-ujjain" },
      { text: "Sagar & Bina Refinery Belt", url: "/electronic-component-distributor-in-sagar" }
    ]
  },

  // 3. JABALPUR
  {
    city: "Jabalpur",
    state: "Madhya Pradesh",
    slug: "/electronic-component-distributor-in-jabalpur",
    metaTitle: "Electronic Components & MOSFET Distributor in Jabalpur | Mirai Technologies",
    metaDescription: "Genuine MOSFETs, ICs, capacitors, resistors, connectors and relays for Jabalpur's Richhai, Adhartal and Maneri units and defence-linked vendors. CoC, IGST invoice, low MOQ.",
    primaryKeyword: "electronic components distributor in Jabalpur",
    secondaryKeywords: "electronic components dealer in Jabalpur, MOSFET distributor in Jabalpur, buy electronic components Jabalpur, semiconductor distributor Jabalpur, MOSFET dealer Jabalpur, power MOSFET supplier Jabalpur, defence vendor electronic components, DC charger MOSFET Jabalpur, railway battery charger components, UPS MOSFET Jabalpur, welding inverter MOSFET Jabalpur, VFD repair components Jabalpur, electronic components Richhai, electronic components Adhartal, electronic components Maneri, electronic components Katni, electronic spare parts Jabalpur, relay supplier Jabalpur, electronic components with GST invoice, IPP045N10N3 Jabalpur, IPP110N20N3 Jabalpur, FCP20N60 Jabalpur",
    h1: "Electronic Components and MOSFET Distributor in Jabalpur: Genuine Parts for Richhai, Adhartal, Maneri and Defence-Linked Vendors",
    heroSub: "Defence-linked vendors, vehicle and machine-shop engineers, rail-side electricians, mill and cement-belt technicians, campus labs and repair shops in Jabalpur get authentic MOSFETs, ICs, passives, connectors and relays from Mirai Technologies, with a Certificate of Conformance and a proper GST invoice.",
    trustBadges: [
      "Authorized distributor and stockist since 1999",
      "Certificate of Conformance on genuine parts",
      "GST invoice for Input Tax Credit",
      "Low MOQ, from repair quantities to production lots",
      "Dispatch from our Mumbai office; timing confirmed in your quote"
    ],
    heroButtons: [
      { text: "Request Instant GST Quote", action: "rfq" },
      { text: "Browse Products", link: "/products" }
    ],
    whyTrust: {
      h2: "Why Jabalpur Buyers Choose Mirai",
      content: [
        "Jabalpur sits on the Narmada in the east of Madhya Pradesh, and it is among the state's most scenic cities. The Marble Rocks at Bhedaghat, the Dhuandhar waterfall, the Madan Mahal fort on its rocky hill and the evening aarti at the river ghats all draw visitors. Locals call it Sanskardhani for its learning and culture, and it is the seat of the state's High Court.",
        "For industry, Jabalpur has a particular character. A cluster of ordnance and vehicle-manufacturing establishments grew here over many decades, and with it a deep base of machinists, tool-makers, electricians and small vendors used to documentation and traceable supply. The city is also a railway zone headquarters, and the Katni cement and lime belt lies close by. Buyers here work to specifications and keep long-life equipment running, and a counterfeit part that fails in a week is the most expensive kind of saving. Mirai Technologies has supplied active and passive components since 1999 from Lamington Road, Mumbai, and has supplied defence units. We source from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      ]
    },
    landscape: {
      h2: "The Jabalpur Industrial Picture",
      items: [
        {
          h3: "Defence-manufacturing heritage and vendors",
          content: "The city's ordnance and vehicle-making tradition supports a wide base of small and mid-size vendors, machine shops and tool rooms. They use CNC and conventional machines, welding inverters, test power supplies and chargers, and work to documented standards."
        },
        {
          h3: "Richhai, Adhartal and Maneri industrial areas",
          content: "The city's established estates, with engineering, electrical, plastics, dal-milling, food and manufacturing units and the repair trade that supports them."
        },
        {
          h3: "Railways",
          content: "Jabalpur is a railway zone headquarters with sheds and workshops. Rail work uses battery chargers and DC auxiliary supplies, lighting, cranes and signalling-related electronics."
        },
        {
          h3: "Cement and lime belt",
          content: "Katni and the area east of the city have limestone, lime and cement units. Crushers, kiln fans, mills and conveyors run on large motors and drives, and the contractors and workshops around them supply and repair drives and panels."
        },
        {
          h3: "Dal and agro-processing",
          content: "The surrounding districts grow pulses, wheat and rice, and dal mills, flour mills and oil units run on motors, conveyors and sorters."
        },
        {
          h3: "Power and hydel",
          content: "The Narmada's dams and power projects in the region have created a base of electrical contractors, DC battery-system maintainers and control-panel repair shops."
        },
        {
          h3: "Courts, hospitals and campuses",
          content: "The High Court complex, a large government medical college, hospitals and townships need UPS units and backup power, and the universities and engineering colleges produce steady demand for small lots of ICs, MCUs and MOSFETs for labs and student projects."
        },
        {
          h3: "Trade and homes",
          content: "Large wholesale markets, shops and townships generate a steady trade in inverters, UPS units and LED lighting."
        }
      ]
    },
    whatWeSupply: {
      h2: "What We Supply in Jabalpur",
      categories: {
        active: {
          title: "Active Components",
          items: commonActive
        },
        passives: {
          title: "Passive Components (1,700+ SKUs)",
          items: commonPassivesWithTantalumSizes
        },
        diodes: {
          title: "Diodes, LEDs and Timing (485+ Diode SKUs)",
          items: commonDiodes
        },
        connectors: {
          title: "Connectors and Electromechanical (340+ Connectors, 185+ Electromechanical)",
          items: commonConnectors
        }
      }
    },
    mosfetDistributor: {
      h2: "MOSFET Distributor in Jabalpur",
      intro: "Jabalpur's MOSFET demand is rugged and documentation-minded. Vehicle and machine-shop equipment runs on 24V and 48V DC, rail and hydel systems use higher-voltage DC buses, cement and dal mills run large three-phase drives, and the city's hospitals, courts and townships depend on backup power. Hot summers and humid monsoons add stress, and most of the work is maintenance, repair and replacement.",
      applications: [
        "24V and 48V DC power stages, battery chargers and DC-DC converters in vehicle, machine-shop and test equipment.",
        "Battery chargers and DC systems for rail-side sheds, hydel panels and control rooms, commonly on 24V, 48V, 72V and 110V.",
        "Variable-frequency drives and soft-starters for dal-mill, flour-mill, cement-belt crusher and conveyor motors.",
        "Welding inverters and test power supplies in vendor workshops.",
        "UPS and inverter systems for courts, hospitals, schools and homes.",
        "Student and lab builds at campuses, including motor drivers, converters and robotics.",
        "Repair of failed drives and power supplies, where a genuine part and the exact part number decide whether the repair holds."
      ],
      popularParts: [
        {
          partNumber: "IPP045N10N3 G",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "100 V | 4.5 mΩ max at 10 V",
          vds: "100 V",
          rdsOn: "4.5 mΩ",
          package: "TO-220",
          application: "48V battery, charger and motor stages"
        },
        {
          partNumber: "IPP110N20N3 G",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "200 V | 11 mΩ max at 10 V",
          vds: "200 V",
          rdsOn: "11 mΩ",
          package: "TO-220",
          application: "110V-class DC bus, inverter and charger stages"
        },
        {
          partNumber: "FCP20N60",
          manufacturer: "ON Semiconductor",
          brand: "ON Semi",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "600 V | 20 A | 0.19 Ω",
          vds: "600 V",
          rdsOn: "0.19 Ω",
          id: "20 A",
          package: "TO-220",
          application: "Mains-side SMPS, UPS and drive stages"
        },
        {
          partNumber: "STW62N65M5",
          manufacturer: "STMicroelectronics",
          brand: "STMicroelectronics",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "650 V | 46 A | 0.045 Ω",
          vds: "650 V",
          rdsOn: "0.045 Ω",
          id: "46 A",
          package: "TO-247",
          application: "Higher-power three-phase-derived drive, welding and inverter stages"
        },
        {
          partNumber: "IPP50R140CP",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "500 V | 0.14 Ω",
          vds: "500 V",
          rdsOn: "0.14 Ω",
          package: "TO-220",
          application: "Mains-side power supplies and drive-auxiliary stages"
        },
        {
          partNumber: "SPP18P06P",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "P-channel",
          polarity: "P-channel",
          ratings: "-60 V | -18 A | 0.13 Ω",
          vds: "-60 V",
          rdsOn: "0.13 Ω",
          id: "-18 A",
          package: "TO-220",
          application: "High-side switching and reverse-polarity protection on 24V to 48V systems"
        },
        {
          partNumber: "FDN304P",
          manufacturer: "ON Semiconductor",
          brand: "ON Semi",
          channel: "P-channel small-signal",
          polarity: "P-channel small-signal",
          ratings: "-20 V | -2.4 A | 52 mΩ at -4.5 V",
          vds: "-20 V",
          rdsOn: "52 mΩ",
          id: "-2.4 A",
          package: "SOT-23",
          application: "Compact battery load switches on controller boards"
        }
      ],
      howToPick: {
        title: "How to Pick a MOSFET for Vendor Equipment, Rail-Side Chargers and Mill Drives",
        tips: [
          "Voltage: batteries charge above their nominal voltage and inductive loads add spikes, so a 24V system commonly uses 60V parts, a 48V or 72V system 100V to 150V parts, and a 110V DC system 150V to 250V parts. A rectified 230V supply gives about 325V DC, and a 415V three-phase supply gives about 560V DC, so 600V and higher parts are common in drive stages.",
          "Documentation: for equipment that must be traceable, record the manufacturer part number and lot, keep the Certificate of Conformance with the records, and record any approved alternates.",
          "Heat: hot summers, plant rooms and sealed chargers eat into thermal headroom, so derate generously and use a real heatsink with a good thermal pad.",
          "Dust: cement, lime and flour dust clog heatsinks and fans, so use filtered, sealed enclosures and clean them regularly.",
          "Humidity: monsoon damp corrodes leads, connectors and board traces, so use conformal coating and quality terminal blocks, and check for corrosion on every repair.",
          "Gate drive: make sure the driver supplies enough gate voltage and current, and add a gate resistor and a pull-down.",
          "Find the cause of a failure: when replacing a failed MOSFET, check the gate driver, snubber, supply, cooling and any moisture damage, or the new part will fail too."
        ]
      }
    },
    mosfetCalculator: {
      h2: "MOSFET Thermal and Power Loss Calculator",
      defaultPart: "IPP045N10N3 G",
      defaultIrms: 18,
      defaultRdsOn: 4.5,
      defaultTa: 40,
      defaultThetaJa: 62,
      workedExample: "Worked Example (IPP045N10N3 G): IPP045N10N3 G in a 48V charger stage. R_DS(on) 4.5 mΩ, T_A 40°C, θ_JA 62°C/W (TO-220, free air). At 18 A: P_cond = 18 x 18 x 0.0045 = 1.46 W. Temp rise = 90.4°C. T_J = 130.4°C (Safe, with modest headroom). At 28 A: P_cond = 3.53 W. Temp rise = 218.7°C. T_J = 258.7°C (Warning). Heat grows with the square of the current, so a 56% increase in current more than doubles the loss. A heatsink lowers the thermal resistance and gives real margin.",
      disclaimer: "Disclaimer: this is a quick estimate. Real designs also include switching loss, duty cycle, PCB cooling and the rise of R_DS(on) with temperature. Check the datasheet."
    },
    qualityCompliance: {
      h2: "Supply for Vendors, Institutions and Documented Buyers",
      points: [
        "Certificate of Conformance with genuine parts",
        "ISO 9001:2015 certified quality management",
        "ANSI/ESD S20.20 compliant handling, which protects static-sensitive MOSFETs and ICs",
        "RoHS and REACH compliance verification",
        "Low MOQ, so a small shop can buy what the next job needs and a lab can buy ten pieces to validate a board",
        "Buffer stock under rolling forecasts: share a forecast and we plan stock with you, which helps most for buyers far from Mumbai and before planned shutdowns",
        "Cross-referencing support when a part goes on allocation or end-of-life, which matters for long-life equipment",
        "Tantalum capacitors in case sizes A to D and wide-temperature SMD resistors (-55°C to +155°C) for compact, high-reliability designs",
        "We have supplied defence units since 1999. Tell us which documents your vendor process needs.",
        "One quote for the whole BOM or repair list: MOSFETs, ICs, diodes, capacitors, relays and connectors",
        "Institutions should share billing details and purchase-order requirements with the RFQ so the invoice is right the first time. Your design team decides what your product needs. We supply genuine parts with the paperwork to support it."
      ],
      registeredAddressNote: "Approved supplier for defence vendors, railway workshops, and industrial engineering units. Registered address: B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034. Central shipping: 401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007."
    },
    serviceAreas: {
      h2: "Jabalpur Areas We Serve",
      areas: "Jabalpur city, Richhai, Adhartal, Maneri, Panagar, Katangi, Sihora, Bhedaghat, Gwarighat, Vijay Nagar, Napier Town, Garha, Katni, Narsinghpur, Mandla, Seoni, Damoh, Sagar border areas, Satna border areas and the wider Jabalpur region. Tell us your location in the RFQ and we confirm dispatch details in the quote."
    },
    howToOrder: {
      h2: "How to Order from Jabalpur",
      steps: [
        "Send your BOM, part numbers or repair list by WhatsApp, email or the quote form. A photo of the board or part markings also helps.",
        "We reply within 24 hours with pricing, availability and traceability.",
        "We confirm dispatch for your Jabalpur location.",
        "Your order ships from Mumbai with GST invoice and CoC.",
        "For repeat parts, share a forecast so we can plan stock."
      ]
    },
    contactInfo: contactInfoBlock,
    faqs: [
      {
        q: "Do you have a Jabalpur office?",
        a: "No. We dispatch from our Lamington Road office in Mumbai to Jabalpur and across India. Your quote confirms the arrangement and timing for your location."
      },
      {
        q: "Will I get a GST invoice for ITC, and which tax applies?",
        a: "Yes, every B2B order carries a GST invoice. Because we are in Maharashtra and you are in Madhya Pradesh, a sale to you is an inter-state supply, so the invoice carries IGST. Confirm treatment with your accountant, and send your GSTIN with the RFQ."
      },
      {
        q: "What is the minimum order quantity?",
        a: "We offer low MOQ flexibility, from single repair quantities to production lots. The exact MOQ is confirmed in your quote."
      },
      {
        q: "Are the components genuine and traceable?",
        a: "Yes. We source from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      },
      {
        q: "Do you supply defence-linked vendors?",
        a: "We have supplied defence units since 1999. Tell us which documents your vendor process needs, and we confirm what we can provide."
      },
      {
        q: "Which MOSFETs suit 24V to 110V DC chargers and mill drives?",
        a: "It depends on your battery voltage, motor power and topology. 24V stages commonly use 60V parts, 48V to 72V stages use 100V to 150V parts, 110V DC stages use 150V to 250V parts, and mains-side and three-phase-derived stages use 600V and higher parts. Send your part numbers or requirements, and we confirm availability and suggest alternatives if a part is unavailable."
      }
    ],
    relatedCities: [
      { name: "Bhopal", slug: "/electronic-component-distributor-in-bhopal" },
      { name: "Sagar", slug: "/electronic-component-distributor-in-sagar" },
      { name: "Satna", slug: "/electronic-component-distributor-in-satna" },
      { name: "Gwalior", slug: "/electronic-component-distributor-in-gwalior" }
    ],
    internalLinks: [
      { text: "Bhopal Heavy Electrical Belt", url: "/electronic-component-distributor-in-bhopal" },
      { text: "Sagar & Bina Hub", url: "/electronic-component-distributor-in-sagar" },
      { text: "Satna Cement & Quarry Zone", url: "/electronic-component-distributor-in-satna" },
      { text: "Gwalior Industrial Region", url: "/electronic-component-distributor-in-gwalior" }
    ]
  },

  // 4. GWALIOR
  {
    city: "Gwalior",
    state: "Madhya Pradesh",
    slug: "/electronic-component-distributor-in-gwalior",
    metaTitle: "Electronic Components & MOSFET Distributor in Gwalior | Mirai Technologies",
    metaDescription: "Genuine MOSFETs, ICs, capacitors, resistors, connectors and relays for Gwalior's Malanpur, Banmore and Chambal-region mills and workshops. CoC, IGST invoice, low MOQ. Since 1999.",
    primaryKeyword: "electronic components distributor in Gwalior",
    secondaryKeywords: "electronic components dealer in Gwalior, MOSFET distributor in Gwalior, buy electronic components Gwalior, semiconductor distributor Gwalior, MOSFET dealer Gwalior, power MOSFET supplier Gwalior, oil mill drive components, dal mill VFD repair components, solar pump controller MOSFET Gwalior, inverter MOSFET Gwalior, UPS MOSFET Gwalior, DC charger MOSFET, electronic components Malanpur, electronic components Banmore, electronic components Morena, electronic components Bhind, electronic spare parts Gwalior, relay supplier Gwalior, electronic components with GST invoice, IPP023N10N5 Gwalior, IRFB7434 Gwalior, IRFPC60 Gwalior",
    h1: "Electronic Components and MOSFET Distributor in Gwalior: Genuine Parts for Malanpur, Banmore and the Chambal Region",
    heroSub: "Oil, dal and flour-mill electricians, pump and solar-pump installers, inverter and UPS technicians, defence-linked vendors, campus labs and repair shops in Gwalior and the Chambal region get authentic MOSFETs, ICs, passives, connectors and relays from Mirai Technologies, with a Certificate of Conformance and a proper GST invoice.",
    trustBadges: [
      "Authorized distributor and stockist since 1999",
      "Certificate of Conformance on genuine parts",
      "GST invoice for Input Tax Credit",
      "Low MOQ, from repair quantities to production lots",
      "Dispatch from our Mumbai office; timing confirmed in your quote"
    ],
    heroButtons: [
      { text: "Request Instant GST Quote", action: "rfq" },
      { text: "Browse Products", link: "/products" }
    ],
    whyTrust: {
      h2: "Why Gwalior Buyers Choose Mirai",
      content: [
        "Gwalior is a city built around a fort. The Gwalior Fort stands on a long sandstone hill above the old town, the Jai Vilas Palace holds the Scindia family's history, and the city is also remembered for the musician Tansen and the classical music festival held in his name. The annual Gwalior Trade Fair has been a big commercial event for generations.",
        "Beyond the monuments, Gwalior is the main trade centre of the Gwalior-Chambal region. Mustard, pulses and wheat from the surrounding districts arrive at its mills, and the main highway and rail routes between Delhi, Agra and central India pass through it. Summers here are very hot and dry, with dust-laden winds, and the grid is often under strain, so motors, inverters and chargers work at the edge of their ratings. A counterfeit part that fails in a week is the most expensive kind of saving. Mirai Technologies has supplied active and passive components since 1999 from Lamington Road, Mumbai, and has supplied defence units. We source from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      ]
    },
    landscape: {
      h2: "The Gwalior Industrial Picture",
      items: [
        {
          h3: "Malanpur industrial area",
          content: "A large estate on the Agra side of the city, with engineering, pharma, packaging, food-processing and manufacturing units and the supplier and repair trade around them."
        },
        {
          h3: "Banmore and the Morena road belt",
          content: "An industrial area towards Morena with engineering, fabrication and manufacturing units, and workshops that serve them."
        },
        {
          h3: "Oil, dal and flour mills",
          content: "The Chambal region is a major mustard and pulse-growing area, and its oil mills, dal mills and flour mills run expellers, cleaners, graders and conveyors on large motors and drives."
        },
        {
          h3: "Trade and warehousing",
          content: "Gwalior's wholesale markets, warehouses and cold storage serve the region, and transport workshops, hotels and large shops use inverters, UPS units and lighting."
        },
        {
          h3: "Irrigation and pumping",
          content: "Borewell pump sets and canal-fed farms around Gwalior, Datia and Bhind keep a large repair and VFD trade busy, and solar pumps are growing quickly."
        },
        {
          h3: "Defence and air-force presence",
          content: "An air-force station and defence-linked establishments in the region support a vendor base used to documented, traceable supply."
        },
        {
          h3: "Railways and power",
          content: "Gwalior is a major railway junction, and the rail, transmission and power setup brings battery chargers, DC auxiliary systems and electrical contractors."
        },
        {
          h3: "Education and healthcare",
          content: "Jiwaji University, an information-technology institute, engineering and physical-education institutes, medical colleges and hospitals produce a steady demand for UPS units, inverters and small lots of ICs, MCUs and MOSFETs for projects."
        }
      ]
    },
    whatWeSupply: {
      h2: "What We Supply in Gwalior",
      categories: {
        active: {
          title: "Active Components",
          items: commonActive
        },
        passives: {
          title: "Passive Components (1,700+ SKUs)",
          items: commonPassivesWithTantalumSizes
        },
        diodes: {
          title: "Diodes, LEDs and Timing (485+ Diode SKUs)",
          items: commonDiodes
        },
        connectors: {
          title: "Connectors and Electromechanical (340+ Connectors, 185+ Electromechanical)",
          items: commonConnectors
        }
      }
    },
    mosfetDistributor: {
      h2: "MOSFET Distributor in Gwalior",
      intro: "Gwalior's MOSFET demand is heat-driven and repair-led. Mills run long shifts through the mustard and pulse seasons, pump sets and solar pumps work through very hot summers, and inverters and UPS units carry heavy loads when the grid sags. Dust and 45°C-plus ambient temperatures shorten the life of anything that is not well cooled, so replacement and repair never stop.",
      applications: [
        "Variable-frequency drives and soft-starters for oil-mill, dal-mill, flour-mill and conveyor motors.",
        "Pump controllers and VFD stages for borewell and canal-lift pump sets, and solar-pump controllers with MPPT.",
        "Inverters, UPS units and battery chargers for shops, hospitals, hotels, colleges and homes, where summer demand pushes batteries and power stages hard.",
        "Battery chargers and DC systems for rail-side and vendor workshops, commonly on 24V, 48V and 110V.",
        "Welding inverters and test power supplies in engineering workshops.",
        "Student and lab builds at campuses, including motor drivers, converters and robotics.",
        "Repair of failed drives and power supplies, where a genuine part and the exact part number decide whether the repair holds."
      ],
      popularParts: [
        {
          partNumber: "IPP023N10N5",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "100 V | 2.3 mΩ max at 10 V",
          vds: "100 V",
          rdsOn: "2.3 mΩ",
          package: "TO-220",
          application: "48V battery, inverter and charger stages"
        },
        {
          partNumber: "IRFB7434",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "40 V | 1.6 mΩ max at 10 V",
          vds: "40 V",
          rdsOn: "1.6 mΩ",
          package: "TO-220",
          application: "Very-low-resistance 12V to 24V inverter and solar stages"
        },
        {
          partNumber: "FDP33N25",
          manufacturer: "ON Semiconductor",
          brand: "ON Semi",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "250 V | 33 A | 94 mΩ max at 10 V",
          vds: "250 V",
          rdsOn: "94 mΩ",
          id: "33 A",
          package: "TO-220",
          application: "110V-class DC bus and charger stages"
        },
        {
          partNumber: "IRFPC60",
          manufacturer: "Vishay",
          brand: "Vishay",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "600 V | 16 A | 0.4 Ω max at 10 V",
          vds: "600 V",
          rdsOn: "0.4 Ω",
          id: "16 A",
          package: "TO-247",
          application: "Mains-side SMPS, welding and drive-auxiliary stages"
        },
        {
          partNumber: "IRFPE50",
          manufacturer: "Vishay",
          brand: "Vishay",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "800 V | 7.8 A | 1.2 Ω max at 10 V",
          vds: "800 V",
          rdsOn: "1.2 Ω",
          id: "7.8 A",
          package: "TO-247",
          application: "High-voltage off-line supplies and three-phase-derived auxiliary stages"
        },
        {
          partNumber: "IRF9530",
          manufacturer: "Vishay",
          brand: "Vishay",
          channel: "P-channel",
          polarity: "P-channel",
          ratings: "-100 V | -12 A | 0.3 Ω max at -10 V",
          vds: "-100 V",
          rdsOn: "0.3 Ω",
          id: "-12 A",
          package: "TO-220",
          application: "High-side switching and reverse-polarity protection on battery systems"
        },
        {
          partNumber: "NTR4170N",
          manufacturer: "ON Semiconductor",
          brand: "ON Semi",
          channel: "N-channel small-signal",
          polarity: "N-channel small-signal",
          ratings: "30 V | 3.5 A | a few tens of mΩ",
          vds: "30 V",
          id: "3.5 A",
          package: "SOT-23",
          application: "Compact 3.3 V and 5 V controller boards"
        }
      ],
      howToPick: {
        title: "How to Pick a MOSFET for Mill Drives, Solar Pumps and Summer Inverters",
        tips: [
          "Voltage: batteries charge above their nominal voltage and motors add inductive spikes, so a 12V system commonly uses 40V to 60V parts, a 24V system 60V parts, a 48V system 100V parts and a 110V DC system 150V to 250V parts. A rectified 230V supply gives about 325V DC, and a 415V three-phase supply gives about 560V DC, so 600V and higher parts are common in drive stages.",
          "Extreme heat: Gwalior summers push ambient temperatures to the mid-40s °C, and sealed boxes and rooftop inverters run hotter still. Derate generously, use a real heatsink with a good thermal pad, and leave room for airflow.",
          "Dust: fine dust and mustard-mill chaff clog heatsinks and fans and can be a fire risk near hot parts, so use filtered, sealed enclosures and clean them regularly.",
          "Voltage swings and surges: a strained grid, long cable runs to pumps and summer storms produce spikes, so add TVS diodes and gate protection.",
          "Winter fog and condensation: cold foggy mornings cause condensation inside enclosures, so use conformal coating and breathing vents or desiccant where needed.",
          "Gate drive: make sure the driver supplies enough gate voltage and current, and add a gate resistor and a pull-down.",
          "Find the cause of a failure: when replacing a failed MOSFET, check the gate driver, snubber, supply, motor, cooling and any dust build-up, or the new part will fail too."
        ]
      }
    },
    mosfetCalculator: {
      h2: "MOSFET Thermal and Power Loss Calculator",
      defaultPart: "IPP023N10N5",
      defaultIrms: 25,
      defaultRdsOn: 2.3,
      defaultTa: 48,
      defaultThetaJa: 62,
      workedExample: "Worked Example (IPP023N10N5): IPP023N10N5 in a 48V inverter stage. R_DS(on) 2.3 mΩ, T_A 48°C (a hot rooftop inverter box in a Gwalior summer), θ_JA 62°C/W (TO-220, free air). At 25 A: P_cond = 25 x 25 x 0.0023 = 1.44 W. Temp rise = 89.1°C. T_J = 137.1°C (Safe, with modest headroom). At 35 A: P_cond = 35 x 35 x 0.0023 = 2.82 W. Temp rise = 174.7°C. T_J = 222.7°C (Warning). A very hot ambient and the square of the current combine to remove thermal headroom. A heatsink is essential.",
      disclaimer: "Disclaimer: this is a quick estimate. Real designs also include switching loss, duty cycle, PCB cooling and the rise of R_DS(on) with temperature. Check the datasheet."
    },
    qualityCompliance: {
      h2: "Supply for Mills, Vendors and Campus Teams",
      points: [
        "Certificate of Conformance with genuine parts",
        "ISO 9001:2015 certified quality management",
        "ANSI/ESD S20.20 compliant handling, which protects static-sensitive MOSFETs and ICs",
        "RoHS and REACH compliance verification",
        "Low MOQ, so a small workshop can buy what the next job needs and a student team can buy a handful of pieces",
        "Buffer stock under rolling forecasts: share a forecast and we plan stock with you, which helps most before the mustard, pulse and summer seasons, and for buyers far from Mumbai",
        "Cross-referencing support when a part goes on allocation or end-of-life, which is common with older drives and chargers",
        "Wide-temperature SMD resistors (-55°C to +155°C) and tantalum capacitors in case sizes A to D for compact, high-reliability designs",
        "We have supplied defence units since 1999. Tell us which documents your vendor process needs.",
        "One quote for the whole BOM or repair list: MOSFETs, diodes, capacitors, relays and terminals",
        "Institutions should share billing details and purchase-order requirements with the RFQ so the invoice is right the first time. Your design team decides what your product needs. We supply genuine parts with the paperwork to support it."
      ],
      registeredAddressNote: "Supply desk for Malanpur, Banmore, and Chambal engineering firms. Registered address: B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034. Central dispatch: 401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007."
    },
    serviceAreas: {
      h2: "Gwalior Areas We Serve",
      areas: "Gwalior city, Lashkar, Morar, Thatipur, Maharajpura, Malanpur, Banmore, Dabra, Bhitarwar, Pichhore, Morena, Bhind, Datia, Shivpuri, Guna, Jhansi border areas (Uttar Pradesh), Dholpur border areas (Rajasthan) and the wider Gwalior-Chambal region. Tell us your location in the RFQ and we confirm dispatch details in the quote."
    },
    howToOrder: {
      h2: "How to Order from Gwalior",
      steps: [
        "Send your BOM, part numbers or repair list by WhatsApp, email or the quote form. A photo of the board or part markings also helps.",
        "We reply within 24 hours with pricing, availability and traceability.",
        "We confirm dispatch for your Gwalior location.",
        "Your order ships from Mumbai with GST invoice and CoC.",
        "For repeat parts, share a forecast so we can plan stock."
      ]
    },
    contactInfo: contactInfoBlock,
    faqs: [
      {
        q: "Do you have a Gwalior office?",
        a: "No. We dispatch from our Lamington Road office in Mumbai to Gwalior and across India. Your quote confirms the arrangement and timing for your location."
      },
      {
        q: "Will I get a GST invoice for ITC, and which tax applies?",
        a: "Yes, every B2B order carries a GST invoice. Because we are in Maharashtra and you are in Madhya Pradesh (or across the border in Uttar Pradesh or Rajasthan), a sale to you is an inter-state supply, so the invoice carries IGST. Confirm treatment with your accountant, and send your GSTIN with the RFQ."
      },
      {
        q: "What is the minimum order quantity?",
        a: "We offer low MOQ flexibility, from single repair quantities to production lots. The exact MOQ is confirmed in your quote."
      },
      {
        q: "Are the components genuine and traceable?",
        a: "Yes. We source from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      },
      {
        q: "Which MOSFETs suit oil-mill drives and solar pump controllers?",
        a: "It depends on your motor power, panel or battery voltage and topology. Mains-side and three-phase-derived drive stages commonly use 600V and higher parts, and battery or panel-side stages use 40V to 250V parts. Send your part numbers or requirements, and we confirm availability and suggest alternatives if a part is unavailable."
      },
      {
        q: "Can you help if a part from an older drive or inverter is discontinued?",
        a: "Yes. Send the part number and a photo of the board if possible, and our team suggests cross-referenced alternatives."
      }
    ],
    relatedCities: [
      { name: "Jabalpur", slug: "/electronic-component-distributor-in-jabalpur" },
      { name: "Bhopal", slug: "/electronic-component-distributor-in-bhopal" },
      { name: "Sagar", slug: "/electronic-component-distributor-in-sagar" }
    ],
    internalLinks: [
      { text: "Jabalpur Industrial Area", url: "/electronic-component-distributor-in-jabalpur" },
      { text: "Bhopal Heavy Electrical Hub", url: "/electronic-component-distributor-in-bhopal" },
      { text: "Sagar Distribution Center", url: "/electronic-component-distributor-in-sagar" }
    ]
  },

  // 5. PITHAMPUR-DHAR
  {
    city: "Pithampur-Dhar",
    state: "Madhya Pradesh",
    slug: "/electronic-component-distributor-in-pithampur-dhar",
    metaTitle: "Electronic Components & MOSFET Distributor in Pithampur-Dhar | Mirai Technologies",
    metaDescription: "Genuine MOSFETs, ICs, capacitors, resistors, connectors and relays for Pithampur's auto, FMCG and pharma sectors and Dhar's mills and workshops. CoC, IGST invoice, low MOQ.",
    primaryKeyword: "electronic components distributor in Pithampur",
    secondaryKeywords: "electronic components distributor in Dhar, MOSFET distributor in Pithampur, buy electronic components Pithampur, semiconductor distributor Pithampur, MOSFET dealer Pithampur, power MOSFET supplier Dhar, automotive MOSFET Pithampur, auto ancillary electronic components, welding inverter MOSFET Pithampur, forklift charger components, VFD repair components Pithampur, electronic components Pithampur Sector 1, electronic components Sagore, electronic components Badnawar, electronic spare parts Pithampur, relay supplier Pithampur, electronic components with GST invoice, AUIRF1404 Pithampur, IPP60R099CP Pithampur, FDP2532 Pithampur",
    h1: "Electronic Components and MOSFET Distributor in Pithampur-Dhar: Genuine Parts for Auto-Ancillary, Pharma and Manufacturing Sectors",
    heroSub: "Auto-ancillary and assembly-line electricians, plant-utility and drive engineers, welding and plating technicians, textile and agro-mill teams and repair shops in Pithampur and Dhar get authentic MOSFETs, ICs, passives, connectors and relays from Mirai Technologies, with a Certificate of Conformance and a proper GST invoice.",
    trustBadges: [
      "Authorized distributor and stockist since 1999",
      "Certificate of Conformance on genuine parts",
      "GST invoice for Input Tax Credit",
      "Low MOQ, from repair quantities to production lots",
      "Dispatch from our Mumbai office; timing confirmed in your quote"
    ],
    heroButtons: [
      { text: "Request Instant GST Quote", action: "rfq" },
      { text: "Browse Products", link: "/products" }
    ],
    whyTrust: {
      h2: "Why Pithampur-Dhar Buyers Choose Mirai",
      content: [
        "Pithampur is about 45 km from Indore on the Indore-Ahmedabad highway, and it is one of the largest industrial areas in central India. People often call it the Detroit of India for its concentration of automotive plants. The surrounding district of Dhar has older roots: the Dhar Fort, the hilltop ruins of Mandu with their palaces and mosques, and the Bagh Caves with their ancient paintings.",
        "An industrial sector like Pithampur runs on schedules. Assembly lines, press shops and utility systems run in shifts, supplier plants are held to delivery windows, and a stopped drive or a bad lot of parts can hold up a whole line. The suppliers around the big plants are audited, and the equipment inside them is maintained on tight calendars. A counterfeit part that fails in a week is the most expensive kind of saving. Mirai Technologies has supplied active and passive components since 1999 from Lamington Road, Mumbai. We source from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      ]
    },
    landscape: {
      h2: "The Pithampur-Dhar Industrial Picture",
      items: [
        {
          h3: "Pithampur industrial sectors",
          content: "The large industrial area is laid out in numbered sectors, and holds automotive, auto-ancillary, engineering, FMCG, pharma, packaging and textile units. A special economic zone and an industrial cluster focused on pharma and other sectors sit in the wider area."
        },
        {
          h3: "Automotive and auto-ancillary",
          content: "Press shops, machining, forging, wiring-harness, plastics, plating and assembly units supply vehicle makers. They use servo and DC drives, welding power sources, test power supplies, battery chargers and plant utilities, and they are run to documented quality systems."
        },
        {
          h3: "Pharma and FMCG",
          content: "Production blocks, packing lines and clean utilities run drives, HVAC, compressors and control panels."
        },
        {
          h3: "Textile and apparel",
          content: "Spinning and garment units in the Pithampur and Dhar belt use motors, humidification plants, compressors and controllers, and a large textile park has been planned near Dhar."
        },
        {
          h3: "Plant utilities and contractors",
          content: "Compressors, chillers, cooling towers, boilers and effluent plants need drives, DC and UPS backup, and a large base of electrical contractors, panel builders and repair shops looks after them."
        },
        {
          h3: "Dhar town and the agro belt",
          content: "The farmland around Dhar grows soybean, wheat and cotton, with oil, dal and flour mills, cotton ginning and cold storage that run on large motors and drives, and thousands of pump sets and solar pumps."
        },
        {
          h3: "Heritage and tourism",
          content: "Mandu and the Bagh area draw visitors, and the lodges and hotels use inverters, UPS units and lighting."
        },
        {
          h3: "Education and healthcare",
          content: "Engineering and polytechnic colleges, industrial training institutes and hospitals generate steady demand for UPS units, inverters and small lots of ICs and MCUs for projects."
        }
      ]
    },
    whatWeSupply: {
      h2: "What We Supply in Pithampur-Dhar",
      categories: {
        active: {
          title: "Active Components",
          items: commonActive
        },
        passives: {
          title: "Passive Components (1,700+ SKUs)",
          items: commonPassivesWithTantalumSizes
        },
        diodes: {
          title: "Diodes, LEDs and Timing (485+ Diode SKUs)",
          items: commonDiodes
        },
        connectors: {
          title: "Connectors and Electromechanical (340+ Connectors, 185+ Electromechanical)",
          items: commonConnectors
        }
      }
    },
    mosfetDistributor: {
      h2: "MOSFET Distributor in Pithampur-Dhar",
      intro: "Pithampur's MOSFET demand is industrial and documentation-minded. Auto-ancillary lines run on 12V, 24V and 48V DC stages, plants run drives and chargers around the clock, and the work is dominated by maintenance, repair and replacement on tight shutdown schedules. Dhar's farm belt adds seasonal mill and pump demand.",
      applications: [
        "12V and 24V automotive and EV auxiliary stages, such as lighting, pumps, fans, DC-DC converters and battery switches.",
        "Servo, stepper and DC motor drives on press, machining and assembly lines.",
        "Welding power sources, plating rectifiers and test power supplies used by ancillary vendors.",
        "Variable-frequency drives and soft-starters for compressor, chiller, pump and conveyor motors.",
        "Battery chargers and DC systems for forklifts, AGVs, control rooms and standby power.",
        "Inverters and UPS units for offices, hospitals, lodges, shops and homes.",
        "Repair of failed drives and power supplies, where a genuine part and the exact part number decide whether the repair holds."
      ],
      popularParts: [
        {
          partNumber: "AUIRF1404",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel automotive grade",
          ratings: "40 V | 4 mΩ max at 10 V",
          vds: "40 V",
          rdsOn: "4 mΩ",
          package: "TO-220",
          application: "12V automotive-style battery and DC stages"
        },
        {
          partNumber: "IPP200N25N3 G",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "250 V | 20 mΩ max at 10 V",
          vds: "250 V",
          rdsOn: "20 mΩ",
          package: "TO-220",
          application: "110V-class DC bus, charger and inverter stages"
        },
        {
          partNumber: "IPP60R099CP",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "600 V | 31 A | 0.099 Ω",
          vds: "600 V",
          rdsOn: "0.099 Ω",
          id: "31 A",
          package: "TO-220",
          application: "Mains-side welding, SMPS and drive stages"
        },
        {
          partNumber: "IPW60R045CP",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "600 V | 60 A | 0.045 Ω",
          vds: "600 V",
          rdsOn: "0.045 Ω",
          id: "60 A",
          package: "TO-247",
          application: "Higher-power three-phase-derived drive, welding and inverter stages"
        },
        {
          partNumber: "FDP2532",
          manufacturer: "ON Semiconductor",
          brand: "ON Semi",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "150 V | 16 mΩ",
          vds: "150 V",
          rdsOn: "16 mΩ",
          package: "TO-220",
          application: "72V to 110V DC bus, forklift charger and drive stages"
        },
        {
          partNumber: "SUD50P06-15",
          manufacturer: "Vishay",
          brand: "Vishay",
          channel: "P-channel",
          polarity: "P-channel",
          ratings: "-60 V | 15 mΩ at -10 V",
          vds: "-60 V",
          rdsOn: "15 mΩ",
          package: "TO-252 (DPAK)",
          application: "Reverse-polarity protection and high-side switching on 24V systems"
        },
        {
          partNumber: "NTR4003N",
          manufacturer: "ON Semiconductor",
          brand: "ON Semi",
          channel: "N-channel small-signal",
          polarity: "N-channel small-signal",
          ratings: "30 V | a few hundred mA | ~1 Ω",
          vds: "30 V",
          package: "SOT-23",
          application: "Level shifting and signal switching on controller boards"
        }
      ],
      howToPick: {
        title: "How to Pick a MOSFET for Auto-Ancillary Lines and Plant Utilities",
        tips: [
          "Voltage: automotive and battery systems see charging, load-dump and inductive spikes well above nominal, so a 12V system commonly uses 40V to 60V parts, a 24V system 60V parts, a 48V or 72V system 100V to 150V parts, and a 110V DC system 150V to 250V parts. A rectified 230V supply gives about 325V DC, and a 415V three-phase supply gives about 560V DC, so 600V and higher parts are common in drive and welding stages.",
          "Qualification: automotive customers may require specific qualified part grades. Your design and quality teams decide what your product needs, and we help you check the part and its documentation.",
          "Heat: press shops, plating rooms, compressor halls and summer panels are hot, so derate generously and use a real heatsink with a good thermal pad.",
          "Vibration: presses, forklifts and vehicles shake, so choose reliable connectors and locking terminals as well as the right MOSFET.",
          "Surge protection: heavy switching loads and long cable runs produce spikes, so add TVS diodes and snubbers.",
          "Gate drive: make sure the driver supplies enough gate voltage and current, and add a gate resistor and a pull-down.",
          "Find the cause of a failure: when replacing a failed MOSFET in a drive, check the gate driver, snubber, supply, cooling and wiring, or the new part will fail too."
        ]
      }
    },
    mosfetCalculator: {
      h2: "MOSFET Thermal and Power Loss Calculator",
      defaultPart: "AUIRF1404",
      defaultIrms: 20,
      defaultRdsOn: 4,
      defaultTa: 42,
      defaultThetaJa: 62,
      workedExample: "Worked Example (AUIRF1404): AUIRF1404 in a 12V DC stage. R_DS(on) 4 mΩ, T_A 42°C (a warm enclosure), θ_JA 62°C/W (TO-220, free air). At 20 A: P_cond = 20 x 20 x 0.004 = 1.6 W. Temp rise = 99.2°C. T_J = 141.2°C (Safe, with modest headroom). At 30 A: P_cond = 30 x 30 x 0.004 = 3.6 W. Temp rise = 223.2°C. T_J = 265.2°C (Warning). Heat grows with the square of the current, so a 50% increase in current more than doubles the loss. A heatsink lowers thermal resistance and provides real safety margin.",
      disclaimer: "Disclaimer: this is a quick estimate. Real designs also include switching loss, duty cycle, PCB cooling and the rise of R_DS(on) with temperature. Check the datasheet."
    },
    qualityCompliance: {
      h2: "Supply for Audited Suppliers, Plants and Campus Teams",
      points: [
        "Certificate of Conformance with genuine parts",
        "ISO 9001:2015 certified quality management",
        "ANSI/ESD S20.20 compliant handling, which protects static-sensitive MOSFETs and ICs",
        "RoHS and REACH compliance verification",
        "Low MOQ, so a small vendor can buy what the next job needs and a design team can buy ten pieces to validate a board",
        "Buffer stock under rolling forecasts: share a forecast and we plan stock with you, which helps most for buyers who work to delivery windows, before planned shutdowns and for buyers far from Mumbai",
        "Cross-referencing support when a part goes on allocation or end-of-life, which is common with older drives and test supplies",
        "Wide-temperature SMD resistors (-55°C to +155°C) and tantalum capacitors in case sizes A to D for compact, high-reliability designs",
        "Vendor registration support: our registered address is B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034. Tell us which documents your process needs.",
        "One quote for the whole BOM or spares list: MOSFETs, ICs, diodes, capacitors, relays and connectors",
        "Your design team decides what your product needs. We supply genuine parts with the paperwork to support it."
      ],
      registeredAddressNote: "Serving Pithampur's automotive Tier-1/2 lines and Dhar's agro-processing plants. Registered address: B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034. Central dispatch: 401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007."
    },
    serviceAreas: {
      h2: "Pithampur-Dhar Areas We Serve",
      areas: "Pithampur (Sectors I, II and III), Sagore, Dhar town, Badnawar, Sardarpur, Manawar, Kukshi, Dhamnod, Mandu, Bagh, Tirla, Mhow, Sanwer, Indore border areas, Khargone border areas, Jhabua border areas and the wider Dhar-Malwa region. Tell us your location in the RFQ and we confirm dispatch details in the quote."
    },
    howToOrder: {
      h2: "How to Order from Pithampur-Dhar",
      steps: [
        "Send your BOM, part numbers or spares list by WhatsApp, email or the quote form. A photo of the board or part markings also helps.",
        "We reply within 24 hours with pricing, availability and traceability.",
        "We confirm dispatch for your Pithampur or Dhar location. Mention your delivery window in your message.",
        "Your order ships from Mumbai with GST invoice and CoC.",
        "For repeat parts, share a forecast so we can plan stock."
      ]
    },
    contactInfo: contactInfoBlock,
    faqs: [
      {
        q: "Do you have an office in Pithampur or Dhar?",
        a: "No. We dispatch from our Lamington Road office in Mumbai to Pithampur-Dhar and across India. Your quote confirms the arrangement and timing for your location."
      },
      {
        q: "Will I get a GST invoice for ITC, and which tax applies?",
        a: "Yes, every B2B order carries a GST invoice. Because we are in Maharashtra and you are in Madhya Pradesh, a sale to you is an inter-state supply, so the invoice carries IGST. If you are a unit in a Special Economic Zone, tell us in the RFQ, because the treatment can differ. Confirm with your accountant, and send your GSTIN with the RFQ."
      },
      {
        q: "What is the minimum order quantity?",
        a: "We offer low MOQ flexibility, from single repair quantities to production lots. The exact MOQ is confirmed in your quote."
      },
      {
        q: "Are the components genuine and traceable?",
        a: "Yes. We source from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      },
      {
        q: "Do you supply automotive-qualified parts?",
        a: "Some manufacturer part families have automotive-grade variants. Tell us your qualification requirement in the RFQ, and we confirm what is available and what documents we can provide. Your design and quality teams decide what your product needs."
      },
      {
        q: "Which MOSFETs suit press-shop drives and forklift chargers?",
        a: "It depends on your motor power, battery or DC bus voltage and topology. 12V to 72V stages commonly use 40V to 150V parts, 110V DC stages use 150V to 250V parts, and mains-side and three-phase-derived stages use 600V and higher parts. Send your part numbers or requirements, and we confirm availability and suggest alternatives if a part is unavailable."
      }
    ],
    relatedCities: [
      { name: "Indore", slug: "/electronic-component-distributor-in-indore" },
      { name: "Dewas", slug: "/electronic-component-distributor-in-dewas" },
      { name: "Ujjain", slug: "/electronic-component-distributor-in-ujjain" },
      { name: "Ratlam", slug: "/electronic-component-distributor-in-ratlam" }
    ],
    internalLinks: [
      { text: "Indore Commercial Hub", url: "/electronic-component-distributor-in-indore" },
      { text: "Dewas Industrial Area", url: "/electronic-component-distributor-in-dewas" },
      { text: "Ujjain Malwa Region", url: "/electronic-component-distributor-in-ujjain" },
      { text: "Ratlam Western Gateway", url: "/electronic-component-distributor-in-ratlam" }
    ]
  },

  // 6. DEWAS
  {
    city: "Dewas",
    state: "Madhya Pradesh",
    slug: "/electronic-component-distributor-in-dewas",
    metaTitle: "Electronic Components & MOSFET Distributor in Dewas | Mirai Technologies",
    metaDescription: "Genuine MOSFETs, ICs, capacitors, resistors, connectors and relays for Dewas's foundry, auto-component, pharma and soybean-belt users. CoC, IGST invoice, low MOQ. Since 1999.",
    primaryKeyword: "electronic components distributor in Dewas",
    secondaryKeywords: "electronic components dealer in Dewas, MOSFET distributor in Dewas, buy electronic components Dewas, semiconductor distributor Dewas, MOSFET dealer Dewas, power MOSFET supplier Dewas, induction furnace MOSFET Dewas, foundry furnace control components, welding inverter MOSFET Dewas, VFD repair components Dewas, soybean mill drive components, solar pump controller MOSFET, electronic components Dewas industrial area, electronic components AB Road, electronic spare parts Dewas, relay supplier Dewas, electronic components with GST invoice, IRFP4137 Dewas, IRFP4568 Dewas, IPW65R037C6 Dewas",
    h1: "Electronic Components and MOSFET Distributor in Dewas: Genuine Parts for Foundry, Auto-Component and Industrial-Area Users",
    heroSub: "Foundry and induction-furnace electricians, press and machine-tool engineers, auto-component and pharma-plant technicians, pump and solar-pump installers and repair shops in Dewas get authentic MOSFETs, ICs, passives, connectors and relays from Mirai Technologies, with a Certificate of Conformance and a proper GST invoice.",
    trustBadges: [
      "Authorized distributor and stockist since 1999",
      "Certificate of Conformance on genuine parts",
      "GST invoice for Input Tax Credit",
      "Low MOQ, from repair quantities to production lots",
      "Dispatch from our Mumbai office; timing confirmed in your quote"
    ],
    heroButtons: [
      { text: "Request Instant GST Quote", action: "rfq" },
      { text: "Browse Products", link: "/products" }
    ],
    whyTrust: {
      h2: "Why Dewas Buyers Choose Mirai",
      content: [
        "Dewas sits on the Agra-Mumbai highway between Indore and Ujjain, at the foot of a twin-hilled rise, the Tekri, where the Chamunda Mata temple draws pilgrims. The city is also linked to the classical singer Kumar Gandharva, who made it his home. Its story of industry is almost as old as its story of music: a security-printing press was set up here decades ago, and a belt of foundries, machine shops and engineering units grew up around the industrial area.",
        "Buyers in Dewas run small and mid-size plants that make castings, machine parts and components for larger customers in Indore, Pithampur and beyond. A furnace that stops or a press line that trips holds up a delivery, and the suppliers are audited by the customers they serve. A counterfeit part that fails in a week is the most expensive kind of saving. Mirai Technologies has supplied active and passive components since 1999 from Lamington Road, Mumbai. We source from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      ]
    },
    landscape: {
      h2: "The Dewas Industrial Picture",
      items: [
        {
          h3: "Dewas industrial area",
          content: "The main estate and the clusters along the Agra-Mumbai road, with foundries, machine shops, fabricators, plastics, packaging, pharma, FMCG and engineering units, and the electrical and repair trade that supports them."
        },
        {
          h3: "Foundries and castings",
          content: "Induction and cupola furnaces, moulding and fettling shops and the machining units that finish castings run on heavy current, with furnace controls, melting panels and hoists."
        },
        {
          h3: "Auto-component and tractor-parts suppliers",
          content: "Pressing, forging, machining and assembly units supply vehicle and tractor makers in the Malwa belt, and use servo and DC drives, welding power sources and test supplies."
        },
        {
          h3: "Pharma, FMCG and packaging",
          content: "Production blocks, packing lines and utilities run drives, compressors and control panels."
        },
        {
          h3: "Soybean and agri processing",
          content: "The Malwa plateau grows soybean, wheat and gram, and oil, dal and flour mills in Dewas district run expellers, cleaners, graders and conveyors on large motors and drives."
        },
        {
          h3: "Irrigation and pumping",
          content: "Borewell pump sets and canal-fed farms around Dewas, Sonkatch, Bagli and Khategaon keep a large repair and VFD trade busy, and solar pumps are growing."
        },
        {
          h3: "Trade and logistics",
          content: "The highway brings warehouses, fuel stations, hotels and transport workshops that use inverters, UPS units and lighting."
        },
        {
          h3: "Education and healthcare",
          content: "Engineering and polytechnic colleges, industrial training institutes and hospitals generate steady demand for UPS units, inverters and small lots of ICs and MCUs for projects."
        }
      ]
    },
    whatWeSupply: {
      h2: "What We Supply in Dewas",
      categories: {
        active: {
          title: "Active Components",
          items: commonActive
        },
        passives: {
          title: "Passive Components (1,700+ SKUs)",
          items: commonPassives
        },
        diodes: {
          title: "Diodes, LEDs and Timing (485+ Diode SKUs)",
          items: commonDiodes
        },
        connectors: {
          title: "Connectors and Electromechanical (340+ Connectors, 185+ Electromechanical)",
          items: commonConnectors
        }
      }
    },
    mosfetDistributor: {
      h2: "MOSFET Distributor in Dewas",
      intro: "Dewas's MOSFET demand is hot, heavy and repair-led. Induction furnaces and welders stress the power stage, press and machine-tool drives run long shifts, and hot Malwa summers and dust shorten the life of anything that is not well cooled, so replacement and repair never stop.",
      applications: [
        "Induction melting and heating stages in foundries and forging units.",
        "Welding inverters and cutting power sources in fabrication and component shops.",
        "Servo, stepper and DC motor drives on CNC, press and assembly machines.",
        "Variable-frequency drives and soft-starters for soybean, dal and flour-mill motors, and compressor and pump motors.",
        "Pump controllers and VFD stages for borewell pump sets, and solar-pump controllers.",
        "Inverters, UPS units and battery chargers for shops, hospitals, hotels and homes.",
        "Repair of failed drives and mains-side power supplies, where a genuine part and the exact part number decide whether the repair holds."
      ],
      popularParts: [
        {
          partNumber: "IRFP4137",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "300 V | 38 A | 69 mΩ max at 10 V",
          vds: "300 V",
          rdsOn: "69 mΩ",
          id: "38 A",
          package: "TO-247",
          application: "Induction-heating, inverter and DC bus stages"
        },
        {
          partNumber: "IRFP4568",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "150 V | 5.9 mΩ max at 10 V",
          vds: "150 V",
          rdsOn: "5.9 mΩ",
          package: "TO-247",
          application: "High-current DC bus, battery and drive stages"
        },
        {
          partNumber: "IPW65R037C6",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "650 V | 0.037 Ω",
          vds: "650 V",
          rdsOn: "0.037 Ω",
          package: "TO-247",
          application: "High-power three-phase-derived welding, drive and inverter stages"
        },
        {
          partNumber: "IPA65R150CFD",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "650 V | 0.15 Ω",
          vds: "650 V",
          rdsOn: "0.15 Ω",
          package: "TO-220FP (isolated tab)",
          application: "Mains-side SMPS and welding-auxiliary stages"
        },
        {
          partNumber: "STF18N60M2",
          manufacturer: "STMicroelectronics",
          brand: "STMicroelectronics",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "600 V | 13 A | 0.28 Ω",
          vds: "600 V",
          rdsOn: "0.28 Ω",
          id: "13 A",
          package: "TO-220FP (isolated tab)",
          application: "Mains-side power supplies and drive stages"
        },
        {
          partNumber: "IRFB3607",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "75 V | 9 mΩ max at 10 V",
          vds: "75 V",
          rdsOn: "9 mΩ",
          package: "TO-220",
          application: "24V to 48V motor, battery and DC-DC stages"
        },
        {
          partNumber: "IRF9640",
          manufacturer: "Vishay",
          brand: "Vishay",
          channel: "P-channel",
          polarity: "P-channel",
          ratings: "-200 V | -11 A | 0.5 Ω max at -10 V",
          vds: "-200 V",
          rdsOn: "0.5 Ω",
          id: "-11 A",
          package: "TO-220",
          application: "High-side switching on higher-voltage rails"
        }
      ],
      howToPick: {
        title: "How to Pick a MOSFET for Foundry, Press and Mill Stages",
        tips: [
          "Voltage: induction and welding stages see resonant and inductive spikes, so leave real margin above the DC bus and add snubbers and TVS diodes. A rectified 230V supply gives about 325V DC, and a 415V three-phase supply gives about 560V DC, so 600V and higher parts are common in drive and welding stages.",
          "Heat: foundry halls, furnace-side panels and Malwa summers are very hot, so derate generously and use a real heatsink with a good thermal pad.",
          "Dust and scale: iron dust, foundry sand and mill chaff are abrasive or conductive and clog heatsinks and fans, so use filtered, sealed enclosures and clean them regularly.",
          "Short circuits: welders and furnaces see fault conditions, so protect the gate and consider current sensing.",
          "Gate drive: make sure the driver supplies enough gate voltage and current, and add a gate resistor and a pull-down.",
          "Find the cause of a failure: when replacing a failed MOSFET, check the gate driver, snubber, supply and cooling, or the new part will fail too."
        ]
      }
    },
    mosfetCalculator: {
      h2: "MOSFET Thermal and Power Loss Calculator",
      defaultPart: "IRFP4137",
      defaultIrms: 4,
      defaultRdsOn: 69,
      defaultTa: 45,
      defaultThetaJa: 40,
      workedExample: "Worked Example (IRFP4137): IRFP4137 in an induction-heating stage. R_DS(on) 69 mΩ, T_A 45°C (a hot foundry-side panel), θ_JA 40°C/W (TO-247, free air). At 4 A: P_cond = 4 x 4 x 0.069 = 1.1 W. Temp rise = 44.2°C. T_J = 89.2°C (Safe). At 8 A: P_cond = 8 x 8 x 0.069 = 4.42 W. Temp rise = 176.6°C. T_J = 221.6°C (Warning). Heat grows with the square of the current, so doubling the current quadruples the loss. A heatsink lowers thermal resistance and gives real safety margin.",
      disclaimer: "Disclaimer: this is a quick estimate. Real designs also include switching loss, duty cycle, PCB cooling and the rise of R_DS(on) with temperature. Check the datasheet."
    },
    qualityCompliance: {
      h2: "Supply for Foundries, Component Makers and Campus Teams",
      points: [
        "Certificate of Conformance with genuine parts",
        "ISO 9001:2015 certified quality management",
        "ANSI/ESD S20.20 compliant handling, which protects static-sensitive MOSFETs and ICs",
        "RoHS and REACH compliance verification",
        "Low MOQ, so a small shop can buy what the next job needs and a student team can buy a handful of pieces",
        "Buffer stock under rolling forecasts: share a forecast and we plan stock with you, which helps most before the soybean season and for buyers far from Mumbai",
        "Cross-referencing support when a part goes on allocation or end-of-life, which is common with older welders and drives",
        "Wide-temperature SMD resistors (-55°C to +155°C) and tantalum capacitors in case sizes A to D for compact, high-reliability designs",
        "One quote for the whole BOM or repair list: MOSFETs, diodes, capacitors, relays and terminals",
        "Your design team decides what your product needs. We supply genuine parts with the paperwork to support it."
      ],
      registeredAddressNote: "Supply partner for foundries, pressing plants and soybean solvent extraction plants. Registered office: B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034. Central dispatch: 401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007."
    },
    serviceAreas: {
      h2: "Dewas Areas We Serve",
      areas: "Dewas city, Dewas industrial area, AB Road belt, Sonkatch, Bagli, Khategaon, Kannod, Tonk Khurd, Satwas, Hatpipliya, Bhopal road belt, Indore border areas, Ujjain border areas, Sehore border areas and the wider Dewas region. Tell us your location in the RFQ and we confirm dispatch details in the quote."
    },
    howToOrder: {
      h2: "How to Order from Dewas",
      steps: [
        "Send your BOM, part numbers or repair list by WhatsApp, email or the quote form. A photo of the board or part markings also helps.",
        "We reply within 24 hours with pricing, availability and traceability.",
        "We confirm dispatch for your Dewas location.",
        "Your order ships from Mumbai with GST invoice and CoC.",
        "For repeat parts, share a forecast so we can plan stock."
      ]
    },
    contactInfo: contactInfoBlock,
    faqs: [
      {
        q: "Do you have a Dewas office?",
        a: "No. We dispatch from our Lamington Road office in Mumbai to Dewas and across India. Your quote confirms the arrangement and timing for your location."
      },
      {
        q: "Will I get a GST invoice for ITC, and which tax applies?",
        a: "Yes, every B2B order carries a GST invoice. Because we are in Maharashtra and you are in Madhya Pradesh, a sale to you is an inter-state supply, so the invoice carries IGST. Confirm treatment with your accountant, and send your GSTIN with the RFQ."
      },
      {
        q: "What is the minimum order quantity?",
        a: "We offer low MOQ flexibility, from single repair quantities to production lots. The exact MOQ is confirmed in your quote."
      },
      {
        q: "Are the components genuine and traceable?",
        a: "Yes. We source from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      },
      {
        q: "Which MOSFETs suit induction furnaces and welding inverters?",
        a: "It depends on your topology, voltage and current. Induction and welding stages commonly use 300V to 650V N-channel parts in TO-247 packages, and battery or DC-bus stages use 75V to 150V parts. Send your part numbers or requirements, and we confirm availability and suggest alternatives if a part is unavailable."
      },
      {
        q: "Can you help if a part from an older drive or welder is discontinued?",
        a: "Yes. Send the part number and a photo of the board if possible, and our team suggests cross-referenced alternatives."
      }
    ],
    relatedCities: [
      { name: "Indore", slug: "/electronic-component-distributor-in-indore" },
      { name: "Ujjain", slug: "/electronic-component-distributor-in-ujjain" },
      { name: "Pithampur-Dhar", slug: "/electronic-component-distributor-in-pithampur-dhar" },
      { name: "Bhopal", slug: "/electronic-component-distributor-in-bhopal" }
    ],
    internalLinks: [
      { text: "Indore Commercial Hub", url: "/electronic-component-distributor-in-indore" },
      { text: "Ujjain Malwa Region", url: "/electronic-component-distributor-in-ujjain" },
      { text: "Pithampur Automotive Cluster", url: "/electronic-component-distributor-in-pithampur-dhar" },
      { text: "Bhopal Industrial Hub", url: "/electronic-component-distributor-in-bhopal" }
    ]
  },

  // 7. SAGAR
  {
    city: "Sagar",
    state: "Madhya Pradesh",
    slug: "/electronic-component-distributor-in-sagar",
    metaTitle: "Electronic Components & MOSFET Distributor in Sagar | Mirai Technologies",
    metaDescription: "Genuine MOSFETs, ICs, capacitors, resistors, connectors and relays for Sagar's campus, Bina refinery-belt, rail and Bundelkhand pump users. CoC, IGST invoice, low MOQ. Since 1999.",
    primaryKeyword: "electronic components distributor in Sagar",
    secondaryKeywords: "electronic components dealer in Sagar, MOSFET distributor in Sagar, buy electronic components Sagar MP, electronic components distributor Saugor, semiconductor distributor Sagar, MOSFET dealer Sagar, power MOSFET supplier Sagar, solar pump controller MOSFET Sagar, pump VFD repair components, railway battery charger components, DC charger MOSFET Sagar, inverter MOSFET Sagar, electronic components Bina, electronic components near Dr Harisingh Gour University, electronic spare parts Sagar, relay supplier Sagar, electronic components with GST invoice, IRFB3307 Sagar, IPP320N20N3 Sagar, STP10NK80Z Sagar",
    h1: "Electronic Components and MOSFET Distributor in Sagar (Saugor): Genuine Parts for Bina, Rail-Side, Campus and Bundelkhand Pump Users",
    heroSub: "Process-plant and refinery-belt contractors, rail-side battery and DC-system technicians, pump and solar-pump installers, campus research teams, hospital technicians and repair shops in Sagar and Bina get authentic MOSFETs, ICs, passives, connectors and relays from Mirai Technologies, with a Certificate of Conformance and a proper GST invoice.",
    trustBadges: [
      "Authorized distributor and stockist since 1999",
      "Certificate of Conformance on genuine parts",
      "GST invoice for Input Tax Credit",
      "Low MOQ, from repair quantities to production lots",
      "Dispatch from our Mumbai office; timing confirmed in your quote"
    ],
    heroButtons: [
      { text: "Request Instant GST Quote", action: "rfq" },
      { text: "Browse Products", link: "/products" }
    ],
    whyTrust: {
      h2: "Why Sagar Buyers Choose Mirai",
      content: [
        "Sagar is a hill-and-lake city in the Bundelkhand region of central Madhya Pradesh. It is built around a large lake that gives the town its name, and the old fort on its edge, the nearby Eran archaeological site and the Rahatgarh waterfall add to its history. It is also a city of learning, with a central university and medical and engineering colleges that draw students from across the region.",
        "For industry and infrastructure, Sagar district has a very different side. The town of Bina has a major refinery and petrochemical complex and a power plant, and a busy railway junction. Between them sits a dry, drought-prone farm belt where borewells and solar pumps are a lifeline, and where long power cuts are routine. Equipment works hard here, the nearest service centre can be a long way off, and a counterfeit part that fails in a week is the most expensive kind of saving. Mirai Technologies has supplied active and passive components since 1999 from Lamington Road, Mumbai. We source from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      ]
    },
    landscape: {
      h2: "The Sagar Industrial Picture",
      items: [
        {
          h3: "Bina refinery and power belt",
          content: "The refinery, petrochemical and power facilities near Bina run continuous process units, with pumps, compressors, blowers and utility systems, and control rooms that depend on DC systems and UPS power. The contractors and vendors around the plants supply and repair drives, chargers and instrumentation."
        },
        {
          h3: "Railways",
          content: "Bina is a significant junction, and Sagar has its own station. Rail work uses battery chargers and DC auxiliary supplies, lighting, cranes and signalling-related electronics, and contractors around the railway supply and repair these systems."
        },
        {
          h3: "Irrigation and pumping",
          content: "With limited surface water in parts of Bundelkhand, borewell pump sets are essential across the district, and solar pumps are growing fast. A large repair and VFD trade keeps them running."
        },
        {
          h3: "Agri processing",
          content: "Wheat, gram, soybean and pulses grow in the district, and flour mills, dal mills and oil units run on large motors, conveyors and dryers."
        },
        {
          h3: "Small industry and workshops",
          content: "Sagar's industrial area and the town's workshops build and repair machinery, steel furniture, electrical equipment and consumer goods, and run a busy repair trade."
        },
        {
          h3: "Cantonment and institutions",
          content: "A military cantonment and training establishment, a police training institution and other government bodies support a vendor base used to documented, traceable supply."
        },
        {
          h3: "Education and healthcare",
          content: "Dr. Harisingh Gour Vishwavidyalaya, a medical college, engineering colleges and hospitals generate steady demand for UPS units, inverters and small lots of ICs, MCUs and MOSFETs for projects."
        },
        {
          h3: "Trade and homes",
          content: "Markets, shops and townships use inverters, UPS units and LED lighting, and long outages keep demand steady."
        }
      ]
    },
    whatWeSupply: {
      h2: "What We Supply in Sagar",
      categories: {
        active: {
          title: "Active Components",
          items: commonActive
        },
        passives: {
          title: "Passive Components (1,700+ SKUs)",
          items: commonPassivesWithTantalumSizes
        },
        diodes: {
          title: "Diodes, LEDs and Timing (485+ Diode SKUs)",
          items: commonDiodes
        },
        connectors: {
          title: "Connectors and Electromechanical (340+ Connectors, 185+ Electromechanical)",
          items: commonConnectors
        }
      }
    },
    mosfetDistributor: {
      h2: "MOSFET Distributor in Sagar",
      intro: "Sagar's MOSFET demand is about keeping things running through long outages and dry seasons. Pump sets and solar pumps work on panels and batteries far from help, plant and rail-side DC systems run around the clock, and a lot of work goes into inverters, chargers and drives that have to come back fast.",
      applications: [
        "Pump controllers and VFD stages for borewell pump sets, and solar-pump controllers with MPPT.",
        "Variable-frequency drives and soft-starters for flour-mill, dal-mill, oil-mill and conveyor motors.",
        "Battery chargers and DC systems for rail-side sheds, plant control rooms and standby power, commonly on 24V, 48V, 72V and 110V.",
        "Compressor, pump and blower drives in process plants and utility rooms.",
        "Inverters, UPS units and battery chargers for hospitals, colleges, shops and homes, where long outages are common.",
        "Student and lab builds at the university and colleges, including motor drivers, converters and robotics.",
        "Repair of failed drives and power supplies, where a genuine part and the exact part number decide whether the repair holds."
      ],
      popularParts: [
        {
          partNumber: "IRFB3307",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "75 V | 6.3 mΩ max at 10 V",
          vds: "75 V",
          rdsOn: "6.3 mΩ",
          package: "TO-220",
          application: "24V to 48V battery, inverter and solar-controller stages"
        },
        {
          partNumber: "IPP320N20N3 G",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "200 V | 32 mΩ max at 10 V",
          vds: "200 V",
          rdsOn: "32 mΩ",
          package: "TO-220",
          application: "110V-class DC bus, charger and inverter stages"
        },
        {
          partNumber: "STP10NK80Z",
          manufacturer: "STMicroelectronics",
          brand: "STMicroelectronics",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "800 V | 9 A | 0.78 Ω max at 10 V",
          vds: "800 V",
          rdsOn: "0.78 Ω",
          id: "9 A",
          package: "TO-220",
          application: "High-voltage off-line supplies and three-phase-derived auxiliary stages"
        },
        {
          partNumber: "IPW60R160P6",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "600 V | 24 A | 0.16 Ω",
          vds: "600 V",
          rdsOn: "0.16 Ω",
          id: "24 A",
          package: "TO-247",
          application: "Mains-side drive, SMPS and inverter stages"
        },
        {
          partNumber: "IRL1404",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel logic level",
          polarity: "N-channel logic level",
          ratings: "40 V | 4 mΩ max at 10 V",
          vds: "40 V",
          rdsOn: "4 mΩ",
          package: "TO-220",
          application: "12V stages driven from low-voltage logic"
        },
        {
          partNumber: "FQP22P10",
          manufacturer: "ON Semiconductor",
          brand: "ON Semi",
          channel: "P-channel",
          polarity: "P-channel",
          ratings: "-100 V | -22 A | 0.125 Ω max at -10 V",
          vds: "-100 V",
          rdsOn: "0.125 Ω",
          id: "-22 A",
          package: "TO-220",
          application: "High-side switching and reverse-polarity protection on battery systems"
        },
        {
          partNumber: "Si2333CDS",
          manufacturer: "Vishay",
          brand: "Vishay",
          channel: "P-channel small-signal",
          polarity: "P-channel small-signal",
          ratings: "-12 V | a few amperes | a few tens of mΩ",
          vds: "-12 V",
          package: "SOT-23",
          application: "Compact battery load switches on controller boards"
        }
      ],
      howToPick: {
        title: "How to Pick a MOSFET for Pump Controllers, Solar Systems and DC Chargers",
        tips: [
          "Voltage: a solar panel's open-circuit voltage is higher than its operating voltage, and cold mornings raise it further, so leave real margin above the highest voltage the array can reach. Batteries charge above their nominal voltage and inductive loads add spikes, so a 12V system commonly uses 40V to 60V parts, a 24V system 60V parts, a 48V or 72V system 100V to 150V parts and a 110V DC system 150V to 250V parts. A rectified 230V supply gives about 325V DC, so 600V and higher parts are common on the mains side.",
          "Heat: Bundelkhand summers push ambient temperatures into the mid-40s °C, and sealed boxes and rooftop controllers run hotter. Derate generously, use a real heatsink with a good thermal pad, and leave room for airflow.",
          "Remote installation: a part that fails in a field panel is a long way from help, so choose parts with real margin and keep a spare in the toolbox.",
          "Surge and lightning: long cable runs to pumps and panels and monsoon thunderstorms produce spikes, so add TVS diodes and gate protection.",
          "Hazardous areas: equipment used in classified areas of a plant must meet the applicable standards and certification. The MOSFET choice is only one part of that, and your safety team decides what is required.",
          "Gate drive: make sure the driver supplies enough gate voltage and current, and add a gate resistor and a pull-down.",
          "Find the cause of a failure: when replacing a failed MOSFET, check the gate driver, snubber, supply, cooling and any moisture or dust damage, or the new part will fail too."
        ]
      }
    },
    mosfetCalculator: {
      h2: "MOSFET Thermal and Power Loss Calculator",
      defaultPart: "IRFB3307",
      defaultIrms: 15,
      defaultRdsOn: 6.3,
      defaultTa: 40,
      defaultThetaJa: 62,
      workedExample: "Worked Example (IRFB3307): IRFB3307 in a solar-pump controller. R_DS(on) 6.3 mΩ, T_A 40°C, θ_JA 62°C/W (TO-220, free air). At 15 A: P_cond = 15 x 15 x 0.0063 = 1.42 W. Temp rise = 87.9°C. T_J = 127.9°C (Safe, with modest headroom). At 25 A: P_cond = 25 x 25 x 0.0063 = 3.94 W. Temp rise = 244.1°C. T_J = 284.1°C (Warning). Heat grows with the square of the current, so a 67% increase in current nearly triples the loss. A heatsink lowers the thermal resistance and provides real safety margin.",
      disclaimer: "Disclaimer: this is a quick estimate. Real designs also include switching loss, duty cycle, PCB cooling and the rise of R_DS(on) with temperature. Check the datasheet."
    },
    qualityCompliance: {
      h2: "Supply for Plant Vendors, Installers and Campus Teams",
      points: [
        "Certificate of Conformance with genuine parts",
        "ISO 9001:2015 certified quality management",
        "ANSI/ESD S20.20 compliant handling, which protects static-sensitive MOSFETs and ICs",
        "RoHS and REACH compliance verification",
        "Low MOQ, so a small installer can buy what the next job needs and a student team can buy a handful of pieces",
        "Buffer stock under rolling forecasts: share a forecast and we plan stock with you, which helps most before the sowing and irrigation seasons, before planned shutdowns and for buyers far from Mumbai",
        "Cross-referencing support when a part goes on allocation or end-of-life, which is common with older drives and chargers",
        "Wide-temperature SMD resistors (-55°C to +155°C) and tantalum capacitors in case sizes A to D for compact, high-reliability designs",
        "We have supplied defence units since 1999. Tell us which documents your vendor process needs.",
        "One quote for the whole BOM or repair list: MOSFETs, diodes, capacitors, relays and terminals",
        "Institutions should share billing details and purchase-order requirements with the RFQ so the invoice is right the first time. Your design team decides what your product needs. We supply genuine parts with the paperwork to support it."
      ],
      registeredAddressNote: "Supplying Bina refinery vendors, agricultural pump installers, and university laboratories. Registered address: B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034. Central dispatch: 401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007."
    },
    serviceAreas: {
      h2: "Sagar Areas We Serve",
      areas: "Sagar city, Makronia, Bina, Khurai, Rehli, Garhakota, Deori, Banda, Shahgarh, Kesli, Malthone, Rahatgarh, Bandri, Jaisinagar, Damoh border areas, Vidisha border areas, Tikamgarh and Chhatarpur border areas, Jabalpur border areas, Bhopal border areas and the wider Sagar and Bundelkhand region. Tell us your location in the RFQ and we confirm dispatch details in the quote."
    },
    howToOrder: {
      h2: "How to Order from Sagar",
      steps: [
        "Send your BOM, part numbers or repair list by WhatsApp, email or the quote form. A photo of the board or part markings also helps.",
        "We reply within 24 hours with pricing, availability and traceability.",
        "We confirm dispatch for your Sagar or Bina location.",
        "Your order ships from Mumbai with GST invoice and CoC.",
        "For repeat parts, share a forecast so we can plan stock."
      ]
    },
    contactInfo: contactInfoBlock,
    faqs: [
      {
        q: "Do you have a Sagar office?",
        a: "No. We dispatch from our Lamington Road office in Mumbai to Sagar and across India. Your quote confirms the arrangement and timing for your location."
      },
      {
        q: "Will I get a GST invoice for ITC, and which tax applies?",
        a: "Yes, every B2B order carries a GST invoice. Because we are in Maharashtra and you are in Madhya Pradesh, a sale to you is an inter-state supply, so the invoice carries IGST. Confirm treatment with your accountant, and send your GSTIN with the RFQ."
      },
      {
        q: "What is the minimum order quantity?",
        a: "We offer low MOQ flexibility, from single repair quantities to production lots. The exact MOQ is confirmed in your quote."
      },
      {
        q: "Are the components genuine and traceable?",
        a: "Yes. We source from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      },
      {
        q: "Which MOSFETs suit solar-pump controllers and rail-side DC chargers?",
        a: "It depends on your panel or battery voltage, current and topology. 12V to 72V battery stages commonly use 40V to 150V parts, 110V DC stages use 150V to 250V parts, and mains-side stages use 600V and higher parts. Send your part numbers or requirements, and we confirm availability and suggest alternatives if a part is unavailable."
      },
      {
        q: "Can you help if a part from an older drive or charger is discontinued?",
        a: "Yes. Send the part number and a photo of the board if possible, and our team suggests cross-referenced alternatives."
      }
    ],
    relatedCities: [
      { name: "Jabalpur", slug: "/electronic-component-distributor-in-jabalpur" },
      { name: "Bhopal", slug: "/electronic-component-distributor-in-bhopal" },
      { name: "Satna", slug: "/electronic-component-distributor-in-satna" },
      { name: "Gwalior", slug: "/electronic-component-distributor-in-gwalior" }
    ],
    internalLinks: [
      { text: "Jabalpur Sanskardhani Hub", url: "/electronic-component-distributor-in-jabalpur" },
      { text: "Bhopal Capital Sector", url: "/electronic-component-distributor-in-bhopal" },
      { text: "Satna Limestone Region", url: "/electronic-component-distributor-in-satna" },
      { text: "Gwalior Northern Corridor", url: "/electronic-component-distributor-in-gwalior" }
    ]
  },

  // 8. RATLAM
  {
    city: "Ratlam",
    state: "Madhya Pradesh",
    slug: "/electronic-component-distributor-in-ratlam",
    metaTitle: "Electronic Components & MOSFET Distributor in Ratlam | Mirai Technologies",
    metaDescription: "Genuine MOSFETs, ICs, capacitors, resistors, connectors and relays for Ratlam's rail-side, food-processing, jewellery and Jaora-belt users. CoC, IGST invoice, low MOQ. Since 1999.",
    primaryKeyword: "electronic components distributor in Ratlam",
    secondaryKeywords: "electronic components dealer in Ratlam, MOSFET distributor in Ratlam, buy electronic components Ratlam, semiconductor distributor Ratlam, MOSFET dealer Ratlam, power MOSFET supplier Ratlam, railway battery charger components, DC charger MOSFET Ratlam, namkeen machine drive components, food plant VFD repair components, inverter MOSFET Ratlam, UPS MOSFET Ratlam, solar pump controller MOSFET, electronic components Jaora, electronic components Neemuch, electronic spare parts Ratlam, relay supplier Ratlam, electronic components with GST invoice, IRFB7437 Ratlam, IRFP4668 Ratlam, STW26NM60N Ratlam",
    h1: "Electronic Components and MOSFET Distributor in Ratlam: Genuine Parts for Rail-Side, Food-Plant, Jewellery and Industrial-Area Users",
    heroSub: "Rail-side battery and DC-system technicians, namkeen and food-plant electricians, jewellery-workshop owners, chemical and pharma-plant engineers, pump and solar-pump installers and repair shops in Ratlam get authentic MOSFETs, ICs, passives, connectors and relays from Mirai Technologies, with a Certificate of Conformance and a proper GST invoice.",
    trustBadges: [
      "Authorized distributor and stockist since 1999",
      "Certificate of Conformance on genuine parts",
      "GST invoice for Input Tax Credit",
      "Low MOQ, from repair quantities to production lots",
      "Dispatch from our Mumbai office; timing confirmed in your quote"
    ],
    heroButtons: [
      { text: "Request Instant GST Quote", action: "rfq" },
      { text: "Browse Products", link: "/products" }
    ],
    whyTrust: {
      h2: "Why Ratlam Buyers Choose Mirai",
      content: [
        "Ratlam sits in the far west of Madhya Pradesh, close to the borders with Rajasthan and Gujarat, on the Delhi-Mumbai railway line. People across India know it by three things: its sev, its gold and its sarees. The Mahalaxmi temple, the old palace of the former princely state and the lanes of the old bazaar give the town a character of its own, and Ratlam is also a railway division headquarters, which shapes the whole local economy.",
        "Buyers here are traders by habit and practical by nature. A jeweller, a sev maker, a chemical-unit electrician and a railway-side contractor all want the same thing: the right part, at a fair price, that will still work next season. Summers are hot and dry and the grid is often under strain, so equipment works hard, and a counterfeit part that fails in a week is the most expensive kind of saving. Mirai Technologies has supplied active and passive components since 1999 from Lamington Road, Mumbai. We source from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      ]
    },
    landscape: {
      h2: "The Ratlam Industrial Picture",
      items: [
        {
          h3: "Railways",
          content: "Ratlam is a major railway junction and division headquarters with sheds and workshops. Rail work uses battery chargers and DC auxiliary supplies, lighting, cranes and signalling-related electronics, and contractors and vendors around the railway supply and repair these systems."
        },
        {
          h3: "Food and namkeen",
          content: "Ratlam's sev and namkeen are sold well beyond the district, and the town has many small and mid-size food-processing units with fryers, mixers, extruders, conveyors, packing lines and boilers on motors, heaters and drives."
        },
        {
          h3: "Gold and jewellery",
          content: "The town has a long trade in gold and jewellery, with workshops that use polishing and buffing machines, small furnaces, ultrasonic cleaners, hallmarking-related equipment, lighting and display electronics."
        },
        {
          h3: "Chemicals and pharma",
          content: "Chemical and pharma units in the industrial areas run reactors, pumps, agitators, boilers and utility systems, with control panels and UPS and DC backup."
        },
        {
          h3: "Textile and sarees",
          content: "The sarees and textile trade uses weaving and finishing machines, humidification plants and small drives."
        },
        {
          h3: "Agri trade and processing",
          content: "The Malwa belt around Ratlam, Jaora, Sailana and Alot grows soybean, wheat, gram and garlic, and spice and garlic trade, oil mills, dal and flour mills run on large motors, conveyors and dryers, with cold storage for the produce."
        },
        {
          h3: "Irrigation and pumping",
          content: "Borewell pump sets and canal-fed farms keep a large repair and VFD trade busy, and solar pumps are growing quickly."
        },
        {
          h3: "Border trade and logistics",
          content: "The town's position between Madhya Pradesh, Rajasthan and Gujarat makes it a supply base for traders and workshops across three states, with warehouses and transport workshops that use inverters, UPS units and lighting."
        },
        {
          h3: "Education and healthcare",
          content: "A medical college, an engineering college, polytechnics and hospitals generate steady demand for UPS units, inverters and small lots of ICs and MCUs for projects."
        }
      ]
    },
    whatWeSupply: {
      h2: "What We Supply in Ratlam",
      categories: {
        active: {
          title: "Active Components",
          items: commonActive
        },
        passives: {
          title: "Passive Components (1,700+ SKUs)",
          items: commonPassivesWithTantalumSizes
        },
        diodes: {
          title: "Diodes, LEDs and Timing (485+ Diode SKUs)",
          items: commonDiodes
        },
        connectors: {
          title: "Connectors and Electromechanical (340+ Connectors, 185+ Electromechanical)",
          items: commonConnectors
        }
      }
    },
    mosfetDistributor: {
      h2: "MOSFET Distributor in Ratlam",
      intro: "Ratlam's MOSFET demand is practical and repair-led. Rail-side chargers, food-plant drives and pump sets run in a hot, dusty climate, a big trading town leans on inverters and UPS units through the grid's weak hours, and most of the work is bringing drives, chargers and inverters back fast.",
      applications: [
        "Battery chargers and DC systems for rail-side sheds, sub-stations and control rooms, commonly on 24V, 48V, 72V and 110V.",
        "Variable-frequency drives and soft-starters for food-plant, oil-mill, dal-mill and flour-mill motors.",
        "Heater and motor controllers on fryers, mixers and packing lines.",
        "Pump controllers and VFD stages for borewell pump sets, and solar-pump controllers with MPPT.",
        "Inverters, UPS units and battery chargers for shops, hospitals, hotels, showrooms and homes.",
        "Small motor drives and power supplies for polishing machines, ultrasonic cleaners and lighting in jewellery workshops.",
        "Repair of failed drives and power supplies, where a genuine part and the exact part number decide whether the repair holds."
      ],
      popularParts: [
        {
          partNumber: "IRFB7437",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "40 V | 2 mΩ max at 10 V",
          vds: "40 V",
          rdsOn: "2 mΩ",
          package: "TO-220",
          application: "12V to 24V inverter, charger and battery stages"
        },
        {
          partNumber: "IRFP4668",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "200 V | 9.7 mΩ max at 10 V",
          vds: "200 V",
          rdsOn: "9.7 mΩ",
          package: "TO-247",
          application: "110V-class DC bus, inverter and charger stages"
        },
        {
          partNumber: "IPA60R125P6",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "600 V | 0.125 Ω",
          vds: "600 V",
          rdsOn: "0.125 Ω",
          package: "TO-220FP (isolated tab)",
          application: "Mains-side SMPS, UPS and drive-auxiliary stages"
        },
        {
          partNumber: "STW26NM60N",
          manufacturer: "STMicroelectronics",
          brand: "STMicroelectronics",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "600 V | 20 A | 0.165 Ω max at 10 V",
          vds: "600 V",
          rdsOn: "0.165 Ω",
          id: "20 A",
          package: "TO-247",
          application: "Higher-power three-phase-derived drive and inverter stages"
        },
        {
          partNumber: "FQP50N06L",
          manufacturer: "ON Semiconductor",
          brand: "ON Semi",
          channel: "N-channel logic level",
          polarity: "N-channel logic level",
          ratings: "60 V | 52 A | 21 mΩ",
          vds: "60 V",
          rdsOn: "21 mΩ",
          id: "52 A",
          package: "TO-220",
          application: "12V to 24V switching driven from 5V logic"
        },
        {
          partNumber: "IRF4905",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "P-channel",
          polarity: "P-channel",
          ratings: "-55 V | 20 mΩ max at -10 V",
          vds: "-55 V",
          rdsOn: "20 mΩ",
          package: "TO-220",
          application: "Reverse-polarity protection and high-side switching on battery systems"
        },
        {
          partNumber: "NTR4501N",
          manufacturer: "ON Semiconductor",
          brand: "ON Semi",
          channel: "N-channel small-signal",
          polarity: "N-channel small-signal",
          ratings: "20 V | 3 A | ~70 mΩ",
          vds: "20 V",
          rdsOn: "70 mΩ",
          id: "3 A",
          package: "SOT-23",
          application: "Compact 3.3 V and 5 V controller boards"
        }
      ],
      howToPick: {
        title: "How to Pick a MOSFET for Rail-Side Chargers, Food Plants and Summer Inverters",
        tips: [
          "Voltage: batteries charge above their nominal voltage and inductive loads add spikes, so a 12V system commonly uses 40V to 60V parts, a 24V system 60V parts, a 48V or 72V system 100V to 150V parts and a 110V DC system 150V to 250V parts. A rectified 230V supply gives about 325V DC, and a 415V three-phase supply gives about 560V DC, so 600V and higher parts are common in drive stages.",
          "Heat: Malwa summers push ambient temperatures into the mid-40s °C, fryer halls and plant rooms run hotter, and sealed boxes more so. Derate generously, use a real heatsink with a good thermal pad, and leave room for airflow.",
          "Oil, steam and dust: food plants are greasy, steamy or dusty, so use sealed enclosures, conformal coating and quality terminal blocks, and clean heatsinks and fans regularly.",
          "Vibration: rail and vehicle equipment shakes, so choose reliable connectors and locking terminals as well as the right MOSFET.",
          "Voltage swings and surges: a strained grid and long cable runs to pumps and motors produce spikes, so add TVS diodes and gate protection.",
          "Gate drive: make sure the driver supplies enough gate voltage and current, and add a gate resistor and a pull-down.",
          "Find the cause of a failure: when replacing a failed MOSFET, check the gate driver, snubber, supply, cooling and any dust or oil build-up, or the new part will fail too."
        ]
      }
    },
    mosfetCalculator: {
      h2: "MOSFET Thermal and Power Loss Calculator",
      defaultPart: "IRFB7437",
      defaultIrms: 25,
      defaultRdsOn: 2,
      defaultTa: 44,
      defaultThetaJa: 62,
      workedExample: "Worked Example (IRFB7437): IRFB7437 in a 24V inverter stage. R_DS(on) 2 mΩ, T_A 44°C (a hot rooftop or shop enclosure in a Ratlam summer), θ_JA 62°C/W (TO-220, free air). At 25 A: P_cond = 25 x 25 x 0.002 = 1.25 W. Temp rise = 77.5°C. T_J = 121.5°C (Safe). At 40 A: P_cond = 40 x 40 x 0.002 = 3.2 W. Temp rise = 198.4°C. T_J = 242.4°C (Warning). Heat grows with the square of the current, so a 60% increase in current more than doubles the loss. A heatsink lowers thermal resistance and gives real safety margin.",
      disclaimer: "Disclaimer: this is a quick estimate. Real designs also include switching loss, duty cycle, PCB cooling and the rise of R_DS(on) with temperature. Check the datasheet."
    },
    qualityCompliance: {
      h2: "Supply for Rail-Side Vendors, Food Plants and Campus Teams",
      points: [
        "Certificate of Conformance with genuine parts",
        "ISO 9001:2015 certified quality management",
        "ANSI/ESD S20.20 compliant handling, which protects static-sensitive MOSFETs and ICs",
        "RoHS and REACH compliance verification",
        "Low MOQ, so a small workshop can buy what the next job needs and a student team can buy a handful of pieces",
        "Buffer stock under rolling forecasts: share a forecast and we plan stock with you, which helps most before festival and wedding-season demand and for buyers far from Mumbai",
        "Cross-referencing support when a part goes on allocation or end-of-life, which is common with older drives and chargers",
        "Wide-temperature SMD resistors (-55°C to +155°C) and tantalum capacitors in case sizes A to D for compact, high-reliability designs",
        "One quote for the whole BOM or repair list: MOSFETs, diodes, capacitors, relays and terminals",
        "Institutions should share billing details and purchase-order requirements with the RFQ so the invoice is right the first time. Your design team decides what your product needs. We supply genuine parts with the paperwork to support it."
      ],
      registeredAddressNote: "Component partner for railway division workshops, sev/namkeen automated lines, and tri-state border traders. Registered address: B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034. Central dispatch: 401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007."
    },
    serviceAreas: {
      h2: "Ratlam Areas We Serve",
      areas: "Ratlam city, Jaora, Alot, Sailana, Piploda, Bajna, Namli, Dhamnod, Badnawar border areas, Nimach (Neemuch), Mandsaur, Garoth, Jhabua, Petlawad, Dahod border areas (Gujarat), Banswara, Pratapgarh and Chittorgarh border areas (Rajasthan), Ujjain border areas, Dhar border areas and the wider west Malwa region. Tell us your location in the RFQ and we confirm dispatch details in the quote."
    },
    howToOrder: {
      h2: "How to Order from Ratlam",
      steps: [
        "Send your BOM, part numbers or repair list by WhatsApp, email or the quote form. A photo of the board or part markings also helps.",
        "We reply within 24 hours with pricing, availability and traceability.",
        "We confirm dispatch for your Ratlam location.",
        "Your order ships from Mumbai with GST invoice and CoC.",
        "For repeat parts, share a forecast so we can plan stock."
      ]
    },
    contactInfo: contactInfoBlock,
    faqs: [
      {
        q: "Do you have a Ratlam office?",
        a: "No. We dispatch from our Lamington Road office in Mumbai to Ratlam and across India. Your quote confirms the arrangement and timing for your location."
      },
      {
        q: "Will I get a GST invoice for ITC, and which tax applies?",
        a: "Yes, every B2B order carries a GST invoice. Because we are in Maharashtra and you are in Madhya Pradesh (or across the border in Rajasthan or Gujarat), a sale to you is an inter-state supply, so the invoice carries IGST. Confirm treatment with your accountant, and send your GSTIN with the RFQ."
      },
      {
        q: "What is the minimum order quantity?",
        a: "We offer low MOQ flexibility, from single repair quantities to production lots. The exact MOQ is confirmed in your quote."
      },
      {
        q: "Are the components genuine and traceable?",
        a: "Yes. We source from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      },
      {
        q: "Which MOSFETs suit rail-side chargers and food-plant drives?",
        a: "It depends on your battery voltage, motor power and topology. 24V to 72V battery stages commonly use 60V to 150V parts, 110V DC stages use 150V to 250V parts, and mains-side and three-phase-derived stages use 600V and higher parts. Send your part numbers or requirements, and we confirm availability and suggest alternatives if a part is unavailable."
      },
      {
        q: "Can you help if a part from an older drive or charger is discontinued?",
        a: "Yes. Send the part number and a photo of the board if possible, and our team suggests cross-referenced alternatives."
      }
    ],
    relatedCities: [
      { name: "Ujjain", slug: "/electronic-component-distributor-in-ujjain" },
      { name: "Dewas", slug: "/electronic-component-distributor-in-dewas" },
      { name: "Indore", slug: "/electronic-component-distributor-in-indore" },
      { name: "Pithampur-Dhar", slug: "/electronic-component-distributor-in-pithampur-dhar" }
    ],
    internalLinks: [
      { text: "Ujjain Regional Supply", url: "/electronic-component-distributor-in-ujjain" },
      { text: "Dewas Manufacturing Hub", url: "/electronic-component-distributor-in-dewas" },
      { text: "Indore Commercial Center", url: "/electronic-component-distributor-in-indore" },
      { text: "Pithampur Industrial Belt", url: "/electronic-component-distributor-in-pithampur-dhar" }
    ]
  },

  // 9. SATNA
  {
    city: "Satna",
    state: "Madhya Pradesh",
    slug: "/electronic-component-distributor-in-satna",
    metaTitle: "Electronic Components & MOSFET Distributor in Satna | Mirai Technologies",
    metaDescription: "Genuine MOSFETs, ICs, capacitors, resistors, connectors and relays for Satna's cement, limestone, stone-quarry and rail-side users. CoC, IGST invoice, low MOQ. Since 1999.",
    primaryKeyword: "electronic components distributor in Satna",
    secondaryKeywords: "electronic components dealer in Satna, MOSFET distributor in Satna, buy electronic components Satna, semiconductor distributor Satna, MOSFET dealer Satna, power MOSFET supplier Satna, cement plant drive components, crusher VFD repair components, DC charger MOSFET Satna, railway battery charger components, quarry pump controller components, solar pump controller MOSFET, inverter MOSFET Satna, electronic components Maihar, electronic components Rewa, electronic spare parts Satna, relay supplier Satna, electronic components with GST invoice, IRFB4310Z Satna, IRFP254N Satna, IPW60R125P6 Satna",
    h1: "Electronic Components and MOSFET Distributor in Satna: Genuine Parts for Cement-Belt, Quarry, Rail-Side and Vindhya-Region Users",
    heroSub: "Cement-plant and crusher-drive electricians, quarry and stone-unit technicians, rail-side battery and DC-system engineers, pump and solar-pump installers and repair shops in Satna and the Vindhya region get authentic MOSFETs, ICs, passives, connectors and relays from Mirai Technologies, with a Certificate of Conformance and a proper GST invoice.",
    trustBadges: [
      "Authorized distributor and stockist since 1999",
      "Certificate of Conformance on genuine parts",
      "GST invoice for Input Tax Credit",
      "Low MOQ, from repair quantities to production lots",
      "Dispatch from our Mumbai office; timing confirmed in your quote"
    ],
    heroButtons: [
      { text: "Request Instant GST Quote", action: "rfq" },
      { text: "Browse Products", link: "/products" }
    ],
    whyTrust: {
      h2: "Why Satna Buyers Choose Mirai",
      content: [
        "Satna sits in the north-east of Madhya Pradesh, in the Vindhya region, on the main railway line between Mumbai and Kolkata and close to the Uttar Pradesh border. The town is a gateway to some of the most visited places in central India. The Sharda Mata temple at Maihar draws pilgrims from across the country, Chitrakoot, associated with the Ramayana, lies just across the district line, and the ancient Bharhut stupa was found in the district.",
        "For industry, Satna means limestone and cement. The district sits on rich limestone deposits, and a cluster of large cement plants, with the quarries, crushers, kilns and packing plants that feed them, runs day and night. The same hills yield stone, dolomite and other minerals. Summers are very hot and the air is full of dust, so equipment works at the edge of its ratings, and a drive or charger that fails can hold up a whole shift. A counterfeit part that fails in a week is the most expensive kind of saving. Mirai Technologies has supplied active and passive components since 1999 from Lamington Road, Mumbai. We source from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      ]
    },
    landscape: {
      h2: "The Satna Industrial Picture",
      items: [
        {
          h3: "Cement and limestone",
          content: "The cement plants and their captive quarries run crushers, raw mills, kiln fans, cooler fans, conveyors, bag filters and packing plants on very large motors and drives. The contractors, workshops and electricians around the plants supply and repair drives, chargers, lighting and control panels."
        },
        {
          h3: "Quarrying, stone and minerals",
          content: "Limestone, dolomite and building-stone quarries and the stone crushers around them use heavy motors, drills, pumps and dust-extraction fans, often in remote, dusty sites with long cable runs."
        },
        {
          h3: "Railways and transport",
          content: "Satna is a significant railway junction, and the railway, siding and road-transport trade bring battery chargers and DC auxiliary supplies, lighting, cranes, weighbridges and workshops."
        },
        {
          h3: "Power and utilities",
          content: "The wider Vindhya region has power plants and a growing solar presence, and with them a base of electrical contractors, DC battery-system maintainers and control-panel repair shops."
        },
        {
          h3: "Small industry and workshops",
          content: "Satna's industrial area and the town's workshops fabricate steel, repair machinery and electrical equipment, and make consumer goods, with a busy repair trade."
        },
        {
          h3: "Irrigation and pumping",
          content: "Borewell pump sets and canal-fed farms around Satna, Rewa and Sidhi keep a large repair and VFD trade busy, and solar pumps are growing."
        },
        {
          h3: "Trade, tourism and hospitality",
          content: "The pilgrim and tourist traffic to Maihar and Chitrakoot supports lodges, dharamshalas and shops that use inverters, UPS units, geysers and lighting."
        },
        {
          h3: "Education and healthcare",
          content: "Government colleges, polytechnics, engineering colleges and hospitals generate steady demand for UPS units, inverters and small lots of ICs and MCUs for projects."
        }
      ]
    },
    whatWeSupply: {
      h2: "What We Supply in Satna",
      categories: {
        active: {
          title: "Active Components",
          items: commonActive
        },
        passives: {
          title: "Passive Components (1,700+ SKUs)",
          items: commonPassivesWithTantalumSizes
        },
        diodes: {
          title: "Diodes, LEDs and Timing (485+ Diode SKUs)",
          items: commonDiodes
        },
        connectors: {
          title: "Connectors and Electromechanical (340+ Connectors, 185+ Electromechanical)",
          items: commonConnectors
        }
      }
    },
    mosfetDistributor: {
      h2: "MOSFET Distributor in Satna",
      intro: "Satna's MOSFET demand is heavy, hot and repair-led. Crusher, kiln-fan and conveyor drives run on large motors for long shifts, DC systems and chargers keep control rooms, sidings and mine-side lamps alive, and dust and 45°C-plus ambient temperatures shorten the life of anything that is not well cooled. Most of the work is maintenance, repair and replacement.",
      applications: [
        "Variable-frequency drives and soft-starters for crusher, fan, mill and conveyor motors in cement and stone plants.",
        "Battery chargers and DC systems for plant control rooms, rail-side sheds and sub-stations, commonly on 24V, 48V, 72V and 110V.",
        "Pump controllers and VFD stages for quarry dewatering and borewell pump sets, and solar-pump controllers with MPPT.",
        "Welding inverters and cutting power sources in fabrication and repair shops.",
        "Inverters, UPS units and battery chargers for lodges, hospitals, shops and homes, where long outages and voltage swings are common.",
        "Industrial SMPS and power supplies for PLCs, panels and weighbridges.",
        "Repair of failed drives and chargers, where a genuine part and the exact part number decide whether the repair holds."
      ],
      popularParts: [
        {
          partNumber: "IRFB4310Z",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "100 V | 6 mΩ max at 10 V",
          vds: "100 V",
          rdsOn: "6 mΩ",
          package: "TO-220",
          application: "48V battery, charger and auxiliary DC stages"
        },
        {
          partNumber: "IRFP254N",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "250 V | 23 A | 0.125 Ω",
          vds: "250 V",
          rdsOn: "0.125 Ω",
          id: "23 A",
          package: "TO-247",
          application: "110V-class DC bus, inverter and charger stages"
        },
        {
          partNumber: "IPW60R125P6",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "600 V | 0.125 Ω",
          vds: "600 V",
          rdsOn: "0.125 Ω",
          package: "TO-247",
          application: "Mains-side drive, SMPS and inverter stages"
        },
        {
          partNumber: "STW9NK90Z",
          manufacturer: "STMicroelectronics",
          brand: "STMicroelectronics",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "900 V | 8 A | 1.1 Ω",
          vds: "900 V",
          rdsOn: "1.1 Ω",
          id: "8 A",
          package: "TO-247",
          application: "High-voltage off-line supplies and three-phase-derived auxiliary stages"
        },
        {
          partNumber: "IRL2505",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel logic level",
          polarity: "N-channel logic level",
          ratings: "55 V | 8 mΩ max at 10 V",
          vds: "55 V",
          rdsOn: "8 mΩ",
          package: "TO-220",
          application: "12V to 24V stages driven from low-voltage logic"
        },
        {
          partNumber: "FQP27P06",
          manufacturer: "ON Semiconductor",
          brand: "ON Semi",
          channel: "P-channel",
          polarity: "P-channel",
          ratings: "-60 V | -27 A | 70 mΩ max at -10 V",
          vds: "-60 V",
          rdsOn: "70 mΩ",
          id: "-27 A",
          package: "TO-220",
          application: "High-side switching and reverse-polarity protection on battery systems"
        },
        {
          partNumber: "NDS331N",
          manufacturer: "ON Semiconductor",
          brand: "ON Semi",
          channel: "N-channel small-signal logic level",
          polarity: "N-channel small-signal logic level",
          ratings: "20 V | 1.3 A | a few hundred mΩ at 4.5 V",
          vds: "20 V",
          id: "1.3 A",
          package: "SOT-23",
          application: "Compact 3.3 V and 5 V controller boards"
        }
      ],
      howToPick: {
        title: "How to Pick a MOSFET for Cement-Belt Drives, Rail-Side Chargers and Quarry Pumps",
        tips: [
          "Voltage: motor loads kick back inductive spikes, so leave real margin above the DC bus. A rectified 230V supply gives about 325V DC, and a 415V three-phase supply gives about 560V DC, so 600V and higher parts are common in drive stages. Batteries charge above their nominal voltage, so a 24V system commonly uses 60V parts, a 48V or 72V system 100V to 150V parts and a 110V DC system 150V to 250V parts.",
          "Heat: cement halls, kiln-side panels and Vindhya summers are very hot, so derate generously, use a real heatsink with a good thermal pad, and leave room for airflow.",
          "Cement and limestone dust: fine dust is abrasive and clogs heatsinks and fans, and some dusts are conductive when damp. Use filtered, sealed enclosures with clean airflow paths and clean them regularly.",
          "Remote sites: quarry and field installations are far from help, so choose parts with real margin and keep a spare in the toolbox.",
          "Hazardous and mining areas: equipment used in classified areas or underground must meet the applicable standards and certification. The MOSFET choice is only one part of that, and your safety team decides what is required.",
          "Surge protection: long cable runs to pumps, crushers and field panels produce spikes and lightning-induced surges, so add TVS diodes and gate protection.",
          "Gate drive: make sure the driver supplies enough gate voltage and current, and add a gate resistor and a pull-down.",
          "Find the cause of a failure: when replacing a failed MOSFET in a drive, check the gate driver, snubber, supply, motor, cooling and any dust build-up, or the new part will fail too."
        ]
      }
    },
    mosfetCalculator: {
      h2: "MOSFET Thermal and Power Loss Calculator",
      defaultPart: "IRFB4310Z",
      defaultIrms: 12,
      defaultRdsOn: 6,
      defaultTa: 44,
      defaultThetaJa: 62,
      workedExample: "Worked Example (IRFB4310Z): IRFB4310Z in a 48V charger stage. R_DS(on) 6 mΩ, T_A 44°C (a hot plant panel in a Satna summer), θ_JA 62°C/W (TO-220, free air). At 12 A: P_cond = 12 x 12 x 0.006 = 0.86 W. Temp rise = 53.6°C. T_J = 97.6°C (Safe). At 20 A: P_cond = 20 x 20 x 0.006 = 2.4 W. Temp rise = 148.8°C. T_J = 192.8°C (Warning). A hot ambient and the square of the current combine to remove thermal headroom. A heatsink lowers thermal resistance and provides real safety margin.",
      disclaimer: "Disclaimer: this is a quick estimate. Real designs also include switching loss, duty cycle, PCB cooling and the rise of R_DS(on) with temperature. Check the datasheet."
    },
    qualityCompliance: {
      h2: "Supply for Plants, Contractors and Campus Teams",
      points: [
        "Certificate of Conformance with genuine parts",
        "ISO 9001:2015 certified quality management",
        "ANSI/ESD S20.20 compliant handling, which protects static-sensitive MOSFETs and ICs",
        "RoHS and REACH compliance verification",
        "Low MOQ, so a small workshop can buy exactly the spares it needs and a student team can buy a handful of pieces",
        "Buffer stock under rolling forecasts: share your spares forecast and we plan stock with you, which helps most before planned shutdowns and for buyers far from Mumbai",
        "Cross-referencing support when a part goes on allocation or end-of-life, which is common with older drives and chargers",
        "Wide-temperature SMD resistors (-55°C to +155°C) and tantalum capacitors in case sizes A to D for compact, high-reliability designs",
        "Vendor registration support: our registered address is B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034. Tell us which documents your process needs.",
        "One quote for the whole spares list or BOM: MOSFETs, diodes, capacitors, relays and terminals",
        "Your design team decides what your product needs. We supply genuine parts with the paperwork to support it."
      ],
      registeredAddressNote: "Approved supplier for limestone quarries, cement manufacturing plants, and rail siding yards. Registered address: B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034. Central dispatch: 401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007."
    },
    serviceAreas: {
      h2: "Satna Areas We Serve",
      areas: "Satna city, Maihar, Amarpatan, Nagod, Raghurajnagar, Unchehra, Rampur Baghelan, Majhgawan, Sohawal, Kotar, Rewa, Sidhi, Panna, Katni border areas, Chitrakoot and Banda border areas (Uttar Pradesh), Allahabad (Prayagraj) border areas and the wider Satna and Vindhya region. Tell us your location in the RFQ and we confirm dispatch details in the quote."
    },
    howToOrder: {
      h2: "How to Order from Satna",
      steps: [
        "Send your BOM, part numbers or spares list by WhatsApp, email or the quote form. A photo of the board or part markings also helps.",
        "We reply within 24 hours with pricing, availability and traceability.",
        "We confirm dispatch for your Satna location.",
        "Your order ships from Mumbai with GST invoice and CoC.",
        "For repeat parts, share a forecast so we can plan stock."
      ]
    },
    contactInfo: contactInfoBlock,
    faqs: [
      {
        q: "Do you have a Satna office?",
        a: "No. We dispatch from our Lamington Road office in Mumbai to Satna and across India. Your quote confirms the arrangement and timing for your location."
      },
      {
        q: "Will I get a GST invoice for ITC, and which tax applies?",
        a: "Yes, every B2B order carries a GST invoice. Because we are in Maharashtra and you are in Madhya Pradesh (or across the border in Uttar Pradesh), a sale to you is an inter-state supply, so the invoice carries IGST. Confirm treatment with your accountant, and send your GSTIN with the RFQ."
      },
      {
        q: "What is the minimum order quantity?",
        a: "We offer low MOQ flexibility, from single repair quantities to production lots. The exact MOQ is confirmed in your quote."
      },
      {
        q: "Are the components genuine and traceable?",
        a: "Yes. We source from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      },
      {
        q: "Which MOSFETs suit crusher drives and 110V DC chargers?",
        a: "It depends on your battery voltage, motor power and topology. 24V stages commonly use 60V parts, 48V to 72V stages use 100V to 150V parts, 110V DC stages use 150V to 250V parts, and three-phase-derived drive stages use 600V and higher parts. Send your part numbers or requirements, and we confirm availability and suggest alternatives if a part is unavailable."
      },
      {
        q: "Can you help if a part from an older drive or charger is discontinued?",
        a: "Yes. Send the part number and a photo of the board if possible, and our team suggests cross-referenced alternatives."
      }
    ],
    relatedCities: [
      { name: "Jabalpur", slug: "/electronic-component-distributor-in-jabalpur" },
      { name: "Sagar", slug: "/electronic-component-distributor-in-sagar" },
      { name: "Bhopal", slug: "/electronic-component-distributor-in-bhopal" }
    ],
    internalLinks: [
      { text: "Jabalpur Sanskardhani Hub", url: "/electronic-component-distributor-in-jabalpur" },
      { text: "Sagar & Bina Corridor", url: "/electronic-component-distributor-in-sagar" },
      { text: "Bhopal Manufacturing Cluster", url: "/electronic-component-distributor-in-bhopal" }
    ]
  },

  // 10. UJJAIN
  {
    city: "Ujjain",
    state: "Madhya Pradesh",
    slug: "/electronic-component-distributor-in-ujjain",
    metaTitle: "Electronic Components & MOSFET Distributor in Ujjain | Mirai Technologies",
    metaDescription: "Genuine MOSFETs, ICs, capacitors, resistors, connectors and relays for Ujjain's hospitality, lighting, soybean-mill and Nagda-belt users. CoC, IGST invoice, low MOQ. Since 1999.",
    primaryKeyword: "electronic components distributor in Ujjain",
    secondaryKeywords: "electronic components dealer in Ujjain, MOSFET distributor in Ujjain, buy electronic components Ujjain, semiconductor distributor Ujjain, MOSFET dealer Ujjain, power MOSFET supplier Ujjain, LED lighting driver components, decorative lighting controller components, inverter MOSFET Ujjain, UPS MOSFET Ujjain, soybean mill drive components, VFD repair components Ujjain, solar pump controller MOSFET, electronic components Nagda, electronic components Dewas Road, electronic spare parts Ujjain, relay supplier Ujjain, electronic components with GST invoice, IRFB7545 Ujjain, IPP034NE7N3 Ujjain, IPA60R380C6 Ujjain",
    h1: "Electronic Components and MOSFET Distributor in Ujjain: Genuine Parts for Lighting, Hospitality, Soybean-Mill and Nagda-Belt Users",
    heroSub: "Festival-lighting and sound-system engineers, hotel and dharamshala electricians, soybean and flour-mill technicians, pump and solar-pump installers, campus labs and repair shops in Ujjain get authentic MOSFETs, ICs, passives, connectors and relays from Mirai Technologies, with a Certificate of Conformance and a proper GST invoice.",
    trustBadges: [
      "Authorized distributor and stockist since 1999",
      "Certificate of Conformance on genuine parts",
      "GST invoice for Input Tax Credit",
      "Low MOQ, from repair quantities to production lots",
      "Dispatch from our Mumbai office; timing confirmed in your quote"
    ],
    heroButtons: [
      { text: "Request Instant GST Quote", action: "rfq" },
      { text: "Browse Products", link: "/products" }
    ],
    whyTrust: {
      h2: "Why Ujjain Buyers Choose Mirai",
      content: [
        "Ujjain is one of India's oldest living cities, on the banks of the Shipra. It is a sacred city for millions of people. The Mahakaleshwar temple, one of the twelve Jyotirlingas, draws crowds every day, the Shipra ghats come alive at the evening aarti, and every twelve years the Simhastha Kumbh brings pilgrims in vast numbers. The city is also known for the Vedh Shala observatory, for its association with the poet Kalidasa and for Vikram University.",
        "That pattern shapes local demand. Hotels, lodges, dharamshalas, shops and food stalls serve visitors all year, and on festival days the city runs on lighting, sound and backup power at a scale few towns see. Equipment that has to work on the busiest day of the year cannot be unreliable, and a counterfeit part that fails in a week is the most expensive kind of saving. Alongside the pilgrim economy sit working mandis, soybean and flour mills and, a short drive away, the industrial town of Nagda. Mirai Technologies has supplied active and passive components since 1999 from Lamington Road, Mumbai. We source from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      ]
    },
    landscape: {
      h2: "The Ujjain Industrial Picture",
      items: [
        {
          h3: "Festival lighting, sound and event work",
          content: "Temple precincts, ghats and festival grounds use large amounts of LED lighting, decorative strings, controllers, amplifiers and generator-fed power. Electricians and event contractors build, test and repair this equipment, often against a festival date."
        },
        {
          h3: "Hotels, dharamshalas and hospitality",
          content: "Lodges, guest houses and food outlets run inverters, UPS units, geysers, pumps, lifts and lighting, and need them to work through outages and peak crowds."
        },
        {
          h3: "Soybean, flour and agri processing",
          content: "The Malwa plateau is a major soybean-growing area, and Ujjain's mandi feeds solvent-extraction and oil units, dal and flour mills, with large motors, conveyors, dryers and drives running through the season."
        },
        {
          h3: "Ujjain industrial areas",
          content: "Estates on the Indore and Dewas road sides hold engineering, plastics, packaging, food and small manufacturing units and the repair trade around them."
        },
        {
          h3: "Nagda and the Chambal belt",
          content: "Nagda, about 50 km away on the Chambal river, is an industrial town with a large fibre and chemical complex and its vendors, running continuous process equipment, pumps, compressors and boilers."
        },
        {
          h3: "Irrigation and pumping",
          content: "Borewell pump sets and canal-fed farms around Ujjain, Agar and Shajapur keep a large repair and VFD trade busy, and solar pumps are growing."
        },
        {
          h3: "Education and healthcare",
          content: "Vikram University, an engineering college, a medical college and hospitals generate steady demand for UPS units, inverters and small lots of ICs, MCUs and MOSFETs for projects."
        },
        {
          h3: "Retail and wholesale trade",
          content: "Busy markets, shops and showrooms use inverters, signage, LED lighting and cooling equipment."
        }
      ]
    },
    whatWeSupply: {
      h2: "What We Supply in Ujjain",
      categories: {
        active: {
          title: "Active Components",
          items: commonActive
        },
        passives: {
          title: "Passive Components (1,700+ SKUs)",
          items: commonPassives
        },
        diodes: {
          title: "Diodes, LEDs and Timing (485+ Diode SKUs)",
          items: commonDiodesUjjain
        },
        connectors: {
          title: "Connectors and Electromechanical (340+ Connectors, 185+ Electromechanical)",
          items: commonConnectors
        }
      }
    },
    mosfetDistributor: {
      h2: "MOSFET Distributor in Ujjain",
      intro: "Ujjain's MOSFET demand has two rhythms. The festival and hospitality side needs lighting drivers, power supplies and inverters that run flat out at peak crowds, then sit idle. The soybean, flour and pump side needs rugged drive stages that run long shifts in season. Hot summers, dust and an unsteady grid keep the repair trade busy all year.",
      applications: [
        "LED drivers, decorative-lighting controllers and power supplies for festival, temple-precinct and shop lighting.",
        "Amplifier and sound-system power stages for events and processions.",
        "Inverters, UPS units and battery chargers for hotels, dharamshalas, hospitals, shops and homes.",
        "Generator-side battery chargers and DC systems for events and standby power.",
        "Variable-frequency drives and soft-starters for soybean, flour and dal-mill motors.",
        "Pump controllers and VFD stages for borewell pump sets, and solar-pump controllers.",
        "Repair of failed drives and power supplies, where a genuine part and the exact part number decide whether the repair holds."
      ],
      popularParts: [
        {
          partNumber: "IRFB7545",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "60 V | 5.9 mΩ max at 10 V",
          vds: "60 V",
          rdsOn: "5.9 mΩ",
          package: "TO-220",
          application: "12V to 24V inverter, charger and battery stages"
        },
        {
          partNumber: "IPP034NE7N3 G",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "75 V | 3.4 mΩ max at 10 V",
          vds: "75 V",
          rdsOn: "3.4 mΩ",
          package: "TO-220",
          application: "24V to 48V battery, inverter and motor stages"
        },
        {
          partNumber: "IPA60R380C6",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "600 V | 10 A | 0.38 Ω",
          vds: "600 V",
          rdsOn: "0.38 Ω",
          id: "10 A",
          package: "TO-220FP (isolated tab)",
          application: "Mains-side LED-driver, SMPS and lighting-controller stages"
        },
        {
          partNumber: "STP13NM60N",
          manufacturer: "STMicroelectronics",
          brand: "STMicroelectronics",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "600 V | 11 A | 0.36 Ω max at 10 V",
          vds: "600 V",
          rdsOn: "0.36 Ω",
          id: "11 A",
          package: "TO-220",
          application: "Mains-side power supplies, inverter and drive-auxiliary stages"
        },
        {
          partNumber: "IRFP250N",
          manufacturer: "Infineon",
          brand: "Infineon",
          channel: "N-channel",
          polarity: "N-channel",
          ratings: "200 V | 30 A | 75 mΩ max at 10 V",
          vds: "200 V",
          rdsOn: "75 mΩ",
          id: "30 A",
          package: "TO-247",
          application: "Amplifier output, inverter and DC bus stages"
        },
        {
          partNumber: "IRF9Z14",
          manufacturer: "Vishay",
          brand: "Vishay",
          channel: "P-channel",
          polarity: "P-channel",
          ratings: "-60 V | -6.7 A | 0.5 Ω max at -10 V",
          vds: "-60 V",
          rdsOn: "0.5 Ω",
          id: "-6.7 A",
          package: "TO-220",
          application: "High-side switching and reverse-polarity protection on smaller battery loads"
        },
        {
          partNumber: "Si2343CDS",
          manufacturer: "Vishay",
          brand: "Vishay",
          channel: "P-channel small-signal",
          polarity: "P-channel small-signal",
          ratings: "-30 V | -4 A | ~50 mΩ",
          vds: "-30 V",
          rdsOn: "50 mΩ",
          id: "-4 A",
          package: "SOT-23",
          application: "Compact battery load switches on controller boards"
        }
      ],
      howToPick: {
        title: "How to Pick a MOSFET for Lighting Drivers, Inverters and Mill Drives",
        tips: [
          "Voltage: a rectified 230V supply gives about 325V DC, and spikes sit on top, so 600V parts are common on the mains side of LED drivers and power supplies. Battery stages use 40V to 100V parts, with margin for charging voltage and spikes. A 415V three-phase supply gives about 560V DC, so 600V and higher parts are common in drive stages.",
          "Peak-day reliability: festival and hospitality equipment must work on the busiest day of the year, so derate generously, protect against inrush and surges, and test under full load before the event.",
          "Heat: hot summers, sealed driver boxes and crowded generator areas eat into thermal headroom, so use a real heatsink with a good thermal pad.",
          "Dust and chaff: soybean and flour-mill dust clog heatsinks and fans and can be a fire risk near hot parts, so use filtered, sealed enclosures and clean them regularly.",
          "Humidity and monsoon damp: moisture corrodes leads, connectors and board traces, so use conformal coating and quality terminal blocks, and check for corrosion on every repair.",
          "Surge protection: generators, long cable runs and temporary wiring produce spikes, so add TVS diodes and gate protection.",
          "Gate drive: make sure the driver supplies enough gate voltage and current, and add a gate resistor and a pull-down.",
          "Find the cause of a failure: when replacing a failed MOSFET, check the gate driver, snubber, supply and cooling, or the new part will fail too."
        ]
      }
    },
    mosfetCalculator: {
      h2: "MOSFET Thermal and Power Loss Calculator",
      defaultPart: "IPA60R380C6",
      defaultIrms: 1,
      defaultRdsOn: 380,
      defaultTa: 40,
      defaultThetaJa: 65,
      workedExample: "Worked Example (IPA60R380C6): IPA60R380C6 in a festival LED-driver stage. R_DS(on) 0.38 Ω, T_A 40°C, θ_JA assumed 65°C/W (TO-220FP, free air). At 1 A: P_cond = 1 x 1 x 0.38 = 0.38 W. Temp rise = 24.7°C. T_J = 64.7°C (Safe). At 2 A: P_cond = 2 x 2 x 0.38 = 1.52 W. Temp rise = 98.8°C. T_J = 138.8°C (Safe, with modest headroom). At 3 A: P_cond = 3 x 3 x 0.38 = 3.42 W. Temp rise = 222.3°C. T_J = 262.3°C (Warning). High-voltage MOSFETs need a heatsink even at small currents because on-resistance is high and loss grows with current squared.",
      disclaimer: "Disclaimer: this is a quick estimate. Real designs also include switching loss, duty cycle, PCB cooling and the rise of R_DS(on) with temperature. Check the datasheet."
    },
    qualityCompliance: {
      h2: "Supply for Event Contractors, Mills and Campus Teams",
      points: [
        "Certificate of Conformance with genuine parts",
        "ISO 9001:2015 certified quality management",
        "ANSI/ESD S20.20 compliant handling, which protects static-sensitive MOSFETs and ICs",
        "RoHS and REACH compliance verification",
        "Low MOQ, so a small contractor can buy what the next job needs and a student team can buy a handful of pieces",
        "Buffer stock under rolling forecasts: share a forecast and we plan stock with you, which helps most before festival seasons and the soybean season, and for buyers far from Mumbai",
        "Cross-referencing support when a part goes on allocation or end-of-life, which is common with older amplifiers, drives and chargers",
        "Wide-temperature SMD resistors (-55°C to +155°C) and tantalum capacitors in case sizes A to D for compact, high-reliability designs",
        "One quote for the whole BOM or repair list: MOSFETs, diodes, capacitors, relays and terminals",
        "Institutions should share billing details and purchase-order requirements with the RFQ so the invoice is right the first time. Your design team decides what your product needs. We supply genuine parts with the paperwork to support it."
      ],
      registeredAddressNote: "Component supplier for Mahakal corridor lighting, event sound contractors, and Nagda chemical process equipment. Registered address: B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034. Central dispatch: 401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007."
    },
    serviceAreas: {
      h2: "Ujjain Areas We Serve",
      areas: "Ujjain city, Freeganj, Madhav Nagar, Nanakheda, Dewas Road, Indore Road, Agar Road, Badnagar, Mahidpur, Khachrod, Nagda, Tarana, Ghatiya, Unhel, Agar Malwa, Shajapur, Ratlam border areas, Dewas border areas, Indore border areas and the wider Malwa region. Tell us your location in the RFQ and we confirm dispatch details in the quote."
    },
    howToOrder: {
      h2: "How to Order from Ujjain",
      steps: [
        "Send your BOM, part numbers or repair list by WhatsApp, email or the quote form. A photo of the board or part markings also helps.",
        "We reply within 24 hours with pricing, availability and traceability.",
        "We confirm dispatch for your Ujjain location. Mention any event date in your message.",
        "Your order ships from Mumbai with GST invoice and CoC.",
        "For repeat parts, share a forecast so we can plan stock."
      ]
    },
    contactInfo: contactInfoBlock,
    faqs: [
      {
        q: "Do you have an Ujjain office?",
        a: "No. We dispatch from our Lamington Road office in Mumbai to Ujjain and across India. Your quote confirms the arrangement and timing for your location."
      },
      {
        q: "Will I get a GST invoice for ITC, and which tax applies?",
        a: "Yes, every B2B order carries a GST invoice. Because we are in Maharashtra and you are in Madhya Pradesh, a sale to you is an inter-state supply, so the invoice carries IGST. Confirm treatment with your accountant, and send your GSTIN with the RFQ."
      },
      {
        q: "What is the minimum order quantity?",
        a: "We offer low MOQ flexibility, from single repair quantities to production lots. The exact MOQ is confirmed in your quote."
      },
      {
        q: "Are the components genuine and traceable?",
        a: "Yes. We source from manufacturers or authorized franchise lines, and genuine parts ship with a Certificate of Conformance."
      },
      {
        q: "Can you help with a festival or event deadline?",
        a: "Send your list early and mention the date. We reply within 24 hours, and the quote confirms stock and dispatch timing. Share a forecast before a big festival season so we can plan stock with you."
      },
      {
        q: "Which MOSFETs suit LED drivers, inverters and mill drives?",
        a: "It depends on your topology, voltage and current. Mains-side stages commonly use 600V parts, battery-side stages use 40V to 100V parts, and three-phase-derived drive stages use 600V and higher parts. Send your part numbers or requirements, and we confirm availability and suggest alternatives if a part is unavailable."
      }
    ],
    relatedCities: [
      { name: "Indore", slug: "/electronic-component-distributor-in-indore" },
      { name: "Dewas", slug: "/electronic-component-distributor-in-dewas" },
      { name: "Ratlam", slug: "/electronic-component-distributor-in-ratlam" },
      { name: "Bhopal", slug: "/electronic-component-distributor-in-bhopal" }
    ],
    internalLinks: [
      { text: "Indore Commercial Hub", url: "/electronic-component-distributor-in-indore" },
      { text: "Dewas Industrial Belt", url: "/electronic-component-distributor-in-dewas" },
      { text: "Ratlam Railway & Trade Zone", url: "/electronic-component-distributor-in-ratlam" },
      { text: "Bhopal Capital Sector", url: "/electronic-component-distributor-in-bhopal" }
    ]
  }
];

export function createCitySchema(c) {
  const fullUrl = `https://miraitechnologies.net${c.slug}`;

  const localBusiness = {
    "@type": "LocalBusiness",
    "@id": `${fullUrl}#localbusiness`,
    "name": `Mirai Technologies - Electronic Components Distributor in ${c.city}`,
    "url": fullUrl,
    "telephone": "+91-93213-98188",
    "email": "sales@miraitechnologies.net",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "401, Aditya Residency, Chunabhatti Lane, Lamington Road",
      "addressLocality": "Mumbai",
      "postalCode": "400007",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "areaServed": c.serviceAreas ? c.serviceAreas.areas.split(',').map(s => s.trim()) : [c.city, "Madhya Pradesh"]
  };

  const breadcrumbs = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://miraitechnologies.net/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Locations",
        "item": "https://miraitechnologies.net/market-area"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": c.city
      }
    ]
  };

  const faqList = (c.faqs || []).map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }));

  const faqPage = {
    "@type": "FAQPage",
    "mainEntity": faqList
  };

  const productItems = (c.mosfetDistributor?.popularParts || []).map((part, idx) => ({
    "@type": "Product",
    "position": idx + 1,
    "name": `${part.partNumber} ${part.polarity || part.channel || ''} Power MOSFET`,
    "model": part.partNumber,
    "brand": {
      "@type": "Brand",
      "name": part.manufacturer || part.brand || "Manufacturer"
    },
    "description": `${part.partNumber} ${part.polarity || part.channel || ''} MOSFET in ${part.package} package (${part.ratings || ''}). Suitable for ${part.application}. Available with Certificate of Conformance from Mirai Technologies.`,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": "0.00",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Mirai Technologies"
      }
    }
  }));

  const itemList = {
    "@type": "ItemList",
    "name": `Popular Power MOSFETs Supplied in ${c.city}`,
    "itemListElement": productItems
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      localBusiness,
      breadcrumbs,
      faqPage,
      itemList
    ]
  };
}

// 1. Write to mp_cities_data.js
const mpCitiesDataPath = path.join(__dirname, 'mp_cities_data.js');
const exportContent = `export const mpCitiesData = ${JSON.stringify(mpCitiesData, null, 2)};\n`;
fs.writeFileSync(mpCitiesDataPath, exportContent, 'utf8');
console.log(`✅ Successfully generated ${mpCitiesData.length} Madhya Pradesh cities in ${mpCitiesDataPath}`);

// 2. Format and inject into cityPages.json
const cityPagesPath = path.join(__dirname, '../src/data/cityPages.json');
let cityPages = JSON.parse(fs.readFileSync(cityPagesPath, 'utf8'));

const targetSlugs = new Set(mpCitiesData.map(c => c.slug.toLowerCase()));
const targetCities = new Set(mpCitiesData.map(c => c.city.toLowerCase()));

// Remove existing MP entries if any
const filteredCityPages = cityPages.filter(p => {
  if (targetSlugs.has(p.slug.toLowerCase())) return false;
  if (targetCities.has(p.city.toLowerCase()) && p.state === 'Madhya Pradesh') return false;
  return true;
});

const formattedMpCities = mpCitiesData.map(c => ({
  ...c,
  canonicalUrl: `https://miraitechnologies.net${c.slug}`,
  hasDetailedBlueprint: true,
  schemaTypeFlags: "LocalBusiness, FAQPage, BreadcrumbList, ItemList",
  introduction: c.whyTrust?.content?.join('\n\n') || '',
  whyMirai: c.whyTrust?.content?.[0] || '',
  heroContent: c.heroSub,
  ctaText: `Send your BOM, part number list, or requirements to sales@miraitechnologies.net or WhatsApp +91 93213 98188 for fast delivery to ${c.city}.`,
  footerGeoText: `Mirai Technologies supplies authentic electronic components, power MOSFETs, ICs, and passives to OEMs, EMS, and machinery manufacturers across ${c.city} and Madhya Pradesh.`,
  schema: createCitySchema(c)
}));

const updatedCityPages = [
  ...formattedMpCities,
  ...filteredCityPages
];

fs.writeFileSync(cityPagesPath, JSON.stringify(updatedCityPages, null, 2), 'utf8');
console.log(`✅ Successfully updated cityPages.json with ${formattedMpCities.length} Madhya Pradesh cities! Total pages: ${updatedCityPages.length}`);

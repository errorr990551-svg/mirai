import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const cityPagesPath = path.join(ROOT, 'src/data/cityPages.json');
const mhDataPath = path.join(__dirname, 'mh_cities_data.js');
const kaDataPath = path.join(__dirname, 'karnataka_cities_data.js');
const tnDataPath = path.join(__dirname, 'tn_cities_data.js');
const prerenderPath = path.join(__dirname, 'prerender.mjs');

console.log('--- Applying All Document Fixes Systematically ---');

// 1. Read cityPages.json
let cityPages = JSON.parse(fs.readFileSync(cityPagesPath, 'utf8'));

// Exact MOSFET table data for 9 MH cities
const exactMhMosfetTables = {
  "Pune": [
    { partNumber: "IRF3205", manufacturer: "Infineon", polarity: "N-channel", ratings: "55 V | 8 mΩ max at 10 V", package: "TO-220", application: "Low-voltage motor drives and battery systems" },
    { partNumber: "IRFB4110", manufacturer: "Infineon", polarity: "N-channel", ratings: "100 V | 4.5 mΩ max at 10 V", package: "TO-220", application: "Higher-voltage BLDC and e-mobility controllers" },
    { partNumber: "IRF3710", manufacturer: "Infineon", polarity: "N-channel", ratings: "100 V | 23 mΩ max at 10 V", package: "TO-220", application: "General motor control and DC-DC stages" },
    { partNumber: "STP75NF75", manufacturer: "STMicroelectronics", polarity: "N-channel", ratings: "75 V | 11 mΩ max at 10 V", package: "TO-220", application: "48V to 60V motor and battery systems" },
    { partNumber: "IRLZ44N", manufacturer: "Infineon", polarity: "N-channel logic level", ratings: "55 V | 22 mΩ max at 10 V", package: "TO-220", application: "Microcontroller-driven switching at 5 V gate drive" },
    { partNumber: "IRF9540N", manufacturer: "Infineon", polarity: "P-channel", ratings: "-100 V | 117 mΩ max at -10 V", package: "TO-220", application: "High-side switching and reverse-polarity protection" },
    { partNumber: "SI2302", manufacturer: "Vishay", polarity: "N-channel logic level", ratings: "20 V | 85 mΩ max at 4.5 V", package: "SOT-23", application: "3.3 V and 5 V embedded boards" }
  ],
  "Thane": [
    { partNumber: "IRF840", manufacturer: "Vishay", polarity: "N-channel", ratings: "500 V | 0.85 Ω max at 10 V", package: "TO-220", application: "SMPS power stages and high-voltage switching" },
    { partNumber: "IRF740", manufacturer: "Vishay", polarity: "N-channel", ratings: "400 V | 0.55 Ω max at 10 V", package: "TO-220", application: "Offline power supplies and motor drives" },
    { partNumber: "IRFP460", manufacturer: "Vishay", polarity: "N-channel", ratings: "500 V | 0.27 Ω max at 10 V", package: "TO-247", application: "High-power SMPS, welding and inverters" },
    { partNumber: "IRF630", manufacturer: "Vishay", polarity: "N-channel", ratings: "200 V | 0.40 Ω max at 10 V", package: "TO-220", application: "Medium-voltage switching and solenoid drivers" },
    { partNumber: "IRFZ44N", manufacturer: "Infineon", polarity: "N-channel", ratings: "55 V | 17.5 mΩ max at 10 V", package: "TO-220", application: "General motor control and DC-DC converters" },
    { partNumber: "IRF9Z34N", manufacturer: "Infineon", polarity: "P-channel", ratings: "-55 V | 0.1 Ω max at -10 V", package: "TO-220", application: "High-side switching and reverse-polarity protection" },
    { partNumber: "SI2302", manufacturer: "Vishay", polarity: "N-channel logic level", ratings: "20 V | 85 mΩ max at 4.5 V", package: "SOT-23", application: "Compact embedded control and logic-level load switching" }
  ],
  "Navi Mumbai": [
    { partNumber: "IRF7413", manufacturer: "Infineon", polarity: "N-channel", ratings: "30 V | 11 mΩ max at 10 V", package: "SO-8", application: "Compact DC-DC conversion and laptop power rails" },
    { partNumber: "IRLR2905", manufacturer: "Infineon", polarity: "N-channel logic level", ratings: "55 V | 27 mΩ max at 10 V", package: "TO-252 (DPAK)", application: "Automotive electronics and logic-level switching" },
    { partNumber: "FDD4141", manufacturer: "onsemi", polarity: "P-channel", ratings: "-40 V | 12 mΩ at -10 V", package: "TO-252 (DPAK)", application: "Reverse battery protection and high-side load switches" },
    { partNumber: "IRF540N", manufacturer: "Infineon", polarity: "N-channel", ratings: "100 V | 44 mΩ max at 10 V", package: "TO-220", application: "Inverter stages and DC motor drives" },
    { partNumber: "IRF3205", manufacturer: "Infineon", polarity: "N-channel", ratings: "55 V | 8 mΩ max at 10 V", package: "TO-220", application: "High-current battery drives and UPS inverters" },
    { partNumber: "IRF9540N", manufacturer: "Infineon", polarity: "P-channel", ratings: "-100 V | 117 mΩ max at -10 V", package: "TO-220", application: "Industrial high-side switching" },
    { partNumber: "SI2302", manufacturer: "Vishay", polarity: "N-channel logic level", ratings: "20 V | 85 mΩ max at 4.5 V", package: "SOT-23", application: "Sub-5V logic switching on IoT sensor nodes" }
  ],
  "Nashik": [
    { partNumber: "IRFP260N", manufacturer: "Infineon", polarity: "N-channel", ratings: "200 V | 40 mΩ max at 10 V", package: "TO-247", application: "Industrial inverters and high-power motor drives" },
    { partNumber: "IRFP250N", manufacturer: "Infineon", polarity: "N-channel", ratings: "200 V | 75 mΩ max at 10 V", package: "TO-247", application: "Power supplies and audio amplifiers" },
    { partNumber: "IRF640N", manufacturer: "Infineon", polarity: "N-channel", ratings: "200 V | 150 mΩ max at 10 V", package: "TO-220", application: "Medium-power switching and motor drives" },
    { partNumber: "IRFB4110", manufacturer: "Infineon", polarity: "N-channel", ratings: "100 V | 4.5 mΩ max at 10 V", package: "TO-220", application: "High-efficiency motor drives and electric mobility" },
    { partNumber: "IRF3205", manufacturer: "Infineon", polarity: "N-channel", ratings: "55 V | 8 mΩ max at 10 V", package: "TO-220", application: "Low-voltage high-current inverters" },
    { partNumber: "IRF540N", manufacturer: "Infineon", polarity: "N-channel", ratings: "100 V | 44 mΩ max at 10 V", package: "TO-220", application: "General industrial power switching" },
    { partNumber: "IRF9540N", manufacturer: "Infineon", polarity: "P-channel", ratings: "-100 V | 117 mΩ max at -10 V", package: "TO-220", application: "High-side DC switching circuits" }
  ],
  "Chhatrapati Sambhajinagar": [
    { partNumber: "IRL540N", manufacturer: "Infineon", polarity: "N-channel logic level", ratings: "100 V | 44 mΩ max at 10 V", package: "TO-220", application: "Direct 5V microcontroller-driven solenoids and actuators" },
    { partNumber: "IRLZ44N", manufacturer: "Infineon", polarity: "N-channel logic level", ratings: "55 V | 22 mΩ max at 10 V", package: "TO-220", application: "Logic-level automotive and automation switching" },
    { partNumber: "STP55NF06", manufacturer: "STMicroelectronics", polarity: "N-channel", ratings: "60 V | 18 mΩ max at 10 V", package: "TO-220", application: "Automotive solenoids and DC motor control" },
    { partNumber: "IRF540N", manufacturer: "Infineon", polarity: "N-channel", ratings: "100 V | 44 mΩ max at 10 V", package: "TO-220", application: "Standard 10V gate drive industrial switching" },
    { partNumber: "IRF9Z34N", manufacturer: "Infineon", polarity: "P-channel", ratings: "-55 V | 0.1 Ω max at -10 V", package: "TO-220", application: "High-side switching and reverse-polarity protection" },
    { partNumber: "IRF830", manufacturer: "Vishay", polarity: "N-channel", ratings: "500 V | 1.5 Ω max at 10 V", package: "TO-220", application: "High-voltage auxiliary supplies and lighting" },
    { partNumber: "SI2302", manufacturer: "Vishay", polarity: "N-channel logic level", ratings: "20 V | 85 mΩ max at 4.5 V", package: "SOT-23", application: "Compact embedded control and logic-level load switching" }
  ],
  "Nagpur": [
    { partNumber: "IRFP064N", manufacturer: "Infineon", polarity: "N-channel", ratings: "55 V | 8 mΩ max at 10 V", package: "TO-247", application: "Heavy-duty low-voltage inverter stages" },
    { partNumber: "IRFP4668", manufacturer: "Infineon", polarity: "N-channel", ratings: "200 V | 9.7 mΩ max at 10 V", package: "TO-247", application: "High-power industrial inverters and telecom rectifiers" },
    { partNumber: "IRF4905", manufacturer: "Infineon", polarity: "P-channel", ratings: "-55 V | 20 mΩ max at -10 V", package: "TO-220", application: "High-current P-channel battery disconnection" },
    { partNumber: "IRF1404", manufacturer: "Infineon", polarity: "N-channel", ratings: "40 V | 4 mΩ max at 10 V", package: "TO-220", application: "Ultra-low RDS(on) high-current motor drives" },
    { partNumber: "STW20NK50Z", manufacturer: "STMicroelectronics", polarity: "N-channel", ratings: "500 V | 0.27 Ω max at 10 V", package: "TO-247", application: "Zener-protected high-voltage industrial SMPS" },
    { partNumber: "IRF540N", manufacturer: "Infineon", polarity: "N-channel", ratings: "100 V | 44 mΩ max at 10 V", package: "TO-220", application: "Standard industrial power switching" },
    { partNumber: "SI2302", manufacturer: "Vishay", polarity: "N-channel logic level", ratings: "20 V | 85 mΩ max at 4.5 V", package: "SOT-23", application: "Sensor nodes and 3.3V/5V logic interfacing" }
  ],
  "Kolhapur": [
    { partNumber: "IRFP460", manufacturer: "Vishay", polarity: "N-channel", ratings: "500 V | 0.27 Ω max at 10 V", package: "TO-247", application: "Welding machines and induction heating" },
    { partNumber: "IRFP250N", manufacturer: "Infineon", polarity: "N-channel", ratings: "200 V | 75 mΩ max at 10 V", package: "TO-247", application: "Power supplies and motor drives" },
    { partNumber: "IRF840", manufacturer: "Vishay", polarity: "N-channel", ratings: "500 V | 0.85 Ω max at 10 V", package: "TO-220", application: "SMPS and industrial offline converters" },
    { partNumber: "IRFP260N", manufacturer: "Infineon", polarity: "N-channel", ratings: "200 V | 40 mΩ max at 10 V", package: "TO-247", application: "High-power inverters and industrial drives" },
    { partNumber: "STP55NF06", manufacturer: "STMicroelectronics", polarity: "N-channel", ratings: "60 V | 18 mΩ max at 10 V", package: "TO-220", application: "Foundry and agricultural equipment drives" },
    { partNumber: "IRF3205", manufacturer: "Infineon", polarity: "N-channel", ratings: "55 V | 8 mΩ max at 10 V", package: "TO-220", application: "High-current low-voltage inverters" },
    { partNumber: "IRF9540N", manufacturer: "Infineon", polarity: "P-channel", ratings: "-100 V | 117 mΩ max at -10 V", package: "TO-220", application: "High-side DC switching circuits" }
  ],
  "Solapur": [
    { partNumber: "IRFZ44N", manufacturer: "Infineon", polarity: "N-channel", ratings: "55 V | 17.5 mΩ max at 10 V", package: "TO-220", application: "Solar pump controllers and textile drives" },
    { partNumber: "IRF3205", manufacturer: "Infineon", polarity: "N-channel", ratings: "55 V | 8 mΩ max at 10 V", package: "TO-220", application: "Battery-powered inverters and solar PV systems" },
    { partNumber: "IRF540N", manufacturer: "Infineon", polarity: "N-channel", ratings: "100 V | 44 mΩ max at 10 V", package: "TO-220", application: "General motor control and industrial switching" },
    { partNumber: "IRF640N", manufacturer: "Infineon", polarity: "N-channel", ratings: "200 V | 150 mΩ max at 10 V", package: "TO-220", application: "Medium-power switching and pump drives" },
    { partNumber: "IRFP250N", manufacturer: "Infineon", polarity: "N-channel", ratings: "200 V | 75 mΩ max at 10 V", package: "TO-247", application: "High-power industrial inverters" },
    { partNumber: "IRF740", manufacturer: "Vishay", polarity: "N-channel", ratings: "400 V | 0.55 Ω max at 10 V", package: "TO-220", application: "High-voltage offline converters" },
    { partNumber: "IRF9540N", manufacturer: "Infineon", polarity: "P-channel", ratings: "-100 V | 117 mΩ max at -10 V", package: "TO-220", application: "High-side switching and reverse-polarity protection" }
  ],
  "Ahmednagar": [
    { partNumber: "IRF3710", manufacturer: "Infineon", polarity: "N-channel", ratings: "100 V | 23 mΩ max at 10 V", package: "TO-220", application: "Dairy chiller drives and industrial pumps" },
    { partNumber: "IRFB4110", manufacturer: "Infineon", polarity: "N-channel", ratings: "100 V | 4.5 mΩ max at 10 V", package: "TO-220", application: "High-efficiency motor drives and food processing equipment" },
    { partNumber: "IRFP250N", manufacturer: "Infineon", polarity: "N-channel", ratings: "200 V | 75 mΩ max at 10 V", package: "TO-247", application: "High-power industrial inverters" },
    { partNumber: "IRF840", manufacturer: "Vishay", polarity: "N-channel", ratings: "500 V | 0.85 Ω max at 10 V", package: "TO-220", application: "SMPS and high-voltage offline converters" },
    { partNumber: "IRFP460", manufacturer: "Vishay", polarity: "N-channel", ratings: "500 V | 0.27 Ω max at 10 V", package: "TO-247", application: "Industrial motor drives and power supplies" },
    { partNumber: "IRLZ44N", manufacturer: "Infineon", polarity: "N-channel logic level", ratings: "55 V | 22 mΩ max at 10 V", package: "TO-220", application: "Microcontroller-driven switching at 5V logic" },
    { partNumber: "IRF9540N", manufacturer: "Infineon", polarity: "P-channel", ratings: "-100 V | 117 mΩ max at -10 V", package: "TO-220", application: "High-side switching and reverse-polarity protection" }
  ]
};

// Exact Worked Examples for 9 MH cities
const exactMhWorkedExamples = {
  "Pune": {
    part: "IRFB4110",
    note: "Worked Example (IRFB4110): IRFB4110 in a BLDC motor controller. R_DS(on) 4.5 mΩ, T_A 40°C, θ_JA 62°C/W (TO-220, free air). At 10 A: P_cond = 10 x 10 x 0.0045 = 0.45 W. Temp rise = 27.9°C. T_J = 67.9°C (Safe). At 20 A: P_cond = 1.8 W. Temp rise = 111.6°C. T_J = 151.6°C (Warning). Heat grows with the square of the current, so a heatsink is essential."
  },
  "Thane": {
    part: "IRF840",
    note: "Worked Example (IRF840): IRF840 in an SMPS stage. R_DS(on) 0.85 Ω, T_A 40°C, θ_JA 62°C/W (TO-220, free air). At 1 A: P_cond = 1 x 1 x 0.85 = 0.85 W. Temp rise = 52.7°C. T_J = 92.7°C (Safe). At 1.5 A: P_cond = 1.91 W. Temp rise = 118.6°C. T_J = 158.6°C (Warning). High-voltage MOSFETs need a heatsink even at modest currents."
  },
  "Navi Mumbai": {
    part: "IRF7413",
    note: "Worked Example (IRF7413): IRF7413 in a DC-DC converter. R_DS(on) 11 mΩ, T_A 40°C, θ_JA 62°C/W (SO-8, minimal copper). At 6 A: P_cond = 6 x 6 x 0.011 = 0.40 W. Temp rise = 24.6°C. T_J = 64.6°C (Safe). At 12 A: P_cond = 1.58 W. Temp rise = 98.2°C. T_J = 138.2°C (Warning). SO-8 parts depend on board copper, so layout decides real heat."
  },
  "Nashik": {
    part: "IRFP260N",
    note: "Worked Example (IRFP260N): IRFP260N in an inverter. R_DS(on) 40 mΩ, T_A 45°C, θ_JA 40°C/W (TO-247, free air). At 4 A: P_cond = 4 x 4 x 0.04 = 0.64 W. Temp rise = 25.6°C. T_J = 70.6°C (Safe). At 8 A: P_cond = 2.56 W. Temp rise = 102.4°C. T_J = 147.4°C (Warning). Loss quadruples when current doubles, so use a proper heatsink."
  },
  "Chhatrapati Sambhajinagar": {
    part: "IRL540N",
    note: "Worked Example (IRL540N): IRL540N driving a 24V solenoid. R_DS(on) 44 mΩ, T_A 40°C, θ_JA 62°C/W (TO-220, free air). At 4 A: P_cond = 4 x 4 x 0.044 = 0.70 W. Temp rise = 43.6°C. T_J = 83.6°C (Safe). At 6 A: P_cond = 1.58 W. Temp rise = 98.2°C. T_J = 138.2°C (Warning). A warm panel leaves little headroom, so derate."
  },
  "Nagpur": {
    part: "IRFP4668",
    note: "Worked Example (IRFP4668): IRFP4668 in an inverter. R_DS(on) 9.7 mΩ, T_A 45°C, θ_JA 40°C/W (TO-247, free air). At 10 A: P_cond = 10 x 10 x 0.0097 = 0.97 W. Temp rise = 38.8°C. T_J = 83.8°C (Safe). At 15 A: P_cond = 2.18 W. Temp rise = 87.3°C. T_J = 132.3°C (Warning). In a hot Nagpur summer enclosure, a heatsink is critical."
  },
  "Kolhapur": {
    part: "IRFP460",
    note: "Worked Example (IRFP460): IRFP460 in a welding inverter. R_DS(on) 0.27 Ω, T_A 45°C, θ_JA 40°C/W (TO-247, free air). At 2 A: P_cond = 2 x 2 x 0.27 = 1.08 W. Temp rise = 43.2°C. T_J = 88.2°C (Safe). At 3 A: P_cond = 2.43 W. Temp rise = 97.2°C. T_J = 142.2°C (Warning). Foundry-floor heat removes headroom quickly."
  },
  "Solapur": {
    part: "IRFZ44N",
    note: "Worked Example (IRFZ44N): IRFZ44N in a solar pump controller. R_DS(on) 17.5 mΩ, T_A 45°C, θ_JA 62°C/W (TO-220, free air). At 6 A: P_cond = 6 x 6 x 0.0175 = 0.63 W. Temp rise = 39.1°C. T_J = 84.1°C (Safe). At 10 A: P_cond = 1.75 W. Temp rise = 108.5°C. T_J = 153.5°C (Warning). Summer enclosures pass 50°C, so use a heatsink."
  },
  "Ahmednagar": {
    part: "IRF3710",
    note: "Worked Example (IRF3710): IRF3710 in a dairy-chiller drive. R_DS(on) 23 mΩ, T_A 40°C, θ_JA 62°C/W (TO-220, free air). At 5 A: P_cond = 5 x 5 x 0.023 = 0.58 W. Temp rise = 35.7°C. T_J = 75.7°C (Safe). At 8 A: P_cond = 1.47 W. Temp rise = 91.3°C. T_J = 131.3°C (Warning). A heatsink provides the necessary margin."
  }
};

// Exact What We Supply structure for 9 MH cities
function getMhWhatWeSupply(city) {
  return {
    h2: `What We Supply in ${city}`,
    categories: {
      active: {
        title: "Active Components",
        items: [
          "Integrated circuits from Texas Instruments, STMicroelectronics, NXP, Microchip and Analog Devices",
          "Power MOSFETs from Infineon, ON Semi, STMicroelectronics and Vishay",
          "BJT transistors, plus IGBTs on request (send part numbers to confirm availability)",
          "Microcontrollers for industrial automation, IoT and embedded electronics",
          "Voltage regulators: buck, boost and LDO"
        ]
      },
      passives: {
        title: "Passive Components (1,700+ SKUs)",
        items: [
          "SMD chip resistors, 1% precision, 0402 to 1210, rated -55°C to +155°C",
          "Through-hole resistors, E24 values, 1/4W to 1W (1,300+ resistor SKUs in total)",
          "SMD ceramic capacitors (MLCC), 384+ SKUs, 0402 to 1812, C0G/NP0 and X7R, 16V to 50V",
          "Radial electrolytic and SMD tantalum capacitors",
          "SMD power inductors, 390+ SKUs, shielded ferrite"
        ]
      },
      diodes: {
        title: "Diodes, LEDs and Timing (485+ Diode SKUs)",
        items: [
          "Zener, Schottky, rectifier and TVS diodes",
          "LEDs and crystal oscillators"
        ]
      },
      connectors: {
        title: "Connectors and Electromechanical (340+ Connectors, 185+ Electromechanical)",
        items: [
          "Pin headers, JST connectors, terminal blocks, FFC/FPC connectors and USB/DC connectors",
          "Switches, and electromechanical or reed relays with 3V to 24V DC coils and up to 10A contacts"
        ]
      }
    },
    groups: [
      {
        title: "Active Components",
        items: [
          "Integrated circuits from Texas Instruments, STMicroelectronics, NXP, Microchip and Analog Devices",
          "Power MOSFETs from Infineon, ON Semi, STMicroelectronics and Vishay",
          "BJT transistors, plus IGBTs on request (send part numbers to confirm availability)",
          "Microcontrollers for industrial automation, IoT and embedded electronics",
          "Voltage regulators: buck, boost and LDO"
        ]
      },
      {
        title: "Passive Components (1,700+ SKUs)",
        items: [
          "SMD chip resistors, 1% precision, 0402 to 1210, rated -55°C to +155°C",
          "Through-hole resistors, E24 values, 1/4W to 1W (1,300+ resistor SKUs in total)",
          "SMD ceramic capacitors (MLCC), 384+ SKUs, 0402 to 1812, C0G/NP0 and X7R, 16V to 50V",
          "Radial electrolytic and SMD tantalum capacitors",
          "SMD power inductors, 390+ SKUs, shielded ferrite"
        ]
      },
      {
        title: "Diodes, LEDs and Timing (485+ Diode SKUs)",
        items: [
          "Zener, Schottky, rectifier and TVS diodes",
          "LEDs and crystal oscillators"
        ]
      },
      {
        title: "Connectors and Electromechanical (340+ Connectors, 185+ Electromechanical)",
        items: [
          "Pin headers, JST connectors, terminal blocks, FFC/FPC connectors and USB/DC connectors",
          "Switches, and electromechanical or reed relays with 3V to 24V DC coils and up to 10A contacts"
        ]
      }
    ]
  };
}

const standardDisclaimer = "Disclaimer: this is a quick estimate. Real designs also include switching loss, duty cycle, PCB cooling and the rise of R_DS(on) with temperature. Check the datasheet. R_DS(on) is quoted at 25°C and rises considerably when the junction is hot.";

// Related cities for 8 Karnataka pages
const kaRelatedCities = {
  "Ballari": [
    { text: "Hubballi-Dharwad", url: "/electronic-component-distributor-in-hubballi-dharwad" },
    { text: "Davanagere", url: "/electronic-component-distributor-in-davanagere" },
    { text: "Kalaburagi", url: "/electronic-component-distributor-in-kalaburagi" },
    { text: "Market Area Hub", url: "/market-area" }
  ],
  "Belagavi": [
    { text: "Hubballi-Dharwad", url: "/electronic-component-distributor-in-hubballi-dharwad" },
    { text: "Kolhapur", url: "/electronic-component-distributor-in-kolhapur" },
    { text: "Davanagere", url: "/electronic-component-distributor-in-davanagere" },
    { text: "Market Area Hub", url: "/market-area" }
  ],
  "Davanagere": [
    { text: "Hubballi-Dharwad", url: "/electronic-component-distributor-in-hubballi-dharwad" },
    { text: "Ballari", url: "/electronic-component-distributor-in-ballari" },
    { text: "Shivamogga", url: "/electronic-component-distributor-in-shivamogga" },
    { text: "Market Area Hub", url: "/market-area" }
  ],
  "Hubballi-Dharwad": [
    { text: "Belagavi", url: "/electronic-component-distributor-in-belagavi" },
    { text: "Davanagere", url: "/electronic-component-distributor-in-davanagere" },
    { text: "Ballari", url: "/electronic-component-distributor-in-ballari" },
    { text: "Market Area Hub", url: "/market-area" }
  ],
  "Kalaburagi": [
    { text: "Ballari", url: "/electronic-component-distributor-in-ballari" },
    { text: "Hubballi-Dharwad", url: "/electronic-component-distributor-in-hubballi-dharwad" },
    { text: "Hyderabad", url: "/electronic-component-distributor-in-hyderabad" },
    { text: "Market Area Hub", url: "/market-area" }
  ],
  "Mangaluru": [
    { text: "Mysuru", url: "/electronic-component-distributor-in-mysuru" },
    { text: "Shivamogga", url: "/electronic-component-distributor-in-shivamogga" },
    { text: "Kochi", url: "/electronic-component-distributor-in-kochi" },
    { text: "Market Area Hub", url: "/market-area" }
  ],
  "Mysuru": [
    { text: "Bengaluru", url: "/electronic-component-distributor-in-bengaluru" },
    { text: "Mangaluru", url: "/electronic-component-distributor-in-mangaluru" },
    { text: "Shivamogga", url: "/electronic-component-distributor-in-shivamogga" },
    { text: "Market Area Hub", url: "/market-area" }
  ],
  "Shivamogga": [
    { text: "Davanagere", url: "/electronic-component-distributor-in-davanagere" },
    { text: "Mangaluru", url: "/electronic-component-distributor-in-mangaluru" },
    { text: "Mysuru", url: "/electronic-component-distributor-in-mysuru" },
    { text: "Market Area Hub", url: "/market-area" }
  ]
};

// Process each page
cityPages = cityPages.map(page => {
  const city = page.city;

  // 1. Title formatting (A5)
  if (city === 'Chhatrapati Sambhajinagar') {
    page.metaTitle = 'Chh. Sambhajinagar Electronic Components | Mirai';
  } else if (page.metaTitle && page.metaTitle.length > 60) {
    const candidate = `${city} Electronic Component & MOSFET Distributor | Mirai`;
    if (candidate.length <= 60) {
      page.metaTitle = candidate;
    } else {
      page.metaTitle = `${city} Electronic Components | Mirai`;
    }
  }

  // 2. Maharashtra 9 cities updates
  if (exactMhMosfetTables[city]) {
    if (!page.mosfetDistributor) page.mosfetDistributor = {};
    page.mosfetDistributor.popularParts = exactMhMosfetTables[city].map(p => ({
      ...p,
      brand: p.manufacturer,
      channel: p.polarity,
      type: p.polarity,
      vDs: p.ratings.split('|')[0].trim(),
      rDsOn: p.ratings.split('|')[1]?.trim() || ''
    }));

    if (!page.mosfetCalculator) page.mosfetCalculator = { h2: "MOSFET Thermal and Power Loss Calculator" };
    page.mosfetCalculator.workedExample = exactMhWorkedExamples[city];
    page.mosfetCalculator.defaultPart = exactMhWorkedExamples[city].part;
    page.mosfetCalculator.disclaimer = standardDisclaimer;

    page.whatWeSupply = getMhWhatWeSupply(city);
    page.whatWeSupplyDetailed = getMhWhatWeSupply(city);
  }

  // 3. All 17 MOSFET pages: ensure standard disclaimer sentence
  if (page.mosfetCalculator) {
    if (!page.mosfetCalculator.disclaimer || !page.mosfetCalculator.disclaimer.includes('R_DS(on) is quoted at 25°C and rises considerably when the junction is hot.')) {
      page.mosfetCalculator.disclaimer = standardDisclaimer;
    }
  }

  // 4. Karnataka 8 pages updates
  if (kaRelatedCities[city]) {
    page.internalLinks = kaRelatedCities[city];
  }

  // C3. Duplicate towns in areas lists
  if (city === 'Ballari' && page.areas) {
    page.areas = page.areas.replace(/Anantapur border areas and /, '').replace(/, Anantapur border areas/, '').replace(/Anantapur border areas, /, '');
    page.areas = page.areas.replace(/, Raichur/g, '').replace(/Raichur, /g, '');
  }
  if (city === 'Shivamogga' && page.areas) {
    page.areas = page.areas.replace(/Channagiri, Honnali, /g, '').replace(/, Channagiri, Honnali/g, '');
  }

  // G. Maharashtra pages copy fixes
  if (city === 'Navi Mumbai') {
    let s = JSON.stringify(page);
    s = s.replace(/closeness to the Navi Mumbai and JNPT port region/g, 'closeness to the JNPT port');
    page = JSON.parse(s);
  }
  if (city === 'Solapur') {
    let s = JSON.stringify(page);
    s = s.replace(/Osmanabad/g, 'Dharashiv');
    page = JSON.parse(s);
  }
  if (city === 'Kolhapur') {
    let s = JSON.stringify(page);
    s = s.replace(/, Satara, Karad/g, '').replace(/Satara, Karad, /g, '');
    page = JSON.parse(s);
  }

  // H. Tamil Nadu pages copy fixes
  if (city === 'Sriperumbudur' && page.areas) {
    page.areas = page.areas.replace(/ and Mahindra World City/g, '').replace(/, Mahindra World City/g, '');
  }
  if (city === 'Hosur') {
    if (!page.internalLinks) page.internalLinks = [];
    if (!page.internalLinks.some(l => l.text === 'Bengaluru')) {
      page.internalLinks.unshift({ text: "Bengaluru", url: "/electronic-component-distributor-in-bengaluru" });
    }
  }

  // I. Mumbai, Bengaluru, Tirunelveli
  if (city === 'Mumbai') {
    page.metaDescription = "Authorized electronic components & MOSFET distributor in Mumbai since 1999. Genuine ICs, passives & relays with CoC, GST invoice and low MOQ. Lamington Road.";
    page.metaTitle = "Mumbai Electronic Component & MOSFET Distributor | Mirai";
    page.internalLinks = [
      { text: "Thane", url: "/electronic-component-distributor-in-thane" },
      { text: "Navi Mumbai", url: "/electronic-component-distributor-in-navi-mumbai" },
      { text: "Pune", url: "/electronic-component-distributor-in-pune" },
      { text: "Kolhapur", url: "/electronic-component-distributor-in-kolhapur" },
      { text: "Ahmednagar", url: "/electronic-component-distributor-in-ahmednagar" },
      { text: "Chhatrapati Sambhajinagar", url: "/electronic-component-distributor-in-chhatrapati-sambhajinagar" },
      { text: "Vasai-Virar", url: "/electronic-component-distributor-in-vasai-virar" },
      { text: "Market Area Hub", url: "/market-area" }
    ];
    if (!page.faqs) page.faqs = [];
    if (!page.faqs.some(f => f.q.includes('collect parts in Mumbai'))) {
      page.faqs.push({
        q: "Can I collect parts in Mumbai?",
        a: "Yes. You can collect confirmed orders directly from our trade counter at 401, Aditya Residency, Chunabhatti Lane, Lamington Road, Mumbai 400 007, or choose courier dispatch across Mumbai and Navi Mumbai."
      });
    }
  }

  if (city === 'Bengaluru') {
    page.metaDescription = "Genuine MOSFETs, ICs, passives & relays for Bengaluru's Peenya, Electronic City & Whitefield teams. CoC, GST invoice, low MOQ. Authorized distributor.";
    page.metaTitle = "Bengaluru Electronic Component & MOSFET Distributor | Mirai";
    page.internalLinks = [
      { text: "Hosur", url: "/electronic-component-distributor-in-hosur" },
      { text: "Mysuru", url: "/electronic-component-distributor-in-mysuru" },
      { text: "Hubballi-Dharwad", url: "/electronic-component-distributor-in-hubballi-dharwad" },
      { text: "Tumakuru", url: "/electronic-component-distributor-in-tumakuru" },
      { text: "Market Area Hub", url: "/market-area" }
    ];
  }

  if (city === 'Tirunelveli') {
    page.metaTitle = "Tirunelveli Electronic Components Distributor | Mirai";
    page.h1 = "Electronic Component Distributor in Tirunelveli: Power MOSFETs, ICs & Passives";
    page.metaDescription = "Authorized distributor of Power MOSFETs, ICs & semiconductors in Tirunelveli. Genuine parts, fast delivery, CoC, GST invoice. Low MOQ.";
  }

  // Global string cleanups per item A1, A2, etc.
  let str = JSON.stringify(page);
  str = str.replace(/authorised/g, 'authorized');
  str = str.replace(/Authorised/g, 'Authorized');
  str = str.replace(/CoC, IGST invoice/g, 'CoC, GST invoice');
  str = str.replace(/Loading premium experience\.\.\./g, '');
  str = str.replace(/Mumbai's Automotive and allied industries/g, "Mumbai's electronics, engineering and allied industries");
  str = str.replace(/Bengaluru's IT and allied industries/g, "Bengaluru's electronics, embedded and allied industries");
  str = str.replace(/Tirunelveli's Power and allied industries/g, "Tirunelveli's wind-power, engineering and allied industries");
  str = str.replace(/7-segment driver ICs \(ULN2003\)/g, "Darlington driver arrays (ULN2003)");
  str = str.replace(/voltage ratings 50V–1000V/g, "20V to 1000V");
  str = str.replace(/voltage ratings 50V-1000V/g, "20V to 1000V");
  str = str.replace(/same-day quotations/g, "quotations within 24 hours");
  str = str.replace(/within 2 business hours/g, "within 24 hours");
  str = str.replace(/\/electronic-component-distributor-in-hubli-dharwad/g, "/electronic-component-distributor-in-hubballi-dharwad");
  str = str.replace(/\/electronic-component-distributor-in-aurangabad/g, "/electronic-component-distributor-in-chhatrapati-sambhajinagar");

  return JSON.parse(str);
});

// Write updated cityPages.json
fs.writeFileSync(cityPagesPath, JSON.stringify(cityPages, null, 2), 'utf8');
console.log(`✅ Saved updated ${cityPagesPath} (${cityPages.length} pages)`);

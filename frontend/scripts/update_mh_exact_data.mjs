import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mhDataPath = path.join(__dirname, 'mh_cities_data.js');

const mhPartsData = {
  "Pune": {
    examplePart: "IRFB4110",
    exampleNote: "IRFB4110 in a BLDC motor controller. R_DS(on) 4.5 mΩ, T_A 40°C, θ_JA 62°C/W (TO-220, free air). At 10 A: P_cond = 10 x 10 x 0.0045 = 0.45 W. Temp rise = 27.9°C. T_J = 67.9°C (Safe). At 20 A: P_cond = 1.8 W. Temp rise = 111.6°C. T_J = 151.6°C (Warning). Heat grows with the square of the current, so a heatsink is essential.",
    parts: [
      { partNumber: "IRF3205", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "55 V | 8 mΩ max at 10 V", vDs: "55 V", vds: "55 V", rDsOn: "8 mΩ max at 10 V", rdsOn: "8 mΩ max at 10 V", package: "TO-220", application: "Low-voltage motor drives and battery systems" },
      { partNumber: "IRFB4110", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "100 V | 4.5 mΩ max at 10 V", vDs: "100 V", vds: "100 V", rDsOn: "4.5 mΩ max at 10 V", rdsOn: "4.5 mΩ max at 10 V", package: "TO-220", application: "Higher-voltage BLDC and e-mobility controllers" },
      { partNumber: "IRF3710", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "100 V | 23 mΩ max at 10 V", vDs: "100 V", vds: "100 V", rDsOn: "23 mΩ max at 10 V", rdsOn: "23 mΩ max at 10 V", package: "TO-220", application: "General motor control and DC-DC stages" },
      { partNumber: "STP75NF75", manufacturer: "STMicroelectronics", brand: "STMicroelectronics", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "75 V | 11 mΩ max at 10 V", vDs: "75 V", vds: "75 V", rDsOn: "11 mΩ max at 10 V", rdsOn: "11 mΩ max at 10 V", package: "TO-220", application: "48V to 60V motor and battery systems" },
      { partNumber: "IRLZ44N", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel logic level", channel: "N-channel logic level", type: "N-channel logic level", ratings: "55 V | 22 mΩ max at 10 V", vDs: "55 V", vds: "55 V", rDsOn: "22 mΩ max at 10 V", rdsOn: "22 mΩ max at 10 V", package: "TO-220", application: "Microcontroller-driven switching at 5 V gate drive" },
      { partNumber: "IRF9540N", manufacturer: "Infineon", brand: "Infineon", polarity: "P-channel", channel: "P-channel", type: "P-channel", ratings: "-100 V | 117 mΩ max at -10 V", vDs: "-100 V", vds: "-100 V", rDsOn: "117 mΩ max at -10 V", rdsOn: "117 mΩ max at -10 V", package: "TO-220", application: "High-side switching and reverse-polarity protection" },
      { partNumber: "SI2302", manufacturer: "Vishay", brand: "Vishay", polarity: "N-channel logic level", channel: "N-channel logic level", type: "N-channel logic level", ratings: "20 V | 85 mΩ max at 4.5 V", vDs: "20 V", vds: "20 V", rDsOn: "85 mΩ max at 4.5 V", rdsOn: "85 mΩ max at 4.5 V", package: "SOT-23", application: "3.3 V and 5 V embedded boards" }
    ]
  },
  "Thane": {
    examplePart: "IRF840",
    exampleNote: "Worked Example (IRF840): IRF840 in an SMPS stage. R_DS(on) 0.85 Ω, T_A 40°C, θ_JA 62°C/W (TO-220, free air). At 1 A: P_cond = 1 x 1 x 0.85 = 0.85 W. Temp rise = 52.7°C. T_J = 92.7°C (Safe). At 1.5 A: P_cond = 1.91 W. Temp rise = 118.6°C. T_J = 158.6°C (Warning). High-voltage MOSFETs need a heatsink even at modest currents.",
    parts: [
      { partNumber: "IRF840", manufacturer: "Vishay", brand: "Vishay", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "500 V | 0.85 Ω max at 10 V", vDs: "500 V", vds: "500 V", rDsOn: "0.85 Ω max at 10 V", rdsOn: "0.85 Ω max at 10 V", package: "TO-220", application: "SMPS and high-voltage power supplies" },
      { partNumber: "IRF740", manufacturer: "Vishay", brand: "Vishay", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "400 V | 0.55 Ω max at 10 V", vDs: "400 V", vds: "400 V", rDsOn: "0.55 Ω max at 10 V", rdsOn: "0.55 Ω max at 10 V", package: "TO-220", application: "Power supply primary stages" },
      { partNumber: "IRFP460", manufacturer: "Vishay", brand: "Vishay", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "500 V | 0.27 Ω max at 10 V", vDs: "500 V", vds: "500 V", rDsOn: "0.27 Ω max at 10 V", rdsOn: "0.27 Ω max at 10 V", package: "TO-247", application: "Industrial power supplies and inverters" },
      { partNumber: "IRF630", manufacturer: "Vishay", brand: "Vishay", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "200 V | 0.40 Ω max at 10 V", vDs: "200 V", vds: "200 V", rDsOn: "0.40 Ω max at 10 V", rdsOn: "0.40 Ω max at 10 V", package: "TO-220", application: "Medium-voltage DC switching" },
      { partNumber: "IRFZ44N", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "55 V | 17.5 mΩ max at 10 V", vDs: "55 V", vds: "55 V", rDsOn: "17.5 mΩ max at 10 V", rdsOn: "17.5 mΩ max at 10 V", package: "TO-220", application: "Low-voltage DC-DC and motor drives" },
      { partNumber: "IRF9Z34N", manufacturer: "Infineon", brand: "Infineon", polarity: "P-channel", channel: "P-channel", type: "P-channel", ratings: "-55 V | 0.1 Ω max at -10 V", vDs: "-55 V", vds: "-55 V", rDsOn: "0.1 Ω max at -10 V", rdsOn: "0.1 Ω max at -10 V", package: "TO-220", application: "High-side switching and reverse-polarity protection" },
      { partNumber: "SI2302", manufacturer: "Vishay", brand: "Vishay", polarity: "N-channel logic level", channel: "N-channel logic level", type: "N-channel logic level", ratings: "20 V | 85 mΩ max at 4.5 V", vDs: "20 V", vds: "20 V", rDsOn: "85 mΩ max at 4.5 V", rdsOn: "85 mΩ max at 4.5 V", package: "SOT-23", application: "Small loads, 3.3 V and 5 V logic" }
    ]
  },
  "Navi Mumbai": {
    examplePart: "IRF7413",
    exampleNote: "Worked Example (IRF7413): IRF7413 in a DC-DC converter. R_DS(on) 11 mΩ, T_A 40°C, θ_JA 62°C/W (SO-8, minimal copper). At 6 A: P_cond = 6 x 6 x 0.011 = 0.40 W. Temp rise = 24.6°C. T_J = 64.6°C (Safe). At 12 A: P_cond = 1.58 W. Temp rise = 98.2°C. T_J = 138.2°C (Warning). SO-8 parts depend on board copper, so layout decides real heat.",
    parts: [
      { partNumber: "IRF7413", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "30 V | 11 mΩ max at 10 V", vDs: "30 V", vds: "30 V", rDsOn: "11 mΩ max at 10 V", rdsOn: "11 mΩ max at 10 V", package: "SO-8", application: "Compact DC-DC converters" },
      { partNumber: "IRLR2905", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel logic level", channel: "N-channel logic level", type: "N-channel logic level", ratings: "55 V | 27 mΩ max at 10 V", vDs: "55 V", vds: "55 V", rDsOn: "27 mΩ max at 10 V", rdsOn: "27 mΩ max at 10 V", package: "TO-252 (DPAK)", application: "Surface-mount motor drives and load switching" },
      { partNumber: "FDD4141", manufacturer: "onsemi", brand: "onsemi", polarity: "P-channel", channel: "P-channel", type: "P-channel", ratings: "-40 V | 12 mΩ at -10 V", vDs: "-40 V", vds: "-40 V", rDsOn: "12 mΩ at -10 V", rdsOn: "12 mΩ at -10 V", package: "TO-252 (DPAK)", application: "Reverse-battery protection and high-side loads" },
      { partNumber: "IRF540N", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "100 V | 44 mΩ max at 10 V", vDs: "100 V", vds: "100 V", rDsOn: "44 mΩ max at 10 V", rdsOn: "44 mΩ max at 10 V", package: "TO-220", application: "Industrial switching and solenoid drivers" },
      { partNumber: "IRF3205", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "55 V | 8 mΩ max at 10 V", vDs: "55 V", vds: "55 V", rDsOn: "8 mΩ max at 10 V", rdsOn: "8 mΩ max at 10 V", package: "TO-220", application: "High-current battery and motor switching" },
      { partNumber: "IRF9540N", manufacturer: "Infineon", brand: "Infineon", polarity: "P-channel", channel: "P-channel", type: "P-channel", ratings: "-100 V | 117 mΩ max at -10 V", vDs: "-100 V", vds: "-100 V", rDsOn: "117 mΩ max at -10 V", rdsOn: "117 mΩ max at -10 V", package: "TO-220", application: "High-side industrial load switching" },
      { partNumber: "SI2302", manufacturer: "Vishay", brand: "Vishay", polarity: "N-channel logic level", channel: "N-channel logic level", type: "N-channel logic level", ratings: "20 V | 85 mΩ max at 4.5 V", vDs: "20 V", vds: "20 V", rDsOn: "85 mΩ max at 4.5 V", rdsOn: "85 mΩ max at 4.5 V", package: "SOT-23", application: "Microcontroller-driven load switching" }
    ]
  },
  "Nashik": {
    examplePart: "IRFP260N",
    exampleNote: "Worked Example (IRFP260N): IRFP260N in an inverter. R_DS(on) 40 mΩ, T_A 45°C, θ_JA 40°C/W (TO-247, free air). At 4 A: P_cond = 4 x 4 x 0.04 = 0.64 W. Temp rise = 25.6°C. T_J = 70.6°C (Safe). At 8 A: P_cond = 2.56 W. Temp rise = 102.4°C. T_J = 147.4°C (Warning). Loss quadruples when current doubles, so use a proper heatsink.",
    parts: [
      { partNumber: "IRFP260N", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "200 V | 40 mΩ max at 10 V", vDs: "200 V", vds: "200 V", rDsOn: "40 mΩ max at 10 V", rdsOn: "40 mΩ max at 10 V", package: "TO-247", application: "Solar inverters and heavy motor drives" },
      { partNumber: "IRFP250N", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "200 V | 75 mΩ max at 10 V", vDs: "200 V", vds: "200 V", rDsOn: "75 mΩ max at 10 V", rdsOn: "75 mΩ max at 10 V", package: "TO-247", application: "Inverter and amplifier stages" },
      { partNumber: "IRF640N", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "200 V | 150 mΩ max at 10 V", vDs: "200 V", vds: "200 V", rDsOn: "150 mΩ max at 10 V", rdsOn: "150 mΩ max at 10 V", package: "TO-220", application: "Medium-power DC switching" },
      { partNumber: "IRFB4110", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "100 V | 4.5 mΩ max at 10 V", vDs: "100 V", vds: "100 V", rDsOn: "4.5 mΩ max at 10 V", rdsOn: "4.5 mΩ max at 10 V", package: "TO-220", application: "High-efficiency BLDC motor drives" },
      { partNumber: "IRF3205", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "55 V | 8 mΩ max at 10 V", vDs: "55 V", vds: "55 V", rDsOn: "8 mΩ max at 10 V", rdsOn: "8 mΩ max at 10 V", package: "TO-220", application: "12V and 24V inverter stages" },
      { partNumber: "IRF540N", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "100 V | 44 mΩ max at 10 V", vDs: "100 V", vds: "100 V", rDsOn: "44 mΩ max at 10 V", rdsOn: "44 mΩ max at 10 V", package: "TO-220", application: "General-purpose power switching" },
      { partNumber: "IRF9540N", manufacturer: "Infineon", brand: "Infineon", polarity: "P-channel", channel: "P-channel", type: "P-channel", ratings: "-100 V | 117 mΩ max at -10 V", vDs: "-100 V", vds: "-100 V", rDsOn: "117 mΩ max at -10 V", rdsOn: "117 mΩ max at -10 V", package: "TO-220", application: "High-side polarity protection" }
    ]
  },
  "Chhatrapati Sambhajinagar": {
    examplePart: "IRL540N",
    exampleNote: "Worked Example (IRL540N): IRL540N driving a 24V solenoid. R_DS(on) 44 mΩ, T_A 40°C, θ_JA 62°C/W (TO-220, free air). At 4 A: P_cond = 4 x 4 x 0.044 = 0.70 W. Temp rise = 43.6°C. T_J = 83.6°C (Safe). At 6 A: P_cond = 1.58 W. Temp rise = 98.2°C. T_J = 138.2°C (Warning). A warm panel leaves little headroom, so derate.",
    parts: [
      { partNumber: "IRL540N", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel logic level", channel: "N-channel logic level", type: "N-channel logic level", ratings: "100 V | 44 mΩ max at 10 V", vDs: "100 V", vds: "100 V", rDsOn: "44 mΩ max at 10 V", rdsOn: "44 mΩ max at 10 V", package: "TO-220", application: "24V solenoid drivers and PLC outputs" },
      { partNumber: "IRLZ44N", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel logic level", channel: "N-channel logic level", type: "N-channel logic level", ratings: "55 V | 22 mΩ max at 10 V", vDs: "55 V", vds: "55 V", rDsOn: "22 mΩ max at 10 V", rdsOn: "22 mΩ max at 10 V", package: "TO-220", application: "Microcontroller logic-level switching" },
      { partNumber: "STP55NF06", manufacturer: "STMicroelectronics", brand: "STMicroelectronics", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "60 V | 18 mΩ max at 10 V", vDs: "60 V", vds: "60 V", rDsOn: "18 mΩ max at 10 V", rdsOn: "18 mΩ max at 10 V", package: "TO-220", application: "Automotive and machine-tool drives" },
      { partNumber: "IRF540N", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "100 V | 44 mΩ max at 10 V", vDs: "100 V", vds: "100 V", rDsOn: "44 mΩ max at 10 V", rdsOn: "44 mΩ max at 10 V", package: "TO-220", application: "General power switching" },
      { partNumber: "IRF9Z34N", manufacturer: "Infineon", brand: "Infineon", polarity: "P-channel", channel: "P-channel", type: "P-channel", ratings: "-55 V | 0.1 Ω max at -10 V", vDs: "-55 V", vds: "-55 V", rDsOn: "0.1 Ω max at -10 V", rdsOn: "0.1 Ω max at -10 V", package: "TO-220", application: "High-side load switches" },
      { partNumber: "IRF830", manufacturer: "Vishay", brand: "Vishay", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "500 V | 1.5 Ω max at 10 V", vDs: "500 V", vds: "500 V", rDsOn: "1.5 Ω max at 10 V", rdsOn: "1.5 Ω max at 10 V", package: "TO-220", application: "Auxiliary power supplies and lighting" },
      { partNumber: "SI2302", manufacturer: "Vishay", brand: "Vishay", polarity: "N-channel logic level", channel: "N-channel logic level", type: "N-channel logic level", ratings: "20 V | 85 mΩ max at 4.5 V", vDs: "20 V", vds: "20 V", rDsOn: "85 mΩ max at 4.5 V", rdsOn: "85 mΩ max at 4.5 V", package: "SOT-23", application: "Compact 3.3V/5V embedded circuits" }
    ]
  },
  "Nagpur": {
    examplePart: "IRFP4668",
    exampleNote: "Worked Example (IRFP4668): IRFP4668 in an inverter. R_DS(on) 9.7 mΩ, T_A 45°C, θ_JA 40°C/W (TO-247, free air). At 10 A: P_cond = 10 x 10 x 0.0097 = 0.97 W. Temp rise = 38.8°C. T_J = 83.8°C (Safe). At 15 A: P_cond = 2.18 W. Temp rise = 87.3°C. T_J = 132.3°C (Warning). In a hot Nagpur summer enclosure, a heatsink is critical.",
    parts: [
      { partNumber: "IRFP064N", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "55 V | 8 mΩ max at 10 V", vDs: "55 V", vds: "55 V", rDsOn: "8 mΩ max at 10 V", rdsOn: "8 mΩ max at 10 V", package: "TO-247", application: "High-current inverter and battery stages" },
      { partNumber: "IRFP4668", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "200 V | 9.7 mΩ max at 10 V", vDs: "200 V", vds: "200 V", rDsOn: "9.7 mΩ max at 10 V", rdsOn: "9.7 mΩ max at 10 V", package: "TO-247", application: "Heavy-duty inverters and industrial drives" },
      { partNumber: "IRF4905", manufacturer: "Infineon", brand: "Infineon", polarity: "P-channel", channel: "P-channel", type: "P-channel", ratings: "-55 V | 20 mΩ max at -10 V", vDs: "-55 V", vds: "-55 V", rDsOn: "20 mΩ max at -10 V", rdsOn: "20 mΩ max at -10 V", package: "TO-220", application: "High-current reverse-battery protection" },
      { partNumber: "IRF1404", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "40 V | 4 mΩ max at 10 V", vDs: "40 V", vds: "40 V", rDsOn: "4 mΩ max at 10 V", rdsOn: "4 mΩ max at 10 V", package: "TO-220", application: "Ultra-low R_DS(on) battery applications" },
      { partNumber: "STW20NK50Z", manufacturer: "STMicroelectronics", brand: "STMicroelectronics", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "500 V | 0.27 Ω max at 10 V", vDs: "500 V", vds: "500 V", rDsOn: "0.27 Ω max at 10 V", rdsOn: "0.27 Ω max at 10 V", package: "TO-247", application: "High-voltage SMPS and welding stages" },
      { partNumber: "IRF540N", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "100 V | 44 mΩ max at 10 V", vDs: "100 V", vds: "100 V", rDsOn: "44 mΩ max at 10 V", rdsOn: "44 mΩ max at 10 V", package: "TO-220", application: "Industrial DC load switching" },
      { partNumber: "SI2302", manufacturer: "Vishay", brand: "Vishay", polarity: "N-channel logic level", channel: "N-channel logic level", type: "N-channel logic level", ratings: "20 V | 85 mΩ max at 4.5 V", vDs: "20 V", vds: "20 V", rDsOn: "85 mΩ max at 4.5 V", rdsOn: "85 mΩ max at 4.5 V", package: "SOT-23", application: "Small-signal and sensor switching" }
    ]
  },
  "Kolhapur": {
    examplePart: "IRFP460",
    exampleNote: "Worked Example (IRFP460): IRFP460 in a welding inverter. R_DS(on) 0.27 Ω, T_A 45°C, θ_JA 40°C/W (TO-247, free air). At 2 A: P_cond = 2 x 2 x 0.27 = 1.08 W. Temp rise = 43.2°C. T_J = 88.2°C (Safe). At 3 A: P_cond = 2.43 W. Temp rise = 97.2°C. T_J = 142.2°C (Warning). Foundry-floor heat removes headroom quickly.",
    parts: [
      { partNumber: "IRFP460", manufacturer: "Vishay", brand: "Vishay", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "500 V | 0.27 Ω max at 10 V", vDs: "500 V", vds: "500 V", rDsOn: "0.27 Ω max at 10 V", rdsOn: "0.27 Ω max at 10 V", package: "TO-247", application: "Welding machines and induction heating" },
      { partNumber: "IRFP250N", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "200 V | 75 mΩ max at 10 V", vDs: "200 V", vds: "200 V", rDsOn: "75 mΩ max at 10 V", rdsOn: "75 mΩ max at 10 V", package: "TO-247", application: "Foundry equipment and inverter stages" },
      { partNumber: "IRF840", manufacturer: "Vishay", brand: "Vishay", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "500 V | 0.85 Ω max at 10 V", vDs: "500 V", vds: "500 V", rDsOn: "0.85 Ω max at 10 V", rdsOn: "0.85 Ω max at 10 V", package: "TO-220", application: "SMPS and machine-tool controls" },
      { partNumber: "IRFP260N", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "200 V | 40 mΩ max at 10 V", vDs: "200 V", vds: "200 V", rDsOn: "40 mΩ max at 10 V", rdsOn: "40 mΩ max at 10 V", package: "TO-247", application: "High-power industrial motor drives" },
      { partNumber: "STP55NF06", manufacturer: "STMicroelectronics", brand: "STMicroelectronics", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "60 V | 18 mΩ max at 10 V", vDs: "60 V", vds: "60 V", rDsOn: "18 mΩ max at 10 V", rdsOn: "18 mΩ max at 10 V", package: "TO-220", application: "Actuators and DC-DC power" },
      { partNumber: "IRF3205", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "55 V | 8 mΩ max at 10 V", vDs: "55 V", vds: "55 V", rDsOn: "8 mΩ max at 10 V", rdsOn: "8 mΩ max at 10 V", package: "TO-220", application: "12V/24V battery management" },
      { partNumber: "IRF9540N", manufacturer: "Infineon", brand: "Infineon", polarity: "P-channel", channel: "P-channel", type: "P-channel", ratings: "-100 V | 117 mΩ max at -10 V", vDs: "-100 V", vds: "-100 V", rDsOn: "117 mΩ max at -10 V", rdsOn: "117 mΩ max at -10 V", package: "TO-220", application: "Reverse-polarity and high-side isolation" }
    ]
  },
  "Solapur": {
    examplePart: "IRFZ44N",
    exampleNote: "Worked Example (IRFZ44N): IRFZ44N in a solar pump controller. R_DS(on) 17.5 mΩ, T_A 45°C, θ_JA 62°C/W (TO-220, free air). At 6 A: P_cond = 6 x 6 x 0.0175 = 0.63 W. Temp rise = 39.1°C. T_J = 84.1°C (Safe). At 10 A: P_cond = 1.75 W. Temp rise = 108.5°C. T_J = 153.5°C (Warning). Summer enclosures pass 50°C, so use a heatsink.",
    parts: [
      { partNumber: "IRFZ44N", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "55 V | 17.5 mΩ max at 10 V", vDs: "55 V", vds: "55 V", rDsOn: "17.5 mΩ max at 10 V", rdsOn: "17.5 mΩ max at 10 V", package: "TO-220", application: "Solar pump controllers and DC drives" },
      { partNumber: "IRF3205", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "55 V | 8 mΩ max at 10 V", vDs: "55 V", vds: "55 V", rDsOn: "8 mΩ max at 10 V", rdsOn: "8 mΩ max at 10 V", package: "TO-220", application: "Battery charging and inverter bridges" },
      { partNumber: "IRF540N", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "100 V | 44 mΩ max at 10 V", vDs: "100 V", vds: "100 V", rDsOn: "44 mΩ max at 10 V", rdsOn: "44 mΩ max at 10 V", package: "TO-220", application: "Solenoids and pump valve control" },
      { partNumber: "IRF640N", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "200 V | 150 mΩ max at 10 V", vDs: "200 V", vds: "200 V", rDsOn: "150 mΩ max at 10 V", rdsOn: "150 mΩ max at 10 V", package: "TO-220", application: "Medium-voltage solar applications" },
      { partNumber: "IRFP250N", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "200 V | 75 mΩ max at 10 V", vDs: "200 V", vds: "200 V", rDsOn: "75 mΩ max at 10 V", rdsOn: "75 mΩ max at 10 V", package: "TO-247", application: "High-power pump inverters" },
      { partNumber: "IRF740", manufacturer: "Vishay", brand: "Vishay", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "400 V | 0.55 Ω max at 10 V", vDs: "400 V", vds: "400 V", rDsOn: "0.55 Ω max at 10 V", rdsOn: "0.55 Ω max at 10 V", package: "TO-220", application: "Offline power supplies" },
      { partNumber: "IRF9540N", manufacturer: "Infineon", brand: "Infineon", polarity: "P-channel", channel: "P-channel", type: "P-channel", ratings: "-100 V | 117 mΩ max at -10 V", vDs: "-100 V", vds: "-100 V", rDsOn: "117 mΩ max at -10 V", rdsOn: "117 mΩ max at -10 V", package: "TO-220", application: "High-side solar disconnect switches" }
    ]
  },
  "Ahmednagar": {
    examplePart: "IRF3710",
    exampleNote: "Worked Example (IRF3710): IRF3710 in a dairy-chiller drive. R_DS(on) 23 mΩ, T_A 40°C, θ_JA 62°C/W (TO-220, free air). At 5 A: P_cond = 5 x 5 x 0.023 = 0.58 W. Temp rise = 35.7°C. T_J = 75.7°C (Safe). At 8 A: P_cond = 1.47 W. Temp rise = 91.3°C. T_J = 131.3°C (Warning). A heatsink provides the necessary margin.",
    parts: [
      { partNumber: "IRF3710", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "100 V | 23 mΩ max at 10 V", vDs: "100 V", vds: "100 V", rDsOn: "23 mΩ max at 10 V", rdsOn: "23 mΩ max at 10 V", package: "TO-220", application: "Dairy refrigeration and pump drives" },
      { partNumber: "IRFB4110", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "100 V | 4.5 mΩ max at 10 V", vDs: "100 V", vds: "100 V", rDsOn: "4.5 mΩ max at 10 V", rdsOn: "4.5 mΩ max at 10 V", package: "TO-220", application: "High-efficiency chiller motor control" },
      { partNumber: "IRFP250N", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "200 V | 75 mΩ max at 10 V", vDs: "200 V", vds: "200 V", rDsOn: "75 mΩ max at 10 V", rdsOn: "75 mΩ max at 10 V", package: "TO-247", application: "Heavy processing equipment drives" },
      { partNumber: "IRF840", manufacturer: "Vishay", brand: "Vishay", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "500 V | 0.85 Ω max at 10 V", vDs: "500 V", vds: "500 V", rDsOn: "0.85 Ω max at 10 V", rdsOn: "0.85 Ω max at 10 V", package: "TO-220", application: "SMPS and industrial controls" },
      { partNumber: "IRFP460", manufacturer: "Vishay", brand: "Vishay", polarity: "N-channel", channel: "N-channel", type: "N-channel", ratings: "500 V | 0.27 Ω max at 10 V", vDs: "500 V", vds: "500 V", rDsOn: "0.27 Ω max at 10 V", rdsOn: "0.27 Ω max at 10 V", package: "TO-247", application: "Large power supplies and drives" },
      { partNumber: "IRLZ44N", manufacturer: "Infineon", brand: "Infineon", polarity: "N-channel logic level", channel: "N-channel logic level", type: "N-channel logic level", ratings: "55 V | 22 mΩ max at 10 V", vDs: "55 V", vds: "55 V", rDsOn: "22 mΩ max at 10 V", rdsOn: "22 mΩ max at 10 V", package: "TO-220", application: "Microcontroller logic-level switching" },
      { partNumber: "IRF9540N", manufacturer: "Infineon", brand: "Infineon", polarity: "P-channel", channel: "P-channel", type: "P-channel", ratings: "-100 V | 117 mΩ max at -10 V", vDs: "-100 V", vds: "-100 V", rDsOn: "117 mΩ max at -10 V", rdsOn: "117 mΩ max at -10 V", package: "TO-220", application: "High-side protection switches" }
    ]
  }
};

const commonWhatWeSupply = (city) => ({
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
        "Pin headers, JST connectors, terminal blocks, FFC/FPC and USB/DC connectors",
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
        "Pin headers, JST connectors, terminal blocks, FFC/FPC and USB/DC connectors",
        "Switches, and electromechanical or reed relays with 3V to 24V DC coils and up to 10A contacts"
      ]
    }
  ]
});

// Import mhCitiesData
import { mhCitiesData } from './mh_cities_data.js';

for (const c of mhCitiesData) {
  const city = c.city;
  if (mhPartsData[city]) {
    const data = mhPartsData[city];
    c.mosfetDistributor = c.mosfetDistributor || {};
    c.mosfetDistributor.popularParts = data.parts;

    c.mosfetCalculator = c.mosfetCalculator || {};
    c.mosfetCalculator.workedExample = {
      part: data.examplePart,
      note: data.exampleNote
    };
    c.mosfetCalculator.disclaimer = "Disclaimer: this is a quick estimate. Real designs also include switching loss, duty cycle, PCB cooling and the rise of R_DS(on) with temperature. Check the datasheet. R_DS(on) is quoted at 25°C and rises considerably when the junction is hot.";

    c.whatWeSupply = commonWhatWeSupply(city);
  } else if (city === 'Mumbai') {
    c.mosfetCalculator = c.mosfetCalculator || {};
    c.mosfetCalculator.disclaimer = "Disclaimer: this is a quick estimate. Real designs also include switching loss, duty cycle, PCB cooling and the rise of R_DS(on) with temperature. Check the datasheet. R_DS(on) is quoted at 25°C and rises considerably when the junction is hot.";
  }

  // Copy fixes
  if (city === 'Ahmednagar') {
    if (c.qualityCompliance && c.qualityCompliance.points) {
      c.qualityCompliance.points = c.qualityCompliance.points.map(pt => {
        if (pt.includes('Defence supply credentials since 1999')) {
          return "Defence supply since 1999 (client to confirm).";
        }
        return pt;
      });
      c.qualityCompliance.registeredAddressNote = "Registered address for vendor forms: B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034.";
    }
  }

  if (city === 'Nagpur') {
    if (c.qualityCompliance && c.qualityCompliance.points) {
      c.qualityCompliance.points = c.qualityCompliance.points.map(pt => {
        if (pt.includes('Vendor registration support')) {
          return "Vendor registration support with GST invoice and official documentation.";
        }
        return pt;
      });
      c.qualityCompliance.registeredAddressNote = "Registered Address: B-1101, Kinjal Heights Wing B, Wadia Street, Near Tardeo Bus Terminal, Mumbai 400034.";
    }
  }

  // Product links under internalLinks / Related
  c.productLinks = [
    { text: "MOSFETs", url: "/products/mosfet-transistor" },
    { text: "Integrated Circuits", url: "/products/integrated-circuit" },
    { text: "Microcontrollers", url: "/products/microcontroller" },
    { text: "Capacitors", url: "/products/capacitor" },
    { text: "Resistors", url: "/products/resistor" },
    { text: "Diodes", url: "/products/diode" },
    { text: "Relays", url: "/products/relay" }
  ];
}

// Write back to mh_cities_data.js
const fileExport = `export const mhCitiesData = ${JSON.stringify(mhCitiesData, null, 2)};\n`;
fs.writeFileSync(mhDataPath, fileExport, 'utf8');
console.log('✅ Successfully wrote updated mh_cities_data.js with exact MOSFET tables and What We Supply');

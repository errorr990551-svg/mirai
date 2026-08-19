// Technical Specifications & Applications Data for Mirai Technologies B2B Guides

export const applicationsData = [
  {
    slug: 'solar-inverter-components',
    title: 'Solar Inverter Power Semiconductors & Component BOM Guide',
    metaTitle: 'Solar Inverter Components & Power Semiconductors | Mirai Tech',
    metaDescription: 'Complete technical BOM guide for string solar inverters: High-voltage MOSFETs (1500V), IGBT modules, MPPT controllers, optocouplers & comparators.',
    primaryKeyword: 'components for solar inverter',
    secondaryKeywords: 'solar inverter mosfet, solar inverter igbt india, mppt power components, string inverter bom',
    author: 'Senior Applications Engineer, Mirai Technologies',
    heroContent: 'Technical walkthrough of solar string inverter power topologies, MPPT boost stages, grid-tie DC-AC inversion, and component selection criteria for high-efficiency solar conversion.',
    sections: [
      {
        heading: 'Solar String Inverter Topology & Power Stage Overview',
        content: 'Modern solar string inverters convert variable DC voltage from photovoltaic arrays into clean, grid-synchronized AC power. The power conversion architecture typically comprises two primary stages: a DC-DC Maximum Power Point Tracking (MPPT) boost stage and a full-bridge DC-AC inverter stage. Selecting power semiconductors with low conduction and switching losses is essential to achieve >98% peak operating efficiency.'
      },
      {
        heading: 'Why High-Voltage Rating (650V / 1200V / 1500V) Matters',
        content: 'Commercial and utility PV strings operate at elevated open-circuit voltages (Voc up to 1000V or 1500V DC). Switching devices in the MPPT boost converter must withstand continuous high DC bus voltage plus inductive voltage spikes caused by high-frequency PWM switching. Utilizing 1200V to 1500V rated MOSFETs and IGBTs prevents avalanche breakdown and ensures long thermal operating life under harsh outdoor ambient temperatures.'
      },
      {
        heading: 'Key Failure Modes & Auxiliary Power Supply Selection',
        content: 'Auxiliary switched-mode power supplies (SMPS) inside solar inverters power the gate drivers, sensing circuitry, and control microcontrollers directly from the high-voltage DC bus. High-voltage N-channel MOSFETs (such as STW4N150 or IRFP460) are critical for robust auxiliary flyback supplies. Optical isolators (PC817) isolate high-voltage power rails from delicate digital control units.'
      }
    ],
    bom: [
      { partNumber: 'STW4N150', category: 'Power MOSFET', specs: '1500V 4A N-Ch TO-247', application: 'Auxiliary SMPS High-Voltage Switch', slug: 'mosfet-transistor' },
      { partNumber: 'IRFP460', category: 'Power MOSFET', specs: '500V 20A N-Ch TO-247', application: 'MPPT Boost Converter Stage', slug: 'mosfet-transistor' },
      { partNumber: 'FGL60N100', category: 'Discrete IGBT', specs: '1000V 60A TO-247', application: 'Grid-Tie Full Bridge Inverter Stage', slug: 'igbts' },
      { partNumber: 'PC817', category: 'Optocoupler', specs: 'Phototransistor DIP-4', application: 'High-Voltage Galvanic Signal Isolation', slug: 'optocouplers' },
      { partNumber: 'LM339', category: 'Comparator IC', specs: 'Quad Voltage Comparator DIP-14', application: 'Grid Voltage & Current Sensing Protection', slug: 'integrated-circuit' }
    ]
  },
  {
    slug: 'welding-machine-components',
    title: 'Inverter Welding Machine IGBTs, MOSFETs & Repair Parts',
    metaTitle: 'Inverter Welding Machine IGBTs & MOSFETs India | Mirai Tech',
    metaDescription: 'Technical guide on inverter welder topology, IGBT thermal stress, switching frequency & repair sourcing. In-stock FGL60N100, IRFP460 & MOC3021.',
    primaryKeyword: 'igbt for welding machine',
    secondaryKeywords: 'welding inverter igbt india, welding machine mosfet, arc welder repair parts, fgl60n100 welding igbt',
    author: 'Field Applications Specialist, Power Electronics',
    heroContent: 'Inverter arc welding machines subject power switching devices to extreme thermal cycling and high current pulses. Learn how to select and replace heavy-duty IGBTs and driver ICs.',
    sections: [
      {
        heading: 'Inverter Welder Power Topology (Half-Bridge & Full-Bridge)',
        content: 'Modern MMA and TIG inverter welding power supplies replace heavy 50Hz transformers with high-frequency (20kHz to 100kHz) SMPS circuits. A full-bridge or half-bridge configuration of discrete IGBTs switches rectified mains power into a high-frequency ferrite transformer, significantly reducing machine weight while enabling precise arc current regulation.'
      },
      {
        heading: 'Why Welding Kills IGBTs: Thermal Stress & Inductive Spikes',
        content: 'Short circuits are an inherent part of the SMAW (stick welding) process during arc ignition and droplet transfer. When arc short circuits occur, switching transistors experience sudden current spikes. Insufficient gate drive voltage, excessive dv/dt, or degraded thermal paste under TO-247 packages lead to thermal runaway and collector-emitter shorts.'
      },
      {
        heading: 'Repair vs New-Build Sourcing Guidance',
        content: 'When replacing blown IGBTs in welding machines, always replace all switching devices in the affected bridge leg simultaneously. Mixing different batch codes or brands causes current imbalance across parallel devices. Clean heat sinks thoroughly, apply fresh high-conductivity thermal paste, and inspect gate driver optocouplers (MOC3021) and gate resistors.'
      }
    ],
    bom: [
      { partNumber: 'FGL60N100', category: 'Discrete IGBT', specs: '1000V 60A NPT TO-247', application: 'Main Inverter Switching Bridge', slug: 'igbts' },
      { partNumber: 'IRFP460', category: 'Power MOSFET', specs: '500V 20A N-Ch TO-247', application: 'Auxiliary Power Supply & High-Freq Inverter', slug: 'mosfet-transistor' },
      { partNumber: 'MOC3021', category: 'Optocoupler', specs: 'TRIAC Driver Isolator DIP-6', application: 'Gate Drive Isolation & Arc Control', slug: 'optocouplers' },
      { partNumber: 'LM339', category: 'Comparator IC', specs: 'Quad Comparator DIP-14', application: 'Over-Current & Arc Protection Circuit', slug: 'integrated-circuit' }
    ]
  },
  {
    slug: 'smps-repair-parts',
    title: 'Industrial SMPS Repair Components & Troubleshooting Guide',
    metaTitle: 'SMPS Repair Components & Parts India | Mirai Technologies',
    metaDescription: 'Industrial power supply & SMPS repair guide: Identifying blown switching MOSFETs, PWM controllers, bridge rectifiers & optocouplers with replacement specs.',
    primaryKeyword: 'smps repair components india',
    secondaryKeywords: 'smps repair parts, power supply repair components india, blown smps mosfet replacement, industrial smps ic',
    author: 'Senior Repair & Sourcing Engineer',
    heroContent: 'Comprehensive component breakdown for diagnosing and repairing industrial Switched-Mode Power Supplies (SMPS), open-frame power units, and DIN-rail supplies.',
    sections: [
      {
        heading: 'Common SMPS Failure Modes & Diagnostic Flow',
        content: 'Industrial SMPS units suffer failures due to input voltage surges, thermal degradation, and heavy load transients. The primary switching MOSFET, input bridge rectifier, and PWM driver IC account for over 80% of catastrophic failures. A dead SMPS usually indicates a blown primary fuse caused by a shorted primary MOSFET or bridge rectifier.'
      },
      {
        heading: 'Identifying Blown Components & Substitution Rules',
        content: 'When original SMPS switching devices are obsolete or unavailable, replacements must match or exceed: Breakdown Voltage (Vds), Continuous Drain Current (Id), and Maximum Gate Charge (Qg). Rds(on) must be equal to or lower than the original part to avoid excessive heating of the primary heat sink.'
      },
      {
        heading: 'Essential Auxiliary Circuit Components',
        content: 'Beyond the primary power switch, SMPS feedback networks rely on precision shunt regulators (TL431) and optocouplers (PC817) to maintain secondary voltage regulation. Always verify feedback optocouplers when an SMPS exhibits output voltage fluctuation or fails to start under load.'
      }
    ],
    bom: [
      { partNumber: 'IRFP460', category: 'Power MOSFET', specs: '500V 20A N-Ch TO-247', application: 'Primary Flyback / Forward Power Switch', slug: 'mosfet-transistor' },
      { partNumber: 'PC817', category: 'Optocoupler', specs: 'Phototransistor DIP-4', application: 'Secondary Feedback Voltage Isolation', slug: 'optocouplers' },
      { partNumber: 'LM339', category: 'Comparator IC', specs: 'Quad Voltage Comparator DIP-14', application: 'Over-Voltage & Short-Circuit Protection', slug: 'integrated-circuit' },
      { partNumber: 'NE555', category: 'Timer IC', specs: 'Precision Timer DIP-8', application: 'Auxiliary PWM Pulse Generation', slug: 'integrated-circuit' },
      { partNumber: 'LM7805', category: 'Voltage Regulator', specs: '5V 1.5A TO-220', application: 'Secondary Control Logic Voltage Rail', slug: 'integrated-circuit' }
    ]
  },
  {
    slug: 'ev-charger-components',
    title: 'EV Charger Power Electronics & Component Selection Guide',
    metaTitle: 'EV Charger Components & Power Electronics India | Mirai Tech',
    metaDescription: 'AC & DC EV charger power conversion guide: High-current MOSFETs, IGBTs, automotive-qualified rectifiers & gate drivers for EV charging stations.',
    primaryKeyword: 'ev charger components india',
    secondaryKeywords: 'ev charger mosfet india, ev charging power components, ac wallbox components, dc fast charger power stage',
    author: 'E-Mobility Applications Engineer',
    heroContent: 'Technical guide on AC Level 2 wallbox chargers and DC Fast Charging (DCFC) power conversion modules, PFC stages, and power semiconductor requirements.',
    sections: [
      {
        heading: 'AC vs DC EV Charging Power Topologies',
        content: 'AC EV charging stations (Level 1 & Level 2 Wallboxes) pass AC grid power directly to the electric vehicle on-board charger (OBC), requiring relay control, safety isolation, and energy metering. In contrast, DC Fast Chargers (DCFC) perform high-power AC-to-DC rectification and DC-DC conversion within the charger cabinet, delivering up to 1000V DC directly to the vehicle battery pack.'
      },
      {
        heading: 'PFC & DC-DC Power Stage Requirements',
        content: 'The active Power Factor Correction (PFC) stage of a fast EV charger boosts rectified grid voltage while maintaining a near-unity power factor. Power MOSFETs and IGBTs operating in the PFC and resonant LLC DC-DC stages must provide extremely low switching losses and high thermal reliability.'
      },
      {
        heading: 'Automotive Qualification & Quality Questions',
        content: 'While stationary EV chargers are not mounted inside the vehicle, infrastructure components face extreme outdoor thermal ambient conditions (-40°C to +85°C). Utilizing AEC-Q qualified semiconductors and industrial-grade optocouplers guarantees 24/7 continuous operation without field downtime.'
      }
    ],
    bom: [
      { partNumber: 'IRFP4668', category: 'Power MOSFET', specs: '200V 130A N-Ch TO-247', application: 'High-Current DC Switch & Synchronous Rectification', slug: 'mosfet-transistor' },
      { partNumber: 'FGL60N100', category: 'Discrete IGBT', specs: '1000V 60A TO-247', application: 'PFC Stage & DC Fast Charger Inverter', slug: 'igbts' },
      { partNumber: 'STP55NF06', category: 'Power MOSFET', specs: '60V 50A TO-220', application: 'Auxiliary Control & Lock Actuator Driver', slug: 'mosfet-transistor' },
      { partNumber: 'PC817', category: 'Optocoupler', specs: 'Phototransistor DIP-4', application: 'Safety Interlock & Signal Isolation', slug: 'optocouplers' }
    ]
  },
  {
    slug: 'motor-drive-components',
    title: 'Motor Drive & Variable Frequency Drive (VFD) Components',
    metaTitle: 'Motor Drive & VFD Components India | Mirai Technologies',
    metaDescription: 'Three-phase motor drive & VFD component guide: Inverter bridge IGBTs, gate drivers, optocouplers & Darlington arrays for motor speed control.',
    primaryKeyword: 'motor drive components india',
    secondaryKeywords: 'vfd repair parts india, motor driver ic supplier india, 3 phase inverter igbt, vfd mainboard components',
    author: 'Industrial Automation Lead Engineer',
    heroContent: 'Technical guide on three-phase motor drive power bridges, gate driver isolation, and component selection for VFD manufacturing and industrial repair.',
    sections: [
      {
        heading: 'Three-Phase Inverter Bridge Architecture',
        content: 'Variable Frequency Drives (VFDs) control AC induction and BLDC motors by converting AC mains power into DC, then using a three-phase six-switch inverter bridge to generate pulse-width modulated (PWM) AC output at variable frequencies.'
      },
      {
        heading: 'Gate Drive Isolation & dv/dt Protection',
        content: 'High-side IGBTs in a three-phase bridge float at high DC bus potential. Optoisolated gate drivers (such as MOC3021 or dedicated gate driver ICs) provide high common-mode transient immunity (CMTI) to prevent false triggering caused by steep dv/dt switching transients.'
      },
      {
        heading: 'IGBT vs MOSFET Selection by Power Level',
        content: 'For motor drives operating under 500W at high switching frequencies, power MOSFETs offer superior switching efficiency. For industrial VFD drives operating above 1kW at 400V AC mains, discrete 600V or 1200V IGBTs provide lower conduction loss and superior surge capability.'
      }
    ],
    bom: [
      { partNumber: 'FGL60N100', category: 'Discrete IGBT', specs: '1000V 60A TO-247', application: 'Three-Phase Inverter Bridge Arm', slug: 'igbts' },
      { partNumber: 'IRFP4668', category: 'Power MOSFET', specs: '200V 130A TO-247', application: 'Low-Voltage BLDC Motor Drive Stage', slug: 'mosfet-transistor' },
      { partNumber: 'ULN2003', category: 'Driver IC', specs: '7-Ch Darlington Array DIP-16', application: 'Relay & Indicator Peripheral Driver', slug: 'integrated-circuit' },
      { partNumber: 'TIP122', category: 'Transistor', specs: '100V 5A NPN Darlington TO-220', application: 'Braking Resistor Switch Driver', slug: 'transistors' },
      { partNumber: 'MOC3021', category: 'Optocoupler', specs: 'TRIAC/Gate Isolator DIP-6', application: 'High-Side Gate Isolation', slug: 'optocouplers' }
    ]
  },
  {
    slug: 'ups-inverter-components',
    title: 'UPS & Home Inverter Power Components & Repair BOM',
    metaTitle: 'UPS & Home Inverter Components India | Mirai Technologies',
    metaDescription: 'Home inverter & online UPS power component guide: Low-Rds MOSFETs (IRF3205), TRIACs, battery charger components & comparator ICs with pricing.',
    primaryKeyword: 'ups inverter components india',
    secondaryKeywords: 'home inverter mosfet india, ups repair parts, irf3205 inverter mosfet, bt136 triac ups',
    author: 'Power Supply Applications Specialist',
    heroContent: 'Comprehensive component guide for home sine-wave inverters, commercial UPS systems, and battery charging power stages.',
    sections: [
      {
        heading: 'Square Wave vs Pure Sine Wave Inverter Topologies',
        content: 'Home inverters operate from low DC battery voltages (12V, 24V, or 48V). Low-voltage, high-current N-channel MOSFETs (such as IRF3205 or IRFZ44N) switch primary transformer windings at 50Hz or high-frequency PWM to generate AC output voltage.'
      },
      {
        heading: 'Battery Charging Stage & Relay Switching',
        content: 'When mains utility power is present, the inverter operates in battery charger mode. SCRs and TRIACs (such as BT136) regulate charging current, while comparator ICs (LM339) monitor battery terminal voltage to prevent overcharging.'
      },
      {
        heading: 'Components That Fail Most in Service',
        content: 'Heavy surges, sudden short circuits on output sockets, or battery reversed polarity cause instant breakdown of MOSFETs in the low-voltage H-bridge. Replacing blown MOSFETs along with gate resistors and comparator ICs restores full inverter functionality.'
      }
    ],
    bom: [
      { partNumber: 'IRF3205', category: 'Power MOSFET', specs: '55V 110A N-Ch TO-220', application: '12V Primary Inverter H-Bridge Switch', slug: 'mosfet-transistor' },
      { partNumber: 'IRFZ44N', category: 'Power MOSFET', specs: '55V 49A N-Ch TO-220', application: 'Compact Inverter Power Stage', slug: 'mosfet-transistor' },
      { partNumber: 'LM339', category: 'Comparator IC', specs: 'Quad Comparator DIP-14', application: 'Battery High/Low Cutoff Sensing', slug: 'integrated-circuit' },
      { partNumber: 'BT136', category: 'TRIAC', specs: '600V 4A Sensitive Gate TO-220', application: 'Mains Changeover & Battery Charger Control', slug: 'igbts' },
      { partNumber: 'LM7805', category: 'Voltage Regulator', specs: '5V 1.5A TO-220', application: 'Microcontroller 5V Supply Rail', slug: 'integrated-circuit' }
    ]
  },
  {
    slug: 'mosfet-igbt-for-ev',
    title: 'MOSFETs & IGBTs for EV Design | Distributor for EV Manufacturers',
    metaTitle: 'MOSFETs & IGBTs for EV Design | Distributor for EV Manufacturers — Mirai Technologies',
    metaDescription: 'Power MOSFET & IGBT distributor for EV motor drives, chargers & battery management systems. Genuine stock from Infineon, ON Semi & more. RFQ-based pricing.',
    primaryKeyword: 'MOSFET IGBT distributor for EV manufacturers',
    secondaryKeywords: 'power electronics components for EV design, ev charger mosfet india, ev traction inverter igbt',
    author: 'Senior Applications Specialist, E-Mobility',
    heroContent: 'Technical component sourcing guide for electric vehicle traction inverters, on-board chargers (OBC), battery management systems (BMS), and DC-DC converters.',
    sections: [
      {
        heading: 'Why Component Sourcing Matters for EV Programs',
        content: 'Electric vehicle powertrains and charging subsystems operate under harsh thermal stress, continuous high-current pulses, and strict automotive safety standards. Sourcing authentic, fully traceable power MOSFETs and IGBTs directly from authorized distribution channels eliminates the risk of premature semiconductor failure, counterfeit devices, and costly assembly line downtime.'
      },
      {
        heading: 'Key Power Semiconductors for Electric Vehicles',
        content: 'EV traction inverters require high-voltage, high-current power devices (such as 650V to 1200V IGBT modules and SiC MOSFETs) operating at high switching efficiency. Battery Management Systems (BMS) utilize low Rds(on) power MOSFETs for cell balancing and solid-state disconnect switching. Fast optical isolation gate drivers protect low-voltage control ICs from high-voltage battery transients.'
      },
      {
        heading: 'Brands Stocked for Automotive & EV Engineering',
        content: 'Mirai Technologies stocks genuine power semiconductors from top manufacturers including STMicroelectronics, Infineon Technologies, ON Semiconductor (onsemi), Vishay, and International Rectifier. Full factory Certificate of Conformance (CoC), date code traceability, and GST invoicing accompany all shipments.'
      }
    ],
    bom: [
      { partNumber: 'IRFP4668', category: 'Power MOSFET', specs: '200V 130A N-Ch TO-247', application: 'High-Current Battery Disconnect & BMS Switch', slug: 'mosfet-transistor' },
      { partNumber: 'FGL60N100', category: 'Discrete IGBT', specs: '1000V 60A NPT TO-247', application: 'EV Traction Inverter & Main Drive Stage', slug: 'igbts' },
      { partNumber: 'STP55NF06', category: 'Power MOSFET', specs: '60V 50A TO-220', application: 'Low-Voltage Auxiliary DC-DC Switch', slug: 'mosfet-transistor' },
      { partNumber: 'PC817', category: 'Optocoupler', specs: 'Phototransistor DIP-4', application: 'Galvanic Signal Isolation for BMS Logic', slug: 'optocouplers' }
    ]
  },
  {
    slug: 'components-for-renewable-energy',
    title: 'Electronic Components for Renewable Energy & Solar Inverters',
    metaTitle: 'Electronic Components for Renewable Energy & Solar Inverters — Mirai Technologies',
    metaDescription: 'MOSFET, IGBT & IC distributor for solar inverter and renewable energy manufacturers in India. Genuine stock, low MOQ, GST invoice.',
    primaryKeyword: 'electronic components for renewable energy projects',
    secondaryKeywords: 'solar inverter MOSFET IGBT supplier India, MPPT components, grid tie inverter power semiconductors',
    author: 'Senior Solar Systems Engineer',
    heroContent: 'Comprehensive sourcing guide for photovoltaic (PV) solar inverters, wind energy converters, and energy storage systems (ESS). High-voltage MOSFETs, IGBTs, voltage regulators, and ICs.',
    sections: [
      {
        heading: 'Component Reliability in Solar & Renewable Systems',
        content: 'Solar string inverters and energy storage converters operate outdoors continuously under high ambient temperatures and solar radiation. High efficiency (>98%) is required to maximize solar energy yield. Utilizing low-loss power MOSFETs and robust IGBT modules in MPPT boost converters and grid-synchronous inverter stages guarantees multi-year operational reliability.'
      },
      {
        heading: 'Essential Power Devices for Solar Inverter Topologies',
        content: 'MPPT boost stages require 650V to 1500V N-channel MOSFETs capable of handling high DC input voltages from PV strings. The main DC-AC inversion bridge relies on 600V/1200V IGBTs for efficient sine-wave synthesis. Auxiliary power supplies and control units utilize linear/switching voltage regulators (LM7805, LM317) and precision quad comparators (LM339).'
      },
      {
        heading: 'Sourcing & BOM Optimization for Renewable Energy Manufacturers',
        content: 'Mirai Technologies delivers low-MOQ flexibility, scheduled buffer stock, and fast dispatch across India for solar inverter OEM and EMS manufacturers. All parts ship with manufacturer lot traceability and GST documentation.'
      }
    ],
    bom: [
      { partNumber: 'STW4N150', category: 'Power MOSFET', specs: '1500V 4A N-Ch TO-247', application: 'High-Voltage Auxiliary SMPS Switch', slug: 'mosfet-transistor' },
      { partNumber: 'IRFP460', category: 'Power MOSFET', specs: '500V 20A N-Ch TO-247', application: 'MPPT Boost Stage Power Switch', slug: 'mosfet-transistor' },
      { partNumber: 'FGL60N100', category: 'Discrete IGBT', specs: '1000V 60A TO-247', application: 'Grid-Tie Full Bridge Inverter Stage', slug: 'igbts' },
      { partNumber: 'LM339', category: 'Comparator IC', specs: 'Quad Voltage Comparator DIP-14', application: 'Grid Voltage Monitoring & Protection', slug: 'integrated-circuit' }
    ]
  },
  {
    slug: 'industrial-automation-components',
    title: 'Electronic Components for Industrial Automation & Control',
    metaTitle: 'Electronic Components for Industrial Automation — Mirai Technologies',
    metaDescription: 'Distributor of microcontrollers, ICs, optocouplers & MOSFETs for industrial automation and PLC manufacturers in India.',
    primaryKeyword: 'industrial automation components distributor India',
    secondaryKeywords: 'PLC components supplier India, sensor components, industrial control ICs, optocouplers for automation',
    author: 'Industrial Control Systems Engineer',
    heroContent: 'BOM component guide for industrial programmable logic controllers (PLCs), variable frequency drives (VFDs), robotics, and industrial sensor interface boards.',
    sections: [
      {
        heading: 'Uptime and Traceability in Industrial Automation',
        content: 'Factory automation systems require 24/7 uptime in electrically noisy environments with motor inductive kickbacks and transient spikes. Using genuine semiconductors with robust noise immunity reduces unplanned downtime and maintenance costs for OEM machinery builders.'
      },
      {
        heading: 'Core Components for PLCs, Drives & Sensors',
        content: 'Industrial control boards feature microcontrollers (Microchip PIC/AVR), 7-channel Darlington array drivers (ULN2003) for driving relays and solenoids, optical isolators (PC817, MOC3021) for field input protection, and power MOSFETs for actuator control.'
      },
      {
        heading: 'Authorized Sourcing & Rapid BOM Delivery',
        content: 'Mirai Technologies maintains extensive inventory in Mumbai with same-day quotation, direct GST invoicing, and express pan-India shipping for industrial automation original equipment manufacturers.'
      }
    ],
    bom: [
      { partNumber: 'ULN2003', category: 'Driver IC', specs: '7-Ch Darlington Array DIP-16', application: 'PLC Relay & Solenoid Actuator Driver', slug: 'integrated-circuit' },
      { partNumber: 'PC817', category: 'Optocoupler', specs: 'Phototransistor DIP-4', application: 'Industrial Digital Input Signal Isolation', slug: 'optocouplers' },
      { partNumber: 'TIP122', category: 'Transistor', specs: '100V 5A NPN Darlington TO-220', application: 'Heavy Duty DC Load Switch', slug: 'transistors' },
      { partNumber: 'LM358', category: 'Op-Amp IC', specs: 'Dual Operational Amplifier DIP-8', application: 'Analog Sensor Signal Conditioning', slug: 'integrated-circuit' }
    ]
  }
];


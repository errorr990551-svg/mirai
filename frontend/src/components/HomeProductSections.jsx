import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Zap, Activity, Radio, ShieldCheck, ArrowRight, Layers, Sliders, Box } from 'lucide-react';

const HomeProductSections = () => {
  return (
    <div className="bg-white">
      {/* SECTION 4: ACTIVE COMPONENTS */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Semiconductors &amp; Logic</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 mb-4">
              Active Components: ICs, MOSFETs, Transistors &amp; Microcontrollers
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              These are the parts that decide whether your board works. We stock them from brands your engineers already know.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-mirai-primary flex items-center justify-center mb-5">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-black text-slate-900 mb-3">
                  Integrated Circuits (ICs)
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Genuine ICs from Texas Instruments, STMicroelectronics, NXP, Microchip and Analog Devices.
                </p>
              </div>
              <Link to="/products/integrated-circuit" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                Browse ICs Catalog <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-black text-slate-900 mb-3">
                  MOSFET Transistors
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  High-performance power MOSFETs from Infineon, ON Semi, STMicroelectronics and Vishay, for power supplies, motor drives and switching circuits.
                </p>
              </div>
              <Link to="/products/mosfet-transistor" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                Browse Power MOSFETs <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-black text-slate-900 mb-3">
                  BJT Transistors
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  General-purpose and power transistors for motor control, switching and signal processing.
                </p>
              </div>
              <Link to="/products/transistor" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                Browse BJT Transistors <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-black text-slate-900 mb-3">
                  Microcontrollers (MCU)
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  High-performance MCUs for industrial automation, IoT and embedded designs.
                </p>
              </div>
              <Link to="/products/microcontroller" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                Browse Microcontrollers <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-black text-slate-900 mb-3">
                  Voltage Regulators
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Buck converters, boost regulators and low-dropout (LDO) linear regulators for stable power rails.
                </p>
              </div>
              <Link to="/products/voltage-regulator" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                Browse Voltage Regulators <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PASSIVE COMPONENTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">High-Reliability Passives</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 mb-4">
              Passive Components: 1,700+ SKUs of Resistors, Capacitors &amp; Inductors
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Passives are small, but a missing one can stop a whole production run. We keep over 1,700 passive component SKUs ready for industrial, automotive and consumer electronics manufacturing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-heading font-black text-slate-900 mb-2">
                  SMD Chip Resistors
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  1% precision thick-film resistors in 0402, 0603, 0805, 1206 and 1210 packages. Rated for -55°C to +155°C, suited to dense SMT assembly and automotive electronics.
                </p>
              </div>
              <Link to="/products/smd-resistor" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                View SMD Resistors <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-heading font-black text-slate-900 mb-2">
                  Through-Hole Resistors
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Carbon film and metal film axial resistors, 1/4W to 1W, in E24 values from 1 Ohm to 10M Ohm. Used for prototyping, power supplies, educational kits and PCB repair. Our full resistor catalog lists 1,300+ SKUs.
                </p>
              </div>
              <Link to="/products/through-hole-resistor" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                View Through-Hole Resistors <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-heading font-black text-slate-900 mb-2">
                  SMD Ceramic Capacitors (MLCC)
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  384+ MLCC SKUs in 0402 to 1812 packages with C0G/NP0 and X7R dielectrics, rated 16V to 50V. Used for RF tuning, decoupling and filtering. See the full capacitor catalog.
                </p>
              </div>
              <Link to="/products/smd-ceramic-capacitor" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                View MLCC Capacitors <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-heading font-black text-slate-900 mb-2">
                  Radial Electrolytic Capacitors
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Reliable aluminium electrolytics for power supply filtering, bulk decoupling and audio coupling.
                </p>
              </div>
              <Link to="/products/electrolytic-capacitor" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                View Electrolytic Capacitors <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-heading font-black text-slate-900 mb-2">
                  SMD Tantalum Capacitors
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  EIA case sizes A, B, C and D for compact, high-reliability designs.
                </p>
              </div>
              <Link to="/products/tantalum-capacitor" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                View Tantalum Capacitors <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-heading font-black text-slate-900 mb-2">
                  SMD Power Inductors
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  390+ shielded ferrite-core inductors for low EMI in DC-DC converters and switching regulators. See the full inductor catalog.
                </p>
              </div>
              <Link to="/products/smd-power-inductor" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                View Power Inductors <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link 
              to="/products/passive-components" 
              className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-7 py-3.5 rounded-xl hover:bg-slate-800 transition-all shadow-md"
            >
              View all passive components <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: DIODES, LEDS & TIMING */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Discrete &amp; Opto</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 mb-4">
              Diodes, LEDs &amp; Crystals for Protection, Rectification and Timing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all">
              <h3 className="text-lg font-heading font-black text-slate-900 mb-2">Zener Diodes</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                SOD-123 and SOT-23 surface-mount plus DO-35 and DO-41 axial packages, for voltage regulation and clamping.
              </p>
              <Link to="/products/zener-diode" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                View Zener Diodes <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all">
              <h3 className="text-lg font-heading font-black text-slate-900 mb-2">Rectifier &amp; Schottky Diodes</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                20V to 1000V and 0.5A to 10A, for AC-DC rectification, reverse polarity protection and freewheeling.
              </p>
              <Link to="/products/rectifier-schottky-diode" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                View Rectifiers &amp; Schottky <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all">
              <h3 className="text-lg font-heading font-black text-slate-900 mb-2">TVS Diodes</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                SMA, SMB, SMC and axial packages that absorb ESD spikes and surges before they reach your sensitive circuits. Our diode catalog lists 485+ SKUs.
              </p>
              <Link to="/products/tvs-diode" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                View TVS Diodes <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all">
              <h3 className="text-lg font-heading font-black text-slate-900 mb-2">LEDs &amp; Optoelectronics</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Single-colour, bi-colour and RGB LEDs in 3mm/5mm through-hole and 0603 to 1206 SMD.
              </p>
              <Link to="/products/led" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                View LEDs &amp; Opto <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all">
              <h3 className="text-lg font-heading font-black text-slate-900 mb-2">Crystals &amp; Crystal Oscillators</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Stable quartz resonators and oscillators for MCU timing, RTC circuits and wireless communication.
              </p>
              <Link to="/products/crystal-oscillator" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                View Crystals &amp; Oscillators <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CONNECTORS & ELECTROMECHANICAL */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-mirai-primary font-bold text-xs uppercase tracking-widest block mb-2">Board &amp; Panel Interconnects</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 mb-4">
              Connectors, Switches &amp; Relays for Reliable Interconnects
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              340+ connector SKUs and 185+ electromechanical parts, so your board connects to the rest of the product without trouble.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all">
              <h3 className="text-lg font-heading font-black text-slate-900 mb-2">Pin Headers</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                2.54mm, 2.0mm and 1.27mm pitch, single or double row, straight or right-angle.
              </p>
              <Link to="/products/pin-header" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                View Pin Headers <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all">
              <h3 className="text-lg font-heading font-black text-slate-900 mb-2">JST &amp; Wire-to-Board Connectors</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                JST-XH and JST-PH, pre-crimped assemblies, wafers, housings and terminals.
              </p>
              <Link to="/products/jst-wire-connector" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                View JST Connectors <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all">
              <h3 className="text-lg font-heading font-black text-slate-900 mb-2">Terminal Blocks &amp; Screw Terminals</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                2.54mm to 5.08mm pitch, for high-current inputs, relay outputs and automation wiring.
              </p>
              <Link to="/products/terminal-block" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                View Terminal Blocks <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all">
              <h3 className="text-lg font-heading font-black text-slate-900 mb-2">FFC / FPC Connectors</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                ZIF and Non-ZIF, 0.5mm and 1.0mm pitch, for displays and camera modules.
              </p>
              <Link to="/products/ffc-fpc-connector" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                View FFC/FPC Connectors <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all">
              <h3 className="text-lg font-heading font-black text-slate-900 mb-2">USB &amp; DC Power Connectors</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                USB-C, USB-A, Micro-USB and DC barrel jacks. See all connectors.
              </p>
              <Link to="/products/usb-power-connector" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                View USB &amp; DC Connectors <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all">
              <h3 className="text-lg font-heading font-black text-slate-900 mb-2">Switches</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Tactile (3x3mm to 12x12mm), slide, DIP, toggle, rocker and limit switches.
              </p>
              <Link to="/products/switch" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                View Switches <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:border-mirai-primary/40 hover:shadow-md transition-all">
              <h3 className="text-lg font-heading font-black text-slate-900 mb-2">Relays</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Electromechanical and reed relays, 3V/5V/12V/24V coils, up to 10A contacts. See all electromechanical components.
              </p>
              <Link to="/products/relay" className="inline-flex items-center gap-1.5 text-xs font-bold text-mirai-primary hover:text-blue-800">
                View Relays <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeProductSections;

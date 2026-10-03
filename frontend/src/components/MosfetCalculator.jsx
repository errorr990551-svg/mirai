import React, { useState } from 'react';
import { Calculator, AlertTriangle, CheckCircle, Flame, ArrowRight, RotateCcw } from 'lucide-react';

const MosfetCalculator = ({ calculatorData, scrollToForm }) => {
  if (!calculatorData) return null;

  const defaultValues = calculatorData.workedExample ? {
    iRms: calculatorData.workedExample.iRms || 10,
    rDsOn: calculatorData.workedExample.rDsOn || 17.5,
    tA: calculatorData.workedExample.tA || 40,
    thetaJa: calculatorData.workedExample.thetaJa || 62
  } : {
    iRms: 10,
    rDsOn: 17.5,
    tA: 40,
    thetaJa: 62
  };

  const [iRms, setIRms] = useState(defaultValues.iRms);
  const [rDsOn, setRDsOn] = useState(defaultValues.rDsOn);
  const [tA, setTA] = useState(defaultValues.tA);
  const [thetaJa, setThetaJa] = useState(defaultValues.thetaJa);

  // Calculations
  // P_cond = I_RMS^2 * R_DS(on) in Ohms
  const current = parseFloat(iRms) || 0;
  const resistanceOhms = (parseFloat(rDsOn) || 0) / 1000;
  const ambient = parseFloat(tA) || 0;
  const thermalRes = parseFloat(thetaJa) || 0;

  const pCond = current * current * resistanceOhms;
  const deltaT = pCond * thermalRes;
  const tJ = ambient + deltaT;

  const isWarning = tJ > 150;
  const isCaution = tJ > 125 && tJ <= 150;

  const resetToWorkedExample = () => {
    setIRms(defaultValues.iRms);
    setRDsOn(defaultValues.rDsOn);
    setTA(defaultValues.tA);
    setThetaJa(defaultValues.thetaJa);
  };

  return (
    <section className="py-20 bg-slate-900 text-white border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Calculator className="w-3.5 h-3.5" /> Interactive Engineering Tool
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-white mb-3">
            {calculatorData.h2 || "MOSFET Thermal & Power Loss Calculator"}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {calculatorData.purpose || "Calculate conduction loss and estimate junction temperature to prevent thermal breakdown before finalizing your BOM."}
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Panel (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between pb-6 border-b border-slate-700/60 mb-6">
              <span className="font-heading font-bold text-sm tracking-wider uppercase text-slate-300">
                Operating Parameters
              </span>
              <button 
                onClick={resetToWorkedExample}
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                title="Reset to typical worked example values"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset to Example
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* RMS Current */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  RMS Current <span className="font-mono text-blue-400">I_RMS (A)</span>
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.5"
                    min="0"
                    value={iRms}
                    onChange={(e) => setIRms(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-base focus:outline-none focus:border-mirai-primary transition-colors"
                  />
                  <span className="absolute right-4 top-3.5 text-xs font-mono text-slate-400">Amps</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">Effective load current through MOSFET channel</p>
              </div>

              {/* On-Resistance */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  On-Resistance <span className="font-mono text-blue-400">R_DS(on) (mΩ)</span>
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.5"
                    min="0"
                    value={rDsOn}
                    onChange={(e) => setRDsOn(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-base focus:outline-none focus:border-mirai-primary transition-colors"
                  />
                  <span className="absolute right-4 top-3.5 text-xs font-mono text-slate-400">mΩ</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">Drain-source on-state resistance at operating gate drive</p>
              </div>

              {/* Ambient Temperature */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Ambient Temp <span className="font-mono text-blue-400">T_A (°C)</span>
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="1"
                    value={tA}
                    onChange={(e) => setTA(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-base focus:outline-none focus:border-mirai-primary transition-colors"
                  />
                  <span className="absolute right-4 top-3.5 text-xs font-mono text-slate-400">°C</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">Ambient air temp inside operating equipment enclosure</p>
              </div>

              {/* Thermal Resistance */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Thermal Res <span className="font-mono text-blue-400">θ_JA (°C/W)</span>
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="1"
                    min="1"
                    value={thetaJa}
                    onChange={(e) => setThetaJa(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-base focus:outline-none focus:border-mirai-primary transition-colors"
                  />
                  <span className="absolute right-4 top-3.5 text-xs font-mono text-slate-400">°C/W</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">Junction-to-ambient resistance (e.g. ~62°C/W free-air TO-220, ~5-15°C/W on heatsink)</p>
              </div>
            </div>

            {/* Formula Reference */}
            <div className="mt-8 pt-6 border-t border-slate-700/60 bg-slate-900/60 p-4 rounded-2xl text-xs text-slate-300 space-y-1.5 font-mono">
              <div className="text-slate-400 uppercase text-[10px] font-bold tracking-widest">Engineering Formulas:</div>
              <div>• Conduction Loss: <span className="text-blue-400">P_cond = (I_RMS)² × R_DS(on)</span></div>
              <div>• Junction Temperature: <span className="text-blue-400">T_J = T_A + (P_cond × θ_JA)</span></div>
            </div>
          </div>

          {/* Outputs & Warning Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl text-left">
              <span className="font-heading font-bold text-xs tracking-wider uppercase text-slate-400 block mb-4">
                Calculation Results
              </span>

              {/* Conduction Loss */}
              <div className="flex items-center justify-between py-3 border-b border-slate-700/60">
                <span className="text-slate-300 text-sm">Conduction Loss (P_cond):</span>
                <span className="font-mono text-lg font-bold text-white">
                  {pCond.toFixed(2)} W
                </span>
              </div>

              {/* Temperature Rise */}
              <div className="flex items-center justify-between py-3 border-b border-slate-700/60">
                <span className="text-slate-300 text-sm">Temperature Rise (ΔT):</span>
                <span className="font-mono text-lg font-bold text-white">
                  +{deltaT.toFixed(1)} °C
                </span>
              </div>

              {/* Junction Temperature */}
              <div className="flex items-center justify-between py-4 border-b border-slate-700/60">
                <span className="text-slate-200 text-sm font-bold">Est. Junction Temp (T_J):</span>
                <span className={`font-mono text-2xl font-black ${
                  isWarning ? 'text-rose-400' : isCaution ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {tJ.toFixed(1)} °C
                </span>
              </div>

              {/* Status Badge */}
              <div className="mt-4 mb-6">
                {isWarning ? (
                  <div className="p-4 bg-rose-950/70 border border-rose-700/80 rounded-2xl flex items-start gap-3">
                    <Flame className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wide">
                        High Risk: Overheating Warning
                      </h4>
                      <p className="text-xs text-rose-200 mt-1 leading-relaxed">
                        Junction temperature is above 150°C. Add a heatsink, improve cooling, or choose a MOSFET with lower R_DS(on).
                      </p>
                    </div>
                  </div>
                ) : isCaution ? (
                  <div className="p-4 bg-amber-950/60 border border-amber-700/80 rounded-2xl flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                        Caution: High Thermal Load
                      </h4>
                      <p className="text-xs text-amber-200 mt-1 leading-relaxed">
                        T_J is near the maximum rating. Ensure adequate airflow or consider heatsinking to maintain reliability.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-950/60 border border-emerald-700/80 rounded-2xl flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                        Thermal Range Safe
                      </h4>
                      <p className="text-xs text-emerald-200 mt-1 leading-relaxed">
                        Estimated junction temperature is within standard 125°C continuous operating limits.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={scrollToForm}
                className="w-full bg-mirai-primary hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                Request Instant GST Quote <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Worked Example Details */}
            {calculatorData.workedExample && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 text-xs text-slate-300">
                <span className="font-bold text-blue-400 uppercase tracking-wider block mb-1">
                  Example Case ({calculatorData.workedExample.part || "Standard MOSFET"}):
                </span>
                <p className="leading-relaxed text-slate-300">
                  {calculatorData.workedExample.note || "Calculated using typical datasheet values at ambient operating temperature."}
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-xs text-slate-400 max-w-4xl mx-auto italic">
          {calculatorData.disclaimer || "Disclaimer: this is a quick estimate. Real designs also include switching loss, duty cycle, PCB cooling and the rise of R_DS(on) with temperature. Check the datasheet."}
        </div>

      </div>
    </section>
  );
};

export default MosfetCalculator;

import React from 'react';
import { X, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1E1B18]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] w-full max-w-xl rounded-sm shadow-2xl border border-[#2C2926]/10 p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#504A41] hover:text-[#1E1B18]"
          aria-label="Close size guide"
        >
          <X size={18} />
        </button>

        <h3 className="font-serif text-2xl text-[#24211E] mb-1">REWERA Sizing Guide</h3>
        <p className="text-xs text-[#7A746B] mb-6">
          Designed with relaxed Gen Z silhouettes and adjustable ties. Getting the fit right on your first order saves shipping carbon emissions.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#2C2926]/15 text-[#7A746B] uppercase tracking-wider font-semibold">
                <th className="py-2.5 pr-4">Size</th>
                <th className="py-2.5 px-3">Bust (cm)</th>
                <th className="py-2.5 px-3">Waist (cm)</th>
                <th className="py-2.5 px-3">Hips (cm)</th>
                <th className="py-2.5 pl-3">Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C2926]/8 tabular-nums">
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-[#24211E]">XS (0–2)</td>
                <td className="py-2.5 px-3 text-[#504A41]">78–83</td>
                <td className="py-2.5 px-3 text-[#504A41]">60–64</td>
                <td className="py-2.5 px-3 text-[#504A41]">86–90</td>
                <td className="py-2.5 pl-3 text-[#504A41]">Petite / Reg</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-[#24211E]">S (4–6)</td>
                <td className="py-2.5 px-3 text-[#504A41]">84–89</td>
                <td className="py-2.5 px-3 text-[#504A41]">65–70</td>
                <td className="py-2.5 px-3 text-[#504A41]">91–96</td>
                <td className="py-2.5 pl-3 text-[#504A41]">Regular</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-[#24211E]">M (8–10)</td>
                <td className="py-2.5 px-3 text-[#504A41]">90–95</td>
                <td className="py-2.5 px-3 text-[#504A41]">71–76</td>
                <td className="py-2.5 px-3 text-[#504A41]">97–102</td>
                <td className="py-2.5 pl-3 text-[#504A41]">Regular</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-[#24211E]">L (12–14)</td>
                <td className="py-2.5 px-3 text-[#504A41]">96–102</td>
                <td className="py-2.5 px-3 text-[#504A41]">77–83</td>
                <td className="py-2.5 px-3 text-[#504A41]">103–108</td>
                <td className="py-2.5 pl-3 text-[#504A41]">Relaxed</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-semibold text-[#24211E]">XL (16)</td>
                <td className="py-2.5 px-3 text-[#504A41]">103–109</td>
                <td className="py-2.5 px-3 text-[#504A41]">84–90</td>
                <td className="py-2.5 px-3 text-[#504A41]">109–115</td>
                <td className="py-2.5 pl-3 text-[#504A41]">Relaxed</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-[#F5EFE6] rounded-xs text-xs text-[#504A41] space-y-1.5">
          <p className="font-medium text-[#24211E]">Fit Recommendation:</p>
          <p>
            Most REWERA pieces feature adjustable tie-backs and draped wraps. If you are between sizes, we recommend sizing down for a closer corset fit or sizing up for relaxed resort draping.
          </p>
        </div>
      </div>
    </div>
  );
};

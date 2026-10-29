import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Download, Printer, ArrowLeft, FileCode, Copy } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import CalloutBox from '../components/ui/CalloutBox';
import { currentAlgorithm } from '../data/algorithms';

export const DetailedReport = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(currentAlgorithm, null, 2)], {
      type: 'text/plain'
    });
    element.href = URL.createObjectURL(file);
    element.download = `MetaEquiv_Report_${currentAlgorithm.reportId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Bar with Print & Download Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 print:hidden">
        <div>
          <span className="text-xs text-slate-500 font-medium">
            Results / Detailed report
          </span>
          <p className="text-xs text-slate-400 mt-0.5">
            Document layout, not a dashboard — this is what gets exported.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" icon={Printer} onClick={handlePrint}>
            Print
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Download}
            onClick={handleDownload}
          >
            Download report
          </Button>
        </div>
      </div>

      {/* Main Document Container (White Paper Style) */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 text-xs text-slate-800 leading-relaxed font-sans">
        {/* Report Header */}
        <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Equivalence and Novelty Analysis Report
            </h1>
            <p className="text-slate-500 font-mono text-[11px]">
              Report {currentAlgorithm.reportId} · Generated {currentAlgorithm.uploadedDate} · MetaEquiv v0.9 · Sample/Demo content
            </p>
          </div>

          <div className="shrink-0">
            <Badge variant={currentAlgorithm.verdict.category} size="md">
              {currentAlgorithm.verdict.category}
            </Badge>
          </div>
        </div>

        {/* Section 1: Algorithm information */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            1 Algorithm information
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-md bg-slate-50 border border-slate-100">
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                Name
              </span>
              <span className="font-semibold text-slate-800 text-xs block mt-0.5">
                {currentAlgorithm.name}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                Short code
              </span>
              <span className="font-mono font-bold text-slate-800 text-xs block mt-0.5">
                {currentAlgorithm.shortCode}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                Category
              </span>
              <span className="text-slate-700 text-xs block mt-0.5">
                {currentAlgorithm.category}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                Equations submitted
              </span>
              <span className="font-bold text-slate-800 text-xs block mt-0.5">
                {currentAlgorithm.equationsSubmitted}
              </span>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed px-1">
            {currentAlgorithm.description}
          </p>
        </div>

        {/* Section 2: Comparison summary */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            2 Comparison summary
          </h2>
          <p className="text-slate-600 px-1">
            The algorithm was compared against PSO, GWO, WOA and SCA. One reference — PSO —
            returned a high structural match; the remaining three were structurally distinct in
            variables, update rule and transformation family.
          </p>

          <div className="overflow-x-auto rounded border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold">
                  <th className="px-4 py-2">Reference</th>
                  <th className="px-4 py-2">Structural match</th>
                  <th className="px-4 py-2">Transformation match</th>
                  <th className="px-4 py-2">Category (Sample/Demo)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-4 py-2.5 font-bold font-mono text-slate-900">PSO</td>
                  <td className="px-4 py-2.5 text-emerald-700 font-semibold">Very high</td>
                  <td className="px-4 py-2.5 text-emerald-700 font-semibold">Very high</td>
                  <td className="px-4 py-2.5">
                    <Badge variant="Highly similar">Highly similar</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-bold font-mono text-slate-900">GWO</td>
                  <td className="px-4 py-2.5 text-slate-500">Low</td>
                  <td className="px-4 py-2.5 text-amber-700 font-medium">Moderate</td>
                  <td className="px-4 py-2.5">
                    <Badge variant="Distinct">Distinct</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-bold font-mono text-slate-900">WOA</td>
                  <td className="px-4 py-2.5 text-slate-500">Low</td>
                  <td className="px-4 py-2.5 text-slate-500">Low</td>
                  <td className="px-4 py-2.5">
                    <Badge variant="Distinct">Distinct</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Equation comparison */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            3 Equation comparison
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded border border-slate-200 bg-slate-50/50 space-y-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">
                MPSO (canonical)
              </span>
              <div className="font-serif text-xs text-slate-900 space-y-1.5 pt-1 font-medium">
                <div>V<sub>t+1</sub> ← w(t) · V<sub>t</sub> ⊕ α₁ (P ⊖ X) ⊕ α₂ (G ⊖ X)</div>
                <div>X<sub>t+1</sub> ← X<sub>t</sub> ⊕ V<sub>t+1</sub></div>
              </div>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-slate-50/50 space-y-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">
                PSO (canonical)
              </span>
              <div className="font-serif text-xs text-slate-900 space-y-1.5 pt-1 font-medium">
                <div>V<sub>t+1</sub> ← w · V<sub>t</sub> ⊕ α₁ (P ⊖ X) ⊕ α₂ (G ⊖ X)</div>
                <div>X<sub>t+1</sub> ← X<sub>t</sub> ⊕ V<sub>t+1</sub></div>
              </div>
            </div>
          </div>

          <p className="text-slate-500 text-[11px] px-1 italic">
            Term-by-term alignment succeeds for every term. The single divergence is the inertia
            coefficient, constant in PSO and iteration-dependent in MPSO.
          </p>
        </div>

        {/* Section 4: Structural comparison */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            4 Structural comparison
          </h2>

          <div className="overflow-x-auto rounded border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold">
                  <th className="px-4 py-2 w-1/3">Feature</th>
                  <th className="px-4 py-2 w-1/3">MPSO</th>
                  <th className="px-4 py-2 w-1/3">PSO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-4 py-2.5 font-semibold text-slate-900">Update rule type</td>
                  <td className="px-4 py-2.5 text-slate-700">Additive, velocity-mediated</td>
                  <td className="px-4 py-2.5 text-slate-700">Additive, velocity-mediated</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-semibold text-slate-900">Memory depth</td>
                  <td className="px-4 py-2.5 text-slate-700">2</td>
                  <td className="px-4 py-2.5 text-slate-700">2</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-semibold text-slate-900">Stochastic components</td>
                  <td className="px-4 py-2.5 text-slate-700">2</td>
                  <td className="px-4 py-2.5 text-slate-700">2</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-semibold text-slate-900">Control parameters</td>
                  <td className="px-4 py-2.5 text-slate-700">3 (w time-varying)</td>
                  <td className="px-4 py-2.5 text-slate-700">3 (w constant)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 5: Similarity findings */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            5 Similarity findings
          </h2>
          <p className="text-slate-600 px-1">
            Structural scoring yields an overall similarity of <span className="font-bold text-slate-900">0.91</span> against canonical PSO. The update rule, state variables, and operator inventory are identical.
          </p>
        </div>

        {/* Section 6: Equivalence classification */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            6 Equivalence classification
          </h2>
          <p className="text-slate-600 px-1">
            Assigned category: <span className="font-bold text-amber-800">Highly similar</span>. MPSO represents a parameter variation of Particle Swarm Optimization where the static inertia weight is modulated across iterations.
          </p>
        </div>

        {/* Section 7: Novelty evaluation */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            7 Novelty evaluation
          </h2>
          <p className="text-slate-600 px-1">
            Zero new mathematical operators, state variables, or transformation families were introduced. The algorithm does not satisfy the structural threshold for novelty classification.
          </p>
        </div>

        {/* Blue Placeholder Notice from PDF Page 8, 9, 10 */}
        <CalloutBox variant="blue" className="text-xs">
          Every similarity value, count and verdict on this page is placeholder content created
          for interface design only. Replace all of it with your system&apos;s real output before Review-2.
        </CalloutBox>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 print:hidden">
        <Button
          variant="outline"
          size="sm"
          icon={ArrowLeft}
          onClick={() => navigate(`/results/${id || 'A-0219'}`)}
        >
          Back to result
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={FileCode}
            onClick={() => alert('LaTeX export generated.')}
          >
            Export as LaTeX
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={Copy}
            onClick={() => alert('Citation copied to clipboard.')}
          >
            Copy citation
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Download}
            onClick={handleDownload}
          >
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailedReport;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnalysisStepper from '../components/analysis/AnalysisStepper';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import CalloutBox from '../components/ui/CalloutBox';
import { currentAlgorithm } from '../data/algorithms';

export const EquationRepresentation = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* 6-step Pipeline Stepper with Step 2 Active */}
      <AnalysisStepper currentStep={2} />

      {/* Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Equation representation
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Check that every symbol was read correctly before continuing. Edits here are re-parsed immediately.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/algorithms/new')}
          >
            Edit equations
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/analysis/structure')}
          >
            Continue to structure
          </Button>
        </div>
      </div>

      {/* Two-Column Card: As Entered vs Canonical Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: As entered */}
        <Card
          title="As entered"
          action={<Badge size="xs">3 equations</Badge>}
          bodyClassName="p-4"
        >
          <div className="font-mono text-xs text-slate-800 bg-slate-50 rounded-md p-4 border border-slate-200/80 space-y-3 leading-relaxed">
            {currentAlgorithm.rawEquations.map((eq, i) => (
              <div key={i} className="py-1">
                {eq}
              </div>
            ))}
          </div>
        </Card>

        {/* Right: Canonical form */}
        <Card
          title="Canonical form"
          action={<Badge size="xs">Normalised symbols</Badge>}
          bodyClassName="p-4 space-y-4"
        >
          <div className="bg-slate-50/70 rounded-md p-4 border border-slate-200/80 space-y-3 font-serif text-sm text-slate-900">
            {currentAlgorithm.canonicalPlain.map((eq, i) => (
              <div key={i} className="py-1 tracking-wide font-medium">
                {eq}
              </div>
            ))}
          </div>

          <CalloutBox variant="blue" className="text-xs">
            Canonical form is what the comparison engine reads. Aliases such as{' '}
            <span className="font-mono font-semibold">c₁ r₁</span> and{' '}
            <span className="font-mono font-semibold">α₁</span> are unified so that notation
            differences do not hide structural equivalence.
          </CalloutBox>
        </Card>
      </div>

      {/* Bottom Grid: Symbol Table & Operator Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Symbol Table */}
        <Card
          title="Symbol table"
          action={<Badge size="xs">9 symbols resolved</Badge>}
          bodyClassName="p-0 overflow-x-auto"
        >
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50 text-slate-500 font-semibold">
                <th className="px-4 py-2.5">Symbol</th>
                <th className="px-4 py-2.5">Role</th>
                <th className="px-4 py-2.5">Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentAlgorithm.symbols.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="px-4 py-2.5 font-serif font-bold text-slate-900 whitespace-nowrap">
                    {item.symbol}
                  </td>
                  <td className="px-4 py-2.5 text-slate-600 font-medium">
                    {item.role}
                  </td>
                  <td className="px-4 py-2.5 text-slate-500">
                    {item.interpretation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Operator Inventory */}
        <Card
          title="Operator inventory"
          action={<Badge size="xs">Extracted from canonical form</Badge>}
          bodyClassName="p-4 space-y-4"
        >
          <ul className="space-y-2 text-xs text-slate-700">
            {currentAlgorithm.operators.map((op, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <span>{op}</span>
              </li>
            ))}
          </ul>

          <CalloutBox variant="neutral" className="text-xs">
            No spiral, encircling or coefficient-vector operator detected. Those are the operators
            that distinguish GWO and WOA.
          </CalloutBox>
        </Card>
      </div>
    </div>
  );
};

export default EquationRepresentation;

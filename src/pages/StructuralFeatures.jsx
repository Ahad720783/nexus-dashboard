import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnalysisStepper from '../components/analysis/AnalysisStepper';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { currentAlgorithm } from '../data/algorithms';

export const StructuralFeatures = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Stepper with Step 3 Active */}
      <AnalysisStepper currentStep={3} />

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Structural features of {currentAlgorithm.shortCode}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Features are read from the canonical equations, not from the description text.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/analysis/equations')}
          >
            Back
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/compare')}
          >
            Run comparison
          </Button>
        </div>
      </div>

      {/* 3 Cards: Search Strategy, Exploration Mechanism, Exploitation Mechanism */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Search strategy */}
        <Card title="Search strategy" bodyClassName="p-4">
          <ul className="space-y-2 text-xs text-slate-700">
            {currentAlgorithm.structuralFeatures.searchStrategy.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Exploration mechanism */}
        <Card title="Exploration mechanism" bodyClassName="p-4">
          <ul className="space-y-2 text-xs text-slate-700">
            {currentAlgorithm.structuralFeatures.explorationMechanism.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Exploitation mechanism */}
        <Card title="Exploitation mechanism" bodyClassName="p-4">
          <ul className="space-y-2 text-xs text-slate-700">
            {currentAlgorithm.structuralFeatures.exploitationMechanism.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Feature Vector Table */}
      <Card
        title="Feature vector"
        action={
          <span className="text-[11px] text-slate-400">
            Used for structural matching · Sample/Demo
          </span>
        }
        bodyClassName="p-0 overflow-x-auto"
      >
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50 text-slate-500 font-semibold">
              <th className="px-4 py-2.5">Feature</th>
              <th className="px-4 py-2.5">Value</th>
              <th className="px-4 py-2.5">Evidence in equations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentAlgorithm.featureVector.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/60">
                <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">
                  {row.feature}
                </td>
                <td className="px-4 py-3 text-slate-700 font-medium">
                  {row.value}
                </td>
                <td className="px-4 py-3 font-mono text-[11px] text-slate-500">
                  {row.evidence}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default StructuralFeatures;

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import CalloutBox from '../components/ui/CalloutBox';
import { currentAlgorithm } from '../data/algorithms';

export const NoveltyEvaluation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const categories = [
    {
      name: 'Equivalent',
      desc: 'Same equations after normalisation. Only naming or notation differs.',
      assigned: false
    },
    {
      name: 'Highly similar — assigned',
      desc: 'Structure preserved; differences limited to parameter schedules or coefficients.',
      assigned: true
    },
    {
      name: 'Modified',
      desc: 'A new operator or term added to an existing structure.',
      assigned: false
    },
    {
      name: 'Potentially novel',
      desc: 'New transformation family or search mechanism with no close match in the library.',
      assigned: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Novelty evaluation
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Novelty is assessed against what the equations introduce, not against reported
            performance. Sample/Demo
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => alert('Novelty summary exported.')}
          >
            Export summary
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/reports/${id || 'A-0219'}`)}
          >
            Open detailed report
          </Button>
        </div>
      </div>

      {/* 4 Category Cards (with Highly Similar Highlighted) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className={`p-4 rounded-lg border text-xs transition-all ${
              cat.assigned
                ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/20 shadow-xs'
                : 'bg-white border-slate-200 opacity-80'
            }`}
          >
            <span
              className={`font-bold block text-xs ${
                cat.assigned ? 'text-amber-900' : 'text-slate-700'
              }`}
            >
              {cat.name}
            </span>
            <p className="text-slate-500 mt-1 leading-relaxed">{cat.desc}</p>
          </div>
        ))}
      </div>

      {/* Two Columns: Novelty Criteria vs What this means */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Novelty criteria (approx 7 cols) */}
        <div className="lg:col-span-7">
          <Card
            title="Novelty criteria"
            action={<Badge size="xs">6 checks</Badge>}
            bodyClassName="p-0 overflow-x-auto"
          >
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50 text-slate-500 font-semibold">
                  <th className="px-4 py-2.5">Criterion</th>
                  <th className="px-4 py-2.5">Outcome</th>
                  <th className="px-4 py-2.5">Basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentAlgorithm.noveltyCriteria.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-semibold text-slate-800">
                      {item.criterion}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={item.isYes ? 'yes' : 'no'}>
                        {item.outcome}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{item.basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Right: What this means (approx 5 cols) */}
        <div className="lg:col-span-5">
          <Card
            title="What this means"
            bodyClassName="p-5 space-y-4 flex flex-col justify-between h-full"
          >
            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                One criterion out of six indicates a change, and that change is confined to a
                control-parameter schedule. On this basis the algorithm is classified as{' '}
                <span className="font-semibold text-slate-900">Highly similar</span> rather than
                novel.
              </p>
              <p>
                To move toward a novelty claim, the equations would need a structural change — a
                new operator, a new state variable, or a transformation outside the linear
                family.
              </p>

              <CalloutBox variant="blue" className="text-xs">
                This classification describes equation structure only. It is not a judgement on
                the algorithm&apos;s usefulness, convergence behaviour or empirical performance, none of
                which this system measures.
              </CalloutBox>
            </div>

            <div className="flex items-center gap-2.5 pt-4 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert('Researcher category override dialog')}
              >
                Override category
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert('Add researcher note modal')}
              >
                Add researcher note
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NoveltyEvaluation;

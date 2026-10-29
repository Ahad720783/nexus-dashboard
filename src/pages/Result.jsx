import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import CalloutBox from '../components/ui/CalloutBox';
import { currentAlgorithm } from '../data/algorithms';

export const Result = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="space-y-6">
      {/* Top Verdict Banner Card */}
      <Card bodyClassName="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant={currentAlgorithm.verdict.category}>
                {currentAlgorithm.verdict.category}
              </Badge>
              <span className="text-xs text-slate-400">
                {currentAlgorithm.verdict.subtext}
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {currentAlgorithm.verdict.summaryTitle}
            </h1>

            <p className="text-xs text-slate-600 leading-relaxed">
              {currentAlgorithm.verdict.summaryText}
            </p>
          </div>

          <div className="text-right border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-8 shrink-0">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              Overall similarity
            </span>
            <div className="text-4xl font-extrabold tracking-tight text-slate-900 my-0.5">
              {currentAlgorithm.verdict.overallSimilarity}
            </div>
            <span className="text-xs text-slate-400 block">
              against {currentAlgorithm.verdict.comparedAgainst} · Sample/Demo
            </span>
          </div>
        </div>
      </Card>

      {/* Middle Row: Similarity by Dimension vs Matching / Differences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Similarity by Dimension */}
        <Card
          title="Similarity by dimension"
          action={
            <span className="text-[11px] text-slate-400">
              MPSO vs PSO · Sample/Demo
            </span>
          }
          bodyClassName="p-5 space-y-3"
        >
          {currentAlgorithm.dimensionSimilarities.map((item) => {
            const pct = Math.round(item.score * 100);
            return (
              <div key={item.dimension} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-700 font-medium">{item.dimension}</span>
                  <span className="font-mono text-slate-900 font-semibold">
                    {item.score.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    style={{ width: `${pct}%` }}
                    className={`h-full rounded-full ${
                      item.isAmber ? 'bg-amber-600' : 'bg-blue-600'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </Card>

        {/* Right: Matching Characteristics & Differences */}
        <div className="space-y-5">
          <Card title="Matching characteristics" bodyClassName="p-4">
            <ul className="space-y-2 text-xs text-slate-700">
              {currentAlgorithm.matchingCharacteristics.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Differences found" bodyClassName="p-4 space-y-3">
            <ul className="space-y-2 text-xs text-slate-700">
              {currentAlgorithm.differencesFound.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <CalloutBox variant="amber" className="text-xs">
              A time-varying inertia weight is itself a documented PSO modification. Check the
              reference library entry for inertia-weight PSO variants before claiming novelty.
            </CalloutBox>
          </Card>
        </div>
      </div>

      {/* Bottom Section: Other References Checked */}
      <Card title="Other references checked" bodyClassName="p-0 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50 text-slate-500 font-semibold">
              <th className="px-4 py-2.5">Algorithm</th>
              <th className="px-4 py-2.5">Category</th>
              <th className="px-4 py-2.5">Similarity (Sample/Demo)</th>
              <th className="px-4 py-2.5">Deciding factor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentAlgorithm.otherReferencesChecked.map((row) => (
              <tr key={row.algorithm} className="hover:bg-slate-50/60">
                <td className="px-4 py-3 font-semibold font-mono text-slate-900">
                  {row.algorithm}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={row.category}>{row.category}</Badge>
                </td>
                <td className="px-4 py-3 font-mono font-semibold text-slate-700">
                  {row.similarity.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-slate-600">{row.decidingFactor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Actions Bottom Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/compare')}
        >
          Back to comparison
        </Button>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/results/${id || 'A-0219'}/novelty`)}
          >
            Run novelty evaluation
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
    </div>
  );
};

export default Result;

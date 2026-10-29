import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export const Comparison = () => {
  const navigate = useNavigate();

  const comparisonRows = [
    {
      dimension: 'Mathematical update equation',
      input: 'V ← ωV ⊕ α₁ΔP ⊕ α₂ΔG',
      pso: '✓ same form, ω time-varying',
      psoMatch: 'match',
      gwo: '✗ mean of three leader positions',
      gwoMatch: 'different',
      woa: '✗ spiral / encircling branch',
      woaMatch: 'different'
    },
    {
      dimension: 'Operators',
      input: 'Weighted sum, difference vectors',
      pso: '✓ Identical operator set',
      psoMatch: 'match',
      gwo: '≈ difference vectors present',
      gwoMatch: 'partial',
      woa: '≈ difference vectors present',
      woaMatch: 'partial'
    },
    {
      dimension: 'Variables',
      input: 'X, V, P_best, G_best',
      pso: '✓ same set',
      psoMatch: 'match',
      gwo: '✗ X_α, X_β, X_δ; no velocity',
      gwoMatch: 'different',
      woa: '✗ X*; no velocity',
      woaMatch: 'different'
    },
    {
      dimension: 'Update rule',
      input: 'Additive via velocity memory',
      pso: '✓ additive via velocity',
      psoMatch: 'match',
      gwo: '✗ direct position averaging',
      gwoMatch: 'different',
      woa: '≈ direct, branch-selected',
      woaMatch: 'partial'
    },
    {
      dimension: 'Search strategy',
      input: 'Homogeneous swarm',
      pso: '✓ homogeneous swarm',
      psoMatch: 'match',
      gwo: '✗ leader hierarchy',
      gwoMatch: 'different',
      woa: '≈ single leader',
      woaMatch: 'partial'
    },
    {
      dimension: 'Exploration mechanism',
      input: 'Random coefficients + high inertia',
      pso: '≈ fixed inertia in base form',
      psoMatch: 'partial',
      gwo: '✗ |A| > 1 divergence',
      gwoMatch: 'different',
      woa: '✗ random-agent encircling',
      woaMatch: 'different'
    },
    {
      dimension: 'Exploitation mechanism',
      input: 'Inertia decay toward G_best',
      pso: '≈ same target, no decay',
      psoMatch: 'partial',
      gwo: '≈ a decreases linearly',
      gwoMatch: 'partial',
      woa: '≈ shrinking encircling',
      woaMatch: 'partial'
    },
    {
      dimension: 'Structural similarity',
      input: '—',
      psoBadge: 'Very high',
      gwoBadge: 'Low',
      woaBadge: 'Low'
    },
    {
      dimension: 'Transformation similarity',
      input: 'Linear only',
      psoBadge: 'Very high',
      gwoBadge: 'Moderate',
      woaBadge: 'Low - trigonometric items absent'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            MPSO compared with PSO, GWO and WOA
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Dimension-by-dimension comparison of the canonical forms. Sample/Demo content
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/algorithms/new')}
          >
            Change references
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/results/A-0219')}
          >
            View equivalence result
          </Button>
        </div>
      </div>

      {/* 4 Reference Algorithm Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card bodyClassName="p-3.5 bg-blue-50/40 border-blue-200">
          <span className="text-[11px] font-semibold text-blue-800 uppercase tracking-wider block">
            Input algorithm
          </span>
          <div className="text-lg font-bold text-slate-900 mt-1">MPSO</div>
          <span className="text-xs text-slate-500 mt-0.5 block">
            3 equations · swarm-based
          </span>
        </Card>

        <Card bodyClassName="p-3.5">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Reference 1
          </span>
          <div className="text-lg font-bold text-slate-900 mt-1">PSO</div>
          <span className="text-xs text-slate-500 mt-0.5 block">
            Kennedy & Eberhart, 1995
          </span>
        </Card>

        <Card bodyClassName="p-3.5">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Reference 2
          </span>
          <div className="text-lg font-bold text-slate-900 mt-1">GWO</div>
          <span className="text-xs text-slate-500 mt-0.5 block">
            Mirjalili et al., 2014
          </span>
        </Card>

        <Card bodyClassName="p-3.5">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Reference 3
          </span>
          <div className="text-lg font-bold text-slate-900 mt-1">WOA</div>
          <span className="text-xs text-slate-500 mt-0.5 block">
            Mirjalili & Lewis, 2016
          </span>
        </Card>
      </div>

      {/* Comparison Matrix Card */}
      <Card
        title="Comparison matrix"
        action={
          <span className="text-xs text-slate-500">
            <span className="text-emerald-700 font-semibold">✓ match</span> ·{' '}
            <span className="text-amber-700 font-semibold">≈ partial</span> ·{' '}
            <span className="text-rose-600 font-semibold">✗ different</span>
          </span>
        }
        bodyClassName="p-0 overflow-x-auto"
      >
        <table className="w-full text-left text-xs border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50 text-slate-500 font-semibold">
              <th className="px-4 py-2.5 w-1/5">Dimension</th>
              <th className="px-4 py-2.5 w-1/5">MPSO (Input)</th>
              <th className="px-4 py-2.5 w-1/5">PSO</th>
              <th className="px-4 py-2.5 w-1/5">GWO</th>
              <th className="px-4 py-2.5 w-1/5">WOA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {comparisonRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/60">
                <td className="px-4 py-3 font-semibold text-slate-900">
                  {row.dimension}
                </td>
                <td className="px-4 py-3 text-slate-700 font-mono text-[11px]">
                  {row.input}
                </td>

                {/* PSO column */}
                <td className="px-4 py-3 text-slate-700">
                  {row.psoBadge ? (
                    <Badge variant={row.psoBadge}>{row.psoBadge}</Badge>
                  ) : (
                    <span
                      className={
                        row.psoMatch === 'match'
                          ? 'text-emerald-800 font-medium'
                          : row.psoMatch === 'partial'
                          ? 'text-amber-800 font-medium'
                          : 'text-rose-700 font-medium'
                      }
                    >
                      {row.pso}
                    </span>
                  )}
                </td>

                {/* GWO column */}
                <td className="px-4 py-3 text-slate-700">
                  {row.gwoBadge ? (
                    <Badge variant={row.gwoBadge}>{row.gwoBadge}</Badge>
                  ) : (
                    <span
                      className={
                        row.gwoMatch === 'match'
                          ? 'text-emerald-800 font-medium'
                          : row.gwoMatch === 'partial'
                          ? 'text-amber-800 font-medium'
                          : 'text-rose-700 font-medium'
                      }
                    >
                      {row.gwo}
                    </span>
                  )}
                </td>

                {/* WOA column */}
                <td className="px-4 py-3 text-slate-700">
                  {row.woaBadge ? (
                    <Badge variant={row.woaBadge}>{row.woaBadge}</Badge>
                  ) : (
                    <span
                      className={
                        row.woaMatch === 'match'
                          ? 'text-emerald-800 font-medium'
                          : row.woaMatch === 'partial'
                          ? 'text-amber-800 font-medium'
                          : 'text-rose-700 font-medium'
                      }
                    >
                      {row.woa}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Equation Alignment: MPSO vs PSO */}
      <Card
        title="Equation alignment · MPSO vs PSO"
        action={
          <span className="text-[11px] text-slate-400">Differing terms highlighted</span>
        }
        bodyClassName="p-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* MPSO */}
          <div className="p-4 rounded-md border border-slate-200 bg-slate-50/70 space-y-2">
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              MPSO
            </div>
            <div className="font-serif text-sm text-slate-900 tracking-wide">
              V<sub>t+1</sub> ←{' '}
              <span className="bg-amber-200/90 text-amber-950 px-1 py-0.5 rounded font-bold">
                w(t)
              </span>{' '}
              · V<sub>t</sub> ⊕ α₁ (P ⊖ X) ⊕ α₂ (G ⊖ X)
            </div>
          </div>

          {/* PSO */}
          <div className="p-4 rounded-md border border-slate-200 bg-slate-50/70 space-y-2">
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              PSO
            </div>
            <div className="font-serif text-sm text-slate-900 tracking-wide">
              V<sub>t+1</sub> ←{' '}
              <span className="bg-amber-200/90 text-amber-950 px-1 py-0.5 rounded font-bold">
                w
              </span>{' '}
              · V<sub>t</sub> ⊕ α₁ (P ⊖ X) ⊕ α₂ (G ⊖ X)
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Comparison;

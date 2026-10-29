import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  History,
  Layers,
  GitCompare,
  AlertTriangle,
  Award,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import CalloutBox from '../components/ui/CalloutBox';
import { analysesHistory, outcomeDistribution } from '../data/analyses';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Everything analysed in this workspace. All figures sample/demo
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link to="/history">
            <Button variant="outline" size="sm">
              Open history
            </Button>
          </Link>
          <Link to="/algorithms/new">
            <Button variant="primary" size="sm" icon={Plus}>
              Add algorithm
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <Card bodyClassName="p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Algorithms analysed</span>
            <Layers className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight my-1.5">
            18
          </div>
          <div className="text-[11px] text-slate-400">4 added this month</div>
        </Card>

        {/* Card 2 */}
        <Card bodyClassName="p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Comparisons performed</span>
            <GitCompare className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight my-1.5">
            42
          </div>
          <div className="text-[11px] text-slate-400">Across 34 reference algorithms</div>
        </Card>

        {/* Card 3 */}
        <Card bodyClassName="p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Equivalent / highly similar</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight my-1.5">
            7
          </div>
          <div className="text-[11px] text-slate-400">Flagged for manual review</div>
        </Card>

        {/* Card 4 */}
        <Card bodyClassName="p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Potentially novel</span>
            <Award className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight my-1.5">
            5
          </div>
          <div className="text-[11px] text-slate-400">Awaiting expert confirmation</div>
        </Card>
      </div>

      {/* Middle Section: Recent Analyses & Outcome Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Recent Analyses Table (2/3 width) */}
        <Card
          title="Recent analyses"
          action={
            <Link
              to="/history"
              className="text-xs text-slate-500 hover:text-blue-600 transition-colors"
            >
              Sample/Demo · View all
            </Link>
          }
          className="lg:col-span-2"
          bodyClassName="p-0 overflow-x-auto"
        >
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/50 text-slate-500 font-semibold">
                <th className="px-4 py-2.5">Algorithm</th>
                <th className="px-4 py-2.5">Compared with</th>
                <th className="px-4 py-2.5">Outcome</th>
                <th className="px-4 py-2.5 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {analysesHistory.slice(0, 5).map((row) => (
                <tr
                  key={row.id}
                  onClick={() => navigate(`/results/${row.id}`)}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="font-semibold text-slate-800 block">
                      {row.algorithm}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {row.sourceInfo}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-[11px]">
                    {row.comparedWithText}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={row.category}>{row.category}</Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-right whitespace-nowrap">
                    {row.analysed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Right: Outcome Distribution (1/3 width) */}
        <Card
          title="Outcome distribution"
          action={<span className="text-[11px] text-slate-400">Sample/Demo</span>}
          bodyClassName="p-4 flex flex-col justify-between h-full space-y-4"
        >
          <div className="space-y-3">
            {outcomeDistribution.map((item) => (
              <div
                key={item.category}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                  <span className="text-slate-700 font-medium">{item.category}</span>
                </div>
                <span className="font-semibold text-slate-900">{item.count}</span>
              </div>
            ))}
          </div>

          <CalloutBox variant="blue" icon={false} className="text-[11px] mt-auto">
            Categories are assigned by the equivalence engine and always require researcher
            confirmation before publication.
          </CalloutBox>
        </Card>
      </div>

      {/* Bottom Card: Reference Library */}
      <Card
        title="Reference library"
        action={
          <Link
            to="/reference-algorithms"
            className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1"
          >
            <span>34 published algorithms indexed</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        }
        bodyClassName="p-4"
      >
        <div className="flex flex-wrap items-center gap-2">
          {[
            { code: 'PSO', name: 'Particle Swarm Optimization' },
            { code: 'GWO', name: 'Grey Wolf Optimizer' },
            { code: 'WOA', name: 'Whale Optimization Algorithm' },
            { code: 'DE', name: 'Differential Evolution' },
            { code: 'ABC', name: 'Artificial Bee Colony' },
            { code: 'FA', name: 'Firefly Algorithm' },
            { code: 'SCA', name: 'Sine Cosine Algorithm' },
          ].map((alg) => (
            <Link
              key={alg.code}
              to="/reference-algorithms"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-50 border border-slate-200/90 text-xs text-slate-700 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700 transition-colors"
            >
              <span className="font-bold font-mono text-slate-900">{alg.code}</span>
              <span className="text-slate-400">·</span>
              <span>{alg.name}</span>
            </Link>
          ))}
          <Link
            to="/reference-algorithms"
            className="px-2.5 py-1.5 text-xs font-semibold text-blue-600 hover:underline"
          >
            +27 more
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Download, Plus, Filter, ChevronDown, ExternalLink } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import CalloutBox from '../components/ui/CalloutBox';
import { analysesHistory } from '../data/analyses';

export const History = () => {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState('All categories');
  const [referenceFilter, setReferenceFilter] = useState('All references');
  const [timeFilter, setTimeFilter] = useState('Last 90 days');

  const filtered = analysesHistory.filter((item) => {
    if (categoryFilter !== 'All categories' && item.category !== categoryFilter) {
      return false;
    }
    if (referenceFilter !== 'All references' && !item.comparedWith.includes(referenceFilter)) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Previous analyses
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Every saved analysis with its verdict and report. Sample/Demo
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => alert('Analyses history list exported to CSV.')}
          >
            Export list
          </Button>
          <Link to="/algorithms/new">
            <Button variant="primary" size="sm" icon={Plus}>
              New analysis
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Strip Card */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 shadow-2xs"
        >
          <option value="All categories">All categories</option>
          <option value="Equivalent">Equivalent</option>
          <option value="Highly similar">Highly similar</option>
          <option value="Modified">Modified</option>
          <option value="Potentially novel">Potentially novel</option>
        </select>

        <select
          value={referenceFilter}
          onChange={(e) => setReferenceFilter(e.target.value)}
          className="px-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 shadow-2xs"
        >
          <option value="All references">All references</option>
          <option value="PSO">PSO</option>
          <option value="GWO">GWO</option>
          <option value="WOA">WOA</option>
          <option value="DE">DE</option>
          <option value="ABC">ABC</option>
          <option value="FA">FA</option>
          <option value="SCA">SCA</option>
        </select>

        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="px-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 shadow-2xs"
        >
          <option value="Last 90 days">Last 90 days</option>
          <option value="Last 30 days">Last 30 days</option>
          <option value="This year">This year</option>
          <option value="All time">All time</option>
        </select>
      </div>

      {/* Analyses Table Card */}
      <Card bodyClassName="p-0 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50 text-slate-500 font-semibold">
              <th className="px-4 py-2.5">ID</th>
              <th className="px-4 py-2.5">Algorithm</th>
              <th className="px-4 py-2.5">Compared with</th>
              <th className="px-4 py-2.5">Category</th>
              <th className="px-4 py-2.5">Analysed</th>
              <th className="px-4 py-2.5 text-right">Report</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/60">
                <td className="px-4 py-3 font-mono font-semibold text-slate-500 text-[11px]">
                  {item.id}
                </td>
                <td className="px-4 py-3">
                  <span className="font-semibold text-slate-900 block">
                    {item.algorithm}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {item.equationsCount}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600 font-mono text-[11px]">
                  {item.comparedWithText}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={item.category}>{item.category}</Badge>
                </td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                  {item.analysed}
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => navigate(`/results/${item.id}`)}
                  >
                    Open
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Blue Footer Notice */}
      <CalloutBox variant="blue" className="text-xs">
        Every similarity value, count and verdict on this page is placeholder content created for
        interface design only. Replace all of it with your system&apos;s real output before Review-2.
      </CalloutBox>
    </div>
  );
};

export default History;

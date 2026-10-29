import React, { useState } from 'react';
import { Search, BookOpen, ExternalLink, Filter } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { referenceLibrary } from '../data/references';
import { referenceAlgorithmsData } from '../data/algorithms';

export const ReferenceAlgorithms = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedAlgo, setSelectedAlgo] = useState(null);

  const filtered = referenceLibrary.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    'All',
    'Swarm-based',
    'Bio-inspired',
    'Evolutionary',
    'Math-inspired',
    'Physics-inspired'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Reference algorithms
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Published baseline metaheuristics indexed in the canonical reference library.
          </p>
        </div>

        <div className="text-xs font-semibold px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
          34 indexed baselines
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, code or author..."
            className="w-full pl-8 pr-3 py-1.5 text-xs text-slate-800 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table Card */}
      <Card bodyClassName="p-0 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50 text-slate-500 font-semibold">
              <th className="px-4 py-2.5">Code</th>
              <th className="px-4 py-2.5">Algorithm</th>
              <th className="px-4 py-2.5">Category</th>
              <th className="px-4 py-2.5">Publication / Year</th>
              <th className="px-4 py-2.5 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((item) => {
              const fullDetails = referenceAlgorithmsData.find(
                (d) => d.code.toLowerCase() === item.code.trim().toLowerCase()
              );

              return (
                <tr key={item.code} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3 font-mono font-bold text-slate-900 text-[11px]">
                    {item.code}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-800">
                    {item.name}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 border border-slate-200 text-slate-600">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {item.author} ({item.year})
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() =>
                        setSelectedAlgo(fullDetails || { ...item, updateEquation: 'Canonical equations indexed in database' })
                      }
                    >
                      View details
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Detail Modal if selected */}
      {selectedAlgo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-2xs">
          <div className="bg-white rounded-lg border border-slate-200 max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedAlgo.name} ({selectedAlgo.code})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedAlgo.citation || `${selectedAlgo.author} (${selectedAlgo.year})`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAlgo(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-slate-700 block mb-1">
                  Canonical update rule
                </span>
                <div className="p-3 bg-slate-50 rounded border border-slate-200 font-mono text-slate-800">
                  {selectedAlgo.updateEquation}
                </div>
              </div>

              {selectedAlgo.operators && (
                <div>
                  <span className="font-semibold text-slate-700 block mb-1">
                    Operators & Variables
                  </span>
                  <div className="text-slate-600">
                    <p>Operators: {selectedAlgo.operators}</p>
                    <p>Variables: {selectedAlgo.variables}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedAlgo(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferenceAlgorithms;

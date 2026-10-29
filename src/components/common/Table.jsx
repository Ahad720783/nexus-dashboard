import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Database } from 'lucide-react';
import { TableRowSkeleton } from './Skeleton';

const Table = ({
  columns = [],
  data = [],
  keyExtractor = (item) => item.id,
  isLoading = false,
  emptyMessage = 'No records found.',
  emptyDescription = 'Try adjusting your filters or search query.',
  sortBy,
  sortOrder = 'asc',
  onSort,
  className = ''
}) => {
  return (
    <div className={`w-full overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xs ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {columns.map((col) => {
                const isSorted = sortBy === col.key;
                const canSort = col.sortable && onSort;

                return (
                  <th
                    key={col.key || col.title}
                    scope="col"
                    onClick={() => canSort && onSort(col.key)}
                    className={`px-6 py-3.5 ${col.className || ''} ${
                      canSort ? 'cursor-pointer select-none hover:text-slate-900 transition-colors' : ''
                    }`}
                  >
                    <div className={`flex items-center gap-1.5 ${col.align === 'right' ? 'justify-end' : ''}`}>
                      <span>{col.title}</span>
                      {canSort && (
                        <span className="text-slate-400">
                          {isSorted ? (
                            sortOrder === 'asc' ? (
                              <ArrowUp className="w-3.5 h-3.5 text-indigo-600" />
                            ) : (
                              <ArrowDown className="w-3.5 h-3.5 text-indigo-600" />
                            )
                          ) : (
                            <ArrowUpDown className="w-3 h-3 hover:text-slate-600" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRowSkeleton key={idx} columns={columns.length} />
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="p-3 bg-slate-100 rounded-full text-slate-400">
                      <Database className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-slate-800">{emptyMessage}</p>
                    <p className="text-xs text-slate-500 max-w-sm">{emptyDescription}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={keyExtractor(item, index)}
                  className="hover:bg-slate-50/70 transition-colors duration-150"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key || col.title}
                      className={`px-6 py-4 whitespace-nowrap ${col.className || ''} ${
                        col.align === 'right' ? 'text-right' : ''
                      }`}
                    >
                      {col.render ? col.render(item, index) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

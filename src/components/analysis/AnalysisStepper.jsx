import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    number: 1,
    title: 'Input',
    desc: 'Name, description, equations',
    path: '/algorithms/new'
  },
  {
    number: 2,
    title: 'Equation representation',
    desc: 'Parse to canonical form',
    path: '/analysis/equations'
  },
  {
    number: 3,
    title: 'Structural features',
    desc: 'Operators & variables',
    path: '/analysis/structure'
  },
  {
    number: 4,
    title: 'Symbolic comparison',
    desc: 'Term-by-term matching',
    path: '/compare'
  },
  {
    number: 5,
    title: 'Similarity analysis',
    desc: 'Dimension scoring',
    path: '/results/A-0219'
  },
  {
    number: 6,
    title: 'Equivalence verdict',
    desc: 'Category & reasoning',
    path: '/results/A-0219/novelty'
  }
];

export const AnalysisStepper = ({ currentStep = 2 }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white rounded-lg border border-slate-200 p-4 shadow-xs mb-6 overflow-x-auto">
      <div className="flex items-start justify-between min-w-[720px] relative">
        {/* Horizontal connecting line across stepper */}
        <div className="absolute top-4 left-6 right-6 h-[2px] bg-slate-200 -z-0" />

        {steps.map((step) => {
          const isCurrent = step.number === currentStep;
          const isCompleted = step.number < currentStep;

          return (
            <div
              key={step.number}
              onClick={() => {
                if (isCompleted || isCurrent) navigate(step.path);
              }}
              className={`flex flex-col items-center text-center relative z-10 flex-1 px-1 ${
                isCompleted || isCurrent ? 'cursor-pointer' : 'cursor-default opacity-80'
              }`}
            >
              {/* Step circle indicator */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  isCurrent
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-xs'
                    : isCompleted
                    ? 'bg-blue-700 text-white'
                    : 'bg-white border-2 border-slate-300 text-slate-500'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : step.number}
              </div>

              {/* Title & subtitle */}
              <div className="mt-2.5">
                <span
                  className={`text-xs block tracking-tight ${
                    isCurrent
                      ? 'font-bold text-slate-900'
                      : isCompleted
                      ? 'font-semibold text-slate-800'
                      : 'font-medium text-slate-500'
                  }`}
                >
                  {step.title}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5 leading-tight">
                  {step.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalysisStepper;

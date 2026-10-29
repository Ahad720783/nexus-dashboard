import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, X, Plus, Check, AlertCircle, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { currentAlgorithm } from '../data/algorithms';
import { useAuth } from '../hooks/useAuth';
import { algorithmService } from '../services/algorithmService';

const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const AddAlgorithm = () => {
  const navigate = useNavigate();
  const { isGuest } = useAuth();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: currentAlgorithm.name,
    shortCode: currentAlgorithm.shortCode,
    category: currentAlgorithm.inspirationCategory,
    description: currentAlgorithm.description,
    equations: currentAlgorithm.rawEquations.join('\n'),
    iterationScheme: 'Iterative'
  });

  const [comparedRefs, setComparedRefs] = useState(['PSO', 'GWO', 'WOA']);
  const [newRefInput, setNewRefInput] = useState('');

  // File upload & validation state
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  const handleFileSelect = (file) => {
    if (!file) return;
    setSelectedFile(file);
    setValidationResult(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setValidationResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleValidate = async () => {
    if (!selectedFile || isValidating) return;
    setIsValidating(true);
    try {
      const result = await algorithmService.validateFile(selectedFile);
      setValidationResult(result);
      if (result.accepted && result.detected_algorithms && result.detected_algorithms.length > 0) {
        // If detected, optionally assist the user with the algorithm name
        const detected = result.detected_algorithms[0];
        if (detected && detected !== "Nature-Inspired Metaheuristic Optimizer") {
          setForm((prev) => ({
            ...prev,
            name: detected
          }));
        }
      }
    } catch (err) {
      setValidationResult({
        accepted: false,
        filename: selectedFile.name,
        detected_algorithms: [],
        reason: err.message || 'An unexpected error occurred during validation.',
        evidence: [],
        extracted_text_length: 0
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSaveDraft = () => {
    if (isGuest) {
      alert('Guest sessions cannot save analyses to history. Please sign in with an institutional account.');
      return;
    }
    alert('Draft saved to local workspace.');
  };

  const handleRemoveRef = (refCode) => {
    setComparedRefs((prev) => prev.filter((r) => r !== refCode));
  };

  const handleAddRef = (e) => {
    if (e.key === 'Enter' && newRefInput.trim()) {
      e.preventDefault();
      const code = newRefInput.trim().toUpperCase();
      if (!comparedRefs.includes(code)) {
        setComparedRefs([...comparedRefs, code]);
      }
      setNewRefInput('');
    }
  };

  const handleAnalyze = () => {
    navigate('/analysis/equations');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Add an algorithm
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Describe the algorithm and paste its update equations. Upload the source paper if you
            have one — equations can be extracted from it.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleSaveDraft}
        >
          Save draft
        </Button>
      </div>

      {/* Two Column Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Algorithm Specs (approx 7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card bodyClassName="p-5 space-y-4">
            {/* Algorithm Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Algorithm name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm text-slate-800 bg-white border border-slate-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Short code & Inspiration Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short code
                </label>
                <input
                  type="text"
                  value={form.shortCode}
                  onChange={(e) => setForm({ ...form, shortCode: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm font-mono text-slate-800 bg-white border border-slate-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Inspiration category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm text-slate-800 bg-white border border-slate-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Swarm-based">Swarm-based</option>
                  <option value="Bio-inspired">Bio-inspired</option>
                  <option value="Evolutionary">Evolutionary</option>
                  <option value="Physics-inspired">Physics-inspired</option>
                  <option value="Math-inspired">Math-inspired</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm text-slate-800 bg-white border border-slate-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Plain-language summary. Used only for the report header, not for equivalence detection.
              </p>
            </div>

            {/* Mathematical update equations */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mathematical update equations
              </label>
              <textarea
                rows={4}
                value={form.equations}
                onChange={(e) => setForm({ ...form, equations: e.target.value })}
                className="w-full px-3 py-2.5 font-mono text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                One equation per line. LaTeX is accepted. Use standard symbols — the parser resolves aliases in the next step.
              </p>
            </div>

            {/* Iteration Scheme */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Iteration scheme
              </label>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {['Iterative', 'Population-based', 'Single-objective'].map((scheme) => (
                  <button
                    key={scheme}
                    type="button"
                    onClick={() => setForm({ ...form, iterationScheme: scheme })}
                    className={`px-3 py-1.5 rounded-md border text-xs font-medium transition-colors ${
                      form.iterationScheme === scheme
                        ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {scheme}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Source Paper & Comparison Targets (approx 5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Upload Algorithm Document Card */}
          <Card bodyClassName="p-4 sm:p-5 space-y-4">
            <div>
              <h2 className="text-sm font-bold tracking-tight text-slate-900">
                Upload Algorithm Document
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Upload a research paper containing a nature-inspired metaheuristic optimization algorithm.
              </p>
            </div>

            {/* Drag & Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-5 sm:p-6 text-center cursor-pointer transition-all select-none ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-500/20'
                  : 'border-slate-300 hover:border-blue-400 bg-slate-50/60 hover:bg-blue-50/30'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
                accept=".pdf,.docx,.txt"
                className="hidden"
              />
              <Upload
                className={`w-7 h-7 mx-auto mb-2 transition-transform ${
                  isDragging ? 'text-blue-600 scale-110' : 'text-slate-400'
                }`}
              />
              <p className="text-xs font-semibold text-slate-800">
                Drag and drop your document here, or{' '}
                <span className="text-blue-600 hover:text-blue-800 underline underline-offset-2">
                  Browse files
                </span>
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Supported formats: PDF, DOCX, TXT · Maximum size: 10 MB
              </p>
            </div>

            {/* Selected File Details & Validation Action */}
            {selectedFile && (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-2 rounded bg-blue-100 text-blue-700 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-slate-900 block truncate" title={selectedFile.name}>
                        {selectedFile.name}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        {formatFileSize(selectedFile.size)} · {selectedFile.name.split('.').pop()?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                    disabled={isValidating}
                    className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-slate-200/60 transition-colors"
                    title="Remove selected file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {!validationResult && (
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={handleValidate}
                    disabled={isValidating}
                    className="w-full flex items-center justify-center gap-2 font-semibold"
                  >
                    {isValidating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Validating algorithm content...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Validate File</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}

            {/* Validation Result Display */}
            {validationResult && (
              <div className="space-y-3">
                {validationResult.accepted ? (
                  /* Accepted Result Panel */
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-4 space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-start gap-2.5">
                      <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 mt-0.5 shrink-0">
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-emerald-950">
                            File Accepted
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-200/80 text-emerald-800 rounded">
                            Verified Metaheuristic
                          </span>
                        </div>
                        <p className="text-xs text-emerald-800 leading-relaxed font-normal">
                          This document appears to contain a nature-inspired metaheuristic optimization algorithm and is eligible for further analysis.
                        </p>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-700 space-y-1.5 pt-2 border-t border-emerald-200/70">
                      <div>
                        <span className="font-semibold text-slate-900">Filename: </span>
                        <span className="font-mono text-slate-700">{validationResult.filename}</span>
                      </div>
                      {validationResult.detected_algorithms && validationResult.detected_algorithms.length > 0 && (
                        <div>
                          <span className="font-semibold text-slate-900">Detected algorithm: </span>
                          <span className="font-medium text-emerald-900">
                            {validationResult.detected_algorithms.join(', ')}
                          </span>
                        </div>
                      )}
                      <div>
                        <span className="font-semibold text-slate-900">Extracted text length: </span>
                        <span>{validationResult.extracted_text_length.toLocaleString()} characters</span>
                      </div>
                      {validationResult.evidence && validationResult.evidence.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <span className="font-semibold text-slate-900 block">Acceptance evidence:</span>
                          <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-0.5">
                            {validationResult.evidence.map((item, idx) => (
                              <li key={idx} className="leading-tight">{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        onClick={handleAnalyze}
                        className="w-full flex items-center justify-center gap-1.5 font-semibold shadow-xs"
                      >
                        <span>Continue to Algorithm Analysis</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRemoveFile}
                        className="shrink-0 text-slate-600"
                        title="Upload a different document"
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Rejected Result Panel */
                  <div className="rounded-lg border border-rose-200 bg-rose-50/70 p-4 space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-start gap-2.5">
                      <div className="p-1 rounded-full bg-rose-100 text-rose-700 mt-0.5 shrink-0">
                        <AlertCircle className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-rose-950">
                            File Rejected
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-semibold bg-rose-200/80 text-rose-800 rounded">
                            Validation Rejected
                          </span>
                        </div>
                        <p className="text-xs text-rose-800 leading-relaxed font-medium">
                          {validationResult.reason}
                        </p>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-700 space-y-1 pt-2 border-t border-rose-200/70">
                      <div>
                        <span className="font-semibold text-slate-900">Filename: </span>
                        <span className="font-mono text-slate-700">{validationResult.filename}</span>
                      </div>
                      {validationResult.extracted_text_length > 0 && (
                        <div>
                          <span className="font-semibold text-slate-900">Extracted characters: </span>
                          <span>{validationResult.extracted_text_length.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRemoveFile}
                        className="w-full text-slate-700 hover:bg-slate-100 font-medium"
                      >
                        Select Another File
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* Compare Against Card */}
          <Card title="Compare against" bodyClassName="p-4 space-y-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {comparedRefs.map((refCode) => (
                <span
                  key={refCode}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700"
                >
                  <span>{refCode}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveRef(refCode)}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div>
              <input
                type="text"
                value={newRefInput}
                onChange={(e) => setNewRefInput(e.target.value)}
                onKeyDown={handleAddRef}
                placeholder="Add another reference algorithm..."
                className="w-full px-3 py-1.5 text-xs text-slate-800 bg-white border border-slate-200 rounded-md focus:border-blue-500 focus:outline-none"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Leave empty to compare against the full reference library.
              </p>
            </div>
          </Card>

          {/* Action Button */}
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={handleAnalyze}
              className="w-full font-semibold"
            >
              Analyze algorithm
            </Button>
            <p className="text-[11px] text-slate-400 text-center mt-2 leading-tight">
              Analysis parses the equations, extracts structural features, and runs symbolic
              comparison. It does not execute or benchmark the algorithm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAlgorithm;

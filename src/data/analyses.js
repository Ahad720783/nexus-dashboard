/**
 * Analyses records matching Screen 02 (Dashboard) and Screen 10 (History)
 */

export const analysesHistory = [
  {
    id: "A-0219",
    algorithm: "Modified PSO variant",
    equationsCount: "3 equations",
    sourceInfo: "Uploaded: 2 equations",
    comparedWith: ["PSO", "GWO", "WOA", "SCA"],
    comparedWithText: "PSO, GWO, WOA, SCA",
    category: "Highly similar",
    similarity: 0.91,
    analysed: "19 Sep 2026",
    reportId: "R-0219"
  },
  {
    id: "A-0218",
    algorithm: "Adaptive GWO",
    equationsCount: "3 equations",
    sourceInfo: "Uploaded: 3 equations",
    comparedWith: ["GWO", "WOA"],
    comparedWithText: "GWO, WOA",
    category: "Modified",
    similarity: 0.74,
    analysed: "17 Sep 2026",
    reportId: "R-0218"
  },
  {
    id: "A-0217",
    algorithm: "Hybrid WOA-DE",
    equationsCount: "4 equations",
    sourceInfo: "From PDF: 4 equations",
    comparedWith: ["WOA", "DE"],
    comparedWithText: "WOA, DE",
    category: "Potentially novel",
    similarity: 0.52,
    analysed: "15 Sep 2026",
    reportId: "R-0217"
  },
  {
    id: "A-0216",
    algorithm: "Swarm optimiser A",
    equationsCount: "3 equations",
    sourceInfo: "Uploaded: 3 equations",
    comparedWith: ["PSO"],
    comparedWithText: "PSO",
    category: "Equivalent",
    similarity: 0.99,
    analysed: "12 Sep 2026",
    reportId: "R-0216"
  },
  {
    id: "A-0215",
    algorithm: "Firefly variant B",
    equationsCount: "3 equations",
    sourceInfo: "Uploaded: 3 equations",
    comparedWith: ["FA", "GWO"],
    comparedWithText: "FA, GWO",
    category: "Modified",
    similarity: 0.68,
    analysed: "09 Sep 2026",
    reportId: "R-0215"
  },
  {
    id: "A-0214",
    algorithm: "Chaotic SCA",
    equationsCount: "2 equations",
    sourceInfo: "Uploaded: 2 equations",
    comparedWith: ["SCA", "PSO"],
    comparedWithText: "SCA, PSO",
    category: "Highly similar",
    similarity: 0.88,
    analysed: "04 Sep 2026",
    reportId: "R-0214"
  },
  {
    id: "A-0213",
    algorithm: "Multi-leader optimiser",
    equationsCount: "5 equations",
    sourceInfo: "Uploaded: 5 equations",
    comparedWith: ["GWO", "ABC", "DE"],
    comparedWithText: "GWO, ABC, DE",
    category: "Potentially novel",
    similarity: 0.44,
    analysed: "28 Aug 2026",
    reportId: "R-0213"
  }
];

export const outcomeDistribution = [
  { category: "Equivalent", count: 5, color: "bg-rose-500", dot: "bg-rose-500" },
  { category: "Highly similar", count: 4, color: "bg-amber-500", dot: "bg-amber-500" },
  { category: "Modified", count: 6, color: "bg-blue-600", dot: "bg-blue-600" },
  { category: "Potentially novel", count: 3, color: "bg-emerald-500", dot: "bg-emerald-500" }
];

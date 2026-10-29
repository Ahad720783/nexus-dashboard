/**
 * Mathematical Algorithm Definitions & Features
 * Canonical representations, feature vectors, comparison matrices, and similarity metrics
 * directly matching the MetaEquiv reference PDF.
 */

export const currentAlgorithm = {
  id: "A-0219",
  reportId: "R-0219",
  name: "Modified Particle Swarm Optimization",
  shortCode: "MPSO",
  category: "Swarm-based, iterative",
  inspirationCategory: "Swarm-based",
  equationsSubmitted: 3,
  uploadedDate: "19 Sep 2026",
  description:
    "Population-based optimiser in which each candidate solution keeps a velocity term influenced by its own best position and the best position found by the swarm. This variant introduces a time-varying inertia weight.",
  sourceFile: {
    name: "mpso-draft-v3.pdf",
    size: "1.8 MB",
    equationsDetected: 3,
    status: "Parsed"
  },
  rawEquations: [
    "v_i(t+1) = w*v_i(t) + c_1*r_1*(p_i - x_i(t)) + c_2*r_2*(g - x_i(t))",
    "x_i(t+1) = x_i(t) + v_i(t+1)",
    "w(t) = w_max - (w_max - w_min)*t/T"
  ],
  canonicalEquations: [
    "V_{t+1} \\leftarrow \\omega \\cdot V_t \\oplus \\alpha_1 \\cdot (P \\ominus X_t) \\oplus \\alpha_2 \\cdot (G \\ominus X_t)",
    "X_{t+1} \\leftarrow X_t \\oplus V_{t+1}",
    "w_t \\leftarrow \\text{LinearDecay}(w_{\\max}, w_{\\min}, t, T)"
  ],
  canonicalPlain: [
    "V_{t+1} ← ω · V_t ⊕ α₁ · (P ⊖ X_t) ⊕ α₂ · (G ⊖ X_t)",
    "X_{t+1} ← X_t ⊕ V_{t+1}",
    "w_t ← LinearDecay(w_max, w_min, t, T)"
  ],
  symbols: [
    { symbol: "X_t", role: "State variable", interpretation: "Candidate position at iteration t" },
    { symbol: "V_t", role: "State variable", interpretation: "Velocity / step memory term" },
    { symbol: "P_best", role: "Memory", interpretation: "Personal best position" },
    { symbol: "G_best", role: "Memory", interpretation: "Global best position" },
    { symbol: "w", role: "Control parameter", interpretation: "Inertia, decays linearly" },
    { symbol: "r_1, r_2", role: "Stochastic", interpretation: "Uniform random in [0,1]" }
  ],
  operators: [
    "Weighted sum of difference vectors (3 terms)",
    "Stochastic scaling by two independent random coefficients",
    "Memory term carried across iterations (velocity)",
    "Attraction toward personal best and global best",
    "Deterministic parameter decay over iteration count",
    "Additive position update, no boundary operator declared"
  ],
  structuralFeatures: {
    searchStrategy: [
      "Population-based, fixed size",
      "Synchronous update of all agents",
      "Two guidance sources per agent",
      "No population division into roles"
    ],
    explorationMechanism: [
      "Random coefficients scale both attraction terms",
      "High inertia early in the run widens the step",
      "No random-agent selection operator",
      "No spiral or encircling movement"
    ],
    exploitationMechanism: [
      "Inertia decay narrows steps over iterations",
      "Convergence driven by global best attraction",
      "Personal best memory retained per agent",
      "No greedy replacement operator"
    ]
  },
  featureVector: [
    {
      feature: "Update rule type",
      value: "Additive, velocity-mediated",
      evidence: "X_{t+1} ← X_t + V_{t+1}"
    },
    {
      feature: "Memory depth",
      value: "2 (personal + global best)",
      evidence: "P_best, G_best appear as difference terms"
    },
    {
      feature: "Stochastic components",
      value: "2 independent uniform variates",
      evidence: "r_1, r_2 per dimension"
    },
    {
      feature: "Control parameters",
      value: "3 (w, c_1, c_2)",
      evidence: "w time-varying; c fixed"
    },
    {
      feature: "Population roles",
      value: "None (homogeneous agents)",
      evidence: "No leader hierarchy in equations"
    },
    {
      feature: "Transformation family",
      value: "Linear combination of difference vectors",
      evidence: "No trigonometric or logarithmic terms"
    }
  ],
  verdict: {
    category: "Highly similar",
    subtext: "Sample/Demo verdict",
    summaryTitle: "MPSO is a parameter variant of PSO",
    summaryText:
      "The canonical update equations are structurally identical to PSO. The only difference is that the inertia weight is a decaying function of the iteration index instead of a constant. No new operator, variable or transformation was introduced.",
    overallSimilarity: 0.91,
    comparedAgainst: "PSO"
  },
  dimensionSimilarities: [
    { dimension: "Update equations", score: 0.96, isAmber: true },
    { dimension: "Operators", score: 1.00, isAmber: true },
    { dimension: "Variables", score: 1.00, isAmber: true },
    { dimension: "Update rule", score: 0.95, isAmber: true },
    { dimension: "Search strategy", score: 0.94, isAmber: true },
    { dimension: "Exploration", score: 0.78, isAmber: false },
    { dimension: "Exploitation", score: 0.72, isAmber: false },
    { dimension: "Structural similarity", score: 0.95, isAmber: true },
    { dimension: "Transformation similarity", score: 0.93, isAmber: true }
  ],
  matchingCharacteristics: [
    "Identical velocity-position update pair",
    "Same two attraction terms toward personal and global best",
    "Same stochastic scaling with two uniform variates",
    "Same population topology and synchronous update order",
    "Same variable set after alias normalisation"
  ],
  differencesFound: [
    "Inertia weight decays linearly rather than staying constant",
    "One additional control equation for w(t)"
  ],
  otherReferencesChecked: [
    {
      algorithm: "PSO",
      category: "Highly similar",
      similarity: 0.91,
      decidingFactor: "Same update equations; only the inertia schedule differs"
    },
    {
      algorithm: "GWO",
      category: "Distinct",
      similarity: 0.34,
      decidingFactor: "Leader hierarchy and absence of a velocity term"
    },
    {
      algorithm: "WOA",
      category: "Distinct",
      similarity: 0.29,
      decidingFactor: "Spiral transformation and branch-selected update"
    },
    {
      algorithm: "SCA",
      category: "Distinct",
      similarity: 0.22,
      decidingFactor: "Trigonometric transformation absent from input"
    }
  ],
  noveltyCriteria: [
    {
      criterion: "New operator introduced",
      outcome: "No",
      isYes: false,
      basis: "Operator inventory matches PSO exactly"
    },
    {
      criterion: "New state variable introduced",
      outcome: "No",
      isYes: false,
      basis: "Same four variables after normalisation"
    },
    {
      criterion: "New transformation family",
      outcome: "No",
      isYes: false,
      basis: "Linear combinations only"
    },
    {
      criterion: "Change to search strategy",
      outcome: "No",
      isYes: false,
      basis: "Homogeneous swarm retained"
    },
    {
      criterion: "Change to parameter schedule",
      outcome: "Yes",
      isYes: true,
      basis: "w becomes a function of t"
    },
    {
      criterion: "Close match in reference library",
      outcome: "Yes — PSO",
      isYes: true,
      basis: "Similarity 0.91 (Sample/Demo)"
    }
  ]
};

export const referenceAlgorithmsData = [
  {
    code: "PSO",
    name: "Particle Swarm Optimization",
    citation: "Kennedy & Eberhart, 1995",
    category: "Swarm-based",
    updateEquation: "V_{t+1} = w · V_t + c_1 r_1 (P - X) + c_2 r_2 (G - X)",
    positionEquation: "X_{t+1} = X_t + V_{t+1}",
    operators: "Weighted sum, difference vectors",
    variables: "X, V, P_best, G_best",
    updateRule: "Additive via velocity",
    searchStrategy: "Homogeneous swarm",
    exploration: "Fixed inertia in base form",
    exploitation: "Same target, no decay",
    structuralSimilarity: "Very high",
    transformationSimilarity: "Very high"
  },
  {
    code: "GWO",
    name: "Grey Wolf Optimizer",
    citation: "Mirjalili et al., 2014",
    category: "Swarm-based / Bio-inspired",
    updateEquation: "X_{t+1} = (X_1 + X_2 + X_3) / 3",
    positionEquation: "X_1 = X_α - A_1 · D_α, ...",
    operators: "Difference vectors present",
    variables: "X_α, X_β, X_δ; no velocity",
    updateRule: "Direct position averaging",
    searchStrategy: "Leader hierarchy",
    exploration: "|A| > 1 divergence",
    exploitation: "a decreases linearly",
    structuralSimilarity: "Low",
    transformationSimilarity: "Moderate"
  },
  {
    code: "WOA",
    name: "Whale Optimization Algorithm",
    citation: "Mirjalili & Lewis, 2016",
    category: "Swarm-based / Bio-inspired",
    updateEquation: "X_{t+1} = D' · e^{bl} · cos(2πl) + X*",
    positionEquation: "Branch: encircling or spiral bubble-net",
    operators: "Difference vectors, exponential spiral",
    variables: "X*; no velocity",
    updateRule: "Direct, branch-selected",
    searchStrategy: "Single leader",
    exploration: "Random-agent encircling",
    exploitation: "Shrinking encircling",
    structuralSimilarity: "Low",
    transformationSimilarity: "Low - trigonometric terms absent"
  },
  {
    code: "DE",
    name: "Differential Evolution",
    citation: "Storn & Price, 1997",
    category: "Evolutionary",
    updateEquation: "V_{i,G+1} = X_{r1,G} + F · (X_{r2,G} - X_{r3,G})",
    positionEquation: "Crossover with parent solution",
    operators: "Vector difference mutation, binomial crossover",
    variables: "X_r1, X_r2, X_r3, F, CR",
    updateRule: "Mutant vector generation + greedy selection",
    searchStrategy: "Uniform random selection",
    exploration: "Differential mutation scaling F",
    exploitation: "Greedy replacement filter",
    structuralSimilarity: "Low",
    transformationSimilarity: "Moderate"
  },
  {
    code: "ABC",
    name: "Artificial Bee Colony",
    citation: "Karaboga, 2005",
    category: "Swarm-based",
    updateEquation: "v_{ij} = x_{ij} + \\phi_{ij}(x_{ij} - x_{kj})",
    positionEquation: "Employed, onlooker, and scout phases",
    operators: "Difference vector perturbation",
    variables: "x, v, \\phi ∈ [-1, 1]",
    updateRule: "Stochastic neighborhood step",
    searchStrategy: "Role-differentiated population",
    exploration: "Scout random reset",
    exploitation: "Onlooker proportional selection",
    structuralSimilarity: "Low",
    transformationSimilarity: "Moderate"
  },
  {
    code: "FA",
    name: "Firefly Algorithm",
    citation: "Yang, 2009",
    category: "Bio-inspired",
    updateEquation: "x_i = x_i + β_0 e^{-γ r_{ij}^2}(x_j - x_i) + α(rand - 0.5)",
    positionEquation: "Attraction toward brighter fireflies",
    operators: "Exponential distance decay, Gaussian/uniform noise",
    variables: "x_i, x_j, r_{ij}, β_0, γ, α",
    updateRule: "Pairwise light intensity comparison",
    searchStrategy: "Flocking with distance attenuation",
    exploration: "Random walk perturbation α",
    exploitation: "Exponential light attraction",
    structuralSimilarity: "Moderate",
    transformationSimilarity: "Moderate"
  },
  {
    code: "SCA",
    name: "Sine Cosine Algorithm",
    citation: "Mirjalili, 2016",
    category: "Math-inspired",
    updateEquation: "X_{t+1} = X_t + r_1 \\sin(r_2) |r_3 P - X_t|",
    positionEquation: "Sine or cosine branch toggle",
    operators: "Trigonometric amplitude scaling",
    variables: "X_t, P, r_1, r_2, r_3, r_4",
    updateRule: "Cyclic range oscillation",
    searchStrategy: "Destination-directed sine/cosine walk",
    exploration: "r_1 > 1 outer exploration",
    exploitation: "r_1 ≤ 1 inner convergence",
    structuralSimilarity: "Low",
    transformationSimilarity: "Low - trigonometric absent"
  }
];

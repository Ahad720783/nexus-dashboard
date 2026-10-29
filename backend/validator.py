import io
import re
from typing import Dict, Any, List, Tuple
import pymupdf
import docx

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

# Common nature-inspired metaheuristic algorithms
KNOWN_ALGORITHMS = [
    {
        "name": "Particle Swarm Optimization",
        "short": "PSO",
        "pattern": r"\b(?:particle\s+swarm(?:\s+optimization)?|pso)\b",
        "category": "Swarm-based"
    },
    {
        "name": "Grey Wolf Optimizer",
        "short": "GWO",
        "pattern": r"\b(?:grey\s+wolf(?:\s+optimizer|\s+optimization)?|gwo)\b",
        "category": "Swarm-based"
    },
    {
        "name": "Whale Optimization Algorithm",
        "short": "WOA",
        "pattern": r"\b(?:whale\s+optimization(?:\s+algorithm)?|woa)\b",
        "category": "Bio-inspired"
    },
    {
        "name": "Ant Colony Optimization",
        "short": "ACO",
        "pattern": r"\b(?:ant\s+colony(?:\s+optimization)?|aco)\b",
        "category": "Swarm-based"
    },
    {
        "name": "Artificial Bee Colony",
        "short": "ABC",
        "pattern": r"\b(?:artificial\s+bee\s+colony|abc\s+algorithm)\b",
        "category": "Swarm-based"
    },
    {
        "name": "Firefly Algorithm",
        "short": "FA",
        "pattern": r"\b(?:firefly\s+algorithm|fa\s+algorithm)\b",
        "category": "Bio-inspired"
    },
    {
        "name": "Cuckoo Search",
        "short": "CS",
        "pattern": r"\b(?:cuckoo\s+search(?:\s+algorithm)?)\b",
        "category": "Bio-inspired"
    },
    {
        "name": "Genetic Algorithm",
        "short": "GA",
        "pattern": r"\b(?:genetic\s+algorithm|ga)\b",
        "category": "Evolutionary"
    },
    {
        "name": "Differential Evolution",
        "short": "DE",
        "pattern": r"\b(?:differential\s+evolution|de\s+algorithm)\b",
        "category": "Evolutionary"
    },
    {
        "name": "Bat Algorithm",
        "short": "BA",
        "pattern": r"\b(?:bat\s+algorithm)\b",
        "category": "Bio-inspired"
    },
    {
        "name": "Sine Cosine Algorithm",
        "short": "SCA",
        "pattern": r"\b(?:sine\s+cosine\s+algorithm|sca)\b",
        "category": "Math-inspired"
    },
    {
        "name": "Harris Hawks Optimization",
        "short": "HHO",
        "pattern": r"\b(?:harris\s+hawks\s+optimization|hho)\b",
        "category": "Bio-inspired"
    },
    {
        "name": "Salp Swarm Algorithm",
        "short": "SSA",
        "pattern": r"\b(?:salp\s+swarm\s+algorithm|ssa)\b",
        "category": "Swarm-based"
    },
    {
        "name": "Moth-Flame Optimization",
        "short": "MFO",
        "pattern": r"\b(?:moth[- ]flame\s+optimization|mfo)\b",
        "category": "Bio-inspired"
    },
    {
        "name": "Dragonfly Algorithm",
        "short": "DA",
        "pattern": r"\b(?:dragonfly\s+algorithm|da\s+algorithm)\b",
        "category": "Bio-inspired"
    },
    {
        "name": "Slime Mould Algorithm",
        "short": "SMA",
        "pattern": r"\b(?:slime\s+mould\s+algorithm|sma)\b",
        "category": "Bio-inspired"
    },
    {
        "name": "Gravitational Search Algorithm",
        "short": "GSA",
        "pattern": r"\b(?:gravitational\s+search\s+algorithm|gsa)\b",
        "category": "Physics-inspired"
    },
    {
        "name": "Harmony Search",
        "short": "HS",
        "pattern": r"\b(?:harmony\s+search(?:\s+algorithm)?)\b",
        "category": "Bio-inspired"
    }
]

# Core metaheuristic signals
POPULATION_TERMS = [
    r"\bpopulation\b", r"\bswarm\b", r"\bagents?\b", r"\bindividuals?\b",
    r"\bparticles?\b", r"\bwolves\b", r"\bcandidate\s+solutions?\b",
    r"\bsearch\s+agents?\b", r"\bsearchers?\b", r"\bcolony\b"
]

UPDATE_TERMS = [
    r"\bposition[- ]update\b", r"\bvelocity[- ]update\b", r"\bupdate\s+equations?\b",
    r"\bupdate\s+rules?\b", r"\binertia\s+weight\b", r"\bacceleration\s+coefficients?\b",
    r"\bstep\s+size\b", r"\blevy\s+flight\b", r"\bdifference\s+vectors?\b",
    r"\bmutation\s+operator\b", r"\bcrossover\s+operator\b", r"\bsearch\s+operators?\b",
    r"\bencircling\b", r"\bhunting\s+mechanism\b", r"\bforaging\b"
]

FITNESS_TERMS = [
    r"\bfitness\s+function\b", r"\bobjective\s+function\b", r"\bcost\s+function\b",
    r"\bfitness\s+value\b", r"\bevaluate\s+fitness\b", r"\boptimization\s+problem\b",
    r"\bbenchmark\s+functions?\b", r"\bglobal\s+best\b", r"\bpersonal\s+best\b",
    r"\bpbest\b", r"\bgbest\b", r"\bminimization\b", r"\bmaximization\b",
    r"\bglobal\s+optimum\b", r"\blocal\s+optima\b"
]

DYNAMICS_TERMS = [
    r"\bexploration\b", r"\bexploitation\b", r"\bconvergence\b",
    r"\biterative\s+(?:process|optimization|search|scheme)\b",
    r"\bstopping\s+criterion\b", r"\btermination\s+criterion\b",
    r"\bmaximum\s+(?:number\s+of\s+)?iterations\b", r"\bpseudocode\b",
    r"\balgorithm\s+[1-9]\b"
]

GENERIC_NATURE_TERMS = [
    r"\bnature[- ]inspired\b", r"\bbio[- ]inspired\b", r"\bmetaheuristics?\b",
    r"\bswarm\s+intelligence\b", r"\bevolutionary\s+computation\b",
    r"\bevolutionary\s+algorithms?\b", r"\bphysics[- ]inspired\b"
]

# Patterns typical of algorithm mathematical update equations
EQUATION_PATTERNS = [
    r"[xvXVP]\s*(?:\([tT]\s*\+\s*1\)|_{t\s*\+\s*1}|\[t\s*\+\s*1\])\s*=",
    r"v_{i}\s*\(t\s*\+\s*1\)",
    r"x_{i}\s*\(t\s*\+\s*1\)",
    r"\bw\s*\*\s*v\b|\b\w+\s*·\s*V\b",
    r"\bc[12]\s*\*\s*r[12]\b",
    r"\bpbest\s*-\s*x\b|\b\w+\s*⊖\s*X\b",
    r"\\leftarrow|\u2190",  # arrow symbols
]


def extract_text_from_file(filename: str, contents: bytes) -> Tuple[str, str]:
    """
    Extract readable text from PDF, DOCX, or TXT file contents.
    Returns (extracted_text, error_message).
    """
    ext = filename.lower().split('.')[-1] if '.' in filename else ''
    
    if ext == 'pdf':
        # Check PDF signature
        if not contents.startswith(b"%PDF-"):
            return "", "The file is not a valid PDF document (missing PDF header signature)."
        try:
            doc = pymupdf.open(stream=contents, filetype="pdf")
            if doc.is_encrypted:
                return "", "The PDF document is password-protected or encrypted. Please provide an unencrypted document."
            
            text_parts = []
            for page in doc:
                text_parts.append(page.get_text())
            doc.close()
            full_text = "\n".join(text_parts).strip()
            return full_text, ""
        except Exception as e:
            return "", f"Could not parse PDF document: {str(e)}"
            
    elif ext == 'docx':
        # Check ZIP signature for docx
        if not contents.startswith(b"PK\x03\x04"):
            return "", "The file is not a valid DOCX document (invalid zip container)."
        try:
            doc = docx.Document(io.BytesIO(contents))
            paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
            for table in doc.tables:
                for row in table.rows:
                    row_text = " ".join(cell.text.strip() for cell in row.cells if cell.text.strip())
                    if row_text:
                        paragraphs.append(row_text)
            full_text = "\n".join(paragraphs).strip()
            return full_text, ""
        except Exception as e:
            return "", f"Could not parse DOCX document: {str(e)}"
            
    elif ext == 'txt':
        try:
            full_text = contents.decode('utf-8').strip()
            return full_text, ""
        except UnicodeDecodeError:
            try:
                full_text = contents.decode('latin-1').strip()
                return full_text, ""
            except Exception as e:
                return "", f"Could not decode text file: {str(e)}"
    else:
        return "", f"Unsupported file extension: .{ext}"


def partition_body_and_references(text: str) -> Tuple[str, str]:
    """
    Separates main body from the bibliography / references section
    to avoid false positives where an algorithm is only cited in the references.
    """
    # Look for References / Bibliography heading in the latter half of document
    split_match = None
    for pattern in [
        r"\n\s*(?:(?:[0-9IVX]+\.?\s*)?(?:References|REFERENCES|Bibliography|BIBLIOGRAPHY))\s*\n",
        r"\n\s*\[1\]\s+[A-Z]"
    ]:
        matches = list(re.finditer(pattern, text))
        if matches:
            # Pick the one located in the last 40% of the text
            for m in reversed(matches):
                if m.start() > len(text) * 0.4:
                    split_match = m
                    break
            if split_match:
                break
                
    if split_match:
        body = text[:split_match.start()]
        references = text[split_match.start():]
        return body, references
    return text, ""


def find_matches(patterns: List[str], text: str) -> List[str]:
    """Return unique matched terms from the patterns."""
    found = []
    for pat in patterns:
        m = re.search(pat, text, re.IGNORECASE)
        if m:
            found.append(m.group(0).strip())
    return found


def validate_algorithm_document(filename: str, contents: bytes) -> Dict[str, Any]:
    """
    Inspects document text and determines whether it describes a valid
    nature-inspired metaheuristic optimization algorithm.
    """
    # 1. Size check
    file_size = len(contents)
    if file_size > MAX_FILE_SIZE:
        size_mb = round(file_size / (1024 * 1024), 2)
        return {
            "accepted": False,
            "filename": filename,
            "detected_algorithms": [],
            "reason": f"File size exceeds the 10 MB limit ({size_mb} MB). Please upload a smaller document.",
            "evidence": [],
            "extracted_text_length": 0
        }

    # 2. Extension check
    ext = filename.lower().split('.')[-1] if '.' in filename else ''
    if ext not in ['pdf', 'docx', 'txt']:
        return {
            "accepted": False,
            "filename": filename,
            "detected_algorithms": [],
            "reason": f"Unsupported file format (.{ext}). Please upload a PDF, DOCX, or TXT document.",
            "evidence": [],
            "extracted_text_length": 0
        }

    # 3. Empty file check
    if file_size == 0:
        return {
            "accepted": False,
            "filename": filename,
            "detected_algorithms": [],
            "reason": "The uploaded file is empty (0 bytes).",
            "evidence": [],
            "extracted_text_length": 0
        }

    # 4. Text extraction
    extracted_text, extract_err = extract_text_from_file(filename, contents)
    if extract_err:
        return {
            "accepted": False,
            "filename": filename,
            "detected_algorithms": [],
            "reason": extract_err,
            "evidence": [],
            "extracted_text_length": 0
        }

    extracted_len = len(extracted_text)
    if extracted_len < 60:
        return {
            "accepted": False,
            "filename": filename,
            "detected_algorithms": [],
            "reason": "The document contains insufficient readable text (fewer than 60 characters). It may be blank or image-only.",
            "evidence": [],
            "extracted_text_length": extracted_len
        }

    # 5. Partition body and references
    body_text, ref_text = partition_body_and_references(extracted_text)

    # 6. Check specific algorithm occurrences in body vs references
    detected_algorithms = []
    body_alg_matches = []
    ref_only_algs = []

    for alg in KNOWN_ALGORITHMS:
        body_count = len(re.findall(alg["pattern"], body_text, re.IGNORECASE))
        ref_count = len(re.findall(alg["pattern"], ref_text, re.IGNORECASE)) if ref_text else 0
        
        if body_count >= 2 or (body_count >= 1 and len(body_text) < 1500):
            detected_algorithms.append(f"{alg['name']} ({alg['short']})")
            body_alg_matches.append(alg["short"])
        elif body_count == 0 and ref_count >= 1:
            ref_only_algs.append(alg["short"])

    # Look for novel algorithm pattern in title/abstract/body: e.g. "X Optimization Algorithm"
    novel_pattern = r"\b([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?\s+(?:Optimization(?:\s+Algorithm)?|Optimizer|Search\s+Algorithm))\b"
    novel_matches = re.findall(novel_pattern, body_text[:3000])
    for n in novel_matches:
        cleaned_n = n.strip()
        if not any(cleaned_n.lower() in a.lower() for a in detected_algorithms):
            # Avoid generic names like "Optimization Algorithm"
            if len(cleaned_n.split()) >= 2 and cleaned_n.lower() not in ["optimization algorithm", "heuristic algorithm"]:
                detected_algorithms.append(cleaned_n)

    # 7. Evaluate multi-signal evidence in the main body
    pop_matches = find_matches(POPULATION_TERMS, body_text)
    update_matches = find_matches(UPDATE_TERMS, body_text)
    fitness_matches = find_matches(FITNESS_TERMS, body_text)
    dynamics_matches = find_matches(DYNAMICS_TERMS, body_text)
    nature_matches = find_matches(GENERIC_NATURE_TERMS, body_text)
    
    # Check for mathematical equations
    equation_evidence = []
    for pat in EQUATION_PATTERNS:
        eq_m = re.findall(pat, body_text)
        if eq_m:
            equation_evidence.append(eq_m[0].strip())

    # Build evidence list
    evidence = []
    if detected_algorithms:
        evidence.append(f"Identified algorithm(s): {', '.join(detected_algorithms[:3])}")
    if equation_evidence or any("equation" in u.lower() or "update" in u.lower() for u in update_matches):
        evidence.append("Mathematical position / velocity update rules detected")
    if pop_matches:
        evidence.append(f"Population / agent modeling: {', '.join(pop_matches[:3])}")
    if fitness_matches:
        evidence.append(f"Optimization objective / fitness formulation: {', '.join(fitness_matches[:3])}")
    if update_matches:
        evidence.append(f"Search operators & mechanisms: {', '.join(update_matches[:3])}")
    if dynamics_matches:
        evidence.append(f"Convergence & iterative dynamics: {', '.join(dynamics_matches[:3])}")
    if nature_matches:
        evidence.append(f"Nature-inspired classification: {', '.join(nature_matches[:2])}")

    # 8. Validation Decision Rules
    
    # Case A: Algorithm mentioned ONLY in references / bibliography
    if not body_alg_matches and ref_only_algs and len(evidence) <= 1:
        return {
            "accepted": False,
            "filename": filename,
            "detected_algorithms": [],
            "reason": f"Optimization algorithm references ({', '.join(ref_only_algs)}) were found only in the references/bibliography section. The document body does not describe an optimization algorithm.",
            "evidence": [],
            "extracted_text_length": extracted_len
        }

    # Case B: Unrelated document (e.g. web dev, business, literature, general coding)
    # Must have at least:
    # 1. An optimization problem / fitness context
    # 2. A population / agent concept
    # 3. An update rule, equation, or search dynamic
    has_fitness = len(fitness_matches) >= 1
    has_population = len(pop_matches) >= 1
    has_updates = len(update_matches) >= 1 or len(equation_evidence) >= 1
    has_dynamics = len(dynamics_matches) >= 1
    has_nature_context = len(nature_matches) >= 1 or len(detected_algorithms) >= 1

    signals_count = sum([
        1 if has_fitness else 0,
        1 if has_population else 0,
        1 if has_updates else 0,
        1 if has_dynamics else 0,
        1 if has_nature_context else 0
    ])

    # Case C: Valid Nature-Inspired Metaheuristic Algorithm
    # Accepted when there is strong multi-signal evidence of an algorithm:
    # Either:
    # - Known algorithm identified + at least 2 structural signals (e.g. population + update equations)
    # - OR generic nature-inspired metaheuristic with strong formulation (at least 3 signals including updates and fitness)
    if (len(detected_algorithms) >= 1 and signals_count >= 2) or (signals_count >= 3 and has_fitness and (has_updates or has_population)):
        default_alg = detected_algorithms if detected_algorithms else ["Nature-Inspired Metaheuristic Optimizer"]
        return {
            "accepted": True,
            "filename": filename,
            "detected_algorithms": default_alg,
            "reason": "This document appears to contain a nature-inspired metaheuristic optimization algorithm and is eligible for further analysis.",
            "evidence": evidence,
            "extracted_text_length": extracted_len
        }

    # Case D: Insufficient algorithm content / partial keywords only
    if signals_count >= 1:
        return {
            "accepted": False,
            "filename": filename,
            "detected_algorithms": detected_algorithms,
            "reason": "The document contains insufficient algorithm descriptions, mathematical update equations, or iterative search mechanisms.",
            "evidence": evidence,
            "extracted_text_length": extracted_len
        }

    # Case E: Completely unrelated topic
    return {
        "accepted": False,
        "filename": filename,
        "detected_algorithms": [],
        "reason": "No relevant nature-inspired metaheuristic optimization algorithm detected. The document appears to cover an unrelated topic.",
        "evidence": [],
        "extracted_text_length": extracted_len
    }

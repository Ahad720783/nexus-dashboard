import io
import pytest
from backend.validator import validate_algorithm_document, MAX_FILE_SIZE
import pymupdf
import docx


def create_minimal_pdf(text: str) -> bytes:
    doc = pymupdf.open()
    page = doc.new_page()
    page.insert_text((50, 72), text)
    buf = io.BytesIO()
    doc.save(buf)
    doc.close()
    return buf.getvalue()


def create_docx(paragraphs: list) -> bytes:
    doc = docx.Document()
    for p in paragraphs:
        doc.add_paragraph(p)
    buf = io.BytesIO()
    doc.save(buf)
    return buf.getvalue()


def test_valid_pso_pdf():
    text = """
    A Novel Modified Particle Swarm Optimization (MPSO) for Continuous Problems
    
    Abstract:
    In this paper, we propose a modified Particle Swarm Optimization (PSO) algorithm
    for solving nonlinear continuous global optimization problems.
    
    1. Introduction
    Particle swarm optimization is a popular population-based metaheuristic inspired by
    the flocking behavior of birds. Each candidate solution is represented as a particle
    in the D-dimensional search space.
    
    2. Swarm Dynamics and Position Update Rules
    The velocity update equation for particle i at iteration t+1 is formulated as:
    v_i(t+1) = w * v_i(t) + c1 * r1 * (pbest_i - x_i(t)) + c2 * r2 * (gbest - x_i(t))
    
    The position update rule moves each particle according to:
    x_i(t+1) = x_i(t) + v_i(t+1)
    
    3. Objective Function and Fitness Evaluation
    The objective function f(x) evaluates the fitness of each candidate solution.
    During iteration, the personal best pbest and global best gbest are updated.
    The balance between exploration and exploitation ensures rapid convergence.
    """
    pdf_bytes = create_minimal_pdf(text)
    result = validate_algorithm_document("mpso_paper.pdf", pdf_bytes)
    assert result["accepted"] is True
    assert any("Particle Swarm Optimization" in a for a in result["detected_algorithms"])
    assert result["extracted_text_length"] > 0
    assert len(result["evidence"]) >= 3


def test_unrelated_topic():
    text = """
    Modern Frontend Web Development with React and CSS
    
    In this article we discuss how to build scalable user interfaces using component architecture.
    State management, hook lifecycles, and responsive design patterns allow frontend developers
    to structure modern web applications efficiently. We also review CSS grid and flexbox layouts.
    """
    pdf_bytes = create_minimal_pdf(text)
    result = validate_algorithm_document("web_development.pdf", pdf_bytes)
    assert result["accepted"] is False
    assert "No relevant nature-inspired metaheuristic" in result["reason"] or "unrelated" in result["reason"].lower()


def test_references_only_mention():
    text = """
    Survey of Database Indexing Strategies in Cloud Storage
    
    Abstract:
    Relational database indexing relies heavily on B-Trees and LSM Trees to accelerate search queries.
    This paper examines disk I/O bottlenecks in distributed key-value stores.
    
    1. Introduction
    Database transactions require high throughput and ACID compliance. We evaluate B-Tree branch factors.
    
    References
    [1] Kennedy, J., and Eberhart, R. Particle Swarm Optimization. IEEE ICNN, 1995.
    [2] Mirjalili, S. Grey Wolf Optimizer. Advances in Engineering Software, 2014.
    """
    pdf_bytes = create_minimal_pdf(text)
    result = validate_algorithm_document("database_storage.pdf", pdf_bytes)
    assert result["accepted"] is False
    assert "references" in result["reason"].lower() or "unrelated" in result["reason"].lower()


def test_corrupted_or_empty_pdf():
    # Empty file
    result_empty = validate_algorithm_document("empty.pdf", b"")
    assert result_empty["accepted"] is False
    assert "empty" in result_empty["reason"].lower()

    # Corrupted PDF
    result_corrupt = validate_algorithm_document("corrupted.pdf", b"%PDF-corrupted-random-binary-data-without-valid-xref")
    assert result_corrupt["accepted"] is False
    assert "could not parse" in result_corrupt["reason"].lower() or "valid" in result_corrupt["reason"].lower()


def test_valid_docx():
    paragraphs = [
        "Grey Wolf Optimizer (GWO) for Structural Engineering Problems",
        "The Grey Wolf Optimizer is a bio-inspired swarm intelligence algorithm inspired by the leadership hierarchy and hunting behavior of grey wolves.",
        "The population is divided into alpha, beta, delta, and omega search agents.",
        "The position update equations guide search agents around the prey:",
        "D = |C * X_p(t) - X(t)|",
        "X(t+1) = X_p(t) - A * D",
        "The fitness function evaluates each wolf candidate solution in the search space.",
        "Exploration and exploitation are dynamically balanced across iterations until termination criterion is satisfied."
    ]
    docx_bytes = create_docx(paragraphs)
    result = validate_algorithm_document("gwo_study.docx", docx_bytes)
    assert result["accepted"] is True
    assert any("Grey Wolf Optimizer" in a for a in result["detected_algorithms"])
    assert len(result["evidence"]) >= 3


def test_valid_txt():
    txt = """
    Whale Optimization Algorithm (WOA) Implementation Details
    The Whale Optimization Algorithm is a nature-inspired metaheuristic based on bubble-net hunting.
    Search agents update their positions toward the best search agent using spiral and encircling mechanisms.
    Fitness evaluation of the candidate solution population optimizes the objective function.
    Update equation: X(t+1) = D' * exp(b*l) * cos(2*pi*l) + X*(t).
    Iterative convergence achieves global optimum.
    """
    result = validate_algorithm_document("woa_details.txt", txt.encode('utf-8'))
    assert result["accepted"] is True
    assert any("Whale Optimization" in a for a in result["detected_algorithms"])


def test_unsupported_file_type():
    result = validate_algorithm_document("algorithm.py", b"print('PSO code')")
    assert result["accepted"] is False
    assert "unsupported file format" in result["reason"].lower()

    result_exe = validate_algorithm_document("document.exe", b"MZ\x90\x00...")
    assert result_exe["accepted"] is False
    assert "unsupported file format" in result_exe["reason"].lower()


def test_oversized_file():
    oversized = b"0" * (MAX_FILE_SIZE + 1024)
    result = validate_algorithm_document("large_paper.pdf", oversized)
    assert result["accepted"] is False
    assert "exceeds the 10 mb limit" in result["reason"].lower()


if __name__ == "__main__":
    pytest.main(["-v", "backend/test_validator.py"])

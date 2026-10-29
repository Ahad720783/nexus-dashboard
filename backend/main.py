from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .validator import validate_algorithm_document, MAX_FILE_SIZE

app = FastAPI(
    title="MetaEquiv Analysis Engine API",
    description="Backend API for MetaEquiv algorithm validation and equivalence analysis",
    version="1.0.0"
)

# Enable CORS for frontend clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "MetaEquiv Algorithm Validator",
        "version": "1.0.0"
    }


@app.post("/api/algorithms/validate-file")
async def validate_file(file: UploadFile = File(...)):
    """
    Validates an uploaded algorithm document (PDF, DOCX, TXT)
    to check whether it contains a nature-inspired metaheuristic algorithm.
    """
    if not file or not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    # Sanitize and extract filename (prevent path traversal)
    filename = file.filename.replace("\\", "/").split("/")[-1]

    # Read file content safely in memory
    try:
        contents = await file.read()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read uploaded file: {str(e)}")

    # Enforce file size limit
    if len(contents) > MAX_FILE_SIZE:
        size_mb = round(len(contents) / (1024 * 1024), 2)
        return {
            "accepted": False,
            "filename": filename,
            "detected_algorithms": [],
            "reason": f"File size exceeds the 10 MB limit ({size_mb} MB). Please upload a smaller document.",
            "evidence": [],
            "extracted_text_length": 0
        }

    # Execute document validation pipeline
    result = validate_algorithm_document(filename, contents)
    return result

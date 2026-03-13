from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from coverage_calculator import calculate_coverage
from scoring_engine import calculate_risk

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequirementRequest(BaseModel):
    requirement: str


@app.get("/")
def home():
    return {"message": "QA Intelligence Engine Backend Running"}


@app.post("/coverage")
def coverage_analysis(data: RequirementRequest):

    coverage = calculate_coverage(data.requirement)

    return coverage


@app.post("/risk")
def risk_analysis(data: RequirementRequest):

    risk = calculate_risk(data.requirement)

    return risk


# NEW API → Generate Test Cases
@app.post("/testcases")
def generate_test_cases(data: RequirementRequest):

    requirement = data.requirement

    test_cases = [

        {
            "id": "TC01",
            "type": "Positive",
            "description": f"Verify that {requirement} with valid inputs",
            "expected": "Operation should be successful"
        },

        {
            "id": "TC02",
            "type": "Negative",
            "description": f"Verify that {requirement} fails with invalid input",
            "expected": "Error message should appear"
        },

        {
            "id": "TC03",
            "type": "Edge",
            "description": f"Verify boundary conditions for {requirement}",
            "expected": "System handles boundary correctly"
        }

    ]

    return {"test_cases": test_cases}
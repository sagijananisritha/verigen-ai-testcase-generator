import json
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequirementRequest(BaseModel):
    requirement_text: str

def generate_test_cases_with_ollama(srs_text: str) -> dict:
    url = "http://localhost:11434/api/generate"
    prompt = f"""
    You are an expert Senior QA Engineer. I will provide you with a Software Requirement text.
    Your job is to:
    1. Analyze the context.
    2. Extract input fields, business rules, validation rules, and constraints.
    3. Generate comprehensive test cases categorized strictly as: Positive, Negative, Boundary Value, Edge Cases, and Error Handling.

    You must output your response STRICTLY as a JSON object with this exact structure:
    {{
        "extracted_context": "A brief 2-sentence summary of the requirement",
        "business_rules": ["rule 1", "rule 2"],
        "test_cases": [
            {{
                "category": "Positive",
                "scenario": "Description of what is being tested",
                "test_steps": "1. Step one 2. Step two",
                "expected_result": "What should happen"
            }}
        ]
    }}

    Do not include any other text, greetings, or explanations outside the JSON block.

    Here is the Requirement Text to analyze:
    {srs_text}
    """

    payload = {
        
    "model": "llama3.2:1b", # <-- This specific version is incredibly lightweight
    "prompt": prompt,
    "format": "json",
    "stream": False

    }
    

    try:
        response = requests.post(url, json=payload)
        response.raise_for_status() 
        result = response.json()
        return json.loads(result["response"])
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error communicating with Ollama: {str(e)}")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Ollama returned invalid JSON.")


@app.get("/")
def read_root():
    return {"message": "Server is up!"}

# THE ENDPOINT WE ARE HITTING
@app.post("/generate-test-cases/")
async def generate_test_cases(request: RequirementRequest):
    if not request.requirement_text.strip():
        raise HTTPException(status_code=400, detail="Requirement text cannot be empty.")
    
    try:
        data = generate_test_cases_with_ollama(request.requirement_text)
        return {
            "message": "Success",
            "data": data
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
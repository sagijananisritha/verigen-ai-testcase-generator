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
class CoverageResponse(BaseModel):
    positive: int
    negative: int
    edge: int

class RiskResponse(BaseModel):
    high: int
    medium: int
    low: int
def generate_test_cases_with_ollama(srs_text: str) -> dict:
   def generate_test_cases_with_ollama(srs_text: str) -> dict:
    
    # --- ADD THIS PROMPT LINE HERE (Line 29) ---
    prompt = f"Generate exhaustive test cases for this requirement: {srs_text}"
    
    # Line 30: Now the payload can find the 'prompt' variable!
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": "llama3.2:1b",
        "prompt": prompt,  # <--- No more squiggle here!
        "stream": False,
        "options": {
            "temperature": 0.0,
            "num_predict": 500
        }
    }
    # 1. We removed "format": "json" so the AI doesn't freeze!
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": "llama3.2:1b",
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.0,
            "num_predict":500
            
        }
    }

    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        result = response.json()
        
        raw_ai_text = result.get("response", "").strip()
        
        # --- THE SURGICAL EXTRACTOR ---
        import re
        import json
        
        # This finds everything from the first '{' to the last '}'
        match = re.search(r'\{.*\}', raw_ai_text, re.DOTALL)
        
        if match:
            clean_json = match.group(0) # Extracts ONLY the JSON part
            return json.loads(clean_json)
        else:
            # If it totally failed, return an empty array to trigger the frontend message
            return {"test_cases": []}
            
    except Exception as e:
        print(f"Backend Error: {e}")
        return {"test_cases": []}

@app.get("/")
def read_root():
    return {"message": "Server is up!"}

# THE ENDPOINT WE ARE HITTING
@app.post("/generate-test-cases/")
async def generate_test_cases(request: RequirementRequest):
    prompt = f"""
    Requirement: "{request.requirement_text}"
    
    Generate test cases for this requirement. 
    You MUST return EXACTLY a JSON array. Do not write any conversational text.
    Use this exact format:
    [
        {{"id": "TC-1", "type": "Positive", "description": "user does X", "expected_result": "system does Y"}}
    ]
    """
    
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": "llama3.2:1b",
        "prompt": prompt,
        "stream": False,
        "format": "json", 
        "options": {
            "temperature": 0.0
        }
    }

    try:
        import json
        import requests
        import re
        
        response = requests.post(url, json=payload)
        response.raise_for_status()
        
        raw_text = response.json().get("response", "").strip()
        
        # Spy Camera in the Python Terminal
        print("\n=== WHAT THE AI WROTE ===")
        print(raw_text)
        print("=========================\n")
        
        # The Surgical Extractor: Cuts out just the JSON list
        match = re.search(r'\[.*\]', raw_text, re.DOTALL)
        if match:
            clean_json = match.group(0)
            data = json.loads(clean_json)
        else:
            data = json.loads(raw_text)
        
        # Wrap it safely for the website
        if isinstance(data, list):
            return {"test_cases": data}
            
        return data
        
    except Exception as e:
        print(f"Backend Crash: {e}")
        # The Dummy Fallback: Prints the error on your website table instead of crashing
        return {
            "test_cases": [
                {
                    "id": "SYS-ERR", 
                    "type": "Backend Crash", 
                    "description": "The AI failed or Python crashed.", 
                    "expected_result": str(e)
                }
            ]
        }
@app.post("/coverage", response_model=CoverageResponse)
async def get_coverage(request: RequirementRequest):
    # This is where your logic goes! 
    # For now, let's return some smart numbers based on the text length
    text = request.requirement_text.lower()
    
    # Simple logic: more words = more cases
    word_count = len(text.split())
    
    return {
        "positive": max(2, word_count // 5),
        "negative": max(1, word_count // 8),
        "edge": max(1, word_count // 10)
    } 
class RiskResponse(BaseModel):
    high: int
    medium: int
    low: int

@app.post("/risk", response_model=RiskResponse)
async def get_risk(request: RequirementRequest):
    text = request.requirement_text.lower()
    # Simple logic for risk assessment
    if "security" in text or "load" in text:
        return {"high": 1, "medium": 1, "low": 0}
    return {"high": 0, "medium": 1, "low": 2}

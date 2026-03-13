requirements = [
    {"id": 1, "text": "System should validate email before login", "risk": "High"},
    {"id": 2, "text": "System should allow password reset", "risk": "Medium"},
    {"id": 3, "text": "System should handle empty input fields", "risk": "High"}
]

test_cases = [
    {"id": 101, "text": "Verify invalid email without @ is rejected"},
    {"id": 102, "text": "Verify password reset link works"},
    {"id": 103, "text": "Verify system handles empty username field"}
]
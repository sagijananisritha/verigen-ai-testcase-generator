import faiss
import numpy as np
from embedding_engine import get_embedding
from data import requirements, test_cases

dimension = 384
index = faiss.IndexFlatL2(dimension)

# Convert test cases to embeddings
testcase_embeddings = []

for tc in test_cases:
    emb = get_embedding(tc["text"])
    testcase_embeddings.append(emb)

testcase_embeddings = np.array(testcase_embeddings)

# Add embeddings to FAISS index
index.add(testcase_embeddings)

def map_requirements():
    results = []

    for req in requirements:

        req_vector = np.array([get_embedding(req["text"])])

        distances, indices = index.search(req_vector, 1)

        similarity_distance = distances[0][0]

        # lower distance = more similar
        covered = similarity_distance < 1.2

        results.append({
            "requirement_id": req["id"],
            "risk": req["risk"],
            "covered": covered
        })

    return results
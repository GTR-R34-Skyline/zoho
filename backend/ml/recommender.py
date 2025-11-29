import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict

def recommend_for_member(member_skills: List[str], available_modules: List[Dict], top_k=3):
    if not available_modules:
        return []

    # 1. Prepare data for TF-IDF
    # Member profile is a string of their skills
    member_profile = " ".join(member_skills)
    
    # Module profiles are strings of their tags (and maybe title)
    module_profiles = [" ".join(m['tags']) + " " + m['title'] for m in available_modules]
    
    # Combine all documents to fit the vectorizer
    all_docs = [member_profile] + module_profiles
    
    # 2. Vectorize
    vectorizer = TfidfVectorizer(stop_words='english')
    try:
        tfidf_matrix = vectorizer.fit_transform(all_docs)
    except ValueError:
        # Handle empty vocabulary or stop words issues
        return []
    
    # 3. Calculate Similarity
    # Member vector is at index 0
    member_vec = tfidf_matrix[0:1]
    # Module vectors are from index 1 onwards
    module_vecs = tfidf_matrix[1:]
    
    cosine_similarities = cosine_similarity(member_vec, module_vecs).flatten()
    
    # 4. Rank and Format
    recommendations = []
    for i, score in enumerate(cosine_similarities):
        if score > 0.05: # Filter out very low relevance
            recommendations.append({
                "module": available_modules[i]['title'],
                "score": float(score),
                "reason": f"Matches your skills ({int(score*100)}% match)"
            })
    
    # Sort by score descending
    recommendations.sort(key=lambda x: x['score'], reverse=True)
    
    # Fallback if no matches found (e.g. new user with no skills)
    if not recommendations:
        # Recommend popular or beginner modules (mock logic)
        for module in available_modules[:top_k]:
             recommendations.append({
                "module": module['title'],
                "score": 0.0,
                "reason": "Popular for beginners"
            })
            
    return recommendations[:top_k]

if __name__ == "__main__":
    # Demo
    sample_member = ["React", "JavaScript"]
    modules = [
        {"title": "Advanced React Patterns", "tags": ["React", "Frontend"]},
        {"title": "Intro to Python", "tags": ["Python", "Backend"]},
        {"title": "Node.js Microservices", "tags": ["Node.js", "Backend", "JavaScript"]},
        {"title": "Data Science 101", "tags": ["Python", "Data"]}
    ]
    print("Member Skills:", sample_member)
    recs = recommend_for_member(sample_member, modules)
    for r in recs:
        print(f"- {r['module']}: {r['reason']}")

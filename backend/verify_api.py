import requests
import sys
import time

BASE_URL = "http://localhost:8000/api"

def test_endpoint(method, endpoint, data=None):
    url = f"{BASE_URL}{endpoint}"
    print(f"Testing {method} {endpoint}...", end=" ", flush=True)
    try:
        if method == "GET":
            response = requests.get(url)
        elif method == "POST":
            response = requests.post(url, json=data)
        elif method == "PUT":
            response = requests.put(url, json=data)
        
        print(f"Status: {response.status_code}")
        if response.status_code >= 400:
            print(f"  Error: {response.text}")
            return False
        return True
    except Exception as e:
        print(f"\n  Failed to connect to {url}: {e}")
        return False

def main():
    print("Verifying API Endpoints...")
    
    # Check if backend is running
    try:
        requests.get("http://localhost:8000/")
    except:
        print("Backend is not running. Please start the backend server.")
        return

    # Test Settings
    test_endpoint("GET", "/settings")
    
    # Test Members
    if test_endpoint("GET", "/members"):
        # Create a test member
        new_member = {
            "name": "Test User",
            "email": f"test_{int(time.time())}@example.com", # Unique email
            "role": "Developer",
            "initials": "TU",
            "skills": [],
            "interests": [],
            "participation_score": 0,
            "learning_path_status": "Not Started"
        }
        test_endpoint("POST", "/members", new_member)

    # Test Tasks
    test_endpoint("GET", "/tasks")
    
    # Test Paths
    test_endpoint("GET", "/paths")
    
    # Test Analytics
    test_endpoint("GET", "/analytics")

    print("\nVerification Complete.")

if __name__ == "__main__":
    main()

#!/bin/bash
set -e

BASE_URL="http://localhost:8000/api"

echo "Checking Health..."
curl -f -s "http://localhost:8000/health" || exit 1

echo "Registering User..."
EMAIL="curl_test_$(date +%s)@example.com"
RESPONSE=$(curl -f -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Curl User\", \"email\": \"$EMAIL\", \"password\": \"password\", \"role\": \"Tester\"}")
USER_ID=$(echo $RESPONSE | grep -o '"id":[^,]*' | cut -d':' -f2 | tr -d '}')
echo "User ID: $USER_ID"

echo "Logging In..."
LOGIN_RESP=$(curl -f -s -X POST "$BASE_URL/auth/login" \
  -F "username=$EMAIL" -F "password=password")
TOKEN=$(echo $LOGIN_RESP | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
echo "Token obtained"

echo "Creating Task..."
TASK_RESP=$(curl -f -s -X POST "$BASE_URL/tasks" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Curl Task", "status": "Pending"}')
TASK_ID=$(echo $TASK_RESP | grep -o '"id":[^,]*' | cut -d':' -f2 | tr -d '}')
echo "Task ID: $TASK_ID"

echo "Assigning Task..."
curl -f -s -X POST "$BASE_URL/tasks/$TASK_ID/assign?member_id=$USER_ID" \
  -H "Authorization: Bearer $TOKEN"

echo "Verifying Task..."
curl -f -s "$BASE_URL/tasks" \
  -H "Authorization: Bearer $TOKEN" | grep "$TASK_ID" > /dev/null

echo "ALL CHECKS PASSED"

# Use official Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY . .

# Expose port
EXPOSE 8000

# Run the application
# We use the 'backend' package, so we need to be in the parent directory of 'backend' 
# OR we adjust the command. 
# Since we are copying everything into /app, and 'main.py' is in /app (if we copy contents of backend to /app)
# WAIT. The user has 'backend/' directory.
# If I copy 'backend/' to '/app/backend', then I run 'uvicorn backend.main:app'

# Let's assume the build context is the 'backend' folder itself for simplicity in some cases,
# BUT usually we build from root.
# Let's make this Dockerfile assume it's placed in 'backend/' but run from root context? 
# No, standard is:
# Dockerfile is in backend/
# COPY . /app  -> copies contents of backend/ to /app
# So /app/main.py exists.
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

# Deployment Guide

Your Full Stack application is ready to be deployed!

## 1. Push to GitHub
1.  Create a new repository on [GitHub](https://github.com/new).
2.  Run the following commands in your terminal (replace `YOUR_REPO_URL` with your actual repository URL):
    ```bash
    git remote add origin YOUR_REPO_URL
    git branch -M main
    git push -u origin main
    ```

## 2. Deploy Backend (Render)
We will deploy the Python backend first so we can get the API URL.
1.  Go to [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  **Configuration**:
    *   **Name**: `skillpath-backend` (or similar)
    *   **Root Directory**: `backend`
    *   **Runtime**: `Docker` (Render will auto-detect the Dockerfile)
    *   **Instance Type**: Free
5.  Click **Create Web Service**.
6.  Wait for deployment to finish. **Copy the Service URL** (e.g., `https://skillpath-backend.onrender.com`).

## 3. Deploy Frontend (Vercel)
Now we deploy the React frontend and tell it where the backend is.
1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Configuration**:
    *   **Framework Preset**: Vite (Auto-detected)
    *   **Root Directory**: `frontend` (Click Edit if needed)
    *   **Environment Variables**:
        *   Key: `VITE_API_URL`
        *   Value: `YOUR_BACKEND_URL/api` (e.g., `https://skillpath-backend.onrender.com/api`)
        *   *Note: Don't forget the `/api` at the end!*
5.  Click **Deploy**.

## 4. Done!
Visit your Vercel URL. Your app should be live and connected to the backend!

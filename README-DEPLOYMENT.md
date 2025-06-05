# Myna Kitchen - React Deployment Instructions

This document provides step-by-step instructions to deploy the React version of the Myna Kitchen website to GitHub Pages.

## Prerequisites

- Install [Node.js](https://nodejs.org/) on your local machine (LTS version recommended)
- Have Git installed and configured with your GitHub account
- Have access to the GitHub repository at [https://github.com/myna-kitchen/myna-kitchen.github.io](https://github.com/myna-kitchen/myna-kitchen.github.io)

## One-time Setup Steps

1. Clone the repository (if you haven't already):
   ```bash
   git clone https://github.com/myna-kitchen/myna-kitchen.github.io.git
   cd myna-kitchen.github.io
   ```

2. Switch to the React branch or create a new one (optional):
   ```bash
   git checkout -b react-version
   ```

3. Copy all files from the React project into the repository:
   ```bash
   # Assuming the React project is in a sibling directory named 'myna'
   cp -r ../myna/* .
   cp -r ../myna/.* .
   ```

4. Install dependencies (including the gh-pages package):
   ```bash
   npm install
   ```

## Deployment Steps

Every time you want to deploy updates:

1. Make your changes to the React code

2. Run the deployment script:
   ```bash
   ./deploy.sh
   ```
   
   Or manually:
   ```bash
   npm run deploy
   ```

3. The script will:
   - Build the optimized production version of your React app
   - Push the built files to the gh-pages branch
   - Deploy your site to GitHub Pages

4. Your site will be available at [https://myna-kitchen.github.io](https://myna-kitchen.github.io)

## Important Notes

- The first deployment may take a few minutes to become available
- GitHub Pages uses the `gh-pages` branch for deployment, not your main branch
- Your source code will remain in the main branch, while the built site goes to gh-pages
- You can continue to use both HTML and React versions during transition by keeping separate branches

## Troubleshooting

- If deployment fails, check if you have the correct GitHub access
- Make sure your repository settings have GitHub Pages enabled
- If the site doesn't update after deployment, try clearing your browser cache

## Development Workflow

For local development:

1. Navigate to your project directory:
   ```bash
   cd myna-kitchen.github.io
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Your site will be available at http://localhost:3000 for testing 
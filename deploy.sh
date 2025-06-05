#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Build and deploy
echo "Building and deploying to GitHub Pages..."
npm run deploy

echo "Deployment complete! Your site should be available at https://myna-kitchen.github.io" 
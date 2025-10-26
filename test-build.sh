#!/bin/bash
echo "🏗️  Testing production build..."
echo ""
echo "Starting server with /myna base path..."
echo "Visit: http://localhost:3000/myna/"
echo ""
echo "Note: You MUST visit /myna/ (with trailing slash)!"
echo "Press Ctrl+C to stop the server"
echo ""

# Check if serve is installed
if ! command -v serve &> /dev/null; then
    echo "Installing 'serve' package..."
    npm install -g serve
fi

serve -s build -p 3000

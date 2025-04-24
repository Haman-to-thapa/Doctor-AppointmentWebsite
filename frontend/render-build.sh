#!/bin/bash

# Install dependencies
npm install

# Fix vulnerabilities
npm audit fix

# Build the project
npm run build

# Verify the dist directory exists
if [ -d "dist" ]; then
  echo "Build successful! dist directory created."
  
  # Create a build directory and copy the contents of dist to it
  mkdir -p build
  cp -r dist/* build/
  
  echo "Created build directory with contents of dist for Render compatibility."
else
  echo "Build failed! dist directory not found."
  exit 1
fi

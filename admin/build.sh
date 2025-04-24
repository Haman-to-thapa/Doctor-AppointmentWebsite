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
else
  echo "Build failed! dist directory not found."
  exit 1
fi

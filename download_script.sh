#!/bin/bash

# Specify the URL of the GitHub repository
REPO_URL="https://github.com/ClaudineiAn/shop.git"  # Replace with your repository URL

# Specify the directory where you want to download the files
DEST_DIR="C:\shopProject\shop"  # Replace with your desired destination directory

# Check if the destination directory exists, if not, create it
if [ ! -d "$DEST_DIR" ]; then
    mkdir -p "$DEST_DIR"
fi

# Navigate to the destination directory
cd "$DEST_DIR" || exit

# Clone or update the repository
if [ -d "$(basename "$REPO_URL" .git)" ]; then
    # If it exists, update it with the latest changes
    cd "$(basename "$REPO_URL" .git)" || exit
    git pull origin main  # Adjust 'main' to match your repository's default branch
else
    # If it doesn't exist, clone the repository
    git clone "$REPO_URL" .
fi

# Navigate back to the destination directory
cd "$DEST_DIR/$(basename "$REPO_URL" .git)" || exit

# Find changed files between HEAD and the previous commit
CHANGED_FILES=$(git diff --name-only HEAD^ HEAD)

# Download each changed file
for file in $CHANGED_FILES; do
    curl -O "https://raw.githubusercontent.com/ClaudineiAn/shop/main/$file"  # Adjust branch name as needed
done
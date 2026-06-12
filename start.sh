#!/bin/bash
set -e

BRANCH="claude/monthly-cost-calculator-m5vnuz"

echo ">>> Pulling latest code..."
git pull origin "$BRANCH" --rebase

echo ">>> Installing frontend deps..."
npm install

echo ">>> Installing backend deps..."
cd server && npm install && cd ..

echo ">>> Building frontend..."
npm run build

echo ">>> Starting server on port 3006..."
npm start

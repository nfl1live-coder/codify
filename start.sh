#!/bin/bash
set -e

BRANCH="claude/monthly-cost-calculator-m5vnuz"
PORT=${PORT:-3006}

echo ">>> Pulling latest code..."
git pull origin "$BRANCH" --rebase

echo ">>> Installing PHP deps..."
composer install --no-dev --optimize-autoloader

echo ">>> Installing frontend deps..."
npm install

echo ">>> Building frontend..."
npm run build

echo ">>> Starting PHP server on port $PORT..."
php -S 0.0.0.0:$PORT api/router.php

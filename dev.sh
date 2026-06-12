#!/bin/bash
set -e

PORT=${PORT:-3006}

echo ">>> Installing PHP deps..."
composer install

echo ">>> Installing frontend deps..."
npm install

echo ">>> Starting PHP backend on :$PORT..."
php -S 0.0.0.0:$PORT api/router.php &
PHP_PID=$!
trap "kill $PHP_PID 2>/dev/null; exit" SIGINT SIGTERM EXIT

echo ">>> Starting Vite frontend on :5173 (proxies /api to :$PORT)..."
npm run dev

wait

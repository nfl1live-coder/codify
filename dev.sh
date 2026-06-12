#!/bin/bash
set -e

echo ">>> Installing frontend deps..."
npm install

echo ">>> Installing backend deps..."
cd server && npm install && cd ..

echo ">>> Starting dev servers (frontend :5173, backend :3006)..."
npm run dev:all

<?php

require_once __DIR__ . '/../vendor/autoload.php';

$mongoUri = getenv('MONGODB_URI') ?: 'mongodb://localhost:27017/budget_tracker';

try {
    $client = new MongoDB\Client($mongoUri);
    $budgets = $client->budget_tracker->budgets;
} catch (Exception $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

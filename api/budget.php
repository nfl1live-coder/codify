<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

require_once __DIR__ . '/config.php';

preg_match('/\/api\/budget\/([^\/\?]+)/', $_SERVER['REQUEST_URI'], $m);
$sessionId = $m[1] ?? null;

if (!$sessionId) {
    http_response_code(400);
    echo json_encode(['error' => 'Session ID required']);
    exit;
}

$typeMap = ['root' => 'array', 'document' => 'array', 'array' => 'array'];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $budget = $budgets->findOne(['sessionId' => $sessionId], ['typeMap' => $typeMap]);
    if (!$budget) {
        echo json_encode(['income' => 0, 'expenses' => [], 'savingsGoal' => 0, 'currency' => 'USD']);
    } else {
        echo json_encode([
            'income'      => (float)($budget['income'] ?? 0),
            'expenses'    => array_values($budget['expenses'] ?? []),
            'savingsGoal' => (float)($budget['savingsGoal'] ?? 0),
            'currency'    => $budget['currency'] ?? 'USD',
        ]);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true);
    if (!$body) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        exit;
    }

    $budgets->updateOne(
        ['sessionId' => $sessionId],
        ['$set' => [
            'sessionId'   => $sessionId,
            'income'      => (float)($body['income'] ?? 0),
            'expenses'    => $body['expenses'] ?? [],
            'savingsGoal' => (float)($body['savingsGoal'] ?? 0),
            'currency'    => $body['currency'] ?? 'USD',
            'updatedAt'   => new MongoDB\BSON\UTCDateTime(),
        ]],
        ['upsert' => true]
    );

    echo json_encode(['success' => true]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);

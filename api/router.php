<?php

// Load .env
$envFile = __DIR__ . '/../.env';
if (file_exists($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if (str_starts_with(trim($line), '#')) continue;
        [$key, $val] = array_map('trim', explode('=', $line, 2));
        if (!getenv($key)) putenv("$key=$val");
    }
}

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Route API requests to budget handler
if (str_starts_with($path, '/api/budget/')) {
    require __DIR__ . '/budget.php';
    return;
}

// Serve static files from dist/
$distPath = realpath(__DIR__ . '/../dist');
if ($distPath) {
    $file = $distPath . $path;
    if (is_file($file)) {
        return false; // PHP built-in server serves the file with correct MIME
    }
    // SPA fallback
    header('Content-Type: text/html');
    readfile($distPath . '/index.html');
} else {
    http_response_code(404);
    echo 'Frontend not built. Run: npm run build';
}

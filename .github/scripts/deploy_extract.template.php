<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('memory_limit', '512M');
set_time_limit(300);
ignore_user_abort(true);

header('Content-Type: text/plain; charset=utf-8');

$expected_token = '%%DEPLOY_TOKEN%%';
$provided_token = isset($_GET['token']) ? (string)$_GET['token'] : '';

if (empty($expected_token) || !hash_equals($expected_token, $provided_token)) {
    http_response_code(403);
    echo "ERROR: Unauthorized access.";
    exit;
}

$zip_file = __DIR__ . '/deploy_payload.zip';

if (!file_exists($zip_file)) {
    http_response_code(404);
    echo "ERROR: deploy_payload.zip not found on server.";
    exit;
}

if (!class_exists('ZipArchive')) {
    http_response_code(500);
    echo "ERROR: PHP ZipArchive extension is not available.";
    exit;
}

$zip = new ZipArchive();
$res = $zip->open($zip_file);

if ($res !== TRUE) {
    http_response_code(500);
    echo "ERROR: Unable to open zip file (Code: $res).";
    exit;
}

$extracted = $zip->extractTo(__DIR__);
$zip->close();

if (!$extracted) {
    http_response_code(500);
    echo "ERROR: Failed to extract files.";
    exit;
}

// Self-destruct temporary deploy files
@unlink($zip_file);
@unlink(__FILE__);

echo "DEPLOY_SUCCESS: All files extracted and cleaned up successfully.";

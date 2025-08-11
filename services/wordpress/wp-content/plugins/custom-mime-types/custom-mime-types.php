<?php
/**
 * Plugin Name: Custom Mime Types and CORS
 * Description: Allows uploading of custom mime types (SGF) and enables CORS for Next.js frontend.
 * Version: 1.0
 * Author: Gemini
 */

// Allow SGF file uploads
function add_sgf_file_to_mimes($mimes) {
    $mimes['sgf'] = 'application/x-go-sgf';
    return $mimes;
}
add_filter('upload_mimes', 'add_sgf_file_to_mimes');

// Enable CORS for Next.js frontend
add_action( 'init', 'add_cors_headers' );
function add_cors_headers() {
    // Allow requests from your Next.js development server
    header( 'Access-Control-Allow-Origin: http://localhost:3001' );
    header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
    header( 'Access-Control-Allow-Headers: Content-Type, Authorization' );
    header( 'Access-Control-Allow-Credentials: true' );

    // Handle preflight OPTIONS requests
    if ( 'OPTIONS' === $_SERVER['REQUEST_METHOD'] ) {
        status_header( 200 );
        exit();
    }
}

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\StatsController;

Route::get('/health', fn () => ['ok' => true]);

// Login por token (público, sin sesión/CSRF)
Route::post('/login-token', [AuthController::class, 'loginToken']);

// Protected routes with Sanctum authentication
Route::middleware('auth:sanctum')->group(function () {
    // Tasks CRUD
    Route::apiResource('tasks', TaskController::class);
    
    // Stats endpoint
    Route::get('/stats', StatsController::class);
});

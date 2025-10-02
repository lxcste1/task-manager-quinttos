<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\StatsController;

Route::get('/health', fn () => ['ok' => true]);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::get(TaskController::TASK_ROUTE, [TaskController::class, 'show']);
    Route::put(TaskController::TASK_ROUTE, [TaskController::class, 'update']);
    Route::delete(TaskController::TASK_ROUTE, [TaskController::class, 'destroy']);

    Route::get('/me/tasks/home', [TaskController::class, 'home']);
    Route::get('/me/tasks/board', [TaskController::class, 'board']);
});

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\StatsController;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Task;

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

        Route::get('/me', function (Request $request) {
        return $request->user()->only(['id','name','email']);
    });

    Route::get('/me/tasks/home', [TaskController::class, 'home']);
    Route::get('/me/tasks/board', [TaskController::class, 'board']);

    Route::get('/users', function () {
        return User::query()->select('id','name','email')->orderBy('name')->get();
    });

    Route::get('/stats', function (Request $request) {
        $uid = $request->user()->id;
        return [
            'assigned_to_me' => Task::where('assigned_to', $uid)->count(),
            'created_by_me'  => Task::where('created_by',  $uid)->count(),
        ];
    });
});

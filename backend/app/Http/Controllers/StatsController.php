<?php

namespace App\Http\Controllers;

use App\Models\Task;

class StatsController extends Controller
{
    public function __invoke()
    {
        return [
            'total' => Task::count(),
            'completed' => Task::where('status','completed')->count(),
            'pending'  => Task::where('status','pending')->count(),
        ];
    }
}

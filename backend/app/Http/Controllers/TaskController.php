<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Resources\TaskResource;
use App\Http\Requests\TaskStoreRequest;
use App\Http\Requests\TaskUpdateRequest;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $q = Task::query();

        if ($search = $request->string('search')->toString()) {
            $q->where('title', 'like', "%{$search}%");
        }
        if ($status = $request->string('status')->toString()) {
            $q->where('status', $status);
        }

        $tasks = $q->latest()->paginate(10);
        return TaskResource::collection($tasks);
    }

    public function store(TaskStoreRequest $request)
    {
        $task = Task::create($request->validated());
        return new TaskResource($task);
    }

    public function show(Task $task) { return new TaskResource($task); }

    public function update(TaskUpdateRequest $request, Task $task)
    {
        $task->update($request->validated());
        return new TaskResource($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->noContent();
    }
}

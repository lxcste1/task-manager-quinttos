<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{

    public const TASK_ROUTE = '/tasks/{task}';

    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $tasks = Task::query()
            ->authVisible($userId)
            ->latest()
            ->paginate(15);

        return response()->json($tasks);
    }

    public function home(Request $request)
    {
        return $this->index($request);
    }

    public function board(Request $request)
    {
        $userId = $request->user()->id;

        $tasks = Task::query()
            ->authVisible($userId)
            ->orderByRaw("FIELD(status, 'pending','completed') asc")
            ->paginate(15);

        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status'      => ['nullable', Rule::in(['pending','completed'])],
            'assigned_to' => ['nullable', 'integer', 'exists:users,id'],
        ]);

        $assignedTo = $data['assigned_to'] ?? $user->id;

        $task = Task::create([
            'title'       => $data['title'],
            'description' => $data['description'] ?? null,
            'status'      => $data['status'] ?? 'pending',
            'created_by'  => $user->id,
            'assigned_to' => $assignedTo,
        ]);

        return response()->json($task, 201);
    }

    public function show(Task $task, Request $request)
    {
        $this->authorizeView($task, $request->user()->id);
        return response()->json($task);
    }

    public function update(Task $task, Request $request)
    {
        $this->authorizeView($task, $request->user()->id);

        $data = $request->validate([
            'title'       => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'status'      => ['sometimes', Rule::in(['pending','completed'])],
            'assigned_to' => ['sometimes', 'integer', 'exists:users,id'],
        ]);

        if (array_key_exists('assigned_to', $data)) {
            $task->assigned_to = $data['assigned_to'];
        }

        $task->fill(collect($data)->except('assigned_to')->toArray())->save();

        return response()->json($task);
    }

    public function destroy(Task $task, Request $request)
    {
        $this->authorizeView($task, $request->user()->id);
        $task->delete();
        return response()->json(['message' => 'Tarea eliminada']);
    }

    private function authorizeView(Task $task, int $userId): void
    {
        if ($task->assigned_to !== $userId && $task->created_by !== $userId) {
            abort(403, 'No autorizado');
        }
    }
}


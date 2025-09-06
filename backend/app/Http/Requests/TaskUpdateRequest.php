<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array
    {
        return [
            'title' => ['sometimes','string','max:255'],
            'description' => ['sometimes','nullable','string'],
            'status' => ['sometimes','in:pending,completed'],
        ];
    }
}

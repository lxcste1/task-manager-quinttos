<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('tasks', function (Blueprint $table) {
            // autor de la tarea
            if (!Schema::hasColumn('tasks', 'created_by')) {
                $table->foreignId('created_by')->nullable()->constrained('users')->cascadeOnDelete();
            }
            // asignado a
            if (!Schema::hasColumn('tasks', 'assigned_to')) {
                $table->foreignId('assigned_to')->nullable()->constrained('users')->cascadeOnDelete();
            }
        });
    }
    public function down(): void {
        Schema::table('tasks', function (Blueprint $table) {
            if (Schema::hasColumn('tasks', 'assigned_to')) {
                $table->dropConstrainedForeignId('assigned_to');
            }
            if (Schema::hasColumn('tasks', 'created_by')) {
                $table->dropConstrainedForeignId('created_by');
            }
        });
    }
};

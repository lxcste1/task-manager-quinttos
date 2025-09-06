<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Login que devuelve un token Bearer (sin sesión ni CSRF)
    public function loginToken(Request $request)
    {
        $credentials = $request->validate([
            'email'    => ['required','email'],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 422);
        }

        $user = $request->user();

        // (opcional) solo admins
        if (!$user->is_admin) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        // Crear token personal de Sanctum
        $token = $user->createToken('web')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => $user,
        ]);
    }

    // Cerrar sesión invalidando el/los tokens
    public function logoutToken(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'ok']);
    }

    public function me(Request $request)
    {
        return response()->json(['user' => $request->user()]);
    }
}

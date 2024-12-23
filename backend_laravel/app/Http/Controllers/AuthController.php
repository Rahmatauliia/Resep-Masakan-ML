<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:55',
            'email' => 'email|required|unique:users',
            'password' => 'required|confirmed'
        ]);

        $validatedData['password'] = bcrypt($request->password);

        $user = User::create($validatedData);

        $accessToken = $user->createToken('authToken')->plainTextToken;

        if (!Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            return response()->json(['message' => 'Invalid Credentials'], 401);
        }

        return response(['user' => $user, 'access_token' => $accessToken]);
    }

    public function login(Request $request)
    {
        $loginData = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if (!Auth::attempt($loginData)) {
            if (!Auth::attempt($loginData)) {
                if (!User::where('email', $request->email)->exists()) {
                    return response()->json(['message' => 'Email salah'], 401);
                } else {
                    return response()->json(['message' => 'Password salah'], 401);
                }
            }
        }

        $accessToken = Auth::user()->createToken('authToken')->plainTextToken;

        return response(['user' => Auth::user(), 'access_token' => $accessToken]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function totalUser()
    {
        $user = User::all();
        return response()->json([
            'total' => count($user)
        ]);
    }
}

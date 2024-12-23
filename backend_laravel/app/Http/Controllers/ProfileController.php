<?php

namespace App\Http\Controllers;

use App\Models\Resep;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function changeName(Request $request)
    {
        $validated = $request->validate([
            'name' => 'string|required'
        ]);
        $user = User::find(Auth::user()->id)->first();

        $user->name = $request->name;
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'Nama berhasil di update',
            'user' => $user
        ]);
    }

    public function changePassword(Request $request)
    {
        $validated = $request->validate([
            'password' => 'required|min:8',
            'new_password' => 'required|confirmed|min:8|different:password'
        ]);

        $user = User::find(Auth::user()->id)->first();
        if (Hash::check($request->password, $user->password)) {
            $user->fill([
                'password' => Hash::make($request->new_password)
            ])->save();

            return response()->json([
                'message' => 'Password berhasil di update',
                'status' => 200,
            ]);
        } else {
            return response()->json([
                'message' => 'Password gagal di update',
                'status' => 400,
            ], 400);
        }
    }
}

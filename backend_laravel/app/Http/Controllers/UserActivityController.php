<?php

namespace App\Http\Controllers;

use App\Models\UserActivity;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Auth;

class UserActivityController extends Controller implements HasMiddleware
{
    public static function middleware(): array 
    {
        return [
            'auth:sanctum',
        ];
    }

    public function index() {
        $data = UserActivity::all();
        return response()->json([
            'data' => $data
        ]);
    }

    public function show(UserActivity $userActivity) {
        return response()->json([
            'data' => $userActivity
        ]);
    }

    public function store(Request $request) {
        $validate = $request->validate([
            'id_resep' => 'required',
        ]);
        $userId = Auth::user()->id;
        $recentActivity = UserActivity::where('id_user', $userId)->where('id_resep', $request->id_resep)->first();

        if ($recentActivity) {
            return response()->json([
                'message' => 'User Activity already exists',
            ], 422);
        }

        $allActivity = UserActivity::where('id_user', $userId)->latest('created_at')->get();

        if ($allActivity->count() > 20) {
            $oldestActivity = $allActivity->last();
            $oldestActivity->delete();
        }
        $validate['id_user'] = Auth::user()->id;
        $userActivity = UserActivity::create($validate);
        return response()->json([
            'data' => $userActivity
        ]);
    }

    public function destroy(UserActivity $userActivity) {
        $userActivity->delete();
        return response()->json([
            'message' => 'Data resep favorit berhasil dihapus'
        ]);
    }

    public function update(Request $request, UserActivity $userActivity) {
        $validate = $request->validate([
            'id_resep' => 'required',
            'id_user' => 'required',
        ]);
        $userActivity->update($validate);
        return response()->json([
            'data' => $userActivity
        ]);
    }
}

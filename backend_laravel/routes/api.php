<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\DaerahController;
use App\Http\Controllers\FavoritController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResepController;
use App\Http\Controllers\UserActivityController;
use App\Models\UserActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/change-name', [ProfileController::class, 'changeName'])->middleware('auth:sanctum');
Route::post('/change-password', [ProfileController::class, 'changePassword'])->middleware('auth:sanctum');

Route::get('/total-user', [AuthController::class, 'totalUser']);

Route::apiResource('/resep', ResepController::class, ['except' => ['create', 'edit']]);
Route::get('/resep/daerah/{daerah:nama}', [ResepController::class, 'showResepByDaerah']);
Route::get('/search', [ResepController::class, 'search']);
Route::apiResource('/favorit', FavoritController::class, ['except' => ['create', 'edit']]);
Route::get('/favorituser/{resep}', [FavoritController::class, 'ResepFavoriteUser'])->middleware('auth:sanctum');
// Route::get('/showFavoriteResepUser', [FavoritController::class, 'showFavoriteResepUser'])->middleware('auth:sanctum');
Route::apiResource('/kategori', KategoriController::class, ['except' => ['create', 'edit']]);
Route::apiResource('/daerah', DaerahController::class, ['except' => ['create', 'edit']]);
Route::apiResource('/aktifitas-user', UserActivityController::class, ['except' => ['create', 'edit']]);
Route::apiResource('/banner', BannerController::class, ['only' => ['index', 'store', 'destroy']]);
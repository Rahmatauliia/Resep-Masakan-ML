<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller implements HasMiddleware
{

    public static function middleware(){
        return [
            new Middleware('auth:sanctum', only: ['store', 'update', 'destroy'])
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $banner = Banner::all();

        return response()->json($banner);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        $path = Storage::disk('public')->put('banner', $request->file('image'));
        
        $banner = Banner::create([
            'image_url' => $path,
        ]);

        return response()->json($banner);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Banner $banner)
    {
        $filePath = $banner->image_url;
        if (Storage::disk('public')->exists($filePath)) {
            Storage::disk('public')->delete($filePath);
            return "File berhasil dihapus.";
        } else {
            return "File tidak ditemukan.";
        }
        $banner->delete();
        return response()->json([
            'message' => 'Data banner berhasil dihapus'
        ]);
    }
}

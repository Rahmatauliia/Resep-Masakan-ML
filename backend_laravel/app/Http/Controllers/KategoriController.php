<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;

use Str;

class KategoriController extends Controller
{
    public static function middleware(): array
    {
        return [
            new Middleware('isAdmin', only: ['store', 'update', 'destroy'])
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kategoris = Kategori::all();
        return response()->json([
            'data' => $kategoris
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'nama' => 'required|max:255'
        ]);
        $validate['slug'] = Str::slug($request->slug);
        $kategori = Kategori::create($validate);
        return response()->json([
            'data' => $kategori,
            'message' => 'Data kategori berhasil ditambahkan'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Kategori $kategori)
    {
        return response()->json([
            'data' => $kategori
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kategori $kategori)
    {
        $validate = $request->validate([
            'nama' => 'required|max:255'
        ]);
        $kategori->update($validate);
        return response()->json([
            'data' => $kategori,
            'message' => 'Data kategori berhasil diupdate'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kategori $kategori)
    {
        $kategori->delete();
        return response()->json([
            'message' => 'Data kategori berhasil dihapus'
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Daerah;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
use Str;

class DaerahController extends Controller
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
    public function index(Request $request)
    {
        $limit = $request->query('limit');
        $daerahs = $limit ? Daerah::limit($limit)->get() : Daerah::all();
        if ($daerahs->count() > 0) {
            return response()->json([
                'data' => $daerahs,
            ]);
            
        } else {
            return response()->json([
                'message' => 'Data daerah tidak ditemukan'
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'nama' => 'required|max:255'
        ]);
        $validate['slug'] = Str::slug($request->nama);
        $daerah = Daerah::create($validate);
        return response()->json([
            'data' => $daerah,
            'message' => 'Data daerah berhasil ditambahkan'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Daerah $daerah)
    {
        return response()->json([
            'data' => $daerah
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Daerah $daerah)
    {
        $validate = $request->validate([
            'nama' => 'required|max:255'
        ]);
        $validate['slug'] = Str::slug($request->nama);
        $daerah->update($validate);
        return response()->json([
            'data' => $daerah,
            'message' => 'Data daerah berhasil diupdate'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Daerah $daerah)
    {
        $daerah->delete();
        return response()->json([
            'message' => 'Data daerah berhasil dihapus'
        ]);
    }
}

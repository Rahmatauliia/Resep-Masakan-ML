<?php

namespace App\Http\Controllers;

use App\Models\Favorit;
use App\Models\Resep;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class FavoritController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: ['show'])
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $favorit = Favorit::where('id_user', Auth::user()->id)->with('resep')->get();
        return $favorit->map(function($item) {
            return [
                'id' => $item->id,
                'id_resep' => $item->resep->id,
                'nama' => $item->resep->nama,
                'slug' => $item->resep->slug,
                'bahan' => $item->resep->bahan,
                'langkah' => $item->resep->langkah,
                'kategori' => $item->resep->kategori->nama,
                'daerah' => $item->resep->daerah->nama,
                'gambar' => $item->resep->gambar,
                'jumlah_favorit' => Favorit::where('id_resep', $item->resep->id)->count(),
                'created_at' => $item->resep->created_at,
                'updated_at' => $item->resep->updated_at
            ];
        })->collect();
    }

    public function ResepFavoriteUser(Resep $resep) {
        $favorit = Favorit::where('id_user', Auth::user()->id)->where('id_resep', $resep->id)->get();
        $favoritCount = Favorit::where('id_resep', $resep->id)->count();
        if (count($favorit) == 0) {
            return response()->json([
                'message' => 'Data resep favorit tidak ditemukan',
                'jumlah_favorit' => $favoritCount,
            ], 404);
        }
        return response()->json([
            'data' => $resep->first(),
            'jumlah_favorit' => $favoritCount,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'id_resep' => 'required',
        ]);
        $like = Favorit::where('id_user', Auth::user()->id)->where('id_resep', $request->id_resep)->first();
        if($like) {
            $like->delete();
            return response()->json([
                'message' => 'Data resep favorit berhasil dihapus'
            ]);
        } else {
            $validate['id_user'] = Auth::user()->id;
            $favorit = Favorit::create($validate);
            return response()->json([
                'data' => $favorit,
                'message' => 'Data resep favorit berhasil ditambahkan'
            ]);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Resep $resep)
    {
        $favorit = Favorit::where('id_resep', $resep->id)->get();
        if (count($favorit) == 0) {
            return response()->json([
                'message' => 'Data resep favorit tidak ditemukan'
            ], 404);
        }
        return response()->json([
            'data' => $resep->first(),
            'jumlah_favorit' => count($favorit),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Favorit $favorit)
    {
        $validate = $request->validate([
            'id_resep' => 'required'
        ]);
        if ($favorit->id_user != Auth::user()->id) {
            return response()->json([
                'message' => 'Data resep favorit tidak ditemukan'
            ], 404);
        }
        $favorit->update($validate);
        return response()->json([
            'data' => $favorit,
            'message' => 'Data resep favorit berhasil diupdate'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Favorit $favorit)
    {
        if ($favorit->id_user != Auth::user()->id) {
            return response()->json([
                'message' => 'Data resep favorit tidak ditemukan'
            ], 404);
        }
        $favorit->delete();
        return response()->json([
            'message' => 'Data resep favorit berhasil dihapus'
        ]);
    }
}

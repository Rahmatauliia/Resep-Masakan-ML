<?php

namespace App\Http\Controllers;

use App\Models\Daerah;
use App\Models\Favorit;
use App\Models\Resep;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;
use Str;

class ResepController extends Controller
{
    public static function middleware(): array
    {
        return [
            'auth:sanctum',
            new Middleware('isAdmin', only: ['store', 'update', 'destroy'])
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $limit = $request->query('limit');

        if ($request->has('favorite')) {
            $reseps = $limit ? Resep::withCount('favorit')->orderByDesc('favorit_count')->limit($limit)->get() : Resep::withCount('favorit')->orderByDesc('favorit_count')->get();
        } elseif ($request->has('latest')) {
            $reseps = $limit ? Resep::latest()->limit($limit)->get() : Resep::latest()->get();
        } elseif ($request->has('oldest')) {
            $reseps = $limit ? Resep::oldest()->limit($limit)->get() : Resep::oldest()->get();
        } else {
            $reseps = $limit ? Resep::limit($limit)->get() : Resep::all();
        }
        $data = [];
        foreach ($reseps as $resep) {
            $data[] = [
                'id' => $resep->id,
                'nama' => $resep->nama,
                'slug' => $resep->slug,
                'bahan' => $resep->bahan,
                'langkah' => $resep->langkah,
                'gambar' => $resep->gambar,
                'kategori' => $resep->kategori->nama,
                'daerah' => $resep->daerah->nama,
                'jumlah_favorit' => Favorit::where('id_resep', $resep->id)->count(),
                'created_at' => $resep->created_at,
                'updated_at' => $resep->updated_at
            ];
        }
        return response()->json([
            'data' => $data
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'nama' => 'required|max:255',
            'bahan' => 'required',
            'langkah' => 'required',
            'gambar' => 'required',
            'id_daerah' => 'required',
            'id_kategori' => 'required'
        ]);
        $validate['slug'] = Str::slug($request->nama);

        $gambar = $request->file('gambar');
        $namaGambar = time() . '-' . $gambar->getClientOriginalName();
        $gambar->storeAs('public/images', $namaGambar);
        $validate['gambar'] = $namaGambar;

        $resep = Resep::create($validate);
        return response()->json([
            'data' => $resep,

            'message' => 'Data resep berhasil ditambahkan'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Resep $resep)
    {
        $data[] = [
            'id' => $resep->id,
            'nama' => $resep->nama,
            'slug' => $resep->slug,
            'bahan' => $resep->bahan,
            'langkah' => $resep->langkah,
            'gambar' => $resep->gambar,
            'kategori' => $resep->kategori->nama,
            'daerah' => $resep->daerah->nama,
            'jumlah_favorit' => Favorit::where('id_resep', $resep->id)->count(),
            'created_at' => $resep->created_at,
            'updated_at' => $resep->updated_at
        ];
        return response()->json([
            'data' => $resep,
            'jumlah_favorit' => Favorit::where('id_resep', $resep->id)->count()
        ]);
    }

    public function showResepByDaerah(Daerah $daerah)
    {
        $reseps = Resep::where('id_daerah', $daerah->id)->get();
        $data = [];
        foreach ($reseps as $resep) {
            $data[] = [
                'id' => $resep->id,
            'nama' => $resep->nama,
            'slug' => $resep->slug,
            'bahan' => $resep->bahan,
            'langkah' => $resep->langkah,
            'gambar' => $resep->gambar,
            'kategori' => $resep->kategori->nama,
            'nama_daerah' => $resep->daerah->nama,
            'jumlah_favorit' => Favorit::where('id_resep', $resep->id)->count(),
            'created_at' => $resep->created_at,
            'updated_at' => $resep->updated_at
            ];
        }
        return response()->json([
            'data' => $data
        ]);
    }

    public function search(Request $request)
    {
        $reseps = Resep::where('nama', 'like', "%{$request->input('search')}%")->get();
        $data = [];
        foreach ($reseps as $resep) {
            $data[] = [
                'id' => $resep->id,
                'nama' => $resep->nama,
                'slug' => $resep->slug,
                'bahan' => $resep->bahan,
                'langkah' => $resep->langkah,
                'gambar' => $resep->gambar,
                'kategori' => $resep->kategori->nama,
                'daerah' => $resep->daerah->nama,
                'jumlah_favorit' => Favorit::where('id_resep', $resep->id)->count(),
                'created_at' => $resep->created_at,
                'updated_at' => $resep->updated_at
            ];
        }
        return response()->json([
            'data' => $data
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Resep $resep)
    {
        $validate = $request->validate([
            'nama' => 'required|max:255',
            'bahan' => 'required',
            'langkah' => 'required',
            'id_daerah' => 'required',
            'id_kategori' => 'required'
        ]);

        $validate['slug'] = Str::slug($request->nama);

        $gambar = $request->file('gambar');
        if ($request->hasFile('gambar')) {
            $namaGambar = time() . '-' . $gambar->getClientOriginalName();
            $gambar->storeAs('public/images', $namaGambar);
            $validate['gambar'] = $namaGambar;
            Storage::delete("public/images/{$resep->gambar}");
        }

        $resep->update($validate);
        return response()->json([
            'data' => $resep,
            'message' => 'Data resep berhasil diupdate'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resep $resep)
    {
        $resep->delete();
        Storage::delete("public/images/{$resep->gambar}");
        return response()->json([
            'message' => 'Data resep berhasil dihapus'
        ]);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Resep extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Get the kategori that owns the Resep
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function kategori(): HasOne
    {
        return $this->hasOne(Kategori::class, 'id', 'id_kategori');
    }

    /**
     * Get all of the favorite for the Resep
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function favorit(): HasMany
    {
        return $this->hasMany(Favorit::class, 'id_resep');
    }

    /**
     * Get the daerah that owns the Resep
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function daerah(): HasOne
    {
        return $this->hasOne(Daerah::class, 'id', 'id_daerah');
    }
}

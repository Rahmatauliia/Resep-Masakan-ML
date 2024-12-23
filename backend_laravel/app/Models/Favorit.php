<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Favorit extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_resep',
        'id_user'
    ];

    /**
     * Get the resep associated with the Favorit
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function resep(): HasOne
    {
        return $this->hasOne(Resep::class, 'id', 'id_resep');
    }
}

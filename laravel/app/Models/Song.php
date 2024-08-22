<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    protected $fillable = [
        'band_id',
        'title',
        'youtube_url',
        'spotify_url',
    ];

    public function band()
    {
        return $this->belongsTo(Band::class);
    }
}

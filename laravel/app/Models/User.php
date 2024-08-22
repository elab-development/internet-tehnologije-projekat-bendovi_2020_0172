<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Band extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'genre',
        'image_url', // URL slike benda
        'youtube_channel', // Link ka YouTube kanalu benda
        'spotify_profile', // Link ka Spotify profilu benda
    ];

    public function songs()
    {
        return $this->hasMany(Song::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function favorites()
    {
        return $this->hasMany(FavoriteBand::class);
    }

    public function suggestedSongs()
    {
        return $this->hasMany(SuggestedSong::class);
    }
}

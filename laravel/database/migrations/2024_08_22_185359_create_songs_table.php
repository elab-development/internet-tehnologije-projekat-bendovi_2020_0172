<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('songs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('band_id')->constrained()->onDelete('cascade'); // Strani ključ koji povezuje pesmu sa bendom
            $table->string('title'); // Naziv pesme
            $table->string('youtube_url')->nullable(); // URL pesme na YouTube-u, može biti prazno
            $table->string('spotify_url')->nullable(); // URL pesme na Spotify-u, može biti prazno
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('songs');
    }
};

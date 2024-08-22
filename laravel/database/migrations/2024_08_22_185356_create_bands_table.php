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
        Schema::create('bands', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Ime benda
            $table->text('description')->nullable(); // Opis benda
            $table->string('genre'); // Žanr muzike
            $table->string('image_url')->nullable(); // URL slike benda
            $table->string('youtube_channel')->nullable(); // Link ka YouTube kanalu benda
            $table->string('spotify_profile')->nullable(); // Link ka Spotify profilu benda
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
        Schema::dropIfExists('bands');
    }
};

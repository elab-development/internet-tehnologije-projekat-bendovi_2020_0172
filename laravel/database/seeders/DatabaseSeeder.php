<?php

 
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Seed users table
        DB::table('users')->insert([
            [
                'name' => 'John Doe',
                'email' => 'johndoe@example.com',
                'email_verified_at' => now(),
                'password' => bcrypt('password'), 
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
                'phone_number' => '1234567890',
                'bio' => 'Music enthusiast',
                'birthdate' => '1990-01-01',
                'profile_photo' => 'https://example.com/photo.jpg',
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'janesmith@example.com',
                'email_verified_at' => now(),
                'password' => bcrypt('password'), 
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
                'phone_number' => '0987654321',
                'bio' => 'Band manager',
                'birthdate' => '1985-05-15',
                'profile_photo' => 'https://example.com/photo2.jpg',
            ],
        ]);

        // Seed bands table
        DB::table('bands')->insert([
            [
                'name' => 'The Rolling Stones',
                'description' => 'Legendary rock band',
                'genre' => 'Rock',
                'image_url' => 'https://example.com/rollingstones.jpg',
                'youtube_channel' => 'https://youtube.com/rollingstones',
                'spotify_profile' => 'https://spotify.com/rollingstones',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'The Beatles',
                'description' => 'The most influential band of all time',
                'genre' => 'Rock',
                'image_url' => 'https://example.com/beatles.jpg',
                'youtube_channel' => 'https://youtube.com/beatles',
                'spotify_profile' => 'https://spotify.com/beatles',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Seed songs table
        DB::table('songs')->insert([
            [
                'band_id' => 1,  
                'title' => 'Paint It Black',
                'youtube_url' => 'https://youtube.com/paintitblack',
                'spotify_url' => 'https://spotify.com/paintitblack',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'band_id' => 2,  
                'title' => 'Hey Jude',
                'youtube_url' => 'https://youtube.com/heyjude',
                'spotify_url' => 'https://spotify.com/heyjude',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Seed comments table
        DB::table('comments')->insert([
            [
                'user_id' => 1,  
                'band_id' => 1, // The Rolling Stones
                'content' => 'Amazing band!',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,  
                'band_id' => 2, // The Beatles
                'content' => 'Love their music!',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Seed favorite_bands table
        DB::table('favorite_bands')->insert([
            [
                'user_id' => 1, // John Doe
                'band_id' => 2, // The Beatles
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2, // Jane Smith
                'band_id' => 1, // The Rolling Stones
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Seed ratings table
        DB::table('ratings')->insert([
            [
                'user_id' => 1,
                'band_id' => 1, 
                'rating' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'band_id' => 2, 
                'rating' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

      

       
    }
}

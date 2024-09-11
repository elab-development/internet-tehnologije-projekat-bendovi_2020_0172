<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BandController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FavoriteBandController;
use App\Http\Controllers\SongController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/bands', [BandController::class, 'index']);
Route::get('/songs', [SongController::class, 'index']);
Route::get('/comments', [CommentController::class, 'index']);
Route::get('/bands/{band_id}/songs', [SongController::class, 'getSongsByBand']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
   
    Route::get('/bands/{id}', [BandController::class, 'show']);
    Route::post('/bands', [BandController::class, 'store']);
    Route::put('/bands/{id}', [BandController::class, 'update']);
    Route::delete('/bands/{id}', [BandController::class, 'destroy']);

   
    Route::get('/songs/{id}', [SongController::class, 'show']);
    Route::post('/songs', [SongController::class, 'store']);
    Route::put('/songs/{id}', [SongController::class, 'update']);
    Route::delete('/songs/{id}', [SongController::class, 'destroy']);

    Route::get('/favorite-bands', [FavoriteBandController::class, 'index']);
    Route::get('/favorite-bands/{id}', [FavoriteBandController::class, 'show']);
    Route::post('/favorite-bands', [FavoriteBandController::class, 'store']);
    Route::put('/favorite-bands/{id}', [FavoriteBandController::class, 'update']);
    Route::delete('/favorite-bands/{id}', [FavoriteBandController::class, 'destroy']);


   
    Route::get('/comments/{id}', [CommentController::class, 'show']);
    Route::post('/comments', [CommentController::class, 'store']);
    Route::put('/comments/{id}', [CommentController::class, 'update']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
});


 
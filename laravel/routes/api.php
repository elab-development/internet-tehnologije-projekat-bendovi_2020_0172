<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BandController;
use App\Http\Controllers\SongController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::get('/bands', [BandController::class, 'index']);
    Route::get('/bands/{id}', [BandController::class, 'show']);
    Route::post('/bands', [BandController::class, 'store']);
    Route::put('/bands/{id}', [BandController::class, 'update']);
    Route::delete('/bands/{id}', [BandController::class, 'destroy']);


    Route::get('/songs', [SongController::class, 'index']);
    Route::get('/songs/{id}', [SongController::class, 'show']);
    Route::post('/songs', [SongController::class, 'store']);
    Route::put('/songs/{id}', [SongController::class, 'update']);
    Route::delete('/songs/{id}', [SongController::class, 'destroy']);
});


 
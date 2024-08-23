<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BandController;
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::get('/bands', [BandController::class, 'index']);
    Route::get('/bands/{id}', [BandController::class, 'show']);
    Route::post('/bands', [BandController::class, 'store']);
    Route::put('/bands/{id}', [BandController::class, 'update']);
    Route::delete('/bands/{id}', [BandController::class, 'destroy']);
});


 
<?php

namespace App\Http\Controllers;

use App\Models\FavoriteBand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FavoriteBandController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $favoriteBands = FavoriteBand::where('user_id', $user->id)->get();

        return response()->json($favoriteBands);
    }

    public function show($id)
    {
        $user = auth()->user();

        $favoriteBand = FavoriteBand::where('user_id', $user->id)->findOrFail($id);

        return response()->json($favoriteBand);
    }

    public function store(Request $request)
    {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'band_id' => 'required|exists:bands,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $favoriteBand = FavoriteBand::create([
            'user_id' => $user->id,
            'band_id' => $request->band_id,
        ]);

        return response()->json($favoriteBand, 201);
    }

    public function update(Request $request, $id)
    {
        $user = auth()->user();

        $favoriteBand = FavoriteBand::where('user_id', $user->id)->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'band_id' => 'required|exists:bands,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $favoriteBand->update([
            'band_id' => $request->band_id,
        ]);

        return response()->json($favoriteBand);
    }

    public function destroy($id)
    {
        $user = auth()->user();

        $favoriteBand = FavoriteBand::where('user_id', $user->id)->findOrFail($id);

        $favoriteBand->delete();

        return response()->json(['message' => 'Favorite band deleted successfully']);
    }
}

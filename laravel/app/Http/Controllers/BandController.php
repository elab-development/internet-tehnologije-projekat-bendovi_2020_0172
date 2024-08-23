<?php

namespace App\Http\Controllers;

use App\Models\Band;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BandController extends Controller
{
    // Prikazuje listu svih bendova
    public function index()
    {
        $bands = Band::all();
        return response()->json($bands, 200);
    }

    // Prikazuje informacije o odredjenom bendu
    public function show($id)
    {
        $band = Band::findOrFail($id);
        return response()->json($band, 200);
    }

    // Kreira novi bend
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'genre' => 'required|string|max:100',
            'image_url' => 'nullable|url',
            'youtube_channel' => 'nullable|url',
            'spotify_profile' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $band = Band::create($request->all());

        return response()->json($band, 201);
    }

    // Ažurira informacije o bendu
    public function update(Request $request, $id)
    {
        $band = Band::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'genre' => 'required|string|max:100',
            'image_url' => 'nullable|url',
            'youtube_channel' => 'nullable|url',
            'spotify_profile' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $band->update($request->all());

        return response()->json($band, 200);
    }

    // Briše bend iz baze podataka
    public function destroy($id)
    {
        $band = Band::findOrFail($id);
        $band->delete();

        return response()->json(['message' => 'Band deleted successfully'], 200);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Models\Band;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SongController extends Controller
{
    /**
     * Prikazuje listu svih pesama.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $songs = Song::with('band')->get();
        return response()->json([
            'success' => true,
            'data' => $songs
        ], 200);
    }
    /**
     * Prikazuje sve pesme određenog benda.
     *
     * @param  int  $band_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSongsByBand($band_id)
    {
        // Proverava da li bend postoji
        $band = Band::findOrFail($band_id);

        // Dohvata sve pesme koje pripadaju tom bendu
        $songs = Song::where('band_id', $band_id)->with('band')->get();

        return response()->json([
            'success' => true,
            'data' => $songs
        ], 200);
    }

    /**
     * Prikazuje pojedinačnu pesmu po ID-u.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $song = Song::with('band')->findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $song
        ], 200);
    }

    /**
     * Kreira novu pesmu.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'band_id' => 'required|exists:bands,id',
            'title' => 'required|string|max:255',
            'youtube_url' => 'nullable|url',
            'spotify_url' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 400);
        }

        $song = Song::create($validator->validated());

        return response()->json([
            'success' => true,
            'data' => $song
        ], 201);
    }

    /**
     * Ažurira postojeću pesmu.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $song = Song::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'band_id' => 'required|exists:bands,id',
            'title' => 'required|string|max:255',
            'youtube_url' => 'nullable|url',
            'spotify_url' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 400);
        }

        $song->update($validator->validated());

        return response()->json([
            'success' => true,
            'data' => $song
        ], 200);
    }

    /**
     * Briše pesmu iz baze podataka.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $song = Song::findOrFail($id);
        $song->delete();

        return response()->json([
            'success' => true,
            'message' => 'Song deleted successfully'
        ], 200);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function index()
    {
         

        $comments = Comment::all();

        return response()->json($comments);
    }



    public function store(Request $request)
    {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'band_id' => 'required|exists:bands,id',
            'content' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $comment = Comment::create([
            'user_id' => $user->id,
            'band_id' => $request->band_id,
            'content' => $request->content,
        ]);

        return response()->json($comment, 201);
    }

    public function update(Request $request, $id)
    {
        $user = auth()->user();

        $comment = Comment::where('user_id', $user->id)->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'band_id' => 'required|exists:bands,id',
            'content' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $comment->update([
            'band_id' => $request->band_id,
            'content' => $request->content,
        ]);

        return response()->json($comment);
    }

    public function destroy($id)
    {
        $user = auth()->user();

        $comment = Comment::where('user_id', $user->id)->findOrFail($id);

        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully']);
    }
}

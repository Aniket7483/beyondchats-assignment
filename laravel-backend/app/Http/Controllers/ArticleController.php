<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index()
    {
        return Article::latest()->get();
    }

    public function store(Request $request)
    {
        return Article::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . time(),
            'content' => $request->content,
            'source_url' => $request->source_url,
            'version' => $request->version
        ]);
    }

    public function show($id)
    {
        return Article::findOrFail($id);
    }
}

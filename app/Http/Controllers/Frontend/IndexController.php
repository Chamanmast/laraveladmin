<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function index()
    {
        return Inertia::render('test');
    }

     public function submit(Request $request)
    {
       dd($request);
    }
}

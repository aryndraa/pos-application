<?php

namespace App\Http\Controllers\MenuCategory;

use App\Http\Controllers\Controller;
use App\Http\Requests\MenuCategory\UpsSerRequest;
use App\Models\File;
use App\Models\MenuCategory;
use Illuminate\Http\Request;

class MenuCategoryController extends Controller
{
    public function store(UpsSerRequest $request)
    {
        $category = MenuCategory::query()
            ->create($request->validated());
        
        if($request->hasFile('image')) {
            File::uploadFile($request->file('image'), $category, 'image', 'categories');
        }

        return redirect()
            ->back()
            ->with('success', 'Category created successfully!');
    }
}

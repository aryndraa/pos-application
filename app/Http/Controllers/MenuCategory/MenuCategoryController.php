<?php

namespace App\Http\Controllers\MenuCategory;

use App\Http\Controllers\Controller;
use App\Http\Requests\MenuCategory\UpsSerRequest;
use App\Models\File;
use App\Models\MenuCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

    public function update(UpsSerRequest $request, MenuCategory $category)
    {
        $category->update($request->validated());

        if($request->hasFile('image')) {
            $image = $request->file('image');

            if($category->image) {
                 Storage::disk('public')->delete($category->image);
                 $category->image->delete(); 
            }

            File::uploadFile($image, $category, 'image', 'categories');
        }

         return redirect()
            ->back()
            ->with('success', 'Category created successfully!');
    }
}

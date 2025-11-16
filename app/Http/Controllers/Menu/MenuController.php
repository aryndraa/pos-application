<?php

namespace App\Http\Controllers\Menu;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\MenuCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $filter = $request->get('filter');
        $category = $request->get('category');

        $baseQuery = Menu::query()
            ->withCount('orders')
            ->with('category');

        $menu = (clone $baseQuery)
            ->when($filter === "lowstock", fn($q) =>
                $q->where('stock', '<=', 5)
            )
            ->when($filter === "popular", fn($q) =>
                $q->withSum('orders as total_sold', 'quantity')
                    ->orderByDesc('total_sold')
                    ->limit(8)
            )
            ->when($filter === "available", fn($q) =>
                $q->where('is_available', true)
            )
            ->when($filter === "unavailable", fn($q) =>
                $q->where('is_available', false)
            )
            ->when($category, fn($q) => 
                $q->whereHas('category', fn($r) =>
                    $r->where('name', $category)
                )
            )
            ->get();

        $categories = MenuCategory::with('image')
            ->get()
            ->map(function ($cat) {
                return [
                    'id'       => $cat->id,
                    'name'     => $cat->name,
                    'file_url' => $cat->image ? $cat->image->file_url : null,
                ];
            });
    
        return Inertia::render('menu', [
            'menu' => $menu,
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

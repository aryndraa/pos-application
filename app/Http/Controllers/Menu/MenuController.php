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
        $search = $request->get('search');

        $baseQuery = Menu::query()
            ->withCount('orders')
            ->with(['category', 'image']);

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
           ->when($category, function ($q) use ($category) {
                $categories = explode(',', $category);

                $q->whereHas('category', fn($r) =>
                    $r->whereIn('name', $categories)
                );
            })
            ->when($search, fn($q) =>
                $q->where('name', 'like', '%' . $search . '%')
            )
            ->paginate('10')
            ->withQueryString()
            ->through(function ($item) {
                return [
                    'id'            => $item->id,
                    'name'          => $item->name,
                    'sku'           => $item->sku,
                    'price'         => $item->price,
                    'stock'         => $item->stock,
                    'is_available'  => $item->is_available,
                    'category'      => $item->category->name,
                    'file_url'      => $item->image ? $item->image->file_url : null,
                ];
            });

        $categories = MenuCategory::with('image')
            ->get()
            ->map(function ($cat) {
                return [
                    'id'       => $cat->id,
                    'name'     => $cat->name,
                    'file_url' => $cat->image ? $cat->image->file_url : null,
                ];
            });

         $lowStockMenu = Menu::query()
            ->where('stock', '<=', 5)
            ->orderBy('stock', 'asc')
            ->get(['id', 'name', 'stock']);
    
        return Inertia::render('menu/index', [
            'menu'         => $menu,
            'categories'   => $categories,
            'lowStockMenu' => $lowStockMenu,
             'filters'      => [
                'search' => $search,
                'category' => $category,
                'filter' => $filter,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = MenuCategory::with('image')
            ->get()
            ->map(function ($cat) {
                return [
                    'id'       => $cat->id,
                    'name'     => $cat->name,
                    'file_url' => $cat->image ? $cat->image->file_url : null,
                ];
            });

        return Inertia::render('menu/create', [
            'categories' => $categories
        ]);
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

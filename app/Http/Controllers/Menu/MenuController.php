<?php

namespace App\Http\Controllers\Menu;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\MenuCategory;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
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
                    ->orWhere('sku', 'like', '%'. $search.'%')
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
    public function show(Menu $menu)
    {
        $menu->load(['category', 'additionals', 'additionals.items', 'image']);

        $orderHistory = Order::query()
            ->join('order_items', 'orders.id', '=', 'order_items.order_id')
            ->selectRaw('DATE(orders.order_date) as date, SUM(order_items.quantity) as total')
            ->where('order_items.menu_id', $menu->id)
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $totalOrders = $orderHistory->sum('total');

        return Inertia::render('menu/show', [
            'id' => $menu->id,
            'name' => $menu->name,
            'sku' => $menu->sku,
            'price' => $menu->price,
            'stock' => $menu->stock,
            'is_available' => $menu->is_available,
            'recipe' => Str::limit($menu->recipe, 210),
            'category' => $menu->category?->name,
            'image' => $menu->image?->url,
            'additionals' => $menu->additionals->map(function ($additional) {
                return [
                    'name' => $additional->name,
                    'items' => $additional->items->map(fn($item) => [
                        'id' => $item->id,
                        'name' => $item->name,
                        'additional_price' => $item->additional_price,
                        'stock' => $item->stock
                    ]),
                ];
            }),
            'order_history' => $orderHistory,
            'totalOrders'  => $totalOrders
        ]);
    }

    public function recipe (Menu $menu) 
    {
        return Inertia::render('menu/recipe', [
            'id' => $menu->id,
            'name' => $menu->name,
            'recipe' => $menu->recipe
        ]);
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

<?php

namespace App\Http\Controllers\POS;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\MenuCategory;
use Inertia\Inertia;
use PhpParser\Builder\Interface_;

class POSController extends Controller
{
    public function index()
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

        $menu = Menu::query()
            ->with(['category', 'image',  'additionals', 'additionals.items'])
            ->where('stock', ">", 0)
            ->orderBy('menu_category_id')
            ->get()
            ->groupBy(fn ($item) => $item->category->name)
            ->map(fn ($items, $categoryName) => [
                'name' => $categoryName,
                'items' => $items->map(function ($item)  {
                    return [
                        'id'            => $item->id,
                        'name'          => $item->name,
                        'sku'           => $item->sku,
                        'price'         => $item->price,
                        'stock'         => $item->stock,
                        'is_available'  => $item->is_available,
                        'category'      => $item->category->name,
                        'file_url'      => $item->image ? $item->image->file_url : null,
                        'additionals' => $item->additionals->map(function ($additional) {
                            return [
                                'name' => $additional->name,
                                'is_required'          => $additional->is_required,
                                'type'                 => $additional->type,
                                'items'                => $additional->items->map(fn($item) => [
                                    'id'               => $item->id,
                                    'name'             => $item->name,
                                    'additional_price' => $item->additional_price,
                                    'stock'            => $item->stock,
                                ]),
                            ];
                        }),
                    ];
                }), 
            ])
            ->values(); 

        return Inertia::render('POS', [
            'categories' => $categories,
            'menu' => $menu
        ]);
    }
}

<?php

namespace App\Http\Controllers\POS;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\MenuCategory;
use App\Models\Order;
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
            ->where('is_available', true)
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

        return Inertia::render('pos/index', [
            'categories' => $categories,
            'menu' => $menu
        ]);
    }

    public function bill(Order $order) 
    {
        $order->load(['items.menu', 'items.orderAdditionals.additionalItem']);

        return Inertia::render('pos/bill', [
            'id' => $order->id,
            'code' => $order->code,
            'customer_name' => $order->customer_name,
            'order_date' => $order->order_date,
            'pay' => $order->pay,
            'change' => $order->change,
            'payment_method' => $order->payment_method,
            'total_price' => $order->total_price,
            'status' => $order->status,
            'items' => $order->items->map(function($item) {
                return [
                    'id' => $item->id,
                    'menu' => [
                        'id' => $item->menu->id,
                        'name' => $item->menu->name,
                    ],
                    'quantity' => $item->quantity,
                    'unit_price' => $item->unit_price,
                    'subtotal' => $item->subtotal,
                    'notes' => $item->notes ?? '',
                    'additionals' => $item->orderAdditionals->map(function($add) {
                        return [
                            'id' => $add->id,
                            'quantity' => $add->quantity,
                            'unit_price' => $add->unit_price,
                            'additional_item' => [
                                'id' => $add->additionalItem->id,
                                'name' => $add->additionalItem->name,
                            ],
                        ];
                    })->toArray(),
                ];
            })->toArray(),
        ]);
    }
}

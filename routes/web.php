<?php

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Hiistory\HistoryController;
use App\Http\Controllers\Kitchen\KitchenController;
use App\Http\Controllers\Menu\MenuController;
use App\Http\Controllers\Order\OrderController;
use App\Http\Controllers\POS\POSController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'role:cashier,admin'])
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('cashier');

        Route::controller(MenuController::class)
            ->prefix('menu')
            ->name('menu')
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/{menu}', 'show')->name('show');
                Route::get('/{menu}/recipe', 'recipe')->name('recipe');
            });


        Route::controller(POSController::class)
            ->prefix('pos')
            ->name('pos.')
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/bill/{order}', 'bill')->name('bill');
            });

        Route::controller(OrderController::class)
            ->group(function () {
                Route::prefix('orders')
                    ->name('orders.')
                    ->group(function() {
                        Route::get('/', 'index')->name('index');
                        Route::post('', 'store')->name('store');
                        Route::get('/{order}', 'show')->name('show');
                    });
            });

        Route::get('/histories', [HistoryController::class, 'index'])->name('histories');
    });


Route::middleware(['auth', 'role:kitchen,admin'])
    ->prefix('kitchen')
    ->name('kitchen.')
    ->group(function () {
        Route::get('/display', [KitchenController::class, 'index'])->name('display');
        Route::get('/orders', [KitchenController::class, 'getOrders'])->name('orders');
        Route::post('/orders/{order}/status', [KitchenController::class, 'updateStatus'])->name('update-status');
    });


    require __DIR__.'/auth.php';



// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('');
//     })->name('dashboard');  
// });


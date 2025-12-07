<?php

use App\Http\Controllers\Auth\KitchenAuthController;
use App\Http\Controllers\Kitchen\KitchenController;

Route::middleware('guest:kitchen')
    ->prefix('kitchen/auth')   
    ->name('kitchen.') 
    ->group(function () {
        Route::controller(KitchenAuthController::class)
            ->name('auth.')
            ->group(function() {
                Route::get('/login', 'showLogin')->name('login');
                Route::post('/login', 'login');
            });
    });

Route::middleware(['role:kitchen,kitchen'])
    ->prefix('kitchen')
    ->name('kitchen.')
    ->group(function () {
        Route::get('/', [KitchenController::class, 'index'])->name('display');
        Route::get('/orders', [KitchenController::class, 'getOrders'])->name('orders');
        Route::post('/orders/{order}/status', [KitchenController::class, 'updateStatus'])->name('update-status');
        Route::post('/auth/logout', [KitchenAuthController::class, 'logout'])->name('cashier.auth.logout');
    });
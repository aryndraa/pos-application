<?php

use App\Http\Controllers\Auth\CashierAuthController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Hiistory\HistoryController;
use App\Http\Controllers\Menu\MenuController;
use App\Http\Controllers\Order\OrderController;
use App\Http\Controllers\POS\POSController;

Route::middleware('guest:cashier')
    ->prefix('cashier/auth')   
    ->name('cashier.') 
    ->group(function () {
        Route::controller(CashierAuthController::class)
            ->name('auth.')
            ->group(function() {
                Route::get('/login', 'showLogin')->name('login');
                Route::post('/login', 'login');
            });
    });

Route::middleware(['role:cashier,cashier'])
    ->prefix('cashier')
    ->name('cashier.')
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        Route::controller(MenuController::class)
            ->prefix('menu')
            ->name('menu.')
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
            ->prefix('orders')
            ->name('orders.')
            ->group(function() {
                Route::get('/', 'index')->name('index');
                Route::post('', 'store')->name('store');
                Route::get('/{order}', 'show')->name('show');
            });

        Route::get('/histories', [HistoryController::class, 'index'])->name('histories');

        Route::post('/auth/logout', [CashierAuthController::class, 'logout'])->name('cashier.auth.logout');
    });
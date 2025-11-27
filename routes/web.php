<?php

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Menu\MenuController;
use App\Http\Controllers\MenuCategory\MenuCategoryController;
use App\Models\MenuCategory;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [DashboardController::class, 'index'])->name('home');

Route::resource('menu', MenuController::class);

Route::get('/orders', function () {
    return Inertia::render('orders');
})->name('orders');

Route::get('/history', function () {
    return Inertia::render('history');
})->name('history');

Route::controller(MenuCategoryController::class)
    ->prefix('category')
    ->group(function() {
        Route::post('/store', 'store');
        Route::post('/update/{category}', 'update');
    });

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('');
//     })->name('dashboard');  
// });


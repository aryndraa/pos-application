<?php

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Menu\MenuController;
use App\Http\Controllers\MenuCategory\MenuCategoryController;
use App\Http\Controllers\Order\OrderController;
use App\Http\Controllers\POS\POSController;
use App\Models\MenuCategory;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [DashboardController::class, 'index'])->name('home');

Route::resource('menu', MenuController::class);
Route::get('/menu/{menu}/recipe', [MenuController::class, 'recipe']);

Route::get('/POS', [POSController::class, 'index']);

Route::get('/orders', function () {
    return Inertia::render('orders');
})->name('orders');

Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');

Route::get('/history', function () {
    return Inertia::render('history');
})->name('history');



// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('');
//     })->name('dashboard');  
// });


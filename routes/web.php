<?php

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Kitchen\KitchenController;
use App\Http\Controllers\Menu\MenuController;
use App\Http\Controllers\Order\OrderController;
use App\Http\Controllers\POS\POSController;
use Illuminate\Support\Facades\Route;

Route::get('/', [DashboardController::class, 'index'])->name('home');

Route::resource('menu', MenuController::class);
Route::get('/menu/{menu}/recipe', [MenuController::class, 'recipe']);

Route::get('/POS', [POSController::class, 'index']);

Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
Route::get('/history', [OrderController::class, 'histories'])->name('orders.histories');

Route::prefix('kitchen')->name('kitchen.')->group(function () {
    Route::get('/display', [KitchenController::class, 'index'])->name('display');
    Route::get('/orders', [KitchenController::class, 'getOrders'])->name('orders');
    Route::post('/orders/{order}/status', [KitchenController::class, 'updateStatus'])->name('update-status');
});





// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('');
//     })->name('dashboard');  
// });


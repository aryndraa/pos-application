<?php

use App\Http\Controllers\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [DashboardController::class, 'index'])->name('home');

Route::get('/menu', function () {
    return Inertia::render('menu');
})->name('menu');

Route::get('/orders', function () {
    return Inertia::render('orders');
})->name('orders');

Route::get('/history', function () {
    return Inertia::render('history');
})->name('history');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('');
//     })->name('dashboard');  
// });


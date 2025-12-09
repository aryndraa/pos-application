<?php

use Inertia\Inertia;

    Route::get('/', function (){
        return Inertia::render('welcome');
    });

    require __DIR__.'/web/cashier.php';
    require __DIR__.'/web/kitchen.php';



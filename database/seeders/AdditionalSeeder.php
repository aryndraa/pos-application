<?php

namespace Database\Seeders;

use App\Models\Additional;
use App\Models\Menu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdditionalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Additional::factory()->count(100)->create();

        Additional::all()->each(function ($additional) {
            $additional->menus()->attach(
                Menu::query()->inRandomOrder()->limit(rand(2, 6))->pluck('id')
            );
        });
    }
}

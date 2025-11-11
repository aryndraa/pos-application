<?php

namespace Database\Seeders;

use App\Models\Additional;
use App\Models\Menu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $additionals = Additional::all()->random(10)->pluck('id');

        Menu::factory()
            ->count(200)
            ->create()
            ->each(function ($menu) use ($additionals) {
                $menu->additionals()->attach($additionals);
            });
    }
}

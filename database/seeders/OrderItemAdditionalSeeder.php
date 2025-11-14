<?php

namespace Database\Seeders;

use App\Models\OrderItemAdditional;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderItemAdditionalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OrderItemAdditional::factory()->count(400)->create();
    }
}

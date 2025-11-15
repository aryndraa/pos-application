<?php

namespace Database\Seeders;

use App\Models\AdditionalItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdditionalItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AdditionalItem::factory()->count(40)->create();
    }
}

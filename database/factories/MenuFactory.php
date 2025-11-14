<?php

namespace Database\Factories;

use App\Models\MenuCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Menu>
 */
class MenuFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'menu_category_id' => MenuCategory::query()->inRandomOrder()->first()->id,
            'name'             => $this->faker->word(),
            'price'            => $this->faker->numberBetween(10000, 50000),
            'stock'            => $this->faker->numberBetween(0, 20),
            'is_available'     => $this->faker->boolean(80),
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\Additional;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AdditionalItem>
 */
class AdditionalItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'             => $this->faker->word(),
            'additional_id'    => Additional::query()->inRandomOrder()->first()->id,
            'additional_price' => $this->faker->numberBetween(5000, 20000),
        ];
    }
}

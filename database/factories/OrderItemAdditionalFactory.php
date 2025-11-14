<?php

namespace Database\Factories;

use App\Models\AdditionalItem;
use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItemAdditional>
 */
class OrderItemAdditionalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_item_id'      => OrderItem::query()->inRandomOrder()->first(),
            'additional_item_id' => AdditionalItem::query()->inRandomOrder()->first(),
            'quantity'           => $this->faker->numberBetween(1, 5),   
            'unit_price'         => $this->faker->numberBetween(1000, 5000),
        ];
    }
}

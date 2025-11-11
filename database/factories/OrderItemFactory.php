<?php

namespace Database\Factories;

use App\Models\Menu;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id'   => Order::query()->inRandomOrder()->first()->id,
            'menu_id'    => Menu::query()->inRandomOrder()->first()->id,
            'quantity'   => $this->faker->numberBetween(1, 5),
            'unit_price' => $this->faker->numberBetween(10000, 50000),
            'subtotal'   => function (array $attributes) {
                return $attributes['quantity'] * $attributes['unit_price'];
            }
        ];
    }
}

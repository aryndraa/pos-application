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
        $menu = Menu::inRandomOrder()->first();

        return [
            'order_id'   => Order::query()->inRandomOrder()->first()->id,
            'menu_id'    => $menu->id,
            'quantity'   => $this->faker->numberBetween(1, 5),
            'notes'      => $this->faker->text(),
            'unit_price' => $menu->price,
            'subtotal'   => function (array $attributes) {
                return $attributes['quantity'] * $attributes['unit_price'];
            }
        ];
    }
}

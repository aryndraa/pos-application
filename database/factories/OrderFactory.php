<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_name' => $this->faker->name(),
            'code'          => strtoupper($this->faker->bothify('ORD-####??')),
            'total_price'   => $this->faker->numberBetween(50000, 200000),
            'pay'           => $this->faker->numberBetween(50000, 200000),
            'change'        => 0,
            'payment_method'=> $this->faker->randomElement(['cash', 'transfer', 'qris']),
            'status'        => $this->faker->randomElement(['pending', 'processing', 'ready', 'awaiting payment', 'paid', 'canceled', 'completed']),
        ];
    }
}

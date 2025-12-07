<?php

namespace Database\Seeders;

use App\Models\Cashier;
use App\Models\Kitchen;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $cashierRole = Role::firstOrCreate(
            ['name' => 'cashier', 'guard_name' => 'cashier']
        );

        $kitchenRole = Role::firstOrCreate(
            ['name' => 'kitchen', 'guard_name' => 'kitchen']
        );

         $cashier = Cashier::create([
            'name' => 'John Cashier',
            'email' => 'cashier@example.com',
            'password' => Hash::make('password'),
        ]);

        $cashier->assignRole($cashierRole);

        $kitchen = Kitchen::create([
            'name' => 'Jane Kitchen',
            'email' => 'kitchen@example.com',
            'password' => Hash::make('password'),
        ]);

        $kitchen->assignRole($kitchenRole);
        $this->command->info('Cashier and Kitchen users created successfully!');
        $this->command->info('Cashier: cashier@example.com / password');
        $this->command->info('Kitchen: kitchen@example.com / password');
    }
}

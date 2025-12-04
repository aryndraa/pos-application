<?php

namespace Database\Seeders;

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
         app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

          $cashierPermissions = [
            'view-menu',
            'view-pos',
            'create-order',
            'view-order',
            'view-bill',
            'view-history',
        ];

         $kitchenPermissions = [
            'view-kitchen-display',
            'view-kitchen-orders',
            'update-order-status',
        ];

         foreach (array_merge($cashierPermissions, $kitchenPermissions) as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create Cashier Role
        $cashierRole = Role::create(['name' => 'cashier']);
        $cashierRole->givePermissionTo($cashierPermissions);

        // Create Kitchen Role
        $kitchenRole = Role::create(['name' => 'kitchen']);
        $kitchenRole->givePermissionTo($kitchenPermissions);

        // Create Admin Role (optional - has all permissions)
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());

        // Create demo users
        $cashier = User::create([
            'name' => 'Cashier User',
            'email' => 'cashier@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $cashier->assignRole('cashier');

        $kitchen = User::create([
            'name' => 'Kitchen User',
            'email' => 'kitchen@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $kitchen->assignRole('kitchen');

        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('admin');
    }
}

# POS System

Sistem POS Restoran ini menyediakan solusi lengkap untuk mengelola operasional rumah makan dengan tiga panel utama: Admin, Cashier, dan Kitchen. Mendukung pemesanan realtime, manajemen menu, pengelolaan voucher, serta pencatatan transaksi yang cepat dan akurat. Pesanan dari kasir langsung tampil di Kitchen Display, sementara admin dapat memantau laporan penjualan, mengatur menu, dan mengelola user. Sistem ini dirancang untuk mempercepat proses kerja, meminimalkan kesalahan, dan meningkatkan efisiensi restoran.

## Key Features

- Autentikasi 3 role: (admin, kasir, kitchen staff)
- Kelola akun kasir
- CRUD menu, kategori menu, variasi menu
- Fitur transaksi lengkap (Point of Sale)
- Perhitungan harga otomatis
- Penerapan voucher diskon
- Kitchen display
- Realtime Order (Kasir → Dapur)
- Dashboard Admin

## Requirements

- PHP 8.2+
- Laravel 12+
- Composer
- Node.js & npm

## Installasi

1. Clone this repository

    ```bash
    git clone https://github.com/aryndraa/pos-application
    cd pos-application
    ```

2. Install dependencies:

    ```bash
    composer install
    npm install
    ```

3. Set up environment:

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4. Set up Database:

    ```bash
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=pos_application
    DB_USERNAME=root
    DB_PASSWORD=
    ```

5. Run migrations (lewati jika menggunakan sqlite):

    ```bash
    php artisan migrate
    ```

6. Create storage link for file uploads:

    ```bash
    php artisan storage:link
    ```

7. Create demo users

    ```bash
     php artisan db:seed --class=RolePermissionSeeder
    ```

8. Create filament admin user

    ```bash
     php artisan make:filament-user
    ```

9. Create reverb key

    ```bash
     php artisan reverb:install
    ```

10. Start the development server:

    ```bash
     composer run dev
    ```

11. Start reverb server
    ```bash
     php artisan reverb:start
    ```

## Access Panel

Admin Panel

```bash
   http://127.0.0.1:8000/admin
```

Cashier

```bash
   http://127.0.0.1:8000/cashier
```

Kitchen display

```bash
   http://127.0.0.1:8000/kitchen
```

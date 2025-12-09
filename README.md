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
    ```

    ```bash
    cd pos-application
    ```

2. Install dependencies:

    ```bash
    composer install
    ```

    ```bash
    npm install
    ```

3. Set up environment:

    ```bash
    cp .env.example .env
    ```

    ```bash
    php artisan key:generate
    ```

4. Start the development server
    ```bash
    npm run dev
    ```

## Brief Project Explanation

This project was created as part of the SiteFest competition with a mission to help users access trusted and easy-to-understand medical information in one place.
By using modern technologies like React Js and Tailwind CSS, this project offers a fast and responsive user experience.
Deployment with Vercel allows easy online access without complicated setup.

\_Project made by **SharkByteLabs**🦈

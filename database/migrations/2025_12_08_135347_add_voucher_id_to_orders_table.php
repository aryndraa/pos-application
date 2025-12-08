<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->integer('subtotal_price')->after('order_date');
            $table->unsignedBigInteger('voucher_id')->nullable()->after('total_price');
            $table->foreign('voucher_id')->references('id')->on('vouchers');
            $table->integer('total_discount')->nullable()->default(0)->after('voucher_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            //
        });
    }
};

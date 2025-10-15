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
        Schema::create('sitesettings', function (Blueprint $table) {
            $table->id();
            $table->string('logo', 100)->nullable();
            $table->string('favicon', 100)->nullable();
            $table->string('site_title', 20);
            $table->string('app_name', 20)->nullable();
            $table->mediumText('meta_description')->nullable();
            $table->mediumText('meta_keywords')->nullable();
            $table->string('about', 100)->nullable();
            $table->string('phone', 50)->nullable();
            $table->string('address', 50)->nullable();
            $table->string('email', 50)->nullable();
            $table->string('facebook', 50)->nullable();
            $table->string('twitter', 50)->nullable();
            $table->string('pinterest', 50)->nullable();
            $table->string('instagram', 50)->nullable();
            $table->string('youtube', 50)->nullable();
            $table->integer('pagination')->define(6);
            $table->string('style', 50)->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sitesettings');
    }
};

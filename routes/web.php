<?php

use App\Http\Controllers\Backend\SettingsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard/page');
    })->name('dashboard');
    Route::get('settings/settings', [SettingsController::class, 'index'])->name('settings');
    Route::patch('settings/settings', [SettingsController::class, 'update'])->name('settings.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

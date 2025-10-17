<?php

use App\Http\Controllers\Backend\SettingsController;
use App\Http\Controllers\Frontend\IndexController;
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
    Route::post('settings/settings', [SettingsController::class, 'update'])->name('settings.update');

    Route::get('settings/smtp', [SettingsController::class, 'SmtpSetting'])->name('smtp.setting');
    Route::post('settings/smtp', [SettingsController::class, 'UpdateSmtpSetting'])->name('update.smpt.setting');

});

// Route::get('test', [IndexController::class, 'index'])->name('test');
// Route::post('test', [IndexController::class, 'submit'])->name('test.submit');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

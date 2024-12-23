<?php

namespace App\Providers;

use App\Models\Resep;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Route::bind('resep', function (string $value) {
            return Resep::where('slug', $value)->orWhere('id', $value)->firstOrFail();
        });
    }
}

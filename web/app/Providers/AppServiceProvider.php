<?php

namespace App\Providers;

use App\Repositories\BarangayRepository;
use App\Repositories\BarangayRepositoryInterface;
use App\Repositories\CityRepository;
use App\Repositories\CityRepositoryInterface;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Passport;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        Passport::ignoreMigrations();

        $this->app->singleton(
            CityRepositoryInterface::class,
            CityRepository::class
        );

        $this->app->singleton(
            BarangayRepositoryInterface::class,
            BarangayRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);

        // Include the definitions
        include_once(config_path('definitions.php'));
    }
}

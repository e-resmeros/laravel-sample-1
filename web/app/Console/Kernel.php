<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
       $schedule->command('app-command:export-mass-master-tables 8am')->dailyAt('08:00');

       $schedule->command('app-command:export-mass-master-tables 9am')->dailyAt('09:00');

       $schedule->command('app-command:export-mass-master-tables 10am')->dailyAt('10:00');

       $schedule->command('app-command:export-mass-master-tables 12nn')->dailyAt('12:00');

       $schedule->command('app-command:export-mass-master-tables 3pm')->dailyAt('15:00');

       $schedule->command('app-command:export-mass-master-tables 5pm')->dailyAt('17:00');

       $schedule->command('app-command:export-mass-master-tables 12mn')->dailyAt('00:00');

       $schedule->command('app-command:export-survey-inventory 12mn')->dailyAt('00:00');

    //    $schedule->command('app-command:delete-inventory')->hourly();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}

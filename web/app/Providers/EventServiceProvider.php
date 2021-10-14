<?php

namespace App\Providers;

use App\Listeners\DatabaseBeganTransactionListener;
use App\Listeners\DatabaseCommittedListener;
use App\Listeners\DatabaseRolledBackListener;
use App\Listeners\EmailSendingListener;
use App\Listeners\EmailSentListener;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Database\Events\TransactionBeginning;
use Illuminate\Database\Events\TransactionCommitted;
use Illuminate\Database\Events\TransactionRolledBack;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Mail\Events\MessageSending;
use Illuminate\Mail\Events\MessageSent;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        TransactionRolledBack::class => [
            DatabaseRolledBackListener::class,
        ],
        TransactionBeginning::class => [
            DatabaseBeganTransactionListener::class,
        ],
        TransactionCommitted::class => [
            DatabaseCommittedListener::class,
        ],
        MessageSending::class => [
            EmailSendingListener::class
        ],
        MessageSent::class => [
            EmailSentListener::class
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}

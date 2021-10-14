<?php

use Monolog\Handler\NullHandler;
use Monolog\Handler\StreamHandler;
use Monolog\Handler\SyslogUdpHandler;

return [

    /*
    |--------------------------------------------------------------------------
    | Default Log Channel
    |--------------------------------------------------------------------------
    |
    | This option defines the default log channel that gets used when writing
    | messages to the logs. The name specified in this option should match
    | one of the channels defined in the "channels" configuration array.
    |
    */

    'default' => env('LOG_CHANNEL', 'wood-error'),

    /*
    |--------------------------------------------------------------------------
    | Log Channels
    |--------------------------------------------------------------------------
    |
    | Here you may configure the log channels for your application. Out of
    | the box, Laravel uses the Monolog PHP logging library. This gives
    | you a variety of powerful log handlers / formatters to utilize.
    |
    | Available Drivers: "single", "daily", "slack", "syslog",
    |                    "errorlog", "monolog",
    |                    "custom", "stack"
    |
    */

    'channels' => [
        'wood-error' => [
            'driver' => 'daily',
            'tap' => [App\Logging\CustomFilenames::class],
            'path' => storage_path('logs/error/error.log'), // add dynamic folder structure
            'level' => 'error',
            'permission' => 0664,
            'days' => 30,
        ],
        'wood-info' => [
            'driver' => 'daily',
            'tap' => [App\Logging\CustomFilenames::class],
            'path' => storage_path('logs/info/info.log'), // add dynamic folder structure
            'level' => 'info',
            'permission' => 0664,
            'days' => 30,
        ],
        'wood-debug' => [
            'driver' => 'daily',
            'tap' => [App\Logging\CustomFilenames::class],
            'path' => storage_path('logs/debug/debug.log'), // add dynamic folder structure
            'level' => 'debug',
            'permission' => 0664,
            'days' => 30,
        ],
        'wood-all' => [
            'driver' => 'daily',
            'tap' => [App\Logging\CustomFilenames::class],
            'path' => storage_path('logs/all/all.log'), // add dynamic folder structure
            'level' => 'info',
            'permission' => 0664,
            'days' => 30,
        ],
        'wood-export' => [
            'driver' => 'daily',
            'tap' => [App\Logging\CustomFilenames::class],
            'path' => storage_path('logs/database-operations/database-operations.log'), // add dynamic folder structure
            'level' => 'info',
            'permission' => 0664,
            'days' => 30,
        ],
        'wood-database-operation' => [
            'driver' => 'daily',
            'tap' => [App\Logging\CustomFilenames::class],
            'path' => storage_path('logs/database-operations/database-operations.log'), // add dynamic folder structure
            'level' => 'info',
            'permission' => 0664,
            'days' => 30,
        ],
        'wood-email' => [
            'driver' => 'daily',
            'tap' => [App\Logging\CustomFilenames::class],
            'path' => storage_path('logs/email/email.log'), // add dynamic folder structure
            'level' => 'info',
            'permission' => 0664,
            'days' => 30,
        ],
        'stack' => [
            'driver' => 'stack',
            'channels' => ['daily'],
            'ignore_exceptions' => false,
            'permission' => 0664,
        ],
        'single' => [
            'driver' => 'single',
            'path' => storage_path('logs/laravel.log'),
            'level' => 'debug',
            'permission' => 0664,
        ],

        'daily' => [
            'driver' => 'daily',
            'tap' => [App\Logging\CustomFilenames::class],
            'path' => storage_path('logs/stack/laravel.log'), // add dynamic folder structure
            'level' => 'debug',
            'permission' => 0664,
            'days' => 31, // set the maximum number of days in a month
        ],

        'slack' => [
            'driver' => 'slack',
            'url' => env('LOG_SLACK_WEBHOOK_URL'),
            'username' => 'Laravel Log',
            'emoji' => ':boom:',
            'level' => 'critical',
        ],

        'papertrail' => [
            'driver' => 'monolog',
            'level' => 'debug',
            'handler' => SyslogUdpHandler::class,
            'handler_with' => [
                'host' => env('PAPERTRAIL_URL'),
                'port' => env('PAPERTRAIL_PORT'),
            ],
        ],

        'stderr' => [
            'driver' => 'monolog',
            'handler' => StreamHandler::class,
            'formatter' => env('LOG_STDERR_FORMATTER'),
            'with' => [
                'stream' => 'php://stderr',
            ],
        ],

        'syslog' => [
            'driver' => 'syslog',
            'level' => 'debug',
        ],

        'errorlog' => [
            'driver' => 'errorlog',
            'level' => 'debug',
        ],

        'null' => [
            'driver' => 'monolog',
            'handler' => NullHandler::class,
        ],
    ],

];

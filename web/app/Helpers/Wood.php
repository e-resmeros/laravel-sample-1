<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Log;

class Wood
{

    /**
     * Logs messages in the wood-debug.log file
     * @param mixed $message
     * @param bool $prettify
     * @return void
     */

    public static function d($message, $prettify = false)
    {
        if (env('APP_DEBUG', true)) {
            if ($prettify) {
                Log::channel('wood-debug')->debug(json_encode($message, JSON_PRETTY_PRINT) . "\n");
            } else {
                Log::channel('wood-debug')->debug($message . "\n");
            }
        }
    }

    /**
     * Logs messages in the wood-error.log file
     * @param mixed $message
     * @return void
     */
    public static function e($message)
    {
        if (env('WOOD_LOG_ERROR', true)) {
            Log::channel('wood-error')->error($message . "\n");
            if (env('WOOD_LOG_ALL', true)) {
                Log::channel('wood-all')->info($message . "\n");
            }
        }
    }

    /**
     * Logs messages in the wood-info.log file
     * @param mixed $message
     * @return void
     */
    public static function i($message)
    {
        if (env('WOOD_LOG_INFO', true)) {
            Log::channel('wood-info')->info($message . "\n");
            if (env('WOOD_LOG_ALL', true)) {
                Log::channel('wood-all')->info($message . "\n");
            }
        }
    }

    /**
     * @param $message
     * @param $severity
     */
    public static function exportLog($message, $severity = "SUCCESS")
    {
        if (env('WOOD_LOG_EXPORT', true)) {
            if ($severity === "ERROR") {
                Log::channel('wood-export')->error($message . "\n");
                if (env('WOOD_LOG_ALL', true)) {
                    Log::channel('wood-all')->info($message . "\n");
                }
            } else {
                Log::channel('wood-export')->info($message . "\n");
                if (env('WOOD_LOG_ALL', true)) {
                    Log::channel('wood-all')->info($message . "\n");
                }
            }
        }
    }

    /**
     * Logs messages in the wood-email.log file
     * @param mixed $message
     * @return void
     */
    public static function emailLog($message)
    {
        if (env('WOOD_LOG_EMAIL', true)) {
            Log::channel('wood-email')->info($message . "\n");
            if (env('WOOD_LOG_ALL', true)) {
                Log::channel('wood-all')->info($message . "\n");
            }
        }
    }

    /**
     * Logs messages in the wood-database-operation.log file
     * @param mixed $message
     * @return void
     */
    public static function databaseLog($message)
    {
        if (env('WOOD_LOG_DATABASE', true)) {
            Log::channel('wood-database-operation')->info($message . "\n");
            if (env('WOOD_LOG_ALL', true)) {
                Log::channel('wood-all')->info($message . "\n");
            }
        }
    }
}

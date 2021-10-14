<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Config;

class Error
{

    /**
     * Returns errorCode and message from Config.
     * Ex:
     * ERROR101|The length should be :max characters or less.
     *
     * @param string $errorCode
     * @return string
     */
    public static function bind(string $errorCode)
    {
        $codeKey = config('constants.errors.key.code_key');
        $messageKey = config('constants.errors.key.message_key');
        return config($errorCode . '.' . $codeKey, $errorCode . '.' . $codeKey) . "|" .
            config($errorCode . '.' . $messageKey, $errorCode . '.' . $messageKey);
    }
}

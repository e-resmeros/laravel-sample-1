<?php

namespace App\Http\Middleware;

use App\Helpers\Wood;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param Request $request
     * @return string
     */
    protected function redirectTo($request)
    {
        if (env('API_LOG_REQUEST', true)) {
            $this->_logRequest($request);
        }

        if (env('API_LOG_RESPONSE', true)) {
            $this->_logResponse();
        }
    }

    /**
     * Logs the request
     *
     * @param Request $request
     * @param string $userId
     */
    private function _logRequest(Request $request)
    {
        $jsonEncodeOption = env('API_LOG_REQUEST_PRETTY_PRINT', true) ? JSON_PRETTY_PRINT : 0;
        $showRequestHeader = env('SHOW_REQUEST_HEADER', true);

        $requestHeader = json_encode($request->header(), $jsonEncodeOption);
        $requestBody = json_encode($request->all(), $jsonEncodeOption);

        $dataLog = " ==============>> Request\n";
        $dataLog .= "End Point: " . $request->url() . "\n";
        $dataLog .= "Method: " . $request->route()->getActionName() . "\n";
        if ($showRequestHeader) {
            $dataLog .= "Request Header: " . $requestHeader . "\n";
        }
        $dataLog .= "Request Body: " . $requestBody . "\n\n";

        Wood::i($dataLog);
    }


    /**
     * @param JsonResponse | Response $response
     */
    private function _logResponse()
    {
        $processTime = floatval(microtime(true) - LARAVEL_START);

        $dataLog = " ==============>> Response\n";
        $dataLog .= "Status Code: " . 401 . "\n";
        $dataLog .= "Process Time: " . $processTime . " seconds\n";
        $dataLog .= "Response Body: {\"message\": \"Unauthenticated.\"}\n\n";

        Wood::i($dataLog);
    }
}

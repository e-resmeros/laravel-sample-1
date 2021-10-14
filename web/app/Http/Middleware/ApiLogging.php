<?php

namespace App\Http\Middleware;

use App\Helpers\Wood;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class ApiLogging
{

    /**
     * Hides all hidden attributes in logging
     * @var array
     */
    protected $hidden = [
        'regex' => ['/password/i'],
        'exact' => []
    ];

    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $userId = Auth::check() ? auth()->user()->id : 'Not Available';

        if (env('API_LOG_REQUEST', true)) {
            $this->_logRequest($request, $userId);
        }

        $response = $next($request);

        if (env('API_LOG_RESPONSE', true)) {
            $this->_logResponse($response, $userId);
        }

        $response->headers->remove("Class-Name");

        return $response;
    }

    /**
     * Logs the request
     *
     * @param Request $request
     * @param string $userId
     */
    private function _logRequest(Request $request, $userId)
    {
        $jsonEncodeOption = env('API_LOG_REQUEST_PRETTY_PRINT', true) ? JSON_PRETTY_PRINT : 0;
        $showRequestHeader = env('SHOW_REQUEST_HEADER', true);

        $requestHeader = json_encode($request->header(), $jsonEncodeOption);
        $requestBody = json_encode($this->_removeAllHidden($request), $jsonEncodeOption);

        $dataLog = " ==============>> Request\n";
        $dataLog .= "Requested by Company ID: " . $request->get('company_id') . "\n";
        $dataLog .= "Requested by User ID: " . $userId . "\n";
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
     * @param string $userId
     */
    private function _logResponse($response, $userId)
    {
        $jsonEncodeOption = env('API_LOG_RESPONSE_PRETTY_PRINT', true) ? JSON_PRETTY_PRINT : 0;
        $showRequestHeader = env('SHOW_REQUEST_HEADER', true);

        $responseHeader = json_encode($response->headers->all(), $jsonEncodeOption);
        $responseBody = json_encode($response, $jsonEncodeOption);
        $processTime = floatval(microtime(true) - LARAVEL_START);

        $dataLog = " ==============>> Response\n";
        $dataLog .= "Response to User ID: " . $userId . "\n";
        $dataLog .= "Status Code: " . $response->getStatusCode() . "\n";
        $dataLog .= "Class: " . $response->headers->get("Class-Name") . "\n";
        $dataLog .= "Process Time: " . $processTime . " seconds\n";

        if ($showRequestHeader) {
            $dataLog .= "Response Header: " . $responseHeader . "\n";
        }

        $dataLog .= "Response Body: " . $responseBody . "\n\n";

        Wood::i($dataLog);
    }

    /**
     * @param Request $request
     * @return array
     */
    private function _removeAllHidden($request)
    {
        $requestBody = $request->all();
        foreach ($this->hidden['regex'] as $regexItem) {
            $requestBody = $this->_removeRegex($requestBody, $regexItem);
        }
        foreach ($this->hidden['exact'] as $exactItem) {
            $requestBody = $this->_removeExact($requestBody, $exactItem);
        }
        return $requestBody;
    }

    /**
     * @param array $requestBody
     * @param string $regex
     * @return array
     */
    private function _removeRegex($requestBody, $regex)
    {
        foreach ($requestBody as $key => $item) {
            if (preg_match($regex, $key)) {
                unset($requestBody[$key]);
            }
        }
        return $requestBody;
    }

    /**
     * @param array $requestBody
     * @param string $exact
     * @return array
     */
    private function _removeExact($requestBody, $exact)
    {
        unset($requestBody[$exact]);
        return $requestBody;
    }
}

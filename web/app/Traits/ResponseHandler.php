<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Config;

/**
 * Class ResponseHandler
 *
 * @package App
 */
trait ResponseHandler
{
    /**
     * Creates a json response in an error request
     *
     * @param array $errors
     * @param int $status_code
     * @return JsonResponse
     */
    public function error($errors, $status_code = 400)
    {
        $response['errors'] = $this->_transformErrors($errors);

        return $this->_createResponse(
            $response,
            $status_code
        );
    }

    /**
     * Creates a json response in an successful request
     *
     * @param Object | array | bool $response
     * @param int $status_code
     * @return JsonResponse
     */
    public function success($response, $status_code = 200)
    {
        return $this->_createResponse(
            $response,
            $status_code
        );
    }

    /**
     * A helper function that creates the json response
     *
     * @param String $status_code
     * @param Object | array $response
     * @return JsonResponse
     */
    private function _createResponse($response, $status_code)
    {
        return response()->json($response, $status_code, ["Class-Name" => get_class($this)]);
    }

    /**
     * A helper function that transforms custom error messages
     *
     * @param array $errorMessages
     * @return array
     */
    private function _transformErrors($errorMessages)
    {
        $codeKey = config('constants.errors.key.code_key', 'code');
        $messageKey = config('constants.errors.key.message_key', 'message');

        return array_map(function ($errorMessage) use ($codeKey, $messageKey) {
            // Check if this came from 'constants.errors...' or from Error::bind() which gives 'CODE|<MESSAGE>
            // Append .code and .message from the $errorMessage and check if it exists in the config file
            if (
                $this->_isConfigExist($errorMessage . '.' . $codeKey)
                && $this->_isConfigExist($errorMessage . '.' . $messageKey)
            ) {
                // Return the code and message from config file
                return $this->_getError($errorMessage, $errorMessage, $codeKey, $messageKey);
            } else {
                // Tokenize the $errorMessage to get the <CODE> separated by "|" and <MESSAGE>
                $code = strtok($errorMessage, "|");
                $message = strtok("|");

                // If there's a $code but no $message. EX: 'An error has occurred.'
                // Notice that there is no code but only a message
                // But this is still stored in the $code variable
                // Return an empty code with the message
                // Else return the $code and $message
                return !$message
                    ? $this->_getError('', $errorMessage, null, null)
                    : $this->_getError($code, $message, null, null);
            }
        }, $errorMessages);
    }

    /**
     * A helper function that checks whether config exists or not
     *
     * @param string $config
     * @return bool
     */
    private function _isConfigExist($config)
    {
        return !is_null(config($config));
    }

    /**
     * A helper function that retrieves the error in the config constants if it exists
     *
     *
     * @param string $code
     * @param string $message
     * @param string $codeKey
     * @param string $messageKey
     * @return array
     */
    private function _getError($code, $message, $codeKey, $messageKey)
    {
        $code = $this->_appendStringKey($code, $codeKey);
        $message = $this->_appendStringKey($message, $messageKey);

        return [
            'code' => config($code, $code),
            'message' => config($message, $message)
        ];
    }

    /**
     * A helper function that appends the standard $codeKey or $messageKey in the string
     *
     * @param string $string
     * @param string $key
     * @return string
     */
    private function _appendStringKey($string, $key)
    {
        return $key !== null
            ? $string . '.' . $key
            : $string;
    }
}

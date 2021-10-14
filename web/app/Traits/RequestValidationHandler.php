<?php

namespace App\Traits;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

trait RequestValidationHandler
{
    /**
     * Handles on failed request validation
     *
     * @param Validator $validator
     * @throws HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        $response = $this->error(
            $validator->errors()->all(),
            $this->error_status_code
        );

        throw new HttpResponseException($response);
    }
}

<?php

namespace App\Http\Requests;

use App\Helpers\Error;

class GetBarangayListRequest extends BaseFormRequest
{
    /**
     * Your own custom error messages on validation error
     *
     * @return array
     */
    public function messages()
    {
        return [
            'required' => Error::bind('constants.errors.common.required'),
            'exists' => Error::bind('constants.errors.common.exists'),
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'city_id' => 'required|exists:m_city_municipality,id',
        ];
    }
}

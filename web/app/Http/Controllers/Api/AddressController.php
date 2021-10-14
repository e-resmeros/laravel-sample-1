<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\GetBarangayListRequest;
use App\Http\Requests\GetCityListRequest;

class AddressController extends ApiBaseController
{

    public function getCityList(GetCityListRequest $request)
    {
        $data = $request->validated();

        $citiesList = $this->cityRepository->getAllCitiesByUser($data['user_id']);

        return $this->success([
            "data" => $citiesList
        ]);
    }

    public function getBarangayList(GetBarangayListRequest $request)
    {
        $data = $request->validated();

        $barangaysList = $this->barangayRepository->getAllBarangaysWithinCity($data['city_id']);

        return $this->success([
            "data" => $barangaysList
        ]);
    }

}

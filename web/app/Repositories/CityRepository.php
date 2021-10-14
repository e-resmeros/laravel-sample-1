<?php

namespace App\Repositories;

use App\City;
use App\UserRegion;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Region;

/**
 * Class CityRepository
 * @package App\Repositories
 */
class CityRepository extends BaseRepository implements CityRepositoryInterface
{
    public function __construct()
    {
        $this->model = new City();
    }

    /**
     * @param int $userId
     * @return array
     */
    public function getAllCitiesByUser($userId)
    {
        $areaQuery = UserRegion::with(['region.area'])->where('user_id', $userId)->get();

        $query = Region::with(['cities' => function (HasMany $query) {
            $query->select(
                    'id as Id',
                    'region_id',
                    'name as Name',
                    'created_at',
                    'updated_at'
            );
        }])
            ->where('is_active', config('constants.status.active'))
            ->whereIn('area_id', $areaQuery->pluck('region.area.id'));

        $transformedCities = $this->transformUserRegionToCity($this->toArray($query->get()));

        return collect($transformedCities)->sortBy('Name')->values();
    }

    /**
     * @param array $userRegions
     * @return array
     */
    private function transformUserRegionToCity($userRegions)
    {
        $citiesList = [];
        foreach ($userRegions as $region) {
            $citiesList = array_merge($citiesList, $region['cities']);
        }

        return $citiesList;
    }
}

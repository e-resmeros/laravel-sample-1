<?php

namespace App\Repositories;

use App\Barangay;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

/**
 * Class BarangayRepository
 * @package App\Repositories
 */
class BarangayRepository extends BaseRepository implements BarangayRepositoryInterface
{
    public function __construct()
    {
        $this->model = new Barangay();
    }

    /**
     * @param int $cityId
     * @return array
     */
    public function getAllBarangaysWithinCity($cityId)
    {
        return $this->toArray($this->model->newQuery()
        ->where('city_municipality_id', $cityId)
        ->select('id as Id',
            'city_municipality_id',
            'name as Name',
            'created_at',
            'updated_at')
        ->orderBy('name', 'asc')
        ->get());
    }
}

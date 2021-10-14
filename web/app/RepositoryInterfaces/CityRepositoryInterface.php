<?php

namespace App\Repositories;

/**
 * Interface CityRepositoryInterface
 * @package App\Repositories
 */
interface CityRepositoryInterface extends BaseRepositoryInterface
{
    /**
     * @param int $userId
     * @return array
     */
    public function getAllCitiesByUser($userId);
}

<?php

namespace App\Repositories;

/**
 * Interface BarangayRepositoryInterface
 * @package App\Repositories
 */
interface BarangayRepositoryInterface extends BaseRepositoryInterface
{
    /**
     * @param int $cityId
     * @return array
     */
    public function getAllBarangaysWithinCity($cityId);
}

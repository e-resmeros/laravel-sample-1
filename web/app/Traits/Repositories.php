<?php

namespace App\Traits;

use App\Repositories\AreaRepositoryInterface;
use App\Repositories\AssignmentRepositoryInterface;
use App\Repositories\BarangayRepositoryInterface;
use App\Repositories\BrandRepositoryInterface;
use App\Repositories\DealerRepositoryInterface;
use App\Repositories\FunctionRepositoryInterface;
use App\Repositories\InventoryRepositoryInterface;
use App\Repositories\InventorySkuRepositoryInterface;
use App\Repositories\OutletRepositoryInterface;
use App\Repositories\PamDetailRepositoryInterface;
use App\Repositories\RegionProfileRepositoryInterface;
use App\Repositories\RegionRepositoryInterface;
use App\Repositories\RoleRepositoryInterface;
use App\Repositories\SalesDealerRepositoryInterface;
use App\Repositories\ScheduleRepositoryInterface;
use App\Repositories\SkuRepositoryInterface;
use App\Repositories\UserRegionRepositoryInterface;
use App\Repositories\UserRepositoryInterface;
use App\Repositories\UserRoleRepositoryInterface;
use App\Repositories\SurveyInventoryRepositoryInterface;
use App\Repositories\SurveyInventorySkuRepositoryInterface;
use App\Repositories\SkuFamilyRepositoryInterface;
use App\Repositories\SurveyInventoryOthersSkuRepositoryInterface;
use App\Repositories\OutletSourceRepositoryInterface;
use App\Repositories\UserOutletRepositoryInterface;
use App\Repositories\OutletTypeRepositoryInterface;
use App\Repositories\CategoryRepositoryInterface;
use App\Repositories\CityRepositoryInterface;
use App\Repositories\OthersSkuRepositoryInterface;

/**
 * Class Repositories
 *
 * @package App
 */
trait Repositories
{
    /**
     * @var AreaRepositoryInterface
     */
    protected $areaRepository;

    /**
     * @var AssignmentRepositoryInterface
     */
    protected $assignmentRepository;

    /**
     * @var BrandRepositoryInterface
     */
    protected $brandRepository;

    /**
     * @var DealerRepositoryInterface
     */
    protected $dealerRepository;

    /**
     * @var FunctionRepositoryInterface
     */
    protected $functionRepository;

    /**
     * @var InventoryRepositoryInterface
     */
    protected $inventoryRepository;

    /**
     * @var InventorySkuRepositoryInterface
     */
    protected $inventorySkuRepository;

    /**
     * @var PamDetailRepositoryInterface
     */
    protected $pamDetailRepository;

    /**
     * @var RegionProfileRepositoryInterface
     */
    protected $regionProfileRepository;

    /**
     * @var RegionRepositoryInterface
     */
    protected $regionRepository;

    /**
     * @var RoleRepositoryInterface
     */
    protected $roleRepository;

    /**
     * @var SalesDealerRepositoryInterface
     */
    protected $salesDealerRepository;

    /**
     * @var ScheduleRepositoryInterface
     */
    protected $scheduleRepository;

    /**
     * @var SkuRepositoryInterface
     */
    protected $skuRepository;

    /**
     * @var UserRepositoryInterface
     */
    protected $userRepository;

    /**
     * @var UserRoleRepositoryInterface
     */
    protected $userRoleRepository;

    /**
     * @var UserRegionRepositoryInterface
     */
    protected $userRegionRepository;

    /**
     * @var OutletRepositoryInterface
     */
    protected $outletRepository;

    /**
     * @var SurveyInventoryRepositoryInterface
     */
    protected $surveyInventoryRepository;

    /**
     * @var SkuFamilyRepositoryInterface
     */
    protected $skuFamilyRepository;

    /**
     * @var SurveyInventorySkuRepositoryInterface
     */
    protected $surveyInventorySkuRepository;

    /**
     * @var SurveyInventoryOthersSkuRepositoryInterface
     */
    protected $surveyInventoryOthersSkuRepository;

    /**
     * @var OutletSourceRepositoryInterface
     */
    protected $outletSourceRepository;

    /**
     * @var UserOutletRepositoryInterface
     */
    protected $userOutletRepository;

    /**
     * @var OutletTypeRepositoryInterface
     */
    protected $outletTypeRepository;

    /**
     * @var CategoryRepositoryInterface
     */
    protected $categoryRespository;

    /**
     * @var OthersSkuRepositoryInterface
     */
    protected $othersSkuRepository;

    /**
     * @var CityRepositoryInterface
     */
    protected $cityRepository;

    /**
     * @var BarangayRepositoryInterface
     */
    protected $barangayRepository;

    public function __construct(
        AreaRepositoryInterface $areaRepository,
        AssignmentRepositoryInterface $assignmentRepository,
        BrandRepositoryInterface $brandRepository,
        DealerRepositoryInterface $dealerRepository,
    FunctionRepositoryInterface $functionRepository,
        InventoryRepositoryInterface $inventoryRepository,
        InventorySkuRepositoryInterface $inventorySkuRepository,
        PamDetailRepositoryInterface $pamDetailRepository,
        RegionProfileRepositoryInterface $regionProfileRepository,
        RegionRepositoryInterface $regionRepository,
        RoleRepositoryInterface $roleRepository,
        SalesDealerRepositoryInterface $salesDealerRepository,
        ScheduleRepositoryInterface $scheduleRepository,
        SkuRepositoryInterface $skuRepository,
        UserRepositoryInterface $userRepository,
        UserRoleRepositoryInterface $userRoleRepository,
        UserRegionRepositoryInterface $userRegionRepository,
        OutletRepositoryInterface $outletRepository,
        SurveyInventoryRepositoryInterface $surveyInventoryRepository,
        SkuFamilyRepositoryInterface $skuFamilyRepositoryInterface,
        SurveyInventorySkuRepositoryInterface $surveyInventorySkuRepository,
        SurveyInventoryOthersSkuRepositoryInterface $surveyInventoryOthersSkuRepository,
        OutletSourceRepositoryInterface $outletSourceRepository,
        UserOutletRepositoryInterface $userOutletRepository,
        OutletTypeRepositoryInterface $outletTypeRepository,
        CategoryRepositoryInterface $categoryRespository,
        OthersSkuRepositoryInterface $othersSkuRepository,
        CityRepositoryInterface $cityRepository,
        BarangayRepositoryInterface $barangayRepository
    )
    {
        $this->areaRepository = $areaRepository;
        $this->assignmentRepository = $assignmentRepository;
        $this->brandRepository = $brandRepository;
        $this->dealerRepository = $dealerRepository;
        $this->functionRepository = $functionRepository;
        $this->inventoryRepository = $inventoryRepository;
        $this->inventorySkuRepository = $inventorySkuRepository;
        $this->pamDetailRepository = $pamDetailRepository;
        $this->regionProfileRepository = $regionProfileRepository;
        $this->regionRepository = $regionRepository;
        $this->roleRepository = $roleRepository;
        $this->salesDealerRepository = $salesDealerRepository;
        $this->scheduleRepository = $scheduleRepository;
        $this->skuRepository = $skuRepository;
        $this->userRepository = $userRepository;
        $this->userRoleRepository = $userRoleRepository;
        $this->userRegionRepository = $userRegionRepository;
        $this->outletRepository = $outletRepository;
        $this->surveyInventoryRepository = $surveyInventoryRepository;
        $this->skuFamilyRepository = $skuFamilyRepositoryInterface;
        $this->surveyInventorySkuRepository = $surveyInventorySkuRepository;
        $this->surveyInventoryOthersSkuRepository = $surveyInventoryOthersSkuRepository;
        $this->outletSourceRepository = $outletSourceRepository;
        $this->userOutletRepository = $userOutletRepository;
        $this->outletTypeRepository = $outletTypeRepository;
        $this->categoryRespository = $categoryRespository;
        $this->othersSkuRepository = $othersSkuRepository;
        $this->cityRepository = $cityRepository;
        $this->barangayRepository = $barangayRepository;
    }
}

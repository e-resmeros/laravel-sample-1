<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* ======================================================================  FOR DEV ======================================================================*/
Route::group(['prefix' => 'auth'], function () {
    Route::post('/register', 'Api\Auth\RegisterController@register')->name('auth.register')->middleware('transaction');
});
Route::group(['prefix' => 'schedule'], function () {
    Route::post('/create', 'Api\ScheduleController@createSchedule')->middleware('auth:api', 'transaction');
});
/* ======================================================================  END  ======================================================================*/


/* ======================================================================  COMMON ======================================================================*/
Route::group(['prefix' => 'user'], function () {
    Route::post('/change-password', 'Api\UserController@changePassword')->middleware('transaction');
});
/* ======================================================================  END COMMON ======================================================================*/


/* ======================================================================  WEB ======================================================================*/
Route::group(['prefix' => 'auth'], function () {
    Route::post('/login/web', 'Api\Auth\LoginController@loginWeb')->name('auth.login.web');
});

Route::group(['prefix' => 'user'], function () {
    Route::get('/list', 'Api\UserController@getUsers')->middleware('auth:api');
    Route::post('/reset-password', 'Api\UserController@resetPassword')->middleware('auth:api', 'transaction');
    Route::post('/unlink-device', 'Api\UserController@unlinkUserDevice')->middleware('auth:api', 'transaction');
});

Route::group(['prefix' => 'region-profile'], function () {
    Route::get('/list', 'Api\RegionProfileController@getRegionProfiles')->middleware('auth:api', 'transaction');
    Route::post('/update-remarks', 'Api\RegionProfileController@updateRemarks')->middleware('auth:api', 'transaction');
});

Route::group(['prefix' => 'dealer'], function () {
    Route::get('/list/assign-options', 'Api\DealerController@getAllAssignDealerOptions')->middleware('auth:api');
});

Route::group(['prefix' => 'sales-dealer'], function () {
    Route::get('/user', 'Api\SalesDealerController@getUserAssignedDealers')->middleware('auth:api');
    Route::post('/assign-user', 'Api\SalesDealerController@assignUserToDealer')->middleware('auth:api', 'transaction');
    Route::post('/delete', 'Api\SalesDealerController@deleteAssignedDealer')->middleware('auth:api', 'transaction');
});

Route::group(['prefix' => 'inventory'], function () {
    Route::get('/schedules', 'Api\ScheduleController@getLatestSchedules')->middleware('auth:api');
    Route::post('/update-schedule', 'Api\ScheduleController@updateSchedule')->middleware('auth:api', 'transaction');
});
/* ======================================================================  END  ======================================================================*/

/* ======================================================================  MOBILE ======================================================================*/
Route::group(['prefix' => 'auth'], function () {
    Route::post('/login/mobile', 'Api\Auth\LoginController@loginMobile')->name('auth.login.mobile');
});

Route::group(['prefix' => 'dealer'], function () {
    Route::get('/user-dealers', 'Api\DealerController@getUserDealers')->middleware('auth:api');
});

Route::group(['prefix' => 'inventory'], function () {
    Route::post('/lock', 'Api\InventoryController@lock')->middleware('auth:api', 'transaction');
    Route::post('/unlock', 'Api\InventoryController@unlock')->middleware('auth:api', 'transaction');
    Route::get('/user-dealer-inventories', 'Api\InventoryController@getUserDealerInventories')->middleware('auth:api');
    Route::post('/save', 'Api\InventoryController@saveInventory')->middleware('auth:api', 'transaction');
    Route::post('/submit', 'Api\InventoryController@submitInventory')->middleware('auth:api', 'transaction');
});

Route::group(['prefix' => 'survey'], function () {
    Route::get('/outlet-type-list', 'Api\OutletController@getOutletTypeList')->middleware('auth:api');
    Route::get('/city-list', 'Api\AddressController@getCityList')->middleware('auth:api');
    Route::get('/barangay-list', 'Api\AddressController@getBarangayList')->middleware('auth:api');
    Route::get('/outlet-list', 'Api\OutletController@getUserOutlets')->middleware('auth:api');
    Route::get('/outlet-details', 'Api\OutletController@getOutletDetails')->middleware('auth:api');
    Route::get('/outlet-inventories', 'Api\SurveyInventoryController@getUserDealerInventories')->middleware('auth:api');
    Route::post('/save', 'Api\SurveyInventoryController@saveOutletAndInventory')->middleware('auth:api', 'transaction');
    Route::post('/submit', 'Api\SurveyInventoryController@submitOutletAndInventory')->middleware('auth:api', 'transaction');
});
/* ======================================================================  END  ======================================================================*/

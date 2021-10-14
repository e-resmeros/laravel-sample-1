<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMCityMunicipalityTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('m_city_municipality', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->unsignedInteger('region_id');
            $table->string('name', 50);
            $table->tinyInteger('is_active')->default('1')->comment('0 - Not Active
1 - Active');
            $table->nullableTimestamps();

            $table->index(["region_id"], 'fk_m_city_municipality_m_region');

            $table->foreign('region_id', 'fk_m_city_municipality_m_region')
                ->references('id')->on('m_region')
                ->onDelete('no action')
                ->onUpdate('no action');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('m_city_municipality');
    }
}

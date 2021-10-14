<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMBarangayTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('m_barangay', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->unsignedInteger('city_municipality_id');
            $table->string('name', 50);
            $table->tinyInteger('is_active')->default('1')->comment('0 - Not Active
1 - Active');
            $table->nullableTimestamps();

            $table->index(["city_municipality_id"], 'fk_m_barangay_m_city_municipality');

            $table->foreign('city_municipality_id', 'fk_m_barangay_m_city_municipality')
                ->references('id')->on('m_city_municipality')
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
        Schema::dropIfExists('m_barangay');
    }
}

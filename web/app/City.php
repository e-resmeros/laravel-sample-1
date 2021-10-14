<?php

namespace App;

use App\Traits\ModelOperationLogger;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class City
 * @package App
 */
class City extends Model
{
    use ModelOperationLogger;

    const UPDATED_AT = null;

    /**
     * @var array
     */
    protected $fillable = [
        'region_id',
        'name',
    ];

    /**
     * @var array
     */
    protected $hidden = [];

    /**
     * @var bool
     */
    public $incrementing = true;

    /**
     * City constructor.
     * @param array $attributes
     */
    public function __construct(array $attributes = [])
    {
        $this->table = config('tables.city.table_name');
        $this->primaryKey = config('tables.city.primary_key');
        parent::__construct($attributes);
    }

    public function region()
    {
        return $this->belongsTo(Region::class, 'region_id', 'id');
    }

    /**
     * @return HasMany
     */
    public function barangays()
    {
        return $this->hasMany(Barangay::class, 'barangay_id', 'id');
    }
}

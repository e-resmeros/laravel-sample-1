<?php

namespace App;

use App\Traits\ModelOperationLogger;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Barangay
 * @package App
 */
class Barangay extends Model
{
    use ModelOperationLogger;

    const UPDATED_AT = null;

    /**
     * @var array
     */
    protected $fillable = [
        'city_municipality_id',
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
     * Barangay constructor.
     * @param array $attributes
     */
    public function __construct(array $attributes = [])
    {
        $this->table = config('tables.barangay.table_name');
        $this->primaryKey = config('tables.barangay.primary_key');
        parent::__construct($attributes);
    }
}

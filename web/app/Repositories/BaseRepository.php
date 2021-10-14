<?php

namespace App\Repositories;

use App\Traits\ModelOperationLogger;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Model;

class BaseRepository implements BaseRepositoryInterface
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * @param array $data
     * @return array
     */
    public function create($data)
    {
        $model = $this->model->newQuery()
            ->create($data);

        return $this->toArray($model);
    }

    /**
     * @param array $data
     * @return array
     */
    public function createAll($data)
    {
        $timestamps = [];
        $this->model::CREATED_AT == NULL ?: $timestamps['created_at'] = Carbon::now();
        $this->model::UPDATED_AT == NULL ?: $timestamps['updated_at'] = Carbon::now();

        $data = array_map(function ($e) use ($timestamps) {
            $merged = array_merge(
                $e,
                $timestamps
            );
            ModelOperationLogger::log("CREATED", $this->model->getTable(), $merged);
            return $merged;
        }, $data);

        $this->model->newQuery()->insert($data);

        return $data;
    }

    /**
     * @param array $data
     * @return array
     */
    public function createIfNotExist($data)
    {
        $model = $this->getByColumns($data);
        return $model ? $model : $this->create($data);
    }

    /**
     * @param int $id
     * @return array
     */
    public function get($id)
    {
        $model = $this->model->newQuery()
            ->where($this->model->getKeyName(), $id)
            ->first();

        return $this->toArray($model);
    }

    /**
     * @param string $column
     * @param mixed $value
     * @return array
     */
    public function getByColumn($column, $value)
    {
        $model = $this->model->newQuery()
            ->where($column, $value)
            ->first();

        return $this->toArray($model);
    }

    /**
     * @param array $columns
     * @return array
     */
    public function getByColumns($columns)
    {
        $model = $this->model->newQuery();

        foreach ($columns as $column => $value) {
            $model->where($column, $value);
        }
        $model = $model->first();

        return $this->toArray($model);
    }

    /**
     * @param int $id
     * @param array $relationships
     * @return array
     */
    public function getWith($id, $relationships)
    {
        $model = $this->model->newQuery()
            ->with($relationships)
            ->where($this->model->getKeyName(), $id)
            ->first();

        return $this->toArray($model);
    }

    /**
     * @param string $column
     * @param mixed $value
     * @param array $relationships
     * @return array
     */
    public function getByColumnWith($column, $value, $relationships)
    {
        $model = $this->model->newQuery()
            ->with($relationships)
            ->where($column, $value)
            ->first();

        return $this->toArray($model);
    }

    /**
     * @return array
     */
    public function all()
    {
        $models = $this->model->all();

        return $this->toArray($models);
    }

    /**
     * @param string $column
     * @param mixed $value
     * @return array
     */
    public function allByColumn($column, $value)
    {
        $model = $this->model->newQuery()
            ->where($column, $value)
            ->get();

        return $this->toArray($model);
    }

    /**
     * @param array $columns
     * @param array $relationships
     * @return array
     */
    public function allByColumns($columns, $relationships = null)
    {
        $model = $this->model->newQuery();
        $model = $relationships ? $model->with($relationships) : $model;

        foreach ($columns as $column => $value) {
            $model->where($column, $value);
        }
        $model = $model->get();

        return $this->toArray($model);
    }

    /**
     * @param array $relationships
     * @return array
     */
    public function allWith($relationships)
    {
        $models = $this->model->newQuery()
            ->with($relationships)
            ->get();

        return $this->toArray($models);
    }

    /**
     * @param string $column
     * @param mixed $value
     * @param array $relationships
     * @return array
     */
    public function allByColumnWith($column, $value, $relationships)
    {
        $model = $this->model->newQuery()
            ->with($relationships)
            ->where($column, $value)
            ->get();

        return $this->toArray($model);
    }

    /**
     * @param int $id
     * @return array
     * @throws Exception
     */
    public function delete($id)
    {
        $model = $this->model->newQuery()
            ->where($this->model->getKeyName(), $id)
            ->first();

        return $model && $model->delete() ? $model->toArray() : [];
    }

    /**
     * @param array $columns
     * @return array
     * @throws Exception
     */
    public function deleteByColumns($columns)
    {
        $model = $this->model->newQuery();

        foreach ($columns as $column => $value) {
            $model->where($column, $value);
        }
        $model = $model->first();

        return $model && $model->delete() ? $model->toArray() : [];
    }

    /**
     * @param array $columns
     * @return array
     */
    public function deleteAllBy($columns)
    {
        $query = $this->model->newQuery();

        foreach ($columns as $column => $value) {
            $query->where($column, $value);
        }

        $models = $query->get();

        $query->delete();
        return array_map(function ($model) {
            ModelOperationLogger::log("DELETED", $this->model->getTable(), $model);
            return $model;
        }, $models->toArray());
    }

    /**
     * @param string $column
     * @param string $operator
     * @param string $value
     * @return array
     */
    public function deleteAllByColumn($column, $operator, $value)
    {
        $query = $this->model->newQuery()
            ->where($column, $operator, $value);
        $models = $query->get();

        $query->delete();
        return array_map(function ($model) {
            ModelOperationLogger::log("DELETED", $this->model->getTable(), $model);
            return $model;
        }, $models->toArray());
    }

    /**
     * @param int $id
     * @param array $data
     * @return array
     */
    public function update($id, $data)
    {
        $model = $this->model->newQuery()
            ->where($this->model->getKeyName(), $id)
            ->first()
            ->fill($data);
        $model->save();

        return $this->toArray($model);
    }

    /**
     * @param $column
     * @param $value
     * @param array $data
     * @return array
     */
    public function updateByColumn($column, $value, $data)
    {
        $model = $this->model->newQuery()
            ->where($column, $value)
            ->first()
            ->fill($data);
        $model->save();

        return $this->toArray($model);
    }

    /**
     * @param array $data
     * @return array
     */
    public function updateAll($data)
    {
        return array_map(function ($value, $key) {
            return $this->update($key, $value);
        }, $data, array_keys($data));
    }

    /**
     * @param mixed $model
     * @return array
     */
    protected function toArray($model)
    {
        return $model ? $model->toArray() : [];
    }
}

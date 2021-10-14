<?php

namespace App\Repositories;

use Exception;

interface BaseRepositoryInterface
{
    /**
     * @param array $data
     * @return array
     */
    public function create($data);

    /**
     * @param array $data
     * @return array
     */
    public function createAll($data);

    /**
     * @param array $data
     * @return array
     */
    public function createIfNotExist($data);

    /**
     * @param int $id
     * @return array
     */
    public function get($id);

    /**
     * @param int $id
     * @param array $relationships
     * @return array
     */
    public function getWith($id, $relationships);

    /**
     * @param string $column
     * @param mixed $value
     * @return array
     */
    public function getByColumn($column, $value);

    /**
     * @param array $columns
     * @return array
     */
    public function getByColumns($columns);

    /**
     * @param string $column
     * @param mixed $value
     * @param array $relationships
     * @return array
     */
    public function getByColumnWith($column, $value, $relationships);

    /**
     * @return array
     */
    public function all();

    /**
     * @param string $column
     * @param mixed $value
     * @return array
     */
    public function allByColumn($column, $value);

    /**
     * @param array $columns
     * @param array $relationships
     * @return array
     */
    public function allByColumns($columns, $relationships = null);

    /**
     * @param array $relationships
     * @return array
     */
    public function allWith($relationships);

    /**
     * @param string $column
     * @param mixed $value
     * @param array $relationships
     * @return array
     */
    public function allByColumnWith($column, $value, $relationships);

    /**
     * @param int $id
     * @return array
     */
    public function delete($id);

    /**
     * @param array $columns
     * @return array
     * @throws Exception
     */
    public function deleteByColumns($columns);

    /**
     * @param array $columns
     * @return array
     */
    public function deleteAllBy($columns);

    /**
     * @param int $id
     * @param mixed $data
     * @return array
     */
    public function update($id, $data);

    /**
     * @param $column
     * @param $value
     * @param array $data
     * @return array
     */
    public function updateByColumn($column, $value, $data);

    /**
     * @param array $data
     * @return array
     */
    public function updateAll($data);

    /**
     * @param string $column
     * @param string $operator
     * @param string $value
     * @return array
     */
    public function deleteAllByColumn($column, $operator, $value);
}

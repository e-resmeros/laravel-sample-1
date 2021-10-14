<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\Collection;

class Csv
{
    /**
     * @param Collection|array $collection
     * @return false|resource
     */
    public static function createCsvByCollection($collection)
    {
        $file = fopen("php://temp", "r+");

        $array = Csv::toArray($collection);

        $isMultiple = is_array($array[array_key_first($array)]);
        $titles = $isMultiple ?
            array_keys($array[array_key_first($array)])
            : array_keys($array);

        fputcsv($file, $titles);
        fseek($file, -1, SEEK_CUR);
        fwrite($file, "\r\n");

        if ($isMultiple) {
            foreach ($array as $element) {
                fputcsv($file, array_values($element));
                fseek($file, -1, SEEK_CUR);
                fwrite($file, "\r\n");
            }
        } else {
            fputcsv($file, $array);
            fseek($file, -1, SEEK_CUR);
            fwrite($file, "\r\n");
        }

        rewind($file);
        return $file;
    }

    /**
     * @param string $filePath
     * @return array
     */
    public static function readCsv($filePath)
    {
        $rows = array_filter(preg_split("/\R/", $filePath));
        $data = [];
        $rowHeaders = null;
        foreach ($rows as $row) {
            $explodedRow = array_filter(explode(",", $row));
            if (!isset($rowHeaders)) {
                $rowHeaders = self::_getHeaders($explodedRow);
            } else {
                $data[] = array_combine($rowHeaders, $explodedRow);
            }
        }

        return $data;
    }

    /**
     * @param Collection|array $collection
     * @return array
     */
    public static function toArray($collection)
    {
        if ($collection instanceof Collection) {
            $array = [];

            foreach ($collection as $model) {
                $model->setAppends([]);
                $array[] = $model->toArray();
            }

            return $array;
        }

        return $collection;
    }

    /**
     * @param array $columns
     * @return array
     */
    private static function _getHeaders($columns)
    {
        return array_map(function ($column) {
            return trim(strtolower($column));
        }, $columns);
    }
}

<?php

namespace App\Helpers;

use Exception;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Facades\Storage;

class FtpManagement
{
    /**
     * @param $directory
     * @return array
     */
    public static function listFiles($directory): array
    {
        return FtpManagement::_getStorage()->exists($directory) ? FtpManagement::_getStorage()->files($directory) : [];
    }

    /**
     * @param $fileName
     * @return array|string
     */
    public static function getFileContent($fileName)
    {
        try {
            return FtpManagement::_getStorage()->exists($fileName) ? FtpManagement::_getStorage()->get($fileName) : [];
        } catch (FileNotFoundException $e) {
            Wood::e($e->getTraceAsString());
            return [];
        }
    }

    /**
     * @param $oldPath
     * @param $newPath
     * @return bool
     */
    public static function moveFile($oldPath, $newPath)
    {
        try {
            if (FtpManagement::_getStorage()->exists($oldPath) && !FtpManagement::_getStorage()->exists($newPath)) {
                return FtpManagement::_getStorage()->move($oldPath, $newPath);
            }

            return false;
        } catch (Exception $e) {
            Wood::e($e->getTraceAsString());
            return false;
        }
    }

    /**
     * @param $file
     * @param $path
     * @param $storage
     * @return bool
     */
    public static function putFile($file, $path, $storage)
    {
        $storage = $storage ?? FtpManagement::_getStorage();
        try {
            return $storage->put($path, stream_get_contents($file));
        } catch (Exception $e) {
            Wood::e($e->getTraceAsString());
            return false;
        }
    }


    /**
     * @param $fileName
     * @return mixed
     */
    public static function getFileName($fileName)
    {
        if ($fileName && strpos($fileName, '/') !== false) {
            return array_slice(explode('/', $fileName), -1)[0];
        }

        return null;
    }

    /**
     * @return Filesystem
     */
    private static function _getStorage()
    {
        return Storage::disk(env('FILESYSTEM_DRIVER', 'local'));
    }
}

<?php

namespace App\Traits;

use App\Helpers\Csv;
use App\Helpers\Wood;
use ErrorException;
use Illuminate\Support\Facades\Storage;

trait LogExporter
{
    public function attemptExport()
    {
        if (count($this->logs) > 0) {
            $this->uploadToFtpServer();
        } else {
            Wood::exportLog("--No logs to be exported--\n");
        }
    }

    public function uploadToFtpServer()
    {
        $file = Csv::createCsvByCollection($this->logs);
        try {
            Storage::disk(env('FILESYSTEM_DRIVER', 'local'))->put($this->fileName, stream_get_contents($file));
            $this->success();
        } catch (ErrorException  $e) {
            $this->failed();
        }

        fclose($file);
    }

    public function failed()
    {
        $this->handleFailed();

        $message = ">>>>>>>>>> FAILED\n";
        $message .= "Error Occurred. There was a problem while uploading $this->fileName \n";

        Wood::exportLog($message, "ERROR");
    }

    public function success()
    {
        $this->handleSuccess();

        $message = ">>>>>>>>>> SUCCESS\n";
        $message .= "Successfully exported $this->fileName \n";

        Wood::exportLog($message);
    }

    public function handleSuccess()
    {
        // To be overwritten
    }

    public function handleFailed()
    {
        // To be overwritten
    }
}

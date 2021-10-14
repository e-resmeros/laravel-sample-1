<?php

namespace App\Console\Commands;

use App\Helpers\Wood;
use Carbon\Carbon;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DeleteExpiredAccessToken extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app-command:delete-expired-access-token';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deletes the expired oauth access tokens';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     */
    public function handle()
    {
        try {
            DB::beginTransaction();

            $users = DB::table('oauth_access_tokens')
                ->select('user_id')
                ->distinct()
                ->get()
                ->pluck('user_id')
                ->all();

            $keepAccessTokens = array_map(function ($user) {
                return DB::table('oauth_access_tokens')
                    ->where('user_id', $user)
                    ->latest()
                    ->first()
                    ->id;
            }, $users);

            DB::table('oauth_access_tokens')
                ->where('expires_at', '<=', Carbon::now())
                ->whereNotIn('id', $keepAccessTokens)
                ->delete();

            DB::commit();
        } catch (Exception $exception) {
            DB::rollBack();
            Wood::e($exception->getTraceAsString());
        }

    }
}

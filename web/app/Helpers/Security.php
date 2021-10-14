<?php

namespace App\Helpers;

use App\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Hash;

class Security
{
    protected $OPENSSL_CIPHER_NAME;
    protected $ENCRYPTION_KEY;
    protected $ENCRYPTION_IV;

    /**
     * Initializes class variables
     *
     * @return void
     */
    public function __construct()
    {
        $this->OPENSSL_CIPHER_NAME = config('constants.security.OPENSSL_CIPHER_NAME');
        $this->ENCRYPTION_KEY = config('constants.security.ENCRYPTION_KEY');
        $this->ENCRYPTION_IV = config('constants.security.ENCRYPTION_IV');
    }

    /**
     * Encrypts data using php's encryption algorithm
     *
     * @param string $data
     * @return string
     */
    public static function encrypt($data)
    {
        return base64_encode(
            openssl_encrypt(
                $data,
                self::OPENSSL_CIPHER_NAME,
                self::ENCRYPTION_KEY,
                OPENSSL_RAW_DATA,
                self::ENCRYPTION_IV
            )
        );
    }

    /**
     * Decrypts data using php's decryption algorithm
     *
     * @param string $data
     * @return string
     */
    public static function decrypt($data)
    {
        return openssl_decrypt(
            base64_decode($data),
            self::OPENSSL_CIPHER_NAME,
            self::ENCRYPTION_KEY,
            OPENSSL_RAW_DATA,
            self::ENCRYPTION_IV
        );
    }

    /**
     * Hashes data using Laravel's hash algorithm
     *
     * @param string $data
     * @return string
     */
    public static function hash($data)
    {
        return Hash::make($data, ['rounds' => 12]);
    }

    /**
     * Checks whether plainValue and hashedValue are the equal
     *
     * @param string $plainValue
     * @param string $hashedValue
     * @return bool
     */
    public static function check($plainValue, $hashedValue)
    {
        return Hash::check($plainValue, $hashedValue);
    }

    /**
     * @param User | Authenticatable $user
     * @param $access
     * @return bool
     */
    public static function checkRoleAccess($user, $access)
    {
        if ($access === config('constants.access_type.admin')) {
            $user = User::with(['roles' => function (BelongsToMany $query) {
                $query->where('id', config('constants.role.admin'));
            }])->where('id', $user->id)
                ->first();
        } else {
            $user = User::with(['roles' => function (BelongsToMany $query) use ($access) {
                $query->where($access, true);
            }])->where('id', $user->id)
                ->first();
        }

        return count($user->roles) > 0;
    }
}

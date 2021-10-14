<?php

return [
    'security' => [
        'OPENSSL_CIPHER_NAME' => 'xxx',
        'ENCRYPTION_KEY' => 'xxx',
        'ENCRYPTION_IV' => 'xxx',
    ],
    'status' => [
        'active' => 1,
        'inactive' => 0,
    ],
    'inventory_status' => [
        "locked" => 0,
        "submitted" => 1,
    ],
    'default' => [
        'page_size' => 10,
    ],
    'errors' => [
        'key' => [
            'code_key' => 'code',
            'message_key' => 'message',
        ],
        'common' => [
            'regex' => [
                'code' => 'ECR0001',
                'message' => 'The format for :attribute is invalid',
            ],
            'max' => [
                'code' => 'ECM0002',
                'message' => '',
            ],
            'required' => [
                'code' => 'ECR0003',
                'message' => 'The :attribute field is required',
            ],
            'unique' => [
                'code' => 'ECU0004',
                'message' => 'The :attribute already exists',
            ],
            'exists' => [
                'code' => 'ECE0005',
                'message' => 'The :attribute field does not exist',
            ],
            'confirmation' => [
                'code' => 'ECC0006',
                'message' => 'Password confirmation does not match',
            ],
            'email' => [
                'code' => 'ECE0007',
                'message' => 'Email format is invalid',
            ],
            'present' => [
                'code' => 'ECP0008',
                'message' => 'The :attribute must be present',
            ],
            'date' => [
                'code' => 'ECD0009',
                'message' => 'The :attribute is not a valid date.',
            ],
            'date_format' => [
                'code' => 'ECDF010',
                'message' => 'The :attribute did not follow the proper date format.',
            ],
            'db_rollback' => [
                'code' => 'ECDR011',
                'message' => 'Failed to save data in the database',
            ],'min' => [
                'code' => 'ECM0012',
                'message' => 'The :attribute should have at least :min record',
            ],
        ],
        'auth' => [
            'invalid_credentials' => [
                'code' => 'EAIC001',
                'message' => 'The username or password is incorrect',
            ],
            'role_unauthorized' => [
                'code' => 'EARU002',
                'message' => 'You are not allowed to access this app',
            ],
            'invalid_device' => [
                'code' => 'EAID003',
                'message' => 'You are not allowed to access in this device',
            ],
        ],
        'user' => [
            'update_failed' => [
                'code' => 'EUUF001',
                'message' => 'Failed to save',
            ],
            'failed_change_password' => [
                'code' => 'EUFCP02',
                'message' => 'This account is already linked to another device',
            ],
        ],
        'schedule' => [
            'no_schedule' => [
                'code' => 'EUU0001',
                'message' => 'No schedule as of this moment',
            ],
        ],
        'user_schedule' => [
            'not_found' => [
                'code' => 'ERRCODE',
                'message' => 'User schedule not found',
            ],
        ],
        'inventory' => [
            'not_found' => [
                'code' => 'ERRCODE',
                'message' => 'Inventory not found'
            ],
            'already_locked' => [
                'code' => 'ERRCODE',
                'message' => 'Dealer already taken by someone'
            ],
            'already_submitted' => [
                'code' => 'ERRCODE',
                'message' => 'Dealer already has inventory'
            ],
            'lock_failed' => [
                'code' => 'ERRCODE',
                'message' => 'Failed to lock'
            ],
            'unlock_failed' => [
                'code' => 'ERRCODE',
                'message' => 'Failed to unlock'
            ],
            'save_failed' => [
                'code' => 'ERRCODE',
                'message' => 'Failed to save'
            ],
            'submit_failed' => [
                'code' => 'ERRCODE',
                'message' => 'Failed to submit'
            ],
            'failed_date' => [
                'code' => 'ERRCODE',
                'message' => 'Unable to get date'
            ]
        ],
        'inventory_sku' => [
            'already_locked' => [
                'code' => 'ERRCODE',
                'message' => 'Dealer already taken by someone'
            ],
            'already_submitted' => [
                'code' => 'ERRCODE',
                'message' => 'Dealer already has inventory'
            ],
            'failed' => [
                'code' => 'ERRCODE',
                'message' => 'Failed to lock'
            ],
        ],
        'sales_dealer' => [
            'already_exists' => [
                'code' => 'ESDAE01',
                'message' => 'Dealer is already assigned to a user'
            ],
            'assign_failed' => [
                'code' => 'ESDAF02',
                'message' => 'Failed to assign user to dealer'
            ],
            'delete_failed' => [
                'code' => 'ESDDF02',
                'message' => 'Failed to delete sales dealer'
            ]
        ],
        'record_profile' => [
            'update_failed' => [
                'code' => 'ERPUF01',
                'message' => 'Failed to save',
            ],
        ],
        'survey_inventory' => [
            'already_submitted' => [
                'code' => 'ESIAS01',
                'message' => 'Inventory survey for outlet has already been submitted'
            ]
        ]
    ],
];

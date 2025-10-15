<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('users')->insert([
            [
                'id' => 1,
                'name' => 'admin',
                'username' => 'admin',
                'email' => 'admin@gmail.com',
                'email_verified_at' => null,
                'password' => Hash::make('12345678'),
                'photo' => 'upload/user/thumbnail/1830193814201669.jpg',
                'phone' => null,
                'about' => null,
                'role' => 'admin',
                'status' => 0,
                'remember_token' => 'Jr6IXENCxZR6uEdNeaalbFZ6jtayK38hnOeTX5naF5ETctAtqSkzsVGLiCKW',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'sumit kumar',
                'username' => 'sumit',
                'email' => 'sumit@gmail.com',
                'email_verified_at' => null,
                'password' => Hash::make('12345678'),
                'photo' => '',
                'phone' => null,
                'about' => null,
                'role' => 'admin',
                'status' => 0,
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

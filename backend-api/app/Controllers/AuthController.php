<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;

class AuthController extends ResourceController
{
    public function login()
    {
        $model = new UserModel();

        $username = $this->request->getJSON()->username ?? '';
        $password = $this->request->getJSON()->password ?? '';

        $user = $model
                ->where('username', $username)
                ->first();

        if (!$user) {
            return $this->failUnauthorized('Username salah');
        }

        if (!password_verify($password, $user['password'])) {
            return $this->failUnauthorized('Password salah');
        }

        $token = bin2hex(random_bytes(32));

        $model->update($user['id'], [
            'token' => $token
        ]);

        return $this->respond([
            'status' => true,
            'message' => 'Login berhasil',
            'token' => $token,
            'username' => $user['username']
        ]);
    }

    public function logout()
    {
        $token = $this->request->getHeaderLine('Authorization');

        $token = str_replace('Bearer ', '', $token);

        $model = new UserModel();

        $user = $model
                ->where('token', $token)
                ->first();

        if ($user) {
            $model->update($user['id'], [
                'token' => null
            ]);
        }

        return $this->respond([
            'status' => true,
            'message' => 'Logout berhasil'
        ]);
    }
}
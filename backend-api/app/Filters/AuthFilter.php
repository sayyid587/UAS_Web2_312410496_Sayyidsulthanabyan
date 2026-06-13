<?php

namespace App\Filters;

use App\Models\UserModel;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $header = $request->getHeaderLine('Authorization');

        if (!$header) {
            return service('response')
                ->setJSON([
                    'status' => false,
                    'message' => 'Unauthorized'
                ])
                ->setStatusCode(401);
        }

        $token = str_replace('Bearer ', '', $header);

        $userModel = new UserModel();

        $user = $userModel
                ->where('token', $token)
                ->first();

        if (!$user) {
            return service('response')
                ->setJSON([
                    'status' => false,
                    'message' => 'Token tidak valid'
                ])
                ->setStatusCode(401);
        }
    }

    public function after(
        RequestInterface $request,
        ResponseInterface $response,
        $arguments = null
    ) {}
}
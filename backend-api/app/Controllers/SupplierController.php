<?php

namespace App\Controllers;

use App\Models\SupplierModel;
use CodeIgniter\RESTful\ResourceController;

class SupplierController extends ResourceController
{
    protected $modelName = SupplierModel::class;
    protected $format = 'json';

    public function index()
    {
        return $this->respond(
            $this->model->findAll()
        );
    }

    public function show($id = null)
    {
        return $this->respond(
            $this->model->find($id)
        );
    }

    public function create()
    {
        $data = $this->request->getJSON(true);

        $this->model->insert($data);

        return $this->respondCreated([
            'status' => true,
            'message' => 'Supplier berhasil ditambahkan'
        ]);
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);

        $this->model->update($id, $data);

        return $this->respond([
            'status' => true,
            'message' => 'Supplier berhasil diupdate'
        ]);
    }

    public function delete($id = null)
    {
        $this->model->delete($id);

        return $this->respond([
            'status' => true,
            'message' => 'Supplier berhasil dihapus'
        ]);
    }
}
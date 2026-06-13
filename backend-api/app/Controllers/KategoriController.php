<?php

namespace App\Controllers;

use App\Models\KategoriModel;
use CodeIgniter\RESTful\ResourceController;

class KategoriController extends ResourceController
{
    protected $modelName = KategoriModel::class;
    protected $format    = 'json';

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
        $this->model->insert([
            'nama_kategori' =>
            $this->request->getJSON()->nama_kategori
        ]);

        return $this->respondCreated([
            'message' => 'Kategori berhasil ditambah'
        ]);
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);

        $this->model->update($id, $data);

        return $this->respond([
            'message' => 'Kategori berhasil diupdate'
        ]);
    }

    public function delete($id = null)
    {
        $this->model->delete($id);

        return $this->respond([
            'message' => 'Kategori berhasil dihapus'
        ]);
    }
}
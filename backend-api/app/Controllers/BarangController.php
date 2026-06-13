<?php

namespace App\Controllers;

use App\Models\BarangModel;
use CodeIgniter\RESTful\ResourceController;

class BarangController extends ResourceController
{
    protected $modelName = BarangModel::class;
    protected $format = 'json';

    public function index()
    {
        $db = \Config\Database::connect();

        $data = $db->table('barang')
            ->select('
                barang.*,
                kategori.nama_kategori,
                supplier.nama_supplier
            ')
            ->join(
                'kategori',
                'kategori.id = barang.kategori_id'
            )
            ->join(
                'supplier',
                'supplier.id = barang.supplier_id'
            )
            ->get()
            ->getResult();

        return $this->respond($data);
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
            'message' => 'Barang berhasil ditambahkan'
        ]);
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);

        $this->model->update($id, $data);

        return $this->respond([
            'status' => true,
            'message' => 'Barang berhasil diupdate'
        ]);
    }

    public function delete($id = null)
    {
        $this->model->delete($id);

        return $this->respond([
            'status' => true,
            'message' => 'Barang berhasil dihapus'
        ]);
    }
}
<?php

namespace App\Controllers;

use App\Models\BarangModel;
use App\Models\HistoriBarangModel;
use CodeIgniter\RESTful\ResourceController;

class HistoriController extends ResourceController
{
    public function create()
    {
        $histori = new HistoriBarangModel();
        $barangModel = new BarangModel();

        $data = $this->request->getJSON(true);

        $barang = $barangModel->find(
            $data['barang_id']
        );

        if (!$barang) {
            return $this->failNotFound(
                'Barang tidak ditemukan'
            );
        }

        if (
            $data['jenis'] == 'keluar' &&
            $barang['stok'] < $data['jumlah']
        ) {
            return $this->fail(
                'Stok tidak mencukupi'
            );
        }

        $histori->insert($data);

        if ($data['jenis'] == 'masuk') {

            $stokBaru =
                $barang['stok']
                + $data['jumlah'];

        } else {

            $stokBaru =
                $barang['stok']
                - $data['jumlah'];

        }

        $barangModel->update(
            $barang['id'],
            [
                'stok' => $stokBaru
            ]
        );

        return $this->respond([
            'status' => true,
            'message' => 'Transaksi berhasil',
            'stok_sekarang' => $stokBaru
        ]);
    }

    public function index()
    {
        $db = \Config\Database::connect();

        $data = $db->table('histori_barang')
            ->select('
                histori_barang.*,
                barang.nama_barang
            ')
            ->join(
                'barang',
                'barang.id = histori_barang.barang_id'
            )
            ->orderBy(
                'tanggal',
                'DESC'
            )
            ->get()
            ->getResult();

        return $this->respond($data);
    }
}
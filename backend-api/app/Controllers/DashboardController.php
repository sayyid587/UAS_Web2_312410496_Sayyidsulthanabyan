<?php

namespace App\Controllers;

use App\Models\BarangModel;
use App\Models\KategoriModel;
use App\Models\SupplierModel;
use CodeIgniter\RESTful\ResourceController;

class DashboardController extends ResourceController
{
    public function index()
{
    $barang = new BarangModel();
    $kategori = new KategoriModel();
    $supplier = new SupplierModel();

    $db = \Config\Database::connect();

    $stokMenipis = $db->table('barang')
        ->where('stok <=', 5)
        ->get()
        ->getResult();

    $transaksiTerakhir = $db->table('histori_barang')
        ->select('histori_barang.*, barang.nama_barang')
        ->join('barang', 'barang.id = histori_barang.barang_id')
        ->orderBy('tanggal', 'DESC')
        ->limit(5)
        ->get()
        ->getResult();

    $barangMasukHariIni = $db->table('histori_barang')
        ->where('jenis', 'masuk')
        ->where('DATE(tanggal)', date('Y-m-d'))
        ->countAllResults();

    $barangKeluarHariIni = $db->table('histori_barang')
        ->where('jenis', 'keluar')
        ->where('DATE(tanggal)', date('Y-m-d'))
        ->countAllResults();

    return $this->respond([

        'total_barang' => $barang->countAll(),

        'total_kategori' => $kategori->countAll(),

        'total_supplier' => $supplier->countAll(),

        'total_transaksi' =>
            $db->table('histori_barang')->countAll(),

        'barang_masuk_hari_ini' =>
            $barangMasukHariIni,

        'barang_keluar_hari_ini' =>
            $barangKeluarHariIni,

        'stok_menipis' =>
            $stokMenipis,

        'transaksi_terakhir' =>
            $transaksiTerakhir

    ]);
}

    public function publicStats()
    {
        $barang = new BarangModel();
        $kategori = new KategoriModel();
        $supplier = new SupplierModel();

        $db = \Config\Database::connect();

        $totalTransaksi = $db
            ->table('histori_barang')
            ->countAll();

        return $this->respond([
            'total_barang' => $barang->countAll(),
            'total_kategori' => $kategori->countAll(),
            'total_supplier' => $supplier->countAll(),
            'total_transaksi' => $totalTransaksi
        ]);
    }
}
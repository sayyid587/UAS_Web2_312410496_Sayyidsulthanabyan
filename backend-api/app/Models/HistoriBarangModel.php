<?php

namespace App\Models;

use CodeIgniter\Model;

class HistoriBarangModel extends Model
{
    protected $table = 'histori_barang';

    protected $primaryKey = 'id';

    protected $allowedFields = [
        'barang_id',
        'jenis',
        'jumlah',
        'tanggal'
    ];

    protected $returnType = 'array';
}
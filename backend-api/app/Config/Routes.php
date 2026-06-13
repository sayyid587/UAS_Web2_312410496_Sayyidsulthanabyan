<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');
$routes->options('(:any)', static function () {
    return response();
});
$routes->post('api/login', 'AuthController::login');
$routes->post('api/logout', 'AuthController::logout');

$routes->resource('api/kategori', [
    'controller' => 'KategoriController',
    'filter' => 'auth'
]);

$routes->resource('api/supplier', [
    'controller' => 'SupplierController',
    'filter' => 'auth'
]);

$routes->resource('api/barang', [
    'controller' => 'BarangController',
    'filter' => 'auth'
]);

$routes->resource('api/histori', [
    'controller' => 'HistoriController',
    'filter' => 'auth'
]);

$routes->get(
    'api/dashboard',
    'DashboardController::index',
    ['filter' => 'auth']
);

$routes->get(
    'api/dashboard-public',
    'DashboardController::publicStats'
);
import axios from "../axios.js";

export default {
  data() {
    return {
      stat: {
        total_barang: 0,
        total_kategori: 0,
        total_supplier: 0,
        total_transaksi: 0,
        barang_masuk_hari_ini: 0,
        barang_keluar_hari_ini: 0,
        stok_menipis: [],
        transaksi_terakhir: [],
      },
    };
  },

  async mounted() {
    try {
      const res = await axios.get("/dashboard");

      this.stat = res.data;
    } catch (err) {
      console.log(err);
    }
  },

  methods: {
    logout() {
      localStorage.clear();

      this.$router.push("/login");
    },
  },

  template: `

<!-- Content -->
<div class="flex-1 p-8">

    <h1 class="text-3xl font-bold mb-6">
        Dashboard
    </h1>

    <!-- Statistik -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">

        <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-gray-500 text-sm uppercase">
                Total Barang
            </h2>

            <p class="text-4xl font-bold text-blue-600 mt-2">
                {{ stat.total_barang }}
            </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-gray-500 text-sm uppercase">
                Total Kategori
            </h2>

            <p class="text-4xl font-bold text-green-600 mt-2">
                {{ stat.total_kategori }}
            </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-gray-500 text-sm uppercase">
                Total Supplier
            </h2>

            <p class="text-4xl font-bold text-purple-600 mt-2">
                {{ stat.total_supplier }}
            </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-gray-500 text-sm uppercase">
                Total Transaksi
            </h2>

            <p class="text-4xl font-bold text-red-600 mt-2">
                {{ stat.total_transaksi }}
            </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-gray-500 text-sm uppercase">
                Masuk Hari Ini
            </h2>

            <p class="text-4xl font-bold text-green-600 mt-2">
                {{ stat.barang_masuk_hari_ini }}
            </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-gray-500 text-sm uppercase">
                Keluar Hari Ini
            </h2>

            <p class="text-4xl font-bold text-orange-600 mt-2">
                {{ stat.barang_keluar_hari_ini }}
            </p>
        </div>

    </div>

    <!-- Widget Dashboard -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        <!-- Stok Menipis -->
        <div class="bg-white rounded-lg shadow p-6">

            <h2 class="text-xl font-bold mb-4">
                ⚠️ Stok Menipis
            </h2>

            <div
                v-if="stat.stok_menipis.length === 0"
                class="text-green-600">

                Tidak ada stok menipis

            </div>

            <table
                v-else
                class="w-full">

                <thead>

                    <tr class="border-b">

                        <th class="text-left py-2">
                            Barang
                        </th>

                        <th class="text-center py-2">
                            Stok
                        </th>

                    </tr>

                </thead>

                <tbody>

                    <tr
                        v-for="item in stat.stok_menipis"
                        :key="item.id"
                        class="border-b">

                        <td class="py-2">
                            {{ item.nama_barang }}
                        </td>

                        <td class="text-center text-red-600 font-bold">
                            {{ item.stok }}
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

        <!-- Transaksi Terakhir -->
        <div class="bg-white rounded-lg shadow p-6">

            <h2 class="text-xl font-bold mb-4">
                📋 5 Transaksi Terakhir
            </h2>

            <table class="w-full">

                <thead>

                    <tr class="border-b">

                        <th class="text-left py-2">
                            Barang
                        </th>

                        <th class="text-center py-2">
                            Jenis
                        </th>

                        <th class="text-center py-2">
                            Jumlah
                        </th>

                    </tr>

                </thead>

                <tbody>

                    <tr
                        v-for="item in stat.transaksi_terakhir"
                        :key="item.id"
                        class="border-b">

                        <td class="py-2">
                            {{ item.nama_barang }}
                        </td>

                        <td class="text-center">

                            <span
                                :class="item.jenis === 'masuk'
                                ? 'text-green-600 font-semibold'
                                : 'text-red-600 font-semibold'">

                                {{ item.jenis }}

                            </span>

                        </td>

                        <td class="text-center">
                            {{ item.jumlah }}
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    </div>

    <!-- Welcome -->
    <div class="bg-white p-6 rounded-lg shadow">

        <h2 class="text-xl font-bold mb-3">
            Selamat Datang Administrator
        </h2>

        <p class="text-gray-600">
            Sistem Manajemen Inventaris Barang berbasis
            CodeIgniter 4 REST API dan VueJS SPA.
        </p>

    </div>

</div>

`,
};

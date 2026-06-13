import axios from "../axios.js";

export default {
  data() {
    return {
      stat: {
        total_barang: 0,
        total_kategori: 0,
        total_supplier: 0,
        total_transaksi: 0,
      },
    };
  },

  async mounted() {
    try {
      const res = await axios.get("/dashboard-public");

      this.stat = res.data;
    } catch (err) {
      console.error(err);
    }
  },

  template: `

<div class="min-h-screen bg-gray-100">

    <!-- HERO -->
    <section
        class="bg-gradient-to-r from-blue-700 to-indigo-900 text-white">

        <div
            class="max-w-7xl mx-auto px-8 py-20">

            <div
                class="grid md:grid-cols-2 gap-12 items-center">

                <div>

                    <div
                        class="inline-block bg-blue-500/30 border border-blue-300 px-4 py-2 rounded-full mb-5">

                        📊 Smart Warehouse Management

                    </div>

                    <h1
                        class="text-5xl font-bold leading-tight mb-6">

                        Sistem Manajemen
                        Inventaris Gudang

                    </h1>

                    <p
                        class="text-xl text-blue-100 mb-8">

                        Kelola stok barang, supplier,
                        kategori, dan histori transaksi
                        masuk maupun keluar secara real-time
                        dalam satu platform modern.

                    </p>

                    <router-link
                        to="/login"
                        class="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">

                        Login Administrator

                    </router-link>

                </div>

                <div>

                    <div
                        class="bg-white rounded-3xl shadow-2xl p-10">

                        <div class="text-center">

                            <div
                                class="text-9xl mb-5">

                                🏭

                            </div>

                            <h3
                                class="text-3xl font-bold text-gray-700">

                                Warehouse

                            </h3>

                            <p
                                class="text-gray-500 mt-3">

                                Monitoring Inventaris,
                                Supplier, Kategori,
                                dan Histori Transaksi

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </section>

    <!-- STATISTIK -->

    <section
        class="max-w-7xl mx-auto px-8 -mt-10">

        <div
            class="grid md:grid-cols-4 gap-6">

            <div
                class="bg-white rounded-xl shadow p-6">

                <p class="text-gray-500">

                    Total Barang

                </p>

                <h2
                    class="text-3xl font-bold text-blue-600">

                    {{ stat.total_barang }}

                </h2>

            </div>

            <div
                class="bg-white rounded-xl shadow p-6">

                <p class="text-gray-500">

                    Total Kategori

                </p>

                <h2
                    class="text-3xl font-bold text-green-600">

                    {{ stat.total_kategori }}

                </h2>

            </div>

            <div
                class="bg-white rounded-xl shadow p-6">

                <p class="text-gray-500">

                    Total Supplier

                </p>

                <h2
                    class="text-3xl font-bold text-orange-600">

                    {{ stat.total_supplier }}

                </h2>

            </div>

            <div
                class="bg-white rounded-xl shadow p-6">

                <p class="text-gray-500">

                    Total Transaksi

                </p>

                <h2
                    class="text-3xl font-bold text-red-600">

                    {{ stat.total_transaksi }}

                </h2>

            </div>

        </div>

    </section>

    <!-- FITUR -->

    <section
        class="max-w-7xl mx-auto px-8 py-16">

        <h2
            class="text-3xl font-bold text-center mb-12">

            Fitur Utama Sistem

        </h2>

        <div
            class="grid md:grid-cols-4 gap-6">

            <div
                class="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">

                <div class="text-5xl mb-4">
                    📦
                </div>

                <h3
                    class="font-bold text-lg mb-2">

                    Data Barang

                </h3>

                <p
                    class="text-gray-600">

                    Kelola data inventaris
                    secara terpusat.

                </p>

            </div>

            <div
                class="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">

                <div class="text-5xl mb-4">
                    🏷️
                </div>

                <h3
                    class="font-bold text-lg mb-2">

                    Kategori Barang

                </h3>

                <p
                    class="text-gray-600">

                    Mengelompokkan barang
                    berdasarkan kategori.

                </p>

            </div>

            <div
                class="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">

                <div class="text-5xl mb-4">
                    🚚
                </div>

                <h3
                    class="font-bold text-lg mb-2">

                    Supplier

                </h3>

                <p
                    class="text-gray-600">

                    Kelola seluruh pemasok
                    barang gudang.

                </p>

            </div>

            <div
                class="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">

                <div class="text-5xl mb-4">
                    📋
                </div>

                <h3
                    class="font-bold text-lg mb-2">

                    Histori Transaksi

                </h3>

                <p
                    class="text-gray-600">

                    Pantau barang masuk dan
                    keluar secara real-time.

                </p>

            </div>

        </div>

    </section>

    <!-- CTA -->

    <section
        class="bg-blue-700 text-white py-16">

        <div
            class="max-w-4xl mx-auto text-center px-8">

            <h2
                class="text-4xl font-bold mb-4">

                Kelola Gudang Lebih Efisien

            </h2>

            <p
                class="text-blue-100 mb-8">

                Login sebagai administrator
                untuk mengakses dashboard
                dan seluruh fitur inventaris.

            </p>

            <router-link
                to="/login"
                class="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">

                Masuk Sekarang

            </router-link>

        </div>

    </section>

    <!-- FOOTER -->

    <footer
        class="bg-gray-900 text-gray-300 text-center py-6">

        <p>

            © 2026 E-Inventory System

        </p>

    </footer>

</div>

`,
};

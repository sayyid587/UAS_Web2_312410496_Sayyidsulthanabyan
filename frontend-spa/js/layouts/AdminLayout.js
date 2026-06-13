export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");

      this.$router.push("/login");
    },
  },

  template: `
  
<div class="flex min-h-screen bg-gray-100">

    <!-- SIDEBAR -->
    <aside class="w-64 bg-gray-900 text-white shadow-lg">

        <div class="p-6 border-b border-gray-700">

            <h1 class="text-2xl font-bold">
                E-Inventory
            </h1>

            <p class="text-sm text-gray-400 mt-1">
                Sistem Inventaris Barang
            </p>

        </div>

        <nav class="mt-4">

            <router-link
                to="/admin/dashboard"
                class="block px-5 py-3 hover:bg-gray-800 transition">

                📊 Dashboard

            </router-link>

            <router-link
                to="/admin/barang"
                class="block px-5 py-3 hover:bg-gray-800 transition">

                📦 Barang

            </router-link>

            <router-link
                to="/admin/kategori"
                class="block px-5 py-3 hover:bg-gray-800 transition">

                🏷️ Kategori

            </router-link>

            <router-link
                to="/admin/supplier"
                class="block px-5 py-3 hover:bg-gray-800 transition">

                🚚 Supplier

            </router-link>

            <router-link
                to="/admin/histori"
                class="block px-5 py-3 hover:bg-gray-800 transition">

                📋 Histori

            </router-link>

            <hr class="border-gray-700 my-3">

            <a
                href="#"
                @click.prevent="logout"
                class="block px-5 py-3 text-red-300 hover:bg-red-600 hover:text-white transition">

                🚪 Logout

            </a>

        </nav>

    </aside>

    <!-- CONTENT -->
    <main class="flex-1">

        <!-- HEADER -->
        <div class="bg-white shadow px-6 py-4">

            <h2 class="text-xl font-semibold text-gray-700">

                E-Inventory Management System

            </h2>

        </div>

        <!-- PAGE CONTENT -->
        <div class="p-6">

            <router-view></router-view>

        </div>

    </main>

</div>

`,
};

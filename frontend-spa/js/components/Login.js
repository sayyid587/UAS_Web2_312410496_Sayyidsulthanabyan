import axios from "../axios.js";

export default {
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      loading: false,
    };
  },

  methods: {
    async login() {
      try {
        this.loading = true;

        const res = await axios.post("/login", {
          username: this.username,
          password: this.password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isLoggedIn", "true");

        Swal.fire({
          icon: "success",
          title: "Login Berhasil",
          timer: 1200,
          showConfirmButton: false,
        });

        setTimeout(() => {
          this.$router.push("/admin/dashboard");
        }, 1200);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: "Username atau password salah",
        });
      } finally {
        this.loading = false;
      }
    },
  },

  template: `

<div class="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900">

    <div class="min-h-screen flex">

        <!-- LEFT -->
        <div class="hidden lg:flex lg:w-1/2 items-center justify-center p-12">

            <div class="text-center text-white">

                <div class="text-9xl mb-6">
                    🏭
                </div>

                <h1 class="text-5xl font-bold mb-4">
                    E-Inventory
                </h1>

                <p class="text-xl text-blue-100 max-w-md">

                    Sistem Manajemen Inventaris Gudang
                    untuk mengelola barang, supplier,
                    kategori dan histori transaksi.

                </p>

            </div>

        </div>

        <!-- RIGHT -->
        <div
            class="w-full lg:w-1/2 flex items-center justify-center p-6">

            <div
                class="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-md p-8">

                <div class="text-center mb-8">

                    <div class="text-5xl mb-3">
                        🔐
                    </div>

                    <h2
                        class="text-3xl font-bold text-gray-800">

                        Login Administrator

                    </h2>

                    <p
                        class="text-gray-500 mt-2">

                        Masuk untuk mengakses dashboard

                    </p>

                </div>

                <div class="space-y-4">

                    <div>

                        <label
                            class="block text-sm font-medium text-gray-700 mb-2">

                            Username

                        </label>

                        <input
                            v-model="username"
                            placeholder="Masukkan username"
                            class="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">

                    </div>

                    <div>

                        <label
                            class="block text-sm font-medium text-gray-700 mb-2">

                            Password

                        </label>

                        <div class="relative">

                            <input
                                :type="showPassword ? 'text' : 'password'"
                                v-model="password"
                                placeholder="Masukkan password"
                                class="w-full border border-gray-300 rounded-xl p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500">

                            <button
                                type="button"
                                @click="showPassword = !showPassword"
                                class="absolute right-3 top-3">

                                {{ showPassword ? '🙈' : '👁️' }}

                            </button>

                        </div>

                    </div>

                    <button
                        @click="login"
                        :disabled="loading"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">

                        {{ loading ? 'Memproses...' : 'Login' }}

                    </button>

                </div>

                <div class="mt-6 text-center">

                    <router-link
                        to="/"
                        class="text-blue-600 hover:text-blue-800">

                        ← Kembali ke Beranda

                    </router-link>

                </div>

            </div>

        </div>

    </div>

</div>

`,
};

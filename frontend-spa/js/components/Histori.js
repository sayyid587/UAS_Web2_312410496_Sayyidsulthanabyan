import axios from "../axios.js";

export default {
  data() {
    return {
      barang: [],
      histori: [],
      search: "",

      form: {
        barang_id: "",
        jenis: "masuk",
        jumlah: 1,
      },
    };
  },

  async mounted() {
    await this.loadBarang();
    await this.loadHistori();
  },

  computed: {
    filteredHistori() {
      if (!this.search) return this.histori;

      return this.histori.filter((item) =>
        item.nama_barang.toLowerCase().includes(this.search.toLowerCase()),
      );
    },

    totalMasuk() {
      return this.histori
        .filter((x) => x.jenis === "masuk")
        .reduce((a, b) => a + Number(b.jumlah), 0);
    },

    totalKeluar() {
      return this.histori
        .filter((x) => x.jenis === "keluar")
        .reduce((a, b) => a + Number(b.jumlah), 0);
    },

    transaksiHariIni() {
      const today = new Date().toISOString().split("T")[0];

      return this.histori.filter((x) => x.tanggal.startsWith(today)).length;
    },
  },

  methods: {
    async loadBarang() {
      const res = await axios.get("/barang");

      this.barang = res.data;
    },

    async loadHistori() {
      const res = await axios.get("/histori");

      this.histori = res.data;
    },

    async simpan() {
      try {
        await axios.post("/histori", this.form);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Transaksi berhasil disimpan",
        });

        this.form = {
          barang_id: "",
          jenis: "masuk",
          jumlah: 1,
        };

        await this.loadHistori();
        await this.loadBarang();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text:
            err.response?.data?.messages?.error ||
            err.response?.data?.message ||
            "Terjadi kesalahan",
        });
      }
    },

    formatTanggal(tanggal) {
      return new Date(tanggal).toLocaleString("id-ID");
    },
  },

  template: `

  <div class="p-6">

    <div class="flex justify-between items-center mb-6">

        <h1 class="text-3xl font-bold">
            Histori Barang
        </h1>

    </div>

    <!-- Statistik -->

    <div
        class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div
            class="bg-green-100 border border-green-300 p-5 rounded">

            <p class="text-sm text-gray-600">
                Total Barang Masuk
            </p>

            <h2 class="text-3xl font-bold text-green-700">

                {{ totalMasuk }}

            </h2>

        </div>

        <div
            class="bg-red-100 border border-red-300 p-5 rounded">

            <p class="text-sm text-gray-600">
                Total Barang Keluar
            </p>

            <h2 class="text-3xl font-bold text-red-700">

                {{ totalKeluar }}

            </h2>

        </div>

        <div
            class="bg-blue-100 border border-blue-300 p-5 rounded">

            <p class="text-sm text-gray-600">
                Transaksi Hari Ini
            </p>

            <h2 class="text-3xl font-bold text-blue-700">

                {{ transaksiHariIni }}

            </h2>

        </div>

    </div>

    <!-- Form -->

    <div
        class="bg-white rounded shadow p-6 mb-6">

        <h2
            class="text-xl font-semibold mb-4">

            Input Transaksi

        </h2>

        <div class="grid md:grid-cols-3 gap-4">

            <select
                v-model="form.barang_id"
                class="border rounded p-2">

                <option value="">
                    Pilih Barang
                </option>

                <option
                    v-for="item in barang"
                    :value="item.id">

                    {{ item.nama_barang }}

                </option>

            </select>

            <select
                v-model="form.jenis"
                class="border rounded p-2">

                <option value="masuk">
                    Barang Masuk
                </option>

                <option value="keluar">
                    Barang Keluar
                </option>

            </select>

            <input
                type="number"
                min="1"
                v-model="form.jumlah"
                class="border rounded p-2"
                placeholder="Jumlah">

        </div>

        <button
            @click="simpan"
            class="mt-4 bg-blue-600 text-white px-5 py-2 rounded">

            Simpan Transaksi

        </button>

    </div>

    <!-- Search -->

    <div class="mb-4">

        <input
            v-model="search"
            placeholder="Cari histori barang..."
            class="border rounded p-2 w-full">

    </div>

    <!-- Table -->

    <div
        class="bg-white rounded shadow overflow-x-auto">

        <table class="w-full">

            <thead>

                <tr
                    class="bg-gray-100">

                    <th class="p-3 text-left">
                        Tanggal
                    </th>

                    <th class="p-3 text-left">
                        Barang
                    </th>

                    <th class="p-3 text-center">
                        Jenis
                    </th>

                    <th class="p-3 text-center">
                        Jumlah
                    </th>

                </tr>

            </thead>

            <tbody>

                <tr
                    v-if="filteredHistori.length === 0">

                    <td
                        colspan="4"
                        class="text-center p-8 text-gray-500">

                        Belum ada transaksi

                    </td>

                </tr>

                <tr
                    v-for="item in filteredHistori"
                    :key="item.id"
                    class="border-t">

                    <td class="p-3">

                        {{ formatTanggal(item.tanggal) }}

                    </td>

                    <td class="p-3">

                        {{ item.nama_barang }}

                    </td>

                    <td
                        class="p-3 text-center">

                        <span
                            :class="item.jenis === 'masuk'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'"
                            class="px-3 py-1 rounded">

                            {{ item.jenis }}

                        </span>

                    </td>

                    <td
                        class="p-3 text-center font-bold">

                        {{ item.jumlah }}

                    </td>

                </tr>

            </tbody>

        </table>

    </div>

</div>
`,
};

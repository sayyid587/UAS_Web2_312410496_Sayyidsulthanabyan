import axios from "../axios.js";

export default {
  data() {
    return {
      barang: [],
      kategori: [],
      supplier: [],

      keyword: "",

      showModal: false,
      editMode: false,
      editId: null,

      form: {
        kategori_id: "",
        supplier_id: "",
        nama_barang: "",
        stok: 0,
        harga: 0,
      },
    };
  },

  computed: {
    filteredBarang() {
      return this.barang.filter((item) =>
        item.nama_barang.toLowerCase().includes(this.keyword.toLowerCase()),
      );
    },

    totalBarang() {
      return this.barang.length;
    },

    stokTipis() {
      return this.barang.filter((b) => b.stok <= 5).length;
    },

    stokAman() {
      return this.barang.filter((b) => b.stok > 5).length;
    },
  },

  mounted() {
    this.loadBarang();
    this.loadKategori();
    this.loadSupplier();
  },

  methods: {
    async loadBarang() {
      const res = await axios.get("/barang");
      this.barang = res.data;
    },

    async loadKategori() {
      const res = await axios.get("/kategori");
      this.kategori = res.data;
    },

    async loadSupplier() {
      const res = await axios.get("/supplier");
      this.supplier = res.data;
    },

    async simpan() {
      try {
        if (this.editMode) {
          await axios.put("/barang/" + this.editId, this.form);

          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Barang berhasil diupdate",
          });
        } else {
          await axios.post("/barang", this.form);

          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Barang berhasil ditambahkan",
          });
        }

        this.resetForm();
        this.loadBarang();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Data gagal disimpan",
        });
      }
    },

    edit(item) {
      this.editMode = true;
      this.editId = item.id;

      this.form = {
        kategori_id: item.kategori_id,
        supplier_id: item.supplier_id,
        nama_barang: item.nama_barang,
        stok: item.stok,
        harga: item.harga,
      };

      this.showModal = true;
    },

    async hapus(id) {
      const result = await Swal.fire({
        title: "Yakin?",
        text: "Data akan dihapus permanen",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya Hapus",
      });

      if (!result.isConfirmed) return;

      await axios.delete("/barang/" + id);

      Swal.fire("Berhasil", "Data berhasil dihapus", "success");

      this.loadBarang();
    },

    resetForm() {
      this.showModal = false;
      this.editMode = false;
      this.editId = null;

      this.form = {
        kategori_id: "",
        supplier_id: "",
        nama_barang: "",
        stok: 0,
        harga: 0,
      };
    },
  },

  template: `

<div class="p-6">

    <div class="mb-8">

        <h1 class="text-4xl font-bold text-gray-800">
            📦 Manajemen Barang
        </h1>

        <p class="text-gray-500 mt-2">
            Kelola seluruh inventaris gudang
        </p>

    </div>

    <!-- Statistik -->

    <div class="grid md:grid-cols-3 gap-6 mb-8">

        <div class="bg-white rounded-xl shadow p-6">

            <p class="text-gray-500">
                Total Barang
            </p>

            <h2 class="text-4xl font-bold text-blue-600">
                {{ totalBarang }}
            </h2>

        </div>

        <div class="bg-white rounded-xl shadow p-6">

            <p class="text-gray-500">
                Stok Aman
            </p>

            <h2 class="text-4xl font-bold text-green-600">
                {{ stokAman }}
            </h2>

        </div>

        <div class="bg-white rounded-xl shadow p-6">

            <p class="text-gray-500">
                Stok Menipis
            </p>

            <h2 class="text-4xl font-bold text-red-600">
                {{ stokTipis }}
            </h2>

        </div>

    </div>

    <!-- Toolbar -->

    <div class="flex flex-col md:flex-row justify-between gap-4 mb-6">

        <input
            v-model="keyword"
            placeholder="🔍 Cari barang..."
            class="border rounded-xl px-4 py-3 w-full md:w-96">

        <button
            @click="showModal=true"
            class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow">

            + Tambah Barang

        </button>

    </div>

    <!-- Table -->

    <div
        class="bg-white rounded-xl shadow-lg overflow-hidden">

        <table class="w-full">

            <thead>

                <tr
                    class="bg-gray-800 text-white">

                    <th class="p-4">
                        ID
                    </th>

                    <th class="p-4">
                        Barang
                    </th>

                    <th class="p-4">
                        Kategori
                    </th>

                    <th class="p-4">
                        Supplier
                    </th>

                    <th class="p-4">
                        Stok
                    </th>

                    <th class="p-4">
                        Harga
                    </th>

                    <th class="p-4">
                        Aksi
                    </th>

                </tr>

            </thead>

            <tbody>

                <tr
                    v-if="filteredBarang.length===0">

                    <td
                        colspan="7"
                        class="text-center py-10 text-gray-400">

                        Belum ada data barang

                    </td>

                </tr>

                <tr
                    v-for="item in filteredBarang"
                    :key="item.id"
                    class="border-b hover:bg-gray-50">

                    <td class="p-4">
                        {{ item.id }}
                    </td>

                    <td class="p-4 font-medium">
                        {{ item.nama_barang }}
                    </td>

                    <td class="p-4">
                        {{ item.nama_kategori }}
                    </td>

                    <td class="p-4">
                        {{ item.nama_supplier }}
                    </td>

                    <td class="p-4">

                        <span
                            :class="item.stok <= 5
                            ? 'bg-red-100 text-red-600'
                            : 'bg-green-100 text-green-600'"
                            class="px-3 py-1 rounded-full font-semibold">

                            {{ item.stok }}

                        </span>

                    </td>

                    <td class="p-4 font-semibold">

                        Rp {{ Number(item.harga).toLocaleString('id-ID') }}

                    </td>

                    <td class="p-4">

                        <button
                            @click="edit(item)"
                            class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg mr-2">

                            ✏️

                        </button>

                        <button
                            @click="hapus(item.id)"
                            class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg">

                            🗑️

                        </button>

                    </td>

                </tr>

            </tbody>

        </table>

    </div>

    <!-- MODAL -->

    <div
        v-if="showModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

        <div
            class="bg-white rounded-2xl shadow-2xl w-[600px] p-8">

            <h2
                class="text-2xl font-bold mb-6">

                {{ editMode ? '✏️ Edit Barang' : '📦 Tambah Barang' }}

            </h2>

            <select
                v-model="form.kategori_id"
                class="border w-full p-3 rounded-xl mb-3">

                <option value="">
                    Pilih Kategori
                </option>

                <option
                    v-for="k in kategori"
                    :value="k.id">

                    {{ k.nama_kategori }}

                </option>

            </select>

            <select
                v-model="form.supplier_id"
                class="border w-full p-3 rounded-xl mb-3">

                <option value="">
                    Pilih Supplier
                </option>

                <option
                    v-for="s in supplier"
                    :value="s.id">

                    {{ s.nama_supplier }}

                </option>

            </select>

            <input
                v-model="form.nama_barang"
                placeholder="Nama Barang"
                class="border w-full p-3 rounded-xl mb-3">

            <input
                type="number"
                v-model="form.stok"
                placeholder="Stok"
                class="border w-full p-3 rounded-xl mb-3">

            <input
                type="number"
                v-model="form.harga"
                placeholder="Harga"
                class="border w-full p-3 rounded-xl mb-5">

            <div class="flex justify-end gap-3">

                <button
                    @click="resetForm"
                    class="bg-gray-500 text-white px-5 py-2 rounded-xl">

                    Batal

                </button>

                <button
                    @click="simpan"
                    class="bg-blue-600 text-white px-5 py-2 rounded-xl">

                    Simpan

                </button>

            </div>

        </div>

    </div>

</div>

`,
};

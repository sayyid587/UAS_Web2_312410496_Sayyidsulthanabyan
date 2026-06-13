import axios from "../axios.js";

export default {
  data() {
    return {
      supplier: [],

      keyword: "",

      nama_supplier: "",
      alamat: "",
      telepon: "",

      showModal: false,
      editMode: false,
      editId: null,
    };
  },

  computed: {
    filteredSupplier() {
      return this.supplier.filter((item) =>
        item.nama_supplier.toLowerCase().includes(this.keyword.toLowerCase()),
      );
    },

    totalSupplier() {
      return this.supplier.length;
    },
  },

  mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      const res = await axios.get("/supplier");
      this.supplier = res.data;
    },

    async simpan() {
      try {
        const data = {
          nama_supplier: this.nama_supplier,
          alamat: this.alamat,
          telepon: this.telepon,
        };

        if (this.editMode) {
          await axios.put("/supplier/" + this.editId, data);

          Swal.fire("Berhasil", "Supplier berhasil diperbarui", "success");
        } else {
          await axios.post("/supplier", data);

          Swal.fire("Berhasil", "Supplier berhasil ditambahkan", "success");
        }

        this.resetForm();
        this.loadData();
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

      this.nama_supplier = item.nama_supplier;
      this.alamat = item.alamat;
      this.telepon = item.telepon;

      this.showModal = true;
    },

    async hapus(id) {
      const result = await Swal.fire({
        title: "Yakin?",
        text: "Supplier akan dihapus",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya Hapus",
      });

      if (!result.isConfirmed) return;

      await axios.delete("/supplier/" + id);

      Swal.fire("Berhasil", "Supplier berhasil dihapus", "success");

      this.loadData();
    },

    resetForm() {
      this.showModal = false;

      this.editMode = false;

      this.editId = null;

      this.nama_supplier = "";
      this.alamat = "";
      this.telepon = "";
    },
  },

  template: `

<div class="p-6">

    <!-- Header -->

    <div class="mb-8">

        <h1 class="text-4xl font-bold text-gray-800">

            🚚 Manajemen Supplier

        </h1>

        <p class="text-gray-500 mt-2">

            Kelola pemasok barang inventaris

        </p>

    </div>

    <!-- Statistik -->

    <div class="bg-white rounded-xl shadow p-6 mb-8">

        <p class="text-gray-500">

            Total Supplier

        </p>

        <h2 class="text-4xl font-bold text-green-600">

            {{ totalSupplier }}

        </h2>

    </div>

    <!-- Toolbar -->

    <div class="flex flex-col md:flex-row justify-between gap-4 mb-6">

        <input
            v-model="keyword"
            placeholder="🔍 Cari supplier..."
            class="border rounded-xl px-4 py-3 w-full md:w-96">

        <button
            @click="showModal=true"
            class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow">

            + Tambah Supplier

        </button>

    </div>

    <!-- Table -->

    <div class="bg-white rounded-xl shadow-lg overflow-hidden">

        <table class="w-full">

            <thead>

                <tr class="bg-gray-800 text-white">

                    <th class="p-4">
                        ID
                    </th>

                    <th class="p-4">
                        Nama Supplier
                    </th>

                    <th class="p-4">
                        Alamat
                    </th>

                    <th class="p-4">
                        Telepon
                    </th>

                    <th class="p-4">
                        Aksi
                    </th>

                </tr>

            </thead>

            <tbody>

                <tr
                    v-if="filteredSupplier.length===0">

                    <td
                        colspan="5"
                        class="text-center py-10 text-gray-400">

                        Belum ada data supplier

                    </td>

                </tr>

                <tr
                    v-for="item in filteredSupplier"
                    :key="item.id"
                    class="border-b hover:bg-gray-50">

                    <td class="p-4">
                        {{ item.id }}
                    </td>

                    <td class="p-4 font-medium">
                        {{ item.nama_supplier }}
                    </td>

                    <td class="p-4">
                        {{ item.alamat }}
                    </td>

                    <td class="p-4">

                        <span
                            class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">

                            {{ item.telepon }}

                        </span>

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

    <!-- Modal -->

    <div
        v-if="showModal"
        class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

        <div
            class="bg-white rounded-2xl shadow-2xl w-[600px] p-8">

            <h2 class="text-2xl font-bold mb-6">

                {{ editMode ? '✏️ Edit Supplier' : '🚚 Tambah Supplier' }}

            </h2>

            <input
                v-model="nama_supplier"
                placeholder="Nama Supplier"
                class="border w-full p-3 rounded-xl mb-3">

            <textarea
                v-model="alamat"
                placeholder="Alamat Supplier"
                rows="4"
                class="border w-full p-3 rounded-xl mb-3">
            </textarea>

            <input
                v-model="telepon"
                placeholder="Nomor Telepon"
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

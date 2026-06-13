import axios from "../axios.js";

export default {
  data() {
    return {
      kategori: [],
      keyword: "",

      nama_kategori: "",

      showModal: false,
      editMode: false,
      editId: null,
    };
  },

  computed: {
    filteredKategori() {
      return this.kategori.filter((item) =>
        item.nama_kategori.toLowerCase().includes(this.keyword.toLowerCase()),
      );
    },

    totalKategori() {
      return this.kategori.length;
    },
  },

  mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      const res = await axios.get("/kategori");
      this.kategori = res.data;
    },

    async simpan() {
      try {
        if (this.editMode) {
          await axios.put("/kategori/" + this.editId, {
            nama_kategori: this.nama_kategori,
          });

          Swal.fire("Berhasil", "Kategori berhasil diperbarui", "success");
        } else {
          await axios.post("/kategori", {
            nama_kategori: this.nama_kategori,
          });

          Swal.fire("Berhasil", "Kategori berhasil ditambahkan", "success");
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
      this.nama_kategori = item.nama_kategori;
      this.showModal = true;
    },

    async hapus(id) {
      const result = await Swal.fire({
        title: "Yakin?",
        text: "Kategori akan dihapus",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya Hapus",
      });

      if (!result.isConfirmed) return;

      await axios.delete("/kategori/" + id);

      Swal.fire("Berhasil", "Kategori berhasil dihapus", "success");

      this.loadData();
    },

    resetForm() {
      this.showModal = false;
      this.editMode = false;
      this.editId = null;
      this.nama_kategori = "";
    },
  },

  template: `

<div class="p-6">

    <div class="mb-8">

        <h1 class="text-4xl font-bold text-gray-800">
            🏷️ Manajemen Kategori
        </h1>

        <p class="text-gray-500 mt-2">
            Kelola kategori inventaris barang
        </p>

    </div>

    <!-- Statistik -->

    <div class="bg-white rounded-xl shadow p-6 mb-8">

        <p class="text-gray-500">
            Total Kategori
        </p>

        <h2 class="text-4xl font-bold text-blue-600">
            {{ totalKategori }}
        </h2>

    </div>

    <!-- Toolbar -->

    <div class="flex flex-col md:flex-row justify-between gap-4 mb-6">

        <input
            v-model="keyword"
            placeholder="🔍 Cari kategori..."
            class="border rounded-xl px-4 py-3 w-full md:w-96">

        <button
            @click="showModal=true"
            class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow">

            + Tambah Kategori

        </button>

    </div>

    <!-- Table -->

    <div class="bg-white rounded-xl shadow-lg overflow-hidden">

        <table class="w-full">

            <thead>

                <tr class="bg-gray-800 text-white">

                    <th class="p-4 text-left">
                        ID
                    </th>

                    <th class="p-4 text-left">
                        Nama Kategori
                    </th>

                    <th class="p-4 text-center">
                        Aksi
                    </th>

                </tr>

            </thead>

            <tbody>

                <tr
                    v-if="filteredKategori.length===0">

                    <td
                        colspan="3"
                        class="text-center py-10 text-gray-400">

                        Belum ada data kategori

                    </td>

                </tr>

                <tr
                    v-for="item in filteredKategori"
                    :key="item.id"
                    class="border-b hover:bg-gray-50">

                    <td class="p-4">
                        {{ item.id }}
                    </td>

                    <td class="p-4 font-medium">
                        {{ item.nama_kategori }}
                    </td>

                    <td class="p-4 text-center">

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
            class="bg-white rounded-2xl shadow-2xl w-[500px] p-8">

            <h2 class="text-2xl font-bold mb-6">

                {{ editMode ? '✏️ Edit Kategori' : '🏷️ Tambah Kategori' }}

            </h2>

            <input
                v-model="nama_kategori"
                placeholder="Nama Kategori"
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

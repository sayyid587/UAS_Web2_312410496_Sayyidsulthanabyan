import Home from "./components/Home.js";
import Login from "./components/Login.js";

import Dashboard from "./components/Dashboard.js";
import Barang from "./components/Barang.js";
import Supplier from "./components/Supplier.js";
import Kategori from "./components/Kategori.js";
import Histori from "./components/Histori.js";

import AdminLayout from "./layouts/AdminLayout.js";

const routes = [
  // Public
  {
    path: "/",
    component: Home,
  },

  {
    path: "/login",
    component: Login,
  },

  // Admin Area
  {
    path: "/admin",
    component: AdminLayout,
    meta: {
      requiresAuth: true,
    },

    children: [
      {
        path: "dashboard",
        component: Dashboard,
      },

      {
        path: "barang",
        component: Barang,
      },

      {
        path: "supplier",
        component: Supplier,
      },

      {
        path: "kategori",
        component: Kategori,
      },

      {
        path: "histori",
        component: Histori,
      },
    ],
  },

  // Redirect
  {
    path: "/dashboard",
    redirect: "/admin/dashboard",
  },

  {
    path: "/barang",
    redirect: "/admin/barang",
  },

  {
    path: "/supplier",
    redirect: "/admin/supplier",
  },

  {
    path: "/kategori",
    redirect: "/admin/kategori",
  },

  {
    path: "/histori",
    redirect: "/admin/histori",
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else {
    next();
  }
});

export default router;

import { createRouter, createWebHashHistory } from "vue-router";
// import { useAuthStore } from "../store/storeAuth.js"; // Store di autenticazione
import Signup from "../views/Singup.vue";
import Signin from "../views/Signin.vue";
import PasswordUpdate from "../views/PasswordUpdate.vue";
import PasswordForgot from "../views/PasswordForgot.vue";
import PasswordReset from "../views/PasswordReset.vue";
import autoLogin from "../components/autoLogin.vue";
import ReactivateUser from "../components/ReactivateUser.vue";
import UpdateMe from "../views/UpdateMe.vue";
import AdminDashboard from "../views/Admin_Views/Dashboard.vue";
import AdminProducts from "../views/Admin_Views/Products.vue";
import AdminUsers from "../views/Admin_Views/Users.vue";
import Cart from "../components/Cart.vue";
import OrderSuccess from "../views/OrderSuccess.vue";
// import DashBoard from "../views/DashBoard.vue";
import Home from "../views/Home.vue";
// import About from "../views/About.vue";
import DeleteAccount from "../views/DeleteAccount.vue";
import ProductsCreate from "../views/Admin_Views/ProductsCreate.vue";
import Checkout from "../views/Checkout.vue";
import Dashboard from "../views/Dashboard.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/cart", component: Cart },
  // { path: "/contact", component: Contact },
  // { path: "/about", component: About },
  { path: "/signup", component: Signup },
  { path: "/signin", component: Signin },
  { path: "/password-forgot", component: PasswordForgot },
  { path: "/auto-login", component: autoLogin },
  { path: "/reactivate-user", component: ReactivateUser },
  { path: "/checkout", component: Checkout },
  { path: "/order-success", component: OrderSuccess },
  { path: "/dashboard", component: Dashboard },
  {
    path: "/reset-password",
    name: "reset-password",
    component: PasswordReset,
    props: (route) => ({ token: route.query.token }),
  },

  {
    path: "/settings",
    meta: { requiresAuth: true },
    children: [
      {
        path: "password-update",
        component: PasswordUpdate,
        meta: { requiresAuth: true },
      },
      {
        path: "delete-account",
        component: DeleteAccount,
        meta: { requiresAuth: true },
      },
      {
        path: "update-me",
        component: UpdateMe,
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: "/admin",
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard",
        component: AdminDashboard,
        meta: { requiresAuth: true },
      },
      {
        path: "products",
        component: AdminProducts,
        meta: { requiresAuth: true },
      },
      {
        path: "users",
        component: AdminUsers,
        meta: { requiresAuth: true },
      },
      {
        path: "products-create",
        component: ProductsCreate,
        meta: { requiresAuth: true },
      },
    ],
  },
];
//   {
//     path: "/dashboard",
//     component: DashBoard,
//     meta: { requiresAuth: true },
//     children: [
//       {
//         path: "delete-account",
//         component: DeleteAccount,
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "add-comment",
//         component: AddComment,
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "user-comments",
//         component: UserComments,
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "update-avatar",
//         component: UpdateAvatar,
//         meta: { requiresAuth: true },
//       },
//     ],
//   },
// ];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// // Aggiungi un navigation guard globale
// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore(); // Usa lo store di autenticazione per verificare l'utente

//   // Se la rotta richiede autenticazione
//   if (to.meta.requiresAuth) {
//     if (authStore.user.isLoggedIn) {
//       // Se l'utente è autenticato, permetti l'accesso
//       next();
//     } else {
//       // Se l'utente non è autenticato, reindirizzalo al login
//       next("/signin");
//     }
//   } else {
//     next(); // Altrimenti, permetti l'accesso
//   }
// });

export default router;

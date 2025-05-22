<template>
  <div class="nav-wrapper">
    <ul>
      <li>
        <router-link
          to="/"
          class="link"
          active-class="link--active"
          @click="ui.showNav = false"
        >
          <font-awesome-icon :icon="['fas', 'house']" /> Home
        </router-link>
      </li>
      <li>
        <router-link
          to="/cart"
          class="link"
          active-class="link--active"
          @click="ui.showNav = false"
        >
          <font-awesome-icon :icon="['fas', 'cart-shopping']" /> Carello
          <span v-if="cart.itemCount > 0" class="item-count-badge">
            {{ cart.itemCount }}
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useUIStore } from "../../stores/ui";
import { useCartStore } from "../../stores/storeCart";

const cart = useCartStore();
const ui = useUIStore();
</script>

<style scoped>
.nav-wrapper {
  color: var(--color-gray-light);
  flex-grow: 1;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  /* padding: 0.5rem 1rem; */
  text-decoration: none;
  color: var(--color-gray-light);
  cursor: pointer;
}

.link:hover,
.link:active {
  color: var(--color-primary);
}

.link--active {
  font-weight: var(--fw-bold);
  color: var(--color-primary);
}

.item-count-badge {
  top: -8px;
  right: -8px;
  background-color: var(--clr-error);
  font-size: var(--fs-small);
  color: var(--color-white);
  padding: 10px;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
}
</style>

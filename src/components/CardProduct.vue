<template>
  <div class="product-card">
    <!-- Badge per numero bottiglie -->
    <div class="badge">Cassa da {{ product.packSize }}</div>

    <!-- Immagine -->
    <div class="image-wrapper" @click="mode === 'admin' && editImage()">
      <img
        class="product-image"
        :src="getImageUrl(product.image)"
        alt="Prodotto"
      />
      <div v-if="mode === 'admin'" class="image-hover-badge">
        Clicca per cambiare foto
      </div>
    </div>
    <input
      ref="fileInput"
      type="file"
      @change="onImageSelected"
      accept="image/*"
      style="display: none"
    />

    <!-- Prezzo -->
    <div class="input-wrapper" v-if="mode === 'admin'">
      Prezzo per cassa: <input type="number" v-model="editable.price" />
    </div>
    <div v-else class="price">
      Prezzo: {{ product.price }}€ / cassa da {{ product.packSize }} bottiglie
    </div>

    <!-- Nome -->
    <div class="input-wrapper" v-if="mode === 'admin'">
      Nome: <input v-model="editable.name" />
    </div>
    <h3 v-else class="product-name">
      {{ product.name }} {{ product.format }}
      <span>{{ product.category }}</span>
    </h3>

    <!-- Descrizzione -->
    <div class="input-wrapper" v-if="mode === 'admin'">
      Descrizzione: <input v-model="editable.description" />
    </div>
    <h3 v-else class="product-description">{{ product.description }}</h3>

    <!-- Dettagli quantità -->
    <div class="input-wrapper" v-if="mode === 'admin'">
      Bottiglie per cassa:
      <input type="number" v-model="editable.packSize" />
    </div>

    <!-- Tipo -->
    <div class="input-wrapper" v-if="mode === 'admin'">
      Tipo:
      <label>
        <input type="radio" value="naturale" v-model="editable.category" />
        Naturale
      </label>
      <label>
        <input type="radio" value="frizzante" v-model="editable.category" />
        Frizzante
      </label>
      <label>
        <input type="radio" value="minerale" v-model="editable.category" />
        Minerale
      </label>
    </div>

    <!-- Disponibilita -->
    <div class="input-wrapper" v-if="mode === 'admin'">
      Disponibile:
      <div>
        <label>
          <input type="radio" :value="true" v-model="editable.available" /> Sì
        </label>
        <label>
          <input type="radio" :value="false" v-model="editable.available" /> No
        </label>
      </div>
    </div>

    <!-- Selettore quantità -->
    <div class="quantity-wrapper" v-if="mode === 'view'">
      <p class="quantity-text">CASSE</p>
      <div class="btn-wrapper">
        <button class="btn-quantity" @click="decrease">-</button>
        <p class="quantity">{{ quantity }}</p>
        <button class="btn-quantity" @click="increase">+</button>
      </div>
    </div>

    <!-- Pulsanti -->
    <div class="actions">
      <button
        class="btn-add"
        v-if="mode === 'view'"
        @click="$emit('add-to-cart', quantity)"
      >
        Aggiungi al carrello
      </button>

      <div v-else class="action-btns">
        <button class="btn-add" @click="saveChanges">Salva</button>
        <button class="btn-add" @click="cancelChanges">Annulla</button>
        <button class="btn-add" @click="$emit('delete')">Elimina</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { cloneDeep } from "lodash-es";

const props = defineProps({
  product: Object,
  mode: { type: String, default: "view" }, // 'view' o 'admin'
});

const fileInput = ref(null);
const quantity = ref(1);
const editable = reactive(cloneDeep(props.product));

const increase = () => quantity.value++;
const decrease = () => (quantity.value = Math.max(1, quantity.value - 1));

const editImage = () => {
  fileInput.value?.click();
};

const saveChanges = () => {
  // invia le modifiche al parent
  emit("save", editable);
};

const cancelChanges = () => {
  Object.assign(editable, props.product);
};

const emit = defineEmits(["buy"]);

function handleAdd() {
  emit("add", props.product);
}

function getImageUrl(imagePath) {
  return `http://localhost:3000${imagePath}`;
}

const onImageSelected = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Opzionale: preview immediata
  const reader = new FileReader();
  reader.onload = () => {
    editable.image = reader.result; // preview base64 (opzionale)
  };
  reader.readAsDataURL(file);

  // Invio al backend (esempio con fetch + FormData)
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    editable.image = data.imagePath; // aggiorna il percorso immagine nel prodotto
  } catch (err) {
    console.error("Errore upload immagine:", err);
  }
};

watch(
  () => props.product,
  (newProduct) => {
    editable.value = cloneDeep(newProduct); // o cloneDeep(newProduct)
  }
);
</script>

<style scoped>
.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  max-width: 400px;
  text-align: center;
}
.product-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
}
.product-title {
  font-size: 1.1rem;
  margin: 0.5rem 0;
}
.product-price {
  color: var(--color-dark-light);
  align-self: flex-start;
  font-weight: var(--fw-tiny);
  font-size: var(--fs-medium);
}
.buy-button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.badge {
  position: absolute;
  top: 1.25em;
  left: 0;
  background-color: var(--color-accent);
  color: var(--color-white);
  padding: 0.25em 0.75em;
  font-size: var(--fs-small);
  z-index: 1000;
}

.price {
  align-self: flex-start;
  font-size: var(--fs-body);
  font-weight: var(--fw-tiny);
}

.product-name {
  align-self: flex-start;
  font-size: var(--fs-medium);
  font-weight: var(--fw-tiny);
}

.product-description {
  align-self: flex-start;
  font-size: var(--fs-small);
  font-weight: var(--fw-tiny);
}

.btn-quantity {
  width: 2.2em; /* Larghezza uguale all'altezza */
  height: 2.2em;
  border: none;
  border-radius: 50%; /* Trasforma in cerchio */
  background-color: var(--color-primary);
  color: white;
  border: none;
  display: flex; /* Per centrare contenuto */
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.quantity-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
}

.actions {
  margin-top: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btns {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.quantity-text {
  color: var(--color-primary);
  font-weight: var(--fw-bold);
  font-size: var(--fs-small);
  letter-spacing: 1.7px;
}

.btn-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.quantity {
  width: 3em;
  height: 2.2em;
  border: 1px solid var(--color-primary);
  border-radius: 50px; /* Trasforma in cerchio */
  background-color: inherit;
  color: var(--color-primary);
  display: flex; /* Per centrare contenuto */
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-add {
  border: none;
  border-radius: 50px;
  padding: 1em 1.5em;
  background-color: var(--color-primary);
  color: white;
  border: none;
  display: flex; /* Per centrare contenuto */
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: var(--fs-small);
  font-weight: var(--fw-bold);
  letter-spacing: 1.7px;
  transition: background-color 0.3s;
}

.product-name span {
  font-size: var(--fs-body);
}

.input-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
}

.image-wrapper {
  position: relative;
  cursor: pointer;
}

.image-hover-badge {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.4em 0.8em;
  font-size: 0.75rem;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.image-wrapper:hover .image-hover-badge {
  opacity: 1;
}
</style>

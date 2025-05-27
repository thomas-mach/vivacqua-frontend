<template>
  <div class="product-card">
    <!-- Badge per numero bottiglie -->
    <div class="badge">Cassa da {{ product.packSize }}</div>
    <div v-if="!product.available" class="badge-available">Non disponibile</div>

    <!-- Immagine del prodotto -->
    <div class="image-wrapper" @click="mode === 'admin' && editImage()">
      <img
        class="product-image"
        :src="
          isBase64(editable.image)
            ? editable.image
            : getImageUrl(editable.image || product.image)
        "
        alt="Prodotto"
      />
      <div v-if="mode === 'admin'" class="image-hover-badge">
        Clicca per cambiare foto
      </div>
    </div>
    <!-- Input file nascosto per caricamento immagine -->
    <input
      ref="fileInput"
      type="file"
      @change="onImageSelected"
      accept="image/*"
      style="display: none"
    />

    <!-- Nome -->
    <div class="input-wrapper" v-if="mode === 'admin'">
      <label for="name" class="label-input">Nome: </label>
      <input id="name" type="text" v-model="editable.name" />
    </div>
    <h3 v-else class="product-name">
      {{ product.name }} {{ product.format }}
      <span>{{ product.category }}</span>
    </h3>

    <!-- Prezzo -->
    <div class="input-wrapper" v-if="mode === 'admin'">
      <label for="price" class="label-input">Prezzo per cassa: </label>
      <input id="price" type="number" v-model="editable.price" />
    </div>
    <div v-else class="price">
      Prezzo: {{ product.price }}€ / cassa da {{ product.packSize }} bottiglie
    </div>

    <!-- Descrizione -->
    <div class="input-wrapper" v-if="mode === 'admin'">
      <label for="description" class="label-input">Descrizione </label>
      <textarea id="description" v-model="editable.description" />
    </div>
    <div v-else class="product-description">{{ product.description }}</div>

    <!-- Bottiglie per cassa -->
    <div class="input-wrapper" v-if="mode === 'admin'">
      <label for="size" class="label-input">Bottiglie per cassa: </label>
      <input id="size" type="number" v-model="editable.packSize" />
    </div>

    <!-- Categoria -->
    <div class="input-radio-wrapper" v-if="mode === 'admin'">
      <div>Tipo:</div>
      <div class="wrapper">
        <div class="radio-wrapper">
          <input type="radio" value="naturale" v-model="editable.category" />
          <label>Naturale</label>
        </div>

        <div class="radio-wrapper">
          <input type="radio" value="frizzante" v-model="editable.category" />
          <label>Frizzante</label>
        </div>

        <div class="radio-wrapper">
          <input type="radio" value="minerale" v-model="editable.category" />
          <label>Minerale</label>
        </div>
      </div>
    </div>

    <!-- Disponibilità -->
    <div class="input-radio-wrapper" v-if="mode === 'admin'">
      <div>Disponibile:</div>
      <div class="wrapper">
        <div class="radio-wrapper">
          <input type="radio" :value="true" v-model="editable.available" />
          <label>Si</label>
        </div>

        <div class="radio-wrapper">
          <input type="radio" :value="false" v-model="editable.available" />
          <label>No</label>
        </div>
      </div>
    </div>

    <!-- Attivo -->
    <div class="input-radio-wrapper" v-if="mode === 'admin'">
      <div>Attivo:</div>
      <div class="wrapper">
        <div class="radio-wrapper">
          <input type="radio" :value="true" v-model="editable.active" />
          <label>Si</label>
        </div>

        <div class="radio-wrapper">
          <input type="radio" :value="false" v-model="editable.active" />
          <label>No</label>
        </div>
      </div>
    </div>

    <!-- Selettore quantità (solo in vista) -->
    <div class="quantity-wrapper" v-if="mode === 'view'">
      <p class="quantity-text">CASSE</p>
      <div class="btn-wrapper">
        <button class="btn-quantity" @click="decrease">-</button>
        <p class="quantity">{{ quantity }}</p>
        <button class="btn-quantity" @click="increase">+</button>
      </div>
    </div>

    <!-- Pulsanti di azione -->
    <div class="actions">
      <button class="btn btn-action" v-if="mode === 'view'" @click="addToCart">
        Aggiungi al carrello
      </button>

      <div v-else class="action-btns">
        <button
          class="btn btn-action"
          @click="saveChanges"
          :disabled="!isModified"
        >
          Salva
        </button>
        <button
          class="btn btn-action"
          @click="cancelChanges"
          :disabled="!isModified"
        >
          Annulla
        </button>
        <button class="btn btn-delete" @click="openModal = true">
          Elimina
        </button>
        <ModalConfirm
          v-if="openModal"
          @confirm="
            {
              deleteProduct();
              openModal = false;
            }
          "
          @cancel="openModal = false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from "vue";
import { cloneDeep, isEqual } from "lodash-es";
import { resizeImage } from "../utils/resizeImage";
import ModalConfirm from "../components/Modals/modalConfirm.vue";

// Props ricevute
const props = defineProps({
  product: Object,
  mode: { type: String, default: "view" },
  modelValue: { type: String, default: "" },
});

const emit = defineEmits([
  "update:modelValue",
  "save",
  "delete",
  "add-to-cart",
]);

// --- Stato interno ---
const openModal = ref(false);
const quantity = ref(1);
const fileInput = ref(null);
const editable = reactive(cloneDeep(props.product)); // copia modificabile del prodotto
const previewImage = ref(props.modelValue); // opzionale, se vuoi gestire esternamente l'immagine

// --- Utility ---
function isBase64(str) {
  return typeof str === "string" && str.startsWith("data:image/");
}

function getImageUrl(imagePath) {
  if (!imagePath) return "";

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    console.log(imagePath);
    return imagePath;
  }

  return `http://localhost:3000${imagePath}`;
}

// --- Funzioni ---
function increase() {
  quantity.value++;
}

function decrease() {
  quantity.value = Math.max(1, quantity.value - 1);
}

function editImage() {
  fileInput.value?.click(); // simula click su input file
}

function saveChanges() {
  emit("save", editable); // invia modifiche al parent
}

function deleteProduct() {
  emit("delete", editable); // invia modifiche al parent
}

function cancelChanges() {
  Object.assign(editable, props.product); // ripristina valori originali
}

function addToCart() {
  emit("add-to-cart", props.product, quantity.value);
}

// Gestione immagine caricata
async function onImageSelected(event) {
  const file = event.target.files[0];
  if (!file) return;

  const resized = await resizeImage(file, 1024, 1024); // chiama resize
  editable.image = resized; // preview con immagine ridotta

  // Mostra preview immediata
  // const reader = new FileReader();
  // reader.onload = () => {
  //   editable.image = reader.result;
  // };
  // reader.readAsDataURL(file);

  // Caricamento backend (opzionale)
  // const formData = new FormData();
  // formData.append("image", file);
  // try {
  //   const res = await fetch("http://localhost:3000/api/upload", {
  //     method: "POST",
  //     body: formData,
  //   });
  //   const data = await res.json();
  //   editable.image = data.imagePath;
  // } catch (err) {
  //   console.error("Errore upload:", err);
  // }
}

// --- Watch ---
watch(
  () => props.product,
  (newProduct) => {
    Object.assign(editable, cloneDeep(newProduct));
  }
);

watch(
  () => props.modelValue,
  (newVal) => {
    previewImage.value = newVal;
  }
);
// --- Computed ---
const isModified = computed(() => {
  return !isEqual(editable, props.product);
});
</script>

<style scoped>
.test {
  background-color: red;
}

.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-gray-mid);
  border-radius: 8px;
  padding: 1rem;
  width: 400px;
  text-align: center;
}
.product-image {
  max-height: 100%;
  max-width: 100%;
  object-fit: cover; /* o "cover" se vuoi che riempia tutto */
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

.badge-available {
  position: absolute;
  top: 1.25em;
  right: 0;
  background-color: var(--clr-error);
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
  height: 80px;
  overflow-y: auto;
  align-self: flex-start;
  font-size: var(--fs-small);
  font-weight: var(--fw-tiny);
  text-align: left;
  margin: 1em 0 1em;
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

.btn {
  border: none;
  border-radius: 50px;
  padding: 1em 1.5em;
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

.btn-action {
  background-color: var(--color-primary);
  color: white;
}

.btn-delete {
  background-color: var(--clr-error);
  color: white;
}

.btn-action:hover,
.btn-action:active {
  background-color: var(--color-primary);
  box-shadow: 0 0 20px #13dbf6;
}

.btn-delete:hover,
.btn-delete:active {
  background-color: var(--clr-error);
  box-shadow: 0 0 20px #ff2a2a;
}

.product-name span {
  font-size: var(--fs-body);
}

button:disabled {
  background-color: var(--color-gray);
  cursor: not-allowed;
  opacity: 0.7;
}

button:disabled:hover {
  background-color: var(--color-gray);
  cursor: not-allowed;
  opacity: 0.7;
  box-shadow: 0 0 20px var(--color-white);
}

input-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
}

.image-wrapper {
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 400px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-bottom: 1em;
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

.input-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

input,
textarea {
  width: 100%;
  padding: 1em 1em 1em 2em;
  margin-bottom: 1em;
  border: none;
  border-radius: 50px;
  color: var(--color-gray);
  letter-spacing: 1.3px;
  border: 1px solid var(--color-gray);
  font-size: var(--fs-body);
  resize: none;
}

.label-input {
  font-size: var(--fs-small);
  position: absolute;
  background-color: var(--color-white);
  right: 30px;
  top: -9px;
  padding: 0 0.5em;
}

.input-radio-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
}

.radio-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2em;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  gap: 1em;
}

input[type="radio"] {
  margin: 0;
}
</style>

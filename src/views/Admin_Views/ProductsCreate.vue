<template>
  <form novalidate @submit.prevent="hendleCreateProduct">
    <div class="container">
      <div class="product-card">
        <div class="message-placeholder">
          <p class="error-generic-message" v-if="errorMessage">
            {{ errorMessage }}
          </p>
        </div>
        <div class="preview-img-wrapper">
          <img class="preview-img" :src="previewImage" alt="" />
        </div>

        <div class="inputs-wrapper">
          <!-- Nome -->
          <div class="input-wrapper">
            <label
              for="name"
              class="label-input"
              :class="{
                'error-label': getError('name'),
              }"
              >Nome:
            </label>
            <input
              id="name"
              class="input"
              :class="{
                'error-input': getError('name'),
              }"
              type="text"
              v-model="name"
            />
          </div>
          <div class="error-message-placeholder">
            <p class="error-message" v-if="getError('name')">
              {{ getError("name") }}
            </p>
          </div>

          <!-- Prezzo -->
          <div class="input-wrapper">
            <label
              for="price"
              class="label-input"
              :class="{
                'error-label': getError('price'),
              }"
              >Prezzo per cassa:
            </label>
            <input
              id="price"
              class="input"
              :class="{
                'error-input': getError('price'),
              }"
              type="number"
              v-model="price"
            />
          </div>
          <div class="error-message-placeholder">
            <p class="error-message" v-if="getError('price')">
              {{ getError("price") }}
            </p>
          </div>

          <!-- Descrizione -->
          <div class="input-wrapper">
            <label
              for="description"
              class="label-input"
              :class="{
                'error-label': getError('description'),
              }"
              >Descrizione
            </label>
            <textarea
              id="description"
              :class="{
                'error-input': getError('description'),
              }"
              v-model="description"
            />
          </div>
          <div class="error-message-placeholder">
            <p class="error-message" v-if="getError('description')">
              {{ getError("description") }}
            </p>
          </div>

          <!-- Bottiglie per cassa -->
          <div class="input-wrapper">
            <label
              for="size"
              class="label-input"
              :class="{
                'error-label': getError('packSize'),
              }"
              >Bottiglie per cassa:
            </label>
            <input
              id="size"
              class="input"
              :class="{
                'error-input': getError('packSize'),
              }"
              type="number"
              v-model="packSize"
            />
          </div>
          <div class="error-message-placeholder">
            <p class="error-message" v-if="getError('packSize')">
              {{ getError("packSize") }}
            </p>
          </div>

          <!-- Immagine -->
          <div class="input-wrapper">
            <label
              for="image"
              class="label-input"
              :class="{
                'error-label': getError('image'),
              }"
              >Immagine:
            </label>
            <input
              id="image"
              class="input"
              :class="{
                'error-input': getError('image'),
              }"
              ref="fileInput"
              type="file"
              @change="onImageSelected"
              accept="image/*"
            />
          </div>
          <div class="error-message-placeholder">
            <p class="error-message" v-if="getError('image')">
              {{ getError("image") }}
            </p>
          </div>

          <!-- Categoria -->
          <div class="input-wrapper margin">
            <div class="label-input">Tipo:</div>
            <div class="wrapper">
              <div class="radio-wrapper">
                <input type="radio" value="naturale" v-model="category" />
                <label>Naturale</label>
              </div>

              <div class="radio-wrapper">
                <input type="radio" value="frizzante" v-model="category" />
                <label>Frizzante</label>
              </div>

              <div class="radio-wrapper">
                <input type="radio" value="minerale" v-model="category" />
                <label>Minerale</label>
              </div>
            </div>
          </div>

          <!-- Disponibilità -->
          <div class="input-wrapper margin">
            <div class="label-input">Disponibile:</div>
            <div class="wrapper">
              <div class="radio-wrapper">
                <input type="radio" :value="true" v-model="available" />
                <label>Si</label>
              </div>

              <div class="radio-wrapper">
                <input type="radio" :value="false" v-model="available" />
                <label>No</label>
              </div>
            </div>
          </div>

          <!-- Attivo -->
          <div class="input-wrapper margin">
            <div class="label-input">Attivo:</div>
            <div class="wrapper">
              <div class="radio-wrapper">
                <input type="radio" :value="true" v-model="active" />
                <label>Si</label>
              </div>

              <div class="radio-wrapper">
                <input type="radio" :value="false" v-model="active" />
                <label>No</label>
              </div>
            </div>
          </div>
        </div>
        <!-- Pulsanti di azione -->
        <button
          class="btn"
          v-if="mode === 'view'"
          @click="$emit('add-to-cart', quantity)"
        >
          Salva
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { cloneDeep } from "lodash-es";
import { resizeImage } from "../../utils/resizeImage";
import { createProduct } from "../../api/productService";
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { useRouter } from "vue-router";
import { useUIStore } from "../../stores/ui.js";

const ui = useUIStore();

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
const router = useRouter();
const toast = useToast();
const name = ref("");
const price = ref("");
const description = ref("");
const packSize = ref("");
const category = ref("naturale");
const available = ref(true);
const active = ref(true);
const quantity = ref("");
const fileInput = ref(null);
let previewImage = ref("../../public/placeholder-image.jpg");
const imageFile = ref(null);
let errorsBackend = ref([]);
let errorMessage = ref("");

// --- Utility ---
function isBase64(str) {
  return typeof str === "string" && str.startsWith("data:image/");
}

function getImageUrl(imagePath) {
  return `http://localhost:3000${imagePath}`;
}

// --- Funzioni ---

function editImage() {
  fileInput.value?.click(); // simula click su input file
}

const getError = (field) => {
  const errorObj = errorsBackend.value.find((error) => error.field === field);
  return errorObj ? errorObj.message : null;
};

// Gestione immagine caricata
async function onImageSelected(event) {
  const file = event.target.files[0];
  if (!file) return;

  imageFile.value = file;

  const resized = await resizeImage(file, 1024, 1024); // chiama resize
  previewImage.value = resized; // preview con immagine ridotta
}

const hendleCreateProduct = async () => {
  try {
    ui.isLoading = true;
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("price", price.value);
    formData.append("description", description.value);
    formData.append("packSize", packSize.value);
    formData.append("category", category.value);
    formData.append("available", available.value);
    formData.append("active", active.value);
    formData.append("quantity", quantity.value);
    if (imageFile.value) {
      formData.append("image", imageFile.value);
    }

    const response = await createProduct(formData);
    toast.success("Prodotto creato.", { timeout: 2000 });
    router.push("/admin/products");
  } catch (error) {
    console.log(error);
    errorMessage.value = error.response.data.message;
    if (error.response?.data?.errors) {
      errorsBackend.value = error.response.data.errors;
      console.log("Errors backend value:", errorsBackend.value);
    } else {
      errorsBackend.value = [{ field: "general", message: "Error" }];
    }
  } finally {
    ui.isLoading = false;
  }
};

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
</script>

<style scoped>
/* === Layout & Structure === */
.container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.product-card {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "placeholder"
    "preview"
    "inputs"
    "btn";
  border: 1px solid var(--color-gray);
  border-radius: 8px;
  padding: 1rem;
  width: 100%;
  max-width: 800px;
  text-align: center;
}

.inputs-wrapper,
.preview-img-wrapper,
.input-wrapper,
.input-file {
  width: 100%;
  max-width: 100%;
}

.preview-img-wrapper {
  margin-bottom: 1em;
  grid-area: preview;
}

.preview-img {
  display: block;
  max-width: 100%;
  width: 100%;
  height: auto;
  object-fit: contain;
}

@media (min-width: 1100px) {
  .product-card {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "preview inputs"
      "preview inputs"
      "btn btn";
    column-gap: 1em;
  }
}

/* === Form Elements === */
.input-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  grid-area: inputs;
}

.input,
textarea {
  width: 100%;
  padding: 1em 1em 1em 2em;
  border: 1px solid var(--color-gray);
  border-radius: 50px;
  color: var(--color-gray);
  font-size: var(--fs-body);
  letter-spacing: 1.3px;
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

.wrapper {
  border: 1px solid black;
  padding: 1em 0;
  display: flex;
  gap: 1em;
  width: 100%;
}

/* === Buttons === */
.btn {
  width: 100%;
  max-width: 100%;
  border: none;
  border-radius: 50px;
  padding: 1em 1.5em;
  background-color: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: var(--fs-body);
  font-weight: var(--fw-bold);
  letter-spacing: 1.7px;
  transition: background-color 0.3s;
  grid-area: btn;
}

.btn:hover,
.btn:active {
  background-color: var(--color-primary);
  box-shadow: 0 0 20px #13dbf6;
}

/* === Radio Buttons === */
.input-radio-wrapper,
.radio-wrapper {
  width: 100%;
  max-width: 100%;
  display: flex;
  align-items: center;
}

.radio-wrapper {
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.2em;
}

input[type="radio"] {
  margin: 0;
}

/* === Image Upload === */
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

/* === Typography & Labels === */
.product-name,
.product-description,
.product-price {
  align-self: flex-start;
  font-weight: var(--fw-tiny);
}

.product-name {
  font-size: var(--fs-medium);
}

.product-description {
  font-size: var(--fs-small);
}

.product-price {
  color: var(--color-dark-light);
  font-size: var(--fs-medium);
}

.product-title {
  font-size: 1.1rem;
  margin: 0.5rem 0;
}

/* === Utility Classes === */
.margin {
  margin-bottom: 1em;
}

.price,
.product-name span {
  font-size: var(--fs-body);
}

/* === Quantity & Actions === */
.quantity-wrapper,
.btn-wrapper,
.actions,
.action-btns {
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-wrapper {
  flex-direction: column;
  gap: 0.5em;
}

.quantity {
  width: 3em;
  height: 2.2em;
  border: 1px solid var(--color-primary);
  border-radius: 50px;
  background-color: inherit;
  color: var(--color-primary);
  display: flex;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.quantity-text {
  color: var(--color-primary);
  font-weight: var(--fw-bold);
  font-size: var(--fs-small);
  letter-spacing: 1.7px;
}

.action-btns {
  width: 100%;
  justify-content: space-around;
}

/* === Error Handling === */
.error-input {
  border: 1px solid var(--clr-error);
}

.error-label {
  color: var(--clr-error);
}

.error-message {
  color: var(--clr-error);
  text-align: right;
  font-size: var(--fs-small);
  font-weight: var(--fw-bold);
}

.error-message-placeholder {
  height: var(--fs-small);
  margin: 0.25em 0 0.9em;
}

.error-generic-message {
  font-size: var(--fs-body);
  color: var(--clr-error);
  font-weight: var(--fw-bold);
  text-align: left;
  margin-bottom: 0.5em;
}

.message-placeholder {
  grid-area: "placeholder";
  min-height: var(--fs-body);
  margin: 0.5em 0 0.5em;
  color: var(--clr-error);
}

/* === Misc === */
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

.product-image {
  max-height: 100%;
  max-width: 100%;
  object-fit: cover;
  border-radius: 4px;
}
</style>

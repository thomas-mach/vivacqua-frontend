<template>
  <div class="modal-backdrop">
    <div class="modal-content">
      <h2 class="title">Dettagli utente</h2>

      <div class="user-meta">
        <p><strong>ID utente:</strong> {{ editableUser._id }}</p>

        <p>
          <strong>Ultimo login:</strong>
          {{
            editableUser.lastLogin
              ? new Date(editableUser.lastLogin).toLocaleDateString("it-IT")
              : "-"
          }}
        </p>

        <p>
          <strong>Disattivato il:</strong>
          {{
            editableUser.deactivateAt
              ? new Date(editableUser.deactivateAt).toLocaleDateString("it-IT")
              : "-"
          }}
        </p>

        <p>
          <strong>Data creazione:</strong>
          {{
            editableUser.createdAt
              ? new Date(editableUser.createdAt).toLocaleDateString("it-IT")
              : "-"
          }}
        </p>

        <p>
          <strong>Ultima modifica:</strong>
          {{
            editableUser.updatedAt
              ? new Date(editableUser.updatedAt).toLocaleDateString("it-IT")
              : "-"
          }}
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="user-form">
        <fieldset>
          <legend>Dati personali</legend>

          <label for="name">Nome</label>
          <input id="name" v-model="editableUser.name" />

          <label for="surname">Cognome</label>
          <input id="surname" v-model="editableUser.surname" />

          <label for="email">Email</label>
          <input id="email" v-model="editableUser.email" />

          <label for="role">Ruolo</label>
          <input id="role" v-model="editableUser.role" />
        </fieldset>

        <fieldset>
          <legend>Stato attivo</legend>
          <label>
            <input type="radio" value="true" v-model="isActiveString" />
            Attivo
          </label>
          <label>
            <input type="radio" value="false" v-model="isActiveString" />
            Non attivo
          </label>
        </fieldset>

        <fieldset>
          <legend>Indirizzo</legend>

          <label for="street">Via</label>
          <input id="street" v-model="editableUser.address.street" />

          <label for="houseNumber">Numero civico</label>
          <input id="houseNumber" v-model="editableUser.address.houseNumber" />

          <label for="city">Città</label>
          <input id="city" v-model="editableUser.address.city" />

          <label for="postalCode">CAP</label>
          <input id="postalCode" v-model="editableUser.address.postalCode" />

          <label for="doorbell">Campanello</label>
          <input id="doorbell" v-model="editableUser.address.doorbell" />
        </fieldset>

        <div class="form-actions">
          <button class="btn-save" type="submit">Salva</button>
          <button class="btn-close" type="button" @click="$emit('onClose')">
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, toRaw } from "vue";
import { cloneDeep } from "lodash-es";

const props = defineProps({
  user: Object,
});

const emit = defineEmits(["onSave", "onClose"]);

const editableUser = ref({});

const isActiveString = ref(props.user.isActive.toString());

watch(
  () => props.user,
  (newUser) => {
    editableUser.value = cloneDeep(toRaw(newUser));
  },
  { immediate: true }
);

function handleSubmit() {
  emit("onSave", editableUser.value);
}
</script>

<style>
.title {
  text-align: center;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal-content {
  position: relative;
  background: var(--color-white);
  padding: 1em;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

form {
  display: flex;
  flex-direction: column;
}

fieldset {
  display: flex;
  flex-direction: column;
}

.btn-close {
  background-color: inherit;
  padding: 0.2em;
  border: none;
  font-size: 25px;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
}

.btn-save {
  width: 100%;
  color: var(--color-white);
  background-color: var(--color-accent);
  border: none;
  border-radius: 50px;
  padding: 0.5em 2em;
  font-size: var(--fs-body);
  margin-top: 0.5em;
  cursor: pointer;
}

.btn-save:hover,
.btn-save:active {
  background-color: var(--color-accent);
  box-shadow: 0 0 20px #00589b;
}

input {
  padding: 0.5em;
}

label {
  font-size: var(--fs-small);
  font-weight: var(--fw-bold);
}
</style>

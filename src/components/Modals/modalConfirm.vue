<template>
  <div class="overlay" @click.self="$emit('cancel')">
    <div class="modal">
      <h3>Conferma eliminazione</h3>
      <p>Sei sicuro di voler eliminare questo prodotto?</p>
      <div class="actions">
        <button class="btn btn-cancel" @click="$emit('cancel')">Annulla</button>
        <button class="btn btn-delete" @click="$emit('confirm')">
          Elimina
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(["confirm", "cancel"]);
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal {
  background: white;
  padding: 2em;
  border-radius: 12px;
  min-width: 300px;
  max-width: 90%;
  text-align: center;
}

.actions {
  margin-top: 1.5em;
  display: flex;
  justify-content: space-around;
  gap: 1em;
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

.btn-cancel {
  background-color: var(--color-primary);
  color: white;
}

.btn-delete {
  background-color: var(--clr-error);
  color: white;
}

.btn-cancel:hover,
.btn-cancel:active {
  background-color: var(--color-primary);
  box-shadow: 0 0 20px #13dbf6;
}

.btn-delete:hover,
.btn-delete:active {
  background-color: var(--clr-error);
  box-shadow: 0 0 20px #ff2a2a;
}
</style>

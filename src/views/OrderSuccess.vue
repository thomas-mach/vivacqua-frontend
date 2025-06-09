<template>
  <div class="success">
    <h1>Grazie per il tuo ordine! 🎉</h1>
    <p>Il tuo pagamento è andato a buon fine.</p>
    <p>Ti abbiamo inviato un'email di conferma.</p>
    <router-link class="link" to="/">← Torna alla Home</router-link>
  </div>
</template>

<style scoped>
.success {
  text-align: center;
  margin-top: 50px;
}

p {
  margin-bottom: 2em;
}

.link {
  text-decoration: none;
}
</style>

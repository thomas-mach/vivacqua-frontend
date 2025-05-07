<template>
  <div class="card">
    <div class="card-title">
      <slot name="title"></slot>
    </div>
    <div class="card-message">
      <slot name="message"></slot>
    </div>
    <div class="card-form">
      <slot name="form"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.card {
  background-color: inherit;
  color: var(--color-gray);
  width: 100%;
  /* max-width: 600px; */
  /* border: 1px solid grey; */
  border-radius: 20px;
  padding: 1.25em;
  /* margin-top: 2em; */
  display: flex;
  flex-direction: column;
  /* box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1); */
  overflow: auto;
}

.card-title {
  font-size: var(--fs-h2);
  font-weight: var(--fw-bold);
  text-align: center;
}

.card-message {
  font-size: var(--fs-body);
  color: var(--clr-dark-light);
}

@media (min-width: 768px) {
  .card {
    margin-top: 2em;
  }
}
</style>

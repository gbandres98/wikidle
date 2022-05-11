<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content"
  >
    <button class="modal__close" @click="close">
      <font-awesome-icon icon="x" />
    </button>
    <span class="modal__title">Wikidle</span>
    <div class="modal__content">
      <p>
        Hola! Wikidle es un juego basado en el que tienes que adivinar qué
        articulo de la Wikipedia estás "leyendo".
      </p>
      <p>
        Escribe una palabra para ver si existe en el artículo. Escribe el título
        del artículo para ganar.
      </p>
      <p>
        Los artículos son aleatorios, extraídos de la lista de los
        <a
          href="https://en.wikipedia.org/wiki/Wikipedia:Vital_articles/Level/4"
          target="_blank"
          >10.000 artículos esenciales de Wikipedia</a
        >.
      </p>
      <p class="author">
        Basado en
        <a href="http://redactle.com" target="_blank">redactle.com</a> y
        desarrollado por
        <a href="https://www.linkedin.com/in/gbandres/" target="_blank"
          >Guillermo Bandrés</a
        >.
      </p>
      <p>
        Puedes contactar conmigo para cualquier cosa en
        <a href="mailto:wikidle@gbandres.com" target="_blank"
          >wikidle@gbandres.com</a
        >
      </p>
    </div>
  </vue-final-modal>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<style scoped>
::v-deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.2rem;
}
</style>

<style scoped>
.dark-mode div::v-deep(.modal-content) {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>

<style scoped>
.author {
  margin-top: 4rem;
}
</style>

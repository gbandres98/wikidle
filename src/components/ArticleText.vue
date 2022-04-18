<template>
  <div v-html="articleHtml" class="articleText"></div>
</template>

<script>
export default {
  name: "ArticleText",
  props: {
    article: Object,
    words: Array,
  },
  data: function () {
    return {
      articleHtml: "",
    };
  },
  watch: {
    words: {
      immediate: true,
      handler() {
        this.articleHtml = this.article.innerHTML;
      },
      deep: true,
    },
  },
};
</script>

<style>
@import url("http://fonts.cdnfonts.com/css/linux-libertine");

.articleText {
  font-family: sans-serif;
  font-size: 1em;
  line-height: 1.6;
  white-space: pre-line;
  margin: 8px;
  padding-bottom: 25vh;
}

.article-h1,
.article-h2 {
  font-family: "Linux Libertine", Georgia, Times, serif;
  border-bottom: 1px solid rgb(162, 169, 177);
}

.article-h2,
.article-h3,
.article-h4 {
  margin: 0;
}

.article-h3,
.article-h4 {
  font-weight: 700;
}

.article-h1 {
  margin-bottom: 0.5em;
  font-size: 2.5em;
}

.word {
  transition: 0.25s;
}

.glow {
  text-shadow: 0px 0px 5px green;
}

.highlight {
  background-color: yellow;
}
</style>

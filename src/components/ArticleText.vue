<template>
  <Loading :show="!articleHtml" />
  <div v-html="articleHtml" class="articleText"></div>
</template>

<script>
import Loading from "@/components/Loading.vue";

export default {
  name: "ArticleText",
  components: { Loading },
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
@import url("https://fonts.cdnfonts.com/css/linux-libertine");

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
  margin: 10px 0 0 0;
}

.article-h3,
.article-h4 {
  font-weight: 700;
}

.article-h1 {
  margin-bottom: 0.5em;
  font-size: 2.5em;
}

.glow {
  text-shadow: 0px 0px 5px green;
}

.highlight {
  background-color: yellow;
}
</style>

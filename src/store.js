import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      finished: false,
      articleDay: "",
      guessNumber: 1,
      articleId: "",
    };
  },
  mutations: {
    setFinished(state, finished) {
      state.finished = finished;
    },
    setArticleDay(state, day) {
      state.articleDay = day;
    },
    incrementGuessNumber(state) {
      state.guessNumber++;
    },
    setArticleId(state, id) {
      state.articleId = id;
    },
  },
});

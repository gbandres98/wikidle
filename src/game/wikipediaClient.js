import { getDailyArticle } from "./client";
import store from "@/store";

const getArticle = async () => {
  const dailyArticle = await getDailyArticle();

  const response = await fetch(
    "https://es.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&explaintext&format=json&titles=" +
      dailyArticle.title
  );

  if (!response.ok) throw Error("Error descargando artículo");

  store.commit("setArticleId", dailyArticle.title);

  const responseData = await response.json();
  const pageId = Object.keys(responseData.query.pages)[0];
  const article = responseData.query.pages[pageId];
  article.day = dailyArticle.day;

  return article;
};

export { getArticle };

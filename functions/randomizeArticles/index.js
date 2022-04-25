import firebase from "firebase-admin";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

firebase.initializeApp();

const articleIDFromDate = (date) =>
  `/articles/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

const dayHasArticle = async (date) => {
  const articleRef = firebase.firestore().doc(articleIDFromDate(date));
  const doc = await articleRef.get();
  return doc.exists;
};

const saveRandomArticle = async (date) => {
  const articleListPage = await fetch(
    "https://meta.wikimedia.org/wiki/List_of_articles_every_Wikipedia_should_have/Expanded"
  ).then((res) => res.text());

  const articleListDom = new JSDOM(articleListPage);

  const query = articleListDom.window.document.querySelectorAll("a");
  const wikidataLinks = Array.from(query).filter((link) =>
    link.href.includes("https://www.wikidata.org/wiki/")
  );

  const index = (Math.random() * wikidataLinks.length) | 0;

  const randomLink = wikidataLinks[index];

  const articleDataPage = await fetch(randomLink).then((res) => res.text());

  const dom1 = new JSDOM(articleDataPage);

  const links = Array.from(dom1.window.document.querySelectorAll("a"));
  const link = links.find((l) =>
    l.href.includes("https://es.wikipedia.org/wiki/")
  );

  const title = link.title.replaceAll(" ", "_");

  const article = {
    title: title,
    day: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
  };

  const articleRef = firebase.firestore().doc(articleIDFromDate(date));
  await articleRef.set(article);

  console.log(article.day);
};

const date = new Date();

for (let i = 0; i < 10; i++) {
  const dateCopy = new Date(date.getTime());
  const articleExists = await dayHasArticle(dateCopy);

  if (!articleExists) {
    saveRandomArticle(dateCopy);
  }

  date.setDate(date.getDate() + 1);
}

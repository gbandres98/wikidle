import { http } from "@google-cloud/functions-framework";
import firebase from "firebase-admin";

firebase.initializeApp();

http("getArticle", (req, res) => {
  console.log("start");

  const date = new Date();

  console.log(
    `/articles/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  );

  const articleRef = firebase
    .firestore()
    .doc(
      `/articles/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    );

  articleRef.get().then((article) => res.send(JSON.stringify(article.data())));
});

import { http } from "@google-cloud/functions-framework";
import firebase from "firebase-admin";

firebase.initializeApp();

http("getArticle", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
    return;
  }

  const date = new Date();

  const articleRef = firebase
    .firestore()
    .doc(
      `/articles/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    );

  articleRef.get().then((article) => res.send(JSON.stringify(article.data())));
});

import { http } from "@google-cloud/functions-framework";
import firebase from "firebase-admin";
// import functions from "firebase-functions";

firebase.initializeApp();

const statsIDFromDay = (date, userId) => {
  const [year, month, day] = date.split("-");
  return `/stats/games/${year}/${month}/${day}/${userId}`;
};

http("saveStats", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
    return;
  }

  const { user, game } = req.body;
  const docPath = statsIDFromDay(game.day, user.id);

  const doc = await firebase.firestore().doc(docPath).get();

  if (doc.exists && doc.data().game.timestamp > game.timestamp) {
    res.status(202).send();
    return;
  }

  doc.ref.set({ user, game });

  res.status(201).send();
});

// const onStatCreate = functions.firestore.document(
//   "/stats/games/{year}/{month}/{day}/{userId}"
// );

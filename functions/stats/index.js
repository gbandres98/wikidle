import { FieldValue } from "@google-cloud/firestore";
import { http } from "@google-cloud/functions-framework";
import firebase from "firebase-admin";

firebase.initializeApp();

const statsIDFromDay = (date, userId) => {
  const [year, month, day] = date.split("-");
  return `/stats/games/${year}/${month}/${day}/${userId}`;
};

http("saveStats", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
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

const statResumeFromDay = (date) => {
  const [year, month, day] = date.split("-");
  return `/stats/games/${year}/${month}/${day}/resume`;
};

const checkOrCreateStatResume = async (date) => {
  const id = statResumeFromDay(date);

  const doc = await firebase.firestore().doc(id).get();

  if (doc.exists) return;

  return await doc.ref.set({
    games: 0,
    wins: 0,
    guesses: 0,
    average: 0.0,
  });
};

const increaseGames = async (date) => {
  const id = statResumeFromDay(date);

  const doc = await firebase.firestore().doc(id);

  doc.update({
    games: FieldValue.increment(1),
  });
};

const increaseWins = async (date) => {
  const id = statResumeFromDay(date);

  const doc = await firebase.firestore().doc(id);

  return doc.update({
    wins: FieldValue.increment(1),
  });
};

const increaseGuesses = async (date, count) => {
  const id = statResumeFromDay(date);

  const doc = await firebase.firestore().doc(id);

  count = parseInt(count);

  return doc.update({
    guesses: FieldValue.increment(count),
  });
};

const calculateAverage = async (date) => {
  const id = statResumeFromDay(date);

  const doc = await firebase.firestore().doc(id);

  const { wins, guesses } = (await doc.get()).data();

  return doc.update({
    average: guesses / wins,
  });
};

const onStatCreate = async (event, context) => {
  const newGame = event.value.fields.game.mapValue.fields;

  if (context.params.userId === "resume") return;

  console.log("guesses");
  console.log(newGame.guessNumber.integerValue);

  const day = newGame.day.stringValue;
  if (!day) return;

  await checkOrCreateStatResume(day);

  // New Game
  if (!event.oldValue || !event.oldValue.fields) {
    increaseGames(day);
    return;
  }

  const oldGame = event.oldValue.fields.game.mapValue.fields;

  // // Won game
  if (!oldGame.finished.booleanValue && newGame.finished.booleanValue) {
    await increaseWins(day);
    await increaseGuesses(day, newGame.guessNumber.integerValue);
    calculateAverage(day);
  }
};

export { onStatCreate };

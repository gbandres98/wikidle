import { v4 as uuidv4 } from "uuid";
import { postData } from "./client";

const generateUserInfo = async () => {
  const id = uuidv4();
  let ipData = {};

  try {
    const res = await fetch("https://ipinfo.io/json?token=99dd0e21f00142");

    if (res.ok) {
      const data = await res.json();

      if (data) ipData = data;
    }
    // eslint-disable-next-line
  } catch {}

  return {
    id,
    ipData,
  };
};

const saveLocalData = async (day, guesses, guessNumber, finished) => {
  const gameData = {
    day,
    guesses,
    guessNumber: guessNumber,
    finished,
  };

  const dataJson = localStorage.getItem("localData");

  let data = JSON.parse(dataJson);

  if (!data) {
    const user = await generateUserInfo();
    data = {
      user,
      games: {},
    };
  }

  data.games[day] = gameData;

  localStorage.setItem("localData", JSON.stringify(data));
  postData(gameData);
};

const loadLocalGameData = (day) => {
  const dataJson = localStorage.getItem("localData");
  const data = JSON.parse(dataJson);

  if (data && data.games) return data.games[day];
};

export { saveLocalData, loadLocalGameData };

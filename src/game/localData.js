import { v4 as uuidv4 } from "uuid";

const generateUserInfo = async () => {
  const id = uuidv4();
  let country = "unknown";

  try {
    const res = await fetch("https://ip-api.com/json");

    if (res.ok) {
      const ipData = await res.json();

      if (ipData.country) country = ipData.country;
    }
    // eslint-disable-next-line
  } catch {}

  return {
    id,
    country,
  };
};

const saveLocalData = async (date, guesses, guessNumber, finished) => {
  const gameData = {
    date,
    guesses,
    guessNumber: guessNumber - 1,
    finished,
  };

  const dataJson = localStorage.getItem("localData");

  let data = JSON.parse(dataJson);

  if (!data) {
    const user = await generateUserInfo();
    data = {
      user,
      games: [],
    };
  }

  data.games = [gameData]; // TODO

  localStorage.setItem("localData", JSON.stringify(data));
};

const loadLocalGameData = () => {
  const dataJson = localStorage.getItem("localData");
  const data = JSON.parse(dataJson);

  if (data && data.games.length > 0) return data.games.at(-1);
};

export { saveLocalData, loadLocalGameData };

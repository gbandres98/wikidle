const getDailyArticle = async () => {
  const res = await fetch(
    "https://europe-west3-wikidle.cloudfunctions.net/getArticle"
  );

  if (res.ok) return await res.json();

  console.log(res);

  const d = new Date();

  return {
    title: "Error_de_software",
    date: `${d.getFullYear}-${d.getMonth + 1}-${d.getDate}`,
  };
};

const postData = async (game) => {
  const dataJson = localStorage.getItem("localData");
  const data = JSON.parse(dataJson);

  game.timestamp = Date.now();

  const req = {
    user: data.user,
    game: game,
  };

  fetch("https://europe-west3-wikidle.cloudfunctions.net/saveStats", {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { getDailyArticle, postData };

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

export { getDailyArticle };

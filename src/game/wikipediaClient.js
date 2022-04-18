const getArticle = async (articleName) => {
  const response = await fetch(
    "https://es.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&explaintext&format=json&titles=" +
      articleName
  );

  if (!response.ok) throw Error("Error descargando artículo");

  const responseData = await response.json();
  const pageId = Object.keys(responseData.query.pages)[0];

  return responseData.query.pages[pageId];
};

export { getArticle };

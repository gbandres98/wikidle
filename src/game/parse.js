const parseArticle = (article) => {
  const articleTitle = '<h1 class="article-h1">' + article.title + "</h1> ";
  let articleText = articleTitle + article.extract;

  articleText = articleText.replace(/\[\S+\]/g, "");

  articleText = articleText.replace(/{[^{}]+}/g, "");

  articleText = articleText.replace(/\n\s*\n/g, "\n");

  articleText = replaceTitles(articleText);

  const parser = new DOMParser();
  const document = parser.parseFromString(articleText, "text/html");

  const articleDOM = createElements(document.body);

  return articleDOM;
};

const replaceTitles = (articleText) => {
  articleText = articleText.replace(
    /====([^=]+)====/g,
    '<h4 class="article-h4">$1</h4>'
  );
  articleText = articleText.replace(
    /===([^=]+)===/g,
    '<h3 class="article-h3">$1</h3>'
  );
  articleText = articleText.replace(
    /==([^=]+)==/g,
    '<h2 class="article-h2">$1</h2>'
  );

  return articleText;
};

const createElements = (articleDOM) => {
  articleDOM.childNodes.forEach((node) => {
    if (node.nodeType == 1) {
      node.innerHTML = node.innerHTML.replace(
        /([a-zA-Z0-9áÁéÉíÍóÓúÚñÑäÄëËïÏöÖüÜçÇ]+)/g,
        '<span class="word">$1</span>'
      );
    }
    if (node.nodeType == 3) {
      const newNode = document.createElement("span");
      newNode.classList.add("paragraph");
      newNode.innerHTML = node.nodeValue.replace(
        /([a-zA-Z0-9áÁéÉíÍóÓúÚñÑäÄëËïÏöÖüÜçÇ]+)/g,
        '<span class="word">$1</span>'
      );

      node.parentNode.insertBefore(newNode, node);
      node.parentNode.removeChild(node);
    }
  });

  return articleDOM;
};

export { parseArticle };

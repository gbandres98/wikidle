import { normalize } from "@/game/words";
import commonWords from "@/game/commonWords";

const obfuscate = (articleDOM) => {
  const words = [];

  articleDOM.querySelectorAll(".word").forEach((word) => {
    const wordObject = {
      word: word.innerText,
      wordNormalized: normalize(word.innerText),
      obfuscated: true,
    };

    word.innerText = word.innerText.replace(/./g, "█");

    words.push(wordObject);
  });

  return words;
};

const revealWords = (guess, articleDOM, words) => {
  guess = normalize(guess);

  const nodeList = articleDOM.querySelectorAll(".word");
  let count = 0;

  words.forEach((word, i) => {
    if (word.obfuscated && word.wordNormalized === guess) {
      word.obfuscated = false;
      nodeList[i].innerText = word.word;
      count++;
    }
  });

  return count;
};

const revealAll = (articleDOM, words) => {
  const nodeList = articleDOM.querySelectorAll(".word");

  words.forEach((word, i) => {
    if (word.obfuscated) {
      word.obfuscated = false;
      nodeList[i].innerText = word.word;
    }
  });
};

const revealCommonWords = (articleDOM, words) => {
  commonWords.forEach((word) => {
    word = normalize(word);
    revealWords(word, articleDOM, words);
  });
};

export { obfuscate, revealWords, revealAll, revealCommonWords };

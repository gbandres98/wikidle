import deburr from "lodash.deburr";
import commonWords from "@/game/commonWords";
import plural from "rosaenlg-pluralize-es";

const normalize = (word) => {
  word = word.toLowerCase();
  word = deburr(word);
  word = word.normalize("NFC");

  return word;
};

const isValid = (word, guesses) => {
  if (commonWords.some((commonWord) => normalize(commonWord) === word))
    return false;

  return !guesses.some((guess) => guess.word === word);
};

const pluralize = (word) => {
  const wordPlural = plural(word);
  if (wordPlural === word) return [word];
  return [word, wordPlural];
};

export { normalize, isValid, pluralize };

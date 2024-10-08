export const prettySlug = (label: string): string => {
  return label
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .split("")
    .map((character, index) => {
      if (index === 0) {
        return character.toLocaleUpperCase();
      }

      if (character.toUpperCase() === character) {
        return " " + character;
      }

      return character;
    })
    .join("");
};

export const formatStatName = (statName: string) => {
    const words = statName.split(/[\s-]+/);
    if (words.length === 1) {
      return words[0].substring(0, 3).toUpperCase();
    } else if (words.length === 2) {
      return `${words[0][0].toUpperCase()}${words[0][1].toLowerCase()}${words[1][0].toUpperCase()}`;
    } else {
      return words[0].substring(0, 3).toUpperCase();
    }
  };
  
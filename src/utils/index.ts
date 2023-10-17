export { showToast } from "./toast";

export const shuffleArray = <T>(arr: T[]): T[] => {
  let currentIndex = arr.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    --currentIndex;

    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
};

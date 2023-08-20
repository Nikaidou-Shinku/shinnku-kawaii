const gameCategories = [
  {
    name: "Windows",
    value: "win",
  },
  {
    name: "Android",
    value: "Android直装",
  },
  {
    name: "Kirikiri 2",
    value: "krkr",
  },
  {
    name: "ONScripter",
    value: "ons",
  },
  {
    name: "RPG",
    value: "rpg",
  },
  {
    name: "Untranslated",
    value: "生肉",
  },
  {
    name: "Simulators",
    value: "模拟器",
  },
  {
    name: "Artroid",
    value: "Artroid",
  },
];

export const rootList = gameCategories.map((c) => ({
  type: "folder" as "folder",
  name: c.name,
  value: c.value,
  date: "-",
  size: "-",
}));

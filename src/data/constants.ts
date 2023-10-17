const gameCategories = [
  {
    name: "Windows",
    value: "win",
  },
  {
    name: "RPG",
    value: "rpg",
  },
  {
    name: "Kirikiri 2",
    value: "krkr",
  },
  {
    name: "Android",
    value: "apk",
  },
  {
    name: "ONScripter",
    value: "ons",
  },
  {
    name: "Artroid",
    value: "artroid",
  },
  {
    name: "Simulators",
    value: "simulate",
  },
  {
    name: "Tools",
    value: "tools",
  },
];

export const rootList = gameCategories.map((c) => ({
  type: "folder" as "folder",
  name: c.name,
  value: c.value,
  date: "-",
  size: "-",
}));

export const onedriveAccounts = ["mk", "02", "03", "04"];

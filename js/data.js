const WORLD_DATA = {
  // 1. ZIELEŃ
  default: [
    {
      name: "BOSS",
      rank: "leader",
      castle: { name: "Avalon", x: 526, y: 442 },
      outposts: [
        { name: "food1", x: 539, y: 450 },
        { name: "food2", x: 533, y: 431 },
        { name: "food3", x: 532, y: 444 },
      ],
      labs: [{ name: "lab1", x: 542, y: 438 }],
      monuments: [
        { name: "mon1", x: 544, y: 431 },
        { name: "mon2", x: 521, y: 433 },
      ],
    },
    {
      name: "popo",
      rank: "deputy",
      castle: { name: "Castle popo", x: 555, y: 391 },
      outposts: [
        { name: "outpost wood", x: 555, y: 393 },
        { name: "outpost stone", x: 559, y: 392 },
        { name: "outpost food", x: 552, y: 385 },
      ],
    },
  ],
  // 2. LÓD
  lodzik: [
    {
      name: "BOSS",
      rank: "leader",
      castle: { name: "Winter Palace", x: 200, y: 200 },
      labs: [{ name: "Lab", x: 205, y: 205 }],
    },
    {
      name: "popo",
      rank: "deputy",
      castle: { name: "Castle popo", x: 200, y: 200 },
      labs: [{ name: "Lab", x: 205, y: 205 }],
    },
  ],
  // 3. PIASEK
  piasek: [
    {
      name: "BOSS",
      rank: "leader",
      castle: { name: "Sand", x: 90, y: 100 },
      villages: [
        { name: "102:102", x: 102, y: 132 },
        { name: "102:102", x: 112, y: 122 },
        { name: "102:102", x: 122, y: 112 },
        { name: "102:102", x: 132, y: 102 },
      ],
    },
  ],
  // 4. OGIEŃ
  szczyty: [
    {
      name: "BOSS",
      rank: "leader",
      castle: { name: "Fire Wall", x: 200, y: 200 },
      labs: [{ name: "Lab", x: 205, y: 205 }],
    },
  ],
};

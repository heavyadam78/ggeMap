
const WORLD_DATA = {
  // 1. ZIELEŃ
  default: [
    {
      name: "GRECY",
      rank: "leader",
      castle: { name: "TYGRYS", x: 526, y: 442 },
      outposts: [
        { name: "Hystrix", x: 539, y: 450 },
        { name: "Trichys", x: 533, y: 431 },
        { name: "Atherurus", x: 529, y: 437 },
      ],
    },
    {
      name: "Bachus",
      rank: "deputy",
      castle: { name: "Lemon1", x: 555, y: 1113 },
      outposts: [
        { name: "Trójka", x: 564, y: 1106 },
        { name: "jedynka", x: 552, y: 1113 },
        { name: "dwójka", x: 556, y: 1114 },
      ],
    },
    {
      name: "hans19",
      rank: "deputy",
      castle: { name: "wieslaw56", x: 555, y: 391 },
      outposts: [
        { name: "Karmazynowy", x: 555, y: 393 },
        { name: "Marengo", x: 559, y: 392 },
        { name: "Silwer", x: 552, y: 385 },
      ],
      labs: [{ name: "525:397", x: 525, y: 397 }],
    },
    {
      name: "Radegunda",
      rank: "deputy",
      castle: { name: "Zamek Radegunda", x: 524, y: 444 },
      outposts: [
        { name: "Skąpokolec", x: 533, y: 445 },
        { name: "Barok", x: 521, y: 449 },
        { name: "Nowy", x: 527, y: 452 },
      ],
    },
    {
      name: "sileo",
      rank: "deputy",
      castle: { name: "Zamek sileo", x: 284, y: 379 },
      outposts: [
        { name: "drewutnia", x: 300, y: 374 },
        { name: "skalniak", x: 286, y: 374 },
        { name: "Post sileo", x: 293, y: 383 },
      ],
      monuments: [{ name: "Hunowie", x: 319, y: 332 }],
    },
    {
      name: "aostasz",
      rank: "warmarshal",
      castle: { name: "Zamek aostasz", x: 340, y: 294 },
      outposts: [
        { name: "Posterunek aost", x: 334, y: 294 },
        { name: "aostasz_staś", x: 349, y: 294 },
        { name: "aostasz", x: 340, y: 289 },
      ],
    },
    {
      name: "edward1200",
      rank: "warmarshal",
      castle: { name: "Zamek edward120", x: 145, y: 235 },
      outposts: [
        { name: "edward jed", x: 143, y: 239 },
        { name: "kamień1", x: 126, y: 224 },
        { name: "kamień2", x: 120, y: 248 },
      ],
    },
    {
      name: "haker97",
      rank: "warmarshal",
      castle: { name: "Miszczu", x: 453, y: 672 },
      outposts: [
        { name: "Papusianko", x: 460, y: 717 },
        { name: "Papuu", x: 452, y: 673 },
        { name: "Jedzonko", x: 455, y: 720 },
      ],
      monuments: [
        { name: "474:668", x: 474, y: 668 },
        { name: "460:695", x: 460, y: 695 },
        { name: "487:668", x: 487, y: 668 },
        { name: "423:670", x: 423, y: 670 },
        { name: "435:670", x: 435, y: 670 },
      ],
    },
    {
      name: "HeavyAdam78",
      rank: "warmarshal",
      castle: { name: "Zamek HeavyAdam", x: 1140, y: 489 },
      outposts: [
        { name: "post1", x: 1145, y: 484 },
        { name: "post2", x: 1151, y: 482 },
        { name: "post3", x: 1152, y: 483 },
      ],
    },
    {
      name: "AZOT67",
      rank: "general",
      castle: { name: "RUBIN", x: 1133, y: 747 },
      outposts: [
        { name: "RUBIN 2", x: 1134, y: 755 },
        { name: "RUBIN 1", x: 1136, y: 744 },
        { name: "RUBIN 3", x: 1136, y: 746 },
      ],
      labs: [{ name: "Zielone", x: 1124, y: 735 }],
    },
    {
      name: "Dionysus",
      rank: "general",
      castle: { name: "Zamek RMHK", x: 496, y: 531 },
      outposts: [
        { name: "Posterunek RMHK", x: 491, y: 517 },
        { name: "RMHK II", x: 498, y: 535 },
        { name: "HENRYK", x: 497, y: 534 },
      ],
    },
    {
      name: "Fiolek",
      rank: "general",
      castle: { name: "Zamek Fiolek", x: 943, y: 179 },
      outposts: [
        { name: "Posterunek Fiol", x: 958, y: 186 },
        { name: "post zarcie", x: 957, y: 187 },
        { name: "post papu", x: 941, y: 170 },
      ],
    },
    {
      name: "Franz-77",
      rank: "general",
      castle: { name: "Zamek Franz-77", x: 511, y: 496 },
      outposts: [
        { name: "Warownia", x: 516, y: 502 },
        { name: "Posterunek Fran", x: 498, y: 492 },
        { name: "Fort", x: 512, y: 495 },
      ],
    },
    {
      name: "MlekoludTV",
      rank: "general",
      castle: { name: "Zamek Mlekoluda", x: 314, y: 1107 },
      outposts: [
        { name: "BOUNTY", x: 314, y: 1109 },
        { name: "MILKY WAY", x: 317, y: 1108 },
        { name: "MARS", x: 315, y: 1101 },
      ],
    },
    {
      name: "Rom2",
      rank: "general",
      castle: { name: "Zamek Rom2", x: 824, y: 649 },
      outposts: [
        { name: "Buła2", x: 778, y: 645 },
        { name: "Buła3", x: 860, y: 656 },
        { name: "Buła1", x: 804, y: 651 },
      ],
    },
    {
      name: "Bernstein",
      rank: "sargent",
      castle: { name: "EMPORIA", x: 1127, y: 747 },
      outposts: [
        { name: "EMPORIA 2", x: 1163, y: 736 },
        { name: "Posterunek Bern", x: 1125, y: 757 },
        { name: "EMPORIA4", x: 1198, y: 830 },
      ],
    },
    {
      name: "BerserkDarek26",
      rank: "sargent",
      castle: { name: "Zamek BerserkDa", x: 397, y: 257 },
      outposts: [
        { name: "Poserunek Bers3", x: 405, y: 251 },
        { name: "Posterunek Bers", x: 392, y: 262 },
        { name: "Bers2", x: 395, y: 254 },
      ],
    },
    {
      name: "Centurion_666",
      rank: "sargent",
      castle: { name: "DIMMU BORGIR", x: 1056, y: 213 },
      outposts: [
        { name: "EAST FORT", x: 1067, y: 215 },
        { name: "WEST FORT", x: 1046, y: 216 },
        { name: "NORTH FORT", x: 1056, y: 209 },
      ],
    },
    {
      name: "CienkiBolek2012",
      rank: "sargent",
      castle: { name: "CienkiBolek2012", x: 522, y: 437 },
      outposts: [
        { name: "EAT_1", x: 497, y: 834 },
        { name: "EAT_2", x: 496, y: 835 },
        { name: "EAT_3", x: 494, y: 837 },
      ],
    },
    {
      name: "kramek123",
      rank: "sargent",
      castle: { name: "Zamek kramek123", x: 563, y: 419 },
      outposts: [
        { name: "nasz1", x: 569, y: 421 },
        { name: "kitek", x: 554, y: 418 },
        { name: "ufo", x: 564, y: 417 },
      ],
    },
    {
      name: "kuba19800610",
      rank: "sargent",
      castle: { name: "Zamek Boczek", x: 325, y: 279 },
      outposts: [
        { name: "kamień", x: 321, y: 281 },
        { name: "drewno", x: 327, y: 277 },
        { name: "jedzenie", x: 322, y: 280 },
      ],
    },
    {
      name: "Pavlo02",
      rank: "sargent",
      castle: { name: "Zamek Pavlo02", x: 499, y: 498 },
      outposts: [
        { name: "dom3", x: 497, y: 499 },
        { name: "dom", x: 494, y: 500 },
        { name: "dom 2", x: 492, y: 497 },
      ],
    },
    {
      name: "Ryba85",
      rank: "sargent",
      castle: { name: "aquarium", x: 917, y: 940 },
      outposts: [
        { name: "RYBA MARKA", x: 928, y: 933 },
        { name: "1papu", x: 911, y: 952 },
        { name: "Posterunek Ryba", x: 918, y: 943 },
      ],
    },
    {
      name: "Sofokless",
      rank: "sargent",
      castle: { name: "Wolta", x: 719, y: 695 },
      outposts: [
        { name: "Batalion", x: 730, y: 695 },
        { name: "Zygmunt", x: 707, y: 694 },
        { name: "Krasus", x: 720, y: 708 },
      ],
    },
    {
      name: "tygielek",
      rank: "sargent",
      castle: { name: "TYGIEL", x: 977, y: 747 },
      outposts: [
        { name: "- 1 -", x: 980, y: 746 },
        { name: "- 2 -", x: 976, y: 748 },
      ],
    },
    {
      name: "Zahel44",
      rank: "sargent",
      castle: { name: "Alethkar", x: 459, y: 1033 },
      outposts: [
        { name: "Highbury", x: 534, y: 1036 },
        { name: "Kholinar", x: 457, y: 1032 },
        { name: "Urithiru", x: 464, y: 1028 },
      ],
    },
    {
      name: "BartekBerserk7",
      rank: "member",
      castle: { name: "Zamek BartekBer", x: 1029, y: 632 },
      outposts: [
        { name: "Posterunek Bart", x: 1035, y: 633 },
        { name: "Posterunek Bart", x: 1031, y: 627 },
        { name: "Posterunek Bart", x: 1030, y: 626 },
      ],
    },
    {
      name: "czarnytulipan",
      rank: "member",
      castle: { name: "Hellas", x: 269, y: 279 },
      outposts: [
        { name: "Akropolis", x: 280, y: 362 },
        { name: "Wilczy Las", x: 248, y: 280 },
        { name: "Ateny", x: 279, y: 271 },
      ],
    },
    {
      name: "DEMON3666",
      rank: "member",
      castle: { name: "ZAKARUM", x: 530, y: 412 },
      outposts: [
        { name: "BELZEBUB", x: 528, y: 412 },
        { name: "GORGO", x: 522, y: 414 },
        { name: "MOLOCH", x: 530, y: 414 },
      ],
    },
    {
      name: "husy4",
      rank: "member",
      castle: { name: "Zamek husy4", x: 463, y: 300 },
      outposts: [
        { name: "Niagara", x: 470, y: 303 },
        { name: "Queen", x: 465, y: 300 },
        { name: "Shangri La", x: 456, y: 302 },
      ],
    },
    {
      name: "koczis",
      rank: "member",
      castle: { name: "Zamek koczis", x: 576, y: 517 },
      outposts: [
        { name: "kocz3", x: 578, y: 514 },
        { name: "kocz1", x: 572, y: 525 },
        { name: "Posterunek kocz", x: 560, y: 523 },
      ],
    },
    {
      name: "korbendalas",
      rank: "member",
      castle: { name: "Zamek korbendal", x: 560, y: 425 },
      outposts: [
        { name: "Alderan", x: 553, y: 426 },
        { name: "Naboo", x: 560, y: 432 },
        { name: "Rebelia", x: 562, y: 418 },
      ],
      monuments: [
        { name: "Mon2", x: 798, y: 436 },
        { name: "Mon4", x: 747, y: 473 },
        { name: "Mon1", x: 566, y: 474 },
        { name: "Mon3", x: 890, y: 436 },
        { name: "Mon5", x: 527, y: 435 },
      ],
    },
    {
      name: "Kostuszkowo",
      rank: "member",
      ruin: { name: "Kostuszkowo", x: 476, y: 282 },
      outposts: [
        { name: "Kościsko", x: 485, y: 276 },
        { name: "Kosteczka", x: 473, y: 287 },
        { name: "Kostka", x: 478, y: 282 },
      ],
    },
    {
      name: "Krasus",
      rank: "member",
      castle: { name: "Troja", x: 683, y: 619 },
      outposts: [
        { name: "Brukowina", x: 686, y: 618 },
        { name: "Szalony", x: 683, y: 615 },
        { name: "Wladek", x: 687, y: 608 },
      ],
    },
    {
      name: "krzyś842",
      rank: "member",
      castle: { name: "Zamek krzyś842", x: 944, y: 384 },
      outposts: [
        { name: "posterunek13", x: 942, y: 383 },
        { name: "posterunek14", x: 939, y: 385 },
        { name: "posterunek15", x: 930, y: 391 },
      ],
    },
    {
      name: "Maciej1976",
      rank: "member",
      castle: { name: "Westminster", x: 1096, y: 1113 },
      outposts: [
        { name: "Victoria 2", x: 1098, y: 1120 },
        { name: "Victoria 1", x: 1115, y: 1088 },
        { name: "Victoria 3", x: 1111, y: 1146 },
      ],
    },
    {
      name: "Mikołaj7",
      rank: "member",
      castle: { name: "Zamek Mikołaj7", x: 1131, y: 741 },
      outposts: [
        { name: "Bodzio", x: 1223, y: 755 },
        { name: "Filip4", x: 1210, y: 750 },
        { name: "Szymek2", x: 1215, y: 751 },
      ],
    },
    {
      name: "oko03",
      rank: "member",
      castle: { name: "niezniszczalny", x: 664, y: 685 },
      outposts: [
        { name: "chleb kamień", x: 377, y: 860 },
        { name: "Chlebek 2", x: 613, y: 1005 },
        { name: "chlebek", x: 1096, y: 269 },
      ],
    },
    {
      name: "Pacemaker",
      rank: "member",
      castle: { name: "Zamek Pacemaker", x: 255, y: 371 },
      outposts: [],
    },
    {
      name: "Torukmako",
      rank: "member",
      castle: { name: "Toruk", x: 884, y: 241 },
      outposts: [
        { name: "Toruk-Kamień", x: 890, y: 241 },
        { name: "Pandora", x: 888, y: 248 },
        { name: "Drzewo Dusz", x: 877, y: 239 },
      ],
    },
    {
      name: "Tosia1988",
      rank: "member",
      castle: { name: "Tosia1988", x: 545, y: 465 },
      outposts: [
        { name: "Papuś", x: 570, y: 461 },
        { name: "_2_", x: 541, y: 461 },
      ],
    },
    {
      name: "Triste23",
      rank: "member",
      castle: { name: "Camelot", x: 320, y: 423 },
      outposts: [
        { name: "Camelot2", x: 322, y: 423 },
        { name: "Camelot4", x: 317, y: 417 },
        { name: "post3", x: 328, y: 420 },
      ],
    },
    {
      name: "Walko",
      rank: "member",
      castle: { name: "Walos", x: 713, y: 719 },
      outposts: [
        { name: "Spec 3", x: 705, y: 726 },
        { name: "Spec 2", x: 723, y: 711 },
        { name: "Spec 1", x: 712, y: 720 },
      ],
    },
  ],
  // 2. LÓD
  lodzik: [
    {
      name: "WETERAN",
      rank: "leader",
      castle: { name: "Zamek Zimowy", x: 200, y: 200 },
      labs: [{ name: "Lab", x: 205, y: 205 }],
    }
    
  ],

  // 3. PIASEK
  piasek: [
    {
      name: "WETERAN",
      rank: "leader",
      castle: { name: "Zamek Pustynny", x: 100, y: 100 },
      villages: [{ name: "Wioska jedzenia", x: 102, y: 102 }],
    }
  ],

  // 4. OGIEŃ
  szczyty: [
    
  ]
};

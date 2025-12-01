const ALLIANCE_NAME = 'Destruction';
const ALL_PLAYERS = [
    {
        name: "BOSS",
        rank: "leader",
        kingdoms: {
            default: {
                castle: { name: "TIGER", x: 630, y: 482 },
                outposts: [
                    { name: "Hystrix", x: 639, y: 490 },
                    { name: "Trichys", x: 633, y: 471 },
                    { name: "Atherurus", x: 629, y: 477 }
                ],
                labs: [{ name: "Labo", x: 635, y: 485 }],
                monuments: [{ name: "mont1", x: 637, y: 480 }]
            },
            lodzik: { 
                castle: { name: "WHITE WOLF", x: 605, y: 605 },
                villages: [
                    { name: "605:612", x: 605, y: 612 },
                    { name: "618:601", x: 618, y: 601 },
                    { name: "610:619", x: 610, y: 619 },
                    { name: "602:608", x: 602, y: 608 },
                    { name: "615:615", x: 615, y: 615 },
                    { name: "620:603", x: 620, y: 603 },
                    { name: "607:614", x: 607, y: 614 },
                    { name: "611:600", x: 611, y: 600 },
                    { name: "603:618", x: 603, y: 618 },
                    { name: "616:606", x: 616, y: 606 },
                    { name: "609:611", x: 609, y: 611 },
                    { name: "614:620", x: 614, y: 620 }                ]
             },
            piasek: { 
                castle: { name: "SCORPIO", x: 464, y: 410 },
                villages: [
                    {name: "420:275", x: 420, y: 275},
                    {name: "666:488", x: 666, y: 488},
                    {name: "502:486", x: 502, y: 486},
                    {name: "262:416", x: 262, y: 416},
                    {name: "611:290", x: 611, y: 290},
                    {name: "499:252", x: 499, y: 252},
                    {name: "240:632", x: 240, y: 632},
                    {name: "388:295", x: 388, y: 295},
                    {name: "603:619", x: 603, y: 619},
                    {name: "612:204", x: 612, y: 204},
                    {name: "480:623", x: 480, y: 623},
                    {name: "613:650", x: 613, y: 650},
                    {name: "341:663", x: 341, y: 663},
                    {name: "529:524", x: 529, y: 524},
                    {name: "691:208", x: 691, y: 208},
                    {name: "630:584", x: 630, y: 584},
                    {name: "313:538", x: 313, y: 538},
                    {name: "646:264", x: 646, y: 264},
                    {name: "403:370", x: 403, y: 370},
                    {name: "513:391", x: 513, y: 391},
                    {name: "527:634", x: 527, y: 634},
                    {name: "491:257", x: 491, y: 257},
                    {name: "285:674", x: 285, y: 674},
                    {name: "474:608", x: 474, y: 608},
                    {name: "470:373", x: 470, y: 373},
                    {name: "636:329", x: 636, y: 329},
                    {name: "679:262", x: 679, y: 262},
                    {name: "625:451", x: 625, y: 451}
                ]
         },
            szczyty: { castle: { name: "SAURIAN", x: 681, y: 602 } }
        }
    },
    {
        name: "Zebedee",
        rank: "sargent",
        kingdoms: {
            default: {
                castle: { name: "Castle Zebedee", x: 755, y: 613 },
                outposts: [
                    { name: "Outpost food", x: 764, y: 606 },
                    { name: "Outpost Wood", x: 752, y: 613 },
                    { name: "Outpost Stone", x: 756, y: 614 }
                ]
            },
            lodzik: {
                castle: { name: "Brrrr", x: 1030, y: 842 },
                labs: [{ name: "Labo", x: 1035, y: 855 }]
            },
            piasek: { castle: { name: "Sandokan", x: 289, y: 263 } },
            szczyty: { castle: { name: "Mountain New", x: 441, y: 431 } }
        }
    }
]
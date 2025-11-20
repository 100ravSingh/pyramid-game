const RIDDLE_LAYERS = {
  layer0: [   // 25 blocks (easy)
    { q: "What has keys but can't open locks?", a: "keyboard" },
    { q: "What has hands but cannot clap?", a: "clock" },
    { q: "What has a neck but no head?", a: "bottle" },
    // 👉 Add more (must be >= 25)
  ],

  layer1: [   // 20 blocks
    { q: "What gets wetter the more it dries?", a: "towel" },
    { q: "What goes up but never comes down?", a: "age" },
    // Add 20+
  ],

  layer2: [   // 15 blocks
    { q: "What has cities but no houses?", a: "map" },
    { q: "What has a heart that doesn’t beat?", a: "artichoke" },
    // Add 15+
  ],

  layer3: [   // 10 blocks
    { q: "I speak without a mouth and hear without ears. What am I?", a: "echo" },
    // Add 10+
  ],

  layer4: [   // 5 blocks
    { q: "What begins with T, ends with T, and has T in it?", a: "teapot" },
    // Add 5+
  ],

  layer5: [   // 2 blocks
    { q: "The more you take, the more you leave behind. What am I?", a: "footsteps" },
    // Add 2+
  ],

  layer6: [   // 1 block (hardest)
    { q: "I turn once, what is out will not get in. I turn again, what is in will not get out. What am I?", a: "key" }
    // Add more if needed
  ]
};

export default RIDDLE_LAYERS;

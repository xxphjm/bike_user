const stations = {
  local: [
    {
      name: "台北",
      county: [
        {
          name: "板橋區",
          station: [
            {
              name: "板橋一站",
              image: require("../assets/cat1.png"),
              addr: "板橋路1號",
              mat: 34,
              distance: 3.7,
              bike: [
                { name: "000001", type: "Ubike 1.0", image: require("../assets/Ubike1.0.png")},
                { name: "000002", type: "Ubike 2.0", image: require("../assets/Ubike2.0.png")},
              ],
            },
            {
              name: "板橋二站",
              image: require("../assets/cat2.png"),
              addr: "板橋路2號",
              mat: 32,
              distance: 6.7,
              bike: [
                { name: "000003", type: "Ubike 1.0", image: require("../assets/Ubike1.0.png")},
                { name: "000004", type: "Ubike 2.0", image: require("../assets/Ubike2.0.png")},
              ],
            },
            {
              name: "板橋三站",
              image: require("../assets/cat3.png"),
              addr: "板橋路3號",
              mat: 48,
              distance: 8.4,
              bike: [
                { name: "000005", type: "Ubike 1.0", image: require("../assets/Ubike1.0.png")},
                { name: "000006", type: "Ubike 2.0", image: require("../assets/Ubike2.0.png")},
              ],
            },
          ],
        },
        {
          name: "三重區",
          station: [
            {
              name: "三重一站",
              image: require("../assets/dog1.png"),
              addr: "三重路1號",
              mat: 21,
              distance: 1.7,
              bike: [
                { name: "000007", type: "Ubike 1.0", image: require("../assets/Ubike1.0.png")},
                { name: "000008", type: "Ubike 2.0", image: require("../assets/Ubike2.0.png")},
              ],
            },
            {
              name: "三重二站",
              image: require("../assets/dog2.png"),
              addr: "三重路2號",
              mat: 15,
              distance: 8.7,
              bike: [
                { name: "000009", type: "Ubike 1.0", image: require("../assets/Ubike1.0.png")},
                { name: "000010", type: "Ubike 2.0", image: require("../assets/Ubike2.0.png")},
              ],
            },
          ],
        },
      ],
    },
    {
      name: "台中",
      county: [
        {
          name: "北屯區",
          station: [
            {
              name: "北屯一站",
              image: require("../assets/bird1.png"),
              addr: "北屯路1號",
              mat: 58,
              distance: 4.4,
              bike: [
                { name: "000011", type: "Ubike 1.0", image: require("../assets/Ubike1.0.png")},
                { name: "000012", type: "Ubike 2.0", image: require("../assets/Ubike2.0.png")},
              ],
            },
            {
              name: "北屯二站",
              image: require("../assets/bird2.png"),
              addr: "北屯路2號",
              mat: 54,
              distance: 8.2,
              bike: [
                { name: "000013", type: "Ubike 1.0", image: require("../assets/Ubike1.0.png")},
                { name: "000014", type: "Ubike 2.0", image: require("../assets/Ubike2.0.png")},
              ],
            },
          ],
        },
        {
          name: "西屯區",
          station: [
            {
              name: "西屯一站",
              image: require("../assets/bunny1.png"),
              addr: "西屯路1號",
              mat: 61,
              distance: 4.7,
              bike: [
                { name: "000015", type: "Ubike 1.0", image: require("../assets/Ubike1.0.png")},
                { name: "000016", type: "Ubike 2.0", image: require("../assets/Ubike2.0.png")},
              ],
            },
            {
              name: "西屯二站",
              image: require("../assets/bunny2.png"),
              addr: "西屯路2號",
              mat: 56,
              distance: 9.1,
              bike: [
                { name: "000017", type: "Ubike 1.0", image: require("../assets/Ubike1.0.png")},
                { name: "000018", type: "Ubike 2.0", image: require("../assets/Ubike2.0.png")},
              ],
            },
          ],
        },
      ],
    },
    {
      name: "高雄",
      county: [
        {
          name: "三民區",
          station: [
            {
              name: "三民一站",
              image: require("../assets/cat1.png"),
              addr: "三民路1號",
              mat: 22,
              distance: 3.1,
              bike: [
                { name: "000019", type: "Ubike 1.0", image: require("../assets/Ubike1.0.png")},
                { name: "000020", type: "Ubike 2.0", image: require("../assets/Ubike2.0.png")},
              ],
            },
            {
              name: "三民二站",
              image: require("../assets/cat1.png"),
              addr: "三民路2號",
              mat: 15,
              distance: 3.5,
              bike: [
                { name: "000021", type: "Ubike 1.0", image: require("../assets/Ubike1.0.png")},
                { name: "000022", type: "Ubike 2.0", image: require("../assets/Ubike2.0.png")},
              ],
            },
          ],
        },
        {
          name: "燕巢區",
          station: [
            {
              name: "燕巢一站",
              image: require("../assets/cat1.png"),
              addr: "燕巢路1號",
              mat: 58,
              distance: 2.7,
              bike: [
                { name: "000023", type: "Ubike 1.0", image: require("../assets/Ubike1.0.png")},
                { name: "000024", type: "Ubike 2.0", image: require("../assets/Ubike2.0.png")},
              ],
            },
            {
              name: "燕巢二站",
              image: require("../assets/cat1.png"),
              addr: "燕巢路2號",
              mat: 65,
              distance: 5.4,
              bike: [
                { name: "000025", type: "Ubike 1.0", image: require("../assets/Ubike1.0.png")},
                { name: "000026", type: "Ubike 2.0", image: require("../assets/Ubike2.0.png")},
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default stations;

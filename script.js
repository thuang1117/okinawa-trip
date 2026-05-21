const weatherApiUrl = "https://api.open-meteo.com/v1/forecast?latitude=26.2124&longitude=127.6792&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=Asia%2FTokyo&forecast_days=14";
const weatherFallbackUrl = "https://www.weatherworld.com/14day-weather/jp/okinawa.html";
const weatherByDate = {};

function tripReminder(title, start, end, details, location) {
  return { title, start, end, details, location };
}

function departureStop(time, name, note, mapQuery, parking, start, end, location) {
  return {
    time,
    name,
    note,
    mapQuery,
    parking,
    reminder: tripReminder(name, start, end, note, location || mapQuery)
  };
}

const itinerary = {
  day1: {
    date: "2026-05-27",
    label: "Day 1｜5/27（三）",
    title: "抵達沖繩、領車與讀谷入住",
    routeUrl: "https://www.google.com/maps/dir/?api=1&origin=Naha%20Airport&destination=Hotel%20Nikko%20Alivila&travelmode=driving&waypoints=OTS%20Toyosaki%20Rinku%20Branch%7C%E8%AA%AD%E8%B0%B7%E9%85%92%E5%A0%B4%20%E7%BE%8E%E6%B5%B7%7C%E4%B8%B8%E5%A4%A7%E8%B6%85%E5%B8%82%20%E6%B3%A2%E5%B9%B3%E5%BA%97",
    stops: [
      {
        time: "14:20",
        name: "那霸機場抵達",
        note: "去程 JX870 12:00-14:20。抵達後前往租車營業所。",
        mapQuery: "Naha Airport Okinawa",
        parking: "機場接駁與租車動線為主，臨停請依現場指示。旅程後段可使用機場停車場。"
      },
      {
        time: "15:00",
        name: "OTS 臨空豐崎營業所領車",
        note: "Word 檔寫 OST，依租車品牌常見名稱整理為 OTS。領車後前往飯店。",
        alert: "車程約 90 分鐘。目前國際線航廈前的接駁區正在施工，抵達沖繩後請由國際線航廈步行至國內線航廈前的國內線接駁區「10-A」搭乘巴士。",
        mapQuery: "OTS Rent a Car Rinku Toyosaki Branch Okinawa",
        parking: "租車營業所內辦理領車；停車以店家現場安排為準。"
      },
      departureStop(
        "16:30",
        "出發前往 Hotel Nikko Alivila",
        "領車後前往飯店，車程約 90 分鐘。抵達後辦理 check-in。",
        "Hotel Nikko Alivila Okinawa",
        "使用飯店住客停車場，入住時確認收費與出入方式。",
        "20260527T163000",
        "20260527T180000",
        "Hotel Nikko Alivila Okinawa"
      ),
      {
        time: "16:30",
        name: "Hotel Nikko Alivila Check-in",
        note: "第一、二晚住宿。抵達後可先整理行李再出發晚餐。",
        mapQuery: "Hotel Nikko Alivila Okinawa",
        parking: "飯店設有住客停車場，建議入住時確認收費與出入方式。"
      },
      departureStop(
        "18:20",
        "出發前往 読谷酒場 美海",
        "晚餐訂位 18:30，飯店到餐廳車程約 5 分鐘，建議 18:20 出發。",
        "読谷酒場 美海 沖縄",
        "餐廳周邊停車位可能有限，建議出發前查附近停車或詢問店家。",
        "20260527T182000",
        "20260527T183000",
        "読谷酒場 美海 沖縄"
      ),
      {
        time: "18:30",
        name: "晚餐：読谷酒場 美海",
        note: "訂位 18:30，營業時間 18:00-00:00。飯店到餐廳車程約 5 分鐘。",
        mapQuery: "読谷酒場 美海 沖縄",
        parking: "餐廳周邊停車位可能有限，建議出發前查附近停車或詢問店家。"
      },
      departureStop(
        "20:20",
        "出發前往 丸大超市 波平店",
        "晚餐後前往丸大超市波平店補給，飯店與餐廳周邊到超市車程約 5 分鐘。",
        "丸大超市 波平店",
        "超市通常附設停車位，尖峰時段可查周邊停車。",
        "20260527T202000",
        "20260527T203000",
        "丸大超市 波平店"
      ),
      {
        time: "20:30",
        name: "丸大超市 波平店",
        note: "營業 08:00-00:00，可補水、零食與隔日用品。",
        mapQuery: "丸大超市 波平店",
        parking: "超市通常附設停車位；尖峰時段可查周邊停車。"
      }
    ],
    weather: "晴，約 24-27°C，濕度偏高。"
  },
  day2: {
    date: "2026-05-28",
    label: "Day 2｜5/28（四）",
    title: "Hotel Nikko Alivila 飯店玩水與設施日",
    routeUrl: "https://www.google.com/maps/search/?api=1&query=Hotel%20Nikko%20Alivila%20Okinawa",
    stops: [
      {
        time: "08:00",
        name: "飯店早餐",
        note: "Day 2 全日改為飯店玩水與放鬆，不安排外出車程。",
        mapQuery: "Hotel Nikko Alivila Okinawa",
        parking: "使用飯店住客停車場。"
      },
      {
        time: "09:30",
        name: "飯店泳池與海灘活動",
        note: "可使用飯店泳池、海灘與度假設施。請依現場營業時間、天候與安全規範調整。",
        mapQuery: "Hotel Nikko Alivila Okinawa",
        parking: "使用飯店住客停車場。",
        externalLinks: [
          {
            label: "飯店活動設施官網",
            url: "https://www.alivila.co.jp/activity/?hl=zh-TW"
          }
        ]
      },
      {
        time: "11:30",
        name: "飯店設施大綱",
        note: "可依飯店官網與現場資訊安排：室外泳池、海灘散步、水上活動、親子活動、館內商店、休憩空間與餐飲設施。實際開放項目、收費與預約方式請以飯店官方頁面為準。",
        mapQuery: "Hotel Nikko Alivila Okinawa",
        parking: "使用飯店住客停車場。",
        externalLinks: [
          {
            label: "查看 Hotel Nikko Alivila 活動",
            url: "https://www.alivila.co.jp/activity/?hl=zh-TW"
          }
        ]
      },
      {
        time: "午餐",
        name: "飯店內午餐 / 自由用餐",
        note: "改為飯店內或附近自由用餐。",
        mapQuery: "Hotel Nikko Alivila restaurants",
        parking: "留在飯店使用住客停車場。"
      },
      {
        time: "下午",
        name: "飯店玩水與休息",
        note: "下午保留彈性，可繼續玩水、午休、海灘散步或參考飯店活動頁安排體驗。",
        mapQuery: "Hotel Nikko Alivila Okinawa",
        parking: "使用飯店住客停車場。",
        externalLinks: [
          {
            label: "活動與設施參考",
            url: "https://www.alivila.co.jp/activity/?hl=zh-TW"
          }
        ]
      },
      {
        time: "晚餐",
        name: "飯店內晚餐 / 自由用餐",
        note: "改為飯店內或附近自由用餐，依當天體力與小朋友狀態調整。",
        mapQuery: "Hotel Nikko Alivila restaurants",
        parking: "使用飯店住客停車場。"
      }
    ],
    weather: "晴，約 23-27°C，飯店泳池與海灘活動需防曬補水。"
  },
  day3: {
    date: "2026-05-29",
    label: "Day 3｜5/29（五）",
    title: "退房、青之洞潛水、美國村與 PARCO",
    routeUrl: "https://www.google.com/maps/dir/?api=1&origin=Hotel%20Nikko%20Alivila&destination=Hotel%20Collective%20Naha&travelmode=driving&waypoints=Sandbox%20Burgers%20Okinawa%7CBlue%20Entrance%20Kitchen%20Okinawa%7CBlue%20Cave%20Okinawa%7CAmerican%20Village%20Okinawa%7CSan-A%20Urasoe%20West%20Coast%20PARCO%20CITY%7CJojoen%20Naha",
    stops: [
      {
        time: "08:00",
        name: "飯店早餐與玩水",
        note: "上午在飯店早餐、玩水。11:00 退房，二哥需提早 10:30 退房。",
        mapQuery: "Hotel Nikko Alivila Okinawa",
        parking: "退房前使用飯店住客停車場。"
      },
      departureStop(
        "10:45",
        "出發前往 Sandbox Burgers",
        "長幼組午餐可前往 Sandbox Burgers，營業 11:30-20:00，建議預留停車與點餐時間。",
        "Sandbox Burgers Okinawa",
        "美國村周邊停車選擇較多，假日建議預留找車位時間。",
        "20260529T104500",
        "20260529T113000",
        "Sandbox Burgers Okinawa"
      ),
      {
        time: "11:30",
        name: "午餐：Sandbox Burgers（長幼組）",
        note: "營業 11:30-20:00，週一公休。長幼組午餐可在此解決。",
        mapQuery: "Sandbox Burgers Okinawa",
        parking: "美國村周邊停車選擇較多，假日建議預留找車位時間。"
      },
      departureStop(
        "11:00",
        "出發前往 青之洞潛水",
        "青之洞潛水 11:30 梯次，建議 11:00 抵達或依店家通知提前集合。",
        "Blue Cave Okinawa Maeda Cape",
        "真榮田岬有停車場；潛水旺季可能排隊，請提早抵達。",
        "20260529T110000",
        "20260529T113000",
        "Blue Cave Okinawa Maeda Cape"
      ),
      {
        time: "11:30",
        name: "青之洞潛水 / Blue Entrance Kitchen（潛水組）",
        note: "青之洞潛水 11:30 梯次；Blue Entrance Kitchen 可作為潛水組午餐，營業 11:00-15:00。",
        mapQuery: "Blue Cave Okinawa Maeda Cape",
        parking: "真榮田岬有停車場；潛水旺季可能排隊，請提早抵達。"
      },
      departureStop(
        "12:30",
        "出發前往 美國村",
        "青之洞到美國村車程約 30 分鐘。13:00 抵達，美國村拍照時間為 13:30。",
        "American Village Okinawa",
        "美國村區域有免費與商場停車場，尖峰時段需多繞一下。",
        "20260529T123000",
        "20260529T130000",
        "American Village Okinawa"
      ),
      {
        time: "13:00",
        name: "美國村拍照",
        note: "青之洞到美國村車程約 30 分鐘。13:00 抵達，美國村拍照時間為 13:30。",
        mapQuery: "American Village Okinawa",
        parking: "美國村區域有免費與商場停車場，尖峰時段需多繞一下。"
      },
      departureStop(
        "16:00",
        "出發前往 PARCO CITY",
        "美國村到 PARCO CITY 約 30 分鐘，潛水組在此會合。",
        "San-A Urasoe West Coast PARCO CITY",
        "商場附設大型停車場，適合多人會合。",
        "20260529T160000",
        "20260529T163000",
        "San-A Urasoe West Coast PARCO CITY"
      ),
      {
        time: "16:30",
        name: "PARCO CITY 逛街會合",
        note: "美國村到 PARCO CITY 約 30 分鐘，潛水組在此會合。",
        mapQuery: "San-A Urasoe West Coast PARCO CITY",
        parking: "商場附設大型停車場，適合多人會合。"
      },
      departureStop(
        "17:30",
        "出發前往 敘敘苑",
        "晚餐訂位 18:00，建議 17:30 出發，預留市區交通與停車時間。",
        "Jojoen Okinawa Naha",
        "建議查餐廳或商場合作停車，市區晚餐時段車位較緊。",
        "20260529T173000",
        "20260529T180000",
        "Jojoen Okinawa Naha"
      ),
      {
        time: "18:00",
        name: "晚餐：敘敘苑",
        note: "訂位 18:00，營業 11:00-22:00。晚餐後前往那霸入住。",
        mapQuery: "Jojoen Okinawa Naha",
        parking: "建議查餐廳或商場合作停車，市區晚餐時段車位較緊。"
      },
      departureStop(
        "19:30",
        "出發前往 Hotel Collective",
        "晚餐後前往 Hotel Collective 入住，車程約 25 分鐘。",
        "Hotel Collective Naha",
        "Hotel Collective 有住客停車安排；國際通步行逛較方便。",
        "20260529T193000",
        "20260529T200000",
        "Hotel Collective Naha"
      ),
      {
        time: "20:00",
        name: "Hotel Collective 入住與國際通",
        note: "PARCO / 晚餐後回飯店約 25 分鐘，可先去唐吉訶德再逛國際通。",
        mapQuery: "Hotel Collective Naha",
        parking: "Hotel Collective 有住客停車安排；國際通步行逛較方便。"
      }
    ],
    weather: "多雲，約 24-26°C，潛水活動仍需確認海況。"
  },
  day4: {
    date: "2026-05-30",
    label: "Day 4｜5/30（六）",
    title: "Gangala 之谷、瀨長島與牧志市場",
    routeUrl: "https://www.google.com/maps/dir/?api=1&origin=Hotel%20Collective%20Naha&destination=Hotel%20Collective%20Naha&travelmode=driving&waypoints=Valley%20of%20Gangala%20Okinawa%7COkinawasoba%20Kintarou%7CSenagajima%20Umikaji%20Terrace%7CA%20Happy%20Pancake%20Okinawa%7CMakishi%20Public%20Market",
    stops: [
      {
        time: "08:00",
        name: "飯店早餐",
        note: "Hotel Collective 早餐後出發，前往 Gangala 之谷車程約 35 分鐘。",
        mapQuery: "Hotel Collective Naha",
        parking: "使用飯店住客停車場。"
      },
      departureStop(
        "10:15",
        "出發前往 Gangala 之谷",
        "Gangala 之谷 11:00 場次，Hotel Collective 出發車程約 35 分鐘，建議 10:15 出發。",
        "Valley of Gangala Okinawa",
        "景點周邊停車請依現場指示，建議預留入場報到時間。",
        "20260530T101500",
        "20260530T110000",
        "Valley of Gangala Okinawa"
      ),
      {
        time: "11:00",
        name: "Gangala 之谷",
        note: "11:00 場次，建議提前抵達報到。",
        mapQuery: "Valley of Gangala Okinawa",
        parking: "景點周邊停車請依現場指示，建議預留入場報到時間。"
      },
      departureStop(
        "12:20",
        "出發前往 Okinawasoba-Kintarou",
        "Gangala 之谷到 Okinawasoba-Kintarou 車程約 5 分鐘，午餐時段建議提早移動。",
        "Okinawasoba Kintarou Okinawa",
        "餐廳附近停車位需現場確認；可先查周邊停車。",
        "20260530T122000",
        "20260530T123000",
        "Okinawasoba Kintarou Okinawa"
      ),
      {
        time: "12:30",
        name: "午餐：Okinawasoba-Kintarou",
        note: "營業 11:00-17:00，Gangala 之谷過去車程約 5 分鐘。",
        mapQuery: "Okinawasoba Kintarou Okinawa",
        parking: "餐廳附近停車位需現場確認；可先查周邊停車。"
      },
      departureStop(
        "13:30",
        "出發前往 瀨長島",
        "午餐後前往瀨長島，車程約 30 分鐘。",
        "Senagajima Umikaji Terrace Okinawa",
        "瀨長島有停車場，假日車流較多。",
        "20260530T133000",
        "20260530T140000",
        "Senagajima Umikaji Terrace Okinawa"
      ),
      {
        time: "14:00",
        name: "瀨長島",
        note: "午餐後前往瀨長島，車程約 30 分鐘。",
        mapQuery: "Senagajima Umikaji Terrace Okinawa",
        parking: "瀨長島有停車場，假日車流較多。"
      },
      departureStop(
        "15:20",
        "出發前往 幸福鬆餅",
        "瀨長島內前往幸福鬆餅外帶，視現場排隊狀況調整。",
        "A Happy Pancake Umikaji Terrace Okinawa",
        "可使用瀨長島停車場，步行前往店面。",
        "20260530T152000",
        "20260530T153000",
        "A Happy Pancake Umikaji Terrace Okinawa"
      ),
      {
        time: "15:30",
        name: "幸福鬆餅外帶",
        note: "點心安排外帶，視現場排隊狀況調整。",
        mapQuery: "A Happy Pancake Umikaji Terrace Okinawa",
        parking: "可使用瀨長島停車場，步行前往店面。"
      },
      departureStop(
        "18:00",
        "出發前往 第一牧志市場",
        "飯店到第一牧志市場車程約 2 分鐘，也可步行或搭計程車。",
        "Makishi Public Market Naha",
        "市場周邊以收費停車場為主，晚餐時段建議搭車或步行。",
        "20260530T180000",
        "20260530T183000",
        "Makishi Public Market Naha"
      ),
      {
        time: "18:30",
        name: "晚餐：第一牧志市場",
        note: "營業 08:00-22:00，飯店到市場車程約 2 分鐘，也可步行或搭計程車。宵夜可安排國際通屋台村。",
        mapQuery: "Makishi Public Market Naha",
        parking: "市場周邊以收費停車場為主，晚餐時段建議搭車或步行。"
      }
    ],
    weather: "多雲，約 24-26°C，瀨長島風可能較明顯。"
  },
  day5: {
    date: "2026-05-31",
    label: "Day 5｜5/31（日）",
    title: "神社、公園、午餐與返程",
    routeUrl: "https://www.google.com/maps/dir/?api=1&origin=Hotel%20Collective%20Naha&destination=Naha%20Airport&travelmode=driving&waypoints=Naminoue%20Shrine%20Naha%7COunoyama%20Park%20Naha%7CUomaru%20Naha",
    stops: [
      {
        time: "08:00",
        name: "飯店早餐與退房",
        note: "Hotel Collective 早餐後整理行李，保留還車與機場時間。",
        mapQuery: "Hotel Collective Naha",
        parking: "退房前使用飯店住客停車場。"
      },
      departureStop(
        "09:00",
        "出發前往 波上宮或奧武山公園",
        "依天氣與小朋友狀態二選一；市區移動時間彈性較高。",
        "Naminoue Shrine Naha",
        "波上宮與奧武山公園周邊有停車選項，建議現場依車位調整。",
        "20260531T090000",
        "20260531T093000",
        "Naminoue Shrine Naha"
      ),
      {
        time: "09:30",
        name: "波上宮 或 奧武山公園 + 神社",
        note: "依天氣與小朋友狀態二選一；市區移動時間彈性較高。",
        mapQuery: "Naminoue Shrine Naha",
        parking: "波上宮與奧武山公園周邊有停車選項，建議現場依車位調整。"
      },
      departureStop(
        "10:30",
        "出發前往 魚屋直営食堂 魚まる",
        "午餐魚屋直営食堂 魚まる 11:00 開始營業，建議 10:30 出發。",
        "魚屋直営食堂 魚まる 那霸",
        "餐廳周邊停車需查詢；若時間緊，可直接到機場用餐。",
        "20260531T103000",
        "20260531T110000",
        "魚屋直営食堂 魚まる 那霸"
      ),
      {
        time: "11:00",
        name: "午餐：魚屋直営食堂 魚まる",
        note: "營業 11:00-20:00。若沒有位置，可改到那霸機場餐廳；出境後餐廳選擇少。",
        mapQuery: "魚屋直営食堂 魚まる 那霸",
        parking: "餐廳周邊停車需查詢；若時間緊，可直接到機場用餐。"
      },
      departureStop(
        "12:30",
        "出發前往 OTS 還車",
        "13:00 還車，請保留加油、檢查與接駁時間，建議 12:30 出發。",
        "OTS Rent a Car Rinku Toyosaki Branch Okinawa",
        "租車營業所依現場動線還車。",
        "20260531T123000",
        "20260531T130000",
        "OTS Rent a Car Rinku Toyosaki Branch Okinawa"
      ),
      {
        time: "13:00",
        name: "還車",
        note: "13:00 還車，請保留加油、檢查與接駁時間。",
        mapQuery: "OTS Rent a Car Rinku Toyosaki Branch Okinawa",
        parking: "租車營業所依現場動線還車。"
      },
      departureStop(
        "13:45",
        "出發前往 那霸機場",
        "還車後前往那霸機場，請保留報到、安檢與接駁時間。",
        "Naha Airport International Terminal",
        "機場停車場可臨停；還車後通常以接駁進機場為主。",
        "20260531T134500",
        "20260531T143000",
        "Naha Airport International Terminal"
      ),
      {
        time: "15:35",
        name: "那霸機場返程",
        note: "回程 JX871 15:35-16:20。文字補充寫 15:50 起飛，網站先依航班資訊 15:35 顯示。",
        mapQuery: "Naha Airport International Terminal",
        parking: "機場停車場可臨停；還車後通常以接駁進機場為主。"
      }
    ],
    weather: "多雲，約 23-26°C，返程日留意午後交通與機場報到時間。"
  }
};

const dayList = document.querySelector("#dayList");
const dayLabel = document.querySelector("#dayLabel");
const dayTitle = document.querySelector("#dayTitle");
const routeLink = document.querySelector("#routeLink");
const stopGrid = document.querySelector("#stopGrid");
const weatherSummary = document.querySelector("#weatherSummary");

const weatherLabels = {
  0: "晴朗",
  1: "大致晴朗",
  2: "局部多雲",
  3: "多雲",
  45: "有霧",
  48: "霧凇",
  51: "毛毛雨",
  53: "毛毛雨",
  55: "較強毛毛雨",
  61: "小雨",
  63: "中雨",
  65: "大雨",
  80: "短暫陣雨",
  81: "陣雨",
  82: "強陣雨",
  95: "雷雨",
  96: "雷雨可能伴隨冰雹",
  99: "雷雨可能伴隨冰雹"
};

function googleMapSearchUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function googleParkingUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${query} parking`)}`;
}

function googleCalendarUrl(reminder) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: reminder.title,
    dates: `${reminder.start}/${reminder.end}`,
    details: reminder.details,
    location: reminder.location,
    ctz: "Asia/Tokyo"
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function describeWeather(code) {
  return weatherLabels[code] || "天氣狀態待確認";
}

function renderTabs(activeDay) {
  dayList.replaceChildren();

  Object.entries(itinerary).forEach(([key, day]) => {
    const tab = document.createElement("button");
    tab.className = `day-tab${key === activeDay ? " active" : ""}`;
    tab.type = "button";
    tab.dataset.day = key;
    tab.textContent = day.label.split("｜")[0];
    tab.addEventListener("click", () => {
      history.pushState(null, "", `#${key}`);
      renderDay(key);
    });
    dayList.append(tab);
  });
}

function prepareInternalLink(link) {
  link.removeAttribute("target");
  link.removeAttribute("rel");
}

function renderDay(dayKey) {
  const day = itinerary[dayKey];

  renderTabs(dayKey);
  dayLabel.textContent = day.label;
  dayTitle.textContent = day.title;
  routeLink.href = day.routeUrl;
  prepareInternalLink(routeLink);
  weatherSummary.textContent = weatherByDate[day.date] || `${day.weather} 即時預報載入中；若網路受限，請以天氣來源頁為準。`;
  stopGrid.replaceChildren();

  day.stops.forEach((stop) => {
    const card = document.createElement("details");
    card.className = "stop-card";
    card.open = true;

    const summary = document.createElement("summary");
    const time = document.createElement("span");
    const name = document.createElement("strong");
    time.textContent = stop.time;
    name.textContent = stop.name;
    summary.append(time, name);

    const detail = document.createElement("div");
    detail.className = "stop-detail";

    const note = document.createElement("p");
    note.textContent = stop.note;
    detail.append(note);

    if (stop.alert) {
      const alert = document.createElement("p");
      alert.className = "stop-alert";
      alert.textContent = stop.alert;
      detail.append(alert);
    }

    const links = document.createElement("p");
    const mapLink = document.createElement("a");
    const parkingLink = document.createElement("a");
    mapLink.href = googleMapSearchUrl(stop.mapQuery);
    parkingLink.href = googleParkingUrl(stop.mapQuery);
    mapLink.className = parkingLink.className = "action-link";
    mapLink.textContent = "Google Map";
    parkingLink.textContent = "查附近停車";
    links.append(mapLink, "｜", parkingLink);

    if (stop.reminder) {
      const reminderLink = document.createElement("a");
      reminderLink.href = googleCalendarUrl(stop.reminder);
      reminderLink.className = "action-link reminder-link";
      reminderLink.textContent = "加入出發提醒";
      links.append("｜", reminderLink);
    }

    if (stop.externalLinks) {
      stop.externalLinks.forEach((externalLink) => {
        const link = document.createElement("a");
        link.href = externalLink.url;
        link.className = "action-link external-link";
        link.textContent = externalLink.label;
        links.append("｜", link);
      });
    }

    const parking = document.createElement("p");
    parking.textContent = `停車資訊：${stop.parking}`;

    detail.append(links, parking);
    card.append(summary, detail);
    stopGrid.append(card);
  });
}

async function loadLiveWeather() {
  try {
    const response = await fetch(weatherApiUrl);
    if (!response.ok) {
      throw new Error("weather request failed");
    }
    const data = await response.json();
    const daily = data.daily;

    daily.time.forEach((date, index) => {
      const min = Math.round(daily.temperature_2m_min[index]);
      const max = Math.round(daily.temperature_2m_max[index]);
      const rain = daily.precipitation_probability_max[index];
      const wind = Math.round(daily.wind_speed_10m_max[index]);
      const label = describeWeather(daily.weather_code[index]);
      weatherByDate[date] = `${label}，${min}-${max}°C，降雨機率最高 ${rain}% ，最大風速約 ${wind} km/h。資料來源：Open-Meteo 即時預報`;
    });
  } catch (error) {
    Object.values(itinerary).forEach((day) => {
      weatherByDate[day.date] = `${day.weather} 即時天氣暫時無法載入，請點天氣來源確認最新預報。`;
    });
  }

  renderDay(currentDayKey());
}

function currentDayKey() {
  const key = location.hash.replace("#", "");
  return itinerary[key] ? key : "day1";
}

window.addEventListener("popstate", () => {
  renderDay(currentDayKey());
});

renderDay(currentDayKey());
loadLiveWeather();

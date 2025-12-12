// ===============================
//  TRANSLATIONS (KH / EN)
// ===============================
const translations = {
  kh: {
    title: "Westgate International School",
    subtitle: "មជ្ឈមណ្ឌលអប់រំអន្តរជាតិ",
    mediaTitle: "📌 បណ្តាញសង្គមផ្លូវការរបស់សាលា",
    facebookTitle: "Facebook Page",
    facebookDesc: "តាមដានព័ត៌មាន និងរូបភាពសកម្មភាពសាលា។",
    youtubeTitle: "YouTube Channel",
    youtubeDesc: "វីដេអូអប់រំ និងព្រឹត្តិការណ៍ពិសេសៗ។",
    instagramTitle: "Instagram",
    instagramDesc: "រូបភាព និង Story ប្រចាំថ្ងៃពីសាលា។",
    tiktokTitle: "TikTok",
    tiktokDesc: "វីដេអូខ្លី សប្បាយៗពីសិស្ស និងគ្រូ។",
    telegramTitle: "Telegram Channel",
    telegramDesc: "ព័ត៌មានបន្ទាន់ និងសារផ្លូវការ។",
    websiteTitle: "Website ផ្លូវការ",
    websiteDesc: "ពត៌មានលម្អិតអំពីសាលា និងកម្មវិធីសិក្សា។",
    phoneTitle: "លេខទំនាក់ទំនង",
    phoneDesc: "015 90 44 55",
    footer: "©2025 Deverlop by SoKun"
  },
  en: {
    title: "Westgate International School",
    subtitle: "International Education Center",
    mediaTitle: "📌 Official Media & Social Channels",
    facebookTitle: "Facebook Page",
    facebookDesc: "Follow school news and activity photos.",
    youtubeTitle: "YouTube Channel",
    youtubeDesc: "Educational videos and special events.",
    instagramTitle: "Instagram",
    instagramDesc: "Daily photos and stories from campus.",
    tiktokTitle: "TikTok",
    tiktokDesc: "Fun short videos from students and teachers.",
    telegramTitle: "Telegram Channel",
    telegramDesc: "Daily updates and official announcements.",
    websiteTitle: "Official Website",
    websiteDesc: "All information about the school and programs.",
    phoneTitle: "Contact Number",
    phoneDesc: "015 90 44 55",
    footer: "©2025 Deverlop by SoKun"
  }
};

// ===============================
//  LANGUAGE SWITCH
// ===============================
function setLanguage(lang) {
  document.documentElement.setAttribute("data-lang", lang);

  const dict = translations[lang] || translations.kh;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

// ===============================
//  CAMBODIA TIME + AUTO THEME
//  Day = 06:00 - 17:59
//  Night = 18:00 - 05:59
// ===============================
function getPhnomPenhDate() {
  const s = new Date().toLocaleString("en-US", { timeZone: "Asia/Phnom_Penh" });
  return new Date(s);
}

function updateThemeByCambodiaTime() {
  let d;
  try {
    d = getPhnomPenhDate();
  } catch (e) {
    d = new Date();
  }

  const hour = d.getHours();
  const isDay = hour >= 6 && hour < 18;
  document.documentElement.setAttribute("data-theme", isDay ? "day" : "night");
}

function updateCambodiaTimeChip() {
  const el = document.getElementById("khTime");
  if (!el) return;

  let d;
  try {
    d = getPhnomPenhDate();
  } catch (e) {
    d = new Date();
  }

  const timeStr = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });

  el.textContent = `KH Time: ${timeStr}`;
}

// ===============================
//  INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // default language Khmer
  setLanguage("kh");

  // theme + time
  updateThemeByCambodiaTime();
  updateCambodiaTimeChip();

  // update theme every 15 minutes
  setInterval(updateThemeByCambodiaTime, 15 * 60 * 1000);

  // update time every 30 seconds
  setInterval(updateCambodiaTimeChip, 30 * 1000);

  // language buttons
  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });
});

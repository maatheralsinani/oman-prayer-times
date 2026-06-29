import { useEffect, useState } from "react";
import Prayar from "./component/prayar";

/**
 * المكون الرئيسي للتطبيق (App Component)
 * يقوم بجلب وعرض مواقيت الصلاة والعد التنازلي بالإضافة إلى نافذة الأذكار المنبثقة.
 */
function App() {
  // حالات (States) تخزين بيانات مواقيت الصلاة والتواريخ واللغة والمظهر
  const [prayarTimes, setPrayarTimes] = useState({});
  const [dateTimes, setdateTimes] = useState("");
  const [hijriDate, setHijriDate] = useState("");
  const [City, setCity] = useState("Muscat");
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("day");
  const [lang, setLang] = useState("ar"); 

  // حالات (States) خاصة بالصلاة القادمة والوقت المتبقي للعد التنازلي
  const [nextPrayerName, setNextPrayerName] = useState("");
  const [remainingTime, setRemainingTime] = useState("");

  // التحديث الجديد: حالة للتحكم في إظهار وإخفاء نافذة الأذكار المنبثقة (Modal)
  const [showAzkarModal, setShowAzkarModal] = useState(false);

  // نصوص الواجهة والترجمات (عربي / إنجليزي)
  const t = {
    ar: {
      title: "مواقيت الصلاة",
      cityLabel: "المدينة المعروضة:",
      currentLoc: "موقعك الحالي 📍",
      selectCity: "اختر محافظة أخرى:",
      dateLabel: "التاريخ",
      gregorian: "الـميـلادي:",
      hijri: "الهـجـري:",
      loading: "جاري تحديث مواقيت الصلاة...",
      nextPrayerLabel: "الصلاة القادمة هي:",
      remainingLabel: "الوقت المتبقي:",
      fajr: "الفجر", dhuhr: "الظهر", asr: "العصر", maghrib: "المغرب", isha: "العشاء",
      am: "ص", pm: "م",
      azkarTitle: "أذكار ما بعد الصلاة 📿",
      closeBtn: "إغلاق ✖" // زر إغلاق النافذة
    },
    en: {
      title: "Prayer Times",
      cityLabel: "Displayed City:",
      currentLoc: "Your Current Location 📍",
      selectCity: "Select another governorate:",
      dateLabel: "Date",
      gregorian: "Gregorian:",
      hijri: "Hijri:",
      loading: "Updating prayer times...",
      nextPrayerLabel: "Next Prayer is:",
      remainingLabel: "Time Remaining:",
      fajr: "Fajr", dhuhr: "Dhuhr", asr: "Asr", maghrib: "Maghrib", isha: "Isha",
      am: "AM", pm: "PM",
      azkarTitle: "Post-Prayer Azkar 📿",
      closeBtn: "Close ✖" // زر إغلاق النافذة
    }
  };

  // مصفوفة تحتوي على قائمة المحافظات وقيمها الخاصة بالـ API
  const cities = [
    { name: { ar: "محافظة مسقط", en: "Muscat Governorate" }, value: "Muscat" },
    { name: { ar: "محافظة مسندم", en: "Musandam Governorate" }, value: "Khasab" },
    { name: { ar: "محافظة ظفار", en: "Dhofar Governorate" }, value: "Salalah" },
    { name: { ar: "محافظة البريمي", en: "Al Buraimi Governorate" }, value: "Buraimi" },
    { name: { ar: "محافظة الداخلية", en: "Ad Dakhiliyah Governorate" }, value: "Nizwa" },
    { name: { ar: "محافظة الظاهرة", en: "Ad Dhahirah Governorate" }, value: "Ibri" },
    { name: { ar: "محافظة شمال الباطنة", en: "Al Batinah North Governorate" }, value: "Sohar" },
    { name: { ar: "محافظة جنوب الباطنة", en: "Al Batinah South Governorate" }, value: "Rustaq" },
    { name: { ar: "محافظة شمال الشرقية", en: "Ash Sharqiyah North Governorate" }, value: "Ibra" },
    { name: { ar: "محافظة جنوب الشرقية", en: "Ash Sharqiyah South Governorate" }, value: "Sur" },
    { name: { ar: "محافظة الوسطى", en: "Al Wusta Governorate" }, value: "Haima" },
  ];


 // مصفوفة نصوص الأذكار المعتمدة والصحيحة باللغتين العربية والإنجليزية
  const postPrayerAzkar = {
    ar: [
      "أَسْتَغْفِرُ اللهَ (ثَلَاثَ مَرَّاتٍ)؛ اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يا ذَا الْجَلَالِ وَالْإِكْرَامِ.",
      "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ.",
      "سُبْحَانَ اللهِ (٣٣ مَرَّةً)، الْحَمْدُ للهِ (٣٣ مَرَّةً)، اللهُ أَكْبَرُ (٣٣ مَرَّةً)، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ."
    ],
    en: [
      "I ask Allah for forgiveness (three times). O Allah, You are Peace and from You comes peace. Blessed are You, Owner of Majesty and Honor.",
      "O Allah, help me to remember You, to give You thanks, and to perform Your worship in the best manner.",
      "Glory be to Allah (33 times), praise be to Allah (33 times), Allah is the Greatest (33 times). There is no true god except Allah alone, Who has no partner; to Him belongs dominion and to Him belongs all praise, and He is Able to do all things."
    ]
  };

  // تأثير جانبي لجلب موقيت الصلاة عند تحميل التطبيق ولغته
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLoading(true);
          try {
            const response = await fetch(
              `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=1`
            );
            const data_Prayar = await response.json();
            if (data_Prayar.data) {
              updateStates(data_Prayar.data);
              setCity("current_location");
            }
          } catch (error) {
            console.error("Error:", error);
          } finally {
            setLoading(false);
          }
        },
        () => { fetchDataByCity(City); }
      );
    } else {
      fetchDataByCity(City);
    }
    
    // تحديد المظهر (يوم / ليل) بناءً على الساعة الحالية
    const currentHour = new Date().getHours();
    setTheme(currentHour >= 18 || currentHour < 5 ? "night" : "day");
  }, [lang]);

  // تأثير جانبي لتشغيل عداد تحديث الوقت المتبقي للصلاة القادمة ثانية بثانية
  useEffect(() => {
    if (Object.keys(prayarTimes).length === 0) return;

    const timer = setInterval(() => {
      calculateCountdown(prayarTimes);
    }, 1000);

    return () => clearInterval(timer); 
  }, [prayarTimes, lang]);

  // دالة لجلب البيانات من الـ API بناءً على اسم المدينة المختارة يدوياً
  const fetchDataByCity = async (cityName) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${cityName}&country=Oman&method=1`
      );
      const data_Prayar = await response.json();
      if (data_Prayar.data) {
        updateStates(data_Prayar.data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // دالة تحديث حالات التاريخ والوقت، وتدعم تحويل الأرقام والشهور ديناميكياً للغة العربية
  const updateStates = (data) => {
    setPrayarTimes(data.timings);
    
    let gregorian = data.date.readable;
    const hijri = data.date.hijri;
    const monthName = lang === "ar" ? hijri.month.ar : hijri.month.en;
    let hijriFull = `${hijri.day} ${monthName} ${hijri.year}`;

    if (lang === "ar") {
      const monthsMap = {
        Jan: "يناير", Feb: "فبراير", Mar: "مارس", Apr: "أبريل",
        May: "مايو", Jun: "يونيو", Jul: "يوليو", Aug: "أغسطس",
        Sep: "سبتمبر", Oct: "أكتوبر", Nov: "نوفمبر", Dec: "ديسمبر"
      };

      Object.keys(monthsMap).forEach(engMonth => {
        if (gregorian.includes(engMonth)) {
          gregorian = gregorian.replace(engMonth, monthsMap[engMonth]);
        }
      });

      gregorian = gregorian.replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
      hijriFull = hijriFull.replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
    }

    setdateTimes(gregorian);
    setHijriDate(hijriFull);
    calculateCountdown(data.timings);
  };

  // دالة برمجية لحساب اسم الصلاة القادمة وإيجاد فارق التوقيت الحي لها
  const calculateCountdown = (timings) => {
    const now = new Date();
    const prayersList = [
      { id: "fajr", name: t[lang].fajr, time: timings.Fajr },
      { id: "dhuhr", name: t[lang].dhuhr, time: timings.Dhuhr },
      { id: "asr", name: t[lang].asr, time: timings.Asr },
      { id: "maghrib", name: t[lang].maghrib, time: timings.Maghrib },
      { id: "isha", name: t[lang].isha, time: timings.Isha },
    ];

    let next = null;

    for (let prayer of prayersList) {
      if (!prayer.time) continue;
      const [hours, minutes] = prayer.time.split(":").map(Number);
      const prayerDate = new Date();
      prayerDate.setHours(hours, minutes, 0, 0);

      if (prayerDate > now) {
        next = { name: prayer.name, date: prayerDate };
        break;
      }
    }

    if (!next) {
      const [hours, minutes] = timings.Fajr.split(":").map(Number);
      const tomorrowFajr = new Date();
      tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
      tomorrowFajr.setHours(hours, minutes, 0, 0);
      next = { name: t[lang].fajr, date: tomorrowFajr };
    }

    const diff = next.date - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    let formattedCountdown = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    if (lang === "ar") {
      formattedCountdown = formattedCountdown.replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
    }

    setNextPrayerName(next.name);
    setRemainingTime(formattedCountdown);
  };

  // معالج حدث تغيير المحافظة
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    if(selectedCity !== "current_location") {
      fetchDataByCity(selectedCity);
    }
  };

  // دالة لتنسيق أرقام ومواقيت البطاقات
  const formatTimes = (time) => {
    if (!time || loading) return "--:--";
    let [hours, minutes] = time.split(":").map(Number);
    const perd = hours >= 12 ? t[lang].pm : t[lang].am;
    hours = hours % 12 || 12;
    
    const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    
    if (lang === "ar") {
      return timeString.replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]) + " " + perd;
    }
    
    return `${timeString} ${perd}`;
  };

  // دالة لجلب الاسم النصي للمدينة المعروضة حالياً
  const getDisplayedCityName = () => {
    if (City === "current_location") return t[lang].currentLoc;
    const found = cities.find(c => c.value === City);
    return found ? found.name[lang] : City;
  };

  return (
    <section className={`container_sec ${theme}`} style={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
      
      {/* زر تغيير اللغة العلوي */}
      <button className="lang-btn" onClick={() => setLang(lang === "ar" ? "en" : "ar")}>
        {lang === "ar" ? "English" : "العربية"}
      </button>

      <div className="container">
        {/* عنوان واجهة التطبيق الرئيسي */}
        <h1 className="main-title">{t[lang].title}</h1>

        {/* كارت الصلاة القادمة والعداد التنازلي الحي */}
        {!loading && nextPrayerName && (
          <div className="next-prayer-container">
            <div className="prayer-badge-title">
              {t[lang].nextPrayerLabel} <span className="highlight-prayer">{nextPrayerName}</span>
            </div>
            <div className="countdown-timer">
              <span className="timer-label">{t[lang].remainingLabel}</span>
              <span className="timer-digits">{remainingTime}</span>
            </div>
          </div>
        )}

        {/* قسم بيانات واختيار المدينة والتاريخ */}
        <div className="top_sec">
          <div className="city">
            <h3>{t[lang].cityLabel}</h3>
            <span className="current-city-badge">{getDisplayedCityName()}</span>
            <br />
            <select value={City} onChange={handleCityChange}>
              {City === "current_location" && (
                <option value="current_location">{t[lang].currentLoc}</option>
              )}
              <option disabled>{t[lang].selectCity}</option>
              {cities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.name[lang]}
                </option>
              ))}
            </select>
          </div>

          <div className="date">
            <h3>{t[lang].dateLabel}</h3>
            <h4>{t[lang].gregorian} <span className="date-val">{loading ? "..." : dateTimes}</span></h4>
            <h4 className="hijri">{t[lang].hijri} <span className="date-val">{loading ? "..." : hijriDate}</span></h4>
          </div>
        </div>

        {/* كروت عرض أوقات الصلاة الخمس أو رسالة جاري التحميل */}
        {loading ? (
          <div className="loader">{t[lang].loading}</div>
        ) : (
          <div className="prayers-list">
            <Prayar name={t[lang].fajr} time={formatTimes(prayarTimes.Fajr)} />
            <Prayar name={t[lang].dhuhr} time={formatTimes(prayarTimes.Dhuhr)} />
            <Prayar name={t[lang].asr} time={formatTimes(prayarTimes.Asr)} />
            <Prayar name={t[lang].maghrib} time={formatTimes(prayarTimes.Maghrib)} />
            <Prayar name={t[lang].isha} time={formatTimes(prayarTimes.Isha)} />
          </div>
        )}

        {/* التحديث الجديد: كلمة "الأذكار" قابلة للضغط لفتح النافذة */}
        {!loading && (
          <div className="azkar-trigger-container">
            <button className="azkar-toggle-link" onClick={() => setShowAzkarModal(true)}>
              {t[lang].azkarTitle}
            </button>
          </div>
        )}

      </div>

      {/* النافذة المنبثقة للأذكار (Modal) */}
      {!loading && showAzkarModal && (
        <div className="azkar-modal-overlay" onClick={() => setShowAzkarModal(false)}>
          {/* تم إضافة stopPropagation لمنع انغلاق النافذة عند الضغط بداخل الكارت نفسه */}
          <div className="azkar-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="azkar-title">{t[lang].azkarTitle}</h3>
            <div className="azkar-list">
              {postPrayerAzkar[lang].map((zikr, index) => (
                <div key={index} className="zikr-card">
                  <p>{zikr}</p>
                </div>
              ))}
            </div>
            <button className="azkar-close-btn" onClick={() => setShowAzkarModal(false)}>
              {t[lang].closeBtn}
            </button>
          </div>
        </div>
      )}

    </section>
  );
}

export default App;
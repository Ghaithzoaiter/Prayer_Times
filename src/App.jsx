import {  useEffect, useState } from "react"
import Prayer from "./components/Prayer"



function App() {

  
  const [Hdate, setHdate] = useState("");
  const [day, setDay] = useState("");
  const [hijri, sethijri] = useState("");
  const [prayerTimes, setPrayerTimes] = useState({});
  const [dateapi, setDateapi] = useState("");
  const [city,setcity] =useState("Damascus")

  const cities = [
    { value: "Damascus", name: "دمشق" },
    { value: "Rif Dimashq", name: "ريف دمشق" },
    { value: "Aleppo", name: "حلب" },
    { value: "Homs", name: "حمص" },
    { value: "Hama", name: "حماة" },
    { value: "Latakia", name: "اللاذقية" },
    { value: "Tartus", name: "طرطوس" },
    { value: "Idlib", name: "إدلب" },
    { value: "Deir ez-Zor", name: "دير الزور" },
    { value: "Hasakah", name: "الحسكة" },
    { value: "Raqqa", name: "الرقة" },
    { value: "Daraa", name: "درعا" },
    { value: "As-Suwayda", name: "السويداء" },
    { value: "Quneitra", name: "القنيطرة" },

  ];
  
// console.log(city)


  useEffect(() => {

    const fetchPrayerTimes = async () => {
      try {
        const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Syria&method=4`
        );
        const data_prayer = await res.json();

        setPrayerTimes(data_prayer.data.timings)
        setDateapi(data_prayer.data.date.gregorian.date)
        setDay(data_prayer.data.date.hijri.weekday.ar)
        sethijri(data_prayer.data.date.hijri.month.ar)
        setHdate(data_prayer.data.date.hijri.date)
        console.log(data_prayer.data)


      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };
    fetchPrayerTimes();
  }, [city]);

  const convertTo12Hour = (Time) => {
    if(Time){
      let [hours, minutes] = Time.split(":").map(Number)
      const period  = hours >= 12? "PM" : "AM";
      hours = hours % 12 || 12;
      return`${hours}:${minutes < 10 ? "0" + minutes: minutes} ${period }`
    }
}
  
  return (
<section>
    <div className="container">
      <div className="day">
        <h3>  اليوم:{day} </h3>
        <h4> شهر :{hijri}</h4>
        <h4> {Hdate}ـه</h4>
      </div>
      <div className="top_section">
        
        <div className="city">
          <h3>المدينة</h3>
          <select name="" id="" onChange={(e) => setcity(e.target.value)}>
          {cities.map((city, index) => (
            <option key={index} value={city.value}>
              {city.name}
            </option>
          ))}
        </select>

        </div>
        <div className="date">
          
          <h3>التاريخ </h3>
          <h4>{dateapi}  ـم </h4>
      
        </div>

      </div>

    <Prayer Name="الفجر:" times={convertTo12Hour (prayerTimes.Fajr)}/>
    <Prayer Name="الظهر:" times={convertTo12Hour (prayerTimes.Dhuhr)}/>
    <Prayer Name="العصر:" times={convertTo12Hour (prayerTimes.Asr)}/>
    <Prayer Name="المعرب:" times={convertTo12Hour (prayerTimes.Maghrib)}/>
    <Prayer Name="العشاء:" times={convertTo12Hour (prayerTimes.Isha)}/>

    </div>
          
</section>
  )
}

export default App

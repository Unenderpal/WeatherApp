import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const api_key = "987e654542153cf5d9437ad6b5bbdc1a";
  const [city, setCity] = useState("");
  const [weatherdata, setWeatherdata] = useState(null);
  const [value, setvalue] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getweatherdata() {
      try {
        setLoading(true);
        const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
        const resp = await fetch(weather_url);
        const data = await resp.json();
        console.log(data);
        setWeatherdata(data);
      }
      catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    if (city.trim()) {
      getweatherdata();
    }

  }, [city])


  const { main, name, wind } = weatherdata ? weatherdata : {};
  return (
    <div className='flex items-center justify-center font-serif flex-col h-[100vh] w-[100vw]  bg-fuchsia-950 gap-12'>
      <div className='flex justify-start items-center text-[80px]'>Weather App</div>
      {/* {JSON.stringify(main)} */}
      <div className='flex  gap-3 '>
        <input className='px-1 py-1 rounded-lg ' placeholder='enter city' type="text" value={value} onChange={(e) => setvalue(e.target.value)} />

        <button className='border border-e-violet-100 px-1 py-1 rounded-lg  bg-gray-300' onClick={() => setCity(value)}>change city</button> </div>

      {weatherdata && weatherdata?.cod < 400 && <> <div className='w-[300px] h-[300px] text-[30px] flex items-center justify-center flex-col gap-7 bg-green-300 px-1 py-1 rounded-lg '>
        {loading && <p className='text-[20px]'>Loading...</p>}
        {weatherdata?.cod > 400 && <p className='text-[20px]'>City not found</p>}
        {name}
        <p > temp:{main?.temp}</p>
        <p > wind:{wind?.speed}</p>
        <p > humidity:{main?.humidity}</p>
      </div>  </>}


    </div>
  )
}

export default App

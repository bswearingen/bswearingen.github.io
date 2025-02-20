import { useState, useEffect } from "react";
import { convertHistoricalHospitalizationData } from "./dataParsing.jsx"
import { QuebecMap } from './QuebecMap.jsx';
import { SpotlightPane } from './SpotlightPane.jsx';
import { today } from '@internationalized/date';
import { Header } from './Header.jsx';

function App() {
  const [data, setData] = useState([]);
  const [sliderIndex, setSliderIndex] = useState(0);
    // Properties:
    //  - RSS_code - ID
    //  - RSS_nom
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [language, setLanguage] = useState("french");
  const [range, setRange] = useState({
    start: today().subtract({years: 1}),
    end: today()
  });

  const dateRange = [...new Set(data.map(s=> s.date.getTime()))].map(d => new Date(d)).sort((a,b) => a.getTime() - b.getTime());
  const errorText = language === "english" ? "Network Error" : "Erreur de réseau";

  useEffect(() => {
    const url = 'https://www.donneesquebec.ca/recherche/api/3/action/datastore_search_sql?sql='
    const query = 'SELECT * FROM "2d8bd4f8-4715-4f33-8cb4-eefcec60a4c9" WHERE "Date" BETWEEN \'' + range.start.toString() + '\' AND \'' + range.end.toString() + '\'';
    try {
      fetch(url+query)
      .then((res) => {
        if(!res.ok){
          throw new Error(errorText);
        }
        return res.json();
      })
      .then((json) => {
        let parsed_result = convertHistoricalHospitalizationData(json.result.records)
        setData(parsed_result);
        let dates = [...new Set(parsed_result.map(s=> s.date.getTime()))].map(d => new Date(d));
        setSliderIndex(dates.length - 1);
    });
    } catch (error) {
      console.error(error.message);
    }
  }, [range, errorText]);

  return (
    <>
      <div
        className="header-map-group">
        <Header
          dateRange={dateRange}
          language={language}
          range={range}
          sliderIndex={sliderIndex}
          setRange={setRange}
          setLanguage={setLanguage}
          setSliderPosition={setSliderIndex}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        <QuebecMap
          data={data}
          date={dateRange[sliderIndex]}
          regionSelector={setSelectedRegion}
          selectedRegion={selectedRegion}/>
      </div>
      <SpotlightPane
        data={data}
        date={dateRange[sliderIndex]}
        selectedRegion={selectedRegion}
        sliderPosition={sliderIndex}
        setSliderPosition={setSliderIndex}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setSelectedRegion={setSelectedRegion}/>
    </>
  )
}

export default App

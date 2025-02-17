import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { scaleQuantile } from "d3-scale";
import { Legend } from "./Legend"

export function QuebecMap( { data, date, regionSelector, selectedRegion }){
    if(!data || data.length === 0 || !date) return null;

    const handleGeographyClick = (event, properties) => {
        regionSelector([Number(properties["RSS_code"]), properties["RSS_nom"]]);
    };

    // TODO: Find a purposeful color scale
    const colorScale = scaleQuantile()
    .domain(data.map(d => d.hospitalizations))
    .range([
      "#ffedea",
      "#ffcec5",
      "#ffad9f",
      "#ff8a75",
      "#ff5533",
      "#e2492d",
      "#be3d26",
      "#9a311f",
      "#782618"
    ]);

    return (
        <div className="map-legend-container">
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                center: [-70, 54.8], // TODO: Lock the max at this center/scale
                scale: 1475
                }}
                width={800}
                height={800}
                className='map-container'
            >
                <ZoomableGroup
                    translateExtent={[
                        [0, 0],
                        [800, 800]
                    ]}
                >
                    <Geographies geography="src/assets/Territoires_RSS_2024.json">
                        {({ geographies }) =>
                        geographies.map(geo => {
                            const cur = data.find(s => {
                                return  s.date.getFullYear() === date.getFullYear() &&
                                        s.date.getMonth() === date.getMonth() &&
                                        s.date.getDate() === date.getDate() &&
                                        s.id === Number(geo.properties.RSS_code);
                            });
                            let isSelectedRegion = selectedRegion && Number(geo.properties.RSS_code) === selectedRegion[0];                       
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={cur ? colorScale(cur.hospitalizations) : "#EEE"}
                                    stroke={isSelectedRegion ? "#111314": null}
                                    onClick={e => handleGeographyClick(e, geo.properties, cur.hospitalizations)}
                                    style={{
                                        default: {
                                            outline: 'none'
                                        },
                                        hover: {
                                            outline: 'none'
                                        },
                                        pressed: {
                                            outline: 'none'
                                        }
                                    }}
                                />
                            );
                        })}
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
            <Legend scale={colorScale}/>
        </div>
    );
}
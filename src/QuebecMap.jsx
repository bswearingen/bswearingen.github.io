import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { scaleQuantile } from "d3-scale";
import { Legend } from "./Legend"
import geographyUrl from "./assets/Territoires_RSS_2024.json"
import PropTypes from 'prop-types';

QuebecMap.propTypes = {
    data: PropTypes.array, 
    date: PropTypes.date,
    regionSelector: PropTypes.func, 
    selectedRegion: PropTypes.object
}

export function QuebecMap( { data, date, regionSelector, selectedRegion }){
    if(!data || data.length === 0 || !date) return null;

    const style = window.getComputedStyle(document.body);
    const mediumDarkColor = style.getPropertyValue('--medium-dark');
    const mediumLightColor = style.getPropertyValue('--medium-light');
    
    const handleGeographyClick = (event, properties) => {
        regionSelector([Number(properties["RSS_code"]), properties["RSS_nom"]]);
    };

    const colorScale = scaleQuantile()
    .domain(data.map(d => d.hospitalizations))
    .range([
      "#fee5d9",
      "#fcbba1",
      "#fc9272",
      "#fb6a4a",
      "#de2d26",
      "#a50f15"
    ]);

    return (
        <div className="map-legend-container">
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                center: [-70, 54.8],
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
                    <Geographies geography={geographyUrl}>
                        {({ geographies }) => {
                            if(selectedRegion){
                                // Selected region should be painted last so the border color shows
                                let index = geographies.findIndex(g => Number(g.properties.RSS_code) === selectedRegion[0])
                                geographies.push(geographies.splice(index, 1)[0]);
                            }
                            return geographies.map(geo => {
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
                                        stroke={isSelectedRegion ? mediumLightColor: mediumDarkColor}
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
                            });
                        }}
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
            <Legend scale={colorScale}/>
        </div>
    );
}
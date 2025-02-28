import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Button } from 'react-aria-components';
import { useState } from "react";
import PropTypes from 'prop-types';

SpotlightPane.propTypes = {
    data: PropTypes.array, 
    selectedRegion: PropTypes.number,
    sliderPosition: PropTypes.number,
    setSliderPosition: PropTypes.func,
    setIsPlaying: PropTypes.func,
    setSelectedRegion: PropTypes.func
}

const CustomTooltip = ({active, payload, label}) => {
    if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip">
            <h3 className="label">{`${label} : ${payload[0].value}`}</h3>
          </div>
        );
      }
}

CustomTooltip.propTypes = {
    active: PropTypes.bool, 
    payload: PropTypes.array,
    label: PropTypes.string
}

export function SpotlightPane( { data, selectedRegion, sliderPosition, setSliderPosition, setIsPlaying, setSelectedRegion }){
    const [isMouseInSpotlight, setIsMouseInSpotlight] = useState(false);
    if(!data || data.length === 0) return null;

    const style = window.getComputedStyle(document.body);
    const accentColor = style.getPropertyValue('--accent-color');
    const orangeColor = style.getPropertyValue('--orange');

    const filterID = selectedRegion ? selectedRegion[0] : 99;
    const title = selectedRegion ? selectedRegion[1] : "Québec";
    const region_data = data.filter(s => {
        return s.id === filterID;
    }).sort((a,b) => a.date - b.date);

    return (
        <>
            <div className='spotlight-pane'>
                <div className="spotlight-title">
                    <Button
                        onPress={() => {setSelectedRegion(null);}}
                        isDisabled={!selectedRegion}
                    >✖</Button>
                    <h2>{title}</h2>
                </div>
                <div className='spotlight-graph'
                    onMouseLeave={() => {setIsMouseInSpotlight(false);}}
                    onMouseEnter={() => {setIsMouseInSpotlight(true);}}>
                    <ResponsiveContainer width="99%" height="99%">
                        <AreaChart 
                            data={region_data} 
                            margin={{ top: 20, right: 10, }}
                            onClick={(e) => {
                                if(Object.keys(e).length > 0){
                                    setSliderPosition(e.activeTooltipIndex);
                                    setIsPlaying(false);
                                    setIsMouseInSpotlight(false);
                                }
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date_str"/>
                            <YAxis />
                            <Tooltip 
                                content={
                                    <CustomTooltip/>
                                }
                                defaultIndex={isMouseInSpotlight ? null : sliderPosition}
                                isAnimationActive={false}
                            />
                            <Area
                                type="monotone"
                                dataKey="hospitalizations"
                                stroke={orangeColor}
                                fill={accentColor}
                                isAnimationActive={false}
                            >
                            </Area>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
}
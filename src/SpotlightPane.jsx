import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Button } from 'react-aria-components';
import { useState } from "react";

const CustomTooltip = ({active, payload, label, sliderPosition}) => {
    if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip">
            <p className="label">{`${label} : ${payload[0].value}`}</p>
            <p className="desc">Anything you want can be displayed here.</p>
          </div>
        );
      }
}

export function SpotlightPane( { data, selectedRegion, sliderPosition, setSliderPosition, setIsPlaying, setSelectedRegion }){
    if(!selectedRegion) return null;

    const [isMouseInSpotlight, setIsMouseInSpotlight] = useState(false);
    const region_data = data.filter(s => {
        return s.id === selectedRegion[0];
    }).sort((a,b) => a.date - b.date);

    return (
        <>
            <div className='spotlight-pane'>
                <div className="spotlight-title">
                    <Button
                        onPress={() => {setSelectedRegion(null);}}
                    >✖</Button>
                    <h2>{selectedRegion[1]}</h2>
                </div>
                <ResponsiveContainer width={"99%"} height={300}>
                    <AreaChart 
                        data={region_data} 
                        margin={{ top: 20, right: 10, }}
                        onMouseMove={() => {setIsMouseInSpotlight(true);}}
                        onMouseLeave={() => {setIsMouseInSpotlight(false);}}
                        onClick={(e) => {
                            if(Object.keys(e).length > 0){
                                setSliderPosition(e.activeTooltipIndex);
                                setIsPlaying(false);
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
                        />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="hospitalizations"
                            stroke="#34454c"
                            fill="#b6bfc1"
                            isAnimationActive={false}
                        >
                        </Area>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}
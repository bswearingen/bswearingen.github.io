import { useRef, useEffect } from "react";
import { Button, ToggleButton, Slider, SliderTrack, SliderThumb } from "react-aria-components";

export function DateSlider( { isPlaying, language, sliderIndex, sliderMax, setIsPlaying, setSliderPosition }){
    const speed = useRef(100);
    const advance = useRef(1);
    const timeoutID = useRef();

    const sliderLabel = language === "english" ? "Date control slider" : "Curseur de contrôle de la date";
    function playMap(currentIndex){
        clearTimeout(timeoutID.current);
        if(!isPlaying){
            return;
        }

        const nextIndex = currentIndex + advance.current;
        if(nextIndex < sliderMax){
            setSliderPosition(nextIndex);
            timeoutID.current = setTimeout(() => {
                playMap(nextIndex);
            }, speed.current);
        } else {
            setSliderPosition(sliderMax);
            setIsPlaying(false);
        }
    }
    
    useEffect(() => {
        playMap(sliderIndex);
    }, [isPlaying]);

    return <div className="slider-group">
        <Slider
            aria-label={sliderLabel}
            minValue={0}
            maxValue={sliderMax}
            value={sliderIndex}
            onChange={(value) => {
                setIsPlaying(false);
                setSliderPosition(value);
            }}
        >
            <SliderTrack>
                <SliderThumb/>
            </SliderTrack>
        </Slider>
        <div className="slider-controls">
            <div
                className="slider-play-controls"
            >
                <ToggleButton
                    onPress={e => {
                        setIsPlaying(cur => !cur);
                    }}
                    isSelected={isPlaying}
                >⏯</ToggleButton>
                <Button
                    onPress={e => {
                        setIsPlaying(false);
                        setSliderPosition(0);
                    }}
                >⏮</Button>
            </div>
            {/* TODO: Finalize a speed control algorithm */}
            <div className="slider-speed-controls">
                <Button
                    onPress={ () => {
                        if(advance.current > 1){
                            advance.current = 1;
                        } else {
                            speed.current = speed.current * 10;
                        }
                    }}
                >⏷</Button>
                <Button
                    onPress={ () => {
                        advance.current = 1;
                        speed.current = 100;
                        playMap(sliderIndex);
                    }}
                >↺</Button>
                <Button
                    onPress={ () => {
                        if(speed.current > 1){
                            speed.current = Math.floor(speed.current / 10);
                        } else {
                            advance.current += 1;
                        }
                        playMap(sliderIndex);
                    }}
                >⏶</Button>
            </div>
        </div>
    </div>
}
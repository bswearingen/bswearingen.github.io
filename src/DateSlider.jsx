import { useRef, useEffect, useState } from "react";
import { Button, ToggleButton, Slider, SliderTrack, SliderThumb } from "react-aria-components";
import PropTypes from 'prop-types';

DateSlider.propTypes = {
    isPlaying: PropTypes.bool,
    language: PropTypes.string,
    sliderIndex: PropTypes.number,
    sliderMax: PropTypes.number,
    setIsPlaying: PropTypes.func,
    setSliderPosition: PropTypes.func
};
export function DateSlider( { isPlaying, language, sliderIndex, sliderMax, setIsPlaying, setSliderPosition }){
    const speed = useRef(160);
    const timeoutID = useRef();
    const [isFastFowarding, setIsFastForwarding] = useState(false);
    const [isRewinding, setIsRewinding] = useState(false);

    const sliderLabel = language === "english" ? "Date control slider" : "Curseur de contrôle de la date";
    function playMap(currentIndex){
        clearTimeout(timeoutID.current);
        if(!isPlaying && !isFastFowarding && !isRewinding){
            return;
        }

        const nextIndex = !isRewinding ? currentIndex + 1 : currentIndex - 1;
        const timeout = isFastFowarding || isRewinding ? 40: 160;
        if(nextIndex < sliderMax && nextIndex >= 0){
            setSliderPosition(nextIndex);
            timeoutID.current = setTimeout(() => {
                playMap(nextIndex);
            }, timeout);
        } else {
            const clamp = !isRewinding ? sliderMax : 0;
            setSliderPosition(clamp);
            setIsPlaying(false);
            setIsFastForwarding(false);
            setIsRewinding(false);
        }
    }
    
    useEffect(() => {
        playMap(sliderIndex);
    }, [isPlaying, isFastFowarding, isRewinding]);

    return <div className="slider-group">
        <Slider
            aria-label={sliderLabel}
            minValue={0}
            maxValue={sliderMax}
            value={sliderIndex}
            onChange={(value) => {
                setIsPlaying(false);
                if(!isNaN(value)) setSliderPosition(value);
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
                <Button
                    onPress={() => {
                        setIsPlaying(false);
                        setIsRewinding(false);
                        setIsFastForwarding(false);
                        setSliderPosition(0);
                    }}
                >⏮</Button>
                <ToggleButton
                    onChange={() => {
                        setIsFastForwarding(false);
                        setIsPlaying(cur => !cur);
                        setIsRewinding(false);
                    }}
                    isSelected={isPlaying}
                >⏵</ToggleButton>
            </div>
            <div className="slider-speed-controls">
                <ToggleButton
                    onChange={() => {
                        setIsRewinding(cur => !cur);
                        setIsFastForwarding(false);
                        setIsPlaying(false);
                    }}
                    isSelected={isRewinding}
                >&#x23EA;&#xfe0e;</ToggleButton>
                <ToggleButton
                    onChange={() => {
                        setIsFastForwarding(cur => !cur);
                        setIsPlaying(false);
                        setIsRewinding(false);
                    }}
                    isSelected={isFastFowarding}
                >&#x23E9;&#xfe0e;</ToggleButton>
            </div>
        </div>
    </div>
}
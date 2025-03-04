import { Button, CalendarCell, CalendarGrid, DateInput, DateRangePicker, DateSegment, Dialog, Group, Heading, Popover, RangeCalendar, Text} from 'react-aria-components';
import { DateSlider } from "./DateSlider";
import { parseDate, today } from "@internationalized/date";
import PropTypes from 'prop-types';

Header.propTypes = {
    dateRange: PropTypes.array,
    language: PropTypes.string,
    range: PropTypes.object,
    sliderIndex: PropTypes.number,
    setRange: PropTypes.func,
    setSliderPosition: PropTypes.func,
    isPlaying: PropTypes.bool,
    setIsPlaying: PropTypes.func
}

export function Header({ dateRange, language, range, sliderIndex, setRange, setSliderPosition, isPlaying, setIsPlaying }) {
    const title = language === "english" ? "Number of COVID hospitalizations for: " : "Nombre d'hospitalisations liées à la COVID au ";
    const loading = language === "english" ? "Loading..." : "La page se charge...";
    const dateSelectorLabel = language === "english" ? "Date Range Selector" : "Sélecteur de plage de dates";
    return <>
        <div className='header'>
            <div className='header-controls'>
                <div className='header-date-controls'>
                    <DateRangePicker
                        aria-label={dateSelectorLabel}
                        value={range}
                        onChange={setRange}
                        minValue={parseDate('2020-03-03')}
                        maxValue={today()}
                    >
                        <Group>
                            <DateInput slot="start">
                            {(segment) => <DateSegment segment={segment} />}
                            </DateInput>
                            <span aria-hidden="true">–</span>
                            <DateInput slot="end">
                            {(segment) => <DateSegment segment={segment} />}
                            </DateInput>
                            <Button>▼</Button>
                        </Group>
                        <Popover>
                            <Dialog>
                            <RangeCalendar>
                                <header>
                                <Button slot="previous">◀</Button>
                                <Heading />
                                <Button slot="next">▶</Button>
                                </header>
                                <CalendarGrid>
                                {(date) => <CalendarCell date={date} />}
                                </CalendarGrid>
                            </RangeCalendar>
                            </Dialog>
                        </Popover>
                        <Text slot="errorMessage" />
                    </DateRangePicker>
                </div>
                <DateSlider
                    setSliderPosition={setSliderPosition}
                    sliderMax={dateRange.length - 1}
                    sliderIndex={sliderIndex}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    range={range}
                    setRange={setRange}
                    language={language}/>
            </div>
            <h1 className='header-title'>{dateRange.length && dateRange[sliderIndex] != null ? title + dateRange[sliderIndex].toISOString().slice(0, 10) : loading}</h1>
        </div>
    </>;
}
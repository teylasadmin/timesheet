import React from 'react'
import {useState} from 'react';
import Helmet from 'react-helmet';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
//import styles from './dateRange.module.css';

const getWeekDays = (weekStart) => {
  const days = [weekStart];
  for (let i = 1; i < 7; i += 1) {
    days.push(
      moment(weekStart)
        .add(i, 'days')
        .toDate()
    );
  }
  return days;
}

const getWeekRange = (date) => {
  return {
    from: moment(date)
      .startOf('isoWeek')
      .toDate(),
    to: moment(date)
      .endOf('isoWeek')
      .toDate(),
  };
}

export default function DateRange(props) {

  const [hoverRange, setHoverRange] = useState(undefined);
  const [selectedDays, setSelectedDays] = useState([]);


  const handleDayChange = date => {
    setSelectedDays(getWeekDays(getWeekRange(date).from));
  };

  const handleDayEnter = date => {
    setHoverRange(getWeekRange(date));
  };

  const handleDayLeave = () => {
    setHoverRange(undefined);
  };

  const handleWeekClick = (weekNumber, days, e) => {
    setSelectedDays(days);
    // here passing date range to parent component
  };

    const daysAreSelected = selectedDays.length > 0;

    const modifiers = {
      hoverRange,
      selectedRange: daysAreSelected && {
        from: selectedDays[0],
        to: selectedDays[6],
      },
      hoverRangeStart: hoverRange && hoverRange.from,
      hoverRangeEnd: hoverRange && hoverRange.to,
      selectedRangeStart: daysAreSelected && selectedDays[0],
      selectedRangeEnd: daysAreSelected && selectedDays[6],
    };

    return (
      <div className="SelectedWeek">
        <DayPicker
          selectedDays={selectedDays}
          showWeekNumbers
          firstDayOfWeek={1}
          showOutsideDays
          modifiers={modifiers}
          onDayClick={handleDayChange}
          onDayMouseEnter={handleDayEnter}
          onDayMouseLeave={handleDayLeave}
          onWeekClick={handleWeekClick}
        />
        {selectedDays.length === 7 && (
          <div>
            {
               props.selectedDate(moment(selectedDays[0]).format('YYYY/MM/DD'))
            }
            {
               props.closeModalCallback()
            }
            {moment(selectedDays[0]).format('LL')} –{' '}
            {moment(selectedDays[6]).format('LL')}

          </div>
        )}

        <Helmet>
          <style>{`
            .SelectedWeek .DayPicker-Month {
              border-collapse: separate;
            }
            .SelectedWeek .DayPicker-WeekNumber {
              outline: none;
            }
            .SelectedWeek .DayPicker-Day {
              outline: none;
              border: 1px solid transparent;
            }
            .SelectedWeek .DayPicker-Day--hoverRange {
              background-color: #EFEFEF !important;
            }

            .SelectedWeek .DayPicker-Day--selectedRange {
              background-color: #fff7ba !important;
              border-top-color: #FFEB3B;
              border-bottom-color: #FFEB3B;
              border-left-color: #fff7ba;
              border-right-color: #fff7ba;
            }

            .SelectedWeek .DayPicker-Day--selectedRangeStart {
              background-color: #FFEB3B !important;
              border-left: 1px solid #FFEB3B;
            }

            .SelectedWeek .DayPicker-Day--selectedRangeEnd {
              background-color: #FFEB3B !important;
              border-right: 1px solid #FFEB3B;
            }

            .SelectedWeek .DayPicker-Day--selectedRange:not(.DayPicker-Day--outside).DayPicker-Day--selected,
            .SelectedWeek .DayPicker-Day--hoverRange:not(.DayPicker-Day--outside).DayPicker-Day--selected {
              border-radius: 0 !important;
              color: black !important;
            }
            .SelectedWeek .DayPicker-Day--hoverRange:hover {
              border-radius: 0 !important;
            }
          `}</style>
        </Helmet>
      </div>
    );

}
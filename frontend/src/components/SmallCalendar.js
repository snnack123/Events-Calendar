import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs'
import { getMonth } from '../utilities';

export default function SmallCalendar() {
    const dispatch = useDispatch();
    const monthIndex = useSelector((state) => state.events.monthIndex);
    const daySelected = useSelector((state) => state.events.daySelected);
    const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
    const [currentMonth, setCurrentMonth] = useState(getMonth());

    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIdx));
    }, [currentMonthIdx]);

    useEffect(() => {
        setCurrentMonthIdx(monthIndex);
    }, [monthIndex])

    function handlePrevMonth() {
        setCurrentMonthIdx(currentMonthIdx - 1);
    }

    function handleNextMonth() {
        setCurrentMonthIdx(currentMonthIdx + 1);
    }

    function setSmallCalendarMonth() {
        dispatch({ type: 'events/setMonthIndex', payload: currentMonthIdx });
    }

    function getDayClass(day) {
        const format = "DD-MM-YY";
        const nowDay = dayjs().format(format);
        const currDay = day.format(format);
        const slcDay = daySelected && daySelected.format(format);
        if (nowDay === currDay) {
            return "bg-blue-500 rounded-full text-white";
        } else if (currDay === slcDay) {
            return 'bg-blue-100 rounded-full text-blue-600 font-bold';
        } else {
            return "";
        }
    }

    return (
        <div className='mt-9'>
            <header className='flex justify-between'>
                <p className="text-gray-500 font-bold">
                    {dayjs(new Date(dayjs().year(), currentMonthIdx)).format('MMMM YYYY')}
                </p>
                <div>
                    <button onClick={handlePrevMonth}>
                        <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
                            chevron_left
                        </span>
                    </button>
                    <button onClick={handleNextMonth}>
                        <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
                            chevron_right
                        </span>
                    </button>
                </div>
            </header>
            <div className='grid grid-cols-7 grid-rows-6'>
                {currentMonth[0].map((day, i) => (
                    <span key={i} className="text-sm py-1 text-center font-bold">
                        {day.format("dd").charAt(0)}
                    </span>
                ))}
                {currentMonth.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((day, idx) => (
                            <button key={idx} className={`py-1 w-full ${getDayClass(day)}`}
                                onClick={() => {
                                    setSmallCalendarMonth();
                                    dispatch({ type: 'events/setDaySelected', payload: day });
                                }}>
                                <span className="text-sm">{day.format("D")}</span>
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div >
    )
}

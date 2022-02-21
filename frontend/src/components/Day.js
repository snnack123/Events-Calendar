import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs'

export default function Day({ day, rowIdx }) {
    const dispatch = useDispatch();
    const savedEvents = useSelector((state) => state.events.savedEvents);
    const [dayEvents, setDayEvents] = useState([]);

    function getCurrentDayClass() {
        return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? 'bg-blue-600 text-white rounded-full w-7' : '';
    }

    function setSelectedEvent(evt) {
        dispatch({ type: 'events/setSelectedEvent', payload: evt });
    }

    useEffect(() => {
        const events = savedEvents.filter(
            (evt) =>
                dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
        );
        setDayEvents(events);
    }, [savedEvents, day]);

    return (
        <div className='border border-gray-200 flex flex-col'>
            <header className='flex flex-col items-center'>
                {rowIdx === 0 &&
                    (<p className='text-sm mt-1'>
                        {day.format('ddd').toUpperCase()}
                    </p>)
                }
                <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
                    {day.format('DD')}
                </p>
            </header>
            <div
                className="flex-1 cursor-pointer"
                onClick={() => {
                    dispatch({ type: 'events/setDaySelected', payload: day });
                    dispatch({ type: 'events/setShowModal', payload: true });
                }}
            >
                {dayEvents.map((evt, idx) => (
                    <div
                        key={idx}
                        onClick = {() => setSelectedEvent(evt)}
                        className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
                    >
                        {evt.title}
                    </div>
                ))}
            </div>
        </div>
    )
}



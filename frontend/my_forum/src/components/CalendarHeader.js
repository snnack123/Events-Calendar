import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/logo.jpg'
import dayjs from 'dayjs';

export default function CalendarHeader() {
    const dispatch = useDispatch();
    const monthIndex = useSelector((state) => state.events.monthIndex);

    function handlePrevMonth() {
        dispatch({ type: 'events/setMonthIndex', payload: monthIndex - 1 });
    }

    function handleNextMonth() {
        dispatch({ type: 'events/setMonthIndex', payload: monthIndex + 1 });
    }

    function handleReset() {
        dispatch({ type: 'events/setMonthIndex', payload: dayjs().month() === monthIndex ? monthIndex + Math.random() : dayjs().month() });
    }

    return (
        <div className='px-4 py-2 flex items-center'>
            <img src={logo} alt="calendar" className='mr-2 w-13 h-12' />
            <h1 className='mr-10 text-xl text-gray-500 font-bold'>Calendar</h1>
            <button className='border rounded py-2 px-4 mr-5' onClick={handleReset}>
                Today
            </button>
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
            <h2 className="ml-4 text-xl text-gray-500 font-bold">
                {dayjs(new Date(dayjs().year(), monthIndex)).format(
                    "MMMM YYYY"
                )}
            </h2>
        </div>
    )
}

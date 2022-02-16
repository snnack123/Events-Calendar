import React from 'react'
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs'

export default function Day({ day, rowIdx }) {
    const dispatch = useDispatch();

    function getCurrentDayClass() {
        return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? 'bg-blue-600 text-white rounded-full w-7' : '';
    }

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
            <div className="flex-1 cursor-pointer" onClick={() => {
                dispatch({ type: 'events/setDaySelected', payload: day });
                dispatch({ type: 'events/setShowModal', payload: true });
            }}>

            </div>
        </div>
    )
}

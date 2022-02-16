import React from 'react'
import { useDispatch } from 'react-redux';
import plusImg from '../assets/plus.svg'
import SmallCalendar from './SmallCalendar'

export default function Sidebar() {
    const dispatch = useDispatch();

    function setShowModal() {
        dispatch({ type: 'events/setShowModal', payload: true });
    }

    return (
        <aside className='border p-5 w-64'>
            <button className='border p-2 rounded-full flex item-center shadow-md hover:shadow-2xl' onClick={setShowModal}>
                <img src={plusImg} alt="create_event" className='w-7 h-7' />
                <span className='pl-3 pr-7'>Create</span>
            </button>
            <SmallCalendar />
        </aside>
    )
}

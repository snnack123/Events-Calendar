import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function EventModal() {
    const dispatch = useDispatch();
    const daySelected = useSelector((state) => state.events.daySelected);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();


    const labelsClasses = [
        "indigo",
        "gray",
        "green",
        "blue",
        "red",
        "purple",
    ];

    const [selectedLabel, setSelectedLabel] = useState(labelsClasses[0]);

    function setShowModal() {
        dispatch({ type: 'events/setShowModal', payload: false });
    }

    return (
        <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
            <form className='bg-white rounded-lg shadow-2xl w-1/4'>
                <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
                    <span className='material-icons-outlined text-gray-400'>
                        drag_handle
                    </span>
                    <button onClick={setShowModal}>
                        <span className='material-icons-outlined text-gray-400'>
                            close
                        </span>
                    </button>
                </header>
                <div className='p-3'>
                    <div className="grid grid-cols-1/5 items-end gap-y-7">
                        <div></div>
                        <input
                            type="text"
                            name="title"
                            placeholder='Add title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className='pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 
                            border-gray-200 focus:outline-none focus:ring-0 focus-blue-500'
                        />
                        <span className='material-icons-outlined text-gray-400'>
                            schedule
                        </span>
                        <p>{daySelected.format('dddd, MMMM DD')}</p>
                        <span className='material-icons-outlined text-gray-400'>
                            segment
                        </span>
                        <input
                            type="text"
                            name="description"
                            placeholder='Add a description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className='pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 
                            border-gray-200 focus:outline-none focus:ring-0 focus-blue-500'
                        />
                        <span className='material-icons-outlined text-gray-400'>
                            bookmark_border
                        </span>
                        <div className="flex gap-x-2">
                            {labelsClasses.map((lblClass, i) => (
                                <span key={i} className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                                    onClick={() => setSelectedLabel(lblClass)}>
                                    {selectedLabel === lblClass && (
                                        <span className="material-icons-outlined text-white text-sm">
                                            check
                                        </span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

import { getMonth } from '../utilities';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CalendarHeader from './CalendarHeader'
import Sidebar from './Sidebar'
import Month from './Month'
import EventModal from './EventModal';


const Home = () => {
    const dispatch = useDispatch();
    // const isLoggedIn = useSelector((state) => state.users.loggedIn);
    // const dispatch = useDispatch();

    // const logout = () => {
    //     dispatch({ type: 'users/loggedIn', payload: false });
    //     localStorage.removeItem('token');
    // }

    const monthIndex = useSelector((state) => state.events.monthIndex);
    const showEventModal = useSelector((state) => state.events.showEventModal);
    const compare = useSelector((state) => state.events.compare);
    const [currentMonth, setCurrentMonth] = useState('');

    if (currentMonth === '') {
        setCurrentMonth(getMonth(monthIndex));
    }

    useEffect(() => {
        if (compare !== monthIndex) {
            setCurrentMonth(getMonth(monthIndex));
            dispatch({ type: 'events/setCompare', payload: monthIndex });
        }

    }, [monthIndex]);

    return (
        <div >
            {showEventModal && <EventModal />}
            <div className="h-screen flex flex-col">
                <CalendarHeader />
                <div className="flex flex-1">
                    <Sidebar />
                    <Month month={currentMonth} />
                </div>
            </div>
        </div>

        // <div className="Home">
        //     {isLoggedIn && <button onClick={logout}>Log out</button>}
        // </div>
    );
}

export default Home;
import dayjs from 'dayjs'

const initialState = {
    monthIndex: dayjs().month(),
    compare: dayjs().month(),
    smallCalendarMonth: 0,
    daySelected: dayjs(),
    showEventModal: false,
}

export function eventsReducer(state = initialState, action) {
    switch (action.type) {
        case 'events/setMonthIndex':
            return { ...state, monthIndex: action.payload };
        case 'events/setCompare':
            return { ...state, compare: action.payload };
        case 'events/setDaySelected':
            return { ...state, daySelected: action.payload };
        case 'events/setShowModal':
            return { ...state, showEventModal: action.payload };
        default:
            return state;
    }
}
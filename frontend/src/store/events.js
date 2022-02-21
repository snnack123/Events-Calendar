import dayjs from 'dayjs'

const initialState = {
    monthIndex: dayjs().month(),
    compare: dayjs().month(),
    smallCalendarMonth: 0,
    daySelected: dayjs(),
    showEventModal: false,
    savedEvents: [],
    selectedEvent: null,
    labelsEvents: [],
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
        case 'events/setEvents': 
            return { ...state, savedEvents: [...state.savedEvents, ...action.payload] };
        case 'events/setNewEvent': 
            return { ...state, savedEvents: [...state.savedEvents, action.payload] };
        case 'events/setSelectedEvent':
            return { ...state, selectedEvent: action.payload };
        case 'events/updateEvent':
            return { ...state, savedEvents: updateOne(state.savedEvents, action.payload)  };
        case 'events/deleteEvent':
            return { ...state, savedEvents: [...state.savedEvents.filter(item => item.id !== action.payload)] };   
        case 'events/setLabelsEvents':
            return { ...state, labelsEvents: action.payload };  
        default:
            return state;
    }
}

function updateOne(array, obj) {
    return array.map((item) => {
      if (obj.id === item.id) {
      return {...item, ...obj };
     } else {
      return item;
     }
   })
  }
  
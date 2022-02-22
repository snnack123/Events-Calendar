import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Labels() {
  const dispatch = useDispatch();
  const savedEvents = useSelector((state) => state.events.savedEvents);
  const labelsEvents = useSelector((state) => state.events.labelsEvents);

  function updateLabel(label, id) {
    let events = document.getElementsByClassName(`bg-${label}-200`);
    if (document.getElementById(id).checked === false) {
      for (let i = 0; i < events.length; i++) {
        events[i].style.display = 'none';
      }
    } else {
      for (let i = 0; i < events.length; i++) {
        events[i].style.display = 'block';
      }
    }
  }

  useEffect(() => {
    let new_labels = [...new Set(savedEvents.map((evt) => evt.label))];
    // console.log(savedEvents.map(evt => dayjs(Number(evt.day)).month()));
    dispatch({ type: 'events/setLabelsEvents', payload: new_labels });
  }, [savedEvents])
  return (
    <div>
      <p className='text-gray-500 font-bold mt-3 block'>Labels</p>
      {labelsEvents.map((label, idx) => (
        <label key={idx} className='items-center mt-3 block'>
          <input
            id={'label_' + idx}
            type="checkbox"
            defaultChecked={true}
            className={`form-checkbox h-5 w-5 text-${label}-400 rounded focus:ring-0 cursor-pointer`}
            onClick={(e) => updateLabel(label, e.target.id)}
          />
          <span className='ml-2 text-gray-700 capitalize'>{label}</span>
        </label>
      ))}
    </div>
  )
}

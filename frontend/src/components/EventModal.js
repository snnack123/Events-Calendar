import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { url_events, globalRequestParameters } from "../utils";
import dayjs from "dayjs";

export default function EventModal() {
  const dispatch = useDispatch();
  const daySelected = useSelector((state) => state.events.daySelected);
  const selectedEvent = useSelector((state) => state.events.selectedEvent);
  const user = useSelector((state) => state.users.thisUser);
  const [title, setTitle] = useState(
    selectedEvent !== null ? selectedEvent.title : ""
  );
  const [description, setDescription] = useState(
    selectedEvent !== null ? selectedEvent.description : ""
  );

  const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent !== null
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function setShowModal() {
    dispatch({ type: "events/setShowModal", payload: false });
    dispatch({ type: "events/setSelectedEvent", payload: null });
  }

  function saveEvent() {
    let new_event = {
      title,
      description,
      label: selectedLabel,
    };

    if (selectedEvent !== null) {
      new_event.day = selectedEvent.day;
      new_event.id = selectedEvent.id;

      let token = window.localStorage.getItem("token");
      let requestParameters = { ...globalRequestParameters };
      requestParameters.method = "PUT";
      requestParameters.headers.Authorization = token;
      requestParameters.body = JSON.stringify(new_event);

      fetch(url_events + "event/" + selectedEvent.id, requestParameters).then(
        (res) =>
          res.json().then((res) => {
            if (res.message === "Decoding error!" || res.message === "Your token expired!"
            ) {
              console.log("Problems with token!");
              document.getElementById("error_msg").innerHTML = "Problems with token! Login again!";
              document.getElementById("error_msg").style.color = "tomato";
              document.getElementById('updateButton').style.display = 'none';
            } else {
              if (res.updated === 1) {
                dispatch({ type: "events/updateEvent", payload: new_event });
                setShowModal();
              }
            }
          })
      );
    } else {
      if (dayjs(daySelected).isBefore(dayjs())) {
        document.getElementById("error_msg").innerHTML = "You can't create a new event in past!";
        document.getElementById("error_msg").style.color = "tomato";
        document.getElementById('saveButton').style.display = 'none';
      } else {
        new_event.day = daySelected.valueOf();
        new_event.user_id = user.id;

        let token = window.localStorage.getItem("token");
        let requestParameters = { ...globalRequestParameters };
        requestParameters.method = "POST";
        requestParameters.headers.Authorization = token;
        requestParameters.body = JSON.stringify(new_event);

        fetch(url_events + "event", requestParameters).then((res) =>
          res.json().then((res) => {
            if (res.message === "Decoding error!" || res.message === "Your token expired!") {
              console.log("Problems with token!");
              document.getElementById("error_msg").innerHTML = "Problems with token! Login again!";
              document.getElementById("error_msg").style.color = "tomato";
              document.getElementById('saveButton').style.display = 'none';
            } else {
              if (res.added === 1) {
                new_event.id = res.id;
                dispatch({ type: "events/setNewEvent", payload: new_event });
                setShowModal();
              }
              console.log(res.msg);
            }
          })
        );
      }
    }
  }

  function deleteEvent() {
    let deleteId = selectedEvent.id;

    let token = window.localStorage.getItem("token");
    let requestParameters = { ...globalRequestParameters };
    requestParameters.headers.Authorization = token;
    requestParameters.method = "DELETE";

    fetch(url_events + "event/" + deleteId, requestParameters).then((res) =>
      res.json().then((res) => {
        if (
          res.message === "Decoding error!" ||
          res.message === "Your token expired!"
        ) {
          console.log("Problems with token!");
        } else {
          if (res.deleted === 1) {
            dispatch({ type: "events/deleteEvent", payload: selectedEvent.id });
          }
        }
      })
    );
    setShowModal();
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div className="">
            {selectedEvent && (
              <span
                className="material-icons-outlined text-gray-400 cursor-pointer"
                onClick={deleteEvent}
              >
                delete
              </span>
            )}
            <button onClick={setShowModal}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Add title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 
                            border-gray-200 focus:outline-none focus:ring-0 focus-blue-500"
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Add a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 
                            border-gray-200 focus:outline-none focus:ring-0 focus-blue-500"
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                  onClick={() => setSelectedLabel(lblClass)}
                >
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
        <footer className="flex justify-end border-t p-3 mt-5 ">
          {selectedEvent === null && (
            <button
              type="submit"
              id='saveButton'
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
              onClick={saveEvent}
            >
              Save
            </button>
          )}
          {selectedEvent !== null && (
            <button
              type="submit"
              id='updateButton'
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
              onClick={saveEvent}
            >
              Update Event
            </button>
          )}
          <p id="error_msg"></p>
        </footer>
      </form>
    </div>
  );
}

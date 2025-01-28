import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import VolunteerSignUp from "./VolunteerSignUp";

const initialEvents = [
  {
    id: "1",
    name: "Community Cleanup",
    date: "Saturday, February 3, 2025",
    time: "10:00 AM - 2:00 PM",
    capacity: 5,
    registrations: 3,
  },
  {
    id: "2",
    name: "Tree Plantation Drive",
    date: "Sunday, February 4, 2025",
    time: "9:00 AM - 12:00 PM",
    capacity: 10,
    registrations: 7,
  },
];

export default function App() {
  const [events, setEvents] = useState(initialEvents);

  // State to track registered volunteers by their email
  const [registeredVolunteers, setRegisteredVolunteers] = useState([]);

  const updateRegistrations = (eventId, volunteerEmail) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? { ...event, registrations: event.registrations + 1 }
          : event
      )
    );
    setRegisteredVolunteers((prevVolunteers) => [
      ...prevVolunteers,
      volunteerEmail,
    ]);
  };

  function EventList() {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Available Events</h1>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {events.map((event) => (
            <li key={event.id} style={{ marginBottom: "10px" }}>
              <h2>{event.name}</h2>
              <p>
                <strong>Date:</strong> {event.date} <br />
                <strong>Time:</strong> {event.time} <br />
                <strong>Capacity:</strong> {event.capacity} participants <br />
                <strong>Registrations:</strong> {event.registrations}
              </p>
              <Link
                to={`/volunteer-signup/${event.id}`}
                style={{
                  color: "green",
                  textDecoration: "underline",
                }}
              >
                Volunteer for this Event
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route
          path="/volunteer-signup/:id"
          element={
            <VolunteerSignUp
              event={events.find(
                (event) => event.id === window.location.pathname.split("/")[2]
              )}
              updateRegistrations={updateRegistrations}
              registeredVolunteers={registeredVolunteers}
            />
          }
        />
      </Routes>
    </Router>
  );
}

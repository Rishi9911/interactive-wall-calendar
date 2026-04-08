import React, { useState } from 'react';
import HeroImage from './HeroImage';
import CalendarGrid from './CalendarGrid';
import NotesSection from './NotesSection';
import './CalendarApp.css';

const CalendarApp = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const changeMonth = (offset) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };

    return (
        <div className="calendar-card">
            <div className="calendar-binding">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="ring">
                  <div className="ring-metal"></div>
                  <div className="ring-hole"></div>
                </div>
              ))}
            </div>
            <HeroImage currentDate={currentDate} />
            <div className="calendar-bottom-half">
                <NotesSection startDate={startDate} endDate={endDate} />
                <CalendarGrid 
                  currentDate={currentDate}
                  setCurrentDate={setCurrentDate}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  changeMonth={changeMonth}
                />
            </div>
        </div>
    );
};

export default CalendarApp;

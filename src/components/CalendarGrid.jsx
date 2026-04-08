import React, { useState } from 'react';

const CalendarGrid = ({ currentDate, setCurrentDate, startDate, setStartDate, endDate, setEndDate, changeMonth }) => {
    
    const [flipState, setFlipState] = useState('');

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const triggerChangeMonth = (offset) => {
        setFlipState('flipping');
        // Wait till halfway through the flip to actually change the data
        setTimeout(() => {
            changeMonth(offset);
        }, 150); 
        
        setTimeout(() => {
            setFlipState('');
        }, 500);
    };

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    let startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const prevMonthDays = new Date(year, month, 0).getDate();

    const handleDayClick = (dayNum, isPrevMonth=false, isNextMonth=false) => {
        let clickedMonth = month;
        let clickedYear = year;
        
        if (isPrevMonth) {
            clickedMonth -= 1;
            if (clickedMonth < 0) { clickedMonth = 11; clickedYear--; }
        } else if (isNextMonth) {
            clickedMonth += 1;
            if (clickedMonth > 11) { clickedMonth = 0; clickedYear++; }
        }
        
        const selectedDate = new Date(clickedYear, clickedMonth, dayNum);
        selectedDate.setHours(0,0,0,0);

        if (!startDate || (startDate && endDate)) {
            setStartDate(selectedDate);
            setEndDate(null);
        } else if (selectedDate < startDate) {
            setStartDate(selectedDate);
        } else {
            setEndDate(selectedDate);
        }
    };

    const isDateSame = (date1, date2) => {
        if (!date1 || !date2) return false;
        return date1.getTime() === date2.getTime();
    };

    const isDateInRange = (date) => {
        if (!startDate || !endDate || !date) return false;
        return date > startDate && date < endDate;
    };

    const navigateToToday = () => {
        setCurrentDate(new Date());
    };

    const formatDateRange = (d) => {
        return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    let rangeDetails = null;
    if (startDate && endDate) {
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
        rangeDetails = (
            <div className="range-header">
                <div>{formatDateRange(startDate)} &rarr; {formatDateRange(endDate)} <span className="diff-days">({diffDays} days)</span></div>
                <button className="close-range-btn" onClick={() => {setStartDate(null); setEndDate(null)}}>&#x2715;</button>
            </div>
        );
    }

    const isHoliday = (d) => {
        // Marking 1st and 8th as holidays to match visual
        if (d.getDate() === 1 || d.getDate() === 8) return true;
        return false;
    };

    const renderGrid = () => {
        let days = [];
        
        const today = new Date();
        today.setHours(0,0,0,0);

        const pushDay = (dayNum, isPrevMonth, isNextMonth) => {
            let m = month;
            let y = year;
            if (isPrevMonth) { m -= 1; if (m < 0) { m = 11; y--; } }
            if (isNextMonth) { m += 1; if (m > 11) { m = 0; y++; } }
            
            const thisDate = new Date(y, m, dayNum);
            thisDate.setHours(0,0,0,0);
            
            const isStart = isDateSame(thisDate, startDate);
            const isEnd = isDateSame(thisDate, endDate);
            const inRange = isDateInRange(thisDate);
            const isToday = isDateSame(thisDate, today);
            const holiday = isHoliday(thisDate);

            // Removing 'today' style if it's selected to prevent visual conflicts
            let classes = "calendar-day selectable";
            if (isPrevMonth || isNextMonth) classes += " muted-month";
            if (isStart) classes += " selected start";
            if (isEnd) classes += " selected end";
            if (inRange) classes += " in-range";
            if (isToday && !isStart && !isEnd) classes += " today";

            if (isStart && !endDate) classes += " start-only";

            days.push(
                <div 
                    key={`${isPrevMonth ? 'prev' : isNextMonth ? 'next' : 'curr'}-${dayNum}`} 
                    className={classes}
                    onClick={() => handleDayClick(dayNum, isPrevMonth, isNextMonth)}
                >
                    <span className="day-number">{dayNum}</span>
                    {holiday && <div className="holiday-dot"></div>}
                </div>
            );
        };

        for (let i = 0; i < startingDay; i++) pushDay(prevMonthDays - startingDay + i + 1, true, false);
        for (let i = 1; i <= daysInMonth; i++) pushDay(i, false, false);
        const remainingCells = 42 - days.length; 
        for (let i = 1; i <= remainingCells; i++) pushDay(i, false, true);

        return days;
    };

    const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    return (
        <div className="calendar-grid-container">
            {rangeDetails}
            
            <div className="calendar-header">
                <button onClick={() => triggerChangeMonth(-1)} className="nav-btn">&lt;</button>
                <div className="current-month-display" onClick={navigateToToday}>
                    {new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}
                </div>
                <button onClick={() => triggerChangeMonth(1)} className="nav-btn">&gt;</button>
            </div>
            
            <div className={`calendar-grid ${flipState}`}>
                {dayNames.map(day => (
                    <div key={day} className="calendar-day-header">{day}</div>
                ))}
                {renderGrid()}
            </div>
            
            <div className="calendar-legend">
                <div className="legend-item"><div className="legend-icon today-icon"></div>Today</div>
                <div className="legend-item"><div className="legend-icon selected-icon"></div>Selected</div>
                <div className="legend-item"><div className="legend-icon in-range-icon"></div>In range</div>
                <div className="legend-item"><div className="legend-icon holiday-icon"></div>Holiday</div>
            </div>
        </div>
    );
};

export default CalendarGrid;

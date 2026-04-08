import React, { useState, useEffect } from 'react';

const NotesSection = ({ startDate, endDate }) => {
    const [notes, setNotes] = useState('');

    const formatDate = (date) => {
        if (!date) return '';
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    let rangeTitle = "Notes";
    if (startDate && endDate) {
        rangeTitle = `${formatDate(startDate)} \u2192 ${formatDate(endDate)}`;
    } else if (startDate) {
        rangeTitle = formatDate(startDate);
    }

    // Load saved notes for this specific date range when the rangeTitle changes
    useEffect(() => {
        const savedNote = localStorage.getItem(`cal_note_${rangeTitle}`);
        setNotes(savedNote || '');
    }, [rangeTitle]);

    const handleNoteChange = (e) => {
        const newNote = e.target.value;
        setNotes(newNote);
        // Persist the note automatically bounded to the specific date or range
        localStorage.setItem(`cal_note_${rangeTitle}`, newNote);
    };

    return (
        <div className="notes-container">
            <h2 className="notes-heading">Notes</h2>
            <div className="notes-header-box">
                <span className="notes-icon">&#128197;</span>
                <h3 className="notes-title">{rangeTitle}</h3>
            </div>
            <div className="notes-lines-container">
                <textarea 
                    className="notes-textarea" 
                    value={notes}
                    onChange={handleNoteChange}
                    placeholder="Add note for selected range..."
                ></textarea>
                <div className="notes-lines">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="note-line"></div>
                    ))}
                </div>
            </div>
            <button className="add-note-btn">+ Add Note</button>
        </div>
    );
};

export default NotesSection;

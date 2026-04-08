import React, { useState, useEffect, useRef } from 'react';

const HeroImage = ({ currentDate }) => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

    const [imageUrl, setImageUrl] = useState('/hero.png');
    const fileInputRef = useRef(null);

    useEffect(() => {
        const savedImage = localStorage.getItem(`hero_image_${currentMonth}`);
        if (savedImage) {
            setImageUrl(savedImage);
        } else {
            const formattedMonthName = currentMonth.toLowerCase();
            setImageUrl(`/${formattedMonthName}.jpg`);
        }
    }, [currentMonth]);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result;
                setImageUrl(result);
                localStorage.setItem(`hero_image_${currentMonth}`, result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="hero-container">
            <img src={imageUrl} alt={`${currentMonth} Header`} className="hero-image" />

            <button className="upload-btn" onClick={handleUploadClick} title={`Upload custom image for ${currentMonth}`}>
                Upload Custom Image
            </button>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            <div className="hero-overlay-left-light"></div>
            <div className="hero-overlay-left-dark"></div>
            <div className="hero-overlay-light"></div>
            <div className="hero-overlay-dark"></div>

            <div className="hero-content">
                <div className="hero-date-info">
                    <div className="hero-year">{currentYear}</div>
                    <div className="hero-month">{currentMonth}</div>
                </div>
            </div>
        </div>
    );
};

export default HeroImage;

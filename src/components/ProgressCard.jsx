import React, { useEffect, useState } from 'react';
import './ProgressCard.css';

function ProgressCard({ title, subtitle, startTimeSeconds }) {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now() / 1000; // current time in seconds
            const secondsLeft = startTimeSeconds - now;

            if (secondsLeft > 0) {
                const days = Math.floor(secondsLeft / (3600 * 24));
                const hours = Math.floor((secondsLeft % (3600 * 24)) / 3600);
                const minutes = Math.floor((secondsLeft % 3600) / 60);
                const seconds = Math.floor(secondsLeft % 60);

                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            } else {
                setTimeLeft('Contest Started!');
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [startTimeSeconds]);

    return (
        <div className="glass-card">
            <h2>{title}</h2>
            <p>{subtitle}</p>
            <p className="countdown">{timeLeft}</p>
        </div>


    );
}

export default ProgressCard;

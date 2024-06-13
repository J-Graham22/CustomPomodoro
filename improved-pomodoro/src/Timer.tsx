import React, { useState, useRef, useEffect } from "react";

const Timer = () => {
    const Ref = useRef<null | number>(null);

    const [timer, setTimer] = useState("00:00:00");

    const getRemainingTime = (e: string) => {
        const newDate = new Date();
        const total: number = Date.parse(e) - Date.parse(new Date().toDateString()); 

        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);

        return {
            total,
            hours,
            minutes,
            seconds
        }
    }

    const startTimer = (e: string) => {
        let { total, hours, minutes, seconds } = getRemainingTime(e);

        if ((total as number) >= 0) {
            setTimer(
                (hours > 9 ? hours : "0" + hours) + ":" +
                (minutes > 9 ? minutes : "0" + minutes) + ":" +
                (seconds > 9 ? seconds: "0" + seconds)
            );
        }
    };

    const resetTimer = (e: string) => {
        setTimer("00:00:10");

        if(Ref.current) clearInterval(Ref.current);

        const id: number = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    }

    const getDeadlineTime = () => {
        let deadline: Date = new Date();

        deadline.setSeconds(deadline.getSeconds() + 10);
        return deadline;
    }

    useEffect(() => {
        resetTimer(getDeadlineTime().toDateString());
    }, []);

    const onClickReset = () => {
        resetTimer(getDeadlineTime().toDateString());
    }
    

    return (
        <div>
            <h3>Timer</h3>
            <h2>{timer}</h2>
            <button onClick={onClickReset}>Reset Timer</button>
        </div>
    );
};

export default Timer;
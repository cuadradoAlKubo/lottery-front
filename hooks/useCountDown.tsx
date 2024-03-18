import React, { useState, useEffect } from 'react';
interface Props{
    targetDate: string
}
interface Time {
    days: number
    hours: number,
    minutes: number,
    seconds: number,
    ended: boolean
}

const useCountDown = ({ targetDate }: Props) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).valueOf() - new Date().valueOf();
    let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        ended: false
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        ended: false,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<Time>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });


  return{
    timeLeft
  }
};

export default useCountDown;
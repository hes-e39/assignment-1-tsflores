
/*
    user defined dates to target in the TimeLeft component
*/

export const RETIREMENT_DATE: Date = new Date("2025-03-21T17:00:00");
export const BIRTHDATE: Date = new Date("2024-11-23T19:30:00");


/*
    helper function used to calculate the time remaining.  The time comes in as milliseconds and then is broken down into
    hours, minutes, seconds, and centiseconds.  For display purposes, a comparison is made to ensure 2 digits are shown
    on the timer.
*/

interface timeProps {
    hours?: number | string;
    minutes: number | string;
    seconds: number | string;
    centiseconds?: number | string;
}

export function CalculateTime( props ): timeProps {

    const hoursNumber: number = Math.floor((props.time / 3600000) % 60);
    const minutesNumber: number  = Math.floor((props.time / 60000) % 60);
    const secondsNumber: number  = Math.floor((props.time / 1000) % 60);
    const centisecondsNumber: number  = (props.time / 10) % 100;

    const hours = hoursNumber < 10 ? `0${hoursNumber}` : hoursNumber;
    const minutes = minutesNumber < 10 ? `0${minutesNumber}` : minutesNumber;
    const seconds = secondsNumber < 10 ? `0${secondsNumber}` : secondsNumber;
    const centiseconds = centisecondsNumber < 10 ? `0${centisecondsNumber}` : centisecondsNumber;


    return{ hours, minutes, seconds, centiseconds };

}

/* 
    helper function that takes target date as a prop and then compares it to the current date.  The difference between the two
    is then divided into days, hours, minutes, and seconds and returned as an object.
*/
export function CalculateTimeRemaining(targetDate: Date) {
    
    const currentDate: Date = new Date();
    const totalTimeLeft: number = targetDate - currentDate;
	const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
	const hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
	const seconds = Math.floor((totalTimeLeft / 1000) % 60);
	return { days, hours, minutes, seconds };

}




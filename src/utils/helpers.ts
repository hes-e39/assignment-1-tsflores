
export function CalculateTime( { time }: number ): Array<number | string> {

    const hours: number = Math.floor((time / 3600000) % 60);
    const minutes: number  = Math.floor((time / 60000) % 60);
    const seconds: number  = Math.floor((time / 1000) % 60);
    const centiseconds: number  = (time / 10) % 100;

    const hoursFormat = hours < 10 ? `0${hours}` : hours;
    const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
    const secondsFormat = seconds < 10 ? `0${seconds}` : seconds;
    const centisecondsFormat = centiseconds < 10 ? `0${centiseconds}` : centiseconds;


    return[hoursFormat, minutesFormat, secondsFormat, centisecondsFormat];

}




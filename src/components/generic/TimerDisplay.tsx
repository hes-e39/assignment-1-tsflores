import { CalculateTime } from '../../utils/helpers';

export const TimerDisplay = props => {
    let objTime: number | string | object = 0;

    if (props.flag) {
        objTime = CalculateTime(props);
    } else {
        objTime = props.time;
    }

    return (
        <div className="countdown">
            <div className="content">
                {Object.entries(objTime).map(el => {
                    const label = el[0];
                    const value = el[1];
                    return (
                        <div className="box" key={label}>
                            <div className="value">
                                <span>{value}</span>
                            </div>
                            <span className="label"> {label} </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

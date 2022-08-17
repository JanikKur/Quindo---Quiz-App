import React, {useState} from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CorrectAnswersBar({percentage}) {
    
    setTimeout(() => {setPercentageData(percentage)}, 2)
    const [percentageData, setPercentageData] = useState(0);

    return (
        <CircularProgressbar className='correct-answer-percentage' styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0,

            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',

            // Text size
            textSize: '16px',

            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 2,

            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',

            // Colors
            pathColor: `rgba(${100 - percentage}, ${percentage}, ${percentage}, ${.9})`,
            textColor: 'rgb(2, 143, 72)',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7'
        })}
            value={percentageData} text={`${percentageData}%`} />
    )
}

import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { getGroups } from '../../store/group';
import { useDispatch, useSelector } from 'react-redux';


function Calendar({ month, year }) {
    const date = new Date(year, month, 1);

    console.log("Calendar for:", month, year);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const mnthsLen = {
        "January": 31,
        "February": 28,
        "March": 31,
        "April": 30,
        "May": 31,
        "June": 30,
        "July": 31,
        "August": 31,
        "September": 30,
        "October": 31,
        "November": 30,
        "December": 31
    }

    const dotw = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

    const generateCal = () => {
        const day = date.getDay();
        let length;

        if (year % 4 === 0 && month === 1) {
            length = 29
        } else {
            length = mnthsLen[months[month]]
        }

        const days = []

        switch (day) {
            case 0:
                for (let i = 1; i <= length; i++) {
                    let j = 0;
                    console.log("Starting i:", i);

                    if (i <= 22) {
                        days.push(<tr>
                            {dotw.map((day) => {
                                j++
                                return <td class={day}>{i + j - 1}</td>
                            })}
                        </tr>)

                        i = i + 6
                        console.log("ending i:", i);
                    } else {
                        days.push(<tr>
                            {dotw.slice(0, length - i + 1).map((day) => {
                                j++
                                return <td class={day}>{i + j - 1}</td>
                            })}
                            {length - i + 1 < 7 ? dotw.slice(length - i + 1).map(() => { (<td class="noday">&nbsp;</td>) }) : ""}
                        </tr>)


                        i = length + 1
                    }
                }

                return days
            case 1:
                console.log("case 1");
                for (let i = 1; i <= length; i++) {
                    let j = 0;

                    console.log("starting i:", i);
                    if (i <= 22) {
                        if (i === 1) {
                            days.push(
                                <tr>
                                    {dotw.slice(0, 1).map(() => {
                                        return (<td class="noday">&nbsp;</td>)
                                    })}
                                    {dotw.slice(1).map((day) => {
                                        j++
                                        return (<td class={day}>{i + j - 1}</td>)
                                    })}
                                </tr>
                            )
                        }
                        days.push(
                            <tr>
                                {dotw.map((day) => {
                                    j++
                                    return <td class={day}>{i + j - 1}</td>
                                })}
                            </tr>
                        )

                        i = i + j - 1
                        console.log("ending i:", i);
                    } else {
                        days.push(<tr>
                            {dotw.slice(0, length - i + 1).map((day) => {
                                j++
                                return <td class={day}>{i + j - 1}</td>
                            })}
                            {length - i + 1 < 7 ? dotw.slice(length - i + 1).map(() => { (<td class="noday">&nbsp;</td>) }) : ""}
                        </tr>)

                        i = length + 1
                        console.log("last i:", i);
                    }
                }

                return days
            case 2:
                for (let i = 1; i <= length; i++) {
                    let j = 0;

                    if (i <= 20) {
                        if (i === 1) {
                            days.push(
                                <tr>
                                    {dotw.slice(0, 2).map(() => {
                                        return (<td class="noday">&nbsp;</td>)
                                    })}
                                    {dotw.slice(2).map((day) => {
                                        j++
                                        return <td class={day}>{i + j - 1}</td>
                                    })}
                                </tr>
                            )
                        }
                        days.push(
                            <tr>
                                {dotw.map((day) => {
                                    j++
                                    return <td class={day}>{i + j - 1}</td>
                                })}
                            </tr>
                        )

                        i = i + j - 1
                    } else {
                        days.push(<tr>
                            {dotw.slice(0, length - i + 1).map((day) => {
                                j++
                                return <td class={day}>{i + j - 1}</td>
                            })}
                            {length - i + 1 < 7 ? dotw.slice(length - i + 1).map(() => { (<td class="noday">&nbsp;</td>) }) : ""}
                        </tr>)

                        i = length + 1
                    }
                }

                return days
            case 3:
                for (let i = 1; i <= length; i++) {
                    let j = 0;

                    if (i <= 19) {
                        if (i === 1) {
                            days.push(
                                <tr>
                                    {dotw.slice(0, 3).map(() => {
                                        return (<td class="noday">&nbsp;</td>)
                                    })}
                                    {dotw.slice(3).map((day) => {
                                        j++
                                        return <td class={day}>{i + j - 1}</td>
                                    })}
                                </tr>
                            )
                        }
                        days.push(
                            <tr>
                                {dotw.map((day) => {
                                    j++
                                    return <td class={day}>{i + j - 1}</td>
                                })}
                            </tr>
                        )

                        i = i + j - 1
                    } else {
                        days.push(<tr>
                            {dotw.slice(0, length - i + 1).map((day) => {
                                j++
                                return <td class={day}>{i + j - 1}</td>
                            })}
                            {length - i + 1 < 7 ? dotw.slice(length - i + 1).map(() => { (<td class="noday">&nbsp;</td>) }) : ""}
                        </tr>)

                        i = length + 1
                    }
                }

                return days
            case 4:
                for (let i = 1; i <= length; i++) {
                    let j = 0;

                    if (i <= 18) {
                        if (i === 1) {
                            days.push(
                                <tr>
                                    {dotw.slice(0, 4).map(() => {
                                        return (<td class="noday">&nbsp;</td>)
                                    })}
                                    {dotw.slice(4).map((day) => {
                                        j++
                                        return <td class={day}>{i + j - 1}</td>
                                    })}
                                </tr>
                            )
                        }
                        days.push(
                            <tr>
                                {dotw.map((day) => {
                                    j++
                                    return <td class={day}>{i + j - 1}</td>
                                })}
                            </tr>
                        )

                        i = i + j - 1
                    } else {
                        days.push(<tr>
                            {dotw.slice(0, length - i + 1).map((day) => {
                                j++
                                return <td class={day}>{i + j - 1}</td>
                            })}
                            {length - i + 1 < 7 ? dotw.slice(length - i + 1).map(() => { (<td class="noday">&nbsp;</td>) }) : ""}
                        </tr>)

                        i = length + 1
                    }
                }

                return days
            case 5:
                for (let i = 1; i <= length; i++) {
                    let j = 0;

                    if (i <= 24) {
                        if (i === 1) {
                            days.push(
                                <tr>
                                    {dotw.slice(0, 5).map(() => {
                                        return (<td class="noday">&nbsp;</td>)
                                    })}
                                    {dotw.slice(5).map((day) => {
                                        j++
                                        return <td class={day}>{i + j - 1}</td>
                                    })}
                                </tr>
                            )
                        }
                        days.push(
                            <tr>
                                {dotw.map((day) => {
                                    j++
                                    return <td class={day}>{i + j - 1}</td>
                                })}
                            </tr>
                        )

                        i = i + j - 1
                    } else {
                        days.push(<tr>
                            {dotw.slice(0, length - i + 1).map((day) => {
                                j++
                                return <td class={day}>{i + j - 1}</td>
                            })}
                            {length - i + 1 < 7 ? dotw.slice(length - i + 1).map(() => { (<td class="noday">&nbsp;</td>) }) : ""}
                        </tr>)

                        i = length + 1
                    }
                }

                return days
            case 6:
                console.log("case 6");
                for (let i = 1; i <= length; i++) {
                    let j = 0;

                    console.log("starting i:", i);
                    if (i <= 23) {
                        if (i === 1) {
                            days.push(
                                <tr>
                                    {dotw.slice(0, 6).map(() => {
                                        return (<td class="noday">&nbsp;</td>)
                                    })}
                                    {dotw.slice(6).map((day) => {
                                        j++
                                        return <td class={day}>{i + j - 1}</td>
                                    })}
                                </tr>
                            )
                        }
                        days.push(
                            <tr>
                                {dotw.map((day) => {
                                    j++
                                    return <td class={day}>{i + j - 1}</td>
                                })}
                            </tr>
                        )

                        i = i + j - 1
                        console.log("ending i:", i);
                    } else {
                        console.log("i checker:", i);
                        console.log("length checker:", length);
                        days.push(<tr>
                            {dotw.slice(0, length - i + 1).map((day) => {
                                j++
                                return <td class={day}>{i + j - 1}</td>
                            })}
                            {length - i + 1 < 7 ? dotw.slice(length - i + 1).map(() => { (<td class="noday">&nbsp;</td>) }) : ""}
                        </tr>)

                        i = length + 1
                        console.log("last i:", i);
                    }
                }

                return days
            default:
                break;
        }
    }


    return (
        <table border="1px solid black" cellPadding="5px" cellSpacing="0" className="month">
            <tr>
                <th colSpan="7" className="month">{months[date.getMonth()]} {date.getFullYear()}</th>
            </tr>
            <tr>
                <th class="sun">Sun</th>
                <th class="mon">Mon</th>
                <th class="tue">Tue</th>
                <th class="wed">Wed</th>
                <th class="thu">Thu</th>
                <th class="fri">Fri</th>
                <th class="sat">Sat</th>
            </tr>
            {generateCal()}
        </table>
    )
}

export default Calendar

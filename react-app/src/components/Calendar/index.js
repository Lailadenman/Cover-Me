import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { getGroups } from '../../store/group';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import "./Calendar.css"

function Calendar({ month, year, gId, eventList }) {

    const date = new Date(year, month, 1);

    // // console.log("Calendar for:", month, year);

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

    const isCurrent = (event) => {
        // // console.log("event", event);
        // // console.log("start_date", event.start_date);
        const date = event.start_date
        // // console.log(date);
        const mon = date.split(" ")[0].split("-")[1]
        const yr = date.split(" ")[0].split("-")[0]

        // // console.log(parseInt(yr), year);
        // // console.log(parseInt(mon), month);

        return ((mon - 1) === month) && (year === parseInt(yr))
    }

    // // console.log("from calendar", eventList);

    const filteredEvents = eventList.filter(isCurrent)

    const dateArr = []

    filteredEvents.forEach((event) => {
        // // console.log("hit");
        const date = event.start_date.split(" ")[0].split("-")
        const start_time = event.start_date.split(" ")[1].split(":")
        const end_time = event.end_date.split(" ")[1].split(":")
        const dy = date[2]
        const mon = date[1]
        const yr = date[0]
        const start = (parseInt(start_time[0]) > 12 ? `${(parseInt(start_time[0]) - 12)}:${start_time[1]}pm` : parseInt(start_time[0]) < 12 ? `${parseInt(start_time[0])}:${start_time[1]}am` : `${parseInt(start_time[0])}:${start_time[1]}pm`)
        const end = (parseInt(end_time[0]) > 12 ? `${(parseInt(end_time[0]) - 12)}:${end_time[1]}pm` : parseInt(end_time[0]) < 12 ? `${parseInt(end_time[0])}:${end_time[1]}am` : `${parseInt(end_time[0])}:${end_time[1]}pm`)
        dateArr.push({
            id: event.id,
            day: dy,
            month: mon,
            year: yr,
            owner: `${event.owner.firstName} ${event.owner.lastName.slice(0, 1)}.`,
            start,
            end,
            covered: event.isCovered
        })
    })

    // // console.log("new dateArr", dateArr);

    // // console.log("filtered events", filteredEvents);

    const generateCal = () => {
        const day = date.getDay();
        let length;

        if (year % 4 === 0 && month === 1) {
            // // console.log("#########", year % 4);
            length = 29
        } else {
            length = mnthsLen[months[month]]
        }

        // // console.log("length for this month is ", length);
        const days = []

        switch (day) {
            case 0:
                for (let i = 1; i <= length; i++) {
                    let j = 0;
                    // // console.log("Starting i:", i);

                    if (i <= 22) {
                        days.push(<tr className='week-row'>
                            {dotw.map((day) => {
                                j++
                                const counter = i + j - 1
                                let eventsNum = 0
                                return <td class={day}>
                                    {i + j - 1} {eventsNum ? eventsNum + " events" : ""}
                                    <div className='shifts'>
                                        {dateArr.map((date) => {
                                            if (parseInt(date.day) === counter) {
                                                eventsNum++;
                                                return (
                                                    <NavLink
                                                        key={date.id}
                                                        to={`/groups/${gId}/events/${date.id}`}
                                                        style={{ textDecoration: "none" }}
                                                        className="event-link"
                                                    >
                                                        <div className={date.covered ? "covered" : "not-covered"}>
                                                            <div>{date.owner}</div>
                                                            <div>{date.start} - {date.end}</div>
                                                        </div>
                                                    </NavLink>)
                                            }
                                            return ""
                                        })}
                                    </div>
                                </td>
                            })}
                        </tr>)

                        i = i + 6
                        // // console.log("ending i:", i);
                    } else {
                        days.push(<tr className='week-row'>
                            {dotw.slice(0, length - i + 1).map((day) => {
                                j++
                                const counter = i + j - 1
                                let eventsNum = 0;
                                return <td class={day}>
                                    {i + j - 1} {eventsNum ? eventsNum + " events" : ""}
                                    <div className='shifts'>
                                        {dateArr.map((date) => {
                                            if (parseInt(date.day) === counter) {
                                                eventsNum++
                                                return (
                                                    <NavLink
                                                        key={date.id}
                                                        to={`/groups/${gId}/events/${date.id}`}
                                                        style={{ textDecoration: "none" }}
                                                        className="event-link"
                                                    >
                                                        <div className={date.covered ? "covered" : "not-covered"}>
                                                            <div>{date.owner}</div>
                                                            <div>{date.start} - {date.end}</div>
                                                        </div>
                                                    </NavLink>
                                                )
                                            }
                                            return ""
                                        })}
                                    </div>
                                </td>
                            })}
                            {length - i + 1 < 7 ? dotw.slice(length - i + 1).map(() => { (<td class="noday">&nbsp;</td>) }) : ""}
                        </tr>)


                        i = length + 1
                    }
                }

                return days
            case 1:
                // // console.log("case 1");
                for (let i = 1; i <= length; i++) {
                    let j = 0;

                    // // console.log("starting i:", i);
                    if (i <= 22) {
                        if (i === 1) {
                            days.push(
                                <tr className='week-row'>
                                    {dotw.slice(0, 1).map(() => {
                                        return (<td class="noday">&nbsp;</td>)
                                    })}
                                    {dotw.slice(1).map((day) => {
                                        j++
                                        const counter = i + j - 1
                                        let eventsNum = 0
                                        return <td class={day}>
                                            {i + j - 1} {eventsNum ? eventsNum + " events" : ""}
                                            <div className='shifts'>
                                                {dateArr.map((date) => {
                                                    if (parseInt(date.day) === counter) {
                                                        eventsNum++
                                                        return (
                                                            <NavLink
                                                                key={date.id}
                                                                to={`/groups/${gId}/events/${date.id}`}
                                                                style={{ textDecoration: "none" }}
                                                                className="event-link"
                                                            >
                                                                <div className={date.covered ? "covered" : "not-covered"}>
                                                                    <div>{date.owner}</div>
                                                                    <div>{date.start} - {date.end}</div>
                                                                </div>
                                                            </NavLink>
                                                        )
                                                    }
                                                    return ""
                                                })}
                                            </div>
                                        </td>
                                    })}
                                </tr>
                            )
                        }
                        days.push(
                            <tr className='week-row'>
                                {dotw.map((day) => {
                                    j++
                                    const counter = i + j - 1
                                    let eventsNum = 0;
                                    return <td class={day}>
                                        {i + j - 1} {eventsNum ? eventsNum + " events" : ""}
                                        <div className='shifts'>
                                            {dateArr.map((date) => {
                                                if (parseInt(date.day) === counter) {
                                                    eventsNum++
                                                    return (
                                                        <NavLink
                                                            key={date.id}
                                                            to={`/groups/${gId}/events/${date.id}`}
                                                            style={{ textDecoration: "none" }}
                                                            className="event-link"
                                                        >
                                                            <div className={date.covered ? "covered" : "not-covered"}>
                                                                <div>{date.owner}</div>
                                                                <div>{date.start} - {date.end}</div>
                                                            </div>
                                                        </NavLink>
                                                    )
                                                }
                                                return ""
                                            })}
                                        </div>
                                    </td>
                                })}
                            </tr>
                        )

                        i = i + j - 1
                        // // console.log("ending i:", i);
                    } else {
                        days.push(<tr className='week-row'>
                            {dotw.slice(0, length - i + 1).map((day) => {
                                j++
                                const counter = i + j - 1
                                let eventsNum = 0;
                                return <td class={day}>
                                    {i + j - 1} {eventsNum ? eventsNum + " events" : ""}
                                    <div className='shifts'>
                                        {dateArr.map((date) => {
                                            if (parseInt(date.day) === counter) {
                                                eventsNum++
                                                return (
                                                    <NavLink
                                                        key={date.id}
                                                        to={`/groups/${gId}/events/${date.id}`}
                                                        style={{ textDecoration: "none" }}
                                                        className="event-link"
                                                    >
                                                        <div className={date.covered ? "covered" : "not-covered"}>
                                                            <div>{date.owner}</div>
                                                            <div>{date.start} - {date.end}</div>
                                                        </div>
                                                    </NavLink>
                                                )
                                            }
                                            return ""
                                        })}
                                    </div>
                                </td>
                            })}
                            {length - i + 1 < 7 ? dotw.slice(length - i + 1).map(() => { (<td class="noday">&nbsp;</td>) }) : ""}
                        </tr>)

                        i = length + 1
                        // // console.log("last i:", i);
                    }
                }

                return days
            case 2:
                for (let i = 1; i <= length; i++) {
                    let j = 0;

                    if (i <= 20) {
                        if (i === 1) {
                            days.push(
                                <tr className='week-row'>
                                    {dotw.slice(0, 2).map(() => {
                                        return (<td class="noday">&nbsp;</td>)
                                    })}
                                    {dotw.slice(2).map((day) => {
                                        j++
                                        const counter = i + j - 1
                                        let eventsNum = 0
                                        return <td class={day}>
                                            {i + j - 1} {eventsNum ? eventsNum + " events" : ""}
                                            <div className='shifts'>
                                                {dateArr.map((date) => {
                                                    if (parseInt(date.day) === counter) {
                                                        eventsNum++
                                                        return (
                                                            <NavLink
                                                                key={date.id}
                                                                to={`/groups/${gId}/events/${date.id}`}
                                                                style={{ textDecoration: "none" }}
                                                                className="event-link"
                                                            >
                                                                <div className={date.covered ? "covered" : "not-covered"}>
                                                                    <div>{date.owner}</div>
                                                                    <div>{date.start} - {date.end}</div>
                                                                </div>
                                                            </NavLink>
                                                        )
                                                    }
                                                    return ""
                                                })}
                                            </div>
                                        </td>
                                    })}
                                </tr>
                            )
                        }
                        days.push(
                            <tr className='week-row'>
                                {dotw.map((day) => {
                                    j++
                                    const counter = i + j - 1
                                    let eventsNum = 0
                                    return <td class={day}>
                                        {i + j - 1} {eventsNum ? eventsNum + " events" : ""}
                                        <div className='shifts'>
                                            {dateArr.map((date) => {
                                                if (parseInt(date.day) === counter) {
                                                    eventsNum++
                                                    return (
                                                        <NavLink
                                                            key={date.id}
                                                            to={`/groups/${gId}/events/${date.id}`}
                                                            style={{ textDecoration: "none" }}
                                                            className="event-link"
                                                        >
                                                            <div className={date.covered ? "covered" : "not-covered"}>
                                                                <div>{date.owner}</div>
                                                                <div>{date.start} - {date.end}</div>
                                                            </div>
                                                        </NavLink>
                                                    )
                                                }
                                                return ""
                                            })}
                                        </div>
                                    </td>
                                })}
                            </tr>
                        )

                        i = i + j - 1
                    } else {
                        days.push(<tr className='week-row'>
                            {dotw.slice(0, length - i + 1).map((day) => {
                                j++
                                const counter = i + j - 1
                                let eventsNum = 0
                                return <td class={day}>
                                    {i + j - 1} {eventsNum ? eventsNum + " events" : ""}
                                    <div className='shifts'>
                                        {dateArr.map((date) => {
                                            if (parseInt(date.day) === counter) {
                                                eventsNum++
                                                return (
                                                    <NavLink
                                                        key={date.id}
                                                        to={`/groups/${gId}/events/${date.id}`}
                                                        style={{ textDecoration: "none" }}
                                                        className="event-link"
                                                    >
                                                        <div className={date.covered ? "covered" : "not-covered"}>
                                                            <div>{date.owner}</div>
                                                            <div>{date.start} - {date.end}</div>
                                                        </div>
                                                    </NavLink>
                                                )
                                            }
                                            return ""
                                        })}
                                    </div>
                                </td>
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
                                <tr className='week-row'>
                                    {dotw.slice(0, 3).map(() => {
                                        return (<td class="noday">&nbsp;</td>)
                                    })}
                                    {dotw.slice(3).map((day) => {
                                        j++
                                        const counter = i + j - 1
                                        let eventsNum = 0
                                        return <td class={day}>
                                            {i + j - 1} {eventsNum ? eventsNum + " events" : ""}
                                            <div className='shifts'>
                                                {dateArr.map((date) => {
                                                    if (parseInt(date.day) === counter) {
                                                        eventsNum++
                                                        return (
                                                            <NavLink
                                                                key={date.id}
                                                                to={`/groups/${gId}/events/${date.id}`}
                                                                style={{ textDecoration: "none" }}
                                                                className="event-link"
                                                            >
                                                                <div className={date.covered ? "covered" : "not-covered"}>
                                                                    <div>{date.owner}</div>
                                                                    <div>{date.start} - {date.end}</div>
                                                                </div>
                                                            </NavLink>
                                                        )
                                                    }
                                                    return ""
                                                })}
                                            </div>
                                        </td>
                                    })}
                                </tr>
                            )
                        }
                        days.push(
                            <tr className='week-row'>
                                {dotw.map((day) => {
                                    j++
                                    const counter = i + j - 1
                                    let eventsNum = 0
                                    return <td class={day}>
                                        {i + j - 1} {eventsNum ? eventsNum + " events" : ""}
                                        <div className='shifts'>
                                            {dateArr.map((date) => {
                                                if (parseInt(date.day) === counter) {
                                                    eventsNum++
                                                    return (
                                                        <NavLink
                                                            key={date.id}
                                                            to={`/groups/${gId}/events/${date.id}`}
                                                            style={{ textDecoration: "none" }}
                                                            className="event-link"
                                                        >
                                                            <div className={date.covered ? "covered" : "not-covered"}>
                                                                <div>{date.owner}</div>
                                                                <div>{date.start} - {date.end}</div>
                                                            </div>
                                                        </NavLink>
                                                    )
                                                }
                                                return ""
                                            })}
                                        </div>
                                    </td>
                                })}
                            </tr>
                        )

                        i = i + j - 1
                    } else {
                        days.push(<tr className='week-row'>
                            {dotw.slice(0, length - i + 1).map((day) => {
                                j++
                                const counter = i + j - 1
                                let eventsNum = 0
                                return <td class={day}>
                                    {i + j - 1} {eventsNum ? eventsNum + " events" : ""}
                                    <div className='shifts'>
                                        {dateArr.map((date) => {
                                            if (parseInt(date.day) === counter) {
                                                eventsNum++
                                                return (
                                                    <NavLink
                                                        key={date.id}
                                                        to={`/groups/${gId}/events/${date.id}`}
                                                        style={{ textDecoration: "none" }}
                                                        className="event-link"
                                                    >
                                                        <div className={date.covered ? "covered" : "not-covered"}>
                                                            <div>{date.owner}</div>
                                                            <div>{date.start} - {date.end}</div>
                                                        </div>
                                                    </NavLink>
                                                )
                                            }
                                            return ""
                                        })}
                                    </div>
                                </td>
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
                                <tr className='week-row'>
                                    {dotw.slice(0, 4).map(() => {
                                        return (<td class="noday">&nbsp;</td>)
                                    })}
                                    {dotw.slice(4).map((day) => {
                                        j++
                                        const counter = i + j - 1
                                        let eventsNum = 0
                                        return <td class={day}>
                                            {i + j - 1} {eventsNum ? eventsNum + " events" : ""}
                                            <div className='shifts'>
                                                {dateArr.map((date) => {
                                                    if (parseInt(date.day) === counter) {
                                                        eventsNum++
                                                        return (
                                                            <NavLink
                                                                key={date.id}
                                                                to={`/groups/${gId}/events/${date.id}`}
                                                                style={{ textDecoration: "none" }}
                                                                className="event-link"
                                                            >
                                                                <div className={date.covered ? "covered" : "not-covered"}>
                                                                    <div>{date.owner}</div>
                                                                    <div>{date.start} - {date.end}</div>
                                                                </div>
                                                            </NavLink>
                                                        )
                                                    }
                                                    return ""
                                                })}
                                            </div>
                                        </td>
                                    })}
                                </tr>
                            )
                        }
                        days.push(
                            <tr className='week-row'>
                                {dotw.map((day) => {
                                    j++
                                    const counter = i + j - 1
                                    let eventsNum = 0
                                    return <td class={day}>
                                        {i + j - 1} {eventsNum ? eventsNum + " events" : ""}
                                        <div className='shifts'>
                                            {dateArr.map((date) => {
                                                if (parseInt(date.day) === counter) {
                                                    eventsNum++
                                                    return (
                                                        <NavLink
                                                            key={date.id}
                                                            to={`/groups/${gId}/events/${date.id}`}
                                                            style={{ textDecoration: "none" }}
                                                            className="event-link"
                                                        >
                                                            <div className={date.covered ? "covered" : "not-covered"}>
                                                                <div>{date.owner}</div>
                                                                <div>{date.start} - {date.end}</div>
                                                            </div>
                                                        </NavLink>
                                                    )
                                                }
                                                return ""
                                            })}
                                        </div>
                                    </td>
                                })}
                            </tr>
                        )

                        i = i + j - 1
                    } else {
                        days.push(<tr className='week-row'>
                            {dotw.slice(0, length - i + 1).map((day) => {
                                j++
                                const counter = i + j - 1
                                let eventsNum = 0
                                return <td class={day}>
                                    {i + j - 1} {eventsNum ? eventsNum + " events" : ""}
                                    <div className='shifts'>
                                        {dateArr.map((date) => {
                                            if (parseInt(date.day) === counter) {
                                                eventsNum++
                                                return (
                                                    <NavLink
                                                        key={date.id}
                                                        to={`/groups/${gId}/events/${date.id}`}
                                                        style={{ textDecoration: "none" }}
                                                        className="event-link"
                                                    >
                                                        <div className={date.covered ? "covered" : "not-covered"}>
                                                            <div>{date.owner}</div>
                                                            <div>{date.start} - {date.end}</div>
                                                        </div>
                                                    </NavLink>
                                                )
                                            }
                                            return ""
                                        })}
                                    </div>
                                </td>
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
                                <tr className='week-row'>
                                    {dotw.slice(0, 5).map(() => {
                                        return (<td class="noday">&nbsp;</td>)
                                    })}
                                    {dotw.slice(5).map((day) => {
                                        j++
                                        const counter = i + j - 1
                                        let eventsNum = 0
                                        return <td class={day}>
                                            {i + j - 1} {eventsNum ? eventsNum + " events" : ""}
                                            <div className='shifts'>
                                                {dateArr.map((date) => {
                                                    if (parseInt(date.day) === counter) {
                                                        eventsNum++
                                                        return (
                                                            <NavLink
                                                                key={date.id}
                                                                to={`/groups/${gId}/events/${date.id}`}
                                                                style={{ textDecoration: "none" }}
                                                                className="event-link"
                                                            >
                                                                <div className={date.covered ? "covered" : "not-covered"}>
                                                                    <div>{date.owner}</div>
                                                                    <div>{date.start} - {date.end}</div>
                                                                </div>
                                                            </NavLink>
                                                        )
                                                    }
                                                    return ""
                                                })}
                                            </div>
                                        </td>
                                    })}
                                </tr>
                            )
                        }
                        days.push(
                            <tr className='week-row'>
                                {dotw.map((day) => {
                                    j++
                                    const counter = i + j - 1
                                    let eventsNum = 0
                                    return <td class={day}>
                                        {i + j - 1} {eventsNum ? eventsNum + " events" : ""}
                                        <div className='shifts'>
                                            {dateArr.map((date) => {
                                                if (parseInt(date.day) === counter) {
                                                    eventsNum++
                                                    return (
                                                        <NavLink
                                                            key={date.id}
                                                            to={`/groups/${gId}/events/${date.id}`}
                                                            style={{ textDecoration: "none" }}
                                                            className="event-link"
                                                        >
                                                            <div className={date.covered ? "covered" : "not-covered"}>
                                                                <div>{date.owner}</div>
                                                                <div>{date.start} - {date.end}</div>
                                                            </div>
                                                        </NavLink>
                                                    )
                                                }
                                                return ""
                                            })}
                                        </div>
                                    </td>
                                })}
                            </tr>
                        )

                        i = i + j - 1
                    } else {
                        days.push(<tr className='week-row'>
                            {dotw.slice(0, length - i + 1).map((day) => {
                                j++
                                const counter = i + j - 1
                                let eventsNum = 0
                                return <td class={day}>
                                    {i + j - 1} {eventsNum ? eventsNum + " events" : ""}
                                    <div className='shifts'>
                                        {dateArr.map((date) => {
                                            if (parseInt(date.day) === counter) {
                                                eventsNum++
                                                return (
                                                    <NavLink
                                                        key={date.id}
                                                        to={`/groups/${gId}/events/${date.id}`}
                                                        style={{ textDecoration: "none" }}
                                                        className="event-link"
                                                    >
                                                        <div className={date.covered ? "covered" : "not-covered"}>
                                                            <div>{date.owner}</div>
                                                            <div>{date.start} - {date.end}</div>
                                                        </div>
                                                    </NavLink>
                                                )
                                            }
                                            return ""
                                        })}
                                    </div>
                                </td>
                            })}
                            {length - i + 1 < 7 ? dotw.slice(length - i + 1).map(() => { (<td class="noday">&nbsp;</td>) }) : ""}
                        </tr>)

                        i = length + 1
                    }
                }

                return days
            case 6:
                // // console.log("case 6");
                for (let i = 1; i <= length; i++) {
                    let j = 0;

                    // // console.log("starting i:", i);
                    if (i <= 23) {
                        if (i === 1) {
                            days.push(
                                <tr className='week-row'>
                                    {dotw.slice(0, 6).map(() => {
                                        return (<td class="noday">&nbsp;</td>)
                                    })}
                                    {dotw.slice(6).map((day) => {
                                        j++
                                        const counter = i + j - 1
                                        let eventsNum = 0
                                        return <td class={day}>
                                            {i + j - 1} {eventsNum ? eventsNum + " events" : ""}
                                            <div className='shifts'>
                                                {dateArr.map((date) => {
                                                    if (parseInt(date.day) === counter) {
                                                        eventsNum++
                                                        return (
                                                            <NavLink
                                                                key={date.id}
                                                                to={`/groups/${gId}/events/${date.id}`}
                                                                style={{ textDecoration: "none" }}
                                                                className="event-link"
                                                            >
                                                                <div className={date.covered ? "covered" : "not-covered"}>
                                                                    <div>{date.owner}</div>
                                                                    <div>{date.start} - {date.end}</div>
                                                                </div>
                                                            </NavLink>
                                                        )
                                                    }
                                                    return ""
                                                })}
                                            </div>
                                        </td>
                                    })}
                                </tr>
                            )
                        }
                        days.push(
                            <tr className='week-row'>
                                {dotw.map((day) => {
                                    j++
                                    const counter = i + j - 1
                                    let eventsNum = 0
                                    return <td class={day}>
                                        {i + j - 1} {eventsNum ? eventsNum + " events" : ""}
                                        <div className='shifts'>
                                            {dateArr.map((date) => {
                                                if (parseInt(date.day) === counter) {
                                                    eventsNum++
                                                    return (
                                                        <NavLink
                                                            key={date.id}
                                                            to={`/groups/${gId}/events/${date.id}`}
                                                            style={{ textDecoration: "none" }}
                                                            className="event-link"
                                                        >
                                                            <div className={date.covered ? "covered" : "not-covered"}>
                                                                <div>{date.owner}</div>
                                                                <div>{date.start} - {date.end}</div>
                                                            </div>
                                                        </NavLink>
                                                    )
                                                }
                                            })}
                                        </div>
                                    </td>
                                })}
                            </tr>
                        )

                        i = i + j - 1
                        // // console.log("ending i:", i);
                    } else {
                        // // console.log("i checker:", i);
                        // // console.log("length checker:", length);
                        days.push(<tr className='week-row'>
                            {dotw.slice(0, length - i + 1).map((day) => {
                                j++
                                const counter = i + j - 1
                                let eventsNum = 0
                                return <td class={day}>
                                    {i + j - 1} {eventsNum ? eventsNum + " events" : ""}
                                    <div className='shifts'>
                                        {dateArr.map((date) => {
                                            if (parseInt(date.day) === counter) {
                                                eventsNum++
                                                return (
                                                    <NavLink
                                                        key={date.id}
                                                        to={`/groups/${gId}/events/${date.id}`}
                                                        style={{ textDecoration: "none" }}
                                                        className="event-link"
                                                    >
                                                        <div className={date.covered ? "covered" : "not-covered"}>
                                                            <div>{date.owner}</div>
                                                            <div>{date.start} - {date.end}</div>
                                                        </div>
                                                    </NavLink>
                                                )
                                            }
                                        })}
                                    </div>
                                </td>
                            })}
                            {length - i + 1 < 7 ? dotw.slice(length - i + 1).map(() => { (<td class="noday">&nbsp;</td>) }) : ""}
                        </tr>)

                        i = length + 1
                        // // console.log("last i:", i);
                    }
                }

                return days
            default:
                break;
        }
    }


    return (
        <table border="1px solid black" cellPadding="5px" cellSpacing="0" className="calendar">
            <tr className='month-label'>
                <th colSpan="7" className="month">{months[date.getMonth()]} {date.getFullYear()}</th>
            </tr>
            <tr className='day-label'>
                <th className="sun day">Sun</th>
                <th className="mon day">Mon</th>
                <th className="tue day">Tue</th>
                <th className="wed day">Wed</th>
                <th className="thu day">Thu</th>
                <th className="fri day">Fri</th>
                <th className="sat day">Sat</th>
            </tr>
            {generateCal()}
        </table>
    )
}

export default Calendar

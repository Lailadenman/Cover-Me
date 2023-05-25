import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { getGroups } from '../../store/group';
import { useDispatch, useSelector } from 'react-redux';


function Calendar() {
    const today = new Date();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    return (
        <table border="0" cellpadding="0" cellspacing="0" class="month">
            <tr>
                <th colspan="7" class="month">{today.getMonth() + 1} {today.getFullYear()}</th>
            </tr>
            <tr>
                <th class="mon">Mon</th>
                <th class="tue">Tue</th>
                <th class="wed">Wed</th>
                <th class="thu">Thu</th>
                <th class="fri">Fri</th>
                <th class="sat">Sat</th>
                <th class="sun">Sun</th>
            </tr>

        </table>
    )
}

export default Calendar

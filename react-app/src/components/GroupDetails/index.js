import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { getGroups } from '../../store/group';
import { useDispatch, useSelector } from 'react-redux';

function GroupDetails() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getGroupDetails())
        setIsLoaded(true)
    }, [dispatch])

    const group = useSelector(state => state.groups.)
    console.log(groups && groups);

    const groupsArr = Object.values(groups)
    console.log(groups && groupsArr);

    return (
        <div>
            <h1>test</h1>
            { groups && groupsArr.map((group) => {
                return <h1>{group.name}</h1>
            })}
        </div>
    )
}

export default GroupList;

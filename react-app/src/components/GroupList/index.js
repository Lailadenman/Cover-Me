import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { getGroups } from '../../store/group';
import { useDispatch, useSelector } from 'react-redux';

function GroupList() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getGroups())
        setIsLoaded(true)
    }, [dispatch])

    const groups = useSelector(state => state.groups)
    console.log(groups && groups);

    const groupsArr = Object.values(groups)
    console.log(groups && groupsArr);

    const onClick = () => {
        
    }

    return (
        <div>
            <h1>test</h1>
            { groups && groupsArr.map((group) => {
                return <h1>{group.name}</h1>
            })}
            <button onClick={onClick()}>New Group</button>
        </div>
    )
}

export default GroupList;

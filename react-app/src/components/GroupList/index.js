import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { getGroups } from '../../store/group';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import CreateGroupModal from '../CreateGroupModal';

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

    // const closeMenu = () => setShowMenu(false);

    return (
        <div>
            <h1>test</h1>
            {groups && groupsArr.map((group) => {
                return <NavLink
                    key={group?.id}
                    to={`/groups/${group?.id}`}
                    style={{ textDecoration: "none" }}
                    className="group-link"
                >
                    <h1>{group.name}</h1>
                </NavLink>
            })}
            <OpenModalButton
                buttonText={"New Group"}
                onItemClick={onClick}
                modalComponent={<CreateGroupModal />}
            />
            {/* <button onClick={onClick()}>New Group</button> */}
        </div>
    )
}

export default GroupList;

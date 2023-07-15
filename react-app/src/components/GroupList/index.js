import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { getGroups } from '../../store/group';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import CreateGroupModal from '../CreateGroupModal';
import "./GroupList.css"

function GroupList() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const history = useHistory()
    const sessionUser = useSelector(state => state?.session?.user)

    if (!sessionUser) {
        history.push('/')
    }

    useEffect(() => {
        dispatch(getGroups())
        setIsLoaded(true)
    }, [dispatch])

    const groups = useSelector(state => state.groups)
    // // console.log(groups && groups);

    const groupsArr = Object.values(groups)
    // // console.log(groups && groupsArr);

    const onClick = () => {

    }

    // const closeMenu = () => setShowMenu(false);

    return (
        <div className='group-page'>
            <div className='head'>
                <h1>Groups</h1>
            </div>
            {groups && groupsArr.map((group) => {
                return <NavLink
                    key={group?.id}
                    to={`/groups/${group?.id}`}
                    style={{ textDecoration: "none" }}
                    className="group-link"
                >
                    <h2>{group.name}</h2>
                </NavLink>
            })}
            <OpenModalButton
                buttonText={"Create a New Group"}
                onItemClick={onClick}
                modalComponent={<CreateGroupModal />}
            />
            {/* <button onClick={onClick()}>New Group</button> */}
        </div>
    )
}

export default GroupList;

import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { getGroupsByUser } from '../../store/group';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import CreateGroupModal from '../CreateGroupModal';
import "./MyGroupsPage.css"

function MyGroupsPage() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector(state => state.session.user.id)

    useEffect(() => {
        dispatch(getGroupsByUser(user))
        setIsLoaded(true)
    }, [dispatch])

    const groups = useSelector(state => state?.groups?.myGroups)
    console.log(groups && groups);

    const groupsArr = groups && Object.values(groups)
    console.log(groups && groupsArr);

    const onClick = () => {

    }

    // const closeMenu = () => setShowMenu(false);

    return (
        <div className='my-groups-page'>
            <div className='head'>
                <h1>My Groups</h1>
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
                buttonText={"Create your own group"}
                onItemClick={onClick}
                modalComponent={<CreateGroupModal />}
            />
        </div>
    )
}

export default MyGroupsPage;

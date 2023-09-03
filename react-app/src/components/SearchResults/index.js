import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { getGroups, searchGroupByName } from '../../store/group';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import CreateGroupModal from '../CreateGroupModal';
import "./SearchResults.css"
import { useParams } from 'react-router-dom/cjs/react-router-dom';

function SearchResults() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const history = useHistory()
    const sessionUser = useSelector(state => state?.session?.user)
    const { input } = useParams()

    // console.log(input);

    if (!sessionUser) {
        history.push('/')
    }

    useEffect(async () => {
        // console.log(input);
        const serRes = await dispatch(searchGroupByName(input))
        setIsLoaded(true)

        // console.log(serRes);
    }, [dispatch])

    const groups = useSelector(state => state?.groups)
    // console.log(groups && groups);

    const groupsArr = isLoaded ? groups && Object.values(groups?.searchRes) : []
    // // console.log(groups && groupsArr);

    const onClick = () => {

    }

    const updateSearchInput = (e) => {
        setSearchInput(e.target.value)
    };


    const sendSearch = (e) => {
        e.preventDefault()

        if (searchInput.length > 0) {
            dispatch(searchGroupByName(searchInput))
            history.push(`/results/${searchInput}`)
        }

        // history.push(`/results/${searchInput}`)
    }

    return (
        <div className='group-page'>
            <div className='head'>
                <h1>Search Results</h1>
            </div>
            {/* This is the search bar is works I just need to figure out how the results will look */}
            <form className="search-form" onSubmit={sendSearch}>
                <input
                    value={searchInput}
                    placeholder='Search Groups here...'
                    onChange={updateSearchInput}
                    className='group-search-input'
                /><button className="search-button" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
            </form>
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

export default SearchResults;

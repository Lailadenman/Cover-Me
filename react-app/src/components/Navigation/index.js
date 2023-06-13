import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { logout } from "../../store/session";
import Chat from "../Chat"

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef()
	const dispatch = useDispatch()
	const history = useHistory()

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const ulClassName = "dropdown-content" + (showMenu ? " show" : "");
	// const closeMenu = () => setShowMenu(false);

	const closeMenu = () => setShowMenu(false);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		history.push("/")
		closeMenu()
	};

	return (
		<ul className='navList'>
			<li>
				<NavLink className="home-link" exact to="/"><i class="fa-solid fa-house"></i></NavLink>
			</li>
			<div className='coverMeLogo'>
				<img className="logo" src='https://res.cloudinary.com/dbiv2lwhp/image/upload/v1686594262/C__2_-removebg-preview_mkzsri.png' />
			</div>
			<div className='dropdown'>
				<button className="menu" onClick={openMenu}>
					<i class="fa-solid fa-bars"></i>
				</button>
				<div id="myDropdown" className={ulClassName} ref={ulRef}>
					{isLoaded && (
						<li>
							<ProfileButton user={sessionUser} />
						</li>
					)}
					{/* {sessionUser && (<li>
						<NavLink exact to="/groups">Groups</NavLink>
					</li>)} */}
					{/* {sessionUser && (<li>
						<NavLink exact to="/groups/joined">My Groups</NavLink>
					</li>)} */}
					{sessionUser && (<li className='info logout'>
						<button onClick={handleLogout}>Log Out</button>
					</li>)}
				</div>
			</div>
		</ul>
	);
}

export default Navigation;

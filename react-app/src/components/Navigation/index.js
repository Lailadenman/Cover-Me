import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Chat from "../Chat"

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='navList'>
			<li>
				<NavLink exact to="/"><i class="fa-solid fa-house"></i></NavLink>
			</li>
			<div>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
				{/* {sessionUser && (<li>
				<NavLink exact to="/chat">Chat</NavLink>
			</li>)} */}
				{sessionUser && (<li>
					<NavLink exact to="/groups">Groups</NavLink>
				</li>)}
				{sessionUser && (<li>
					<NavLink exact to="/groups/joined">My Groups</NavLink>
				</li>)}
			</div>
		</ul>
	);
}

export default Navigation;

function NonMember({group, isRequested, isMember, onJoin}) {
    return (<div className="nonmem-all">
        <h2>Owner: {group?.owner}</h2>
        <h2>{group?.description}</h2>
        {isRequested ? (<p>Your request to join has already been send</p>) : (<div id='joinButton' className={!isMember ? "" : "hidden"}>
            <button onClick={onJoin}>Join</button>
        </div>)}
    </div>)
}

export default NonMember;

import { useSelector } from "react-redux"

function MyGroupsPage(uId) {
    const user = useSelector(state => state.session.user.id)

    return (
        <div>
            Profile
        </div>
    )
}

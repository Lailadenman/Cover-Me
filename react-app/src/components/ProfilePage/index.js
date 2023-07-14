import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserInfo } from "../../store/users"
import { useParams } from "react-router-dom/cjs/react-router-dom"

function ProfilePage() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector(state => state.session.user.id)
    const { id } = useParams()

    console.log("user id is", id);

    useEffect(() => {
        dispatch(getUserInfo(id))
        setIsLoaded(true)
    }, [dispatch])

    const profUser = useSelector(state => state.currUser.userProf)

    console.log(profUser && profUser, "This should be the first name");

    return (
        <div>
            {profUser && (<div>
                Profile for {profUser && profUser?.firstName}
            </div>)}
        </div>
    )
}

export default ProfilePage;

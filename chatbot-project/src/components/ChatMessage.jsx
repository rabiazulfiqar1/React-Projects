import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'
import dayjs from 'dayjs'

function ChatMessage(props) {
    const {message, sender, time}= props
    let src = RobotProfileImage;
    let direction = "flex-row";

    if (sender === "user") {
        src = UserProfileImage;
        direction = "flex-row-reverse";
    }
    return (
        <div className = {`flex items-center ${direction} gap-1.5 mb-4`}>
            <img src={src} alt="profile" className="w-11 h-11"/>
            <div  className="px-5 py-3 rounded-xl bg-gray-100 max-w-sm">
                <p>{message}</p>
                <p className='mt-1.5'>{dayjs(time).format("h:mma")}</p>
            </div>
        </div>
    );
}

export default ChatMessage
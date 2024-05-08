import "./stories.scss"
import { useContext } from "react";
import { AuthContext } from "../../context/authContext"

const Stories = () => {

  const {currentUser} = useContext(AuthContext)

  //temporary data
  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 4,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 5,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 6,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 7,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    }
  ];

  return (
    <div className="stories">
      {/* first story contains image,name and + button */}
      <div className="story">
        <div className="innerStory">
          <img src={"/upload/"+currentUser.profilePic} alt="" />
          <button>+</button>
        </div>
          <span className="name">{currentUser.name}</span>
      </div>
        {/* map thru stories array and select each element as story and update image and name to that specific element image and name  */}
      {stories.map(story=>(
        // wehenver we use map we need to give a unique key and here it is id
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span className="name">{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories
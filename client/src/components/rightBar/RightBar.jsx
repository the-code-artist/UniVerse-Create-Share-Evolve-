import "./rightBar.scss";

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        {/* container 1 */}
        {/* all containers are identified by same class name for same styling */}
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            {/* seperate div for profile pic and name */}
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span>Jane Doe</span>
            </div>
            {/* seperate div for 2 buttons */}
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          {/* repeat the above container */}
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
        </div>
        </div>
    </div>

  );
};

export default RightBar;

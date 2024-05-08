import { useContext,useState } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
// import axios from "axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// take setOpenUpdate and user as inputs
const Update = ({ setOpenUpdate, user }) => {
  const { currentUser,setCurrentUser } = useContext(AuthContext);
  // for cover and profile pic files
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  // use state for updated details
  // console.log("user", user);
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    website: user.website,
  });
  //used for uploading both cover and profile pic files
  const upload = async (file) => {
    // console.log("file:"+file)
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  // set the updated texts
  const handleChange = (e) => {
    // console.log([e.target.value])
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //   console.log("id:"+user.id)
  const queryClient = useQueryClient();
  const { mutate: mutation } = useMutation({
    mutationFn: (user) => {
      return makeRequest.put("/users", user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;
    console.log(coverUrl)
    mutation({ ...texts, coverPic:coverUrl, profilePic:profileUrl });
     // After updating user details, update the currentUser object
    setCurrentUser({ ...currentUser, ...texts, coverPic: coverUrl, profilePic: profileUrl });

    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    // same as post uploading
                    cover
                      ? URL.createObjectURL(cover)
                      : "/upload/" + user.coverPic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            {/* file 1 */}
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              //   update the pics on change and they are single files only
              onChange={(e) => setCover(e.target.files[0])}
            />
            {/* same for profile pic */}
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/upload/" + user.profilePic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            {/* file 2 */}
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          {/* email input */}
          <label>Email</label>
          <input
            type="text"
            value={texts.email}
            // placeholder=""
            name="email"
            onChange={handleChange}
          />
          {/* passoword input */}
          <label>Password</label>
          <input
            type="text"
            value={texts.password}
            name="password"
            onChange={handleChange}
          />
          <label>Name</label>
          <input
            type="text"
            value={texts.name}
            name="name"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={texts.website}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};
export default Update;

import "./share.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
const Share = ({ setOpenShare }) => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async () => {
    try {
      // createa form data as we cant directly send the file to api...
      const formData = new FormData();
      //pass the file(defined in use state) into this data
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      //return the file url if posted successfully
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();


  const { mutate: mutation } = useMutation({
    mutationFn: (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    // if there exist a file then call for upload function to upload and get the link
    if (file) imgUrl = await upload();
    //add desc and image url to database
    mutation({ desc, img: imgUrl });
    // mutation.
    setDesc("");
    setFile(null);
    setOpenShare(false);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"/upload/" + currentUser.profilePic} alt="" />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              // change the description
              onChange={(e) => setDesc(e.target.value)}
              // set the value to desc as the values in the input depends on the data in desc
              value={desc}
            />
          </div>
          {/* if file exists then create a fake url to show it on the right of screen while uploading it */}
          {/* by then we are not uploading it...but just storing it in our local storage */}
          <div className="right">
            {!file && (
              <div className="bottom">
                <div className="left">
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    // since we are adding only 1 image which will be stored in files[0]
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <label htmlFor="file">
                    <div className="item">
                      <AddPhotoAlternateIcon style={{color:"orange"}} />
                      <span>Add Image</span>
                    </div>
                  </label>
                </div>
              </div>
            )}
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
            <div className="right">
              <button onClick={handleClick}>Share</button>
            </div>
          </div>
        </div>
        {/* <hr /> */}
        <button className="close" onClick={() => setOpenShare(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default Share;

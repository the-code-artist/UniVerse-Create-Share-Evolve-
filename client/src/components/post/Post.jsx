import "./post.scss";
import Comments from "../comments/Comments";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
// import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useState, useEffect  } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
const Post = ({ post}) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [totalComments, setTotalComments] = useState(0); // State for total comments
  const { currentUser } = useContext(AuthContext);
  //TEMPORARY
  // const liked = false;
  // console.log("postid:",post.id)
  const {data: commentsData } = useQuery({
    queryKey: ["comments", post.id], // Use post.id as the query key to fetch comments for this post
    queryFn: () =>
      fetch("http://localhost:8800/api/comments?postId=" + post.id, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
  });

  useEffect(() => {
    if (Array.isArray(commentsData)) {
      setTotalComments(commentsData.length); // Update total comments when data changes
    }
  }, [commentsData]);
  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () => fetch('http://localhost:8800/api/likes?postId='+post.id, {
      method: 'GET',
      credentials: 'include', // Include cookies in the request
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers as needed (e.g., authorization header)
        // 'Authorization': `Bearer ${accessToken}`,
      },
    }).then(res => res.json())
  });
  const queryClient = useQueryClient();

  const { mutate:mutation} = useMutation({
    mutationFn:   (liked) => {
      // call the delete method(in likes.js of routes) by passing the url along with postid
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      //else send the post id which is later accessed as req.body.postId
      return makeRequest.post("/likes", { postId: post.id });
    },
    onSuccess: () => {  
      queryClient.invalidateQueries({
        queryKey: ['likes'],
      });
    },
  });
  const { mutate:deleteMutation} = useMutation({
    mutationFn:   (postId) => {
      
      return makeRequest.delete("/posts/"+postId);
    },
      onSuccess: () => {  
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
  });
  const handleLike = () => {
    // mutate the give value and it returns true or false(liked or not liked) depending on that we either delete the like or post the like
    mutation(data.includes(currentUser.id));
  };
  const handleDelete = () => {
    deleteMutation(post.id);
  };
  // console.log("post:",post)
  return (
    <div className="post">
      {/* total 3 containers */}
      <div className="container">
        {/* user details container */}
        <div className="user">
          {/* top part which contaains user details */}
          <div className="userInfo">
            <img src={"/upload/"+post.profilePic} alt="" />
            <div className="details">
              {/* link---to={} and style {{}} and span tags */}
              <Link
                to={`/profile/${post.userId}`}
                // inherit-- element to take the computed value of the property from its parent element. 
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        {/* post details container */}
        <div className="content">
          <p>{post.desc}</p>
          <img src={"/upload/" + post.img} alt="" />
        </div>
        {/* last icons container */}
        <div className="info">
          <div className="item">
            {/* {liked?} followed by text directoly*/}
            {error?console.log(error):isLoading ? (
              "loading"
              // if the data(contains all the posts that are liked) contain current user id then handle like
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data?.length} Likes
          </div>
          {/* onClick={()=>} */}
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {totalComments} Comments
          </div>
          {/* <div className="item">
            <ShareOutlinedIcon />
            Share
          </div> */}
        </div>
        {/* depending upon commentOpen value open the comments section */}
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;

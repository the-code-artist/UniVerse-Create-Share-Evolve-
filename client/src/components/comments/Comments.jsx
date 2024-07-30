import { useContext, useState} from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  console.log("current:",currentUser.profilePic)
  const { isLoading, error, data } = useQuery({
    queryKey: ["comments",postId],
    queryFn: () => fetch('http://localhost:8800/api/comments?postId=' + postId, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
  });

  console.log("data:", data);
  console.log("postId:", postId);
  const queryClient = useQueryClient();

  const { mutate:mutation} = useMutation({
    mutationFn:   (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        // refresh the comments query
        queryKey: ['comments'],
      });
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    mutation({ desc, postId });
    setDesc("");
  };
  // const totalComments = data ? data.length : 0;
  return (
    <div className="comments">
      <div className="write">
        <img src={"/upload/"+currentUser.profilePic} alt="" />
        <input type="text" placeholder="write a comment...."
        // update the values
        value={desc}
        onChange={(e) => setDesc(e.target.value)} />
        <button onClick={handleClick}>Send</button>
      </div>
      {error ? console.log(error) : isLoading ? "Loading..." :
        Array.isArray(data) ? data.map(comment => (
          <div className="comment" key={comment.id}>
            <img src={"/upload/"+comment.profilePic} alt="" />
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
          </div>
        )) : <p>Comments data is not an array</p>
      }
    </div>
  );
};
export default Comments;


import Post from "../post/Post";
import "./posts.scss";
import {
  useQuery,
} from '@tanstack/react-query'

// import { makeRequest } from "../../axios";

const Posts = ({userId}) => {
  const { isPending,error: postsError, data: postsData } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch('http://localhost:8800/api/posts?userId='+userId, {
      method: 'GET',
      credentials: 'include', // Include cookies in the request
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers as needed (e.g., authorization header)
        // 'Authorization': `Bearer ${accessToken}`,
      },
    }).then(res => res.json())
  });
  const {  error: commentsError, data: commentsData} = useQuery({
    queryKey: ["comments"],
    queryFn: () => fetch('http://localhost:8800/api/comments', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
  });
  if (postsError) {
    return <div>Error fetching posts: {postsError.message}</div>;
  }

  if (commentsError) {
    return <div>Error fetching comments: {commentsError.message}</div>;
  }
  return (
    <div className="posts">
      {isPending ? "Loading..." :
      // if no loading and no error then map....data.map(()=> </>)
      // data is not an array instead it is an object hence convert it to array first and then map
        Array.isArray(postsData) && Array.isArray(commentsData) ? postsData.map((post) => {
          // Filter comments for this post
          const postComments = commentsData.filter(comment => comment.postId === post.id);
          return (
            <Post
              key={post.id}
              post={post}
              totalComments={postComments.length}
            />
          );
        }) : console.log("not array")
      }
    </div>
  );
};

export default Posts;

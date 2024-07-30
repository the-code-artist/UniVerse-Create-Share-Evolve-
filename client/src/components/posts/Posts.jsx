import Post from "../post/Post";
import "./posts.scss";
import {
  useQuery
} from '@tanstack/react-query'
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
  if (postsError) {
    return <div>Unable to fetch posts :( </div>;
  }
  return (
    <div className="posts">
      {isPending ? <p className="loading">Loading...</p> :
      // if no loading and no error then map....data.map(()=> </>)
      // data is not an array instead it is an object hence convert it to array first and then map
        Array.isArray(postsData)  ? postsData.map((post) => {
          return (
            <Post
              key={post.id}
              post={post}
            />
          );
        }) : console.log("not array")
      }
    </div>
  );
};

export default Posts;

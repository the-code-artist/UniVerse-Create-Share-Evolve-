import Post from "../post/Post";
import "./posts.scss";
import {
  useQuery,
} from '@tanstack/react-query'

// import { makeRequest } from "../../axios";

const Posts = ({userId}) => {
  // TEMPORARY
  // const posts = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     userId: 1,
  //     profilePic:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Doe",
  //     userId: 2,
  //     profilePic:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //     desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
  //   },
  // ];
  // const { isLoading, error, data } = useQuery({["posts"], () =>
  //   makeRequest.get("/posts").then((res) => {
  //     return res.data;
  //   })
  // });
  // const { isLoading, error, data } = useQuery({
  //   ["posts"],
  //   () =>
  //   makeRequest.get("/posts").then((res) =>
  //       return res.data,
  //     ),
  // })
  // const { isPending, error, data } = useQuery({
  //   queryKey: ["posts"],
  //   // queryFn: async () =>{
  //   //   // await makeRequest.get("/posts").then(res=>{
  //   //   //   return res.data
  //   //   // })
  //   //   const response = await fetch('http://localhost:8800/api/posts');
  //   //   const data = await response.json();
  //   //   return data;
  //   queryFn: () =>
  //     fetch('http://localhost:8800/api/posts').then((res) =>
  //       res.json(),
  //     ),


  // })
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
  // console.log("commentsData:",commentsData)
  // return (
  // <div className="posts">
  //  {data.map((post)=>(
  //     // outline will be stored in post.jsx
  //     <Post post={post} key={post.id}/>
  //   ))} 
  // </div>
  // )
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

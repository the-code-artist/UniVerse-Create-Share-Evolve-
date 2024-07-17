import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
const Table = ({ data}) => {
  const { currentUser } = useContext(AuthContext);

  // Fetch relationship data to determine followed users
  const { isLoading: rIsLoading, data: relationshipData } = useQuery({
    queryKey: ["relationships"],
    queryFn: () =>
      fetch("http://localhost:8800/api/relationships/followed?followerUserId=" + currentUser.id,{
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ following, userId }) => {
      if (following) {
        return makeRequest.delete("/relationships?userId=" + userId);
      }
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relationships"] });
      queryClient.invalidateQueries({ queryKey: ["relationship"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleFollow = (userId) => {
    const isFollowing = relationshipData.includes(userId);
    mutation.mutate({ following: isFollowing, userId });
  };
  const sortedData = data
    .filter((item) => item.id !== currentUser.id)
    .sort((a, b) => b.id - a.id);
  return (
    <div className="explore">
      <div className="container">
        <div className="item">
        <span>Find new <strong>Friends!!!</strong></span>
          <div className="user">
            <table>
              <tbody>
                {sortedData
                  .filter((item) => item.id !== currentUser.id)
                  // .reverse()
                  .map((item) => (
                    <tr key={item.id}>
                      <div className="user">
                        <div className="userInfo">
                          <img src={"/upload/" + item.profilePic} alt="check" />
                          <td>{item.name}</td>
                        </div>
                        {rIsLoading ? (
                          "loading"
                        ) : (
                          <div className="buttons">
                            <button onClick={() => { window.location.href = `/profile/${item.id}`}}>
                              Profile
                            </button>
                            <button onClick={() => handleFollow(item.id)}>
                              {relationshipData.includes(item.id) ? "Following" : "Follow"}
                            </button>
                          </div>
                        )}
                      </div>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;


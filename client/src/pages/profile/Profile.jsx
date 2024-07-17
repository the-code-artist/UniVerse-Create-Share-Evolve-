import "./profile.scss";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { useState } from "react";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  // to take id number from url use useLocation hook
  //since useLocation() return a string but we want int user id hence use parseInt
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  // to fetch the users info
  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetch("http://localhost:8800/api/users/find/" + userId, {
        method: "GET",
        credentials: "include", // Include cookies in the request
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers as needed (e.g., authorization header)
          // 'Authorization': `Bearer ${accessToken}`,
        },
      }).then((res) => res.json()),
  });
  //to fetch the relationship data
  const { isLoading: rIsLoading, data: relationshipData } = useQuery({
    queryKey: ["relationship"],
    // fetch the followed/follwoing user id data and store it in relationship querykey
    queryFn: () =>
      fetch(
        "http://localhost:8800/api/relationships?followedUserId=" + userId,
        {
          method: "GET",
          credentials: "include", // Include cookies in the request
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers as needed (e.g., authorization header)
            // 'Authorization': `Bearer ${accessToken}`,
          },
        }
      ).then((res) => res.json()),
  });
  const queryClient = useQueryClient();

  const { mutate: mutation } = useMutation({
    //if following/ .includes return true then delete the relation for that user else post the new user
    mutationFn: (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      // post the new userId onto relationships table
      return makeRequest.post("/relationships", { userId });
    },

    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["relationship"],
      });
      queryClient.invalidateQueries({
        queryKey: ["relationships"],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  const handleFollow = () => {
    //if clicked to follow then call the mutation
    mutation(relationshipData.includes(currentUser.id));
  };

  return (
    <div className="profile">
      {error ? (
        console.log(error)
      ) : isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img src={"/upload/" + data.coverPic} alt="" className="cover" />
            <img
              src={"/upload/" + data.profilePic}
              alt=""
              className="profilePic"
            />
          </div>
          <div className="profileContainer">
            {/* user info container */}
            <div className="uInfo">
              {/* icons container */}
              <div className="center">
                {/* data.name=user name */}
                <span>{data.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{data.website}</span>
                  </div>
                </div>
                {rIsLoading ? (
                  "loading"
                ) : // if user id == current user id then  then we shouldnt have self follow hence we show update button
                userId === currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)}>update</button>
                ) : (
                  // for other users we need to show follow or following functionality
                  // if relationshs data have the currentuser id then it means we are follwing else not
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
            </div>
            {/* to fetch only users profile but not current user profile set the userId prop */}
            <Posts userId={userId} />
          </div>
          {/* <RightBar /> */}
        </>
      )}
      {/* pop the update form */}
      {/* also pass the data of user to update.js */}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;

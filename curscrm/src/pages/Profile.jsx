import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Dashboard from "./Dashboard";

const Profile = ({ profilePage }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div>
        <div className="preloader" id='preloader'>
          <div className="loader"></div>
        </div>
      </div>
    );
  }
  console.log(profilePage)

  return (
    isAuthenticated && (
      <div className="profile-page">
        <div className="profile-data">
          <img src={user.picture} alt={user.name} />
          <h2>Имя: {user.name}</h2>
          <p>Почта: {user.email}</p>
          <p>Никнейм: {user.nickname}</p>

          {/* <p>{user.sub}</p> */}
          <h1>Здесь Вы можете просмотреть свои услуги</h1>
        </div>

        <Dashboard profilePage={profilePage} />
      </div>
    )
  );
};

export default Profile;
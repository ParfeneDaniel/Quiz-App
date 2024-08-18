import React from "react";
import Header from "../components/Header";
import icon from "../assets/user-icon.png";

const Profile = () => {
  const username = "user1234";
  const description = "Really likes making quizzes";
  const occupation = "Makes quizzes";
  return (
    <div id="profile">
      <Header />
      <div className="flex-direction-row">
        <div id="about">
          <h2>ABOUT</h2>
          <br />
            <img className="icon" src={icon} />
            <h3>{username}</h3>
          <h4>Description: </h4>
          <p>{description}</p>
          <h4>Occupation: </h4>
          <p>{occupation}</p>
        </div>
        <div id="stats">
          <h2>STATS</h2>
          <br />
          <p>1711 XP</p>
          <p>396 plays</p>
          <p>etc</p>
        </div>
      </div>
      <div id="quizzes">QUIZZES</div>
    </div>
  );
};

export default Profile;

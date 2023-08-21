import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";


const Navigation = ({ userObj }) => (
  <nav>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <li>
      <Link to="/" style={{ marginRight: 10 }}>
      <img
            src={`${process.env.PUBLIC_URL}/emoji_icon.PNG`}
            alt="emoji-icon"
            style={{ width: "150px", height: "50px" }}
          />
        </Link>
      </li>
      <li>
      <Link
          to="/profile"
          style={{
            marginLeft: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <FontAwesomeIcon icon={faUser} color={"#002333"} size="2x" />
          <span style={{ marginTop: 10 }}>
            {userObj.displayName
              ? `${userObj.displayName}의 프로필`
              : "Mypage"}
          </span>
        </Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
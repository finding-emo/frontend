import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
<<<<<<< HEAD
import { faUser } from "@fortawesome/free-solid-svg-icons";


=======
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

>>>>>>> origin/master
const Navigation = ({ userObj }) => (
  <nav>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <li>
      <Link to="/" style={{ marginRight: 10 }}>
<<<<<<< HEAD
      <img
            src={`${process.env.PUBLIC_URL}/emoji_icon.PNG`}
            alt="emoji-icon"
            style={{ width: "150px", height: "50px" }}
          />
=======
          <FontAwesomeIcon icon={faComment} color={"#002333"} size="2x" />
>>>>>>> origin/master
        </Link>
      </li>
      <li>
      <Link
          to="/profile"
          style={{
<<<<<<< HEAD
            marginLeft: 100,
=======
            marginLeft: 10,
>>>>>>> origin/master
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
<<<<<<< HEAD
              : "Mypage"}
=======
              : "Profile"}
>>>>>>> origin/master
          </span>
        </Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
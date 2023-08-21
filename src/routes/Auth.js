import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";



const Auth = () => {
    const onSocialClick = async (event) => {
        const {
          target: { name },
        } = event;
        let provider;
        if (name === "google") {
          provider = new firebaseInstance.auth.GoogleAuthProvider();
        } 
        await authService.signInWithPopup(provider);
      };
    return (
      <div className="authContainer">
      <FontAwesomeIcon
        icon={faComment}
        color={"#159A9C"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
        <AuthForm />
        <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          구글 계정으로 로그인 <FontAwesomeIcon icon={faGoogle} />
        </button>
        </div>
      </div>
    );
  };
export default Auth
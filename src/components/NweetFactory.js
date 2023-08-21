import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storageService, dbService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { getEmojisFromAPI } from "./api";



const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const [emojis, setEmojis] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  
  const onSelectEmoji = (emoji) => {
    setSelectedEmoji(emoji);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (nweet === "") {
      return;
    }
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
      emoji: selectedEmoji,
      profileName: userObj.displayName || "user",
      emojiUrl: selectedEmoji ? selectedEmoji.url : null
    };

    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    setAttachment("");
    setEmojis([]);
    setSelectedEmoji(null);
  };

  const onEmojiButtonClick = async () => {
    if (nweet === "") {
      alert("글을 입력하신 후 이모티콘 추천 버튼을 눌러주세요!");
      return;
    }
  
    const results = await getEmojisFromAPI(nweet, userObj.uid);
    setEmojis(results||[]);
    console.log("이모티콘 데이터: ", results);
    setEmojis(results);
    
  };
 
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  
  

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="나의 말을 나만의 이모티콘으로"
          maxLength={300}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>

      <label htmlFor="emojiBtn" className="factoryInput__label" style={{ marginLeft: "10px" }}>
      <span>이모티콘 추천</span>
      <FontAwesomeIcon icon={faPlus} onClick={onEmojiButtonClick} />
      </label>
      <input type="button" id="emojiBtn" style={{ display: "none" }} />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
            alt="attachment"
          />

        </div>
      )}
       
       {emojis.length > 0 && (
  <div className="emojiPreview">
    {emojis.map((emoji, idx) => {
      console.log("이모티콘 URL: ", emoji.url || emoji);
      return (
        <img
          key={idx}
          src={emoji.url || emoji}
          alt={emoji.name}
          onClick={() => setSelectedEmoji(emoji)}
          style={{
          border: selectedEmoji === emoji ? "2px solid #4c9aff" : "none",
          }}
        />
      );
    })}
  </div>
)}
    </form>
  );
  
};
export default NweetFactory; 


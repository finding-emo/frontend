import React, { useState } from "react";
import { dbService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner, creatorName }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const {text, attachmentUrl, emojiUrl } = nweetObj;

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="여기에서 편집해주세요"
              value={newNweet}
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="편집완료" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            취소
          </span>
        </>
      ) : (
        <>
          <h4>
            {nweetObj.profileName || "user"}: {text}
            {emojiUrl && (
              <span style={{ marginLeft: "5px" }}>
                <img src={emojiUrl} alt="emoji" />
              </span>
            )}
          </h4>
          {attachmentUrl && <img src={attachmentUrl} />}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ color: "#002333" }}
                />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  style={{ color: "#002333" }}
                />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
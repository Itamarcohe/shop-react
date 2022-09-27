import React, { useEffect, useState } from "react";
import axios from "../../axios";

function comments(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    console.log("in use fetching comments from movies");
    axios
      .get(`https://bugtimemovies.herokuapp.com/all_comments/4/`)
      .then((res) => setComments(res.data));
    console.log(comments);
  }, []);

  let displayComments = [];
  if (comments) {
    displayComments = (
      <div>
        {comments &&
          comments.map((single_comment) => {
            return (
              <>
                Content: {single_comment.content}
                {single_comment.movie_name}; Sender:{" "}
                {single_comment.sender_username};
              </>
            );
          })}
      </div>
    );
  }

  return (
    <div>
      {displayComments}
      {/* {comments &&
        comments.map((single_comment) => {
          return single_comment.content;
        })} */}
      HELLOO!! comments
    </div>
  );
}

export default comments;

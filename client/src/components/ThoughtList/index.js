import React from "react";

const ThoughtList = ({ thoughts, title }) => {
    //We destructure the argument data to avoid using 
    //props.title and props.thoughts throughout the JSX code.
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            {/* key prop helps React internally track which data needs to be re-rendered if something changes. */}
            <p className="card-header">
              {thought.username}
              thought on {thought.createdAt}
            </p>
            <div className="card-body">
              <p>{thought.thoughtText}</p>
              <p className="mb-0">
                Reactions: {thought.reactionCount} || Click to{" "}
                {thought.reactionCount ? "see" : "start"} the discussion!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;

// {thoughts &&
//     thoughts.map((thought) => (

//     ))    
// }
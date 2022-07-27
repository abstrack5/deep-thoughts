import React from 'react';
import ReactionList from '../components/ReactionList';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';
import { useParams } from 'react-router-dom'; // parse out ID from url

const SingleThought = props => {
  const { id: thoughtId } = useParams();
  // console.log(`this messaage id is =>${thoughtId}<=`)
  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId }
  });

  const thought = data?.thought || {};
  // second arguemnt '{}' This is how you can pass variables to queries that need them.

  if(loading) {
    return <div> Loading.. </div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>

      {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}
    </div>
  );
};

export default SingleThought;

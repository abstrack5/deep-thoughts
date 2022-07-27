import React from 'react';
import ThoughtList  from '../components/ThoughtList';
import { useQuery } from '@apollo/client'; //to make requests to the GraphQL server
import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  // user useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  const thoughts = data?.thoughts || []; // This is called optional chaining
  //  if data exists, store it in the thoughts constant we just created. 
  // If data is undefined, then save an empty array to the thoughts component
  // console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          { loading ? (
            <div>Loading...</div> 
        ) : (
            <ThoughtList thoughts={thoughts} title='Some Feed for Thoughts...' />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

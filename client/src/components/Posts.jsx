import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { fetchUserPosts } from '../apiQueries/postQueries';
import PostCard from './PostCard';

const Posts = ({ user_id }) => {
  const navigate = useNavigate();
  /************** state init   *************** */
  const [showPosts, setShowPosts] = useState(false);

  /************* queries :: fetch posts ************* */
  const postsQuery = useQuery(['posts', user_id], () => fetchUserPosts(user_id), {
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const handleOnShowPosts = () => {
    postsQuery.refetch(['posts', user_id]);
    setShowPosts((prev) => !prev);
  };

  return (
    <div>
      <div className="w-full flex flex-row justify-end  items-center ">
        <button
          className="btn btn__add max-w-fit mx-2"
          onClick={() => navigate(`/posts/new/${user_id}`)}
        >
          add post
        </button>
        <button className="btn btn__show mx-2" onClick={handleOnShowPosts}>
          show posts
        </button>
      </div>

      {!showPosts
        ? null
        : postsQuery.isError
        ? 'Error : ' + postsQuery.error.message
        : postsQuery.isLoading || postsQuery.isFetching
        ? 'loading...'
        : !postsQuery?.data.length
        ? 'no posts'
        : postsQuery?.data.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              postsQuery={postsQuery}
              user_id={user_id}
            />
          ))}
    </div>
  );
};

export default Posts;

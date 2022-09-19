import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import UserCard from './UserCard';
import { fetchUsersList } from '../../apiQueries/userQueries';

const UsersList = () => {
  const queryClient = useQueryClient();
  const usersQuery = useQuery('users', fetchUsersList, {
    cacheTime: 1000 * 60 * 3,
  });

  //prefetch the users list
  const prefetchUsersList = async () => {
    // The results of this query will be cached like a normal query
    await queryClient.prefetchQuery('users', fetchUsersList, { staleTime: 1000 * 30 });
  };

  useEffect(() => {
    prefetchUsersList();
  }, []);

  //error handler
  if (usersQuery.isError) {
    return (
      <h2 className="text-red-700 text-center text-2xl uppercase">
        {usersQuery.error.message}
      </h2>
    );
  }

  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid justify-center items-center ">
        {usersQuery.isLoading || usersQuery.isFetching ? (
          <h1 className="text-orange-500 text-4xl uppercase">loading...</h1>
        ) : (
          <div>
            {!usersQuery.data
              ? null
              : usersQuery.data.map((user) => <UserCard key={user._id} user={user} />)}
          </div>
        )}
        {!usersQuery.isIdle && !usersQuery.isLoading && !usersQuery.data ? (
          <h1 className="text-blue-300 text-2xl uppercase">
            {' '}
            the contact list is empty{' '}
          </h1>
        ) : null}
      </div>
    </div>
  );
};

export default UsersList;

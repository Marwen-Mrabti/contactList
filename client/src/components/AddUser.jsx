import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createNewUser, EditUser, fetchUserById } from '../apiQueries/userQueries';
import Form from './shared/Form';

const USER_DEFAULT = { name: '', email: '', phone: '' };

const AddUser = () => {
  const { user_id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [user, setUser] = useState(USER_DEFAULT);

  const { data } = useQuery(['users', { user_id }], () => fetchUserById(user_id), {
    retry: 2,
    enabled: !!user_id,
  });

  //mock authentication
  useEffect(() => {
    data?.data && setUser(data.data);
  }, [data]);

  //add user
  const { mutate: mutationAddUser } = useMutation(createNewUser, {
    //navigate to home page
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      navigate('/');
      setUser(USER_DEFAULT);
    },
    onError: (error) => {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  //edit user
  const { mutate: mutationUpdateUser } = useMutation(() => EditUser(user_id, user), {
    //navigate to home page if the edit operation was successful
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      navigate('/');
      setUser(USER_DEFAULT);
    },

    onSettled: () => queryClient.invalidateQueries('users'),
  });

  //-------- form submit handler
  /**
   * If user_id does not exist, add a new user to the db, otherwise, mutate the user that has that id.
   */
  const handleOnSubmit = (e) => {
    e.preventDefault();

    !user_id
      ? //if user_id does not  exist ====> add new user to the db
        mutationAddUser({ id: Date.now(), ...user })
      : //if user_id exists (user_id !== undefined) ====> mutate the user  that has that id
        mutationUpdateUser({ ...user });
  };

  return (
    <div className="w-full h-[80vh] bg-slate-300 flex justify-center items-center">
      <Form
        handleOnSubmit={handleOnSubmit}
        user={user}
        setUser={setUser}
        user_id={user_id}
      />
    </div>
  );
};

export default AddUser;

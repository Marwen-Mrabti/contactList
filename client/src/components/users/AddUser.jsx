import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userSignUp } from '../../apiQueries/authQueries';
import { createNewUser, EditUser, fetchUserById } from '../../apiQueries/userQueries';
import Form from '../shared/Form';

const USER_DEFAULT = {
  name: '',
  email: '',
  phone: '',
  avatar: '',
  docs: '',
  password: '',
  passwordConfirm: '',
};

const AddUser = () => {
  const { user_id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [user, setUser] = useState(USER_DEFAULT);

  const userQuery = useQuery(['users', { user_id }], () => fetchUserById(user_id), {
    retry: 2,
    enabled: !!user_id,
    onSuccess: (data) => setUser(data),
  });

  /************* mutations :: create post ************* */
  const { mutate: mutationAddUser } = useMutation(
    () => createNewUser(new FormData(user)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        setUser(USER_DEFAULT);
        navigate('/');
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
    }
  );

  /************* mutations :: update post ************* */
  const { mutate: mutationUpdateUser } = useMutation(() => EditUser(user_id, user), {
    //navigate to home page if the edit operation was successful
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      setUser(USER_DEFAULT);
      navigate('/');
    },
    onSettled: () => queryClient.invalidateQueries('users'),
  });

  /************* handlers :: form submitting handler ************* */
  // const handleOnSubmit = (e) => {
  //   e.preventDefault();
  //   !user_id
  //     ? //if user_id does not  exist ====> add new user to the db
  //       mutationAddUser()
  //     : //if user_id exists (user_id !== undefined) ====> mutate the user  that has that id
  //       mutationUpdateUser();
  // };

  /************* mutations :: userSignUp ************* */
  const { mutate: mutationUserSignUp } = useMutation(userSignUp, {
    onSuccess: () => {
      queryClient.invalidateQueries('users'); // setUser(USER_DEFAULT);
      // navigate('/');
    },
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const userFormData = new FormData();
    //map the user to formData
    for (let key in user) {
      key !== 'docs' && userFormData.append(key, user[key]);
    }

    //append docs to the userFormData
    for (let i = 0; i < user.docs.length; i++) {
      userFormData.append('docs', user.docs[i]);
    }

    for (let key of userFormData) {
      console.log(key, userFormData[key]);
    }
    mutationUserSignUp(userFormData);
  };

  return (
    <div className="w-full min-h-[80vh] my-3 bg-slate-300 flex justify-center items-center">
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

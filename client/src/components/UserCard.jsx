import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { deleteUserById } from '../apiQueries/userQueries';
import { isAuthState } from '../recoilAtoms/userAtoms';
import Posts from './Posts';

const UserCard = ({ user }) => {
  //access the query client
  const queryClient = useQueryClient();
  /* A react router hook that allows you to navigate to a different route. */
  const navigate = useNavigate();
  const isAuth = useRecoilValue(isAuthState);

  //react query hook used in case of data mutation (delete, update, create)
  const { mutate: mutationDeleteUser } = useMutation(deleteUserById, {
    onSuccess: () => {
      toast.success('user deleted successfully', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      queryClient.invalidateQueries('users');
    },
    onError: () => {
      toast.error("couldn't delete user! try again ", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  /**
   * When the user clicks the edit button, navigate to the edit user page.
   */
  const handleOnEdit = () => {
    navigate(`/users/edit-user/${user._id}`);
  };

  /**
   *@description When the delete button is clicked, delete the user.
   *@param user_id
   */
  const handleOnDelete = () => {
    const confirmDelete = prompt(
      'this action can not be undone!!! type delete if you are sure?',
      "don't delete"
    );
    if (confirmDelete === 'delete') {
      mutationDeleteUser(user._id);
    }
  };


  return (
    <div className="w-[80vw] bg-gray-300 shadow-lg my-4 px-8 py-2 rounded-md flex flex-col gap-3">
      <div
        className={` px-2 my-2 grid ${
          isAuth ? 'grid-cols-4' : 'grid-cols-2'
        } justify-between items-center gap-2`}
      >
        <h3 className="text-lg">{user?.name} </h3>
        <h3 className="text-lg">{user?.email} </h3>
        {isAuth && (
          <>
            <button className="btn btn__edit" onClick={handleOnEdit}>
              edit
            </button>
            <button className="btn btn__delete" onClick={handleOnDelete}>
              delete
            </button>
          </>
        )}
      </div>
      <Posts user_id={user._id} />
    </div>
  );
};

export default UserCard;

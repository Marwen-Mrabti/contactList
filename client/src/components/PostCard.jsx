import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { isAuthState } from '../recoilAtoms/userAtoms';
import { useRecoilValue } from 'recoil';
import { deleteUserPost } from '../apiQueries/postQueries';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post, user_id, postsQuery }) => {
  const queryClient = useQueryClient();
  const isAuth = useRecoilValue(isAuthState);
  const navigate = useNavigate();

  /************* mutations :: delete ************* */
  const { mutate: mutationDeletePost } = useMutation(
    () => deleteUserPost(user_id, post._id),
    {
      onSuccess: () => {
        postsQuery.refetch(['posts', user_id]);
        queryClient.invalidateQueries(['posts', user_id]);
      },
      onError: (error) => console.log('deletePostError', error.message),
    }
  );

  /************* handlers :: edit post handler  ************* */
  const handleOnPostEdit = () => {
    navigate(`/posts/edit/${user_id}/${post._id}`);
  };

  /************* handlers :: delete post handler  ************* */
  const handleOnDeletePost = () => {
    const confirmDelete = prompt(
      'this action can not be undone!!! type delete if you are sure?',
      "don't delete"
    );
    if (confirmDelete === 'delete') {
      mutationDeletePost();
    }
  };

  return (
    <div
      className={`bg-gray-200 px-2 my-2 grid ${
        isAuth ? 'grid-cols-2' : 'grid-cols-1'
      } justify-between items-center gap-2`}
    >
      <p className="text-md">{post.text}</p>
      {isAuth && (
        <div className="flex flex-row gap-2">
          <button className="btn btn__edit" onClick={handleOnPostEdit}>
            edit
          </button>
          <button className="btn btn__delete" onClick={handleOnDeletePost}>
            delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;

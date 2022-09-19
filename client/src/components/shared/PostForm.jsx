import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  createUserPost,
  fetchUserPostById,
  updateUserPost,
} from '../../apiQueries/postQueries';
import { userPostState } from '../../recoilAtoms/postAtoms';

const PostForm = () => {
  const { user_id, post_id } = useParams();
  const navigate = useNavigate();
  const [userPost, setUserPost] = useRecoilState(userPostState);

  /****
   * @description fetch post by id and populate userPost with the response's data
   ********/
  const postQuery = useQuery(
    ['posts', user_id, post_id],
    () => fetchUserPostById(user_id, post_id),
    {
      enabled: !!post_id,
      onSuccess: (data) => setUserPost(data),
    }
  );

  /************* mutations :: create post ************* */
  const { mutate: mutationCreatePost } = useMutation(
    () => createUserPost(user_id, userPost),
    {
      onSuccess: () => {
        setUserPost({ ...userPost, text: '' });
        navigate('/');
      },
    }
  );

  /************* mutations :: update post ************* */
  const { mutate: mutationUpdatePost } = useMutation(
    () => updateUserPost(user_id, post_id, userPost),
    {
      onSuccess: () => {
        setUserPost({ ...userPost, text: '' });
        navigate('/');
      },
    }
  );

  /************* handlers :: form submitting handler ************* */
  const handleOnFormSubmit = (e) => {
    e.preventDefault();
    !post_id ? mutationCreatePost() : mutationUpdatePost();
  };

  return (
    <div className="h-[80vh] flex justify-center items-center">
      <form className="w-[70%] bg-white p-3" onSubmit={handleOnFormSubmit}>
        <input
          className="w-full bg-blue-200 my-4 py-2 px-8 rounded-md"
          type="text"
          placeholder="what is in your mind"
          required={true}
          value={userPost.text}
          onChange={(e) => setUserPost((prev) => ({ ...prev, text: e.target.value }))}
        />
        <button type="submit" className="btn btn__submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;

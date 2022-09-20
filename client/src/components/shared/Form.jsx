import React from 'react';

const Form = ({ handleOnSubmit, setUser, user, user_id }) => {
  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleOnSubmit}
      className="w-[50%] min-h-[40vh] bg-slate-50 shadow-lg p-4 flex flex-col items-center justify-around"
    >
      <input
        className="w-full bg-blue-200 my-4 py-2 px-8 rounded-md"
        type="text"
        placeholder="enter your name"
        required={true}
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        className="w-full bg-blue-200 my-4 py-2 px-8 rounded-md"
        type="email"
        placeholder="enter your email"
        required={true}
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        className="w-full bg-blue-200 my-4 py-2 px-8 rounded-md"
        type="tel"
        placeholder="enter your phone number"
        pattern="[2|4|5|9]{1}[0-9]{7}"
        required={true}
        value={user.phone}
        onChange={(e) => setUser({ ...user, phone: e.target.value })}
      />
      <input
        className="w-full bg-blue-200 my-4 py-2 px-8 rounded-md"
        type="password"
        placeholder="enter your password"
        required={true}
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />{' '}
      <input
        className="w-full bg-blue-200 my-4 py-2 px-8 rounded-md"
        type="password"
        placeholder="retype your password"
        required={true}
        value={user.passwordConfirm}
        onChange={(e) => setUser({ ...user, passwordConfirm: e.target.value })}
      />
      {/* images and files */}
      <input
        type="file"
        name="avatar"
        onChange={(e) => {
          setUser({ ...user, avatar: e.target.files[0] });
        }}
      />
      <input
        type="file"
        name="docs"
        multiple
        onChange={(e) => {
          setUser({ ...user, docs: e.target.files });
        }}
      />
      <button type="submit" className="btn btn__add">
        {!user_id ? 'submit' : 'edit user'}
      </button>
    </form>
  );
};

export default Form;

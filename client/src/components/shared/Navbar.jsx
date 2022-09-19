import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isAuthState } from '../../recoilAtoms/userAtoms';

const Navbar = () => {
  const [isAuth, setIsAuth] = useRecoilState(isAuthState);

  //handle on login
  /**
   * save auth key with true as its value to local storage
   * set isAuth to true
   */
  const handleOnLogin = () => {
    setIsAuth(true);
    // localStorage.setItem('authkey', true);
    //**recoilPersist */
  };

  //handle on logout
  /**
   * remove auth key from local storage
   * set isAuth to false
   */
  const handleOnLogout = () => {
    // localStorage.removeItem('authkey');
    setIsAuth(false);
  };

  return (
    <div className="text-white flex justify-center items-center gap-x-16 h-16 w-full my-4 px-16 bg-slate-500">
      <Link to="/" className="text-2xl uppercase">
        users
      </Link>
      <Link to="/users/sign-up" className="text-2xl uppercase">
        Sign-up
      </Link>
      <Link to="/users/sign-in" className="text-2xl uppercase">
        Sign-in
      </Link>
      {!isAuth ? (
        <button className="btn text-blue-700" onClick={handleOnLogin}>
          login
        </button>
      ) : (
        <button className="btn text-red-700" onClick={handleOnLogout}>
          logout
        </button>
      )}
    </div>
  );
};

export default Navbar;

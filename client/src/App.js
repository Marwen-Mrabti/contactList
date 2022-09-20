import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Routes } from 'react-router-dom';
import {
  Navbar,
  UsersList,
  PostForm,
  RegisterForm,
  LoginForm,
  AddUser,
} from './components';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* users routes */}
        <Route index element={<UsersList />} />
        <Route path="/users/sign-up" element={<RegisterForm />} />
        <Route path="/users/sign-in" element={<LoginForm />} />
        <Route path="/users/add-user" element={<AddUser />} />

        {/* posts routes */}
        <Route
          path="/posts/new/:user_id"
          element={
            <PrivateRoute>
              <PostForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts/edit/:user_id/:post_id"
          element={
            <PrivateRoute>
              <PostForm />
            </PrivateRoute>
          }
        />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  );
}

export default App;

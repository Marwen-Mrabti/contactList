import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Routes } from 'react-router-dom';
import { AddUser, Navbar, UsersList, PostForm } from './components';
import PrivateRoute from './components/shared/PrivateRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* users routes */}
        <Route index element={<UsersList />} />
        <Route
          path="/users/add-user"
          element={
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/edit-user/:user_id"
          element={
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          }
        />

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

import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Routes } from 'react-router-dom';
import { AddUser, Navbar, UsersList } from './components';
import PrivateRoute from './components/shared/PrivateRoute';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
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
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  );
}

export default App;

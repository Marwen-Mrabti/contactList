import React from 'react';
import Form from '../shared/Form';

const RegisterForm = () => {


  return (
    <div className="w-[100vw] flex justify-center">
      <Form handleOnSubmit setUser user user_id />
    </div>
  );
};

export default RegisterForm;

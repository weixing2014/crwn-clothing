import React, { useState } from 'react';

import FormInput from '../FormInput/FormInput.component';
import CustomButton from '../CustomButton/CustomButton.component';
import {
  auth,
  getOrCreateUserProfileDocument,
} from '../../firebase/firebase.utils';

import './SignUp.styles.scss';

const initFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(initFormFields);

  const handleChange = (event) => {
    const { value, name } = event.target;

    setFormFields({ [name]: value, ...formFields });
  };

  const handleSubmit = async (event) => {
    const {
      email,
      password,
      confirmPassword,
    } = formFields;

    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords don\'t match');
      return;
    }

    try {
      const { userAuth } = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      const userRef = await getOrCreateUserProfileDocument(userAuth);
      console.log(userRef);

      setFormFields(initFormFields);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='sign-up'>
      <h2 className='title'>I don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          name='displayName'
          type='text'
          handleChange={handleChange}
          value={formFields.displayName}
          label='Display Name'
          required
        />
        <FormInput
          name='email'
          type='email'
          handleChange={handleChange}
          value={formFields.email}
          label='Email'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={formFields.password}
          handleChange={handleChange}
          label='password'
          required
        />
        <FormInput
          name='confirmPassword'
          type='password'
          value={formFields.confirmPassword}
          handleChange={handleChange}
          label='Confirm Password'
          required
        />
        <div className='buttons'>
          <CustomButton type='submit'>Sign up</CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
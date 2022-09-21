import React, { useState, useContext } from 'react';

import FormInput from '../FormInput/FormInput.component';
import CustomButton from '../CustomButton/CustomButton.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import { UserContext } from '../../context/user.context';

import './SignIn.styles.scss';

const initialState = {
  email: '', password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(initialState);

  const { setCurrentUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { value, name } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = formFields;

    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      console.log(`Sign in as user ${JSON.stringify(user)}`);
      setCurrentUser(user);
      setFormFields(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  return (<div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          handleChange={handleChange}
          value={formFields.email}
          label='email'
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
        <div className='buttons'>
          <CustomButton type='submit'>Sign in</CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>);
};

export default SignInForm;
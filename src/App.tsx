import React from 'react';
import './App.css';
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"

interface IFormState {
  name: string;
  password: string;
  confirmPassword: string;
}

function App() {
  const form = useForm<IFormState>({
    defaultValues: {
      name: '',
      password: '',
      confirmPassword: '',
    },
    reValidateMode: 'onChange',
  });

  const { watch, register, handleSubmit, formState: {errors} } = form;

  const onSubmit = (data: IFormState) => {
    console.log(data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Register</h2>
          <p>
            Name:
          </p>
          <input type={'text'} {...register("name",
            {
                required: 'This field is required.',
                maxLength: {
                  value: 10,
                  message: 'Name can have only 10 characters'
                },
                minLength: {
                  value: 3,
                  message: 'Name should be at least 3 characters'
                }
            }
          )} />
          <span className={'errors'}>
            <ErrorMessage errors={errors} name="name" />
          </span>

          <p>
            Password:
          </p>
          <input type={'password'} {...register("password",
            {
              required: 'This field is required.',
              maxLength: {
                value: 20,
                message: 'Password can have only 20 characters'
              },
              minLength: {
                value: 3,
                message: 'Password should be at least 3 characters'
              },
              validate: (password: string) => {
                if (watch('confirmPassword') !== password) {
                  return 'Passwords should be equal';
                }
              }
            })} />
          <span className={'errors'}>
            <ErrorMessage errors={errors} name="password" />
          </span>

          <p>
            Confirm Password:
          </p>
          <input type={'password'} {...register("confirmPassword",
            {
              required: 'This field is required.',
              maxLength: {
                value: 20,
                message: 'Password can have only 20 characters'
              },
              minLength: {
                value: 3,
                message: 'Password should be at least 3 characters'
              },
              validate: (confirmPassword: string) => {
                if (watch('password') !== confirmPassword) {
                  return 'Passwords should be equal';
                }
              }
            })} />
          <span className={'errors'}>
            <ErrorMessage errors={errors} name="confirmPassword" />
          </span>

          <button type={'submit'}>Register</button>
        </form>
      </header>
    </div>
  );
}

export default App;

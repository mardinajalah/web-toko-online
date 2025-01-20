import Link from 'next/link';
import styles from './Register.module.scss'
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

const RegisterView = () => {
  const [isLoding, setIsLoding] = useState(false);
  const [error, setError] = useState('');

  const { push } = useRouter();
  const hendelSabmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoding(true);
    setError('');
    const form = e.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullName: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value
    }

    const result = await fetch('/api/user/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    
    if (result.status === 200) {
      form.reset();
      setIsLoding(false);
      push('/auth/login');
    }else {
      setIsLoding(false);
      setError('Email is already registered');
    }
  }

  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      {error && <p className={styles.register__error}>{error}</p>}
      <div className={styles.register__form}>
        <form onSubmit={hendelSabmit}>
          <div className={styles.register__form__item}>
            <label htmlFor="email">email</label>
            <input 
              type="email" 
              name='email' 
              id='email' 
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="fullname">Fullname</label>
            <input
              type="text"
              name='fullname'
              id='fullname'
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="phone">phone</label>
            <input 
              type="text"
              name='phone' 
              id='phone' 
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="password">password</label>
            <input 
              type="password"
              name='password' 
              id='password' 
              className={styles.register__form__item__input}
            />
          </div>
          <button 
            type='submit'
            className={styles.register__form__button}
          >
            {isLoding ? 'Loading...' : 'Register'}
          </button>
        </form>
      </div>
      <p className={styles.register__link}>Have an account? Sign in <Link href="/auth/login">here</Link> </p>
    </div>
  )
};

export default RegisterView;
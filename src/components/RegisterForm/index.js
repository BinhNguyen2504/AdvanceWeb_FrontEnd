const RegisterForm = () => (
  // const onFinish = (values) => {
  //   console.log('Success:', values);
  // };
  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };

  <div className='form-container'>
    <form name='register' autoComplete='off'>
      <h3>register now</h3>
      <p>
        your name
        <span>*</span>
      </p>
      <input type='text' name='name' placeholder='enter your name' required className='box' />
      <p>
        your email
        <span>*</span>
      </p>
      <input type='email' name='email' placeholder='enter your email' required className='box' />
      <p>
        your password
        <span>*</span>
      </p>
      <input type='password' name='pass' placeholder='enter your password' required className='box' />
      <p>
        confirm password
        <span>*</span>
      </p>
      <input type='password' name='c_pass' placeholder='confirm your password' required className='box' />
      <p>
        select profile
        <span>*</span>
      </p>
      <input type='file' accept='image/*' required className='box' />
      <input type='submit' value='register new' name='submit' className='btn' />
    </form>
  </div>
);
export default RegisterForm;

import { Checkbox, Col } from 'antd';
import CustomForm from '../../components/form/CustomForm';
import CustomInput from '../../components/form/CustomInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerFormSchema } from '../../schemas/auth.schema';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../redux/features/user/userApi';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import logo from '../../assets/images/dark-logo.png';
import registerGif from '../../assets/images/register.gif';
import { useState } from 'react';
import useTitle from '../../hooks/useTitle';

const Register = () => {
  useTitle('Register');
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const [register] = useRegisterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Register in');

    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const res = await register(userInfo).unwrap();

      if (res.success === true) {
        toast.success(`${res.message}. Please Login!`, {
          id: toastId,
          duration: 5000,
        });
        navigate(`/`);
      }
    } catch (error) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };

  return (
    <section className="my-10 lg:max-w-7xl lg:mx-auto px-5">
      <Link to="/">
        <img className="h-16 mx-auto mb-5" src={logo} alt="Logo" />
      </Link>
      <div className="lg:flex items-center justify-center gap-10">
        <div>
          <img src={registerGif} alt="Register" />
        </div>
        <Col sm={24} lg={10}>
          <CustomForm
            onSubmit={onSubmit}
            resolver={zodResolver(registerFormSchema)}
          >
            <h2 className="text-3xl font-semibold mb-5">Register</h2>
            <CustomInput type="text" name="name" label="Name" />
            <CustomInput type="email" name="email" label="Email" />
            <CustomInput type="password" name="password" label="Password" />

            <div className="mt-8 mb-3 font-medium">
              <Checkbox onClick={() => setAccepted(!accepted)}>
                I agree to the{' '}
                <Link to="/about-us" style={{ textDecoration: 'underline' }}>
                  terms and conditions
                </Link>
              </Checkbox>
            </div>

            <button
              className="bg-[#3F90FC] text-white cursor-pointer w-full text-base font-medium px-8 py-2 rounded-sm flex justify-center items-center"
              type="submit"
              disabled={!accepted}
            >
              Register
            </button>
          </CustomForm>
          <p className="text-center text-base text-accent mt-5">
            Already have an account?{' '}
            <Link
              style={{ textDecoration: 'underline' }}
              className="text-primary underline"
              to="/login"
            >
              Login
            </Link>
          </p>
        </Col>
      </div>
    </section>
  );
};

export default Register;

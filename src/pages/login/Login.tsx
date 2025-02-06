import { Col } from 'antd';
import CustomForm from '../../components/form/CustomForm';
import CustomInput from '../../components/form/CustomInput';
import { toast } from 'sonner';
import { setUser, TUser } from '../../redux/features/auth/authSlice';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/features/auth/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '../../schemas/auth.schema';
import { verifyToken } from '../../utils/verifyToken';
import logo from '../../assets/images/dark-logo.png';
import loginGif from '../../assets/images/login.gif';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Logging in');

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success('Logged in successfully', { id: toastId, duration: 2000 });
      navigate(`/`);
    } catch (error) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };

  return (
    <section className="my-12 lg:max-w-7xl lg:mx-auto px-5">
      <Link to="/" className="">
        <img className="h-16 mx-auto" src={logo} alt="Logo" />
      </Link>
      <div className="lg:flex items-center justify-center gap-10">
        <div>
          <img src={loginGif} alt="Login" />
        </div>
        <Col sm={24} lg={10}>
          <CustomForm
            onSubmit={onSubmit}
            resolver={zodResolver(loginFormSchema)}
          >
            <h2 className="text-3xl font-semibold mb-5">Login</h2>
            <CustomInput type="email" name="email" label="Email" />
            <CustomInput type="password" name="password" label="Password" />

            <button className="bg-[#3F90FC] hover:bg-[#1677ff] text-white cursor-pointer mt-5 w-full text-base font-medium px-8 py-2 rounded-sm flex justify-center items-center">
              Login
            </button>
          </CustomForm>
          <p className="text-center text-base text-accent mt-5">
            Don’t have an account?{' '}
            <Link className="text-primary" to="/register">
              Create an account
            </Link>
          </p>
        </Col>
      </div>
    </section>
  );
};

export default Login;

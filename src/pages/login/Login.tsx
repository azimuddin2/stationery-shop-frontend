import { Button, Col, Flex } from 'antd';
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
      toast.success('Logged in', { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };

  return (
    <Flex justify="center" align="center" style={{ height: '100vh' }}>
      <Col sm={18} lg={6}>
        <CustomForm onSubmit={onSubmit} resolver={zodResolver(loginFormSchema)}>
          <h2 style={{ marginBottom: '12px', fontSize: '30px' }}>Login</h2>
          <CustomInput type="email" name="email" label="Email" />
          <CustomInput type="password" name="password" label="Password" />
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </CustomForm>
        <Link to="/register">Please Register</Link>
      </Col>
    </Flex>
  );
};

export default Login;

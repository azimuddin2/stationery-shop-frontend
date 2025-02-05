import { Button, Col, Flex } from 'antd';
import CustomForm from '../../components/form/CustomForm';
import CustomInput from '../../components/form/CustomInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerFormSchema } from '../../schemas/auth.schema';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../redux/features/user/userApi';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const Register = () => {
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
    <Flex justify="center" align="center" style={{ height: '100vh' }}>
      <Col sm={18} lg={6}>
        <CustomForm
          onSubmit={onSubmit}
          resolver={zodResolver(registerFormSchema)}
        >
          <h2 style={{ marginBottom: '12px', fontSize: '30px' }}>Register</h2>
          <CustomInput type="text" name="name" label="Name" />
          <CustomInput type="email" name="email" label="Email" />
          <CustomInput type="password" name="password" label="Password" />
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </CustomForm>
        <Link to="/login">Please Login</Link>
      </Col>
    </Flex>
  );
};

export default Register;

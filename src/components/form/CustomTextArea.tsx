import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Controller } from 'react-hook-form';
import { MdErrorOutline } from 'react-icons/md';

type TTextAreaProps = {
  name: string;
  label?: string;
};

const CustomTextArea = ({ name, label }: TTextAreaProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item style={{ marginBottom: '12px' }} label={label}>
          <TextArea
            {...field}
            id={name}
            style={{ width: '100%' }}
            size="large"
          />
          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                color: 'red',
                marginTop: '2px',
              }}
            >
              <MdErrorOutline
                style={{ fontSize: '18px', marginRight: '2px' }}
              />
              <span>{error.message}</span>
            </div>
          )}
        </Form.Item>
      )}
    />
  );
};

export default CustomTextArea;

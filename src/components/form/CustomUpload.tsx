import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';
import { MdErrorOutline } from 'react-icons/md';

type TUploadProps = {
  type: string;
  name: string;
  label?: string;
};

const CustomUpload = ({ type, name, label }: TUploadProps) => {
  return (
    <Controller
      name={name}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => (
        <Form.Item label={label}>
          <Input
            type={type}
            value={value?.fileName}
            {...field}
            onChange={(e) => onChange(e.target.files?.[0])}
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

export default CustomUpload;

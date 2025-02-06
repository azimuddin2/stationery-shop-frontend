import { Form } from 'antd';
import { Controller } from 'react-hook-form';
import { BiImageAdd } from 'react-icons/bi';
import { MdErrorOutline } from 'react-icons/md';

type TUploadProps = {
  name: string;
};

const CustomUpload = ({ name }: TUploadProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Form.Item>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '24px 0px',
              border: '1px dashed #3F90FC',
              borderRadius: '8px',
              cursor: 'pointer',
              width: '100%',
              marginTop: '10px',
            }}
          >
            <BiImageAdd size={30} color="#3F90FC" />
            <span className="text-accent font-medium">Upload Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onChange(e.target.files?.[0] || null)}
              style={{ display: 'none' }}
            />
          </label>
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

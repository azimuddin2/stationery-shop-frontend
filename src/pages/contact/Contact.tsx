import useTitle from '../../hooks/useTitle';
import ContactForm from './ContactForm';
import OurLocation from './OurLocation';

const Contact = () => {
  useTitle('Contact Us');

  return (
    <div className="lg:max-w-7xl lg:mx-auto px-5">
      <OurLocation />
      <ContactForm />
    </div>
  );
};

export default Contact;

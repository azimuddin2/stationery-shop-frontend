import { Button } from 'antd';
import { FiSend } from 'react-icons/fi';

const ContactForm = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const message = form.message.value;

    const ContactInfo = {
      name,
      email,
      phone,
      message,
    };
    console.log(ContactInfo);

    form.reset();
  };

  return (
    <section className="mt-12">
      <div className="text-center mb-8 lg:w-2xl mx-auto">
        <h2 className="font-medium text-2xl leading-snug text-secondary">
          Contact Form
        </h2>
        <p className="text-accent text-3xl mt-1">Stay connected with us</p>
      </div>
      <div
        className="rounded-sm lg:p-10 mb-16"
        style={{ backgroundColor: '#F3F3F3' }}
      >
        <form
          onSubmit={handleSubmit}
          className="card-body px-5 md:px-8 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text font-semibold ms-1">Name*</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                className="input bg-white p-2 w-full rounded-5"
                required
              />
            </div>
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text font-semibold ms-1">Email*</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="input bg-white p-2 w-full rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                required
              />
            </div>
          </div>
          <div className="form-control my-4">
            <label className="label">
              <span className="label-text font-semibold ms-1">Phone*</span>
            </label>
            <input
              name="phone"
              type="text"
              placeholder="Enter your phone number"
              className="input bg-white p-2 w-full rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold ms-1">Message*</span>
            </label>
            <textarea
              name="message"
              rows={5}
              placeholder="Write your message here..."
              className="textarea w-full bg-white p-2 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              required
            ></textarea>
          </div>
          <div className="form-control mt-6 text-center">
            <Button type="primary" htmlType="submit">
              Send Message <FiSend className="text-xl animate-pulse"></FiSend>{' '}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;

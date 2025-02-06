import { Card, Typography, List, Collapse } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Fade } from 'react-awesome-reveal';
import useTitle from '../../hooks/useTitle';
const { Panel } = Collapse;
const { Title } = Typography;
const highlightStyle = { color: '#181818', fontWeight: 'medium' };

const AboutUs = () => {
  useTitle('About Us');
  return (
    <section className="my-8">
      <div style={{ maxWidth: 1024, margin: 'auto', padding: 20 }}>
        <Card
          bordered={false}
          style={{ textAlign: 'center', marginBottom: 20 }}
        >
          <Fade
            cascade
            damping={1e-1}
            className="text-2xl lg:text-4xl text-secondary font-semibold mb-3"
          >
            Welcome to Stationery Shop.
          </Fade>
          <p className="text-accent text-base">
            Your one-stop destination for high-quality stationery and office
            supplies! We are passionate about providing top-notch products that
            cater to students, professionals, artists, and stationery lovers
            alike. Our goal is to bring creativity and organization into your
            workspace with our carefully curated collection of stationery
            essentials.
          </p>
        </Card>

        <Card bordered={false} style={{ marginBottom: 20 }}>
          <h2 className="text-2xl text-secondary font-semibold mb-3">
            Our Mission
          </h2>
          <p className="text-accent text-base">
            At <b>Stationery Shop</b>, we believe that stationery is more than
            just paper and pens—it’s a tool for inspiration, productivity, and
            self-expression. Our mission is to offer a diverse range of
            high-quality, stylish, and affordable stationery products that
            enhance your daily life.
          </p>
        </Card>

        <Card bordered={false} style={{ marginBottom: 20 }}>
          <Title level={3}>
            <span style={highlightStyle}>What We Offer</span>
          </Title>
          <List
            bordered
            dataSource={[
              'A wide selection of premium notebooks, journals, and planners',
              'High-quality pens, markers, and writing instruments',
              'Creative art supplies for professionals and hobbyists',
              'Office essentials to keep your workspace organized',
              'Unique and trendy stationery items for gifting and personal use',
            ]}
            renderItem={(item) => (
              <List.Item style={{ color: '#676767' }} className="text-base">
                <CheckCircleOutlined
                  style={{ color: '#3F90FC', fontSize: '16px' }}
                />{' '}
                {item}
              </List.Item>
            )}
          />
        </Card>

        <Card bordered={false}>
          <Title level={3}>
            <span style={highlightStyle}>Why Choose Us?</span>
          </Title>
          <List
            bordered
            dataSource={[
              'Quality Assurance – We handpick our products to ensure the best quality and durability.',
              'Affordable Prices – Get the best value for your money with our competitive pricing.',
              'Customer Satisfaction – Your happiness is our priority, and we provide excellent service.',
              'Fast & Reliable Delivery – Enjoy a seamless shopping experience with timely deliveries.',
            ]}
            renderItem={(item) => (
              <List.Item style={{ color: '#676767' }} className="text-base">
                <CheckCircleOutlined
                  style={{ color: '#3F90FC', fontSize: '16px' }}
                />{' '}
                {item}
              </List.Item>
            )}
          />
        </Card>

        <Card bordered={false} style={{ marginTop: 20 }}>
          <Title level={3}>
            <span style={highlightStyle}>
              Frequently Asked Questions (FAQs)
            </span>
          </Title>
          <Collapse accordion defaultActiveKey={['1']}>
            <Panel
              className="text-base"
              header="What types of stationery products do you offer?"
              key="1"
            >
              <p className="text-sm text-accent">
                We provide a wide range of stationery items, including premium
                notebooks, journals, planners, high-quality pens, markers, art
                supplies, office essentials, and trendy stationery for personal
                and gifting purposes.
              </p>
            </Panel>
            <Panel
              className="text-base"
              header="Do you offer bulk discounts for businesses or schools?"
              key="2"
            >
              <p className="text-sm text-accent">
                Yes! We offer special discounts for bulk orders. If you're
                purchasing for an office, school, or organization, please
                contact our support team for customized pricing.
              </p>
            </Panel>
            <Panel
              className="text-base"
              header="How can I track my order?"
              key="3"
            >
              <p className="text-sm text-accent">
                Once your order is shipped, we will send you a tracking number
                via email or SMS. You can use this number to track your order on
                our website or the courier’s tracking page.
              </p>
            </Panel>
            <Panel
              className="text-base"
              header="What is your return and refund policy?"
              key="4"
            >
              <p className="text-sm text-accent">
                We accept returns within 7 days of delivery if the product is
                unused and in its original packaging. If you receive a damaged
                or incorrect item, please contact us immediately for a
                replacement or refund.
              </p>
            </Panel>
            <Panel
              className="text-base"
              header="Do you offer gift wrapping services?"
              key="5"
            >
              <p className="text-sm text-accent">
                Yes! We provide elegant gift wrapping for special occasions. You
                can select the gift wrap option at checkout and add a
                personalized message for your recipient.
              </p>
            </Panel>
          </Collapse>
        </Card>
        <p
          className="text-accent text-base"
          style={{ textAlign: 'center', marginTop: 30 }}
        >
          Thank you for choosing <b>Stationery Shop</b>! We look forward to
          being a part of your creative and professional journey.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;

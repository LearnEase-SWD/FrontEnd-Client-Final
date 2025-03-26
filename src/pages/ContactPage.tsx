import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Input, Button, Form } from 'antd';
import DynamicBreadcrumb from "../components/Breadcrumb/Breadcrumb";
import { sendEmail } from '../services/apiSendMail';

const { TextArea } = Input;

const ContactPage: React.FC = () => {
  const position: LatLngExpression = [10.841259, 106.810055];

  const [form] = Form.useForm();

  const onFinish = (values: { name: string; email: string; website?: string; message: string }) => {
    sendEmail(values);
  };

  return (
    <div className='mt-2'>
      {/* Breadcrumb Section */}
      <div className="p-4 pb-0">
        <DynamicBreadcrumb />
      </div>

      {/* Contact Section */}
      <div className="px-3 mt-12 mb-8">
        <h1 className="font-semibold text-3xl sm:text-4xl mb-9">Contact Us</h1>
        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Contact Info */}
          <div className="lg:w-1/3 p-3 pl-0 mb-8 lg:mb-0">
            <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl mb-2.5">Need a direct line?</h1>
            <div className="pt-5">
              <div className="flex items-start pb-4">
                <i className="fas fa-phone-alt text-orange-500 text-3xl p-5 bg-gray-100 rounded-md"></i>
                <div className="ml-8">
                  <h3 className="text-gray-400 mt-5 mb-2">Phone</h3>
                  <p className="font-semibold">09686868686</p>
                </div>
              </div>
              <div className="flex items-start pt-4">
                <i className="fas fa-envelope text-orange-500 text-3xl p-5 bg-gray-100 rounded-md"></i>
                <div className="ml-8">
                  <h3 className="text-gray-400 mt-5 mb-2">Email</h3>
                  <p className="font-semibold">supportSWD@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="lg:w-2/3 p-4">
            <MapContainer center={position} zoom={16} style={{ height: '400px', width: '100%', borderRadius: '2.5%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker position={position}>
                <Popup>
                  FPT University
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="p-4">
        <h2 className="font-semibold text-3xl sm:text-4xl leading-relaxed pb-10">Contact Us</h2>
        <Form form={form} layout="vertical"
          onFinish={onFinish}
        >
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/3 mr-0 lg:mr-4">
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: 'Please enter your name' },
                  { min: 3, message: 'Name must be at least 3 characters long' },
                ]}
              >
                <Input placeholder="First & Last name" className="pt-2.5 pb-2.5 pl-5 pr-5 rounded-3xl border-2 text-gray-600 text-lg mb-5" />
              </Form.Item>
            </div>

            <div className="w-full lg:w-1/3 ml-0 lg:ml-4 mr-0 lg:mr-4">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input placeholder="Info@example.com" className="pt-2.5 pb-2.5 pl-5 pr-5 rounded-3xl border-2 text-gray-600 text-lg mb-5" />
              </Form.Item>
            </div>

            <div className="w-full lg:w-1/3 ml-0 lg:ml-4">
              <Form.Item
                label="Website"
                name="website"
                rules={[
                  { required: false, message: 'Please enter your website' },
                  { type: 'url', message: 'Please enter a valid URL' },
                ]}
              >
                <Input placeholder="https://www.systeminfo.com" className="pt-2.5 pb-2.5 pl-5 pr-5 rounded-3xl border-2 text-gray-600 text-lg mb-5" />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            label="Message"
            name="message"
            rules={[
              { required: true, message: 'Please enter your message' },
              { min: 10, message: 'Message must be at least 10 characters long' },
            ]}
          >
            <TextArea rows={5} placeholder="Your message here" className="text-gray-600 text-lg mt-2.5 border-2 h-45 pt-2.5 pb-2.5 pr-5 pl-5" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="h-12 bg-orange-500 pt-3 pb-3 pl-9 pr-9 text-white rounded-3xl border-2 text-lg font-semibold hover:bg-orange-400">
              Send me
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default ContactPage;


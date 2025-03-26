import { Layout, Row, Col, Typography, Space, Divider } from "antd";
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
  LinkedinFilled,
} from "@ant-design/icons";
import mainImage from "../assets/icon-web.png";

const { Footer } = Layout;
const { Text, Link } = Typography;

export default function AppFooter() {
  return (
    <Footer className="bg-zinc-800 text-white pt-12 pb-4">
      <div className="container mx-auto px-4">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <div className="flex flex-col items-center">
              <div className="w-[100px] h-[90px] max-h-[90px] flex justify-center rounded-lg items-center mb-4 bg-white relative overflow-hidden">
                <img
                  src={mainImage}
                  alt="EduMaster Logo"
                  width={200}
                  className="max-w-80 mt-[20px]"
                />
              </div>
              <p className="text-lg font-semibold italic mb-4 font-exo text-white">
                "The right knowledge, a bright future."
              </p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={5} lg={5} xl={5}>
            <h2 className="text-xl font-bold mb-4 text-white">Get Help</h2>
            <Space direction="vertical" className="font-jost">
              <a href="/contact" className="text-gray-300 hover:text-white">
                Contact Us
              </a>
              <a href="/" className="text-gray-300 hover:text-white">
                Latest Articles
              </a>
              <a href="/FAQs" className="text-gray-300 hover:text-white">
                FAQ
              </a>
            </Space>
          </Col>

          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <h2 className="text-xl font-bold mb-4 text-white">Contact Us</h2>
            <Space direction="vertical" className="mb-4 font-jost">
              <p className="text-gray-300">
                Address: .......................................................
              </p>
              <p className="text-gray-300">Tel: + (123) 68686868</p>
              <p className="text-gray-300">Email: supportSWD@gmail.com</p>
            </Space>
            <Space size="large">
              <Link
                href="https://facebook.com"
                target="_blank"
                aria-label="Facebook"
              >
                <FacebookFilled className="text-2xl text-gray-300 hover:text-white" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                aria-label="Twitter"
              >
                <TwitterSquareFilled className="text-2xl text-gray-300 hover:text-white" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                aria-label="Instagram"
              >
                <InstagramFilled className="text-2xl text-gray-300 hover:text-white" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
              >
                <LinkedinFilled className="text-2xl text-gray-300 hover:text-white" />
              </Link>
            </Space>
          </Col>
        </Row>
        <Divider className="my-8 border-gray-600" />
        <Row justify="center">
          <Col>
            <Text className="text-sm text-gray-400">
              Copyright © {new Date().getFullYear()} Learn Ease for
              your future | Powered by Team SWD
            </Text>
          </Col>
        </Row>
      </div>
    </Footer>
  );
}

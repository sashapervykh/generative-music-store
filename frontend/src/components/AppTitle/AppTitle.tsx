import { Typography } from "antd";

const { Title } = Typography;

export function AppTitle() {
  return (
    <>
      <Title level={1} className="p-2 text-center">
        Stay Tuned With MusGen
      </Title>
    </>
  );
}

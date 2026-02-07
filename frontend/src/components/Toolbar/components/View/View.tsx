import { OrderedListOutlined, TableOutlined } from "@ant-design/icons";
import { Segmented } from "antd";

export function View() {
  return (
    <Segmented
      className="size-fit"
      orientation="vertical"
      options={[
        { value: "Table", icon: <TableOutlined /> },
        { value: "Gallery", icon: <OrderedListOutlined /> },
      ]}
    />
  );
}

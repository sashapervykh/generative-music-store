import { OrderedListOutlined, TableOutlined } from "@ant-design/icons";
import { Segmented } from "antd";

export function View() {
  return (
    <div className="flex ml-auto mr-0 items-center">
      <Segmented
        className="flex size-fit ml-auto mr-0"
        orientation="vertical"
        options={[
          { value: "Table", icon: <TableOutlined /> },
          { value: "Gallery", icon: <OrderedListOutlined /> },
        ]}
      />
    </div>
  );
}

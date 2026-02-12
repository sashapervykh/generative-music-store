import { OrderedListOutlined, TableOutlined } from "@ant-design/icons";
import { Segmented } from "antd";
import { VIEWS } from "../../../../constants/views";
import { useDataConfig } from "../../../../hooks/useDataConfig";

export function View() {
  const { setView } = useDataConfig();
  return (
    <div className="flex ml-auto mr-0 items-center">
      <Segmented
        className="flex size-fit ml-auto mr-0"
        orientation="vertical"
        onChange={(v) => setView(v)}
        options={[
          { value: VIEWS.TABLE, icon: <TableOutlined /> },
          { value: VIEWS.GALLERY, icon: <OrderedListOutlined /> },
        ]}
      />
    </div>
  );
}

import { OrderedListOutlined, TableOutlined } from "@ant-design/icons";
import { Segmented } from "antd";
import { VIEWS } from "../../../../constants/views";
import { useDataConfig } from "../../../../hooks/useDataConfig";

export function View() {
  const { setView, setPage } = useDataConfig();
  return (
    <div>
      <Segmented
        className="flex size-fit ml-auto mr-0"
        orientation="vertical"
        onChange={(v) => {
          setView(v);
          setPage(1);
        }}
        options={[
          { value: VIEWS.TABLE, icon: <TableOutlined /> },
          { value: VIEWS.GALLERY, icon: <OrderedListOutlined /> },
        ]}
      />
    </div>
  );
}

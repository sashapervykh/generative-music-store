import { VIEWS } from "../../constants/views";
import { useDataConfig } from "../../hooks/useDataConfig";
import GalleryView from "../GalleryView/GalleryView";
import { TableView } from "../TableView/TableView";

export function Songs() {
  const { view } = useDataConfig();
  return view === VIEWS.GALLERY ? <GalleryView /> : <TableView />;
}

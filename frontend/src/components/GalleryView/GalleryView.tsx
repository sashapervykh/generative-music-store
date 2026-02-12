import { VirtuosoGrid } from "react-virtuoso";
import { useSongs } from "../../hooks/useSongs";
import { SongCard } from "./components/SongCard";
import { useDataConfig } from "../../hooks/useDataConfig";

export default function GalleryView() {
  const { songs } = useSongs();
  const { hasMore, loadMore } = useDataConfig();

  const GridComponents = {
    List: ({ children, ...props }: any) => (
      <div
        {...props}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6"
      >
        {children}
      </div>
    ),
    Item: ({ children, ...props }: any) => (
      <div {...props} className="flex justify-center">
        {children}
      </div>
    ),
  };

  return (
    <div className="h-full w-full bg-gray-50">
      <div className="px-6 py-3 bg-white border-b">
        <h2 className="text-lg font-semibold text-gray-700">Gallery View</h2>
        <p className="text-xs text-gray-500">
          Scroll down to load more • {songs.length} songs
        </p>
      </div>

      <VirtuosoGrid
        style={{ height: "calc(100vh - 200px)" }}
        data={songs}
        components={GridComponents}
        itemContent={(_, song) => <SongCard song={song} />}
        endReached={loadMore}
        overscan={200}
      />
    </div>
  );
}

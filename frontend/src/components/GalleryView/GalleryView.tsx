import { VirtuosoGrid, type GridComponents } from "react-virtuoso";
import { useSongs } from "../../hooks/useSongs";
import { SongCard } from "./components/SongCard";
import { useDataConfig } from "../../hooks/useDataConfig";

export default function GalleryView() {
  const { songs } = useSongs();
  const { hasMore, loadMore } = useDataConfig();

  const GridComponents: GridComponents = {
    List: ({ children, ...props }) => {
      return (
        <div
          {...props}
          className="grid grid-cols-1 mt-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6"
        >
          {children}
        </div>
      );
    },
    Item: ({ children, ...props }) => (
      <div {...props} className="flex justify-center">
        {children}
      </div>
    ),
    Footer: () => (
      <div className="py-8 text-center">
        {hasMore ? (
          <div className="animate-pulse text-gray-400">
            Loading more songs...
          </div>
        ) : (
          <div className="text-gray-500">🎵 You've reached the end 🎵</div>
        )}
      </div>
    ),
  };

  return (
    <div className="flex flex-col h-[50vh] w-[90%] bg-gray-50 m-[1rem_auto] sm:h-[70vh]">
      <div className="px-6 py-3 bg-white border-b">
        <h2 className="text-lg font-semibold text-gray-700">Gallery</h2>
        <p className="text-xs text-gray-500">
          Scroll down to load more • {songs.length} songs
        </p>
      </div>

      <VirtuosoGrid
        style={{ height: "100%" }}
        data={songs}
        components={GridComponents}
        itemContent={(_, song) => <SongCard song={song} />}
        endReached={loadMore}
      />
    </div>
  );
}

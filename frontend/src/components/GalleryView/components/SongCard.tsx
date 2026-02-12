import { Card, Tag, Badge } from "antd";

interface SongCardProps {
  song: {
    id: number;
    title: string;
    artist: string;
    album: string;
    genre: string;
  };
}

export const SongCard: React.FC<SongCardProps> = ({ song }) => {
  return (
    <Card className="h-full w-full p-4" hoverable>
      <div className="flex items-center justify-between mb-3">
        <Badge count={`#${song.id}`} color="#1890ff" />
        {song.album === "Single" && <Tag color="green">Single</Tag>}
      </div>

      <div className="mb-2">
        <div className="text-lg font-bold text-gray-800 truncate">
          {song.title}
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-3 truncate">{song.artist}</div>

      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
        <div className="text-xs text-gray-500 truncate max-w-[60%]">
          💿 {song.album}
        </div>
        <Tag color="blue" className="text-xs">
          {song.genre}
        </Tag>
      </div>
    </Card>
  );
};

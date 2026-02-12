import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TablePaginationConfig } from "antd";
import { useSongs } from "../../hooks/useSongs";
import { useDataConfig } from "../../hooks/useDataConfig";
import { LikeOutlined, LoadingOutlined } from "@ant-design/icons";

interface DataType {
  key: React.Key;
  id: number;
  song: string;
  artist: string;
  album: string;
  genre: string;
  cover: string;
  review: string;
  music: string;
  likes: number;
}

const columns: TableColumnsType<DataType> = [
  { title: "#", dataIndex: "id" },
  { title: "SONG", dataIndex: "song" },
  { title: "ARTIST", dataIndex: "artist" },
  { title: "ALBUM", dataIndex: "album" },
  { title: "GENRE", dataIndex: "genre" },
];

export function TableView() {
  const { songs } = useSongs();
  const dataToDisplay = songs.map((song) => ({
    key: song.id,
    id: song.id,
    song: song.title,
    artist: song.artist,
    album: song.album,
    genre: song.genre,
    cover: song.cover,
    review: song.review,
    music: song.music,
    likes: song.likes,
  }));
  const { page, setPage, isLoading } = useDataConfig();

  const handleChange = (pagination: TablePaginationConfig) => {
    setPage(pagination.current || 1);
  };

  return (
    <Table<DataType>
      className="capitalize w-[90%] m-auto pt-8"
      columns={columns}
      pagination={{
        current: page,
        total: 1000,
        showSizeChanger: false,
      }}
      loading={{ spinning: isLoading, indicator: <LoadingOutlined /> }}
      onChange={handleChange}
      onRow={() => {
        return {
          className: "cursor-pointer",
        };
      }}
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (record) => {
          return (
            <div className="grid grid-cols-[200px_auto] gap-4 justify-center">
              <div className="flex flex-col">
                <img className="flex m-auto rounded-xl" src={record.cover} />
                <p className="flex m-[0.2rem_auto_0px_auto] gap-1.5">
                  <LikeOutlined /> {record.likes}
                </p>
              </div>
              <div className="flex flex-col normal-case justify-center p-2rem">
                <p>{record.review}</p>
                <audio
                  className="m-[1.5rem_auto_0px_auto]"
                  src={record.music}
                  title="new.mp3"
                  controls
                ></audio>
              </div>
            </div>
          );
        },
      }}
      dataSource={dataToDisplay}
    />
  );
}

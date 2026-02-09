import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useSongs } from "../../hooks/useSongs";

interface DataType {
  key: React.Key;
  id: number;
  song: string;
  artist: string;
  album: string;
  genre: string;
}

const columns: TableColumnsType<DataType> = [
  { title: "#", dataIndex: "id" },
  { title: "Song", dataIndex: "song" },
  { title: "Artist", dataIndex: "artist" },
  { title: "Album", dataIndex: "album" },
  { title: "Genre", dataIndex: "genre" },
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
  }));

  return (
    <Table<DataType>
      className="capitalize"
      columns={columns}
      expandable={{
        expandedRowRender: () => <p>To be added later</p>,
      }}
      dataSource={dataToDisplay}
    />
  );
}

import React, { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TablePaginationConfig } from "antd";
import { useSongs } from "../../hooks/useSongs";
import { useDataConfig } from "../../hooks/useDataConfig";

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
  const { page, setPage } = useDataConfig();

  const handleChange = (pagination: TablePaginationConfig) => {
    setPage(pagination.current || 1);
  };

  return (
    <Table<DataType>
      className="capitalize"
      columns={columns}
      pagination={{ current: page, pageSize: 10, total: 1000 }}
      onChange={handleChange}
      expandable={{
        expandedRowRender: () => <p>To be added later</p>,
      }}
      dataSource={dataToDisplay}
    />
  );
}

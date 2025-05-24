import { Table, Space } from "antd";
import React, { useEffect } from "react";

type ColumnType = {
  title: string;
  dataIndex: string;
  key: string;
  render?: (value: any, record: any, index: number) => React.ReactNode;
};

type MyTableProps = {
  dataSource: any[];
  columns: ColumnType[];
  exportFileName?: string;
  autoDownload?: boolean; // если true — скачать сразу при монтировании
};

function convertToCSV(data: any[], columns: ColumnType[]) {
  const header = columns.map(col => `"${col.title}"`).join(",") + "\n";

  const rows = data.map(row =>
    columns
      .map(col => {
        const value = row[col.dataIndex];
        return `"${(value ?? "").toString().replace(/"/g, '""')}"`;
      })
      .join(",")
  );

  return header + rows.join("\n");
}

function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function MyTable({ dataSource, columns, exportFileName = "table.csv", autoDownload = false }: MyTableProps) {
  const handleExport = () => {
    const csv = convertToCSV(dataSource, columns);
    downloadCSV(csv, exportFileName);
  };

  useEffect(() => {
    if (autoDownload) {
      handleExport();
    }
  }, [autoDownload]);

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        {/* Кнопка для ручного скачивания */}
        <button onClick={handleExport}>Скачать CSV</button>
      </Space>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
}

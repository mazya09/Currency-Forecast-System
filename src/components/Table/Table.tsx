import React from "react";
import { Table, Button, Space } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./Mytable.scss";

interface MyTableProps<T> {
  dataSource: T[];
  columns: ColumnsType<T>;
  className?: string;
  style?: React.CSSProperties;
  exportFileName?: string;
  autoDownload?: boolean;
}


function MyTable<T>({
  dataSource,
  columns,
  className,
  style,
  exportFileName,
}: MyTableProps<T>) {
  const exportCSV = () => {
    if (!dataSource.length) return;

    const leafColumns = columns.filter(
      (col): col is ColumnType<T> => !("children" in col)
    );

    const headers = leafColumns.map(
      (col) => col.title?.toString() || col.dataIndex?.toString() || ""
    );

    const rows = dataSource.map((item) =>
      leafColumns.map((col) => {
        const key = col.dataIndex as keyof T;
        return item[key] ?? "";
      })
    );

    let csvContent = "";
    csvContent += headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.map((cell) => `"${cell}"`).join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, exportFileName || "table-data.csv");
  };

  const exportExcel = () => {
    if (!dataSource.length) return;

    const leafColumns = columns.filter(
      (col): col is ColumnType<T> => !("children" in col)
    );

    const wsData = [
      leafColumns.map((col) => col.title?.toString() || ""),
      ...dataSource.map((item) =>
        leafColumns.map((col) => {
          const key = col.dataIndex as keyof T;
          return item[key] ?? "";
        })
      ),
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, exportFileName || "table-data.xlsx");
  };

  return (
    <div className="myTableContainer" style={style}>
      <Table
        dataSource={dataSource}
        columns={columns.map((col) => ({
          ...col,
          onHeaderCell: () => ({
            className: "myTableHeaderCell",
          }),
          align: "start",
        }))}
        pagination={false}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "myTableRowEven" : "myTableRowOdd"
        }
        bordered
        className={className}
      />
      {exportFileName && (
        <Space className="exportButtons">
          <Button onClick={exportCSV}>Export CSV</Button>
          <Button onClick={exportExcel}>Export Excel</Button>
        </Space>
      )}
    </div>
  );
}


export default MyTable;

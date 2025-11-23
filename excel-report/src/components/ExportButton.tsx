import { JSX, useEffect, useState } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

interface BatchData {
  firstShiftLeader?: string;
  secondShiftLeader?: string;
  thirdShiftLeader?: string;
  supervisor?: string;

  date: string;
  productName: string;

  batchNo?: string;
  expiredTime?: string;
  grinderOperator?: string;
  inspectionTime?: string;
}

interface ExportButtonProps {
  meatSteamGrindingExportData: BatchData[];
}

function MeatSteamGrindingExportButton({
  meatSteamGrindingExportData,
}: ExportButtonProps): JSX.Element {
  const [data, setData] = useState<BatchData[]>([]);

  useEffect(() => {
    setData(meatSteamGrindingExportData);
  }, [meatSteamGrindingExportData]);

  // CHECK IF DATA IS EMPTY
  if (!data || data.length === 0) <p>No data available for export.</p>;

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("แบบบันทึกการละลายเนื้อ");

  // -- HEADER --
  const generateHeader = () => {
    // Title
    sheet.mergeCells("A1:J1");
    sheet.getCell("A1").value =
      "แบบบันทึกการบดเนื้อสัตว์ (Stir-Fried Meat Grinding Process Check Sheet)";

    // Shift leaders’ and supervisor’s signatures.
    const cells = {
      shift1: {
        label: "E2",
        signature: "E3",
        labelText: "หัวหน้ากะ 1",
        signText: data[0]?.firstShiftLeader || "",
      },
      shift2: {
        label: "F2",
        signature: "F3",
        labelText: "หัวหน้ากะ 2",
        signText: data[0]?.secondShiftLeader || "",
      },
      shift3: {
        label: "G2",
        signature: "G3",
        labelText: "หัวหน้ากะ 3",
        signText: data[0]?.thirdShiftLeader || "",
      },
      supervisor: {
        label: "H2",
        signature: "H3",
        labelText: "Supervisor",
        signText: data[0]?.supervisor || "",
      },
    };

    Object.values(cells).forEach(
      ({ label, signature, labelText, signText }) => {
        sheet.getCell(label).value = labelText;
        sheet.getCell(signature).value = signText;
      }
    );

    const mergeColumns = ["E", "F", "G", "H"];
    mergeColumns.forEach((col) => sheet.mergeCells(`${col}3:${col}4`));

    // -- Table Styling --
    sheet.views = [{ showGridLines: false }]; // Hide Excel gridlines

    // -- Header Styling --
    sheet.getCell("A1").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    sheet.getCell("A1").font = { size: 16, bold: true };
  };

  // -- TABLES --
  const generateTables = () => {
    // first table
    const firstTableStartRow = 3;
    const secondTableStartRow = firstTableStartRow + 15;

    // Merge cells before setting values

    const mergeColumns = ["A", "B", "H"];
    mergeColumns.forEach((col) => {
      sheet.mergeCells(`${col}7:${col}8`);
      sheet.mergeCells(`${col}9:${col}15`);
    });

    // Merge D-E for rows 9-14 for batch details
    const startRow = 9;
    const endRow = 14;

    for (let row = startRow; row <= endRow; row++) {
      sheet.mergeCells(`D${row}:E${row}`);
    }

    const mergeCells = [6, 7, 8, 15];
    mergeCells.forEach((row) => sheet.mergeCells(`C${row}:E${row}`));

    sheet.mergeCells(`C16:G16`);

    // Set values

    sheet.getCell("A3").value = `วันที่: ${data[0].date}`;
    sheet.getCell("B3").value = `ผลิตภัณฑ์: ${data[0].productName}`;
    sheet.getCell("A4").value = `แบชที่: ${data[0].batchNo}`;
    sheet.getCell("B4").value = `เวลาที่ตรวจสอบ: ${data[0].inspectionTime}`;

    const columnHeaders = [
      { cell: "A6", colName: "step", width: 20 },
      { cell: "B6", colName: "machine", width: 20 },
      { cell: "C6", colName: "inspection", width: 20 },
      { cell: "F6", colName: "inspectionItems", width: 20 },
      { cell: "G6", colName: "result", width: 30 },
      { cell: "H6", colName: "signature", width: 25 },
    ];

    columnHeaders.forEach(({ cell, colName, width }) => {
      sheet.getCell(cell).value = colName;
      sheet.getColumn(cell.charAt(0)).width = width;
    });
  };

  // -- EXCEL FILE GENERATION CONTROLLER --
  async function handleExport() {
    generateHeader();
    generateTables();
    // 1. Create header: generateFileHeader()
    // 2. Create tables the file (loop): generateTables()
    // 3. Save the file // try ... catch

    // --- Export file ---
    try {
      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), "grinding.xlsx");
    } catch (error) {
      console.log("Error exporing file: ", error);
    }
  }

  return (
    <button
      style={{
        cursor: "pointer",
        width: "150px",
        height: "40px",
        fontSize: "20px",
      }}
      onClick={handleExport}
    >
      Export
    </button>
  );
}

export default MeatSteamGrindingExportButton;

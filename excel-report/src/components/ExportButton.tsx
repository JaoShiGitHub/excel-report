import { JSX, useEffect, useState } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

interface BatchData {
  date: string;
}

interface ExportButtonProps {
  meatSteamGrindingExportData: BatchData[];
}

function MeatSteamGrindingExportButton({
  meatSteamGrindingExportData,
}: ExportButtonProps): JSX.Element {
  // CHECK IF DATA IS EMPTY
  if (meatSteamGrindingExportData.length === 0) {
    return <p>No data available for export.</p>;
  }

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
        signText: "Potter",
      },
      shift2: {
        label: "F2",
        signature: "F3",
        labelText: "หัวหน้ากะ 2",
        signText: "Ron",
      },
      shift3: {
        label: "G2",
        signature: "G3",
        labelText: "หัวหน้ากะ 3",
        signText: "Hermione",
      },
      supervisor: {
        label: "H2",
        signature: "H3",
        labelText: "Supervisor",
        signText: "Dumbledore",
      },
    };

    Object.values(cells).forEach(
      ({ label, signature, labelText, signText }) => {
        sheet.getCell(label).value = labelText;
        sheet.getCell(signature).value = signText;
      }
    );

    // -- Header Styling --
    sheet.getCell("A1").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    sheet.getCell("A1").font = { size: 16, bold: true };
    console.log("header");
    console.log(meatSteamGrindingExportData[0]);
  };

  // -- TABLES --
  const generateTables = (tableStartAt: number, batchData: BatchData[]) => {
    // -- Table Styling --
    sheet.views = [{ showGridLines: false }]; // Hide Excel gridlines

    return console.log("generateMeatSteamGrindingExcel");
  };

  // -- EXCEL FILE GENERATION CONTROLLER --
  async function handleExport() {
    generateHeader();
    generateTables(2, [{ date: "" }]);
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

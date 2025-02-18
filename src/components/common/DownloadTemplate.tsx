import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const DownloadTemplateEnhanced: React.FC = () => {
  const handleDownload = async () => {
    // Create a new workbook and worksheet.
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Template");

    // Add the header row.
    const headerRow = [
      "Amount",
      "Description",
      "Date",
      "Expense Type",
      "Note",
      "Transaction Type",
    ];
    worksheet.addRow(headerRow);

    // Set column widths (optional).
    worksheet.columns = [
      { width: 15 },
      { width: 30 },
      { width: 15 },
      { width: 15 },
      { width: 30 },
      { width: 20 },
    ];

    // Assume you'll leave a few empty rows for users to fill in.
    // For demonstration, we'll add 20 empty rows.
    for (let i = 0; i < 20; i++) {
      worksheet.addRow([]);
    }

    // Apply data validation for "Expense Type" in Column D.
    // ExcelJS applies validations per cell. We loop through rows (skipping the header row).
    worksheet.getColumn(4).eachCell((cell, rowNumber) => {
      if (rowNumber > 1) {
        cell.dataValidation = {
          type: "list",
          allowBlank: true,
          formulae: ['"Fixed,Variable"'],
          showErrorMessage: true,
          error: 'Please select either "Fixed" or "Variable".',
        };
      }
    });

    // Apply data validation for "Transaction Type" in Column F.
    worksheet.getColumn(6).eachCell((cell, rowNumber) => {
      if (rowNumber > 1) {
        cell.dataValidation = {
          type: "list",
          allowBlank: false,
          formulae: ['"Expense,Income"'],
          showErrorMessage: true,
          error: 'Please select either "Expense" or "Income".',
        };
      }
    });

    // Generate the Excel file as a buffer.
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "TransactionTemplateEnhanced.xlsx");
  };

  return (
    <button
      onClick={handleDownload}
      className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
    >
      Download Enhanced Excel Template
    </button>
  );
};

export default DownloadTemplateEnhanced;

import { useState } from "react";

const Upload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = event.target.files;
    const validFiles = Array.from(files).filter(
      (file) =>
        file.type === "text/csv" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel"
    );

    if (validFiles.length > 0) {
      setUploadedFiles([...uploadedFiles, ...validFiles]);
    }
  };

  return (
    <div
      className="
    w-full
    bg-[#23232a]
    p-6
    pt-4
    rounded-lg "
    >
      <h3 className="text-lg font-semibold">Upload a File</h3>
      <label className="mt-4 flex flex-col items-center justify-center h-40 border-2 border-dashed border-[#515161] bg-[#3a3a45] rounded-lg cursor-pointer hover:bg-[#464653] transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M12 18l4 0h-2.5v0h-3v0h-2.5z">
            <animate
              fill="freeze"
              attributeName="d"
              begin="1s"
              dur="0.2s"
              values="M12 18l4 0h-2.5v0h-3v0h-2.5z;M12 11l4 4h-2.5v3h-3v-3h-2.5Z"
            />
          </path>
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path
              fill="currentColor"
              fill-opacity="0"
              stroke-dasharray="64"
              stroke-dashoffset="64"
              d="M13.5 3l5.5 5.5v11.5c0 0.55 -0.45 1 -1 1h-12c-0.55 0 -1 -0.45 -1 -1v-16c0 -0.55 0.45 -1 1 -1Z"
            >
              <animate
                fill="freeze"
                attributeName="fill-opacity"
                begin="0.8s"
                dur="0.15s"
                values="0;0.3"
              />
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.6s"
                values="64;0"
              />
            </path>
            <path d="M14.5 3.5l2.25 2.25l2.25 2.25z" opacity="0">
              <animate
                fill="freeze"
                attributeName="d"
                begin="0.6s"
                dur="0.2s"
                values="M14.5 3.5l2.25 2.25l2.25 2.25z;M14.5 3.5l0 4.5l4.5 0z"
              />
              <set fill="freeze" attributeName="opacity" begin="0.6s" to="1" />
            </path>
          </g>
        </svg>
        <span className="text-sm font-medium mt-2">
          Click to upload or drag and drop
        </span>
        <span className="text-xs text-gray-400">
          Only CSV and Excel files are supported
        </span>
        <input
          type="file"
          accept=".csv, .xls, .xlsx"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
};

export default Upload;

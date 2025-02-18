const DownloadTemplate = () => {
  return (
    <a
      href="/sl-float-template.xlsx"
      download="sl-float-template.xlsx"
      className="px-4 py-2 bg-zinc-700/70 text-zinc-200 rounded-md text-sm font-semibold hover:bg-zinc-700/55 
            cursor-pointer w-fit"
    >
      Download here
    </a>
  );
};

export default DownloadTemplate;

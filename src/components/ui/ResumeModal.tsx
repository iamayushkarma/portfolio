interface ResumeModalProps {
  onClose: () => void;
}

function ResumeModal({ onClose }: ResumeModalProps) {
  const resumeUrl = "/ayush-karma-resume.pdf";

  return (
    <div
      className="fixed inset-0 z-9999999 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white border-2 border-black shadow-brutal-b w-full max-w-3xl h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-black bg-accent-yellow shrink-0">
          <span className="font-mono font-bold text-sm uppercase tracking-tight">
            Resume
          </span>
          <div className="flex gap-2">
            <a
              href={resumeUrl}
              download="Ayush_Karma_Resume.pdf"
              className="font-mono font-bold text-sm px-3 py-1 border-2 border-black bg-black text-white cursor-pointer hover:bg-accent-blue transition-colors"
            >
              Download ↓
            </a>
            <button
              onClick={onClose}
              className="font-mono cursor-pointer font-bold text-sm px-3 py-1 border-2 border-black hover:bg-black hover:text-white transition-colors"
            >
              Close ✕
            </button>
          </div>
        </div>

        {/* Direct iframe — works in Chrome Android & Safari iOS */}
        <iframe
          src={resumeUrl}
          className="w-full flex-1 border-none"
          title="Ayush Karma Resume"
        />
      </div>
    </div>
  );
}

export default ResumeModal;

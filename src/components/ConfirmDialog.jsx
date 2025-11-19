function ConfirmDialog({ open, title, message, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg animate-fadeIn">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          {title || "Are you sure?"}
        </h2>

        <p className="text-gray-700 mb-6">{message}</p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-400 rounded-md  text-gray-700  hover:bg-foam transition">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="common-btn px-4 py-2 "
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;

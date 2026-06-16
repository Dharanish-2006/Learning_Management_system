const ConfirmModal = ({ open, title, message, confirmLabel = 'Delete', onConfirm, onCancel, danger = true }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box max-w-sm p-6" onClick={e => e.stopPropagation()}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 ${danger ? 'bg-red-100' : 'bg-amber-100'}`}>
          {danger ? '🗑️' : '⚠️'}
        </div>
        <h3 className="text-lg font-extrabold text-navy text-center mb-2">{title}</h3>
        <p className="text-sm text-gray-500 text-center mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="btn-outline flex-1 justify-center">Cancel</button>
          <button onClick={onConfirm} className={`flex-1 justify-center inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-lg transition-all ${danger ? 'bg-red-500 text-white hover:bg-red-600' : 'btn-primary'}`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

import Modal from './Modal';
import SecondaryButton from './SecondaryButton';
import PrimaryButton from './PrimaryButton';
import DangerButton from './DangerButton';

export default function ConfirmationModal({ 
    show, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    confirmText = 'Confirmar', 
    cancelText = 'Cancelar',
    type = 'primary' // 'primary' or 'danger'
}) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    {title}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    {message}
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <SecondaryButton onClick={onClose}>
                        {cancelText}
                    </SecondaryButton>

                    {type === 'danger' ? (
                        <DangerButton onClick={onConfirm}>
                            {confirmText}
                        </DangerButton>
                    ) : (
                        <PrimaryButton onClick={onConfirm}>
                            {confirmText}
                        </PrimaryButton>
                    )}
                </div>
            </div>
        </Modal>
    );
}

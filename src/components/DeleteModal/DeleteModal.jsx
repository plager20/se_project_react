import './DeleteModal.css';

function DeleteModal({ activeModal, onClose, handleDeleteCard, card }) {
  const handleDeleteClick = () => {
    handleDeleteCard(card._id);
    onClose();
  };

  return (
    <div className={`modal ${activeModal === 'delete' && 'modal_opened'}`}>
      <div className='modal__content modal__content_type_delete'>
        <button
          onClick={onClose}
          className='modal__close modal__close_type_delete'
          type='button'
        ></button>
        <h2 className='modal__title modal__title_type_delete'>
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </h2>
        <button
          className='modal__delete_confirm'
          type='button'
          onClick={handleDeleteClick}
        >
          Yes, delete item
        </button>
        <button
          className='modal__delete_cancel'
          type='button'
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;

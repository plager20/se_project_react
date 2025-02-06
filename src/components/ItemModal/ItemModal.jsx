import './ItemModal.css';
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function ItemModal({ activeModal, onClose, card, handleDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card?.owner?._id === currentUser?._id;

  return (
    <div className={`modal ${activeModal === 'preview' ? 'modal_opened' : ''}`}>
      <div className='modal__content modal__content_type_image'>
        <button
          onClick={onClose}
          className='modal__close modal__close_type_image'
          type='button'
        ></button>
        <img
          src={card.imageUrl}
          alt={`Image of ${card.name}`}
          className='modal__image'
        />
        <div className='modal__footer'>
          <div className='modal__captions'>
            <h2 className='modal__caption'>{card.name}</h2>
            <p className='modal__weather-type'>Weather: {card.weather}</p>
          </div>
          {isOwn && (
            <button
              className='modal__delete-item'
              type='button'
              onClick={handleDeleteClick}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

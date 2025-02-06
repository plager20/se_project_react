import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './ItemCard.css';

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const itemLikeButtonClassName = `card__heart ${
    isLiked ? 'card__heart-liked' : ''
  }`;

  return (
    <li className='card'>
      <div className='card__title-container'>
        <h2 className='card__name'>{item.name}</h2>
        {currentUser?._id && (
          <button
            onClick={handleLike}
            type='button'
            className={itemLikeButtonClassName}
          />
        )}
      </div>
      <img
        onClick={handleCardClick}
        className='card__image'
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;

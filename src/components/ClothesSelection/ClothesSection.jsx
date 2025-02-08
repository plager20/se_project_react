import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className='clothes-section'>
      <div className='clothes-section__head'>
        <p className='clothes-section__title'>Your items</p>
        <button
          className='clothes-section__add-button'
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className='clothes-section__list'>
        {userItems.length > 0 ? (
          userItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
              />
            );
          })
        ) : (
          <p>No clothing items found</p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;

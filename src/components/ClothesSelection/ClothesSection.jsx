import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';

function ClothesSection({ onCardClick, clothingItems }) {
  return (
    <div className='clothes-section'>
      <div className='clothes-section__head'>
        <p className='clothes-section__title'>Your items</p>
        <button className='clothes-section__add-button'>+ Add New</button>
      </div>
      <ul className='clothes-section__list'>
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;

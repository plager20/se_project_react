import './Profile.css';
import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSelection/ClothesSection';

function Profile({ onCardClick, clothingItems, handleAddClick }) {
  return (
    <div className='profile'>
      <section className='profile__sidebar'>
        <SideBar />
      </section>
      <section className='profile__clothing-items'>
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;

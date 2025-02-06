import './Profile.css';
import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSelection/ClothesSection';

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleEditProfileModal,
  onCardLike,
  handleLogOut,
}) {
  return (
    <div className='profile'>
      <section className='profile__sidebar'>
        <SideBar
          handleEditProfileModal={handleEditProfileModal}
          handleLogOut={handleLogOut}
        />
      </section>
      <section className='profile__clothing-items'>
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;

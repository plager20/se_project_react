import './Profile.css';
import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSelection/ClothesSection';

function Profile({ onCardClick }) {
  return (
    <div className='profile'>
      <section className='profile__sidebar'>
        <SideBar />
      </section>
      <section className='profile__clothing-items'>
        <ClothesSection onCardClick={onCardClick} />
      </section>
    </div>
  );
}

export default Profile;

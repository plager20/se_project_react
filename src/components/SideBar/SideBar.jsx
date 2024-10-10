import avatar from '../../images/avatar.svg';
import './SideBar.css';

function SideBar() {
  return (
    <div className='sidebar'>
      <img className='sidebar__avatar' src={avatar} alt='Terrence Tegegne' />
      <p className='sidebar__username'>Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;

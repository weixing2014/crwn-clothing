import react from 'react';
import './MenuItem.styles.scss';

const MenuItem = ({ title, linkUrl, imageUrl, size }) => (
  <div
    style={{
      backgroundImage: `url(${imageUrl})`,
    }}
    className={`${size} menu-item`}
  >
    <div className="content">
      <h1 className="title">{title}</h1>
      <span className="subtitle">shop now</span>
    </div>
  </div>
);

export default MenuItem;

import React from 'react';
import './CollectionItem.component.scss';

export default function CollectionItemComponent({ item }) {
  const { imageUrl, name, price } = item;

  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl}` }} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
    </div>
  );
}

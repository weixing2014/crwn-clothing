import * as React from 'react';
import CollectionItem from '../CollectionItem/CollectionItem.component';
import './CollectionPreview.styles.scss';

export default function CollectionPreviewComponent({ title, items }) {
  return (
    <div className="collection-preview">
      <h1 className="title">{title}</h1>
      <div className="preview">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

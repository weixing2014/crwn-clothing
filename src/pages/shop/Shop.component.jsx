import React from 'react';
import './Shop.styles.scss';
import SHOP_DATA from './Shop.data';
import CollectionPreview from '../../components/collectionPreview/CollectionPreview.component';

class ShopPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: SHOP_DATA,
    };
  }

  render() {
    const { collections } = this.state;
    return (
      <div className="shop-page">
        {collections
          .filter((_, idx) => idx < 4)
          .map(({ id, ...otherProps }) => (
            <CollectionPreview key={id} {...otherProps} />
          ))}
      </div>
    );
  }
}

export default ShopPage;

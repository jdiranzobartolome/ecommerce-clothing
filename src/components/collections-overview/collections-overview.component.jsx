import React from 'react';
import { connect } from 'react-redux';

import CollectionPreview from '../collection-preview/collection-preview.component';

import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

import './collections-overview.style.scss';


const CollectionsOverview = ({ collections }) => (
    <div className="collections-overview">
        {
            collections.map(({ id, ...otherCollectionProps }) => (
                <CollectionPreview key={id}  {...otherCollectionProps} />
            ))
        }
    </div>
)

const mapStateToProps = (state) => ({
    collections: selectCollectionsForPreview(state)
})

export default connect(mapStateToProps)(CollectionsOverview);
import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.style.scss';

const CollectionPage = ({ collection }) => { 
    const { title, items } = collection; 

    return (
        <div className="collection-page">
            <h2 className='title'>{title}</h2>
            <div className="items">
                {
                    items.map(item => <CollectionItem key={item.id} item={item} />)
                }
            </div>
        </div>
    )
}

// mapStateToProps accept a second argument which is the props of the element in which we are 
// wrapping the mapStateToProps. IN this case, when the function is called, 
// both are used, since after selectCollection, then selectCollections is also called 
// (which needs the state). Check shop.selectors.js for being aware of that.
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);
import { createSelector } from "reselect";

// initial input selector
const selectShop = state => state.shop;

//Remember that this functions are curry functions, they actually
// return another function, (in this case, the selectShop)
// they all act like "middleware" before reaching the most basic
// selectShop which uses state for fetching the state.shop. 
export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

//New selector created after changing the shop data from array of collections to an object of 
// colletions (hash table). We wanted it being a hashtable (the items within each collection is still an array, but
// not the collections themselves are hashed {hats: {}, jackets: {} .... etc}). So now in the shop page, the 
// iteration cannot be performed with the data fetched from selectCollections, since it is expecting a array like 
// [{hats}, {jackets}, ...etc], so we add this selector for changing it into an array before sending it for preview.
// Basically we transformed from hashed table, to array. 
// ex:  { hats: {hats obj}, jackets: {jackets obj} } ==> [{hats obj}, {jackets obj}]
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
)

// Giving the Url string of a collection (hards, jackets...etc)
// this selector fetches that collection (by using the COLLECTION_ID_MAP
// to find out the collection id and fetching the collection)

// THAT WAS THE ORIGINAL WAY IT WAS DONE, BUT THEN WE PERFORMED DATA NORMALIZATION 
// BY TRANSFORMING THE ORIGINAL ARRAY OF OBJECTS, INTO AN OBJECT OF OBJECTS,
// WITH THE PARAMETERS OF THE MAIN OBJECTS (THE COLLECTIONS) AS THE URL STRINGS
// OF THE COLLECTIONS. SO THE COLLECTION ID IS NOT NEEDED EITHER. 

//IN GENERAL, WHEN INDIVIDUAL ITEMS WILL NEED TO BE ACCESSED, REGARDLESS OF THE OTHER ITEMS, 
// IN A LARGE SET OF ITEMS, IT IS BETTER TO STORE THINGS AS OBEJCTS WITH KEY-PARAMETERS 
// THAN AS ARRAYS (IN WHICH YOU NEED TO LOOK FOR THE ITEM ONE BY ONE).

//THIS OBJECTS ARE CALLED "HASH TABLES". HASH TABLES VS ARRAYS FOR THIS CASES IS AN 
// IMPORTANT TOPIC. 
// Read more here: https://www.kirupa.com/html5/hashtables_vs_arrays.htm

// IN GENERAL, IF YOU NEED TO FETCH INIDIVIDUAL DATA ==> HASHTABLE. 
// IF YOU NEED TO ITERATE THROUGH ALL THE DATA (like in our collection items for displaying the clothes) ==> ARRAY 
export const selectCollection = collectionUrlParam => 
createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
)

//Collection-ID MAP (used for mapping the IDs with the 
// // string values (which is what we get on the URL parameter)
// const COLLECTION_ID_MAP = {
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     womens: 4,
//     mens: 5
// }
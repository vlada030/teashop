import {
    PICK_AUTHENTICATION_PAGE,
    SET_USER,
    UPDATE_USER_FAVORITES,
    CLEAR_USER_FAVORITES
} from "../actions";

const user_reducer = (state, action) => {
    switch (action.type) {
        case PICK_AUTHENTICATION_PAGE: {
            return { ...state, loginPage: !state.loginPage };
        }

        case SET_USER: {
            return { ...state, user: action.payload };
        }

        // case PULL_FAVORITES_LIST: {
        //     return { ...state, favoriteProducts: action.payload };
        // }

        case UPDATE_USER_FAVORITES: {
            const product = action.payload;
            let { favorites } = { ...state.user };

            const isLiked = favorites.find(
                (item) => item.id === product.id
            );

            if (isLiked) {
                favorites = favorites.filter(
                    (item) => item.id !== product.id
                );
            } else {
                favorites.push(product);
            }
            return {
              ...state,
              user: { ...state.user, favorites},
          };
        }

        case CLEAR_USER_FAVORITES: {
            return { ...state, user: {...state.user, favorites: []}};
        }

        default:
            throw new Error(`No Matching "${action.type}" - action type`);
    }
};

export default user_reducer;

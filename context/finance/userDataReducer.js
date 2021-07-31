import { UPDATE_DATA, FILTER_BY_CATEGORY, UPDATE_INCOME } from "./actions";

export const userDataReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_DATA:
            return { ...state, data: action.payload };
        case FILTER_BY_CATEGORY:
            return { ...state, category: action.payload };
        case UPDATE_INCOME:
            return { ...state, income: action.payload };
        default:
            return state;
    }
};

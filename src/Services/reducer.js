import {isLoading, resetPage, getLanguage, Get_Data} from './constant';

const initialState = {
  data: '',
  page: 1,
  category: 'Most Popular',
  isLoading: true,
  language: '',
  genre: '',
  sortType: '',
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case Get_Data:
      return {
        ...state,

        isLoading: false,
        page: action.page,
        category: action.category,
        genre: action.genre.genres,
        sortType: action.sortType,
        data: action.page === 1 ? action.data : [...state.data, ...action.data],
      };

    case isLoading:
      return {...state, isLoading: action.set};
    case getLanguage:
      return {
        ...state,
        language: action.language,
      };
    case resetPage:
      return {
        ...state,
        data: '',
        page: 1,
        title: action,
        isLoading: true,
        language: state.language,
      };
    default:
      return state;
  }
}

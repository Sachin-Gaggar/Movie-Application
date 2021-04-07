import {isLoading, getLanguage, key, Get_Data} from './constant';

export const getMovieList = (pageNumber, sortType, category) => async (
  dispatch,
) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=${sortType}&include_adult=false&include_video=false&page=${pageNumber}`,
    );
    const result = await response.json();
    const genreResponse = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`,
    );
    const genre = await genreResponse.json();
    dispatch({
      type: Get_Data,
      data: result.results,
      page: pageNumber,
      genre: genre,
      sortType: sortType,
      category: category,
    });
  } catch (error) {
    console.log('Inside error block with error msg' + error);
  }
};

export const setIsLoading = (set) => {
  return {
    type: isLoading,
    set,
  };
};
export const getLanguageApi = () => async (dispatch) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/configuration/languages?api_key=${key}`,
    );
    const result = await response.json();
    dispatch({
      type: getLanguage,
      language: result,
    });
  } catch (error) {
    console.log(error);
  }
};

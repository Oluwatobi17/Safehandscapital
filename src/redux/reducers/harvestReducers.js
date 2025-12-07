import {
  HARVEST_FAILURE,
  HARVEST_REQUEST,
  HARVEST_SUCCESS,
} from "../constants/harvestConstants";

export const harvestReducers = (state = {}, action) => {
  switch (action.type) {
    case HARVEST_REQUEST:
      return { loadingHarvest: true };
    case HARVEST_SUCCESS:
      return { loadingHarvest: false, harvests: action.payload };
    case HARVEST_FAILURE:
      return { loadingHarvest: false, error: action.payload };

    default:
      return state;
  }
};

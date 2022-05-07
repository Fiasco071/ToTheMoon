const GET_ASSET = "asset/GET_ASSET";

const getAsset = (asset) => {
  return {
    type: GET_ASSET,
    payload: asset,
  };
};

export const getAllAssets = () => async (dispatch) => {
  const response = await fetch(`/api/assets/`);

  if (response.ok) {
    const assets = await response.json();
    dispatch(getAsset(assets));
    return response;
  }
};

const assetReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ASSET:
      const allAssets = {};
      action.payload.assets.forEach((asset) => {
        allAssets[asset.id] = asset;
      });
      return allAssets;
    default:
      return state;
  }
};

export default assetReducer;

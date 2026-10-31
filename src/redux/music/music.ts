const initialState = {
  state: null,
};

export const musicReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "add":
      return {
        state: action.value,
      };

    default:
      return state;
  }
};

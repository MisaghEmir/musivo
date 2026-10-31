const initialState = {
  state: null,
};

export const listReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "listadd":
      return {
        state: action.value,
      };

    default:
      return state;
  }
};

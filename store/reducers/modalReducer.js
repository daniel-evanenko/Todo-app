export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";

const initialState = {
    isOpen: false,
    message: "",
    onConfirm: null,
};

export function modalReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                isOpen: true,
                message: action.payload.message,
                onConfirm: action.payload.onConfirm,
            };
        case HIDE_MODAL:
            return initialState;
        default:
            return state;
    }
}

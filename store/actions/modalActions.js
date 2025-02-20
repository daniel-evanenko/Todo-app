import { HIDE_MODAL, SHOW_MODAL } from "../reducers/modalReducer";

export function showModal({ message, onConfirm }) {
    return {
        type: SHOW_MODAL,
        payload: { message, onConfirm },
    };
}

export function hideModal() {
    return { type: HIDE_MODAL };
}
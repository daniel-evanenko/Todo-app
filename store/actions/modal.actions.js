import { HIDE_MODAL, SHOW_MODAL } from "../reducers/modal.reducer.js";

export function showModal({ message, onConfirm }) {
    return {
        type: SHOW_MODAL,
        payload: { message, onConfirm },
    };
}

export function hideModal() {
    return { type: HIDE_MODAL };
}
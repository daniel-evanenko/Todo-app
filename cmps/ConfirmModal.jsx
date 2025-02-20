import { hideModal } from "../store/actions/modalActions.js"
const { useSelector, useDispatch } = ReactRedux

export function ConfirmModal() {
    const dispatch = useDispatch();
    const { isOpen, message, onConfirm } = useSelector(state => state.modalModule);

    if (!isOpen) return null; // Hide modal if it's not open

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <button onClick={() => {  dispatch(hideModal()); onConfirm(); }}>Yes</button>
                <button onClick={() => dispatch(hideModal())}>No</button>
            </div>
        </div>
    );
}

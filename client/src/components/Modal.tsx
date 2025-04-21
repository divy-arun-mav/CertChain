import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                className={styles.modalContainer}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    aria-label="Close modal"
                    className={styles.closeButton}
                    onClick={onClose}
                >
                    ×
                </button>
                <h2 className={styles.header}>Project Description</h2>
                <div
                    className={styles.body}
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>
        </div>
    );
};

export default Modal;
export interface ModalProps {
    show: boolean;
    onClose: () => void;
}

export interface User {
    id: string,
    email: string;
    name: string | null;
}
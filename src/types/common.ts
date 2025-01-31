export interface ModalProps {
    show: boolean;
    onClose: () => void;
}

export interface User {
    id: string,
    email: string;
    name: string | null;
}

export interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}
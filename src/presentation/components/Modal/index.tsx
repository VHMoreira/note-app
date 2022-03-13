import React from "react";
import Style from './style.scss'
import { Close } from "@/presentation/icons";
import Divider from "../Divider";

type Props = {
    isOpen: boolean
    title: string
    onClose: () => void
}

const Modal: React.FC<Props> = ({ title, onClose, isOpen, children }) => {
    return isOpen ? (
        <>
            <aside className={Style.modalContainer}>
                <header className={Style.modalHeader}>
                    <h3>{ title }</h3>
                    <Close onClick={onClose}/>
                </header>
                <Divider />
                <div className={Style.modalBody}>
                    { children }
                </div>
            </aside>
            <div onClick={onClose} className={Style.modalBackground}/>
        </>
    ): null
}

export default Modal
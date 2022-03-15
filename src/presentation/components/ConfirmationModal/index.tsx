import React from "react"
import Button from "../Button"
import Modal from "../Modal"
import Styles from './styles.scss'
import { Cancel, Confirm } from "@/presentation/icons"

type Props = {
    title: string
    text: string
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
}

const ConfirmationModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    text, 
    title 
}) => {
    return (
        <Modal isOpen={isOpen} title={title} onClose={onClose}>
            <p>{ text }</p>
            <div className={Styles.actionsContainer}>
                <Button icon={Cancel} onClick={onClose} color="warning">cancel</Button>
                <Button icon={Confirm} onClick={onConfirm} color="success">confirm</Button>
            </div>
        </Modal>
    )
} 

export default ConfirmationModal

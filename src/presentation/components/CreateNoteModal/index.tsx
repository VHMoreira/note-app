import React from "react"
import { useState } from "react"
import Button from "../Button"
import Modal from "../Modal"
import Styles from './styles.scss'
import { Cancel, Plus, Save, Trash } from "@/presentation/icons"

type TasksChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, index: number) => void

type Props = {
    isOpen: boolean
    onClose: () => void
}

const CreateNoteModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('')
    const [tasks, setTasks] = useState<string[]>([''])

    const canDeleteTask = tasks.length > 1

    const handleChangeTitle: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.target
        setTitle(value)
    }

    const handleChangeTask: TasksChangeHandler = (event, index) => {
        const { value } = event.target
        const newTasks = [
            ...tasks
        ]

        newTasks[index] = value
        setTasks(newTasks)
    }

    const handleAddNewTask = () => {
        setTasks(prev => [
            ...prev,
            ''
        ])
    }

    const handleDeleteNewTask = (indexToDelete: number) => {
        if(canDeleteTask) {
            setTasks(prev => prev.filter((_, index) => index !== indexToDelete))
        }
    }

    const handleCancel = () => {
        setTitle('')
        setTasks([''])
        onClose()
    }

    return (
        <Modal isOpen={isOpen} title="Create Note" onClose={handleCancel}>
            <div className={Styles.field}>
                <div className={Styles.fieldsHeader}>
                    <label htmlFor="title">Title</label>
                </div>
                <input className={Styles.fieldInput} name="title" type="text" placeholder="Ex: Market" value={title} onChange={handleChangeTitle}/>
            </div>
            <div className={Styles.field}>
                <div className={Styles.fieldsHeader}>
                    <label htmlFor="tasks">Note Tasks</label>
                    <Button icon={Plus} onClick={handleAddNewTask}>new task</Button>
                </div>
                <ul className={Styles.taskFieldsList}>
                    {tasks.map((task, index) => (
                        <li key={`task-${index}`} className={Styles.fieldContainer}>
                            <input 
                                className={Styles.fieldInput}
                                type="text" 
                                placeholder="Ex: Buy milk" 
                                value={task} 
                                onChange={(event) => handleChangeTask(event, index)}
                            />
                            {canDeleteTask ? <Trash onClick={() => handleDeleteNewTask(index)}/> : null}
                        </li>
                    ))}
                </ul>
                <div className={Styles.actionsContainer}>
                    <Button icon={Cancel} onClick={handleCancel}>cancel</Button>
                    <Button icon={Save} onClick={handleAddNewTask}>save note</Button>
                </div>
            </div>
        </Modal>
    )
} 

export default CreateNoteModal
import React from "react"
import Button from "../Button"
import { Cancel, Plus, Save, Trash } from "@/presentation/icons"
import Styles from './styles.scss'

type ItensChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, index: number) => void

type Props = {
    titleValue: string
    onChangeTitleValue: React.ChangeEventHandler<HTMLInputElement>
    itensValue: string[]
    onAddNewItem: () => void
    onChangeItemValue: ItensChangeHandler
    onDeleteItem: (index: number) => void
    canDeleteItem: boolean
    onCancel: () => void
    onSaveNote: () => void
}

const Form: React.FC<Props> = ({
    titleValue,
    onChangeTitleValue,
    itensValue,
    onAddNewItem,
    onChangeItemValue,
    onDeleteItem,
    canDeleteItem,
    onCancel,
    onSaveNote
}) => {
    return (
        <form>
            <div className={Styles.field}>
                <div className={Styles.fieldsHeader}>
                    <label htmlFor="title">Title</label>
                </div>
                <input 
                    className={Styles.fieldInput} 
                    name="title" 
                    type="text" 
                    placeholder="Ex: Market" 
                    value={titleValue} 
                    onChange={onChangeTitleValue}
                />
            </div>
            <div className={Styles.field}>
                <div className={Styles.fieldsHeader}>
                    <label htmlFor="itens">Note Itens</label>
                    <Button icon={Plus} onClick={onAddNewItem} color="success">new item</Button>
                </div>
                <ul className={Styles.itemFieldsList}>
                    {itensValue.map((item, index) => (
                        <li key={`item-${index}`} className={Styles.fieldContainer}>
                            <input 
                                className={Styles.fieldInput}
                                type="text" 
                                placeholder="Ex: Buy milk" 
                                value={item} 
                                onChange={(event) => onChangeItemValue(event, index)}
                            />
                            {canDeleteItem ? <Trash onClick={() => onDeleteItem(index)}/> : null}
                        </li>
                    ))}
                </ul>
                <div className={Styles.actionsContainer}>
                    <Button icon={Cancel} onClick={onCancel} color="warning">cancel</Button>
                    <Button icon={Save} onClick={onSaveNote} color="success">save note</Button>
                </div>
            </div>
        </form>
    )
}

export default Form
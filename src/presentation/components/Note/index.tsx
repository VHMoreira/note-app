import React from 'react'
import Styles from './style.scss'
import { Divider, Chevron } from '@/presentation/components'
import { useToggle } from '@/presentation/hooks'

type Props = {
    title?: string
}

const Note: React.FC<Props> = ({ title = "Unamed" }) => {
    const { isActive, toggle } = useToggle()
    return (
        <div className={Styles.noteContainer}>
            <div className={Styles.noteHeader} onClick={toggle}>
                <h1 className={Styles.noteTitle}>{title}</h1>
                <Chevron 
                    color="#fff" 
                    position={ isActive ? 'up' : 'down' }
                />
            </div>
            {isActive ? (
                <>
                    <Divider />
                    <div className={Styles.noteBody}>
                        <ul>
                            <li>Dormir</li>
                            <li>Comer</li>
                            <li>Jogar bola</li>
                        </ul>
                    </div>
                </>
            ): null}
        </div>
    )
}

export default Note
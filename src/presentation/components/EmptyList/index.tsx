import { List } from '@/presentation/icons'
import React from 'react'
import Styles from './styles.scss'

const EmptyList: React.FC = () => {
    return (
        <div className={Styles.container}>
            <List />
            <p>You don't have any note listed.</p>
            <p>But don't worry you, can click in the buttom above to create your first :)</p>
        </div>
    )
}

export default EmptyList
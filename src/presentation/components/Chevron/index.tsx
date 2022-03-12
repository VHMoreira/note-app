import React from 'react'
import Style from './style.scss'
import { ChevronDown } from '@/presentation/icons'

type ChevronPosition = 'down' | 'up' | 'right' | 'left'

type Props = {
    position?: ChevronPosition
    size?: string
    color?: string
}

const Chevron: React.FC<Props> = ({ size, color, position }) => {
    return <ChevronDown className={Style[position]} size={size} color={color} />
}

export default Chevron
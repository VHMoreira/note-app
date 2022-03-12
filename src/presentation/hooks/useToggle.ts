import { useCallback, useState } from 'react';

type ReturnType = {
    isActive: boolean
    enable: () => void
    disable: () => void
    toggle: () => void
}

const useToggle = (initialValue = false): ReturnType => {
    const [isActive, setIsActive] = useState(initialValue)

    const enable = useCallback(() => {
        setIsActive(true)
    }, [])

    const disable = useCallback(() => {
        setIsActive(false)
    }, [])

    const toggle = useCallback(() => {
        setIsActive(isActive => !isActive)
    }, [])

    return {
        isActive,
        enable,
        disable,
        toggle
    }
}

export default useToggle
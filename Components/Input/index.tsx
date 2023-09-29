import styles from './styles.module.scss'

interface InputProps {
    value: string;
    setTryLetter: (value: string) => void;
    handleTryLetter: (letter: string) => void;
}

const Input = ({
    value,
    setTryLetter,
    handleTryLetter
}: InputProps) => {
    return (
        <div className={styles.inputContainer}>
            <input
                type="text"
                value={value}
                onChange={(e) => setTryLetter(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleTryLetter(value)
                        setTryLetter('')
                    }
                }}
                maxLength={1}
                placeholder='Try a letter'
                autoFocus
                />
        </div>
    )
}

export default Input

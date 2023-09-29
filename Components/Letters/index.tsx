import styles from './styles.module.scss'

interface LettersProps {
    letters: string[];
    foundLetters: [{
        letter: string;
        found: boolean;
    }]
    state: 'win' | 'lose' | 'playing' | 'none' | 'end';
}

const Letters = ({
    letters,
    foundLetters,
    state
}: LettersProps) => {
    return (
        <div className={styles.letters}>
            {foundLetters.map((letter, index) => (
                <div
                    key={index}
                    className={styles.letter}
                    style={{
                        color: letter.found ? 'black' : 'red'
                    }}
                >
                    {
                        (letter.found || state === 'lose' || state === 'end') &&
                        letters[index].toLocaleUpperCase()
                    }
                </div>
            ))}
        </div>
    )
}

export default Letters

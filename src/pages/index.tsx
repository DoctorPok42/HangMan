import Head from 'next/head'
import { Input, Letters } from '../../Components'
import { useState, useEffect } from 'react'
import { Alert } from '@mui/material'

const Home = (props: any) => {
  const [nbErrors, setNbErrors] = useState<number>(10)
  const [word] = useState<string>(props.word)
  const [letters] = useState<string[]>(props.word.split(''))
  const [error, setError] = useState<string>('')
  const [state, setState] = useState<'win' | 'lose' | 'playing' | 'none' | 'end'>('playing')
  const [usedLetters, setUsedLetters] = useState<string[]>([])
  const [foundLetters, setFoundLetters] = useState<any>(
    props.word.split('').map((letter: any) => ({ letter, found: false }))
  )
  const [tryLetter, setTryLetter] = useState<string>('')

  const handleTryLetter = (letter: string) => {
    setError('')

    if (state !== 'playing') return

    const regex = /^[a-zA-Z]+$/;
    if (letter === '' || letter === ' ' || !regex.test(letter)) {
      setError('You must enter a letter')
      return
    }

    if (usedLetters.includes(letter) || usedLetters.includes(letter.toLocaleLowerCase())) {
      setError('You already tried this letter')
      return
    }

    setUsedLetters([...usedLetters, letter])
    if (letters.includes(letter.toLocaleLowerCase())) {
      setFoundLetters(foundLetters.map((foundLetter: any) => {
        if (foundLetter.letter === letter) {
          return {
            ...foundLetter,
            found: true
          }
        } else {
          return foundLetter
        }
      }))

      if (foundLetters.every((foundLetter: any) => foundLetter.found)) {
        setState('win')
      }
    } else {
      setNbErrors(nbErrors - 1)
      if (nbErrors - 1 <= 0) {
        setState('lose')
      }
    }
  }

  useEffect(() => {
    if (foundLetters.length === [
      {
        letter: '',
        found: false
      }
    ].length) return
    if (foundLetters.every((foundLetter: any) => foundLetter.found)) {
      setState('win')
    }
  }, [foundLetters])

  return (
    <>
      <Head>
        <title>HangMan</title>
        <meta name="description" content="Play HangMan with your friends" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        {error && <Alert className='alert' severity="warning" onClose={() => setError('')}>
          {error}
        </Alert>}

        {(state === 'win' || state === 'lose') &&
          <Alert className='alert' severity={
            state === 'win' ? 'success' : 'error'
          } onClose={() => setState('end')}>
            {state === 'win' ? 'You won! 🎉' : 'You lose! 😢 the word was ' + word}
          </Alert>
        }

      <img src={`/icons/${nbErrors}.png`} alt="logo" className="logo" />

      <Letters letters={letters} foundLetters={foundLetters} state={state} />

      <Input value={tryLetter} setTryLetter={setTryLetter} handleTryLetter={handleTryLetter} />

      <div className="letterFound">
        {usedLetters.map((letter, index) => (
          <span key={index} className="letter">
            {letter + ' '}
          </span>
        ))}
      </div>

      </main>
    </>
  )
}

export default Home

export const getServerSideProps = async () => {
  const res = await fetch('https://hangman.doctorpok.io/api/getRandomWord', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await res.json()

  return {
    props: {
      word: data.word
    }
  }
}

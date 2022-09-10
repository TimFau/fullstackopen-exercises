import { useEffect, useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [winner, setWinner] = useState({
    votes: 0,
    index: 0
  })

  const nextAnecdote = () => {
    let index = Math.floor(Math.random() * anecdotes.length)
    if (index !== selected && anecdotes.length > 1) {
      setSelected(index)
    } else {
      console.log('same as last time; running nextAnecdote again')
      nextAnecdote()
    }
  }

  const handleVote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  const checkWinner = () => {
    const maxVotes = Math.max(...votes)
    const index = votes.indexOf(maxVotes)
    if (winner.votes !== maxVotes) {
      const newWinner = {
        votes: maxVotes,
        index: index
      }
      setWinner(newWinner)
    }
  }

  useEffect(() => {
    checkWinner()
  })

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div className="vote-count-container">
        has {votes[selected]} votes
      </div>
      <div className="buttons-container">
        <button
          onClick={() => handleVote()}
        >vote</button>
        <button
          onClick={() => nextAnecdote()}
        >next anecdote</button>
      </div>
      {winner.votes > 0 &&
      <div className="most-votes-container">
        <h1>Anecdote with the most votes</h1>
        {anecdotes[winner.index]}
        <div>has {winner.votes} votes</div>
      </div>
      }
    </div>
  )
}

export default App
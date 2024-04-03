import Card from "../card/Card";
import { useCallback, useEffect, useState } from "react";
import pokemon1 from '../../assets/images/1.png'
import pokemon2 from '../../assets/images/2.png'
import pokemon3 from '../../assets/images/3.png'
import pokemon4 from '../../assets/images/4.png'
import pokemon5 from '../../assets/images/5.png'
import pokemon6 from '../../assets/images/6.png'
import pokemon7 from '../../assets/images/7.png'
import pokemon8 from '../../assets/images/8.png'
import pokemon9 from '../../assets/images/9.png'
import pokemon10 from '../../assets/images/10.png'
import { useGlobal } from "../../context/context";
import { Button } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import Success from "../win/Win";
import { CardInfo } from "../../types/interface";
import Lose from "../lose/Lose";

const cardImage = [
  { src: pokemon1, matched: false },
  { src: pokemon2, matched: false },
  { src: pokemon3, matched: false },
  { src: pokemon4, matched: false },
  { src: pokemon5, matched: false },
  { src: pokemon6, matched: false },
  { src: pokemon7, matched: false },
  { src: pokemon8, matched: false },
  { src: pokemon9, matched: false },
  { src: pokemon10, matched: false },
]
const Start: React.FC = () => {
  const [level, setLevel] = useSearchParams('level=1')

  const navigate = useNavigate()
  const { name } = useGlobal()
  const [cards, setCards] = useState<Array<CardInfo>>([]);
  const [turns, setTurns] = useState<number>(0)
  const [choiceOne, setChoiceOne] = useState<CardInfo | null>(null)
  const [choiceTwo, setChoiceTwo] = useState<CardInfo | null>(null)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [view, setView] = useState<'win' | 'lose' | null>(null)
  const [time, setTime] = useState<number>(0)
  // shuffle cards
  const shuffeCards = useCallback((): void => {
    const shuffeCards = cardImage.slice(0, Number(level.get('level')));
    const card = [...shuffeCards, ...shuffeCards]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceOne(null)
    setCards(card);
    setTime(10 * Number(level.get('level')))
    setView(null);
    setTurns(0);
  }, [level])
  const handleChoice = (card: CardInfo): void => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  const resetTurn = (): void => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(turn => turn + 1);
    setDisabled(false)
  }

  const handleRedirect = useCallback((): void => {
    shuffeCards();
    navigate('/login');
  }, [navigate, shuffeCards])

  const handleNextLevel = useCallback((): void => {
    setLevel(`level=${(Number(level.get('level')) + 1).toString()}`)
  }, [level, setLevel])

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(card => card.map(card => (card.src === choiceOne.src) ? { ...card, matched: true } : card))
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.every(card => card.matched === true)) disabled || setView('win')
  }, [turns, cards, disabled])

  useEffect(() => {
    setLevel(`level=${level.get('level')?.toString()}`);
    shuffeCards()
  }, [level, setLevel, shuffeCards])

  useEffect(() => {
    name || navigate('/login')
  }, [name, navigate])

  useEffect(() => {
    let timeOut: any
    if (time > 0)
      timeOut = setTimeout(() => {
        view === null && setTime((t) => t - 1)
      }, 1000)
    else if (time <= 0) view !== 'win' && setView('lose')
    return () => clearTimeout(timeOut)
  }, [time, view])
  return (
    <>
      {name &&
        <main className="main">
          <h1 className="name-heading">Hi {name}</h1>
          <div className="button">
            <span style={{ fontSize: '2rem', margin: '0 40px' }}>time: {time}</span>
            <Button
              onClick={shuffeCards}
              type="primary" size="large">Restart</Button>
            <Button
              onClick={handleRedirect}
              type="primary" size="large">Login</Button>
            <span style={{ fontSize: '2rem', margin: '0 40px' }}>fliped: {turns}</span>
          </div>
          <div className="card-grid">
            {cards.map(card => (
              <Card
                handleChoice={handleChoice}
                disabled={disabled}
                flipped={card === choiceOne || card === choiceTwo || card.matched}
                card={card} key={card.id} />))}
          </div>
        </main>
      }
      {view === 'win' && <Success handleNextLevel={handleNextLevel} handleRestart={shuffeCards} handleReset={handleRedirect} />}
      {view === 'lose' && <Lose handleRestart={shuffeCards} handleReset={handleRedirect} />}
    </>
  )
}
export default Start
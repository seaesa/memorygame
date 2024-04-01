import { memo } from 'react';
import Ball from '../../assets/images/ball.png';
import { CardInfo } from '../../types/interface';

interface ParentCardTypes {
  card: CardInfo,
  flipped: boolean,
  disabled: boolean,
  handleChoice: (card: CardInfo) => void,
}
const Card: React.FC<ParentCardTypes> = ({
  card, handleChoice, flipped, disabled,
}): JSX.Element => {
  return (
    <>
      <div className="card" key={card.id}>
        <div className={`layout ${flipped ? 'flipped' : ''}`}>
          <img src={card.src} className={`front image-front`} />
          <img
            onClick={() => !disabled && handleChoice(card)}
            src={Ball} className="back image-back" />
        </div>
      </div>
    </>
  )
}
export default memo(Card)
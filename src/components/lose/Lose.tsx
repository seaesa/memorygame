import { Button } from "antd"
interface LoseTypes {
  handleRestart: () => void,
  handleReset: () => void
}
const Lose: React.FC<LoseTypes> = ({ handleRestart, handleReset }) => {
  return (
    <>
      <div className="overlay">
        <h1 className="win">You Lose</h1>
        <div className="button-win">
          <Button
            onClick={handleReset}
            type="primary" style={{ margin: '0 20px' }} size="large">Login</Button>
          <Button
            onClick={handleRestart}
            type="primary" style={{ margin: '0 20px' }} size="large">Try Again</Button>
        </div>
      </div>
    </>
  )
}
export default Lose
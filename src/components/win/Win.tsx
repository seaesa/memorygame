import { Button } from "antd"
interface WinTypes {
  handleRestart: () => void,
  handleReset: () => void,
  handleNextLevel: () => void
}
const Success: React.FC<WinTypes> = ({ handleRestart, handleReset, handleNextLevel }) => {
  return (
    <>
      <div className="overlay">
        <h1 className="win">You Won</h1>
        <div className="button-win">
          <Button
            onClick={handleReset}
            type="primary" style={{ margin: '0 20px' }} size="large">Login</Button>
          <Button
            onClick={handleRestart}
            type="primary" style={{ margin: '0 20px' }} size="large">Restart</Button>
          <Button
            onClick={handleNextLevel}
            type="primary" style={{ margin: '0 20px' }} size="large">Next Level</Button>
        </div>
      </div>
    </>
  )
}
export default Success
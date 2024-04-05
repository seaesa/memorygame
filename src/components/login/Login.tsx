import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../context/context";
import { App, Form, Input } from "antd";
import { SearchProps } from "antd/es/input";
import { contextTypes } from "../../types/interface";

const Login: React.FC = (): JSX.Element => {
  const { name, setName }: contextTypes = useGlobal();
  const { modal } = App.useApp()
  const navigate = useNavigate()
  const handleStartGame: SearchProps['onSearch'] = (value: string): void => {
    const regex = /[^A-Za-z 0-9]/g;
    value.trim()
      ? (+value.trim().charAt(0) ? false : true)
        ? (!regex.test(value))
          ? (value.trim().length > 1)
            ? navigate('/start')
            : modal.error({ content: 'giá trị phải tối thiểu 2 ký tự' })
          : modal.error({ content: 'giá trị không được chứa ký tự đặc biệt' })
        : modal.error({ content: 'giá trị không được bắt đầu bằng số' })
      : modal.error({ content: 'giá trị không được để trống' })
  }
  return (
    <>
      <main>
        <div className="login">
          <Form>
            <Form.Item name='input' rules={[{ required: true, whitespace: true }]}>
              <Input.Search
                onSearch={handleStartGame}
                onChange={(e: React.ChangeEvent) => setName((e.target as HTMLInputElement).value)}
                value={name}
                enterButton='Submit' placeholder="username" name="search" />
            </Form.Item>
          </Form>
        </div>
      </main>
    </>
  )
}
export default Login
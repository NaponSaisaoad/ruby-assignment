import Layout, { Content } from 'antd/es/layout/layout';
import './App.css'
import Employee from './pages/Employee';
import Title from 'antd/es/typography/Title';

function App() {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      <Content style={{ padding: "40px 80px" }}>
        <Title level={2}>Employee List</Title>
        <Employee />
      </Content>
    </Layout>
  );
}


export default App

import { Layout, Menu, Typography } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';
import { PlaceholderPage } from '../pages/PlaceholderPage';

const { Header, Sider, Content } = Layout;

const items = [
  ['dashboard', 'Dashboard'],
  ['users', '用户管理'],
  ['children', '儿童档案管理'],
  ['content', '内容管理'],
  ['map-data', '地图数据管理'],
  ['detection-rules', '检测规则管理'],
  ['training-templates', 'AI训练模板管理'],
  ['reports', '报表管理'],
  ['permissions', '权限管理'],
  ['settings', '系统设置'],
] as const;

export function AdminApp() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <Typography.Title level={4} style={{ color: '#fff', padding: 16, margin: 0 }}>
          Xcure Admin
        </Typography.Title>
        <Menu
          theme="dark"
          mode="inline"
          items={items.map(([key, label]) => ({ key, label: <Link to={`/${key}`}>{label}</Link> }))}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff' }}>儿童鼻炎康复 - 管理后台</Header>
        <Content style={{ margin: 16, padding: 24, background: '#fff' }}>
          <Routes>
            {items.map(([key, label]) => (
              <Route key={key} path={`/${key}`} element={<PlaceholderPage title={label} />} />
            ))}
            <Route path="*" element={<PlaceholderPage title="Dashboard" />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

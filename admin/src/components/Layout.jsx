import { Link, Outlet } from 'react-router-dom';

const menus = [
  ['/', 'Dashboard'],
  ['/users', '用户管理'],
  ['/children', '儿童档案管理'],
  ['/contents', '内容管理'],
  ['/map-data', '地图数据管理'],
  ['/detection-rules', '检测规则管理'],
  ['/training-templates', '训练模板管理'],
  ['/reports', '报表管理'],
];

export default function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <aside style={{ width: 220, padding: 16, borderRight: '1px solid #ddd' }}>
        <h3>Xcure Admin</h3>
        {menus.map(([path, label]) => (
          <div key={path} style={{ marginBottom: 8 }}><Link to={path}>{label}</Link></div>
        ))}
      </aside>
      <main style={{ flex: 1, padding: 20 }}><Outlet /></main>
    </div>
  );
}

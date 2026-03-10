export default function PageShell({ title, rows = [] }) {
  return (
    <section>
      <h2>{title}</h2>
      <p>基础页面壳子（mock 数据）</p>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', minWidth: 420 }}>
        <thead><tr><th>ID</th><th>名称</th><th>状态</th></tr></thead>
        <tbody>
          {rows.map((row) => <tr key={row.id}><td>{row.id}</td><td>{row.name}</td><td>{row.status}</td></tr>)}
        </tbody>
      </table>
    </section>
  );
}

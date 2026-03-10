import { Card } from 'antd';

export function PlaceholderPage({ title }: { title: string }) {
  return <Card title={title}>{title}（MVP骨架页面）</Card>;
}

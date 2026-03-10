import PageShell from '../components/PageShell';
import { sampleRows } from '../mock/adminMock';

export const Dashboard = () => <PageShell title="Dashboard" rows={sampleRows} />;
export const Users = () => <PageShell title="用户管理" rows={sampleRows} />;
export const Children = () => <PageShell title="儿童档案管理" rows={sampleRows} />;
export const Contents = () => <PageShell title="内容管理" rows={sampleRows} />;
export const MapData = () => <PageShell title="地图数据管理" rows={sampleRows} />;
export const DetectionRules = () => <PageShell title="检测规则管理" rows={sampleRows} />;
export const TrainingTemplates = () => <PageShell title="训练模板管理" rows={sampleRows} />;
export const Reports = () => <PageShell title="报表管理" rows={sampleRows} />;

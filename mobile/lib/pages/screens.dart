import 'package:flutter/material.dart';

import '../components/common_components.dart';
import '../mock/mock_data.dart';
import '../models/app_models.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});
  @override
  Widget build(BuildContext context) => AppScaffold(
        title: '登录',
        body: Column(children: [
          const TextField(decoration: InputDecoration(labelText: '手机号')),
          const TextField(decoration: InputDecoration(labelText: '验证码')),
          const SizedBox(height: 16),
          ElevatedButton(onPressed: () => Navigator.pushNamed(context, '/child-profile'), child: const Text('登录'))
        ]),
      );
}

class ChildProfilePage extends StatelessWidget {
  const ChildProfilePage({super.key});
  @override
  Widget build(BuildContext context) => AppScaffold(
      title: '创建儿童档案',
      body: Column(children: [
        const TextField(decoration: InputDecoration(labelText: '儿童姓名')),
        const TextField(decoration: InputDecoration(labelText: '年龄')),
        const TextField(decoration: InputDecoration(labelText: '已知过敏源')),
        const SizedBox(height: 12),
        ElevatedButton(onPressed: () => Navigator.pushNamed(context, '/initial-assessment'), child: const Text('下一步'))
      ]));
}

class InitialAssessmentPage extends StatelessWidget {
  const InitialAssessmentPage({super.key});
  @override
  Widget build(BuildContext context) => AppScaffold(
      title: '初始评估',
      body: Column(children: [
        const LinearProgressIndicator(value: 0.4),
        const SizedBox(height: 12),
        const Text('近期是否出现鼻塞、咳嗽、皮疹等症状？'),
        const Spacer(),
        ElevatedButton(onPressed: () => Navigator.pushNamed(context, '/home'), child: const Text('完成评估'))
      ]));
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});
  @override
  Widget build(BuildContext context) {
    final data = MockDataProvider.of(context);
    return AppScaffold(
      title: '首页',
      actions: [IconButton(onPressed: () => Navigator.pushNamed(context, '/messages'), icon: const Icon(Icons.notifications))],
      body: StateContainer(
        state: data.state,
        content: ListView(
          children: [
            ChildSwitcher(currentChild: data.child.name),
            const SizedBox(height: 8),
            Text('当前儿童：${data.child.name} · ${data.child.age}岁 · ${data.child.allergyType}'),
            RiskCard(risk: data.todayRisk),
            DetectionResultCard(summary: data.lastDetection),
            const Text('今日训练计划'),
            ...data.tasks.map((e) => TrainingTaskCard(task: e)),
            ListTile(title: const Text('今天最该做的一件事'), subtitle: Text(data.topTodo)),
            ListTile(title: const Text('最近症状摘要'), subtitle: Text(data.symptomSummary)),
            ElevatedButton(onPressed: () => Navigator.pushNamed(context, '/map'), child: const Text('去查看地图风险')),
            ElevatedButton(onPressed: () => Navigator.pushNamed(context, '/detection'), child: const Text('去检测')),
            ElevatedButton(onPressed: () => Navigator.pushNamed(context, '/training'), child: const Text('开始训练')),
            ElevatedButton(onPressed: () => Navigator.pushNamed(context, '/symptom-record'), child: const Text('记录症状')),
            ElevatedButton(onPressed: () => Navigator.pushNamed(context, '/report'), child: const Text('查看报告')),
          ],
        ),
      ),
    );
  }
}

class AllergyMapPage extends StatelessWidget {
  const AllergyMapPage({super.key});
  @override
  Widget build(BuildContext context) => AppScaffold(
        title: '个性化过敏源地图',
        body: ListView(children: [
          const Text('当前地点：上海市浦东新区'),
          const SegmentedButton<ButtonSegment<String>>(
            segments: [ButtonSegment(value: 'today', label: Text('今日')), ButtonSegment(value: 'tomorrow', label: Text('明日')), ButtonSegment(value: 'future', label: Text('未来3天'))],
            selected: {'today'},
          ),
          const RiskCard(risk: RiskData('中高风险', 76)),
          const Card(child: ListTile(title: Text('花粉因子'), subtitle: Text('偏高'))),
          const Card(child: ListTile(title: Text('空气质量'), subtitle: Text('良'))),
          const Card(child: ListTile(title: Text('温湿度'), subtitle: Text('湿度偏高'))),
          const Card(child: ListTile(title: Text('个性化建议'), subtitle: Text('外出佩戴口罩，回家后清洁鼻腔'))),
          const ListTile(title: Text('常用地点'), subtitle: Text('家 / 学校 / 公园')),
          ElevatedButton(onPressed: () => Navigator.pushNamed(context, '/map-detail'), child: const Text('查看地点详情')),
        ]),
      );
}

class MapDetailPage extends StatelessWidget {
  const MapDetailPage({super.key});
  @override
  Widget build(BuildContext context) => const AppScaffold(title: '地图详情', body: Center(child: Text('地点风险明细 + 历史变化（mock）')));
}

class DetectionHomePage extends StatelessWidget {
  const DetectionHomePage({super.key});
  @override
  Widget build(BuildContext context) => AppScaffold(
      title: '检测首页',
      body: Column(children: [
        const Text('问卷式检测可在 2 分钟内完成风险评估'),
        const Spacer(),
        ElevatedButton(onPressed: () => Navigator.pushNamed(context, '/detection-questionnaire'), child: const Text('开始问卷'))
      ]));
}

class DetectionQuestionnairePage extends StatefulWidget {
  const DetectionQuestionnairePage({super.key});
  @override
  State<DetectionQuestionnairePage> createState() => _DetectionQuestionnairePageState();
}

class _DetectionQuestionnairePageState extends State<DetectionQuestionnairePage> {
  int step = 1;
  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      title: '检测问卷',
      body: Column(children: [
        LinearProgressIndicator(value: step / 3),
        const SizedBox(height: 12),
        Text('第 $step/3 步：今天是否有鼻塞或流涕？'),
        const Spacer(),
        Row(children: [
          Expanded(
            child: OutlinedButton(
                onPressed: () {
                  if (step < 3) {
                    setState(() => step++);
                  } else {
                    Navigator.pushNamed(context, '/detection-result');
                  }
                },
                child: const Text('有')),
          ),
        ])
      ]),
    );
  }
}

class DetectionResultPage extends StatelessWidget {
  const DetectionResultPage({super.key});
  @override
  Widget build(BuildContext context) => AppScaffold(
      title: '检测结果',
      body: ListView(children: [
        const RiskCard(risk: RiskData('高风险', 88)),
        const SizedBox(height: 8),
        Container(height: 120, color: Colors.red.shade100, child: const Center(child: Text('结果图形化展示（mock chart）'))),
        const ListTile(title: Text('高风险提示'), subtitle: Text('建议立即进行 AI 呼吸训练并减少户外暴露')),
        ElevatedButton(onPressed: () => Navigator.pushNamed(context, '/training'), child: const Text('开始 AI 训练')),
      ]));
}

class TrainingHomePage extends StatelessWidget {
  const TrainingHomePage({super.key});
  @override
  Widget build(BuildContext context) {
    final tasks = MockDataProvider.of(context).tasks;
    return AppScaffold(
      title: '训练首页',
      body: ListView(children: [
        const Text('今日训练计划'),
        ...tasks.map((e) => TrainingTaskCard(task: e)),
        ElevatedButton(onPressed: () => Navigator.pushNamed(context, '/training-detail'), child: const Text('进入训练详情')),
      ]),
    );
  }
}

class TrainingDetailPage extends StatefulWidget {
  const TrainingDetailPage({super.key});
  @override
  State<TrainingDetailPage> createState() => _TrainingDetailPageState();
}

class _TrainingDetailPageState extends State<TrainingDetailPage> {
  int seconds = 120;
  bool running = false;
  @override
  Widget build(BuildContext context) => AppScaffold(
      title: '训练详情',
      body: Column(children: [
        const ListTile(title: Text('步骤引导'), subtitle: Text('1. 调整坐姿 2. 缓慢吸气 3. 呼气放松')),
        Text('倒计时：$seconds 秒'),
        Row(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
          ElevatedButton(onPressed: () => setState(() => running = true), child: const Text('开始')),
          ElevatedButton(onPressed: () => setState(() => running = false), child: const Text('暂停')),
          ElevatedButton(onPressed: () => setState(() => running = true), child: const Text('继续')),
        ]),
        const Spacer(),
        ElevatedButton(onPressed: () => Navigator.pushNamed(context, '/checkin-complete'), child: const Text('完成训练'))
      ]));
}

class CheckinCompletePage extends StatelessWidget {
  const CheckinCompletePage({super.key});
  @override
  Widget build(BuildContext context) => AppScaffold(
      title: '打卡完成',
      body: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        const Icon(Icons.celebration, size: 56),
        const Text('今天训练已完成，已自动打卡！'),
        ElevatedButton(onPressed: () => Navigator.pushNamed(context, '/symptom-record'), child: const Text('去记录症状')),
      ]));
}

class SymptomRecordPage extends StatelessWidget {
  const SymptomRecordPage({super.key});
  @override
  Widget build(BuildContext context) => AppScaffold(
      title: '症状记录',
      body: ListView(children: [
        const Text('快捷录入'),
        Wrap(spacing: 8, children: const [Chip(label: Text('鼻塞')), Chip(label: Text('打喷嚏')), Chip(label: Text('咳嗽'))]),
        const SizedBox(height: 8),
        const Text('完整项'),
        const TextField(decoration: InputDecoration(labelText: '持续时长')),
        const TextField(decoration: InputDecoration(labelText: '诱因备注')),
        ElevatedButton(
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('保存成功')));
            },
            child: const Text('保存')),
      ]));
}

class ReportPage extends StatelessWidget {
  const ReportPage({super.key});
  @override
  Widget build(BuildContext context) => AppScaffold(
      title: '报告',
      body: ListView(children: const [
        SegmentedButton<ButtonSegment<String>>(
          segments: [ButtonSegment(value: '7', label: Text('近7天')), ButtonSegment(value: '30', label: Text('近30天'))],
          selected: {'7'},
        ),
        TrendChart(points: [50, 70, 45, 80, 65, 55, 40]),
        ListTile(title: Text('趋势解读'), subtitle: Text('整体改善，但周三有短暂波动')),
        ListTile(title: Text('空状态示例'), subtitle: Text('数据不足时显示：继续打卡可生成报告')),
      ]));
}

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});
  @override
  Widget build(BuildContext context) => AppScaffold(
      title: '我的',
      body: ListView(children: [
        const ListTile(title: Text('账户信息')),
        ListTile(title: const Text('设置'), onTap: () => Navigator.pushNamed(context, '/settings')),
      ]));
}

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});
  @override
  Widget build(BuildContext context) => const AppScaffold(title: '设置', body: Center(child: Text('通知、隐私、儿童资料管理（mock）')));
}

class MessageCenterPage extends StatelessWidget {
  const MessageCenterPage({super.key});
  @override
  Widget build(BuildContext context) => const AppScaffold(
      title: '消息中心',
      body: StateContainer(
        state: ViewState.ready,
        content: Column(children: [ListTile(title: Text('高风险提醒'), subtitle: Text('今日花粉风险较高，请减少户外活动'))]),
      ));
}

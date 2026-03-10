import 'package:flutter/material.dart';

import '../models/app_models.dart';

class AppScaffold extends StatelessWidget {
  final String title;
  final Widget body;
  final List<Widget>? actions;
  const AppScaffold({super.key, required this.title, required this.body, this.actions});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title), actions: actions),
      body: SafeArea(child: Padding(padding: const EdgeInsets.all(16), child: body)),
    );
  }
}

class ChildSwitcher extends StatelessWidget {
  final String currentChild;
  const ChildSwitcher({super.key, required this.currentChild});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const Icon(Icons.child_care),
        const SizedBox(width: 8),
        DropdownButton<String>(
          value: currentChild,
          items: [currentChild, '乐乐', '糖糖']
              .toSet()
              .map((e) => DropdownMenuItem(value: e, child: Text(e)))
              .toList(),
          onChanged: (_) {},
        ),
      ],
    );
  }
}

class RiskCard extends StatelessWidget {
  final RiskData risk;
  const RiskCard({super.key, required this.risk});

  @override
  Widget build(BuildContext context) {
    final isHigh = risk.score >= 80;
    return Card(
      color: isHigh ? Colors.red.shade50 : Colors.green.shade50,
      child: ListTile(
        leading: Icon(Icons.warning_amber_rounded, color: isHigh ? Colors.red : Colors.green),
        title: Text('今日综合过敏风险：${risk.level}'),
        subtitle: Text('风险指数 ${risk.score}/100'),
      ),
    );
  }
}

class DetectionResultCard extends StatelessWidget {
  final String summary;
  const DetectionResultCard({super.key, required this.summary});

  @override
  Widget build(BuildContext context) {
    return Card(child: ListTile(title: const Text('最近检测结果'), subtitle: Text(summary)));
  }
}

class TrainingTaskCard extends StatelessWidget {
  final TrainingTask task;
  const TrainingTaskCard({super.key, required this.task});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: const Icon(Icons.fitness_center),
        title: Text(task.title),
        subtitle: Text('时长 ${task.duration} · ${task.status}'),
      ),
    );
  }
}

class TrendChart extends StatelessWidget {
  final List<int> points;
  const TrendChart({super.key, required this.points});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 120,
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(border: Border.all(color: Colors.blueGrey.shade100)),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: points
            .map((value) => Expanded(
                  child: Container(
                    margin: const EdgeInsets.symmetric(horizontal: 4),
                    height: value.toDouble(),
                    color: Colors.blue.shade300,
                  ),
                ))
            .toList(),
      ),
    );
  }
}

class EmptyState extends StatelessWidget {
  final String message;
  const EmptyState(this.message, {super.key});

  @override
  Widget build(BuildContext context) => Center(child: Text('暂无数据：$message'));
}

class ErrorState extends StatelessWidget {
  final String message;
  const ErrorState(this.message, {super.key});

  @override
  Widget build(BuildContext context) => Center(child: Text('加载失败：$message'));
}

class StateContainer extends StatelessWidget {
  final ViewState state;
  final Widget content;
  const StateContainer({super.key, required this.state, required this.content});

  @override
  Widget build(BuildContext context) {
    switch (state) {
      case ViewState.loading:
        return const Center(child: CircularProgressIndicator());
      case ViewState.empty:
        return const EmptyState('请稍后补充');
      case ViewState.error:
        return const ErrorState('网络异常，请重试');
      case ViewState.ready:
        return content;
    }
  }
}

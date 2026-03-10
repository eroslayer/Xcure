import 'package:flutter/material.dart';

import '../models/app_models.dart';

class AppMockData {
  final ChildProfile child;
  final RiskData todayRisk;
  final String lastDetection;
  final String topTodo;
  final String symptomSummary;
  final List<TrainingTask> tasks;
  final ViewState state;

  const AppMockData({
    required this.child,
    required this.todayRisk,
    required this.lastDetection,
    required this.topTodo,
    required this.symptomSummary,
    required this.tasks,
    required this.state,
  });

  factory AppMockData.sample() {
    return AppMockData(
      child: const ChildProfile(name: '可可', age: 6, allergyType: '花粉/尘螨'),
      todayRisk: const RiskData('高风险', 82),
      lastDetection: '鼻塞加重，建议先做呼吸放松训练',
      topTodo: '先完成 8 分钟呼吸训练，可快速降低不适风险',
      symptomSummary: '最近 3 天夜间咳嗽 2 次，晨起喷嚏频率略升高',
      tasks: const [
        TrainingTask('呼吸放松', '08:00', '待完成'),
        TrainingTask('鼻腔护理', '05:00', '进行中'),
      ],
      state: ViewState.ready,
    );
  }
}

class MockDataProvider extends InheritedWidget {
  final AppMockData data;

  const MockDataProvider({super.key, required this.data, required super.child});

  static AppMockData of(BuildContext context) {
    final provider = context.dependOnInheritedWidgetOfExactType<MockDataProvider>();
    return provider!.data;
  }

  @override
  bool updateShouldNotify(covariant MockDataProvider oldWidget) => oldWidget.data != data;
}

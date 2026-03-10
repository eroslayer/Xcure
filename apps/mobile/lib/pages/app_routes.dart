import 'package:flutter/material.dart';

import 'placeholder_page.dart';

class AppRoutes {
  static const splash = '/splash';
  static const login = '/login';
  static const childCreate = '/child/create';
  static const initialAssessment = '/assessment/initial';
  static const home = '/home';
  static const map = '/map';
  static const mapDetail = '/map/detail';
  static const detection = '/detection';
  static const detectionQuestionnaire = '/detection/questionnaire';
  static const detectionResult = '/detection/result';
  static const training = '/training';
  static const trainingDetail = '/training/detail';
  static const checkinDone = '/training/checkin-done';
  static const symptoms = '/symptoms';
  static const report = '/report';
  static const me = '/me';
  static const settings = '/settings';
  static const messages = '/messages';

  static final routes = <String, WidgetBuilder>{
    splash: (_) => const PlaceholderPage(title: '启动页'),
    login: (_) => const PlaceholderPage(title: '登录页'),
    childCreate: (_) => const PlaceholderPage(title: '儿童档案创建页'),
    initialAssessment: (_) => const PlaceholderPage(title: '初始评估页'),
    home: (_) => const PlaceholderPage(title: '首页'),
    map: (_) => const PlaceholderPage(title: '个性化过敏源地图页'),
    mapDetail: (_) => const PlaceholderPage(title: '地图详情页'),
    detection: (_) => const PlaceholderPage(title: '检测首页'),
    detectionQuestionnaire: (_) => const PlaceholderPage(title: '检测问卷页'),
    detectionResult: (_) => const PlaceholderPage(title: '检测结果页'),
    training: (_) => const PlaceholderPage(title: '训练首页'),
    trainingDetail: (_) => const PlaceholderPage(title: '训练详情页'),
    checkinDone: (_) => const PlaceholderPage(title: '打卡完成页'),
    symptoms: (_) => const PlaceholderPage(title: '症状记录页'),
    report: (_) => const PlaceholderPage(title: '报告页'),
    me: (_) => const PlaceholderPage(title: '我的页面'),
    settings: (_) => const PlaceholderPage(title: '设置页'),
    messages: (_) => const PlaceholderPage(title: '消息中心'),
  };
}

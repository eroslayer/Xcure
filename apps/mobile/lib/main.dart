import 'package:flutter/material.dart';

import 'pages/app_routes.dart';

void main() {
  runApp(const XcureApp());
}

class XcureApp extends StatelessWidget {
  const XcureApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '儿童鼻炎康复',
      theme: ThemeData(primarySwatch: Colors.blue),
      initialRoute: AppRoutes.splash,
      routes: AppRoutes.routes,
    );
  }
}

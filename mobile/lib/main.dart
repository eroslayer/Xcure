import 'package:flutter/material.dart';

import 'mock/mock_data.dart';
import 'pages/pages.dart';

void main() {
  runApp(const XcureParentApp());
}

class XcureParentApp extends StatelessWidget {
  const XcureParentApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Xcure 家长端 MVP',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF4A90E2)),
        useMaterial3: true,
      ),
      initialRoute: '/login',
      routes: {
        '/login': (_) => const LoginPage(),
        '/child-profile': (_) => const ChildProfilePage(),
        '/initial-assessment': (_) => const InitialAssessmentPage(),
        '/home': (_) => const HomePage(),
        '/map': (_) => const AllergyMapPage(),
        '/map-detail': (_) => const MapDetailPage(),
        '/detection': (_) => const DetectionHomePage(),
        '/detection-questionnaire': (_) => const DetectionQuestionnairePage(),
        '/detection-result': (_) => const DetectionResultPage(),
        '/training': (_) => const TrainingHomePage(),
        '/training-detail': (_) => const TrainingDetailPage(),
        '/checkin-complete': (_) => const CheckinCompletePage(),
        '/symptom-record': (_) => const SymptomRecordPage(),
        '/report': (_) => const ReportPage(),
        '/profile': (_) => const ProfilePage(),
        '/settings': (_) => const SettingsPage(),
        '/messages': (_) => const MessageCenterPage(),
      },
      builder: (context, child) {
        return MockDataProvider(data: AppMockData.sample(), child: child!);
      },
    );
  }
}

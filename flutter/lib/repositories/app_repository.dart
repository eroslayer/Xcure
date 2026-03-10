import '../services/api_client.dart';

class AppRepository {
  AppRepository(this.apiClient);

  final ApiClient apiClient;

  Future<void> sendCode(String phone) async {
    await apiClient.post('/api/auth/send-code', {'phone': phone});
  }

  Future<void> login(String phone, String code) async {
    final data = await apiClient.post('/api/auth/login', {'phone': phone, 'code': code});
    apiClient.token = data['accessToken'] as String;
  }

  Future<Map<String, dynamic>> createChild(Map<String, dynamic> payload) =>
      apiClient.post('/api/children', payload, auth: true);

  Future<Map<String, dynamic>> listChildren() => apiClient.get('/api/children', auth: true);

  Future<Map<String, dynamic>> initAssessment(Map<String, dynamic> payload) =>
      apiClient.post('/api/assessment/init', payload, auth: true);

  Future<Map<String, dynamic>> getMapRisk() => apiClient.get('/api/map/risk/current', auth: true);

  Future<Map<String, dynamic>> submitDetection(Map<String, dynamic> payload) =>
      apiClient.post('/api/detection/nasal-health', payload, auth: true);

  Future<Map<String, dynamic>> generatePlan(int childId) =>
      apiClient.post('/api/training/plan/generate', {'childId': childId}, auth: true);

  Future<Map<String, dynamic>> todayTasks(int childId) =>
      apiClient.get('/api/training/tasks/today/$childId', auth: true);

  Future<Map<String, dynamic>> checkin(Map<String, dynamic> payload) =>
      apiClient.post('/api/training/checkin', payload, auth: true);

  Future<Map<String, dynamic>> submitSymptom(Map<String, dynamic> payload) =>
      apiClient.post('/api/symptoms', payload, auth: true);

  Future<Map<String, dynamic>> reportSummary(int childId) =>
      apiClient.get('/api/report/summary/$childId', auth: true);
}

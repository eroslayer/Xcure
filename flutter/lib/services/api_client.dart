import 'dart:convert';
import 'package:http/http.dart' as http;

class UnauthenticatedException implements Exception {}

class ApiClient {
  ApiClient({required this.baseUrl});

  final String baseUrl;
  String? token;

  Future<Map<String, dynamic>> post(String path, Map<String, dynamic> body, {bool auth = false}) async {
    final response = await http.post(
      Uri.parse('$baseUrl$path'),
      headers: {
        'Content-Type': 'application/json',
        if (auth && token != null) 'Authorization': 'Bearer $token',
      },
      body: jsonEncode(body),
    );
    if (response.statusCode == 401) {
      throw UnauthenticatedException();
    }
    if (response.statusCode >= 400) {
      throw Exception('请求失败: ${response.body}');
    }
    return jsonDecode(response.body) as Map<String, dynamic>;
  }

  Future<Map<String, dynamic>> get(String path, {bool auth = false}) async {
    final response = await http.get(
      Uri.parse('$baseUrl$path'),
      headers: {
        if (auth && token != null) 'Authorization': 'Bearer $token',
      },
    );
    if (response.statusCode == 401) {
      throw UnauthenticatedException();
    }
    if (response.statusCode >= 400) {
      throw Exception('请求失败: ${response.body}');
    }
    return jsonDecode(response.body) as Map<String, dynamic>;
  }
}

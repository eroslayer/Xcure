enum ViewState { loading, ready, empty, error }

class ChildProfile {
  final String name;
  final int age;
  final String allergyType;

  const ChildProfile({required this.name, required this.age, required this.allergyType});
}

class RiskData {
  final String level;
  final int score;
  const RiskData(this.level, this.score);
}

class TrainingTask {
  final String title;
  final String duration;
  final String status;
  const TrainingTask(this.title, this.duration, this.status);
}

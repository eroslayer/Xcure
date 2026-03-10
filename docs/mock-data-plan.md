# Mock 数据方案

## 1. 地图风险数据生成规则
`riskScore = 0.25*aqi + 0.25*pollen + 0.15*tempFactor + 0.15*humidityFactor + 0.2*tagScore`
- 城市维度：预置一线/新一线/北方干燥/南方潮湿城市模板。
- tempFactor：温度超过 30℃ 或低于 5℃ 提升风险。
- humidityFactor：湿度 > 75% 或 < 30% 提升风险。
- tagScore：用户敏感标签（尘螨/花粉/霉菌）匹配度。

## 2. 检测结果规则
满足以下条件直接高风险：
- 鼻塞高（>=7）
- 打鼾高（>=7）
- 张口呼吸明显（>=6）
- 且晨起口干或白天精神差（任一 >=6）

否则采用加权评分映射 low/medium/high。

## 3. 训练计划规则
- 年龄越小训练越短：<6岁 8min，6-12岁 12min，>12岁 18min。
- 夜间症状越重越优先睡前训练（preferredPeriod=bedtime）。
- 连续完成率>=85% 可升级难度。
- 连续中断>=3天降低难度并发送提醒。

## 4. 报告 mock
- riskTrend：7 天风险分下降趋势。
- symptomTrend：鼻塞/打鼾评分下降趋势。
- trainingCompletion：周完成率（0-100）。

# 数据模型（PostgreSQL）

> 类型采用 PostgreSQL 语义；`*` 表示必填。

## 1) user
| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | uuid | * | 主键 |
| phone | varchar(20) | * | 手机号（唯一） |
| password_hash | varchar(255) |  | 预留密码登录 |
| nickname | varchar(50) |  | 昵称 |
| role | varchar(20) | * | `parent/admin` |
| membership_level | varchar(20) |  | 会员等级预留 |
| membership_expire_at | timestamptz |  | 会员到期预留 |
| created_at | timestamptz | * | 创建时间 |
| updated_at | timestamptz | * | 更新时间 |

## 2) child_profile
| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | uuid | * | 主键 |
| user_id | uuid | * | FK -> user.id |
| name | varchar(50) | * | 儿童姓名 |
| gender | varchar(10) | * | 性别 |
| birth_date | date | * | 生日 |
| city_code | varchar(20) | * | 城市编码 |
| allergy_tags | jsonb |  | 历史敏感标签 |
| respiratory_history | text |  | 呼吸道既往史 |
| created_at | timestamptz | * | 创建时间 |
| updated_at | timestamptz | * | 更新时间 |

## 3) initial_assessment
| 字段 | 类型 | 必填 | 说明 |
| id | uuid | * | 主键 |
| child_id | uuid | * | FK -> child_profile.id |
| questionnaire | jsonb | * | 初始问卷原始答案 |
| risk_level | varchar(20) | * | low/medium/high |
| score | int | * | 评分 |
| assessed_at | timestamptz | * | 评估时间 |

## 4) allergen_risk_record
| 字段 | 类型 | 必填 | 说明 |
| id | uuid | * | 主键 |
| child_id | uuid | * | FK |
| city_code | varchar(20) | * | 城市 |
| aqi | int | * | 空气质量 |
| pollen_index | int | * | 花粉指数 |
| temperature | numeric(5,2) | * | 温度 |
| humidity | numeric(5,2) | * | 湿度 |
| sensitive_tag_match_score | int | * | 标签匹配分 |
| risk_score | int | * | 综合风险 |
| map_provider | varchar(50) |  | 真实地图 API 供应商预留 |
| external_payload | jsonb |  | 第三方回包预留 |
| created_at | timestamptz | * | 时间 |

## 5) nasal_health_assessment
| 字段 | 类型 | 必填 | 说明 |
| id | uuid | * | 主键 |
| child_id | uuid | * | FK |
| congestion_level | int | * | 鼻塞等级 0-10 |
| snore_level | int | * | 打鼾等级 0-10 |
| mouth_breathing_level | int | * | 张口呼吸等级 0-10 |
| morning_dryness | int | * | 晨起口干 0-10 |
| daytime_fatigue | int | * | 日间精神差 0-10 |
| audio_sample_url | text |  | 音频检测文件预留 |
| audio_model_version | varchar(30) |  | 音频模型版本预留 |
| risk_level | varchar(20) | * | 睡眠通气风险 |
| score | int | * | 结果分 |
| assessed_at | timestamptz | * | 时间 |

## 6) ai_training_plan
| 字段 | 类型 | 必填 | 说明 |
| id | uuid | * | 主键 |
| child_id | uuid | * | FK |
| source_assessment_id | uuid |  | 来源评估 |
| plan_name | varchar(100) | * | 计划名 |
| duration_days | int | * | 计划天数 |
| difficulty_level | int | * | 难度 1-5 |
| session_minutes | int | * | 每次分钟数 |
| preferred_period | varchar(20) | * | morning/evening/bedtime |
| status | varchar(20) | * | active/paused/done |
| created_at | timestamptz | * | 创建时间 |

## 7) ai_training_task
| 字段 | 类型 | 必填 | 说明 |
| id | uuid | * | 主键 |
| plan_id | uuid | * | FK -> ai_training_plan.id |
| title | varchar(100) | * | 任务标题 |
| instructions | text | * | 训练说明 |
| media_url | text |  | 音视频资源 |
| order_index | int | * | 顺序 |
| target_minutes | int | * | 目标时长 |

## 8) training_record
| 字段 | 类型 | 必填 | 说明 |
| id | uuid | * | 主键 |
| child_id | uuid | * | FK |
| plan_id | uuid | * | FK |
| task_id | uuid | * | FK |
| completion_status | varchar(20) | * | done/skipped/interrupted |
| completion_rate | int | * | 0-100 |
| feedback | jsonb |  | 主观反馈 |
| completed_at | timestamptz | * | 完成时间 |

## 9) symptom_record
| 字段 | 类型 | 必填 | 说明 |
| id | uuid | * | 主键 |
| child_id | uuid | * | FK |
| record_date | date | * | 记录日期 |
| nasal_congestion | int | * | 鼻塞 0-10 |
| snore | int | * | 打鼾 0-10 |
| mouth_breathing | int | * | 张口呼吸 0-10 |
| daytime_energy | int | * | 精力 0-10 |
| medication_used | boolean | * | 是否用药 |
| note | text |  | 备注 |
| created_at | timestamptz | * | 时间 |

## 10) content_article
| 字段 | 类型 | 必填 | 说明 |
| id | uuid | * | 主键 |
| title | varchar(200) | * | 标题 |
| category | varchar(50) | * | 分类 |
| content | text | * | 正文 |
| status | varchar(20) | * | draft/published |
| created_by | uuid | * | FK -> user.id(admin) |
| published_at | timestamptz |  | 发布时间 |

## 11) notification_message
| 字段 | 类型 | 必填 | 说明 |
| id | uuid | * | 主键 |
| user_id | uuid | * | FK |
| child_id | uuid |  | 可选关联儿童 |
| type | varchar(30) | * | training_reminder/risk_alert/system |
| title | varchar(100) | * | 标题 |
| body | text | * | 内容 |
| is_read | boolean | * | 是否已读 |
| created_at | timestamptz | * | 时间 |

## 主外键关系
- `user (1) -> (n) child_profile`
- `child_profile (1) -> (n) initial_assessment / nasal_health_assessment / allergen_risk_record / symptom_record / training_record / notification_message`
- `ai_training_plan (1) -> (n) ai_training_task / training_record`

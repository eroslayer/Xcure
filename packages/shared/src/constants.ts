export const API_PREFIX = '/api/v1';

export const RISK_LEVELS = ['low', 'medium', 'high'] as const;

export const TRAINING_RULES = {
  ageMinutes: {
    toddler: 8,
    child: 12,
    teen: 18,
  },
  completionUpgradeThreshold: 85,
  interruptionDowngradeThreshold: 3,
};


export enum ChainType {
  SOLANA = 'Solana',
  ETHEREUM = 'Ethereum',
  BITCOIN = 'Bitcoin',
  BASE = 'Base',
  BNB = 'BNB Chain',
  PI = 'Pi Network',
  TEOS = 'TEOS Sovereign'
}

export interface ChainStatus {
  name: ChainType;
  status: 'operational' | 'congested' | 'down';
  blockHeight: number;
  latency: string;
}

export interface AuditLog {
  id: string;
  requestId: string;
  principal: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: number;
  policyDecision: 'ALLOW' | 'DENY' | 'REQUIRE_2FA';
  timestamp: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  role: 'Public' | 'Authenticated' | 'Institution';
  createdAt: string;
  lastUsed: string;
}

export interface ApiKeyDetails {
  id: string;
  name: string;
  role: 'Public' | 'Authenticated' | 'Institution';
  scopes: string[];
  ipWhitelist: string[];
  rotatedAt: string;
  expiresAt: string;
  status: 'active' | 'revoked';
}

export interface User {
  name: string;
  email: string;
  role: 'Founder' | 'Admin' | 'Developer';
  isPersistent: boolean;
}

export type Page = 'dashboard' | 'wallet' | 'governance' | 'docs' | 'ai-assistant' | 'audit-logs' | 'settings';

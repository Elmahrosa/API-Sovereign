# 🇪🇬 Elmahrosa API-Sovereign

**Egypt’s Sovereign API Layer — Civic-First, Compliance-Ready**

Elmahrosa API-Sovereign is the official service interface for TEOS infrastructure. It exposes core functions (auth, wallet, governance, i18n, liquidity, chain connectors) through REST/GraphQL endpoints, enabling banks, institutions, and civic applications to integrate seamlessly with Egypt’s sovereign blockchain backbone.

---

## ✨ Features
- **Auth:** Multi-factor login (TEOS wallet, Pi, biometric)
- **Wallet:** Unified balances for TEOS, TGR, Dolphin, BRT
- **Governance:** Petition creation, voting, thresholds
- **I18n:** Auto-translation via Google GenAI API
- **Chains:** Solana, Ethereum, Bitcoin, Base, BNB, Pi, TEOS connectors
- **Liquidity:** Dolphin marketplace feeds
- **Compliance:** BankChain middleware for audit-ready settlement

---

## 📂 Repository Structure
```
API-Sovereign/
├── README.md
├── LICENSE.md
├── ROADMAP.md
├── CONTRIBUTING.md
│
├── src/
│   ├── index.js          # API entrypoint
│   ├── routes/
│   │   ├── auth.js
│   │   ├── wallet.js
│   │   ├── governance.js
│   │   ├── i18n.js
│   │   ├── chains.js
│   │   └── liquidity.js
│   └── middleware/
│       ├── authMiddleware.js
│       └── complianceMiddleware.js
│
├── config/
│   ├── db.js
│   ├── chains.yml
│   └── compliance.yml
│
├── docs/
│   ├── API.md
│   ├── INTEGRATION.md
│   └── SECURITY.md
│
└── tests/
    ├── test-auth.js
    ├── test-wallet.js
    ├── test-governance.js
    └── test-liquidity.js
```

---

## 🚀 Quick Start
```bash
git clone https://github.com/Elmahrosa/API-Sovereign
cd API-Sovereign
npm install
npm run dev
```

---

## 🔑 Example Endpoints

### Auth
```http
POST /auth/login
{
  "user": "ayman",
  "method": "wallet"
}
```

### Wallet
```http
POST /wallet/transfer
{
  "from": "ayman",
  "to": "pioneer1",
  "token": "TEOS",
  "amount": 100
}
```

### Governance
```http
POST /governance/petition
{
  "title": "Reserve 30% bandwidth for schools",
  "creator": "ayman"
}
```

### I18n
```http
POST /i18n/translate
{
  "text": "مرحبا بالعالم",
  "targetLang": "en"
}
```

### Chains
```http
GET /chains/solana/status
GET /chains/ethereum/block/:id
GET /chains/pi/payment/:txid
```

### Liquidity
```http
GET /liquidity/marketplace
```

---

## 🗓️ Roadmap (Consensus Miami, May 5–7, 2026)
- Q1 2026: Implement core routes + chain connectors
- April 2026: Add compliance middleware + docs
- May 2026: Showcase Warp All Chains API demo at Consensus Miami

---

## 📜 License
Elmahrosa API-Sovereign is released under the **MIT License** for maximum adoption.  
TEOS-SAT and orbital governance modules remain under the **TEOS Sovereign License** to protect civic-first compliance.

---

**Built with 🇪🇬 by Elmahrosa International*

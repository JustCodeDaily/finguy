# Expense + Debt Tracker — React Native Android

**Status:** Concept Locked | Ready for 7-Day Learning Sprint → Build  
**Platform:** Android Only  
**Framework:** Expo (React Native)  
**Target:** Personal use, single user  
**Timeline:** Learn Expo (7 days) → Build app (4-6 weeks)

---

## **1. CONCEPT**

### **What It Does**
Track two interconnected flows:
- **Expenses:** Daily logging (₹ and €), categorized, monthly reports
- **Debts:** Manual balance updates, auto-calculate % killed, ROI tracking

### **Why Separate Input, Connected Logic**
You log expenses by category (e.g., "₹500 Food"). Separately, you track debt balances (e.g., "Amex now ₹640K"). The app calculates: "Of ₹70K income this month, ₹45K → expenses, ₹25K → debt payments."

### **Why Android + Expo**
- **Android only:** Simplest first deployment (no iOS complexity)
- **Expo:** Abstracts build setup (no Android Studio), live reload dev experience, one-line APK build
- **Learning:** React Native in a managed environment; port to bare or iOS later if needed

---

## **2. LOCKED DECISIONS**

| Decision | Choice | Why |
|----------|--------|-----|
| **Mobile Framework** | Expo | Fastest path to first Android app, live reload, zero native config |
| **State Management** | Zustand | Zero boilerplate, perfect for personal app scale |
| **UI Library** | React Native Paper | Material Design dark theme built-in, form controls pre-styled |
| **Backend** | Supabase (PostgreSQL) | RLS for auth, same JS SDK as web, no dedicated API |
| **HTTP Client** | axios (or Supabase JS SDK directly) | Minimal setup, request/response consistency |
| **Auth** | Email + magic link → JWT HttpOnly cookie | Portable, no vendor lock, RLS policies check every read/write |
| **Theme** | Dark only | Specified, reduces design decisions, Paper has native support |
| **Offline** | No offline mode | Always online, simpler sync, suitable for personal finance |
| **Currencies** | ₹ and € (separate, no conversion) | Two sources of income, no exchange rate complexity |
| **FAB Pattern** | Single FAB → modal ("Expense" / "Debt") | Cleaner than dual FAB, mobile-native feel |
| **Edit/Delete** | Long-press → context menu ("Edit" / "Delete") | Android-native, explicit, space-efficient |
| **Expense Sort** | Default: Date (newest first) | Most intuitive for daily logging; also sortable by Cost |
| **Debt Sort** | Default: Name (ascending) | Alphabetical stable; also sortable by ROI or Remaining |
| **Income Entry** | Monthly, per-currency (tap profile icon) | "Aug ₹70K | €2K" locked in, updatable anytime |

---

## **3. DATA MODEL**

### **Tables (Supabase PostgreSQL)**

**users**
```sql
id UUID (PK)
email string (unique)
created_at timestamp
```

**user_settings**
```sql
id UUID (PK)
user_id FK → users.id
currency_primary string ("INR" | "EUR")
theme string ("dark") — locked
created_at, updated_at timestamp
```

**monthly_income**
```sql
id UUID (PK)
user_id FK → users.id
month date (YYYY-MM-01)
income_inr numeric (nullable)
income_eur numeric (nullable)
created_at, updated_at timestamp
Unique: (user_id, month)
```

**expenses**
```sql
id UUID (PK)
user_id FK → users.id
name string (optional)
category string ("Food" | "Rent" | "Transport" | "Subscriptions" | "Coffee" | "Gym" | "Cab")
amount numeric
currency string ("INR" | "EUR")
date date
created_at, updated_at timestamp
Index: (user_id, date DESC)
```

**debts**
```sql
id UUID (PK)
user_id FK → users.id
name string (e.g., "Amex", "Citi", "L&T")
currency string ("INR" | "EUR")
current_balance numeric
rate numeric (ROI, e.g., 50.0)
emi_pending integer (e.g., 24)
created_at, updated_at timestamp
sort_order integer (manual reorder)
```

**debt_history**
```sql
id UUID (PK)
user_id FK → users.id
debt_id FK → debts.id
balance_before numeric
balance_after numeric
recorded_at timestamp
created_at timestamp
Index: (user_id, recorded_at DESC)
```

### **RLS Policies**
All tables: `auth.uid() = user_id` (select/insert/update/delete)

---

## **4. SCREEN FLOW**

### **Navigation Structure**
```
RootNavigator
├── (Auth Stack)
│   ├── Login (email input → magic link)
│   └── Verify Email (deep link → JWT stored)
└── (Main Stack)
    └── BottomTabNavigator (5 tabs)
        ├── Home (Dashboard snapshot)
        ├── Expenses (Daily log, edit, delete, sort)
        ├── Debts (Balance list, update, sort)
        ├── Reports (Monthly bars, category pie, date range)
        └── Settings (Profile/logout, theme, category colors)
```

### **Home/Dashboard**
- **Header:** Profile icon (tap → income modal)
- **Income badge:** "₹70K | €2K this month" (lockable, updatable)
- **Summary cards:** Income | Expenses (₹45K, 64%) | Debt Pay (₹25K, 36%)
- **Debt preview:** Top 3 cards (name, EMIs @ ROI, % killed)
- **FAB:** (+) opens modal → "Add Expense" / "Add Debt"

### **Expenses**
- **Sort dropdown:** Date (↓ default) | Cost (↓)
- **Filter bar:** Category multi-select (optional v2)
- **List:** Colored by category, newest first
- **Row:** Icon | Name, Category, Date | Amount
- **Long-press:** Edit / Delete context menu
- **FAB:** Add new expense

### **Debts**
- **Sort dropdown:** Name (↑ default) | ROI (↓) | Remaining (↓)
- **Card per debt:**
  - Left: Name, "X EMIs @ Y% ROI"
  - Right: Large % killed, balance below
- **Tap card:** Update balance modal
- **Long-press:** Edit / Delete
- **FAB:** Add new debt

### **Reports**
- **Toggle tabs:** Monthly | Category
- **Monthly view:** Bar chart (expense total per month, Aug → now)
- **Category view:** Pie chart (category split, selected month)
- **Date range picker:** Select month/quarter/year
- **Placeholder initially:** Add Chart.js or Recharts later

### **Settings**
- **Email display:** Read-only
- **Theme:** Dark (locked)
- **Category colors:** Picker (7 colors × 7 categories)
- **Logout button:** Red, destructive style

---

## **5. CATEGORY COLORS**

Default palette (user can customize in settings):
```
Food:          #FF6B6B (red)
Rent:          #4ECDC4 (teal)
Transport:     #45B7D1 (blue)
Subscriptions: #FFA07A (coral)
Coffee:        #D4A574 (brown)
Gym:           #95E1D3 (mint)
Cab:           #B19CD9 (purple)
```

---

## **6. TECH STACK**

```
Frontend:
├── Expo CLI (managed React Native)
├── React Navigation (bottom tabs + auth stack)
├── React Native Paper (Material Design components)
├── Zustand (state management)
├── axios or @supabase/supabase-js (HTTP)
└── date-fns (date formatting, month boundaries)

Backend:
├── Supabase (PostgreSQL, RLS, auth)
└── Supabase JS SDK (same API as web)

Build:
└── EAS (Expo Application Services) for Android APK
```

---

## **7. EXPO LEARNING PATH (7 Days)**

### **Day 1: Setup & Hello World**
```
Install Expo CLI → npx create-expo-app my-app → npm start
Scan QR → see "Hello Expo" on phone
Proof: Live reload works
```

### **Day 2: Flexbox Layout**
```javascript
// Build a 3-box row, get comfortable with flex: 1, justifyContent, alignItems
// Same flexbox as web CSS; Expo uses it identically
```

### **Day 3: FlatList (not ScrollView)**
```javascript
// Render expense/debt list with FlatList
// Why: Mobile-optimized, recycles views, performant for long lists
```

### **Day 4: Pressable & State**
```javascript
// Build a counter: onPress (not onClick), useState, pressed opacity feedback
// Proof: Interactivity works, tactile feedback on Android
```

### **Day 5: TextInput & Forms**
```javascript
// Log an expense form: TextInput, keyboardType, onChangeText
// Proof: Mobile-specific inputs, number pads, state binding
```

### **Day 6: React Navigation**
```javascript
// BottomTabNavigator with 4 empty screens
// Proof: Bottom tab nav works, screen switching works
```

### **Day 7: Supabase Integration**
```javascript
// Fetch 3 expenses from Supabase, render in FlatList
// Proof: Backend connection works, data flows end-to-end
```

**After Day 7:** You know 90% of what you need. Rest is styling + wiring screens together.

---

## **8. GOTCHAS (Save 2+ Hours)**

1. **No CSS.** StyleSheet.create() or inline `style={}` only. Tailwind doesn't exist.
2. **`Text` needs a parent `View`.** `<Text>Hello</Text>` alone crashes.
3. **Images need explicit dimensions:** `style={{ width: 200, height: 200 }}`
4. **No `display: none`.** Use conditional: `{isVisible && <View />}`
5. **Scrolling is opt-in.** `<ScrollView>` or `<FlatList>`, not automatic.
6. **StatusBar color:** `import { StatusBar } from 'expo-status-bar'; <StatusBar barStyle="light-content" />`
7. **Keyboard overlaps inputs (Day 8 problem).** Use `<KeyboardAvoidingView>` later.
8. **Live reload vs. Full reload:** Hot module reload (edit save → instant) vs. full restart (breaking changes). Usually instant.
9. **No `fetch` for Supabase auth.** Use `@supabase/supabase-js` SDK; it handles JWT refresh.
10. **APK size.** Expo apps ~30-50MB. Not bloated, but heavier than web.

---

## **9. MONOREPO STRUCTURE (Optional, Pre-Build)**

```
debt-expense-tracker/
├── packages/
│   ├── mobile/                    # React Native Expo app
│   │   ├── app.json               # Expo config (name, icons, etc.)
│   │   ├── src/
│   │   │   ├── screens/
│   │   │   │   ├── Home.tsx
│   │   │   │   ├── Expenses.tsx
│   │   │   │   ├── Debts.tsx
│   │   │   │   ├── Reports.tsx
│   │   │   │   ├── Settings.tsx
│   │   │   │   └── Auth/
│   │   │   │       ├── Login.tsx
│   │   │   │       └── Verify.tsx
│   │   │   ├── components/
│   │   │   │   ├── ExpenseRow.tsx
│   │   │   │   ├── DebtCard.tsx
│   │   │   │   ├── CategoryPill.tsx
│   │   │   │   ├── AddModal.tsx
│   │   │   │   └── ...
│   │   │   ├── navigation/
│   │   │   │   ├── RootNavigator.tsx
│   │   │   │   └── BottomTabs.tsx
│   │   │   ├── store/            # Zustand stores
│   │   │   │   ├── authStore.ts
│   │   │   │   ├── expenseStore.ts
│   │   │   │   └── debtStore.ts
│   │   │   ├── services/
│   │   │   │   ├── supabase.ts
│   │   │   │   ├── auth.ts
│   │   │   │   ├── expenses.ts
│   │   │   │   └── debts.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useFetchExpenses.ts
│   │   │   │   ├── useFetchDebts.ts
│   │   │   │   └── useFetchIncome.ts
│   │   │   ├── types/
│   │   │   │   └── index.ts       # Shared TS types
│   │   │   ├── utils/
│   │   │   │   ├── format.ts      # Currency, date formatting
│   │   │   │   ├── calculate.ts   # % killed, expense totals
│   │   │   │   └── validate.ts
│   │   │   ├── theme/
│   │   │   │   └── colors.ts      # Dark theme, category colors
│   │   │   └── App.tsx
│   │   ├── package.json
│   │   └── .env.local (Supabase URL, keys)
│   └── shared/                    # Optional: shared types
│       ├── types/
│       │   └── index.ts
│       └── package.json
├── .gitignore
├── package.json                   # Root workspace
├── yarn.lock
└── README.md
```

**Note:** Start simple (just `mobile/`), add `shared/` only if you plan web version later.

---

## **10. QUICK START CHECKLIST**

### **Phase 0: Environment (1 hour)**
- [ ] Install Node.js 16+
- [ ] `npm install -g expo-cli`
- [ ] Sign up for Expo.dev account (free)
- [ ] Install Expo Go app on Android phone

### **Phase 1: Learn Expo (7 days)**
- [ ] Day 1: Hello World
- [ ] Day 2: Flexbox layout
- [ ] Day 3: FlatList
- [ ] Day 4: Pressable + useState
- [ ] Day 5: TextInput form
- [ ] Day 6: React Navigation (4 tabs)
- [ ] Day 7: Supabase fetch

### **Phase 2: Setup Backend (1 day)**
- [ ] Create Supabase project
- [ ] Create tables (users, expenses, debts, monthly_income, debt_history)
- [ ] Set RLS policies
- [ ] Configure Expo auth via Supabase

### **Phase 3: Build App (4-6 weeks)**
- [ ] Auth flow (login → verify → JWT)
- [ ] Home dashboard
- [ ] Expenses (list, add, edit, delete, sort)
- [ ] Debts (list, add, update balance, sort)
- [ ] Reports (charts placeholder)
- [ ] Settings (colors, logout)
- [ ] Polish, error handling, dark theme refinement

### **Phase 4: Deploy (1 day)**
- [ ] Configure app.json (app name, icons, splash)
- [ ] `eas build --platform android`
- [ ] Download APK, install on phone
- [ ] Test end-to-end

---

## **11. FILE STRUCTURE — IMMEDIATE SETUP**

```bash
npx create-expo-app expense-debt-tracker
cd expense-debt-tracker

# Folders to create
mkdir -p src/{screens,components,navigation,store,services,hooks,types,utils,theme}

# Day 1 test file
touch src/App.tsx

# Install deps (do after Day 1 works)
npm install @react-navigation/native @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install @supabase/supabase-js zustand axios date-fns
npm install react-native-paper
```

---

## **12. ENV SETUP**

Create `.env.local` in project root (not committed):
```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Access in code:
```javascript
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
```

---

## **13. PRIORITY SEQUENCE**

**Must Have (MVP):**
- Auth (email magic link)
- Expense list, add, edit, delete, sort
- Debt list, add, update balance, sort
- Dashboard snapshot
- Settings (logout, colors)

**Nice to Have (v1.1):**
- Reports (charts)
- Monthly income modal
- Category filter (expenses)
- Debt history / trajectory

**Defer (v2):**
- Offline sync
- Recurring expenses
- Expense templates
- iOS port

---

## **14. NEXT STEPS**

1. **This week:** Work through 7-day Expo path (30-60 min/day)
2. **Day 8:** Supabase backend setup (tables, RLS, auth config)
3. **Week 2:** Build auth flow end-to-end
4. **Week 3-4:** Core features (expenses, debts, dashboard)
5. **Week 5-6:** Polish, test, deploy

---

## **15. RESOURCES**

- **Expo docs:** https://docs.expo.dev
- **React Native Paper:** https://callstack.github.io/react-native-paper/
- **React Navigation:** https://reactnavigation.org/
- **Supabase JS SDK:** https://supabase.com/docs/reference/javascript
- **Date-fns:** https://date-fns.org/docs/Getting Started

---

## **16. APPROACH SUMMARY**

**You:** Self-taught frontend dev, humorous ADHD introvert, values shipping over perfection.

**This app:** Personal finance tracker (Expense + Debt), Android-only, React Native via Expo, Supabase backend.

**Why this stack:**
- **Expo:** Fastest path from "zero React Native" to "working Android app" (no native config hell)
- **Paper:** Material Design components, dark theme pre-baked
- **Zustand:** State without ceremony; you already know useReducer + Context from React
- **Supabase:** Same JS SDK as your debt-tracker v1; RLS is rock-solid for personal data

**Learning curve:** Steep Day 1-2, flat Day 3-7. By end of week, you'll know 90% of the framework. App building is then 80% wiring + styling, 20% new concepts.

**Your strength:** You already know React, data modeling, auth, and async. React Native is just "React with native components." You got this.

---

**Ready? Start Day 1 when you're set. Questions anytime.**
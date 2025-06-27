# CloutySpace Client - 重構後的架構文檔

## 📁 項目結構

```
src/
├── components/           # 組件目錄
│   ├── sections/        # 頁面區塊組件
│   │   ├── CoreValuesSection.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── ProductShowcase.tsx
│   │   ├── BrandStory.tsx
│   │   ├── CoreValues.tsx
│   │   └── index.ts
│   │
│   ├── features/        # 功能組件
│   │   ├── ImageCarousel.tsx
│   │   ├── LoginModal.tsx
│   │   ├── TeaProductGrid.tsx
│   │   └── index.ts
│   │
│   ├── layouts/         # 佈局組件
│   │   ├── Footer.tsx
│   │   ├── MainNavBar.tsx
│   │   ├── TopNav.tsx
│   │   └── index.ts
│   │
│   ├── shared/          # 共用組件
│   │   ├── ImageCarousel.tsx
│   │   ├── SearchInput.tsx
│   │   └── index.ts
│   │
│   ├── ui/              # UI 基礎組件
│   │   ├── FloatingInput.tsx
│   │   ├── GoogleLoginButton.tsx
│   │   ├── MainNavBarButton.tsx
│   │   └── SearchInput.tsx
│   │
│   └── index.ts         # 組件統一導出
│
├── types/               # 類型定義
│   └── common.ts        # 通用類型
│
├── constants/           # 常量定義
│   ├── app.ts          # 應用程式常量
│   └── products.ts     # 產品相關常量
│
├── hooks/               # 自定義 Hooks
│   ├── useLocalStorage.ts
│   └── index.ts
│
├── utils/               # 實用函數
│   └── index.ts
│
├── assets/              # 靜態資源
│   ├── images/
│   └── svg/
│
└── lang.ts              # 國際化
```

## 🔄 重構改進

### 1. 組件分層架構
- **sections/**: 頁面級別的區塊組件
- **features/**: 具有特定功能的組件
- **layouts/**: 佈局相關組件
- **shared/**: 可復用的通用組件
- **ui/**: 基礎 UI 組件

### 2. 類型系統優化
- 統一的 `BaseProps` 介面
- 完整的產品、用戶、API 類型定義
- 響應式設計類型支援

### 3. 組件功能增強
- **ImageCarousel**: 支援自動播放、鍵盤導航、可配置參數
- **SearchInput**: 提供展開式和標準式兩種樣式
- **LoginModal**: 完整的表單驗證和錯誤處理
- **ProductShowcase**: 支援自定義產品數據和標題
- **TeaProductGrid**: 可配置網格列數和點擊事件

### 4. 代碼品質提升
- 使用 TypeScript 嚴格類型檢查
- 實施 React Hooks 最佳實踐
- 組件解耦和可復用性
- 一致的命名規範

### 5. 開發體驗改善
- 清晰的目錄結構
- 統一的導出管理
- 完整的類型提示
- 實用函數庫

## 🚀 使用方式

### 導入組件
```typescript
// 從統一入口導入
import { 
  CoreValuesSection, 
  ProductShowcase, 
  LoginModal,
  SearchInput 
} from '@/components'

// 或從特定目錄導入
import { CoreValuesSection } from '@/components/sections'
import { LoginModal } from '@/components/features'
```

### 使用自定義 Hooks
```typescript
import { useLocalStorage } from '@/hooks'

const [language, setLanguage] = useLocalStorage('app_language', 'zh')
```

### 使用實用函數
```typescript
import { formatPrice, debounce, isValidEmail } from '@/utils'

const price = formatPrice(29.99) // "$29.99"
const debouncedSearch = debounce(handleSearch, 300)
```

## 📋 待辦事項

1. [ ] 完成所有組件的類型定義
2. [ ] 添加組件測試
3. [ ] 實施主題系統
4. [ ] 添加錯誤邊界組件
5. [ ] 優化性能和懶加載
6. [ ] 添加動畫系統
7. [ ] 實施狀態管理 (如需要)

## 🎯 重構效益

1. **可維護性**: 清晰的模組化結構
2. **可擴展性**: 易於添加新功能和組件
3. **可復用性**: 組件高度可復用
4. **類型安全**: 完整的 TypeScript 支援
5. **開發效率**: 統一的開發模式和工具函數

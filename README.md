<div align="center">

<img width="200" src="./preview.png" alt="PurCarte Theme Preview">

## ✨ Dojiao ✨

一款为 [Komari](https://github.com/komari-monitor/komari) 设计的磨砂玻璃风格个性化增强版主题

</div>

> [!NOTE]
> 本主题基于 [komari-theme-purcarte-plus](https://github.com/YoungYannick/komari-theme-purcarte-plus) 进行二次开发,并做删减。
>
> **此版本肯定不会满足所有人的需求,我只针对我发现的问题，我用着不好的，或者喜欢的方向开发，如果介意，请使用原版**


## 🚀 快速开始

### 安装与启用

1.  前往 [Releases](https://github.com/aooohan/komari-theme-dojiao/releases) 页面下载最新的 `komari-theme-dojiao.zip` 文件。
2.  进入 Komari 后台，上传 `zip` 压缩包并启用本主题。


## 📁 项目结构

<details>
<summary><b>点击展开完整目录树</b></summary>

```
komari-theme-dojiao/
├── public/                                  # 静态资源目录
│   └── assets/
│       ├── default-background-image.jpg     # 默认桌面端背景图片
│       ├── LanternRivers_1080p15fps2Mbps3s.mp4  # 默认视频背景
│       ├── logo.png                         # 站点 Logo
│       ├── pwa-icon.png                     # PWA 应用图标
│       ├── flags/                           # 国家/地区旗帜 SVG 图标集（250+）
│       └── logo/                            # 操作系统与服务 Logo 图标集（30+）
│
├── src/                                     # 源代码目录
│   ├── main.tsx                             # 应用入口，挂载 React 根组件，注册 Router/Theme/Config/Data 等 Provider
│   ├── vite-env.d.ts                        # Vite 环境类型声明
│   ├── index.css                            # 全局 CSS 样式
│   ├── palette-rgb.css                      # Radix 主题色 RGB 调色板变量定义
│   │
│   ├── pages/                               # 页面组件
│   │   ├── Home.tsx                         # 首页仪表盘，展示统计栏、节点网格/表格/紧凑视图
│   │   ├── Private.tsx                      # 私有站点未认证提示页
│   │   ├── NotFound.tsx                     # 404 页面
│   │   ├── PingOverview.tsx                 # 全局延迟监测总览页面
│   │   └── instance/                        # Instance 详情页
│   │       ├── index.tsx                    # Instance 页面入口与路由包装
│   │       ├── Instance.tsx                 # Instance 详情主视图（基本信息、系统指标、网络状态）
│   │       ├── LoadCharts.tsx               # CPU/负载 历史图表
│   │       └── PingChart.tsx                # 延迟/丢包 历史图表
│   │
│   ├── components/                          # 组件目录
│   │   ├── DynamicContent.tsx               # 动态背景内容处理（图片/视频背景切换与主题适配）
│   │   ├── loading.tsx                      # 加载动画组件
│   │   ├── Loading.css                      # 加载动画样式
│   │   │
│   │   ├── ui/                              # 基础 UI 组件库（基于 Radix UI）
│   │   │   ├── avatar.tsx                   # 头像组件
│   │   │   ├── button.tsx                   # 按钮组件
│   │   │   ├── card.tsx                     # 卡片容器组件
│   │   │   ├── chart.tsx                    # 图表包装组件（集成 Recharts）
│   │   │   ├── dropdown-menu.tsx            # 下拉菜单组件
│   │   │   ├── dropdown-menu.css            # 下拉菜单样式
│   │   │   ├── input.tsx                    # 输入框组件
│   │   │   ├── progress-bar.tsx             # 线性进度条组件
│   │   │   ├── progress-circle.tsx          # 环形进度条组件
│   │   │   ├── scroll-area.tsx              # 可滚动区域组件
│   │   │   ├── select.tsx                   # 下拉选择组件
│   │   │   ├── select.css                   # 下拉选择动画样式
│   │   │   ├── sonner.tsx                   # Toast 通知组件（集成 Sonner）
│   │   │   ├── switch.tsx                   # 开关切换组件
│   │   │   ├── tag.tsx                      # 标签/徽章组件
│   │   │   ├── textarea.tsx                 # 多行文本输入组件
│   │   │   ├── tips.tsx                     # 提示气泡组件
│   │   │   └── tooltip.tsx                  # 工具提示组件（含 ScrollableTooltip 可滚动提示框）
│   │   │
│   │   ├── sections/                        # 页面区块组件
│   │   │   ├── Header.tsx                   # 标题栏（Logo、标题、搜索、视图切换、资产统计、3D地球、延迟总览、主题切换、语言切换、管理入口）
│   │   │   ├── LanguageSwitcher.tsx          # 语言切换组件（i18next 多语言切换）
│   │   │   ├── Footer.tsx                   # 底栏（自定义内容、服务器运行时间、Markdown 渲染）
│   │   │   ├── Flag.tsx                     # 国家旗帜展示组件
│   │   │   ├── NodeGrid.tsx                 # 节点网格视图（卡片式布局）
│   │   │   ├── NodeCompact.tsx              # 节点紧凑视图（精简列表）
│   │   │   ├── NodeDisplay.tsx              # 节点详细信息展示（弹窗/侧栏详情）
│   │   │   ├── NodeTable.tsx                # 节点表格视图（可展开行详情）
│   │   │   └── StatsBar/                    # 统计栏组件集
│   │   │       ├── index.tsx                # 统计栏主组件（在线/离线/流量/网速等聚合统计）
│   │   │       ├── types.ts                 # 统计栏类型定义
│   │   │       ├── StatChips.tsx            # 统计数据卡片（当前时间、在线数、地区、流量、网速）
│   │   │       ├── GroupSelector.tsx         # 分组筛选选择器
│   │   │       ├── SortToggleMenu.tsx        # 排序选项菜单
│   │   │       └── StatsToggleMenu.tsx       # 统计卡片显示/隐藏控制菜单
│   │   │
│   │   ├── settings/                        # 设置面板组件
│   │   │   ├── SettingsPanel.tsx             # 主题配置设置面板（管理员使用）
│   │   │   ├── SettingItem.tsx              # 单项设置控件（switch/select/string/number/richtext）
│   │   │   ├── i18nHelper.ts               # 配置项 i18n 多语言对象解析工具
│   │   │   ├── EditButton.tsx               # 配置编辑按钮（标题栏触发入口）
│   │   │   └── CustomTextsEditor.tsx        # 自定义 UI 文本可视化编辑器
│   │   │
│   │   └── enhanced/                        # 增强功能组件集（KomariBeautify）
│   │       ├── EnhancedFeatures.tsx         # 增强功能总入口（统一管理各增强组件的挂载）
│   │       ├── WelcomeBubble.tsx             # 欢迎气泡（展示访客 IP、地理位置、浏览器信息）
│   │       ├── FinanceWidget.tsx             # 资产统计面板（服务器总价值、月均支出、剩余价值，入口在标题栏）
│   │       ├── ServerTradeModal.tsx          # 服务器交易计算弹窗
│   │       ├── AdvancedSearchModal.tsx       # 高级搜索模态框（多条件筛选、URL同步）
│   │       ├── AdvancedSearchModal.css       # 高级搜索模态框样式
│   │       ├── EarthGlobe.tsx               # 3D 地球组件入口（懒加载，入口在标题栏）
│   │       ├── GlobeRenderer.tsx            # Globe.gl 3D 地球渲染器
│   │       ├── ScrollHelpers.tsx            # 滚动到顶部/底部辅助按钮
│   │       ├── Protection.tsx               # 访客反调试保护（禁止右键、开发者工具等）
│   │       ├── emojiMap.ts                  # 国家代码 → Emoji/坐标 映射表
│   │       ├── useUserGeo.ts                # 用户地理位置检测 Hook（多 API 回退策略）
│   │       ├── useExchangeRates.ts          # 汇率获取与货币转换 Hook
│   │       ├── financeUtils.ts              # 资产计算工具函数（价格转换、估值计算）
│   │       └── enhanced.css                 # 增强功能专用样式
│   │
│   ├── config/                              # 配置管理
│   │   ├── default.ts                       # 默认配置值与 ConfigOptions 类型定义
│   │   ├── ConfigContext.ts                 # 配置 React Context 定义
│   │   ├── ConfigProvider.tsx               # 配置 Provider（从后端 API 加载配置并合并默认值）
│   │   ├── hooks.ts                         # 配置相关 Hooks（useAppConfig、useLocale — 桥接 i18next）
│   │   ├── locales.ts                       # 国际化文案（中文默认值 & TypeScript 类型定义）
│   │   └── index.ts                         # 配置模块统一导出
│   │
│   ├── i18n/                                # i18next 国际化配置
│   │   ├── config.ts                        # i18next 初始化（LanguageDetector + 资源注册）
│   │   └── locales/                         # 多语言翻译文件
│   │       ├── zh_CN.json                   # 简体中文
│   │       ├── zh_TW.json                   # 繁体中文
│   │       ├── en.json                      # English
│   │       ├── ja_JP.json                   # 日本語
│   │       └── id_ID.json                   # Bahasa Indonesia
│   │
│   ├── contexts/                            # React Context 提供者
│   │   ├── NodeDataContext.tsx              # 节点数据 Context（REST/RPC API 数据获取与缓存）
│   │   ├── LiveDataContext.tsx              # 实时数据 Context（WebSocket 实时推送）
│   │   └── ThemeContext.tsx                 # 主题 Context（亮色/暗色/跟随系统）
│   │
│   ├── hooks/                               # 自定义 Hooks
│   │   ├── useLoadCharts.ts                 # CPU/负载 历史图表数据获取 Hook
│   │   ├── usePingChart.ts                  # 延迟/丢包 历史图表数据获取 Hook
│   │   ├── useNodeCommons.ts                # 节点通用工具 Hook（状态判断、运行时间、颜色映射）
│   │   ├── useAdvancedSearch.ts             # 高级搜索状态管理 Hook（URL同步、校验、搜索执行）
│   │   ├── useAdvancedSearchFilter.ts       # 高级搜索过滤逻辑（纯函数，多条件匹配）
│   │   ├── useTooltipScrollLock.ts          # 图表 Tooltip 滚动锁定 Hook（wheel 事件 + 位置冻结）
│   │   ├── useTheme.ts                      # 主题管理 Hook（切换亮色/暗色/自动模式）
│   │   └── useMobile.ts                     # 移动端响应式检测 Hook
│   │
│   ├── services/                            # 服务层
│   │   └── api.ts                           # API 服务类（Komari 后端 REST 与 JSON-RPC2 通信）
│   │
│   ├── types/                               # TypeScript 类型定义
│   │   ├── node.d.ts                        # 节点数据结构类型（NodeData、NodeStats、ApiResponse 等）
│   │   ├── rpc.d.ts                         # JSON-RPC2 响应类型
│   │   ├── LiveData.ts                      # WebSocket 实时数据流类型
│   │   └── advancedSearch.ts                # 高级搜索类型定义（搜索状态、过滤器、校验）
│   │
│   └── utils/                               # 工具函数
│       ├── index.ts                         # 工具模块统一导出（cn、formatBytes 等）
│       ├── formatHelper.ts                  # 数据格式化（字节、运行时间、流量限制）
│       ├── chartHelper.ts                   # 图表工具（OKLCH 颜色生成、标签格式化）
│       ├── converters.ts                    # 类型转换工具（NodeStats ↔ RpcNodeStatus）
│       ├── regionHelper.ts                  # 地区 Emoji → 名称映射
│       ├── localeUtils.ts                   # 国际化工具（深度对象合并、扁平化还原）
│       ├── osImageHelper.ts                 # 操作系统 Logo 查找工具
│       ├── downsample.ts                    # LTTB 降采样算法与自动降采样点数计算
│       └── RecordHelper.tsx                 # 图表数据处理（削峰、插值、空值填充）
│
├── index.html                               # HTML 入口文件（含 PWA 元数据）
├── komari-theme.json                        # Komari 主题配置声明文件（定义后台可配置项）
├── preview.png                              # 主题预览截图
├── package.json                             # 项目依赖与脚本定义
├── package-lock.json                        # npm 依赖锁定文件
├── yarn.lock                                # Yarn 依赖锁定文件
├── vite.config.ts                           # Vite 构建配置（React + Tailwind 插件）
├── tailwind.config.ts                       # Tailwind CSS 配置
├── tsconfig.json                            # TypeScript 根配置
├── tsconfig.app.json                        # TypeScript 应用编译配置
├── tsconfig.node.json                       # TypeScript Node 编译配置
├── eslint.config.js                         # ESLint 代码检查配置
├── components.json                          # shadcn/ui 组件配置
├── .gitignore                               # Git 忽略规则
├── LICENSE                                  # MIT 开源许可证
└── README.md                                # 项目说明文档
```

</details>

## 🛠️ 本地开发

1.  **克隆仓库**

    ```bash
    git clone https://github.com/aooohan/komari-theme-dojiao.git
    cd komari-theme-dojiao
    ```

2.  **安装依赖**

    ```bash
    yarn install
    ```

3.  **启动开发服务器**

    ```bash
    yarn dev
    ```

4.  在浏览器中打开 `http://localhost:5173` (或 Vite 提示的其他端口) 即可进行预览和调试。

## 🔗 相关项目

| 项目 | 说明 |
|------|------|
| [KomariBeautify](https://github.com/YoungYannick/KomariBeautify) | 本主题增强功能的前身，通过 Komari 后台自定义代码（后台 自定义头部 & 自定义 Body）实现，无需替换主题即可使用 |
| [Komari Virtualizer](https://github.com/YoungYannick/Komari_Virtualizer) | 基于 Flask 的 Komari 虚拟探针模拟器，在物理 VPS 资源有限时模拟多个探针客户端，轻松实现"点亮全球" |

## 📄 许可证

本项目采用 [MIT License](LICENSE) 授权。
# Infopic Skill - 信息图生成技能

Claude Code 的信息图生成技能,可以从文本或关键词生成精美的 HTML 信息图,并自动转换为图片。

## 功能特性

- 📝 支持关键词自动搜索扩展内容
- 🎨 基于模板生成美观的 HTML 信息图
- 🖼️ 自动将 HTML 转换为 PNG 图片
- 🎯 支持多种信息图类型(数据、流程、对比、层级、列表等)
- 🔧 使用 pnpm 管理依赖

## 文件结构

```
infopic-skill/
├── README.md                   # 本文件
├── SKILL.md                    # Claude 技能文档
├── 生成信息图提示词.md           # 信息图生成提示词模板
├── scripts/
│   ├── package.json           # Node.js 依赖配置
│   └── screenshot.js          # HTML 转图片脚本
└── 生成结果信息图/              # 输出文件夹
```

## 安装

### 1. 安装依赖

```bash
cd scripts
pnpm install
```

### 2. 安装 Playwright 浏览器

```bash
cd scripts
pnpm exec playwright install chromium
```

## 使用方法

### 作为 Claude 技能使用

当 Claude 需要创建信息图时,会自动调用此技能:

```
用户: 创建一个关于健康饮食的信息图
Claude: [自动执行以下流程]
  1. 搜索健康饮食相关内容
  2. 读取 生成信息图提示词.md
  3. 生成 HTML 信息图
  4. 转换为 PNG 图片
  5. 展示结果
```

### 手动使用截图脚本

如果你已经有 HTML 文件,可以直接使用截图脚本:

```bash
# 在 scripts 目录下
node screenshot.js ../生成结果信息图/example.html

# 或指定输出文件名
node screenshot.js ../生成结果信息图/example.html output.png
```

## 工作流程

1. **接收输入**
   - 如果是关键词 → 使用 WebSearch 搜索相关内容
   - 如果是详细内容 → 直接使用

2. **读取提示词模板**
   - 实时读取 `生成信息图提示词.md`
   - 获取设计规范和生成指令

3. **生成 HTML 信息图**
   - 根据模板和内容创建 HTML
   - 应用美观的 CSS 样式
   - 保存到 `生成结果信息图/` 文件夹

4. **转换为图片**
   - 使用 Playwright 打开 HTML
   - 自动调整尺寸
   - 截图保存为 PNG

## 设计原则

### 色彩方案
- 科技类: 蓝色系
- 环保类: 绿色系
- 商务类: 深蓝+橙色
- 教育类: 紫色+黄色
- 健康类: 青色+绿色

### 排版规范
- 标题: 32-48px, bold
- 副标题: 24-32px, semi-bold
- 正文: 16-18px
- 标注: 12-14px

### 信息图类型
- **数据展示型**: 突出数字和统计
- **流程说明型**: 步骤和时间线
- **对比分析型**: 左右分栏对比
- **层级结构型**: 树状或金字塔
- **列表汇总型**: 要点和清单

## 自定义

### 修改提示词模板

编辑 `生成信息图提示词.md` 文件来自定义:
- 配色方案
- 布局结构
- 视觉元素
- 设计规范

### 调整截图参数

编辑 `scripts/screenshot.js` 来修改:
- 图片格式(png/jpeg)
- 视口大小
- 截图质量

## 依赖

- **Node.js**: >= 16.0.0
- **pnpm**: 包管理器
- **playwright**: ^1.48.0 (HTML 渲染和截图)

## 示例

### 创建数据信息图

```
用户: 创建一个显示 2024 年销售数据的信息图
Claude: [生成包含数据可视化的信息图]
```

### 创建流程信息图

```
用户: 做一个用户注册流程的信息图
Claude: [生成步骤清晰的流程图]
```

### 创建对比信息图

```
用户: 对比 Python 和 JavaScript 的特点
Claude: [生成左右对比的信息图]
```

## 故障排除

### 依赖安装失败

```bash
# 清除缓存重新安装
cd scripts
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Playwright 浏览器安装失败

```bash
# 手动安装 Chromium
cd scripts
pnpm exec playwright install chromium --with-deps
```

### 截图失败

检查:
1. HTML 文件是否存在
2. 文件路径是否正确
3. Chromium 是否已安装
4. 文件权限是否正确

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request!

## 相关资源

- [Claude Code 文档](https://docs.claude.com/claude-code)
- [Playwright 文档](https://playwright.dev/)
- [pnpm 文档](https://pnpm.io/)

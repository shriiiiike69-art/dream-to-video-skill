# 武侯祠全景导览原型

这是一个仿照 720yun 导览站结构搭建的静态前端原型，包含：

- 全景主视图
- 底部缩略图切换
- 小地图点位导航
- 右侧工具按钮
- 简介弹窗
- 场景热点跳转

## 文件结构

```text
projects/wuhouci-panorama-prototype/
├─ index.html
├─ style.css
├─ script.js
└─ assets/
   ├─ panos/      # 放全景图
   ├─ thumbs/     # 放缩略图
   └─ map/
      └─ site-map.png  # 放平面导览图
```

## 你要改哪里

### 1. 放全景图
把每个场景的全景图放进：

```text
assets/panos/
```

默认文件名示例：

- wuhouci-gate.jpg
- mingbei.jpg
- liubeidian.jpg
- huiling.jpg
- zhugeliangdian.jpg
- wenchenlang.jpg

### 2. 放缩略图
把底部缩略图放进：

```text
assets/thumbs/
```

文件名建议和全景图一致，方便管理。

### 3. 放小地图
把平面图放进：

```text
assets/map/site-map.png
```

### 4. 改场景配置
打开 `script.js` 顶部的 `SCENES` 数组，修改：

- `title` 场景标题
- `subtitle` 场景副标题
- `panorama` 全景图路径
- `thumb` 缩略图路径
- `intro` 文字说明
- `x` / `y` 小地图坐标
- `hotspots` 热点跳转

## 图片要求

推荐全景图比例：

- 等距柱状全景图（equirectangular）
- 2:1 比例，例如 6000 × 3000

如果你只有普通单张广角图，这个原型也能先跑起来，但浏览效果不会是真正 360。

## 本地预览

建议用 VS Code 的 Live Server 或任意静态服务器打开，不要直接双击 html。

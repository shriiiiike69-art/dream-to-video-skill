const SCENES = [
  {
    id: 'wuhouci-gate',
    title: '武侯祠',
    subtitle: '主入口场景',
    panorama: './assets/panos/wuhouci-gate.jpg',
    thumb: './assets/thumbs/wuhouci-gate.jpg',
    intro: '这里填写武侯祠场景说明。',
    pitch: 0,
    yaw: 0,
    hfov: 110,
    x: 66,
    y: 28,
    hotspots: [
      { pitch: -3, yaw: 22, text: '前往明碑', target: 'mingbei' }
    ]
  },
  {
    id: 'mingbei',
    title: '明碑',
    subtitle: '碑刻展示场景',
    panorama: './assets/panos/mingbei.jpg',
    thumb: './assets/thumbs/mingbei.jpg',
    intro: '这里填写明碑介绍。',
    pitch: 0,
    yaw: 15,
    hfov: 110,
    x: 53,
    y: 34,
    hotspots: [
      { pitch: -2, yaw: -18, text: '返回武侯祠', target: 'wuhouci-gate' },
      { pitch: -4, yaw: 18, text: '前往刘备殿', target: 'liubeidian' }
    ]
  },
  {
    id: 'liubeidian',
    title: '刘备殿',
    subtitle: '殿堂内部场景',
    panorama: './assets/panos/liubeidian.jpg',
    thumb: './assets/thumbs/liubeidian.jpg',
    intro: '这里填写刘备殿介绍。',
    pitch: -2,
    yaw: 20,
    hfov: 105,
    x: 47,
    y: 48,
    hotspots: [
      { pitch: -3, yaw: -30, text: '返回明碑', target: 'mingbei' },
      { pitch: -4, yaw: 24, text: '前往惠陵', target: 'huiling' }
    ]
  },
  {
    id: 'huiling',
    title: '惠陵',
    subtitle: '陵区场景',
    panorama: './assets/panos/huiling.jpg',
    thumb: './assets/thumbs/huiling.jpg',
    intro: '这里填写惠陵介绍。',
    pitch: -1,
    yaw: -10,
    hfov: 105,
    x: 38,
    y: 58,
    hotspots: [
      { pitch: -2, yaw: 10, text: '前往诸葛亮殿', target: 'zhugeliangdian' }
    ]
  },
  {
    id: 'zhugeliangdian',
    title: '诸葛亮殿',
    subtitle: '静远堂场景',
    panorama: './assets/panos/zhugeliangdian.jpg',
    thumb: './assets/thumbs/zhugeliangdian.jpg',
    intro: '这里填写诸葛亮殿介绍。',
    pitch: 0,
    yaw: 0,
    hfov: 108,
    x: 59,
    y: 54,
    hotspots: [
      { pitch: -2, yaw: 18, text: '前往文臣廊', target: 'wenchenlang' }
    ]
  },
  {
    id: 'wenchenlang',
    title: '文臣廊',
    subtitle: '回廊场景',
    panorama: './assets/panos/wenchenlang.jpg',
    thumb: './assets/thumbs/wenchenlang.jpg',
    intro: '这里填写文臣廊介绍。',
    pitch: 0,
    yaw: 0,
    hfov: 108,
    x: 72,
    y: 62,
    hotspots: [
      { pitch: -1, yaw: -24, text: '返回诸葛亮殿', target: 'zhugeliangdian' }
    ]
  }
];

const state = {
  currentSceneId: SCENES[0].id,
  autoRotate: false,
};

const els = {
  sceneTitle: document.getElementById('sceneTitle'),
  sceneSubtitle: document.getElementById('sceneSubtitle'),
  sceneList: document.getElementById('sceneList'),
  mapPoints: document.getElementById('mapPoints'),
  mapImage: document.getElementById('mapImage'),
  mapFallback: document.getElementById('mapFallback'),
  introModal: document.getElementById('introModal'),
  introBtn: document.getElementById('introBtn'),
  closeIntroBtn: document.getElementById('closeIntroBtn'),
  toggleMapBtn: document.getElementById('toggleMapBtn'),
  miniMap: document.querySelector('.mini-map'),
};

function getSceneById(id) {
  return SCENES.find((scene) => scene.id === id);
}

function hotspotHandler(event, args) {
  loadScene(args.target);
}

function attachHotspots(scene) {
  if (!scene.hotspots || !scene.hotspots.length) return;
  scene.hotspots.forEach((spot) => {
    viewer.addHotSpot({
      pitch: spot.pitch,
      yaw: spot.yaw,
      type: 'info',
      text: spot.text,
      clickHandlerFunc: hotspotHandler,
      clickHandlerArgs: { target: spot.target },
      cssClass: 'custom-hotspot'
    });
  });
}

function syncHeader(scene) {
  els.sceneTitle.textContent = scene.title;
  els.sceneSubtitle.textContent = scene.subtitle;
}

function renderSceneStrip() {
  els.sceneList.innerHTML = '';
  SCENES.forEach((scene) => {
    const card = document.createElement('article');
    card.className = `scene-card ${scene.id === state.currentSceneId ? 'active' : ''}`;
    card.innerHTML = `
      <img class="scene-card__thumb" src="${scene.thumb}" alt="${scene.title}" />
      <div class="scene-card__title">${scene.title}</div>
    `;
    card.addEventListener('click', () => loadScene(scene.id));
    els.sceneList.appendChild(card);
  });
}

function renderMapPoints() {
  els.mapPoints.innerHTML = '';
  SCENES.forEach((scene) => {
    const point = document.createElement('button');
    point.className = `map-point ${scene.id === state.currentSceneId ? 'active' : ''}`;
    point.style.left = `${scene.x}%`;
    point.style.top = `${scene.y}%`;
    point.title = scene.title;
    point.addEventListener('click', () => loadScene(scene.id));
    els.mapPoints.appendChild(point);
  });
}

const initialScene = getSceneById(state.currentSceneId);

const viewer = pannellum.viewer('viewer', {
  type: 'equirectangular',
  panorama: initialScene.panorama,
  autoLoad: true,
  showControls: false,
  pitch: initialScene.pitch,
  yaw: initialScene.yaw,
  hfov: initialScene.hfov,
  compass: false,
  mouseZoom: true,
  draggable: true,
  backgroundColor: [15, 17, 21],
  fallback: '<p style="color:#fff">全景图未加载。请检查 assets/panos/ 中的文件名。</p>',
});

viewer.on('load', () => attachHotspots(getSceneById(state.currentSceneId)));

function loadScene(id) {
  const scene = getSceneById(id);
  if (!scene) return;
  state.currentSceneId = id;
  syncHeader(scene);
  viewer.setPanorama(scene.panorama, scene.pitch, scene.yaw, scene.hfov);
  viewer.on('load', () => attachHotspots(scene));
  if (state.autoRotate) viewer.startAutoRotate(3);
  renderSceneStrip();
  renderMapPoints();
}

function bindEvents() {
  document.getElementById('zoomInBtn').addEventListener('click', () => {
    viewer.setHfov(Math.max(50, viewer.getHfov() - 10));
  });

  document.getElementById('zoomOutBtn').addEventListener('click', () => {
    viewer.setHfov(Math.min(140, viewer.getHfov() + 10));
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    const scene = getSceneById(state.currentSceneId);
    viewer.setPitch(scene.pitch);
    viewer.setYaw(scene.yaw);
    viewer.setHfov(scene.hfov);
  });

  document.getElementById('fullscreenBtn').addEventListener('click', () => viewer.toggleFullscreen());

  document.getElementById('autoRotateBtn').addEventListener('click', () => {
    state.autoRotate = !state.autoRotate;
    if (state.autoRotate) viewer.startAutoRotate(3);
    else viewer.stopAutoRotate();
  });

  els.introBtn.addEventListener('click', () => els.introModal.classList.remove('hidden'));
  els.closeIntroBtn.addEventListener('click', () => els.introModal.classList.add('hidden'));
  els.introModal.addEventListener('click', (event) => {
    if (event.target === els.introModal) els.introModal.classList.add('hidden');
  });

  els.toggleMapBtn.addEventListener('click', () => {
    const hidden = els.miniMap.classList.toggle('hidden-map');
    els.toggleMapBtn.textContent = hidden ? '显示' : '隐藏';
  });

  els.mapImage.addEventListener('load', () => {
    els.mapFallback.style.display = 'none';
  });
}

syncHeader(initialScene);
renderSceneStrip();
renderMapPoints();
bindEvents();

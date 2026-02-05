// 照片数据 - 使用普通图片链接，不是Base64
const allPhotos = [
  {
    "id": 1,
    "filename": "九寨沟1.png",
    "path": "uploads/九寨沟1.png",
    "url": "uploads/九寨沟1.png",
    "title": "九寨沟1",
    "size": 17851251,
    "width": 5008,
    "height": 3336,
    "type": "png",
    "mime_type": "image/png"
  },
  {
    "id": 2,
    "filename": "厦门清水宫.png",
    "path": "uploads/厦门清水宫.png",
    "url": "uploads/厦门清水宫.png",
    "title": "厦门清水宫",
    "size": 25113554,
    "width": 5008,
    "height": 3336,
    "type": "png",
    "mime_type": "image/png"
  },
  {
    "id": 3,
    "filename": "君子峰蝴蝶.png",
    "path": "uploads/君子峰蝴蝶.png",
    "url": "uploads/君子峰蝴蝶.png",
    "title": "君子峰蝴蝶",
    "size": 22252784,
    "width": 6016,
    "height": 4016,
    "type": "png",
    "mime_type": "image/png"
  },
  {
    "id": 4,
    "filename": "君子峰银河（缩星）.png",
    "path": "uploads/君子峰银河（缩星）.png",
    "url": "uploads/君子峰银河（缩星）.png",
    "title": "君子峰银河（缩星）",
    "size": 43199989,
    "width": 6032,
    "height": 4032,
    "type": "png",
    "mime_type": "image/png"
  },
  {
    "id": 5,
    "filename": "武汉城市夜景.png",
    "path": "uploads/武汉城市夜景.png",
    "url": "uploads/武汉城市夜景.png",
    "title": "武汉城市夜景",
    "size": 26157161,
    "width": 11128,
    "height": 3992,
    "type": "png",
    "mime_type": "image/png"
  },
  {
    "id": 6,
    "filename": "稻城亚丁1.png",
    "path": "uploads/稻城亚丁1.png",
    "url": "uploads/稻城亚丁1.png",
    "title": "稻城亚丁1",
    "size": 22902503,
    "width": 5008,
    "height": 3336,
    "type": "png",
    "mime_type": "image/png"
  },
  {
    "id": 7,
    "filename": "稻城亚丁2.png",
    "path": "uploads/稻城亚丁2.png",
    "url": "uploads/稻城亚丁2.png",
    "title": "稻城亚丁2",
    "size": 26729139,
    "width": 5008,
    "height": 3336,
    "type": "png",
    "mime_type": "image/png"
  },
  {
    "id": 8,
    "filename": "越王勾践剑.png",
    "path": "uploads/越王勾践剑.png",
    "url": "uploads/越王勾践剑.png",
    "title": "越王勾践剑",
    "size": 41192562,
    "width": 6016,
    "height": 4016,
    "type": "png",
    "mime_type": "image/png"
  },
  {
    "id": 9,
    "filename": "长江二七大桥.png",
    "path": "uploads/长江二七大桥.png",
    "url": "uploads/长江二七大桥.png",
    "title": "长江二七大桥",
    "size": 28545460,
    "width": 6016,
    "height": 4016,
    "type": "png",
    "mime_type": "image/png"
  }
];
let currentIndex = 0;
let currentView = 'grid';

document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 摄影画廊已加载");
    console.log("📸 照片数量:", allPhotos.length);
    initApp();
});

function initApp() {
    initEventListeners();
    renderGridPhotos();
    renderSlideshow();
    updateCountDisplay();

    // 预加载图片
    preloadImages();
}

function preloadImages() {
    console.log("🖼️ 预加载图片...");
    allPhotos.forEach(photo => {
        const img = new Image();
        img.src = photo.path;
    });
}

function updateCountDisplay() {
    document.getElementById('total-slides').textContent = allPhotos.length;
    document.getElementById('modal-total').textContent = allPhotos.length;
}

function renderGridPhotos() {
    const gallery = document.getElementById('grid-view');
    gallery.innerHTML = '';

    allPhotos.forEach((photo, index) => {
        const sizeMB = photo.size / (1024 * 1024);

        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        photoCard.setAttribute('data-id', photo.id);
        photoCard.onclick = () => openModal(index);

        photoCard.innerHTML = `
            <div class="photo-frame">
                <div class="photo-inner">
                    <img src="${photo.path}" 
                         alt="${photo.title}"
                         loading="lazy"
                         class="photo-img">
                    <div class="photo-overlay">
                        <div class="photo-meta">
                            <span class="photo-id">#${photo.id}</span>
                            <span>${photo.width}×${photo.height}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="photo-title">${photo.title}</div>
            <div class="photo-details">
                <span class="photo-type">${photo.type.toUpperCase()}</span>
                <span class="photo-size">${sizeMB.toFixed(1)} MB</span>
            </div>
        `;

        gallery.appendChild(photoCard);
    });
}

function initEventListeners() {
    document.getElementById('view-grid').addEventListener('click', () => switchView('grid'));
    document.getElementById('view-slideshow').addEventListener('click', () => switchView('slideshow'));

    document.getElementById('prev-slide').addEventListener('click', () => changeSlide(-1));
    document.getElementById('next-slide').addEventListener('click', () => changeSlide(1));

    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.getElementById('modal-prev').addEventListener('click', () => changeModalPhoto(-1));
    document.getElementById('modal-next').addEventListener('click', () => changeModalPhoto(1));

    // 键盘控制
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') {
            if (currentView === 'modal') changeModalPhoto(-1);
            else if (currentView === 'slideshow') changeSlide(-1);
        }
        if (e.key === 'ArrowRight') {
            if (currentView === 'modal') changeModalPhoto(1);
            else if (currentView === 'slideshow') changeSlide(1);
        }
    });

    document.getElementById('image-modal').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
}

function switchView(view) {
    const gridView = document.getElementById('grid-view');
    const slideshowView = document.getElementById('slideshow-view');
    const gridBtn = document.getElementById('view-grid');
    const slideshowBtn = document.getElementById('view-slideshow');

    if (view === 'grid') {
        gridView.style.display = 'grid';
        slideshowView.style.display = 'none';
        gridBtn.classList.add('active');
        slideshowBtn.classList.remove('active');
        currentView = 'grid';
    } else if (view === 'slideshow') {
        gridView.style.display = 'none';
        slideshowView.style.display = 'block';
        gridBtn.classList.remove('active');
        slideshowBtn.classList.add('active');
        currentView = 'slideshow';
        goToSlide(currentIndex);
    }
}

function renderSlideshow() {
    const slidesContainer = document.getElementById('slides-container');
    slidesContainer.innerHTML = '';

    allPhotos.forEach((photo, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `
            <img src="${photo.path}" 
                 alt="${photo.title}"
                 class="slide-img"
                 data-index="${index}">
        `;
        slidesContainer.appendChild(slide);
    });
}

function goToSlide(index) {
    if (allPhotos.length === 0) return;
    if (index < 0 || index >= allPhotos.length) return;

    currentIndex = index;
    const slidesContainer = document.getElementById('slides-container');

    if (slidesContainer) {
        const slideWidth = 100;
        slidesContainer.style.transform = `translateX(-${index * slideWidth}%)`;
    }

    document.getElementById('current-slide').textContent = index + 1;
}

function changeSlide(direction) {
    if (allPhotos.length === 0) return;

    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = allPhotos.length - 1;
    if (newIndex >= allPhotos.length) newIndex = 0;

    goToSlide(newIndex);
}

function openModal(index) {
    if (allPhotos.length === 0) return;
    if (index < 0 || index >= allPhotos.length) return;

    currentView = 'modal';
    currentIndex = index;
    const photo = allPhotos[index];

    document.getElementById('modal-image').src = photo.path;
    document.getElementById('modal-current').textContent = index + 1;

    document.getElementById('image-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('image-modal').style.display = 'none';
    document.body.style.overflow = 'auto';

    if (document.getElementById('slideshow-view').style.display !== 'none') {
        currentView = 'slideshow';
    } else {
        currentView = 'grid';
    }
}

function changeModalPhoto(direction) {
    if (allPhotos.length === 0) return;

    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = allPhotos.length - 1;
    if (newIndex >= allPhotos.length) newIndex = 0;

    openModal(newIndex);
}

// 图片加载失败处理
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.error('图片加载失败:', e.target.src);
        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="200" y="150" text-anchor="middle" font-family="Arial" font-size="20" fill="%23999">图片加载失败</text></svg>';
    }
}, true);

console.log("画廊脚本加载完成");

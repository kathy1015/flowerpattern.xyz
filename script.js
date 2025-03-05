const images = [
    // 在这里按照从老到新的顺序添加图片文件名
    'pattern-001.jpg', 'pattern-002.jpg', 'pattern-003.jpg', 'pattern-004.jpg', 'pattern-005.jpg', 'pattern-006.jpg', 'pattern-007.jpg', 'pattern-008.jpg',
    'pattern-009.jpg', 'pattern-010.jpg', 'pattern-011.jpg', 'pattern-012.png', 'pattern-013.jpg', 'pattern-014.jpg', 'pattern-015.jpg', 'pattern-016.jpg',
    'pattern-017.jpg', 'pattern-018.jpg', 'pattern-019.jpg', 'pattern-020.jpg', 'pattern-021.jpg', 'pattern-022.jpg', 'pattern-023.jpg', 'pattern-024.png',
    'pattern-025.jpg', 'pattern-026.jpg', 'pattern-027.jpg', 'pattern-028.jpg', 'pattern-029.jpg', 'pattern-030.jpg', 'pattern-031.jpg', 'pattern-032.jpg'
];

function getDailyImage() {
    const startDate = new Date('2025-03-05').getTime();
    const today = new Date();
    const currentDate = today.toDateString();
    const lastDate = localStorage.getItem('lastImageDate');
    const daysPassed = Math.floor((today.getTime() - startDate) / (1000 * 60 * 60 * 24));
    const imageIndex = daysPassed % images.length;
    
    const dailyImage = document.getElementById('dailyImage');
    const imageDate = document.getElementById('imageDate');
    
    // 总是设置图片源，但只在日期变化时更新 localStorage
    dailyImage.src = `assets/images/patterns/${images[imageIndex]}`;
    imageDate.textContent = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    if (currentDate !== lastDate) {
        localStorage.setItem('lastImageDate', currentDate);
    }
}

function scheduleNextUpdate() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilMidnight = tomorrow - now;
    setTimeout(() => {
        getDailyImage();
        scheduleNextUpdate();
    }, timeUntilMidnight);
}

window.onload = () => {
    getDailyImage();
    scheduleNextUpdate();
};
let videosArray = [];

document.addEventListener('DOMContentLoaded', loadVideosFromLocalStorage);
document.getElementById('addVideoBtn').addEventListener('click', addVideo);

function addVideo() {
    const videoLink = document.getElementById('videoLink').value.trim();
    const videoName = document.getElementById('videoName').value.trim();

    if (videoLink) {
        const videoId = extractVideoID(videoLink);
        if (videoId) {
            const video = { id: Date.now(), title: videoName || `Video ${videosArray.length + 1}`, videoId };
            videosArray.push(video);
            saveToLocalStorage(videosArray);
            loadVideosFromLocalStorage();
            clearInputs();
        } else {
            alert('Invalid YouTube link');
        }
    } else {
        alert('Please enter a YouTube link');
    }
}

function extractVideoID(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}

function loadVideosFromLocalStorage() {
    const videos = getVideosFromLocalStorage();
    videosArray = videos || [];
    const videoList = document.getElementById('videoList');
    videoList.innerHTML = '';
    videosArray.forEach(video => {
        const li = createVideoListItem(video);
        videoList.appendChild(li);
    });
}

function createVideoListItem(video) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${video.title}</span>
        <div>
            <span class="icon" onclick="playVideo('${video.videoId}')">▶️</span>
            <span class="icon" onclick="openEditModal('${video.id}')">✏️</span>
            <span class="icon" onclick="deleteVideo('${video.id}')">🗑️</span>
        </div>
    `;
    return li;
}

function playVideo(videoId) {
    const player = document.getElementById('videoPlayer');
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

function openEditModal(videoId) {
    const video = videosArray.find(v => v.id == videoId);
    document.getElementById('videoLink').value = `https://www.youtube.com/watch?v=${video.videoId}`;
    document.getElementById('videoName').value = video.title;
    deleteVideo(videoId); // Temporarily remove to avoid duplicate
}

function deleteVideo(videoId) {
    videosArray = videosArray.filter(video => video.id != videoId);
    saveToLocalStorage(videosArray);
    loadVideosFromLocalStorage();
}

function saveToLocalStorage(videos) {
    localStorage.setItem('videos', JSON.stringify(videos));
}

function getVideosFromLocalStorage() {
    const videos = localStorage.getItem('videos');
    return videos ? JSON.parse(videos) : [];
}

function clearInputs() {
    document.getElementById('videoLink').value = '';
    document.getElementById('videoName').value = '';
}

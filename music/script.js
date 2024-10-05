let currentEditingVideoId = null; // Variable to keep track of which song is being edited

document.addEventListener('DOMContentLoaded', loadSongsFromLocalStorage);

document.getElementById('addSongBtn').addEventListener('click', addSong);
document.getElementById('saveSongBtn').addEventListener('click', saveEditedSong);
document.getElementById('closeModal').addEventListener('click', closeModal);

function addSong() {
    const link = document.getElementById('youtubeLink').value;
    if (link) {
        const videoId = extractVideoID(link);
        if (videoId) {
            const title = `Song - ${videoId}`; // Default title
            const li = createSongListItem(videoId, title);
            document.getElementById('songList').appendChild(li);
            saveToLocalStorage(videoId, title); // Save to local storage
            document.getElementById('youtubeLink').value = ''; // Clear input
        } else {
            alert('Invalid YouTube link');
        }
    }
}

function extractVideoID(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}

function playSong(videoId) {
    const player = document.getElementById('videoPlayer');
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

function createSongListItem(videoId, title) {
    const li = document.createElement('li');
    li.setAttribute('data-id', videoId);
    li.innerHTML = `
        <span>${title}</span>
        <div>
            <span class="icon edit-icon" onclick="openEditModal('${videoId}', '${title}')">✏️</span>
            <span class="icon delete-icon" onclick="deleteSong(this)">🗑️</span>
        </div>
    `;
    li.setAttribute('draggable', true);
    li.addEventListener('dragstart', dragStart);
    li.addEventListener('dragend', dragEnd);
    li.addEventListener('click', () => playSong(videoId));
    return li;
}

function openEditModal(videoId, title) {
    currentEditingVideoId = videoId; // Set the current editing video ID
    document.getElementById('newSongName').value = title.split(' - ')[1]; // Set the current title
    document.getElementById('editModal').style.display = 'block'; // Show the modal
}

function saveEditedSong() {
    const newSongName = document.getElementById('newSongName').value;
    if (newSongName) {
        const songItem = document.querySelector(`li[data-id='${currentEditingVideoId}']`);
        songItem.firstChild.innerText = `Song - ${newSongName}`; // Update the title displayed
        updateLocalStorage(currentEditingVideoId, newSongName); // Update in local storage
        closeModal(); // Close the modal
    }
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none'; // Hide the modal
}

function allowDrop(event) {
    event.preventDefault();
}

function dragStart(event) {
    event.target.classList.add('dragging');
    event.dataTransfer.setData('text/plain', event.target.dataset.id);
}

function dragEnd(event) {
    event.target.classList.remove('dragging');
}

function drop(event) {
    event.preventDefault();
    const draggingId = event.dataTransfer.getData('text/plain');
    const draggingLi = document.querySelector(`li[data-id='${draggingId}']`);
    const dropzone = event.target;

    if (dropzone.tagName === 'UL') {
        dropzone.appendChild(draggingLi);
        saveSongList(); // Save the updated list to local storage
    }
}

function deleteSong(element) {
    const songItem = element.closest('li');
    removeFromLocalStorage(songItem.dataset.id); // Remove from local storage
    songItem.remove(); // Remove the song from the list
}

// Local Storage Functions
function saveToLocalStorage(videoId, title) {
    const songs = getSongsFromLocalStorage();
    songs[videoId] = title; // Save the song title with the video ID
    localStorage.setItem('songs', JSON.stringify(songs)); // Save to local storage
}

function loadSongsFromLocalStorage() {
    const songs = getSongsFromLocalStorage();
    for (const videoId in songs) {
        const title = songs[videoId];
        const li = createSongListItem(videoId, title);
        document.getElementById('songList').appendChild(li);
    }
}

function updateLocalStorage(videoId, newTitle) {
    const songs = getSongsFromLocalStorage();
    songs[videoId] = `Song - ${newTitle}`; // Update the song title
    localStorage.setItem('songs', JSON.stringify(songs)); // Save to local storage
}

function removeFromLocalStorage(videoId) {
    const songs = getSongsFromLocalStorage();
    delete songs[videoId]; // Remove the song from the object
    localStorage.setItem('songs', JSON.stringify(songs)); // Save the updated object
}

function getSongsFromLocalStorage() {
    const songs = localStorage.getItem('songs');
    return songs ? JSON.parse(songs) : {}; // Return parsed object or empty object if null
}

// To save the song list when it's reordered
function saveSongList() {
    const songListItems = document.querySelectorAll('#songList li');
    const songs = {};
    songListItems.forEach(item => {
        const videoId = item.dataset.id;
        const title = item.firstChild.textContent; // Get the title
        songs[videoId] = title; // Save the song title with the video ID
    });
    localStorage.setItem('songs', JSON.stringify(songs)); // Save to local storage
}

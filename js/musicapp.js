const trackList = [
  {
    name: "Orzuga yetmoq osonmas",
    path: "./audios/Yulduz-Usmonova-Orzuga-yetmoq-osonmas.mp3",
    img: "./images/Yulduz-Usmonova-Orzuga-yetmoq-osonmas.jpg",
    singer: "Yulduz Usmonova",
  },
  {
    name: "Nozanin",
    path: "./audios/Yulduz-Usmonova-Nozanin.mp3",
    img: "./images/Yulduz-Usmonova-Nozanin.jpg",
    singer: "Yulduz Usmonova",
  },
  {
    name: "Ko'zing mayus",
    path: "./audios/Tohir-Sodiqov-Ko'zing-Mayus.mp3",
    img: "./images/Tohir-Sodiqov-Ko'zing-Mayus.jpg",
    singer: "Tohir Sodiqov",
  },
  {
    name: "Do'stim",
    path: "./audios/Tohir-Sodiqov-Do'stim.mp3",
    img: "./images/Tohir-Sodiqov-Do'stim.jpg",
    singer: "Tohir Sodiqov",
  },
  {
    name: "Marg'ilonlik qizlarsiz",
    path: "./audios/Ohunjon-Madaliyev-Marg'ilonlik-Qizlarsiz.mp3",
    img: "./images/Ohunjon-Madaliyev-Marg'ilonlik-Qizlarsiz.jpg",
    singer: "Ohunjon Madaliyev",
  },
  {
    name: "Chiroyli qiz",
    path: "./audios/Ohunjon-Madaliyev-Chiroyli-Qiz.mp3",
    img: "./images/Ohunjon-Madaliyev-Chiroyli-Qiz.jpg",
    singer: "Ohunjon Madaliyev",
  },
  {
    name: "O'zbekistonlik",
    path: "./audios/Konsta-O'zbekistonlik.mp3",
    img: "./images/Konsta-O'zbekistonlik.jpg",
    singer: "Konsta",
  },
  {
    name: "Insonlar",
    path: "./audios/Konsta-Insonlar.mp3",
    img: "./images/Konsta-Insonlar.jpg",
    singer: "Konsta",
  },
  {
    name: "Suspicious Minds",
    path: "./audios/Elvis-Presley-Suspicious-Minds.mp3",
    img: "./images/Elvis-Presley-Suspicious-Minds.jpg",
    singer: "Elvis Presley",
  },
  {
    name: "Devil in Disguise",
    path: "./audios/Elvis-Presley-Devil-in-Disguise.mp3",
    img: "./images/Elvis-Presley-Devil-in-Disguise.jpg",
    singer: "Elvis Presley",
  },
  {
    name: "Shape of You",
    path: "./audios/Ed-Sheeran-Shape-Of-You.mp3",
    img: "./images/Ed-Sheeran-Shape-Of-You.jpg",
    singer: "Ed Sheeran",
  },
  {
    name: "Perfect",
    path: "./audios/Ed-Sheeran-Perfect.mp3",
    img: "./images/Ed-Sheeran-Perfect.jpg",
    singer: "Ed Sheeran",
  },
];

let currentTrackIndex = 0;
let isPlaying = false;
const audio = new Audio(trackList[currentTrackIndex].path);
const trackImage = document.querySelector(".track-image");
const trackTitle = document.querySelector(".title");
const trackArtist = document.querySelector(".artist");
const playBtn = document.querySelector(".play");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const playAllBtn = document.querySelector(".play-all");
const durationSlider = document.querySelector(".duration-slider");
const currentTimeEl = document.querySelector(".current-time");
const durationTimeEl = document.querySelector(".duration-time");
const volumeSlider = document.querySelector("#volume");
const volumeIcon = document.querySelector("#volume-icon");
const playlistDiv = document.querySelector(".playlist-div");

function loadTrack(trackIndex) {
  const track = trackList[trackIndex];
  audio.src = track.path;
  trackImage.src = track.img;
  trackTitle.textContent = track.name;
  trackArtist.textContent = track.singer;
}

function playTrack() {
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
}

function togglePlayPause() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

function prevTrack() {
  currentTrackIndex =
    (currentTrackIndex - 1 + trackList.length) % trackList.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

function updateDuration() {
  const progress = (audio.currentTime / audio.duration) * 100;
  durationSlider.value = progress;
  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
  currentTimeEl.textContent = `${minutes}:${seconds}`;
}

function seekTrack() {
  const seekTime = (durationSlider.value / 100) * audio.duration;
  audio.currentTime = seekTime;
}

function updateVolume() {
  audio.volume = volumeSlider.value / 100;
  volumeIcon.textContent = volumeSlider.value > 0 ? "🔊" : "🔈";
}

function toggleMute() {
  audio.muted = !audio.muted;
  volumeIcon.textContent = audio.muted ? "🔈" : "🔊";
}

function createPlaylist() {
  playlistDiv.innerHTML = "";
  trackList.forEach((track, index) => {
    const trackItem = document.createElement("div");
    trackItem.className = "playlist";
    trackItem.innerHTML = `
      <p class="song-index">${index + 1}</p>
      <p class="song-details">${track.name} - ${track.singer}</p>
    `;
    trackItem.addEventListener("click", () => {
      currentTrackIndex = index;
      loadTrack(currentTrackIndex);
      playTrack();
    });
    playlistDiv.appendChild(trackItem);
  });
}

function playAllTracks() {
  currentTrackIndex = 0;
  loadTrack(currentTrackIndex);
  playTrack();
}

playBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);
durationSlider.addEventListener("input", seekTrack);
audio.addEventListener("timeupdate", updateDuration);
volumeSlider.addEventListener("input", updateVolume);
volumeIcon.addEventListener("click", toggleMute);
playAllBtn.addEventListener("click", playAllTracks);

loadTrack(currentTrackIndex);
createPlaylist();
updateVolume();

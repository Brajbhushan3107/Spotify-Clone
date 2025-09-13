
let currentIndex = 0;
let currentAudio = new Audio();
// currentAudio.src=songs[0];
let currFolder;
let Songs;

async function getSongs(folder) {
  currFolder = folder;
  let res = await fetch(`http://127.0.0.1:5501/${folder}/`);
  let html = await res.text();

  let div = document.createElement("div");
  div.innerHTML = html;

  let links = div.getElementsByTagName("a");
  Songs = [];

  for (let link of links) {
    let href = link.getAttribute("href");

    if (href && href.endsWith(".mp3")) {
      // Avoid adding /songs/ twice
      if (href.startsWith("/")) {
        Songs.push(href); // already absolute path
      } else {
        Songs.push(`/${folder}/${href}`);
      }
    }

  }

  let songUl = document.querySelector(".scroll").getElementsByTagName("ul")[0];
  songUl.innerHTML = ""
  for (const song of Songs) {


    songUl.innerHTML = songUl.innerHTML + `<li>
                        <img class="invert"  src="songicon.svg" alt="">
                            <div class="info">
                                <div> ${song.replace(`/${currFolder}/`, "").replaceAll("%20", " ")} </div>
                                <div class="artist">Bhushan</div>
                            </div>
                            <div class="playnow flex">
                                <div>Play Now</div>
                                <img class="invert" src="playbtn.svg" alt="">
                            </div> 
                    </li>`
  }

  // if (Songs.length > 0) {
  //   let audio = new Audio(Songs[3]);
  //   // audio.play();
  // } else {
  //   console.log("No songs found.");
  // }
  Array.from(document.querySelector(".ul").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", (element) => {
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
      pausebutton(e);

    }


    )
  })




}



playMusic = (track, pause = false) => {
  console.log(track);

  currentAudio.pause(); // Always pause before changing src
  currentAudio.src = `/${currFolder}/` + track;

  currentAudio.load(); // Prepare the new audio file

  if (!pause) {
    // Safely play the audio after it's ready
    currentAudio.play().catch((e) => {
      console.warn("Playback interrupted:", e);
    });
  }

  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00/00:00";
};
function getCards(image, songname, Artist) {


  let cardcont = document.querySelector(".cardcontainer");
  let html = `<div class="card" >
  <img src="${image} " alt=""
  class="cardimage">
  <div class="play2">
  <img src="play2.svg" alt="" class="play2img ">
  </div>
  <h4>${songname}</h4>
  <p>${Artist}</p>
  
  
  </div>`;
  cardcont.innerHTML = cardcont.innerHTML + html;
}
getCards("https://i.scdn.co/image/ab67616d00001e021344800458a38197bfc721f3", "Jhol", "Maanu,Annural khalid")
getCards("https://i.scdn.co/image/ab67616d00001e02a7e251b543c77a6ed356dfbe", "Saiyaara", "Tanish Bagchi");
getCards("https://i.scdn.co/image/ab67616d00001e0225fa8e214ad888b7d291f25e", "Monica", "Tanish Bagchi");
getCards("https://i.scdn.co/image/ab67616d00001e0274587e0e74ae1a46599348b7", "Lagi lagan Shankara", "Tanish Bagchi");
getCards("https://i.scdn.co/image/ab67616d00001e02c65eb44f9039e006247ef8f7", "Namo Namo", "Tanish Bagchi");
getCards("https://i.scdn.co/image/ab67616d00001e0263521cf4f0ca24a244f26e8b", "Shiv Tandav Stotram", "Tanish Bagchi");
getCards("https://i.scdn.co/image/ab67616d00001e026ae36119f279e30a32678272", "Har har shambhu shiv mahadeva", "Tanish Bagchi");
getCards("https://i.scdn.co/image/ab67616d00001e02c5c4f9a9ea4d1992bcef722f", "Convo", "Tanish Bagchi");
getCards("https://i.scdn.co/image/ab67616d00001e02c820f033bd82bef4355d1563", "Senorita", "Tanish Bagchi");



function getplayCards(image, songname, Artist, folder) {


  let playcont = document.querySelector(".playlistcont");
  let html = `<div class="playcard" data-folder="${folder}" >
  <img src="${image} " alt=""
  class="playcardimage">
  <div class="play2">
  <img src="play2.svg" alt="" class="play2img ">
  </div>
  <h4>${songname}</h4>
  <p>${Artist}</p>
  
  
  </div>`;
  playcont.innerHTML = playcont.innerHTML + html;
}
getplayCards("https://i.scdn.co/image/ab67616d00001e026404721c1943d5069f0805f3", "Ashique 2", "A.R Rahmaan", "Ashique")
getplayCards("https://i.scdn.co/image/ab67616d00001e02707ea5b8023ac77d31756ed4", "Yeh Jawaani Hai Deewani", "Pritam", "Yeh")
getplayCards("	https://i.scdn.co/image/ab67616d00001e02711c1639b4bc0f9978ae77a6", "Sanam Teri Kasam (Original Motion...)", "Himesh Reshammiya, Sameer Anjaan, Subrat...", "SanamTeriKasam")
getplayCards("https://i.scdn.co/image/ab67616d00001e0283141000ee8ce3b893a0b425", "Finding Her", "Kushagra, Bharath, Saaheal", "FindingHer")
getplayCards("	https://i.scdn.co/image/ab67616d00001e02a5183fa4b99bcec1f506418d", "Young G.O.A.T", "Cheema Y, Gur Sidhu", "youngGoat")
getplayCards("	https://i.scdn.co/image/ab67616d00001e02773c5f60bcb309ef8802e4ef", "Ranjhan(from-Do-patti)", "Cheema Y, Gur Sidhu", "Ranjhan")

function getArtists(image, artistname, Artist,link) {
  let artistcont = document.querySelector(".artistcont");
  let html = `<a href="${link}" target="_blank"><div class="artistcard">
                        <img src="${image}" alt="">
                         <div class="play2">
                            <img src="play2.svg" alt="" class="play2img ">
                        </div>
                        <h4>${artistname}</h4>
                        <p>Artist</p>
                    </div>
                    <a>`;
  artistcont.innerHTML = artistcont.innerHTML + html;
}
getArtists("https://i.scdn.co/image/ab67616100005174cb6926f44f620555ba444fca", "Pritam", "Artist","https://en.wikipedia.org/wiki/Pritam");
getArtists("https://i.scdn.co/image/ab67616100005174b19af0ea736c6228d6eb539c", "A.R rahmaan", "Artist","https://en.wikipedia.org/wiki/Ar-Rahman)");
getArtists("https://i.scdn.co/image/ab676161000051745ba2d75eb08a2d672f9b69b7", "Arijit Singh", "Artist","https://en.wikipedia.org/wiki/Arijit_Singh");
getArtists("https://i.scdn.co/image/ab67616100005174bb4064bef3a825344d5eb79e", "Sachin-Jigar", "Artist","https://en.wikipedia.org/wiki/Sachin%E2%80%93Jigar");
getArtists("https://i.scdn.co/image/ab6761610000517490b6c3d093f9b02aad628eaf", "Vishal-Shekhar", "Artist","https://en.wikipedia.org/wiki/Vishal%E2%80%93Shekhar");
getArtists("https://i.scdn.co/image/ab67616100005174c40600e02356cc86f0debe84", "Atif Aslam", "Artist","https://en.wikipedia.org/wiki/Atif_Aslam");
getArtists("https://i.scdn.co/image/ab676161000051740f0be2054fe9594026a6b843", "Anirudh Ravichander", "Artist","https://en.wikipedia.org/wiki/Anirudh_Ravichander");
getArtists("https://i.scdn.co/image/ab676161000051748de0e6e7e55d7773931ab7f4", "Udit Narayan", "Artist","https://en.wikipedia.org/wiki/Udit_Narayan");


async function main() {
  await getSongs("Songs/Ashique");
  playMusic(Songs[0].replace(`/${currFolder}/`, ""), true);

  // console.log(Songs);

  // playMusic = (track, pause = false) => {
  //   currentAudio.src = "/songs/" + track;
  //   currentAudio.play();
  //   document.querySelector(".songinfo").innerHTML = track;



  // }
  pausebutton = (clickedLi) => {
    // 1. Reset all buttons to play icon
    document.querySelectorAll(".playnow img").forEach(img => {
      img.src = "playbtn.svg";
    });

    // 2. Change the clicked song's icon to pause
    if (clickedLi) {
      let currentImg = clickedLi.querySelector(".playnow img");
      if (currentImg) {
        currentImg.src = "pause.svg";
        play.src = "pause.svg";
      }
    }
  };

  //attaching an event listner to each song



  // attaching an event listner play,previus and next
  play.addEventListener("click", (elem) => {
    if (currentAudio.paused) {
      currentAudio.play();
      play.src = "pause.svg";
    }
    else {
      currentAudio.pause();
      play.src = "playbtn.svg";

    }
  }
  )

  //event listner on previous icon
  previous.addEventListener("click", (e) => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = Songs.length - 1;
    }
    playMusic(Songs[currentIndex].replace(`/${currFolder}/`, ""), true);
    play.scr = "playbtn.svg";
  }
  )
  next.addEventListener("click", (e) => {
    currentIndex++;
    if (currentIndex > Songs.length) {
      currentIndex = 0;
    }
    playMusic(Songs[currentIndex].replace(`/${currFolder}/`, ""), true);
    play.scr = "playbtn.svg";
  }

  )


  //listen for current time 
  function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    // Pad with leading zero if needed
    if (minutes < 10) minutes = "0" + minutes;
    if (secs < 10) secs = "0" + secs;

    return `${minutes}:${secs}`;
  }
  currentAudio.addEventListener("timeupdate", (params) => {
    let timeStr = formatTime(currentAudio.currentTime);
    let timedur = formatTime(currentAudio.duration);
    document.querySelector(".songtime").innerHTML = `${timeStr} / ${timedur}`;
    document.querySelector(".circle").style.left = (currentAudio.currentTime / currentAudio.duration) * 100 + "%";

  }
  )


  //add event listner to seek the seekbar
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    // console.log(e.target.getBoundingClientRect().width,e.offsetX);
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentAudio.currentTime = (currentAudio.duration * percent) / 100
  }
  )
  //event listner for cross 
  document.querySelector(".hamburger").addEventListener("click", (e) => {
    document.querySelector(".left").style.left = 0 + "%";
    document.querySelector(".hamburger").style.display = "none";



  }
  )
  //event listner for cross 
  document.querySelector(".cross").addEventListener("click", (e) => {
    document.querySelector(".left").style.left = -100 + "%";
    document.querySelector(".hamburger").style.display = "inline-flex";
  }
  )


  //event listner on volme button
  let vol = document.querySelector(".volume");
  vol.getElementsByTagName("img")[0].addEventListener("mouseover", (e) => {
    vol.getElementsByTagName("input")[0].style.display = "inline-flex";
    setTimeout((e) => {
      vol.getElementsByTagName("input")[0].style.display = "none";
    }, 10000)

  }
  )
  //event listner on vol change 
  vol.getElementsByTagName("input")[0].addEventListener("change", (e) => {

    currentAudio.volume = (e.target.value) / 100;
  }
  )
  // listner on card
  document.querySelectorAll(".card,.playcard,.artistcard").forEach(card => {
    const play2 = card.querySelector(".play2");

    card.addEventListener("mouseenter", () => {
      play2.style.visibility = "visible";
      play2.style.opacity = "1";
      play2.style.transform = "translateY(0)";
    });

    card.addEventListener("mouseleave", () => {
      play2.style.visibility = "hidden";
      play2.style.opacity = "0";
      play2.style.transform = "translateY(40px)";
    });
  });




  //opening folder by just clicking

  Array.from(document.getElementsByClassName("playcard")).forEach((e) => {
    e.addEventListener("click", async (item) => {

      await getSongs(`Songs/${item.currentTarget.dataset.folder}`);
      currentIndex = 0;
      playMusic(Songs[0].replace(`/${currFolder}/`, ""), true);
    });
  });

  //setting for card container 
  document.querySelector(".cardcontainer").addEventListener("click", async (e) => {
    await getSongs(`Songs/trendingSongs`);
    currentIndex = 0;
    // playMusic(Songs[0].replace(`/${currFolder}/`, ""), true);

    // Attach card listeners **after** trending songs are loaded
    document.querySelectorAll(".card").forEach(card => {
      card.addEventListener("click", () => {
        let songName = card.querySelector("h4").innerText.trim();
        for (let i = 0; i < Songs.length; i++) {
          let cleaned = Songs[i].replace(`/${currFolder}/`, "").replace(".mp3", "").replaceAll("%20", " ");

          if (cleaned === songName) {
            playMusic(cleaned + ".mp3");
            play.src = "pause.svg";
            pausebutton();
            break;
          }
          //         console.log("Card name:", songName);
          // console.log("Songs:", Songs);
        }
      });
    });
  });

  //adding event listner on volume mute

  let volimg = document.querySelector(".volume").getElementsByTagName("img")[0];
  // console.log(volimg);
  volimg.addEventListener("click", (e) => {
    if (e.target.src.includes("volume.svg")) {
      e.target.src = e.target.src.replace("volume.svg", "mute.svg");
      currentAudio.volume = 0;
      vol.getElementsByTagName("input")[0].value = 0;
    }

    else {
      e.target.src = e.target.src.replace("mute.svg", "volume.svg");
      currentAudio.volume = 0.20;
      vol.getElementsByTagName("input")[0].value = 20;
    }
  }
  )
}
main()

//to enable right click on a restricted website


// document.addEventListener('contextmenu', event => event.stopPropagation(), true);
// document.oncontextmenu = null;
// document.body.oncontextmenu = null;


//------------------- Blur Loader------------------------------------------

const loader = document.getElementById("blur-container");
const wrapper = document.getElementById("container");
const img = document.querySelector('.shadow');

function animateEffects() {
let scaleValue = 0; // Initial scale value

const animationInterval = setInterval(() => {
scaleValue += 0.02; // Adjust the increment for a smoother transition
loader.style.transform = `scale(${scaleValue})`;
img.style.transform = `scale(${scaleValue})`;

if (scaleValue >= 1) {
  clearInterval(animationInterval);
  animateBounce();
  setTimeout(zoomInImage, 2000); // Call the zoomInImage function after a delay
}
}, 25); // Adjust the interval for smoother animation
}
function animateBounce() {
    let bounceValue = 0; // Initial bounce value
  
    const bounceInterval = setInterval(() => {
      bounceValue += 0.05; // Adjust the increment for a smoother transition
      const offsetY = Math.sin(bounceValue) * 10; // Adjust the amplitude of the bounce
  
      loader.style.transform = `translateY(${offsetY}px)`;
      img.style.transform = `translateY(${-offsetY}px)`; // Apply the opposite translateY to the shadow
  
      if (bounceValue >= Math.PI) {
        clearInterval(bounceInterval);
      }
    }, 20); // Adjust the interval for smoother animation
  }
  
function zoomInImage() {
let blurAmount = .8; 
let scaleValue = 1; 

const zoomInterval = setInterval(() => {
blurAmount += 2;
scaleValue += 0.1;
loader.style.filter = `blur(${blurAmount}px)`;
loader.style.transform = `scale(${scaleValue})`;

if (blurAmount >= 20) {
  clearInterval(zoomInterval);
  loader.style.display = "none";
  loader.style.opacity = 0;
  wrapper.style.display = "block";
}
}, 50); // Adjust the interval for smoother animation
}
window.addEventListener("load", animateEffects);



//------------------- Blur Loader------------------------------------------

async function searchUser() {
    const username = document.getElementById('username').value;
    const resultDiv = document.getElementById('result');
    
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (response.ok) {
            const userData = await response.json();
            displayUserInfo(userData);
            resultDiv.style.visibility = "visible";
        } else {
            resultDiv.style.visibility = "visible";
            resultDiv.innerHTML = `
            <img loading="lazy" src="./assets/user not found.jpg" width="140" height="150">
            User not found...
            `;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        resultDiv.innerHTML = `
        <img loading="lazy" src="./assets/error.png" >
        An error occurred while fetching data.`;
      }
}

function displayUserInfo(user) {
const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
  <h2>Username: ${user.login}</h2>
  <div id="newDiv">
  <a href="https://github.com/${user.login}"><img src="${user.avatar_url}"></a>
  </div>
  <p>Name: ${user.name || 'Not available'}</p>
  <p>Followers: ${user.followers}</p>
  <p>Public Repositories: ${user.public_repos}</p>`;
}

const paper = document.getElementById('paper');
const inputText = document.getElementById('inputText');

const defaults = {paperColor: '#ffd7e6', textColor: '#000000'};

function applySettings(){
  const pc = localStorage.getItem('paperColor') || defaults.paperColor;
  const tc = localStorage.getItem('textColor') || defaults.textColor;
  const bgImage = localStorage.getItem('backgroundImage');
  if (bgImage) {
    paper.style.background = `url(${bgImage}) center/cover no-repeat`;
  } else {
    paper.style.background = pc;
  }
  // also set CSS vars so placed items inherit
  document.documentElement.style.setProperty('--paper-default', pc);
  document.documentElement.style.setProperty('--text-default', tc);
}

applySettings();

paper.addEventListener('click', (e)=>{
  const text = inputText.value.trim();
  if(!text) return;
  const rect = paper.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const span = document.createElement('span');
  span.className = 'placed';
  span.textContent = text;
  span.style.left = x + 'px';
  span.style.top = y + 'px';
  // apply color directly to guard against CSS not loaded
  const tc = localStorage.getItem('textColor') || defaults.textColor;
  span.style.color = tc;

  paper.appendChild(span);
});

// update settings if user changes in another tab
window.addEventListener('storage', (e)=>{
  if(e.key === 'paperColor' || e.key === 'textColor') applySettings();
});

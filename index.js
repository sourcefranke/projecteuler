var myDropdown = [
    { call: 'navigate("1")', text: '#1 - Multiples of 3 or 5' },
    { call: 'navigate("3")', text: '#3 - Largest Prime Factor' },
];

var entries = '';
myDropdown.forEach(entry => {
    entries += `<li><a onclick='${entry.call}'>${entry.text}</a></li>`;
});
document.getElementById('menu-items').innerHTML = entries;


const pages = {
    'home': () => loadNormalPage('home.md'),
    'about': () => loadNormalPage('about.md'),
    '1': () => loadNotebookPage('00001'),
    '3': () => loadNotebookPage('00003'),
}

const url = new URL(window.location);
const params = new URLSearchParams(url.search);

if(params.has('page')) {
    pages[params.get('page')]();
}
else {
    pages['home']();
}


function navigate(page) {
 window.location = `${location.protocol}//${location.host + location.pathname}?page=${page}`;
}

async function loadNormalPage(mdFile) {
  await loadTemplate('normal');
  await loadMarkdown(mdFile, 'text');
}

async function loadNotebookPage(number) {
  await loadTemplate('description_notebook');
  await loadMarkdown(`problems/${number}/desc.md`, 'text');
  document.getElementById('notebook').src = `problems/${number}/solution.html`;
}

async function loadTemplate(file) {
  const response = await fetch(`page_templates/${file}.html`);
  const text = await response.text();
  document.getElementById('content').innerHTML = text;
}

async function loadMarkdown(file, id) {
  const response = await fetch(file);
  const text = await response.text();
  const html = marked.parse(text);
  document.getElementById(id).innerHTML = html;
}

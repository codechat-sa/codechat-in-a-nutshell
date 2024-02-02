const editor = document.getElementById('textarea');
const chats = document.getElementById("chats");

function onPageLoad() {
  var app = document.getElementById('welcome');
  var previewScript = document.getElementById('syntax_doc');
  previewScript.textContent = smiles(evaluate(vexflow(previewScript.textContent)));
    var renderer = new marked.Renderer();
  renderer.code = function (code, lang) {
    return lang === 'mermaid' ?
      `<div class="mermaid">${code.replace(/  \n/g, '\n')}</div>` :
      `<pre><code>${code}</code></pre>`;
  };
  app.render({
    renderer
  });
    }
    window.onload = onPageLoad;

editor.addEventListener('input', function () {
  var app = document.getElementById('app');
  clsElements();
  chats.style.filter = "blur(1px)";
  app.style.display = "flex";
  var previewScript = document.getElementById('previewScript');
  previewScript.textContent = smiles(evaluate(vexflow(editor.value))).replace(/\n/g, '  \n');
  var renderer = new marked.Renderer();
  renderer.code = function (code, lang) {
    return lang === 'mermaid' ?
      `<div class="mermaid">${code.replace(/  \n/g, '\n')}</div>` :
      `<pre><code>${code}</code></pre>`;
  };
  app.render({
    renderer
  });
});

chats.addEventListener('click', function() {
  document.getElementById("app").style.display = "none";
  this.style.filter = "blur(0px)";
});

function fetchNewMessages() {
  mermaid.init();
}

setInterval(fetchNewMessages, 2500);

function smiles(value) {
value=value.replace(/  \n/g, '\n');
const options = {
  htmlTags: true
};

const pattern = /```smiles([\s\S]*?)```/g;

let currentIndex = 0;
let output = '';

function replaceCallback(match, p1, offset) {
  const html = window.markdownToHTML(match, options);
  output += value.substring(currentIndex, offset);
  output +=  html + '\n';
  currentIndex = offset + match.length;
  return match;
}

value.replace(pattern, replaceCallback);

if (currentIndex < value.length) {
  output += value.substring(currentIndex);
}

return output;
}

function vexflow(value) {
value=value.replace(/  \n/g, '\n');

const pattern = /```vexflow([\s\S]*?)```/g;

let currentIndex = 0;
let newOutput = '';
const output = document.createElement('div');

function replaceCallback(match, p1, offset) {
    const html = match.replace(/```vexflow/g, '').replace(/```/g, '');
    const VF = vextab.Vex.Flow
    const renderer = new VF.Renderer(output, VF.Renderer.Backends.SVG);
    const artist = new vextab.Artist(10, 10, 700, { scale: 0.8 });
    const tab = new vextab.VexTab(artist);
    tab.parse(html);
    artist.render(renderer);
    newOutput += value.substring(currentIndex, offset);
    newOutput += output.innerHTML+'\n';
    output.innerHTML = '';
    currentIndex = offset + match.length;
    return match;
}

value.replace(pattern, replaceCallback);

if (currentIndex < value.length) {
    newOutput += value.substring(currentIndex);
}
return newOutput;
}

function evaluate(value) {
value=value.replace(/  \n/g, '\n');

const pattern = /```shell([\s\S]*?)```/g;

let currentIndex = 0;
let output = '';

function replaceCallback(match, p1, offset) {
  const format = executeCode(match.replace(/```|shell/g, ''));
  output += value.substring(currentIndex, offset);
  output +=  format + '\n';
  currentIndex = offset + match.length;
  return match;
}

value.replace(pattern, replaceCallback);

if (currentIndex < value.length) {
  output += value.substring(currentIndex);
}

return output;
}

function executeCode(input) {
const lines = input.split('$');
var response;
for (let i = 0; i < lines.length; i++) {
const line = lines[i].trim();
if (line !== '') {
  try {
    const modifiedLine = line.replace(/(\b(?:sin|cos|tan|asin|acos|atan|atan2|sinh|cosh|tanh|exp|log|log2|log10|pow|sqrt|cbrt|ceil|hypot|trunc|floor|round|abs|min|max|random|PI|E|SQRT2|SQRT1_2|LN2|LN10|LOG2E|LOG10E)\b)(?=\(|)/g,'Math.$1');
    const codeFunction = new Function(`return ${modifiedLine};`);
    const result = codeFunction();
    if (result !== undefined) {
      response += `<em style="color:grey;">${line.trim()+'</em> ~ <strong style="color:#0000ffaa;">'+result}</strong>\n`;
    } else {
      response += `${line}\n`;
    }
  } catch (error) {
    response += `${line+' => '} Error!  ${error.message}\n`
  }
}
}
return '<pre style="background-color:#ffffffaa">'+response.replace(/undefined/g, '')+'</pre>'
}

function toggleDisplay(id) {
var element = document.getElementById(id);

if (element.style.display === 'none' || element.style.display === '') {
clsElements();
element.style.display = 'flex';
} else {
clsElements();
element.style.display = 'none';
}
}

function clsElements(){
var clsElements1 = document.querySelectorAll('.msgbutton-row');
var clsElements2= document.querySelectorAll('.msginfolist-column');

clsElements1.forEach(function (el) {
el.style.display = 'none';
})
clsElements2.forEach(function (el) {
  el.style.display = 'none';
});
}

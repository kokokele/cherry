const marked = require('./marked');
const babel = require('babel-core');
const renderer = new marked.Renderer();
const yamlFront = require('yaml-front-matter')

const highlightjs = require('highlight.js');


let res;
let id;

const oldCode = renderer.code;

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
	// explicitly match decimal, hex, and named HTML entities 
  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

renderer.code = (code, language, escaped) => {
    res = code;

    const validLang = !!(language && highlightjs.getLanguage(language));
    // Highlight only if the language is valid.
    const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
    // Render the highlighted code with `hljs` class.
    return `<div> <div id=${id}></div><pre><code class="hljs ${language}">${highlighted}</code></pre></div>`;
}

renderer.table = function (header, body) {
    return '<table class="table table-striped">'+header+body+'</table>'
}

renderer.list = function(body, ordered) {
    var type = ordered ? 'ol' : 'ul';
    var styles = ordered ? 'upper-roman' : 'disc';
    return '<' + type + ' style="padding-left:40px; list-style-type:'+ styles + ';" >\n' + body + '</' + type + '>\n';
}

function process(source) {
    source = marked(source, {
        renderer: renderer,
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
     });

    const res = JSON.stringify(source);
    return res;
}


module.exports = function(source, map){
    this.cacheable && this.cacheable();

    res = '';
    id = 'comp' + Math.random();
    const yaml = yamlFront.loadFront(source, 'content');
    //对source进行解析
    var md = process(yaml.content);
    res += `\n export const md=${md}; \n export const id="${id}";`
    console.log('----------------')
    console.log(res);
    console.log('--------------')

    this.callback(null, res, map);
    // return "module.exports = " + '{}';
}
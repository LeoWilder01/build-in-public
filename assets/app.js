'use strict';
const $ = selector => document.querySelector(selector);
const form = $('#filters'), query = $('#query');
const project = $('#project'), language = {value:'en'};
const status = $('#status'), container = $('#records');
const copy = {
  en: {subtitle:'Notes on building, learning, decisions, and completed work.',repository:'GitHub repository',search:'Search',date:'Date',project:'Project',context:'Context',reset:'Clear filters',placeholder:'Search notes, projects, or context',allProjects:'All projects',noProject:'No project',allContexts:'All contexts',unknown:'Context not established',empty:'No records yet.',noMatches:'No matching records.',count:n=>`${n} record${n===1?'':'s'}`,error:'Unable to load records. Please read them on GitHub.'},
  zh: {subtitle:'构建、学习、决定与完成的记录。',repository:'GitHub 仓库',search:'搜索',date:'日期',project:'项目',context:'讨论范围',reset:'清除筛选',placeholder:'搜索记录、项目或讨论范围',allProjects:'全部项目',noProject:'无项目',allContexts:'全部讨论范围',unknown:'尚未确定讨论范围',empty:'还没有记录。',noMatches:'没有符合筛选条件的记录。',count:n=>`${n} 条记录`,error:'记录加载失败，请通过 GitHub 仓库查看。'}
};
// The default URL is English; ?lang=zh is a shareable Chinese entry point.
language.value = new URL(location.href).searchParams.get('lang') === 'zh' ? 'zh' : 'en';
function appendText(element, text) {
  const pattern = /\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g;
  let start = 0;
  for (const match of text.matchAll(pattern)) {
    element.append(document.createTextNode(text.slice(start, match.index)));
    const link = document.createElement('a');
    link.textContent = match[1]; link.href = match[2]; element.append(link);
    start = match.index + match[0].length;
  }
  element.append(document.createTextNode(text.slice(start)));
}
try {
  const days = JSON.parse($('#archive').textContent);
  const contexts = JSON.parse($('#contexts').textContent);
  const projects = JSON.parse($('#projects').textContent);
  const entries = days.flatMap(day => day.entries.map(entry => ({...entry,date:day.date})));
  entries.sort((a,b)=>b.date.localeCompare(a.date));
  function path(key) {
    const chain = [], seen = new Set();
    while (key) {
      if (seen.has(key) || !contexts[key]) throw new Error('Invalid context hierarchy');
      seen.add(key); chain.unshift(key); key = contexts[key].parent;
    }
    return chain;
  }
  // Resolve once: ancestor filters include all descendant records.
  const paths = new Map(entries.map(e=>[e.context,path(e.context)]));
  const local = value => value[language.value];
  function configure() {
    const t=copy[language.value], previousProject=project.value;
    document.documentElement.lang=language.value==='zh'?'zh-CN':'en';
    for (const key of ['repository','reset']) $('#'+key).textContent=t[key];
    for (const key of ['search','project']) $('#'+key+'-label').textContent=t[key];
    query.placeholder=t.placeholder;
    document.querySelectorAll('[data-language]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.language===language.value)));
    project.replaceChildren(new Option(t.allProjects,''));
    for (const p of projects) project.add(new Option(p,p));
    project.add(new Option(t.noProject,'__none__'));
    project.value=previousProject;
    render();
  }
  let selectedDate = '';
  let expandedDates = false;
  const openFolders = new Map();
  const counts = new Map(days.map(d => [d.date, d.entries.length]));
  let year = Number(entries[0]?.date.slice(0,4) || new Date().getFullYear());
  const activity = $('#activity');
  function element(tag, text, className) {
    const node=document.createElement(tag); if(text!==undefined) node.textContent=text;
    if(className)node.className=className; return node;
  }
  function calendar() {
    const zh=language.value==='zh';
    $('.browse').classList.toggle('dates-expanded',expandedDates);
    activity.setAttribute('aria-label',zh?'记录日期':'Record dates');
    activity.replaceChildren();
    const head=element('div',undefined,'activity-head');
    if(expandedDates) {
    const years=[...new Set(entries.map(e=>e.date.slice(0,4)))].sort().reverse();
    const label=element('label',zh?'记录年份':'Record year');
    const select=element('select');
    for(const y of years)select.add(new Option(y,y));
    select.value=String(year); select.addEventListener('change',()=>{year=Number(select.value);calendar();});label.append(select);head.append(label);
    }
    const clear=element('button',zh?'全部日期':'All dates');clear.type='button';clear.hidden=!selectedDate;clear.setAttribute('aria-pressed',String(!selectedDate));
    clear.addEventListener('click',()=>{selectedDate='';render();});head.append(clear);
    const expand=element('button',expandedDates?(zh?'收起日期':'Less dates'):(zh?'所有日期':'All dates…'));expand.type='button';expand.setAttribute('aria-expanded',String(expandedDates));expand.addEventListener('click',()=>{expandedDates=!expandedDates;calendar();});head.append(expand);activity.append(head);
    if(!expandedDates) {
      const end=new Date(Math.max(Date.now(),...entries.map(e=>Date.parse(e.date+'T00:00:00Z'))));
      const last=Date.UTC(end.getUTCFullYear(),end.getUTCMonth(),end.getUTCDate());
      const start=last-((end.getUTCDay()+6)%7+12*7)*86400000;
      const grid=element('div',undefined,'activity-compact');
      for(let i=0;i<91;i++){const stamp=start+i*86400000,date=new Date(stamp).toISOString().slice(0,10),count=counts.get(date)||0;const button=element('button',undefined,'activity-day');button.type='button';button.disabled=!count||stamp>last;button.classList.toggle('dense',count>=10);button.setAttribute('aria-pressed',String(selectedDate===date));button.title=`${date} · ${copy[language.value].count(count)}`;button.setAttribute('aria-label',button.title);button.addEventListener('click',()=>{selectedDate=selectedDate===date?'':date;render();});grid.append(button);}
      activity.append(grid);return;
    }
    const months=element('div',undefined,'activity-months');
    for(let month=0;month<12;month++) {
      const section=element('section',undefined,'activity-month');
      section.append(element('h2',new Intl.DateTimeFormat(zh?'zh-CN':'en',{month:'short',timeZone:'UTC'}).format(new Date(Date.UTC(year,month,1)))));
      const grid=element('div',undefined,'activity-grid');
      for(let i=0;i<7;i++)grid.append(element('span',(zh?['一','二','三','四','五','六','日']:['M','T','W','T','F','S','S'])[i],'weekday'));
      const offset=(new Date(Date.UTC(year,month,1)).getUTCDay()+6)%7;
      for(let i=0;i<offset;i++)grid.append(element('span'));
      const last=new Date(Date.UTC(year,month+1,0)).getUTCDate();
      for(let day=1;day<=last;day++) {
        const date=`${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        const count=counts.get(date)||0;
        const button=element('button',day,'activity-day');button.type='button';button.disabled=!count;
        button.classList.toggle('dense',count>=10);button.setAttribute('aria-pressed',String(date===selectedDate));
        const name=`${date} · ${copy[language.value].count(count)}`;button.title=name;button.setAttribute('aria-label',name);
        button.addEventListener('click',()=>{selectedDate=selectedDate===date?'':date;render();});grid.append(button);
      }
      section.append(grid);months.append(section);
    }
    activity.append(months);
  }
  function render() {
    const t=copy[language.value], term=query.value.trim().toLocaleLowerCase();
    const matched=entries.filter(e=>{
      const chain=paths.get(e.context);
      // Topics deliberately do not participate in filtering, display, or search.
      const searchable=[e.title.en,e.title.zh,e.text.en,e.text.zh,e.project||'',...chain.flatMap(k=>[contexts[k].label.en,contexts[k].label.zh])].join(' ').toLocaleLowerCase();
      return (!selectedDate||e.date===selectedDate) &&
        (!project.value||(project.value==='__none__'?!e.project:e.project===project.value)) &&
        (!term||searchable.includes(term));
    });
    container.replaceChildren();
    status.textContent=!entries.length?t.empty:!matched.length?t.noMatches:t.count(matched.length);
    calendar();
    function record(entry,parent) {
      const article=element('article');article.append(element('h3',local(entry.title)));
      const body=element('p');appendText(body,local(entry.text));article.append(body);
      const meta=element('div',undefined,'metadata'),link=element('a',entry.date);
      link.href=`https://github.com/LeoWilder01/build-in-public/blob/main/records/${entry.date.slice(0,4)}/${entry.date}.md`;
      meta.append(link,element('span',entry.project||t.noProject));article.append(meta);parent.append(article);
    }
    function folder(key,parent) {
      const subset=matched.filter(e=>paths.get(e.context).includes(key));if(!subset.length)return;
      const details=element('details',undefined,'context-folder');details.open=openFolders.get(key)??true;
      const summary=element('summary');summary.append(element('span',local(contexts[key].label)),element('span',String(subset.length),'folder-count'));
      details.append(summary);
      const body=element('div',undefined,'folder-body');
      subset.filter(e=>e.context===key).forEach(e=>record(e,body));
      Object.keys(contexts).filter(k=>contexts[k].parent===key).forEach(k=>folder(k,body));
      details.append(body);details.addEventListener('toggle',()=>openFolders.set(key,details.open));parent.append(details);
    }
    Object.keys(contexts).filter(k=>!contexts[k].parent).forEach(k=>folder(k,container));
    matched.filter(e=>!e.context).forEach(e=>record(e,container));
  }
  document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>{
    language.value=button.dataset.language;
    const url=new URL(location.href);
    if(language.value==='zh')url.searchParams.set('lang','zh');else url.searchParams.delete('lang');
    history.replaceState(null,'',url);configure();
  }));
  form.addEventListener('submit',event=>event.preventDefault());
  form.addEventListener('input',render);form.addEventListener('change',render);
  form.addEventListener('reset',()=>{selectedDate='';setTimeout(render,0);});configure();
} catch(error) {status.textContent=copy[language.value].error;console.error(error);}

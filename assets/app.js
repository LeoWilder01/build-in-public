'use strict';
const form = document.querySelector('#filters');
const query = document.querySelector('#query');
const date = document.querySelector('#date');
const project = document.querySelector('#project');
const topic = document.querySelector('#topic');
const status = document.querySelector('#status');
const container = document.querySelector('#records');

// Text is always inserted as text, with only explicit HTTPS Markdown links enabled.
function appendText(element, text) {
  const pattern = /\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g;
  let start = 0;
  for (const match of text.matchAll(pattern)) {
    element.append(document.createTextNode(text.slice(start, match.index)));
    const link = document.createElement('a');
    link.textContent = match[1];
    link.href = match[2];
    element.append(link);
    start = match.index + match[0].length;
  }
  element.append(document.createTextNode(text.slice(start)));
}

try {
  const days = JSON.parse(document.querySelector('#archive').textContent);
  const entries = days.flatMap(day => day.entries.map(entry => ({ ...entry, date: day.date })));
  entries.sort((a, b) => b.date.localeCompare(a.date));
  for (const [select, values] of [
    [project, entries.map(e => e.project).filter(Boolean)],
    [topic, entries.flatMap(e => e.topics)]
  ]) {
    for (const value of [...new Set(values)].sort()) select.add(new Option(value, value));
  }
  if (entries.some(e => !e.project)) project.add(new Option('无项目', '__none__'));

  function render() {
    const term = query.value.trim().toLocaleLowerCase();
    const matched = entries.filter(e =>
      (!date.value || e.date === date.value) &&
      (!project.value || (project.value === '__none__' ? !e.project : e.project === project.value)) &&
      (!topic.value || e.topics.includes(topic.value)) &&
      (!term || [e.text, e.project || '', ...e.topics].join(' ').toLocaleLowerCase().includes(term))
    );
    container.replaceChildren();
    status.textContent = !entries.length ? '还没有记录。' : !matched.length ? '没有符合筛选条件的记录。' : `${matched.length} 条记录`;
    let previousDate;
    for (const entry of matched) {
      if (entry.date !== previousDate) {
        const heading = document.createElement('h2');
        const link = document.createElement('a');
        link.href = `https://github.com/LeoWilder01/build-in-public/blob/main/records/${entry.date.slice(0, 4)}/${entry.date}.md`;
        link.textContent = entry.date;
        heading.append(link);
        container.append(heading);
        previousDate = entry.date;
      }
      const article = document.createElement('article');
      const body = document.createElement('p');
      appendText(body, entry.text);
      const metadata = document.createElement('div');
      metadata.className = 'metadata';
      for (const text of [entry.project ? `项目：${entry.project}` : '', entry.topics.length ? `主题：${entry.topics.join('、')}` : ''].filter(Boolean)) {
        const span = document.createElement('span');
        span.textContent = text;
        metadata.append(span);
      }
      article.append(body, metadata);
      container.append(article);
    }
  }
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('input', render);
  form.addEventListener('change', render);
  form.addEventListener('reset', () => setTimeout(render, 0));
  render();
} catch (error) {
  status.textContent = '记录加载失败，请通过 GitHub 仓库查看。';
  console.error(error);
}

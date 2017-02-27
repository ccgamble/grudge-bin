template = (grudge) => {
  return `<li><a
  href="/api/grudges/${grudge.id}" class="indvidual-name" id="${grudge.id}">
  ${grudge.data.name}
  </a></li>`;
}
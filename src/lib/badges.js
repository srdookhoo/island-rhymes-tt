// T&T flora & fauna themed reading badges.
// Book badges are assigned by the book's position in the series (sort_order);
// collection badges are earned by finishing every book in an age group, or the whole series.

export const SPECIES = [
  { name: 'Scarlet Ibis', emoji: '🦩', color: '#E23B3B', fact: 'The national bird, bright as a sunset.' },
  { name: 'Cocrico', emoji: '🐓', color: '#8B5A3C', fact: "Tobago's chatty forest bird." },
  { name: 'Blue Morpho', emoji: '🦋', color: '#3B7CE2', fact: 'A butterfly that shimmers through the rainforest.' },
  { name: 'Leatherback Turtle', emoji: '🐢', color: '#2E7D5B', fact: 'Gentle giant of the Grand Rivière.' },
  { name: 'Hummingbird', emoji: '🐦', color: '#1B9E6B', fact: 'A tiny jewel that hovers on the breeze.' },
  { name: 'Pink Poui', emoji: '🌸', color: '#E77BCA', fact: 'Trees that burst into bloom each dry season.' },
  { name: 'Samaan Tree', emoji: '🌳', color: '#3F6B3A', fact: 'The great umbrella tree of the savannah.' },
  { name: 'Heliconia', emoji: '🌺', color: '#E8852B', fact: 'Wild plantain that nods in the trade winds.' },
  { name: 'Blue-and-yellow Macaw', emoji: '🦜', color: '#2B6CB0', fact: 'A bright parrot of the forest canopy.' },
  { name: 'Green Iguana', emoji: '🦎', color: '#5BA84B', fact: 'Sun-basking dragon of the garden wall.' },
  { name: 'Chaconia', emoji: '🏵️', color: '#D7263D', fact: 'The wild poinciana, national flower of T&T.' },
  { name: 'West Indian Manatee', emoji: '🦭', color: '#7A8B99', fact: 'The gentle sea-cow of the Nariva swamp.' },
];

export const COLLECTION_BADGES = [
  { id: 'collection:infants', kind: 'collection', name: 'Infants Bloom', emoji: '🌱', color: '#F26B8A', blurb: 'You read every Infant tale!' },
  { id: 'collection:toddlers', kind: 'collection', name: 'Toddler Bloom', emoji: '🌼', color: '#E8B84B', blurb: 'You read every Toddler tale!' },
  { id: 'collection:young_children', kind: 'collection', name: 'Young Reader Bloom', emoji: '🌻', color: '#E8772B', blurb: 'You read every Young Reader tale!' },
  { id: 'collection:all', kind: 'collection', name: 'Island Storyteller', emoji: '🌟', color: '#E8B84B', blurb: 'You read the whole collection!' },
];

export function sortedBooks(books) {
  return [...(books || [])].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
}

export function bookBadge(book, index) {
  const species = SPECIES[index % SPECIES.length];
  return {
    id: `book:${book.ebook_id}`,
    kind: 'book',
    ebook_id: book.ebook_id,
    emoji: species.emoji,
    color: species.color,
    name: species.name,
    subtitle: book.title,
    blurb: species.fact,
  };
}

export function allBookBadges(books) {
  return sortedBooks(books).map((b, i) => bookBadge(b, i));
}

export function allBadges(books) {
  return [...allBookBadges(books), ...COLLECTION_BADGES];
}

export function evaluateEarned(books, finishedSet) {
  const earned = new Set();
  const sorted = sortedBooks(books);
  sorted.forEach((b) => {
    if (finishedSet.has(b.ebook_id)) earned.add(`book:${b.ebook_id}`);
  });
  ['infants', 'toddlers', 'young_children'].forEach((g) => {
    const inGroup = sorted.filter((b) => b.age_group === g);
    if (inGroup.length > 0 && inGroup.every((b) => finishedSet.has(b.ebook_id))) {
      earned.add(`collection:${g}`);
    }
  });
  if (sorted.length > 0 && sorted.every((b) => finishedSet.has(b.ebook_id))) {
    earned.add('collection:all');
  }
  return earned;
}
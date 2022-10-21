class Record {
  constructor(id, artist, album, price, genre, stock, image, typeOfProduct) {
    this.id = id;
    this.artist = artist;
    this.album = album;
    this.price = price;
    this.genre = genre;
    this.stock = stock;
    this.image = image;
    this.typeOfProduct = typeOfProduct;
  }
}

const myVinyls = [];

myVinyls.push(new Record(
  1,
  "The Ramones",
  "Road To Ruin (Vinyl)",
  24.99,
  "Punk",
  20,
  "./images/productos/ramones-roadtoruin.avif",
  "Vinyl"
));

myVinyls.push(new Record(
  2,
  "The Clash",
  "Combat Rock (Vinyl)",
  28.99,
  "Punk, Rock",
  20,
  "./images/productos/theclash-combatrock.avif",
  "Vinyl"
));

myVinyls.push(new Record(
  3,
  "The Specials",
  "The Specials (Vinyl)",
  19.99,
  "Ska",
  15,
  "./images/productos/thespecials-.avif",
  "Vinyl"
));

myVinyls.push(new Record(
  4,
  "The Strokes",
  "New Abnormal (Vinyl)",
  30.99,
  "Indie Rock",
  10,
  "./images/productos/thestrokes-thenewabnormal.avif",
  "Vinyl"
));

myVinyls.push(new Record(
  5,
  "Brian Fallon",
  "Sleepwalkers (Double Vinyl)",
  34.99,
  "Acoustic",
  10,
  "./images/productos/brian-fallon-sleepwalkers.avif",
  "Vinyl"
));

myVinyls.push(new Record(
  6,
  "The Velvet Underground",
  "Velvet Underground & Nico (Vinyl)",
  33.99,
  "Pop",
  10,
  "./images/productos/velvetunderground-nicoavif.avif",
  "Vinyl"
));

myVinyls.push(new Record(
  7,
  "The Gaslight Anthem",
  "Handwritten (Vinyl)",
  27.99,
  "Alternative Rock",
  10,
  "./images/productos/the-gaslight-anthem-handwritten.avif",
  "Vinyl"
));

myVinyls.push(new Record(
  8,
  "Rocky Votolato",
  "Television Of Saints (Vinyl)",
  23.99,
  "Acoustic",
  10,
  "./images/productos/rocky-votolato-television-of-saints.avif",
  "Vinyl"
));
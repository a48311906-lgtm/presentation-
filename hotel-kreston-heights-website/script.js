const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');
const hotelDialog = document.querySelector('#hotel-dialog');
const mainImage = document.querySelector('#modal-main-image');
const thumbnails = document.querySelector('#modal-thumbnails');
const photoCount = document.querySelector('#photo-count');
const modalName = document.querySelector('#modal-hotel-name');
const modalCity = document.querySelector('#modal-hotel-city');
const modalAddress = document.querySelector('#modal-hotel-address');
const modalTariff = document.querySelector('#modal-hotel-tariff');
const modalTariffNote = document.querySelector('#modal-tariff-note');
const modalTariffTable = document.querySelector('#modal-tariff-table');
const modalTariffBody = document.querySelector('#modal-tariff-body');
const modalGalleryTitle = document.querySelector('#modal-gallery-title');
const modalRoomTypes = document.querySelector('#modal-room-types');
const modalRoomList = document.querySelector('#modal-room-list');
const modalWhatsApp = document.querySelector('#modal-whatsapp');
const closeModal = document.querySelector('#modal-close');
const previousPhoto = document.querySelector('#previous-photo');
const nextPhoto = document.querySelector('#next-photo');

// NOTE: photo URLs below are stock placeholders (see README) — swap in real
// property photos before publishing. Keeping the same array length and order
// per hotel is all that's needed; the gallery, thumbnails and tariff panel
// all read from this single object.
const hotels = {
  bhopal: {
    name: 'Kreston Heights Hotel Bhopal',
    city: 'Bhopal',
    address: 'Plot No. E-20, Raisen Road, Manak Vihar, Patel Nagar, Bhopal – 462022',
    tariff: 'From ₹3,000 / night',
    rooms: ['Suite', 'Executive'],
    galleryLabel: 'Hotel gallery',
    tariffs: [
      { room: 'Executive', ep: '₹3,000', cp: '₹3,500', map: '₹4,500', ap: '–' },
      { room: 'Suite', ep: '₹5,000', cp: '₹5,500', map: '₹6,500', ap: '–' }
    ],
    photos: [
      'images/bhopal-room-1.jpeg',
      'images/bhopal-room-2.jpeg',
      'images/bhopal-room-3.jpeg',
      'images/bhopal-room-4.jpeg',
      'images/bhopal-suite-1.jpeg',
      'images/bhopal-seating-1.jpeg',
      'images/bhopal-bathroom-1.jpeg',
      'images/bhopal-dining-1.jpeg',
      'images/bhopal-lounge-1.jpeg',
      'images/bhopal-amenities-1.jpeg'
    ]
  },
  indore78: {
    name: 'Kreston Heights Hotel Indore Sch No. 78',
    city: 'Indore',
    address: 'Plot No. 4 F/D/S-3, Scheme No. 78, Aranya Nagar, behind Sky Corporate, Vijay Nagar, Indore – 452010',
    tariff: 'From ₹1,400 / night',
    rooms: ['Executive', 'Deluxe'],
    galleryLabel: 'Hotel gallery',
    tariffs: [
      { room: 'Executive', ep: '₹1,600', cp: '₹2,000', map: '₹2,500', ap: '₹3,000' },
      { room: 'Deluxe', ep: '₹1,400', cp: '₹1,800', map: '₹2,200', ap: '₹2,800' }
    ],
    photos: [
      'images/indore78-room-1.jpeg',
      'images/indore78-room-2.jpeg',
      'images/indore78-room-3.jpeg',
      'images/indore78-room-4.jpeg',
      'images/indore78-dining-1.jpeg',
      'images/indore78-dining-2.jpeg',
      'images/indore78-dining-3.jpeg',
      'images/indore78-dining-4.jpeg',
      'images/indore78-dining-5.jpeg',
      'images/indore78-dining-6.jpeg'
    ]
  }
};

let selectedHotel;
let selectedPhoto = 0;
let lastTrigger;

function renderPhoto(index) {
  selectedPhoto = (index + selectedHotel.photos.length) % selectedHotel.photos.length;
  mainImage.src = selectedHotel.photos[selectedPhoto];
  mainImage.alt = `${selectedHotel.name}, photo ${selectedPhoto + 1}`;
  photoCount.textContent = `Photo ${selectedPhoto + 1} of ${selectedHotel.photos.length}`;
  thumbnails.querySelectorAll('button').forEach((button, buttonIndex) => {
    button.setAttribute('aria-current', buttonIndex === selectedPhoto ? 'true' : 'false');
  });
}

function showHotel(hotelId, trigger) {
  selectedHotel = hotels[hotelId];
  lastTrigger = trigger;
  modalName.textContent = selectedHotel.name;
  modalCity.textContent = selectedHotel.city;
  modalAddress.textContent = selectedHotel.address;
  modalTariff.textContent = selectedHotel.tariff;
  modalTariffTable.hidden = !selectedHotel.tariffs;
  modalTariffNote.textContent = !selectedHotel.tariffs
    ? 'Tariffs depend on travel dates, room type and availability.'
    : selectedHotel.isPlaceholderTariff
      ? 'Sample rates shown — confirm before publishing. Per room, per night.'
      : 'Tariff per room, per night.';
  modalTariffBody.innerHTML = '';
  selectedHotel.tariffs?.forEach((rate) => {
    const row = document.createElement('tr');
    [rate.room, rate.ep, rate.cp, rate.map, rate.ap].forEach((value) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.append(cell);
    });
    modalTariffBody.append(row);
  });
  modalGalleryTitle.textContent = selectedHotel.galleryLabel || 'Hotel gallery';
  modalRoomTypes.hidden = !selectedHotel.rooms;
  modalRoomList.innerHTML = '';
  selectedHotel.rooms?.forEach((room) => {
    const roomType = document.createElement('span');
    roomType.textContent = room;
    modalRoomList.append(roomType);
  });
  modalWhatsApp.href = `https://wa.me/917566697754?text=${encodeURIComponent(`Hello Kreston Heights, I would like to know the tariff for ${selectedHotel.name}.`)}`;
  thumbnails.innerHTML = '';
  selectedHotel.photos.forEach((photo, index) => {
    const thumbnail = document.createElement('button');
    thumbnail.type = 'button';
    thumbnail.setAttribute('aria-label', `Show photo ${index + 1}`);
    const image = document.createElement('img');
    image.src = photo;
    image.alt = '';
    thumbnail.append(image);
    thumbnail.addEventListener('click', () => renderPhoto(index));
    thumbnails.append(thumbnail);
  });
  renderPhoto(0);
  hotelDialog.showModal();
}

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.property-open').forEach((button) => {
  button.addEventListener('click', () => showHotel(button.dataset.hotel, button));
});

const compareTabs = document.querySelectorAll('.compare-tab');
compareTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    compareTabs.forEach((otherTab) => otherTab.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');
    document.querySelectorAll('.compare-panel').forEach((panel) => {
      panel.hidden = panel.id !== `compare-panel-${tab.dataset.hotel}`;
    });
  });
});

previousPhoto.addEventListener('click', () => renderPhoto(selectedPhoto - 1));
nextPhoto.addEventListener('click', () => renderPhoto(selectedPhoto + 1));
closeModal.addEventListener('click', () => hotelDialog.close());
hotelDialog.addEventListener('click', (event) => {
  if (event.target === hotelDialog) hotelDialog.close();
});
hotelDialog.addEventListener('close', () => lastTrigger?.focus());
document.addEventListener('keydown', (event) => {
  if (!hotelDialog.open) return;
  if (event.key === 'ArrowLeft') renderPhoto(selectedPhoto - 1);
  if (event.key === 'ArrowRight') renderPhoto(selectedPhoto + 1);
});

import index from '../components/_constructor';
import reactDom from 'react-dom';
export default async function lightboxHandler(box) {
  let rut = document.getElementById('lightbox__content');

  reactDom.render(<index.Lightbox box={box} />, rut);
  window.localStorage.setItem('lightroom', 'true');
}

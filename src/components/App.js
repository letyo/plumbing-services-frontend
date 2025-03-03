import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';
import Section from './Section'; // Import the updated Section component
import Modal from './Modal';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleScroll = (id, e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    service: '',
    address: '',
    desiredTime: new Date(),
  });

  const services = [
    'Tap Replacement',
    'Tap Installation',
    'Plumbing',
    'Pipe Fitting',
    'Boiler Replacement',
    'Heating System Installation',
    'Other',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      desiredTime: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format the date as YYYY-MM-DD
    const formattedDate = formData.desiredTime.toISOString().split('T')[0];

    try {
      const response = await fetch('http://localhost:5000/send-message', { // ide lehet csak send-message kene !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          desiredTime: formattedDate,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setModalMessage('Message sent successfully!');
      } else {
        setModalMessage('An error occurred while sending the message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setModalMessage('An error occurred while sending the message.');
    } finally {
      setIsModalOpen(true); // Open the modal
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      <header>
        <h1>Tap Replacement and Repair Services</h1>
      </header>

      <nav>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <a href="#mainServices" onClick={(e) => handleScroll('mainServices', e)}>
              Main Services
            </a>
          </li>
          <li>
            <a href="#sideServices" onClick={(e) => handleScroll('sideServices', e)}>
              Additional Services
            </a>
          </li>
          <li>
            <a href="#prices" onClick={(e) => handleScroll('prices', e)}>
              Prices
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => handleScroll('contact', e)}>
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Modal for messages */}
      <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />

      <Section id="mainServices" title="Main Services">
        <article>
          <img src="./images/csapcsere.jpg" alt="Tap Replacement" />
          <div>
            <h2>Tap Replacement</h2>
            <p>Our tap replacement service ensures that experienced professionals quickly and professionally remove old, worn-out taps and install new, modern ones. Whether it's a kitchen or bathroom tap, we guarantee precise work and long-term reliability.</p>
            <p>Price: 50 €</p>
          </div>
        </article>
        <article>
          <img src="./images/csap-felszereles.jpg" alt="Tap Installation" />
          <div>
            <h2>Tap Installation</h2>
            <p>Planning to install a new tap? Our service includes professional tap installation for renovations or new constructions.</p>
            <p>Price: 40 €</p>
          </div>
        </article>
      </Section>

      {/* Additional Services Section */}
      <Section id="sideServices" title="Additional Services">
        <article>
          <img src="./images/vizvezetek-szereles.jpg" alt="Plumbing" />
          <div>
            <h2>Plumbing</h2>
            <p>We provide plumbing repairs, replacements, and new system installations to ensure your home's water system functions efficiently.</p>
          </div>
        </article>
        <article>
          <img src="./images/csoszereles.jpg" alt="Pipe Fitting" />
          <div>
            <h2>Pipe Fitting</h2>
            <p>We offer complete pipe fitting services, including repairs, replacements, and installations for new buildings or renovations.</p>
          </div>
        </article>
        <article>
          <img src="./images/kazancsere.jpg" alt="Boiler Replacement" />
          <div>
            <h2>Boiler Replacement</h2>
            <p>If your old boiler is inefficient, our boiler replacement service ensures safe and energy-efficient heating.</p>
          </div>
        </article>
      </Section>

      {/* Pricing Section */}
      <Section id="prices" title="Our Prices">
        <p>Tap Replacement: 50 €</p>
        <p>Tap Installation: 40 €</p>
        <p>Other service prices vary depending on the complexity of the work. Contact us for a quote!</p>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="Contact">
        <p>Call us or fill out the form, and we will get back to you within 24 hours!</p>
        <p>Phone: +43 660 123 4567</p>
         <form onSubmit={handleSubmit}>
           <div className="form-group">
             <label htmlFor="firstName">First Name:</label>
             <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="service">Service:</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Please choose a service</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="desiredTime">Desired Date:</label>
            <DatePicker
              id="desiredTime"
              selected={formData.desiredTime}
              onChange={handleDateChange}
              dateFormat="dd-MM-yyyy"
              required
            />
          </div>
          <button type="submit">Send</button>
        </form>
      </Section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Tap Replacement and Repair Services</p>
      </footer>
    </div>
  );
}

export default App;


// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import './styles.css';
// import Section from './Section'; // Import the updated Section component
// import Modal from './Modal';

// function App() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');

//   const handleScroll = (id, e) => {
//     if (e.target.tagName === 'A') {
//       e.preventDefault();
//       const element = document.getElementById(id);
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }
//       setIsMenuOpen(false);
//     }
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     phoneNumber: '',
//     service: '',
//     address: '',
//     desiredTime: new Date(),
//   });

//   const services = [
//     'Csapcsere',
//     'Csap felszerelés',
//     'Vízvezeték szerelés',
//     'Csőszerelés',
//     'Kazáncsere',
//     'Fűtés kiépítés',
//     'Egyéb',
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleDateChange = (date) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       desiredTime: date,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Format the date as YYYY-MM-DD
//     const formattedDate = formData.desiredTime.toISOString().split('T')[0];

//     try {
//       const response = await fetch('http://localhost:5000/send-message', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           desiredTime: formattedDate,
//         }),
//       });

//       const result = await response.json();
//       if (result.success) {
//         setModalMessage('Üzenet sikeresen elküldve!');
//       } else {
//         setModalMessage('Hiba történt az üzenet küldése közben.');
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setModalMessage('Hiba történt az üzenet küldése közben.');
//     } finally {
//       setIsModalOpen(true); // Open the modal
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false); // Close the modal
//   };

//   return (
//     <div>
//       <header>
//         <h1>Csapcsere és Javítás Szolgáltatások</h1>
//       </header>

//       <nav>
//         <div className="menu-icon" onClick={toggleMenu}>
//           <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
//           <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
//           <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
//         </div>
//         <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
//           <li>
//             <a href="#mainServices" onClick={(e) => handleScroll('mainServices', e)}>
//               Fő Szolgáltatásaink
//             </a>
//           </li>
//           <li>
//             <a href="#sideServices" onClick={(e) => handleScroll('sideServices', e)}>
//               További Szolgáltatásaink
//             </a>
//           </li>
//           <li>
//             <a href="#prices" onClick={(e) => handleScroll('prices', e)}>
//               Árak
//             </a>
//           </li>
//           <li>
//             <a href="#contact" onClick={(e) => handleScroll('contact', e)}>
//               Kapcsolat
//             </a>
//           </li>
//         </ul>
//       </nav>

//       {/* Modal for messages */}
//       <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />

//       <Section id="mainServices" title="Fő Szolgáltatásaink">
//         <article>
//           <img src="./images/csapcsere.jpg" alt="Csapcsere" />
//           <div>
//             <h2>Csapcsere</h2>
//             <p>A csapcsere szolgáltatásunk keretében tapasztalt szakembereink gyorsan és szakszerűen eltávolítják a régi, elhasználódott csaptelepeket, és helyükre új, modern csapokat szerelnek fel. Legyen szó konyhai vagy fürdőszobai csaptelepről, garantáljuk a precíz munkavégzést és a hosszú távú megbízhatóságot. A rendszeres csapcsere nemcsak az esztétika javítása miatt fontos, hanem a vízszivárgások és egyéb problémák megelőzése érdekében is. Budapesten és környékén állunk rendelkezésére, hogy otthonában biztosítsuk a zavartalan vízellátást.</p>
//             <p>Ár: 15.000 Ft</p>
//           </div>
//         </article>
//         <article>
//           <img src="./images/csap-felszereles.jpg" alt="Csap felszerelés" />
//           <div>
//             <h2>Csap felszerelés</h2>
//             <p>Új csaptelep felszerelését tervezi? Szolgáltatásunk magában foglalja a csapok szakszerű telepítését, legyen szó felújításról vagy új építésről. Segítünk kiválasztani az Ön igényeinek és otthona stílusának legmegfelelőbb csaptelepet, majd gondoskodunk annak precíz beszereléséről. A megfelelő csap felszerelés nemcsak a kényelem, hanem a víztakarékosság szempontjából is kiemelkedő jelentőségű. Budapesti csapatunk készséggel áll rendelkezésére, hogy biztosítsa a csapok megfelelő működését és hosszú élettartamát.</p>
//             <p>Ár: 13.000 Ft</p>
//           </div>
//         </article>
//       </Section>

//       {/* Additional Services Section */}
//       <Section id="sideServices" title="További Szolgáltatásaink">
//         <article>
//           <img src="./images/vizvezetek-szereles.jpg" alt="Vízvezeték szerelés" />
//           <div>
//             <h2>Vízvezeték szerelés</h2>
//             <p>A vízvezeték rendszer megfelelő működése elengedhetetlen otthona komfortja és biztonsága szempontjából. Szolgáltatásaink közé tartozik a vízvezetékek javítása, cseréje és új rendszerek kiépítése. Legyen szó csőtörésről, szivárgásról vagy új vízvezeték rendszer telepítéséről, tapasztalt szakembereink gyors és hatékony megoldást nyújtanak. Budapesten és környékén vállaljuk a vízvezeték szerelési munkákat, garantálva a magas színvonalú szolgáltatást és a tartós eredményeket.</p>
//           </div>
//         </article>
//         <article>
//           <img src="./images/csoszereles.jpg" alt="Csőszerelés" />
//           <div>
//             <h2>Csőszerelés</h2>
//             <p>A csőszerelés területén teljes körű szolgáltatást nyújtunk, beleértve a csövek javítását, cseréjét és új csőhálózatok kiépítését. Akár régi, elavult csövek cseréjéről, akár új épület csőhálózatának telepítéséről van szó, szakembereink precíz és megbízható munkát végeznek. A megfelelő csőszerelés biztosítja a víz- és fűtési rendszerek hatékony és biztonságos működését. Budapesti szolgáltatásunk célja, hogy ügyfeleink számára hosszú távú megoldásokat kínáljunk a csőszerelési feladatok terén.</p>
//           </div>
//         </article>
//         <article>
//           <img src="./images/kazancsere.jpg" alt="Kazáncsere" />
//           <div>
//             <h2>Kazáncsere</h2>
//             <p>A kazán az otthon fűtési rendszerének szíve, ezért elengedhetetlen a megfelelő működése. Ha régi kazánja már nem működik hatékonyan vagy gyakori meghibásodásokkal küzd, érdemes fontolóra venni a kazáncserét. Szolgáltatásunk magában foglalja a régi kazán szakszerű leszerelését és az új, energiatakarékos kazán telepítését. Ezzel nemcsak a fűtési rendszer megbízhatóságát növelheti, hanem jelentős energiamegtakarítást is elérhet. Budapesten és környékén vállaljuk a kazáncserét, biztosítva a fűtési rendszer zavartalan működését.</p>
//           </div>
//         </article>
//         <article>
//           <img src="./images/futes-kiepites.jpg" alt="Fűtés kiépítés" />
//           <div>
//             <h2>Fűtés kiépítés</h2>
//             <p>Az optimális fűtési rendszer kialakítása kulcsfontosságú az otthon kényelme és energiahatékonysága szempontjából. Szolgáltatásunk keretében vállaljuk új fűtési rendszerek tervezését és telepítését, valamint meglévő rendszerek korszerűsítését. Legyen szó padlófűtésről, radiátoros rendszerről vagy egyéb fűtési megoldásról, szakembereink segítenek megtalálni az Ön igényeinek legmegfelelőbb megoldást. Budapesti csapatunk célja, hogy energiatakarékos és megbízható fűtési rendszereket hozzon létre ügyfeleink számára.</p>
//           </div>
//         </article>
//       </Section>

//       {/* Pricing Section */}
//       <Section id="prices" title="Áraink">
//         <p>Csapcsere: 15.000 Ft</p>
//         <p>Csap felszerelés: 13.000 Ft</p>
//         <p>A többi szolgáltatásunk ára a munka jellegétől és terjedelmétől függően változik. Kérjük, vegye fel velünk a kapcsolatot egyedi árajánlatért!</p>
//       </Section>

//       {/* Contact Section */}
//       <Section id="contact" title="Kapcsolat">
//         <p>Hívjon minket telefonon vagy töltse ki az űrlapot, és 24 órán belül felvesszük Önnel a kapcsolatot!</p>
//         <p>Telefonszám: +36 30 123 4567</p>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="firstName">Keresztnév:</label>
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="lastName">Vezetéknév:</label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="phoneNumber">Telefonszám:</label>
//             <input
//               type="tel"
//               id="phoneNumber"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="service">Szolgáltatás:</label>
//             <select
//               id="service"
//               name="service"
//               value={formData.service}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Válasszon egy szolgáltatást</option>
//               {services.map((service) => (
//                 <option key={service} value={service}>
//                   {service}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="address">Cím:</label>
//             <input
//               type="text"
//               id="address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="desiredTime">Kívánt időpont:</label>
//             <DatePicker
//               id="desiredTime"
//               selected={formData.desiredTime}
//               onChange={handleDateChange}
//               dateFormat="yyyy-MM-dd" // Format: YYYY-MM-DD
//               required
//             />
//           </div>
//           <button type="submit">Küldés</button>
//         </form>
//       </Section>

//       {/* Footer */}
//       <footer>
//         <p>&copy; 2025 Csapcsere és Javítás Szolgáltatások</p>
//       </footer>
//     </div>
//   );
// }

// export default App;
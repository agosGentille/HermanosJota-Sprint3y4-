import React from "react";
import "../styles/Contacto.css";
import ContactForm from "../components/ContactForm";

function App() {
  return (
    <div>
      <main class="principal">
        <h1 class="contacto__titulo">Nuestra Historia</h1>
        <div class="nuestra-historia">
          <p className="nuestra-historia__texto">
            En{" "}
            <span className="nuestra-historia__texto__resaltar">
              Hermanos Jota
            </span>{" "}
            creemos que un mueble no es solo un objeto, sino{" "}
            <span className="nuestra-historia__texto__resaltar">
              una parte esencial de la vida cotidiana
            </span>
            . Desde nuestros comienzos, hemos trabajado para{" "}
            <span className="nuestra-historia__texto__resaltar">
              redescubrir el arte de la carpintería
            </span>
            , creando piezas que{" "}
            <span className="nuestra-historia__texto__resaltar">
              trascienden su función
            </span>{" "}
            y transmiten calidez, historia y carácter.
          </p>

          <br />

          <p className="nuestra-historia__texto">
            Cada diseño surge del{" "}
            <span className="nuestra-historia__texto__resaltar">
              encuentro entre herencia e innovación
            </span>
            . Honramos las técnicas tradicionales que nos identifican, mientras
            exploramos{" "}
            <span className="nuestra-historia__texto__resaltar">
              nuevas formas y líneas modernas
            </span>{" "}
            que mantienen la esencia artesanal. Usamos{" "}
            <span className="nuestra-historia__texto__resaltar">
              maderas nobles de origen responsable
            </span>
            , acabados naturales y procesos que reflejan nuestro{" "}
            <span className="nuestra-historia__texto__resaltar">
              compromiso con la sustentabilidad
            </span>
            .
          </p>

          <br />

          <p className="nuestra-historia__texto">
            Con más de{" "}
            <span className="nuestra-historia__texto__resaltar">
              30 años de tradición
            </span>
            , acompañamos a nuestros clientes en la construcción de hogares
            llenos de identidad. Cada pieza de{" "}
            <span className="nuestra-historia__texto__resaltar">
              Hermanos Jota
            </span>{" "}
            está pensada para{" "}
            <span className="nuestra-historia__texto__resaltar">
              envejecer con gracia
            </span>
            , convertirse en parte de tu historia y ofrecerte un{" "}
            <span className="nuestra-historia__texto__resaltar">
              legado que trasciende generaciones
            </span>
            .
          </p>

          <br />
          <h2 class="nuestra-historia__texto__subtitulo">
            Video Institucional - Hermanos Jota
          </h2>
          <video poster="Images/logo.svg" preload="metadata" controls>
            <source
              src="Videos/Video-institucional-Hermanos-Jota.mp4"
              type="video/mp4"
            />
            <source
              src="Videos/Video institucional Hermanos Jota.webm"
              type="video/webm"
            />
            <img src="Images/exclamation.png" alt="Video no soportado" />
            Tu navegador no soporta el elemento video.
          </video>
        </div>

        <h1 class="contacto__titulo" id="contacto-form">
          Haga una pregunta
        </h1>
        <div class="contacto">
          <ContactForm />
        </div>

        <h1 class="contacto__titulo">Contacto Digital</h1>
        <div class="contacto-digital">
          <table class="contacto-digital__tabla">
            <tbody>
              <tr>
                <td class="contacto-digital__tabla__elemento-izquierdo">
                  Email general
                </td>
                <td>
                  <a href="mailto:info@hermanosjota.com.ar">
                    info@hermanosjota.com.ar
                  </a>
                </td>
              </tr>
              <tr>
                <td class="contacto-digital__tabla__elemento-izquierdo">
                  Ventas
                </td>
                <td>
                  <a href="mailto:ventas@hermanosjota.com.ar">
                    ventas@hermanosjota.com.ar
                  </a>
                </td>
              </tr>
              <tr>
                <td class="contacto-digital__tabla__elemento-izquierdo">
                  Instagram
                </td>
                <td>
                  <a
                    href="https://www.instagram.com/hermanosjota_ba"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @hermanosjota_ba
                  </a>
                </td>
              </tr>
              <tr>
                <td class="contacto-digital__tabla__elemento-izquierdo">
                  WhatsApp
                </td>
                <td>
                  <a
                    href="https://wa.me/5491145678900"
                    target="_blank"
                    rel="noreferrer"
                  >
                    +54 11 4567-8900
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;

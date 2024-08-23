
const Footer = () => {

  const dev: string = "Juan Sebastian Medina Toro";
  const linkedin: string = "https://www.linkedin.com/in/juan-sebastian-medina-toro-887491249/";

  return (
    <>
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            InstrumentsLA - Todos los derechos Reservados
          </p>
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            <b>Desarrollado por:</b> 
            <a target="_blank" href={linkedin}> { dev } </a>
          </p>
        </div>
      </footer>
    </>
  );

}

export default Footer


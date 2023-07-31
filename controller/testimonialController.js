import { Testimonial } from "../models/testimoniales.js";

const guardarTestimonial = async (req, res) => {
  console.log(req.body);

  const { nombre, correo, mensaje } = req.body;

  const errores = [];

  if (nombre.trim() === "") {
    errores.push({ mensaje: "Nombre está vacio" });
  }
  if (correo.trim() === "") {
    errores.push({ mensaje: "Correo está vacio" });
  }
  if (mensaje.trim() === "") {
    errores.push({ mensaje: "Mensaje está vacio" });
  }

  const testimoniales = await Testimonial.findAll();

  if (errores.length > 0) {
    res.render("testimoniales", {
      pagina: "Testimoniales",
      errores,
      nombre,
      correo,
      mensaje,
      testimoniales,
    });
  } else {
    try {
      await Testimonial.create({
        nombre,
        correo,
        mensaje,
      });
      res.redirect("/testimoniales");
    } catch (error) {
      console.log(error);
    }
  }
};

export { guardarTestimonial };

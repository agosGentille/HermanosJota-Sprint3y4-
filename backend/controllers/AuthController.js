const usuarios = require("../data/usuarios");

// LOGIN
exports.login = (req, res) => {
  const { email, nombre } = req.body;

  // Buscar en el array d usuairos
  const usuario = usuarios.find(
    u => u.email === email && u.nombre === nombre
  );

  if (!usuario) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  // Token falso temporal (en el futuro podemos usar alguno real JWT)
  const token = "fake-token-" + usuario.id;

  res.json({
    token,
    usuario: {
      nombre: usuario.nombre,
      email: usuario.email
    }
  });
};

// REGISTRO TEMPORAL - Los usuarios registrados existen en el servidor mientras este este
//corriendo. Si se reinicia NODE, se pierde todo.
exports.register = (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre || !email) return res.status(400).json({ error: "Faltan datos" });

  // Chequea si ya existe
  const existe = usuarios.some(u => u.email === email);
  if (existe) return res.status(400).json({ error: "El usuario ya existe" });

  const id = usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1;
  const nuevoUsuario = { id, nombre, email };
  usuarios.push(nuevoUsuario);

  const token = "fake-token-" + id;
  res.json({ token, usuario: nuevoUsuario });
};
const controllers = {};

controllers.get = (req, res, next) => {
  res.json({ hola: "como estais chavales" });
};

export default controllers;

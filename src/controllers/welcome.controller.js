const welcomePage = (req, res) => {
  const now = Date.now();
  const date = new Date(now);
  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  res.json({
    msg: "WELCOME TICKITS BY PURAPURA-TURTLE",
    date: `Now : ${formattedDate}`,
  });
};

module.exports = {
  welcomePage,
};

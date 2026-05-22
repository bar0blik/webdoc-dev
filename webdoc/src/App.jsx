import React from "react";

export default function IndieStudioPrototype() {
  const [entered, setEntered] = React.useState(false);
  const [doorOpening, setDoorOpening] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [dialogueIndex, setDialogueIndex] = React.useState(0);
  const audioRef = React.useRef(null);
  const [muted, setMuted] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const intervalRef = React.useRef(null);
  const [doorState, setDoorState] = React.useState("closed");

  const dialogues = [
    "Les studios indépendants n'ont pas les mêmes moyens que les géants du jeu vidéo…",
"Mais parfois, c'est justement cette contrainte qui crée les idées les plus fortes.",
"Moins de budget donne lieu à plus d'inventivité."
  ];

  const [currentLine, setCurrentLine] = React.useState("");

  const hotspots = [
    {
      id: "notebook",
      title: "L’impact culturel des jeux indépendants",
      type: "text",
      top: "73%",
      left: "70%",
      width: "14%",
      height: "13%",
      content:
"Les jeux vidéo indépendants ont profondément transformé la culture vidéoludique. Grâce à leur liberté créative, ils abordent souvent des thèmes plus personnels, émotionnels ou originaux que les grandes productions AAA. Certains jeux parlent de solitude, de deuil, de dépression ou encore d’identité, des sujets rarement mis en avant dans les jeux à très gros budget. Des œuvres comme Celeste, Gris ou Undertale ont marqué les joueurs par leurs messages et leur approche artistique unique. Les jeux indépendants ont aussi permis l’apparition de nouveaux styles visuels et de nouvelles façons de raconter une histoire. Leur influence est devenue si importante que certains studios AAA s’inspirent désormais directement des idées créées par les développeurs indépendants. Aujourd’hui, les jeux indés ne sont plus considérés comme de simples “petits jeux”, mais comme une véritable forme d’expression artistique capable d’influencer toute l’industrie du jeu vidéo.",
    },
    {
      id: "screen",
      title: "Succès des jeux indépendants",
      type: "text",
      top: "20%",
      left: "31%",
      width: "36%",
      height: "40%",
      content:
"Malgré leurs faibles moyens, certains jeux indépendants ont connu un immense succès mondial. Des titres comme Minecraft, Undertale ou Hollow Knight ont prouvé qu’un jeu n’a pas besoin d’un budget colossal pour marquer les joueurs. Ces œuvres séduisent souvent grâce à leur créativité, leur identité visuelle ou leur gameplay innovant. Les studios indépendants prennent davantage de risques artistiques, car ils sont moins contraints par les attentes commerciales des grandes entreprises. Beaucoup de joueurs recherchent aujourd’hui des expériences plus originales et plus personnelles que les productions AAA classiques. Les réseaux sociaux, les vidéos YouTube et le streaming sur Twitch permettent aussi à certains jeux indépendants de devenir populaires très rapidement. Le succès d’un jeu indépendant peut parfois transformer un petit studio inconnu en acteur majeur de l’industrie.",
    },
    {
      id: "coffee",
      title: "Les défis des studios indépendants",
      type: "text",
      top: "68%",
      left: "34%",
      width: "6%",
      height: "11%",
      content:
        "Créer un jeu vidéo indépendant demande énormément de travail avec très peu de moyens. Contrairement aux grands studios AAA, les équipes indépendantes sont souvent composées de quelques personnes seulement, parfois même d’un unique développeur. Le budget limité oblige les créateurs à faire des choix : graphismes plus simples, durée de jeu réduite ou campagnes marketing presque inexistantes. La visibilité est aussi un problème majeur. Chaque année, des milliers de jeux sortent sur des plateformes comme Steam, et beaucoup passent totalement inaperçus. Les développeurs indépendants doivent également maîtriser plusieurs domaines à la fois : programmation, musique, level design, communication ou encore gestion financière. Cette charge de travail peut provoquer du stress et des périodes de développement très longues. Malgré cela, de nombreux créateurs continuent par passion et par envie de proposer des expériences originales.",
    },
    {
      id: "board",
      title: "Les outils modernes",
      type: "text",
      top: "42%",
      left: "16%",
      width: "14%",
      height: "20%",
      content:
"Le développement indépendant a beaucoup évolué grâce aux outils modernes accessibles à tous. Aujourd’hui, des moteurs de jeu comme Unity ou Unreal Engine permettent de créer des jeux de qualité professionnelle sans avoir besoin de technologies coûteuses. De nombreux logiciels sont gratuits ou proposent des versions accessibles aux petits studios. Internet facilite aussi l’apprentissage grâce aux tutoriels, forums et formations en ligne. Les plateformes de financement participatif comme Kickstarter donnent aux développeurs la possibilité de financer leurs projets directement grâce aux joueurs. Les réseaux sociaux offrent également une visibilité immédiate et mondiale. Enfin, l’intelligence artificielle et les outils automatisés simplifient certaines tâches comme l’animation, la génération de textures ou la programmation. Tous ces outils réduisent les barrières techniques et permettent à davantage de personnes de créer leurs propres jeux vidéo.",
    },
  ];

  const handleDialogueClick = () => {
    const fullText = dialogues[dialogueIndex];

    // ⌨️ si en train d’écrire → STOP TOTAL + finish instant
    if (isTyping) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      setCurrentLine(fullText);
      setIsTyping(false);
      return;
    }

    // 👉 sinon next dialogue
    handleNextDialogue();
  };

  const handleNextDialogue = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    }
  };

  const handleEnter = () => {
  if (audioRef.current) {
    audioRef.current.volume = 0.3;
    audioRef.current.play();
  }

  setDoorState("opening");

  setTimeout(() => {
    setDoorState("opened");
    setEntered(true);
  }, 900); // durée transition
};

  // TYPEWRITER
  React.useEffect(() => {
  const text = dialogues[dialogueIndex];
  let i = 0;

  setCurrentLine("");
  setIsTyping(true);

  // important : reset ancien interval
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }

  intervalRef.current = setInterval(() => {
    i++;
    setCurrentLine(text.slice(0, i));

    if (i >= text.length) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsTyping(false);
    }
  }, 35);

  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
}, [dialogueIndex]);

  return (
  <div className="min-h-screen bg-black text-white overflow-hidden">

    <button
      onClick={() => setMuted(!muted)}
      className="absolute top-4 right-4 z-50 px-3 py-2 bg-black/60 border border-white/30 rounded-lg text-xs hover:bg-black/80 transition"
    >
      {muted ? "🔇" : "🔊"}
    </button>
        <audio
      ref={audioRef}
      src="/audio/chill.mp3"
      loop
      muted={muted}
    />

      {/* ÉCRAN PORTE */}
      {!entered && (
        <div className={`relative w-full h-screen flex items-center justify-center overflow-hidden transition-transform duration-700 ${
  doorState === "opening" ? "scale-110" : "scale-100"
}`}>

          {/* IMAGE PORTE */}
          <div className="absolute inset-0 overflow-hidden flex items-center justify-center bg-black">
  
  {/* BACKGROUND BLUR (donne profondeur) */}
  <img
    src={doorState === "closed"
      ? "/images/closed_door.jpg"
      : "/images/opened_door.jpg"}
    className="absolute w-full h-full object-cover scale-110 blur-xl opacity-60"
  />

  {/* IMAGE PRINCIPALE (NETTE) */}
  <img
    src={doorState === "closed"
      ? "/images/closed_door.jpg"
      : "/images/opened_door.jpg"}
    className={`relativew-full h-full object-cover transition-all duration-700 ${
      doorState === "opening" ? "scale-110" : "scale-100"
    }`}
  />

</div>
<div className={`absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent transition-opacity duration-700 ${
  doorOpening ? "opacity-100" : "opacity-0"
}`} />

          <div className="absolute inset-0 bg-black/60" />

          {/* DIALOGUE */}
          <div
            className="absolute bottom-0 w-full p-6 cursor-pointer"
            onClick={handleDialogueClick}
          >
            <div className="bg-black/80 border border-white/20 rounded-2xl p-5 max-w-5xl mx-auto backdrop-blur-md">
              <p className="text-sm text-white/70 mb-2">Narrateur</p>

              <p className="text-lg leading-relaxed min-h-[100px] whitespace-pre-line">
                {currentLine}
                <span className="inline-block ml-1 animate-pulse">▋</span>
              </p>

              <p className="text-xs text-white/40 mt-2">
                Cliquez pour continuer
              </p>
            </div>
          </div>

          {/* BOUTON ENTRER */}
          {dialogueIndex === dialogues.length - 1 && currentLine === dialogues[dialogueIndex] && (
            <button
              onClick={handleEnter}
              className="fixed bottom-18 left-1/2 -translate-x-1/2 px-5 py-2 text-xs rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 transition z-50"
            >
              Entrer
          </button>
          )}
        </div>
      )}

      {/* SCÈNE STUDIO */}
      {entered && (
  <div className="relative w-full h-screen animate-cameraMove">

          <img
            src="/images/studio-room.jpg"
            alt="Studio"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/20" />

          {hotspots.map((spot) => (
            <button
              key={spot.id}
              onClick={() => setSelected(spot)}
              className="
              absolute
              border border-white/30
              bg-white/5
              shadow-[0_0_12px_rgba(255,255,255,0.25)]
              hover:border-white
              hover:bg-white/10
              hover:shadow-[0_0_25px_white]
              transition
              duration-300
              "
              style={{
                top: spot.top,
                left: spot.left,
                width: spot.width,
                height: spot.height,
              }}
            />
          ))}

          {selected && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-gray-900 p-8 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">

                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-2 right-3 text-white text-xl"
                >
                  ✕
                </button>

                <h2 className="text-2xl font-bold mb-4">
                  {selected.title}
                </h2>

                {selected.type === "text" && (
                <p className="text-white/80 text-justify leading-relaxed">
                  {selected.content}
                </p>
              )}

                {selected.type === "video" && (
                  <video controls className="w-full rounded-xl">
                    <source src={selected.video} type="video/mp4" />
                  </video>
                )}

              </div>
            </div>
          )}

        </div>
      )}

      {/* ANIMATIONS CSS */}
      <style>{`
        @keyframes slideLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }

        @keyframes slideRight {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
      `}</style>

    </div>
  );
}

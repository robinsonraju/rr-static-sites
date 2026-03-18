const greatBooks = [
  {
    "volume": 1,
    "items": [
      "The Great Conversation"
    ]
  },
  {
    "volume": 2,
    "items": [
      "The Great Ideas: Syntopicon I",
      "Angel to Love",
    ]
  },
  {
    "volume": 3,
    "items": [
      "The Great Ideas: Syntopicon II",
      "Man to World"
    ]
  },
  {
    "volume": 4,
    "items": [
      "Homer (rendered into English prose by Samuel Butler)",
      "The Iliad",
      "The Odyssey"
    ]
  },
  {
    "volume": 5,
    "items": [
      "Aeschylus, Sophocles, Euripides, Aristophanes",
      "Aeschylus (translated into English verse by G.M. Cookson)",
      "The Suppliant Maidens",
      "The Persians",
      "Seven Against Thebes",
      "Prometheus Bound",
      "Agamemnon",
      "Choephoroe",
      "The Eumenides",
      "Sophocles (translated into English prose by Sir Richard C. Jebb)",
      "Oedipus the King",
      "Oedipus at Colonus",
      "Antigone",
      "Ajax",
      "Electra",
      "The Trachiniae",
      "Philoctetes",
      "Euripides (translated into English prose by Edward P. Coleridge)",
      "Rhesus",
      "Medea",
      "Hippolytus",
      "Alcestis",
      "Heracleidae",
      "The Suppliants",
      "The Trojan Women",
      "Ion",
      "Helen",
      "Andromache",
      "Electra",
      "Bacchantes",
      "Hecuba",
      "Heracles Mad",
      "The Phoenician Women",
      "Orestes",
      "Iphigenia in Tauris",
      "Iphigenia in Aulis",
      "Cyclops",
      "Aristophanes (translated into English verse by Benjamin Bickley Rogers)",
      "The Acharnians",
      "The Knights",
      "The Clouds",
      "The Wasps",
      "Peace",
      "The Birds",
      "The Frogs",
      "Lysistrata",
      "Thesmophoriazusae",
      "Ecclesiazousae",
      "Plutus"
    ]
  },
  {
    "volume": 6,
    "items": [
      "Herodotus & Thucydides",
      "Herodotus - The History (translated by George Rawlinson)",
      "Thucydides - History of the Peloponnesian War (translated by Richard Crawley and revised by R. Feetham)"
    ]
  },
  {
    "volume": 7,
    "items": [
      "Plato",
      "The Dialogues (translated by Benjamin Jowett)",
      "Charmides",
      "Lysis",
      "Laches",
      "Protagoras",
      "Euthydemus",
      "Cratylus",
      "Phaedrus",
      "Ion",
      "Symposium",
      "Meno",
      "Euthyphro",
      "Apology",
      "Crito",
      "Phaedo",
      "Gorgias",
      "The Republic",
      "Timaeus",
      "Critias",
      "Parmenides",
      "Theaetetus",
      "Sophist",
      "Statesman",
      "Philebus",
      "Laws",
      "The Seventh Letter (translated by J. Harward)"
    ]
  },
  {
    "volume": 8,
    "items": [
      "Aristotle I",
      "Categories (translated by E. M. Edghill)",
      "On Interpretation (translated by E. M. Edghill)",
      "Prior Analytics (translated by A. J. Jenkinson)",
      "Posterior Analytics (translated by G. R. G. Mure)",
      "Topics (translated by A. W. Pickard-Cambridge)",
      "Sophistical Refutations (translated by A. W. Pickard-Cambridge)",
      "Physics (translated by R. P. Hardie & R. K. Gaye)",
      "On the Heavens (translated by J. L. Stocks)",
      "On Generation and Corruption (translated by H. H. Joachim)",
      "Meteorology (translated by E. W. Webster)",
      "Metaphysics (translated by W. D. Ross)",
      "On the Soul (translated by J. A. Smith)",
      "Minor biological works",
      "On Sense and the Sensible (translated by J. I. Beare)",
      "On Memory and Reminisence (translated by J. I. Beare)",
      "On Sleep and Sleeplessness (translated by J. I. Beare)",
      "On Dreams (translated by J. I. Beare)",
      "On Prophesying by Dreams (translated by J. I. Beare)",
      "On Longevity and Shortness of Life (translated by G. R. T. Ross)",
      "On Youth and Old Age, On Life and Death, On Breathing (translated by G. R. T. Ross)"
    ]
  },
  {
    "volume": 9,
    "items": [
      "Aristotle II",
      "History of Animals (translated by D'Arcy Wentworth Thompson)",
      "Parts of Animals (translated by William Ogle)",
      "On the Motion of Animals (translated by A. S. L. Farquharson)",
      "On the Gait of Animals (translated by A. S. L. Farquharson)",
      "On the Generation of Animals (translated by Arthur Platt)",
      "Nicomachean Ethics (translated by W. D. Ross)",
      "Politics (translated by Benjamin Jowett)",
      "The Athenian Constitution (translated by Sir Frederic G. Kenyon)",
      "Rhetoric (translated by W. Rhys Roberts)",
      "Poetics (translated by Ingram Bywater)"
    ]
  },
  {
    "volume": 10,
    "items": [
      "Hippocrates, Galen",
      "Hippocrates (translated by Francis Adams)",
      "The Hippocratic Oath",
      "On Ancient Medicine",
      "On Airs, Water, and Places",
      "The Book of Prognostics",
      "On Regimen in Acute Diseases",
      "Of the Epidemics",
      "On Injuries of the Head",
      "On the Surgery",
      "On Fractures",
      "On the Articulations",
      "Instruments of Reduction",
      "Aphorisms",
      "The Law",
      "The Ulcer",
      "On Fistulae",
      "On Hemorrhoids",
      "On the Sacred Disease",
      "Galen (translated by Arthur John Brock)",
      "On the Natural Faculties"
    ]
  },
  {
    "volume": 11,
    "items": [
      "Euclid",
      "The Thirteen Books of Euclid's Elements (translated by Thomas Heath)",
      "Archimedes",
      "Works (translated by Thomas Heath)",
      "On the Sphere and Cylinder",
      "Measurement of a Circle",
      "On Conoids and Spheroids",
      "On Spirals",
      "On the Equilibrium of Planes",
      "The Sand Reckoner",
      "The Quadrature of the Parabola",
      "On Floating Bodies",
      "Book of Lemmas",
      "The Method Treating of Mechanical Problems",
      "Apollonius of Perga",
      "On Conic Sections (translated by R. Catesby Taliaferro)",
      "Nicomachus of Gerasa",
      "Introduction to Arithmetic (translated by Martin L D'Ooge)"
    ]
  },
  {
    "volume": 12,
    "items": [
      "Lucretius",
      "On the Nature of Things (translated by H.A.J. Munro)",
      "Epictetus",
      "The Discourses (translated by George Long)",
      "Marcus Aurelius",
      "The Meditations (translated by George Long)"
    ]
  },
  {
    "volume": 13,
    "items": [
      "Virgil (translated into English verse by James Rhoades)",
      "Eclogues",
      "Georgics",
      "Aeneid"
    ]
  },
  {
    "volume": 14,
    "items": [
      "Plutarch",
      "The Lives of the Noble Grecians and Romans (translated by John Dryden)"
    ]
  },
  {
    "volume": 15,
    "items": [
      "P. Cornelius Tacitus (translated by Alfred John Church and William Jackson Brodribb)",
      "The Annals",
      "The Histories"
    ]
  },
  {
    "volume": 16,
    "items": [
      "Ptolemy",
      "Almagest, (translated by R. Catesby Taliaferro)",
      "Nicolaus Copernicus",
      "On the Revolutions of Heavenly Spheres (translated by Charles Glenn Wallis)",
      "Johannes Kepler (translated by Charles Glenn Wallis)",
      "Epitome of Copernican Astronomy (Books IV–V)",
      "The Harmonies of the World (Book V)"
    ]
  },
  {
    "volume": 17,
    "items": [
      "Plotinus",
      "The Six Enneads (translated by Stephen MacKenna and B. S. Page)"
    ]
  },
  {
    "volume": 18,
    "items": [
      "Augustine of Hippo",
      "The Confessions (translated by Edward Bouverie Pusey)",
      "The City of God (translated by Marcus Dods)",
      "On Christian Doctrine (translated by J.F. Shaw)"
    ]
  },
  {
    "volume": 19,
    "items": [
      "Thomas Aquinas",
      "Summa Theologica (First part complete, selections from second part, translated by the Fathers of the English Dominican Province and revised by Daniel J. Sullivan)"
    ]
  },
  {
    "volume": 20,
    "items": [
      "Thomas Aquinas",
      "Summa Theologica (Selections from second and third parts and supplement, translated by the Fathers of the English Dominican Province and revised by Daniel J. Sullivan)"
    ]
  },
  {
    "volume": 21,
    "items": [
      "Dante Alighieri",
      "Divine Comedy (Translated by Charles Eliot Norton)"
    ]
  },
  {
    "volume": 22,
    "items": [
      "Geoffrey Chaucer",
      "Troilus and Criseyde (Middle English edited by W. W. Skeat and sequenced by Thomas Tyrwhitt; translated by George Philip Krapp)",
      "The Canterbury Tales (Middle English edited by W. W. Skeat and sequenced by Thomas Tyrwhitt; translated by J. U. Nicolson)"
    ]
  },
  {
    "volume": 23,
    "items": [
      "Niccolò Machiavelli",
      "The Prince (translated by W. K. Marriott)",
      "Thomas Hobbes",
      "Leviathan (edited by Nelle Fuller)"
    ]
  },
  {
    "volume": 24,
    "items": [
      "François Rabelais",
      "Gargantua and Pantagruel (Books I-IV, translated by Thomas Urquhart and Peter Anthony Motteux)"
    ]
  },
  {
    "volume": 25,
    "items": [
      "Michel Eyquem de Montaigne",
      "Essays (translated by Charles Cotton, edited by W. Carew Hazlitt)"
    ]
  },
  {
    "volume": 26,
    "items": [
      "William Shakespeare",
      "The First Part of King Henry the Sixth",
      "The Second Part of King Henry the Sixth",
      "The Third Part of King Henry the Sixth",
      "The Tragedy of Richard the Third",
      "The Comedy of Errors",
      "Titus Andronicus",
      "The Taming of the Shrew",
      "The Two Gentlemen of Verona",
      "Love's Labour's Lost",
      "Romeo and Juliet",
      "The Tragedy of King Richard the Second",
      "A Midsummer Night's Dream",
      "The Life and Death of King John",
      "The Merchant of Venice",
      "The First Part of King Henry the Fourth",
      "The Second Part of King Henry the Fourth",
      "Much Ado About Nothing",
      "The Life of King Henry the Fifth",
      "Julius Caesar",
      "As You Like It"
    ]
  },
  {
    "volume": 27,
    "items": [
      "William Shakespeare",
      "Twelfth Night; or, What You Will",
      "The Tragedy of Hamlet, Prince of Denmark",
      "The Merry Wives of Windsor",
      "Troilus and Cressida",
      "All's Well That Ends Well",
      "Measure for Measure",
      "Othello, the Moor of Venice",
      "King Lear",
      "Macbeth",
      "Antony and Cleopatra",
      "Coriolanus",
      "Timon of Athens",
      "Pericles, Prince of Tyre",
      "Cymbeline",
      "The Winter's Tale",
      "The Tempest",
      "The Famous History of the Life of King Henry the Eighth",
      "Sonnets"
    ]
  },
  {
    "volume": 28,
    "items": [
      "William Gilbert",
      "On the Loadstone and Magnetic Bodies (translated by P. Fleury Mottelay)",
      "Galileo Galilei",
      "Dialogues Concerning the Two New Sciences (translated by Henry Crew and Alfonso de Salvio)",
      "William Harvey",
      "On the Motion of the Heart and Blood in Animals (translated by Robert Willis)",
      "On the Circulation of Blood (translated by Robert Willis)",
      "On the Generation of Animals (translated by Robert Willis)"
    ]
  },
  {
    "volume": 29,
    "items": [
      "Miguel de Cervantes",
      "The History of Don Quixote de la Mancha (translated by John Ormsby)"
    ]
  },
  {
    "volume": 30,
    "items": [
      "Sir Francis Bacon",
      "The Advancement of Learning",
      "Novum Organum",
      "New Atlantis"
    ]
  },
  {
    "volume": 31,
    "items": [
      "René Descartes",
      "Rules for the Direction of the Mind (translated by Elizabeth S. Haldane and G. R. T. Ross)",
      "Discourse on the Method (translated by Elizabeth S. Haldane and G. R. T. Ross)",
      "Meditations on First Philosophy (translated by Elizabeth S. Haldane and G. R. T. Ross)",
      "Objections Against the Meditations and Replies (translated by Elizabeth S. Haldane and G. R. T. Ross)",
      "The Geometry (translated by David Eugene Smith and Marcia L. Latham)",
      "Benedict de Spinoza",
      "Ethics (translated by W. H. White, revised by A. H. Stirling)"
    ]
  },
  {
    "volume": 32,
    "items": [
      "John Milton",
      "English Minor Poems",
      "On the Morning of Christ's Nativity",
      "A Paraphrase on Psalm 114",
      "Psalm 136",
      "The Passion",
      "On Time",
      "Upon the Circumcision",
      "At a Solemn Musick",
      "An Epitaph on the Marchioness of Winchester",
      "Song on May Morning",
      "On Shakespeare",
      "On the University Carrier",
      "Another on the same",
      "L'Allegro",
      "Il Penseroso",
      "Arcades",
      "Lycida",
      "Comus",
      "On the Death of a Fair Infant",
      "At a Vacation Exercise",
      "The Fifth Ode of Horace",
      "Sonnets (I, and VII—XIX)",
      "On the New Forcers of Conscience",
      "On the Lord General Fairfax at the Siege of Colchester",
      "To the Lord General Cromwell",
      "To Sir Henry Vane the Younger",
      "To Mister Cyriack the Skinner upon his Blindness",
      "Psalms (I—VIII & LXXX—LXXXVIII)",
      "Paradise Lost",
      "Samson Agonistes",
      "Areopagitica"
    ]
  },
  {
    "volume": 33,
    "items": [
      "Blaise Pascal",
      "The Provincial Letters (translated by Thomas M'Crie)",
      "Pensées (translated by W. F. Trotter)",
      "Scientific and mathematical essays (translated by Richard Scofield)",
      "Preface to the Treatise on the Vacuum",
      "New Experiments Concerning the Vacuum",
      "Account of the Great Experiment Concerning the Equilibrium of Fluids",
      "Treatises on the Equilibrium of Liquids and on the Weight of the Mass of the Air",
      "On Geometrical Demonstration",
      "Treatise on the Arithmetical triangle",
      "Correspondence with Fermat on the Theory of Probabilities"
    ]
  },
  {
    "volume": 34,
    "items": [
      "Sir Isaac Newton",
      "Mathematical Principles of Natural Philosophy (translated by Andrew Motte, revised by Florian Cajori)",
      "Optics",
      "Christiaan Huygens",
      "Treatise on Light (translated by Silvanus P. Thompson)"
    ]
  },
  {
    "volume": 35,
    "items": [
      "John Locke",
      "A Letter Concerning Toleration",
      "Concerning Civil Government, Second Essay",
      "An Essay Concerning Human Understanding",
      "George Berkeley",
      "The Principles of Human Knowledge",
      "David Hume",
      "An Enquiry Concerning Human Understanding"
    ]
  },
  {
    "volume": 36,
    "items": [
      "Jonathan Swift",
      "Gulliver's Travels",
      "Laurence Sterne",
      "The Life and Opinions of Tristram Shandy, Gentleman"
    ]
  },
  {
    "volume": 37,
    "items": [
      "Henry Fielding",
      "The History of Tom Jones, a Foundling"
    ]
  },
  {
    "volume": 38,
    "items": [
      "Charles de Secondat, Baron de Montesquieu",
      "The Spirit of the Laws (translated by Thomas Nugent, revised by J. V. Prichard",
      "Jean Jacques Rousseau",
      "A Discourse on the Origin of Inequality (translated by G. D. H. Cole)",
      "A Discourse on Political Economy (translated by G. D. H. Cole)",
      "The Social Contract (translated by G. D. H. Cole)"
    ]
  },
  {
    "volume": 39,
    "items": [
      "Adam Smith",
      "An Inquiry into the Nature and Causes of the Wealth of Nations"
    ]
  },
  {
    "volume": 40,
    "items": [
      "Edward Gibbon",
      "The Decline and Fall of the Roman Empire (Part 1)"
    ]
  },
  {
    "volume": 41,
    "items": [
      "Edward Gibbon",
      "The Decline and Fall of the Roman Empire (Part 2)"
    ]
  },
  {
    "volume": 42,
    "items": [
      "Immanuel Kant",
      "Critique of Pure Reason (translated by J. M. D. Meiklejohn)",
      "Fundamental Principles of the Metaphysic of Morals (translated by Thomas Kingsmill Abbott)",
      "Critique of Practical Reason (translated by Thomas Kingsmill Abbott)",
      "Excerpts from The Metaphysics of Morals",
      "Preface and Introduction to the Metaphysical Elements of Ethics with a note on Conscience (translated by Thomas Kingsmill Abbott)",
      "General Introduction to the Metaphysic of Morals (translated by W. Hastie)",
      "The Science of Right (translated by W. Hastie)",
      "The Critique of Judgement (translated by James Creed Meredith)"
    ]
  },
  {
    "volume": 43,
    "items": [
      "American State Papers",
      "Declaration of Independence",
      "Articles of Confederation",
      "The Constitution of the United States of America",
      "Alexander Hamilton, James Madison, John Jay",
      "The Federalist",
      "John Stuart Mill",
      "On Liberty",
      "Considerations on Representative Government",
      "Utilitarianism"
    ]
  },
  {
    "volume": 44,
    "items": [
      "James Boswell",
      "The Life of Samuel Johnson, LL.D."
    ]
  },
  {
    "volume": 45,
    "items": [
      "Antoine Laurent Lavoisier",
      "Elements of Chemistry (translated by Robert Kerr)",
      "Jean Baptiste Joseph Fourier",
      "Analytical Theory of Heat (translated by Alexander Freeman)",
      "Michael Faraday",
      "Experimental Researches in Electricity"
    ]
  },
  {
    "volume": 46,
    "items": [
      "Georg Wilhelm Friedrich Hegel",
      "The Philosophy of Right (translated by T. M. Knox)",
      "The Philosophy of History (translated by J. Sibree)"
    ]
  },
  {
    "volume": 47,
    "items": [
      "Johann Wolfgang von Goethe",
      "Faust (translated by George Madison Priest)"
    ]
  },
  {
    "volume": 48,
    "items": [
      "Herman Melville",
      "Moby Dick; or, The Whale"
    ]
  },
  {
    "volume": 49,
    "items": [
      "Charles Darwin",
      "The Origin of Species by Means of Natural Selection",
      "The Descent of Man, and Selection in Relation to Sex"
    ]
  },
  {
    "volume": 50,
    "items": [
      "Karl Marx",
      "Capital (edited by Friedrich Engels, translated by Samuel Moore and Edward Aveling, revised by Marie Sachey and Herbert Lamm)",
      "Karl Marx and Friedrich Engels",
      "Manifesto of the Communist Party (edited by Friedrich Engels, translated by Samuel Moore)"
    ]
  },
  {
    "volume": 51,
    "items": [
      "Count Leo Tolstoy",
      "War and Peace (translated by Aylmer and Louise Maude)"
    ]
  },
  {
    "volume": 52,
    "items": [
      "Fyodor Mikhailovich Dostoevsky",
      "The Brothers Karamazov (translated by Constance Garnett)"
    ]
  },
  {
    "volume": 53,
    "items": [
      "William James",
      "The Principles of Psychology"
    ]
  },
  {
    "volume": 54,
    "items": [
      "Sigmund Freud",
      "The Origin and Development of Psycho-Analysis (translated by Harry W. Chase)",
      "Selected Papers on Hysteria (translated by A. A. Brill)",
      "The Sexual Enlightenment of Children (translated by E. B. M. Herford)",
      "The Future Prospects of Psycho-Analytic Therapy (translated by Joan Riviere)",
      "Observations on \"Wild\" Psycho-Analysis (translated by Joan Riviere)",
      "The Interpretation of Dreams (translated by A. A. Brill)",
      "On Narcissism (translated by Cecil M. Baines)",
      "Instincts and Their Vicissitudes (translated by Cecil M. Baines)",
      "Repression (translated by Cecil M. Baines)",
      "The Unconscious (translated by Cecil M. Baines)",
      "A General Introduction to Psycho-Analysis (translated by Joan Riviere)",
      "Beyond the Pleasure Principle (translated by C. J. M. Hubback)",
      "Group Psychology and the Analysis of the Ego (translated by James Strachey)",
      "The Ego and the Id (translated by Joan Riviere)",
      "Inhibitions, Symptoms, and Anxiety (translated by Alix Strachey)",
      "Thoughts for the Times on War and Death (translated by E. Colburn Mayne)",
      "Civilization and Its Discontents (translated by Joan Riviere)",
      "New Introductory Lectures on Psycho-Analysis (translated by W. J. H. Sprott)"
    ]
  }
];

export type StoryBlock = { type: "p"; text: string } | { type: "h2"; text: string };

export type Story = {
  slug: string;
  eyebrow: string;
  title: string;
  standfirst: string;
  readingMinutes: number;
  image: string;
  imageAlt: string;
  body: readonly StoryBlock[];
};

const p = (text: string): StoryBlock => ({ type: "p", text });
const h2 = (text: string): StoryBlock => ({ type: "h2", text });

export const stories: readonly Story[] = [
  {
    slug: "samlerbiler-fra-tyskland",
    eyebrow: "Import",
    title: "Samlerbiler fra Tyskland",
    standfirst:
      "Tyskland er landet der Audi, BMW og Mercedes-Benz hører hjemme. Derfor er det også der vi leter når vi skal finne bilene som er verdt å ta vare på.",
    readingMinutes: 4,
    image: "https://cdn.autonet.no/ads-12154/b8a90d4fIMG_3715.JPG",
    imageAlt: "Hvit Mercedes-Benz SL63 fra 2013 foran AutoGrandes lokaler i Skien",
    body: [
      p(
        "Eierne av AutoGrande har drevet med salg og import av bil siden 2007. Siden AutoGrande AS ble etablert i 2016, har vi solgt og levert i snitt 300 biler i året. Mange av dem er helt vanlige, gode bruksbiler. Men noen er noe mer – biler man stopper opp foran, og som man vil ta vare på i mange år.",
      ),
      h2("Hvorfor akkurat Tyskland?"),
      p(
        "Det tyske bilmarkedet er stort, og det er der Audi, BMW og Mercedes-Benz er utviklet og bygget. Det betyr et stort utvalg, også av modeller og utstyrsvarianter som det knapt finnes noen av i Norge. For en entusiast er det nettopp der det spennende ligger: den riktige fargen, riktig motor, det utstyret som gjør bilen komplett.",
      ),
      p(
        "Gjennom en årrekke har vi bygget opp et solid kontaktnett over hele Tyskland. Det gjør at vi ofte får tilgang til biler med et høyt og ettertraktet utstyrsnivå – og at vi kan hjelpe deg å lete etter akkurat den bilen du har i tankene.",
      ),
      h2("Hva gjør en bil til en samlerbil?"),
      p(
        "Det finnes ingen fasit. For noen er det en sjelden motor eller en spesiell modellserie. For andre er det en bil de drømte om som unge, eller en modell som har vist seg å holde seg godt over tid. Felles for dem er at historikken betyr mye: hvordan bilen er brukt, hvordan den er vedlikeholdt, og hvordan den har det i dag.",
      ),
      p(
        "Derfor er vi opptatt av å kjenne bilene vi tar hjem. Vi henter og kjører dem hjem selv, og vi går dem nøye etter før de selges. En brukt bil kan likevel ha feil vi ikke har funnet – det er vi ærlige på. Derfor leveres nesten alle bilene vi annonserer med minimum ett års garanti, med mulighet for utvidelse.",
      ),
      h2("Ser du etter noe spesielt?"),
      p(
        "Vi har alltid biler på lager både i Norge og i Tyskland. Finner du ikke det du leter etter blant bilene våre, så ta kontakt. Vi bistår mer enn gjerne med å finne eller skreddersy drømmebilen gjennom kontaktnettet vårt.",
      ),
    ],
  },
  {
    slug: "hvorfor-vi-gjor-det",
    eyebrow: "Om oss",
    title: "Hvorfor vi gjør det",
    standfirst:
      "Vi kunne solgt hvilke som helst biler. Vi har valgt å gjøre det på en annen måte – med færre ledd, bedre utstyr og en garanti som følger med.",
    readingMinutes: 3,
    image: "https://cdn.autonet.no/ads-90683/c-3a7cf4d1EGM06300.jpg",
    imageAlt: "Svart Mercedes-Benz EQE 500 SUV fra 2024 foran AutoGrandes lokaler i Skien",
    body: [
      p(
        "Vår visjon er enkel å si, men krever mye arbeid å leve opp til: å selge biler med høy kvalitet, uten kostbare mellomledd. Bilene skal være meget godt utstyrte, og de skal selges til riktig pris.",
      ),
      h2("Kontaktnettet er kjernen"),
      p(
        "Siden 2007 har eierne bygget opp kontakter over hele Tyskland. Det er dette nettverket som gjør at vi finner de riktige bilene, og at vi kan hente dem hjem uten at noen tar sin del underveis. Vi har også meget gode kontakter på Audi i Tyskland som kan hjelpe deg med å skaffe drømmebilen.",
      ),
      h2("Utstyrsnivå betyr noe"),
      p(
        "To biler med samme modellnavn kan være vidt forskjellige. Vi har kompetanse på hvilke utstyrskombinasjoner som er mulige å få, og det er en av våre høyeste prioriteringer når vi importerer biler. En godt utstyrt bil er hyggeligere å eie, og den er som regel også lettere å selge videre den dagen du vil bytte.",
      ),
      h2("Lave kostnader, bedre pris"),
      p(
        "Vi har alltid biler på lager både i Norge og i Tyskland. På den måten kan vi tilby et rikt utvalg, og samtidig holde lagerkostnadene så lave som mulig. Det gjør at vi kan selge bilene til enda mer konkurransedyktige priser.",
      ),
      h2("Ærlighet framfor salgsprat"),
      p(
        "Vi snakker som bilentusiaster, ikke selgere. Vi går bilene nøye etter, men vi later ikke som om en brukt bil er ny. Den kan ha feil vi ikke har funnet. Derfor leveres nesten alle bilene vi annonserer med minimum ett års garanti, med mulighet for utvidelse etter ønske. Det er vår måte å stå for det vi selger.",
      ),
    ],
  },
  {
    slug: "var-historie",
    eyebrow: "Om oss",
    title: "Vår historie",
    standfirst:
      "Fra import av bil i 2007 til et etablert bilhus i Skien. Dette er kortversjonen av hvem vi er.",
    readingMinutes: 3,
    image: "/images/hero-c63-amg.jpg",
    imageAlt: "Svart Mercedes-Benz C63 fotografert foran AutoGrandes lokaler i Skien",
    body: [
      p(
        "Eierne av AutoGrande AS har drevet med salg og import av bil siden 2007. Det startet med interessen for bil, og med erfaringen av at gode biler fra Tyskland kunne hentes hjem til en riktig pris – dersom man visste hvor man skulle lete.",
      ),
      h2("2016: AutoGrande AS"),
      p(
        "AutoGrande AS ble etablert 1. januar 2016. Siden den gang har vi solgt og levert i snitt 300 biler hvert år. Vi har valgt å spesialisere oss på Audi, BMW og Mercedes-Benz, og vi er en selvstendig importør. Det gir oss frihet til å velge bilene vi tror på.",
      ),
      h2("Håvundvegen 214 i Skien"),
      p(
        "Bilene våre står i Håvundvegen 214 i Skien. Her er du hjertelig velkommen innom for en prat, en titt eller en prøvetur. Vi har åpent mandag til fredag fra 09.00 til 17.00, torsdag til 19.00, og lørdag fra 10.00 til 14.00.",
      ),
      h2("Folkene bak"),
      p(
        "Magnus Melfald er selger og daglig leder. Bård Eikenes er selger og har ansvar for taksering. Aina Grande Melfald er eier og regnskapsmedarbeider, og Harald Melfald jobber også med regnskap. Emma Grande Melfald tar seg av foto og annonsering, og Ionut Radu er bilklargjører – han sørger for at bilene er klare når de skal til ny eier.",
      ),
      p(
        "Sammen jobber og brenner vi for det samme: kvalitetsbiler til den kvalitetsbevisste forbrukeren, levert på en ærlig og trygg måte.",
      ),
    ],
  },
  {
    slug: "historien-om-porsche-911",
    eyebrow: "Klassikere",
    title: "Historien om Porsche 911",
    standfirst:
      "Få biler har holdt på den samme grunnformen så lenge som Porsche 911. Her er historien om en sportsbil som har blitt et ikon.",
    readingMinutes: 5,
    image: "https://cdn.autonet.no/ads-87243/c-26e33fc6EGM05200.jpg",
    imageAlt: "Svart Porsche 911 Carrera fra 2000 med lyst interiør foran AutoGrandes lokaler i Skien",
    body: [
      p(
        "Porsche 911 ble vist fram for første gang på bilutstillingen i Frankfurt i 1963, som en etterfølger til Porsche 356. Bilen skulle egentlig hete 901, men navnet ble endret til 911 før salget startet. Siden har den blitt en av verdens mest gjenkjennelige sportsbiler.",
      ),
      h2("Motoren bak"),
      p(
        "Det som skiller 911 fra de fleste andre sportsbiler, er plasseringen av motoren: en boksermotor montert bak bakakselen. Det gir en spesiell vektfordeling og en kjørefølelse som entusiaster har snakket om i generasjoner. I flere tiår var motoren også luftkjølt, noe som ga 911 sin karakteristiske lyd.",
      ),
      h2("Fra luft til vann"),
      p(
        "Med generasjonen som fikk kodenavnet 996, lansert i 1997, tok Porsche det store skrittet over til vannkjølte motorer. Det var et omdiskutert valg blant puristene, men det ga mer effekt, bedre driftssikkerhet og en mer moderne bil. 996 fikk også nye frontlykter og et nytt interiør, og var på mange måter starten på den moderne 911.",
      ),
      h2("En bil som er blitt brukt"),
      p(
        "En av grunnene til at 911 har overlevd så lenge, er at den aldri bare har vært en garasjebil. Den har vært en bil folk har kjørt – til jobb, på langtur og på bane. Mange eksemplarer har derfor en lang og spennende historikk, og det er nettopp den historien som gjør det interessant å finne riktig bil.",
      ),
      h2("Hos oss akkurat nå"),
      p(
        "Akkurat nå har vi en Porsche 911 Carrera fra 2000 på lager – en svart 996 med lyst interiør. Den har gått 131 711 km, og prisen er kr 429 000. Som med alle bilene våre går vi den nøye etter, men en brukt bil kan ha feil vi ikke har funnet. Spør oss gjerne om bilen, eller kom innom i Skien og se den selv.",
      ),
    ],
  },
  {
    slug: "lidenskapen-for-bil",
    eyebrow: "Entusiasme",
    title: "Lidenskapen for bil",
    standfirst:
      "Vi elsker biler – spesielt de som er verdt å hente hjem fra Tyskland. Her er litt om hvorfor det fortsatt betyr så mye for oss.",
    readingMinutes: 3,
    image: "https://cdn.autonet.no/ads-73000/c-410b4550EGM06200.jpg",
    imageAlt: "Hvit BMW M6 cabriolet fra 2015 foran AutoGrandes lokaler i Skien",
    body: [
      p(
        "Det er noe eget ved å sette seg bak rattet på en bil som er bygget med omtanke. Lyden når motoren starter. Følelsen i styringen. Detaljene i interiøret som noen har brukt tid på å gjøre riktig. Det er det vi ser etter, hver gang vi leter etter en ny bil.",
      ),
      h2("Entusiaster, ikke selgere"),
      p(
        "Vi snakker om biler slik bilentusiaster gjør. Vi blir begeistret for en sjelden utstyrskombinasjon, og vi kan bruke lang tid på å diskutere fordelene med én motor framfor en annen. Den interessen er grunnen til at vi gjør dette – og den gjør oss også bedre til å finne riktig bil til deg.",
      ),
      h2("Lidenskap og ærlighet går sammen"),
      p(
        "Å være glad i biler betyr ikke at man skal pynte på sannheten. Tvert imot. Vi har kjørt bilene selv, og vi går dem nøye etter, men vi vet at en brukt bil kan ha feil vi ikke har funnet. Derfor sier vi det rett ut, og derfor følger garanti med på nesten alle bilene vi annonserer.",
      ),
      h2("Del gjerne din"),
      p(
        "Har du en drømmebil, en modell du har fulgt i årevis, eller bare lyst til å prate bil? Kom innom oss i Skien. Vi tar gjerne en prat, enten du skal kjøpe nå eller bare er nysgjerrig.",
      ),
    ],
  },
  {
    slug: "reisen-fra-tyskland",
    eyebrow: "Bak kulissene",
    title: "Reisen fra Tyskland",
    standfirst:
      "Hver bil har en historie – vi henter den fra Tyskland til deg. Slik foregår reisen, fra vi finner bilen til den står klar hos oss i Skien.",
    readingMinutes: 4,
    image: "https://cdn.autonet.no/ads-86838/c-8b21b671EGM04900.jpg",
    imageAlt: "Mørk Bentley Continental GT fra 2013 foran AutoGrandes lokaler i Skien",
    body: [
      p(
        "Når du kjøper en bil fra oss, har den som regel lagt bak seg en lang tur. Den reisen er en viktig del av jobben vår, og en viktig del av grunnen til at vi kjenner bilene vi selger.",
      ),
      h2("1. Vi finner bilen"),
      p(
        "Alt starter med kontaktnettet vårt i Tyskland. Gjennom en årrekke har vi opparbeidet oss kontakter over hele landet, og det gir oss tilgang til mange biler. Vi ser etter riktig modell og et høyt og ettertraktet utstyrsnivå – og vi har kompetanse på hvilke utstyrskombinasjoner som faktisk er mulige å få.",
      ),
      h2("2. Vi henter den selv"),
      p(
        "Når vi har funnet bilen, henter vi den og kjører den hjem selv. Det betyr at vi har kjørt bilen før den havner hos deg. Da vet vi mer enn det bilder og papirer kan fortelle: hvordan den går, hvordan den låter, og hvordan den oppfører seg på veien.",
      ),
      h2("3. Vi går den nøye etter"),
      p(
        "Hjemme i Skien går vi bilen grundig etter, og den blir klargjort før den annonseres. Vi er nøye, men vi er også ærlige: En brukt bil kan ha feil vi ikke har funnet. Det er ingen grunn til å late som noe annet.",
      ),
      h2("4. Garantien følger med"),
      p(
        "Nettopp derfor leveres nesten alle bilene vi annonserer med minimum ett års garanti, med mulighet for utvidelse etter ønske. Skulle noe oppstå, tar vi reklamasjonen din på alvor, og vi bestreber oss på å svare alle innen 7 dager.",
      ),
      p(
        "Vil du vite mer om reisen til en bestemt bil? Spør oss. Vi forteller gjerne hva vi vet om bilen, og hva vi fant da vi gikk den etter.",
      ),
    ],
  },
];

export function getStory(slug: string): Story | undefined {
  return stories.find((story) => story.slug === slug);
}

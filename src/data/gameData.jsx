import { 
  BookOpen, 
  DollarSign, 
  Flame, 
  Star, 
  Plane, 
  Shield, 
  Bed, 
  Car, 
  MapPin, 
  Settings, 
  Heart, 
  Wrench, 
  Activity, 
  Briefcase 
} from 'lucide-react';

export const CONVERSION_RATE = 100; // 1 USD = 100 HNY
export const BASE_INVESTMENT_USD = 100;

export const ACHIEVEMENTS_LIST = [
  { id: 'first_words', title: 'Primeiras Palavras', desc: 'Aprenda 3 palavras no dicionário.', target: 3, icon: BookOpen, color: 'text-blue-500' },
  { id: 'rich_bee', title: 'Abelha Rica', desc: 'Acumule 200 HNY na sua carteira.', target: 200, icon: DollarSign, color: 'text-green-500' },
  { id: 'scholar', title: 'Estudioso', desc: 'Alcance uma ofensiva de 3 dias seguidos.', target: 3, icon: Flame, color: 'text-orange-500' },
  { id: 'level_5', title: 'Veterano', desc: 'Alcance o Nível 5 com a sua abelha.', target: 5, icon: Star, color: 'text-yellow-500' },
];

export const TRAVEL_SCENARIOS = [
  { id: 'airport', title: 'No Aeroporto', icon: Plane, phrases: [
      { en: "Where is the check-in desk?", pt: "Onde é o balcão de check-in?" },
      { en: "Here is my passport and ticket.", pt: "Aqui está o meu passaporte e passagem." },
      { en: "What time is boarding?", pt: "A que horas é o embarque?" },
      { en: "Do I need to take out my laptop?", pt: "Preciso de tirar o meu portátil?" }
  ]},
  { id: 'immigration', title: 'Na Imigração', icon: Shield, phrases: [
      { en: "I am here on vacation.", pt: "Estou aqui de férias." },
      { en: "I will stay for one week.", pt: "Ficarei por uma semana." },
      { en: "I am staying at a hotel in the city center.", pt: "Vou ficar num hotel no centro da cidade." }
  ]},
  { id: 'hotel', title: 'No Hotel', icon: Bed, phrases: [
      { en: "I have a reservation under the name John.", pt: "Eu tenho uma reserva em nome de John." },
      { en: "What time is breakfast served?", pt: "A que horas é servido o pequeno-almoço?" },
      { en: "Could I have an extra towel, please?", pt: "Poderia dar-me uma toalha extra, por favor?" }
  ]},
  { id: 'taxi', title: 'No Táxi / Uber', icon: Car, phrases: [
      { en: "Can you take me to this address?", pt: "Pode levar-me a este endereço?" },
      { en: "How much will it cost approximately?", pt: "Quanto vai custar aproximadamente?" },
      { en: "Please, stop right here.", pt: "Por favor, pare aqui mesmo." }
  ]},
  { id: 'directions', title: 'Pedindo Informações', icon: MapPin, phrases: [
      { en: "Excuse me, where is the nearest subway station?", pt: "Com licença, onde fica a estação de metro mais próxima?" },
      { en: "How do I get to the museum?", pt: "Como faço para chegar ao museu?" },
      { en: "Is it within walking distance?", pt: "É a uma distância que dê para ir a pé?" }
  ]}
];

export const SENTENCE_GAMES = [
  { pt: "Eu quero mel.", en: "I want honey.", jumbled: ["honey.", "want", "I", "bee"] },
  { pt: "A abelha é amarela.", en: "The bee is yellow.", jumbled: ["is", "The", "yellow.", "bee", "red"] },
  { pt: "Onde fica o aeroporto?", en: "Where is the airport?", jumbled: ["airport?", "the", "Where", "is", "Who"] },
  { pt: "Eu preciso de ajuda.", en: "I need help.", jumbled: ["need", "I", "help.", "want"] },
  { pt: "Como você está hoje?", en: "How are you today?", jumbled: ["today?", "are", "How", "you", "is"] },
  { pt: "Prazer em conhecer você.", en: "Nice to meet you.", jumbled: ["meet", "Nice", "you.", "to", "too"] }
];

export const LESSONS_CONTENT = {
  'basics': [
    { en: "Red, Blue and Yellow", pt: "Vermelho, Azul e Amarelo", ctx: "Cores" },
    { en: "One, Two, Three", pt: "Um, Dois, Três", ctx: "Números" },
    { en: "Green and Orange", pt: "Verde e Laranja", ctx: "Cores" },
    { en: "Four, Five, Six", pt: "Quatro, Cinco, Seis", ctx: "Números" }
  ],
  'greetings': [
    { en: "Hello, nice to meet you!", pt: "Olá, prazer em te conhecer!", ctx: "Cumprimentos" },
    { en: "Good morning!", pt: "Bom dia!", ctx: "Cumprimentos" },
    { en: "How are you?", pt: "Como você está?", ctx: "Cumprimentos" },
    { en: "Goodbye, see you later.", pt: "Adeus, até logo.", ctx: "Despedidas" }
  ],
  'school': [
    { en: "This is a book.", pt: "Isto é um livro.", ctx: "Objetos" },
    { en: "Where is the library?", pt: "Onde fica a biblioteca?", ctx: "Escola" },
    { en: "I need to study.", pt: "Eu preciso estudar.", ctx: "Rotina" },
    { en: "My teacher is nice.", pt: "Meu professor é legal.", ctx: "Escola" }
  ],
  'professions': [
    { en: "I want to be a doctor.", pt: "Eu quero ser médico.", ctx: "Profissões" },
    { en: "She is an engineer.", pt: "Ela é engenheira.", ctx: "Profissões" },
    { en: "He works in an office.", pt: "Ele trabalha em um escritório.", ctx: "Trabalho" }
  ],
  'travel': [
    { en: "Where is the airport?", pt: "Onde fica o aeroporto?", ctx: "Viagem" },
    { en: "I have a passport.", pt: "Eu tenho um passaporte.", ctx: "Documentos" },
    { en: "I love to travel.", pt: "Eu amo viajar.", ctx: "Hobbies" }
  ]
};

export const CURRICULUM = {
  Jovem: LESSONS_CONTENT['basics'],
  Adolescente: LESSONS_CONTENT['school'],
  Adulta: LESSONS_CONTENT['professions'],
  Idosa: LESSONS_CONTENT['travel']
};

export const CONVERSATIONS = {
  Jovem: {
    title: "Na Escola (Cumprimentos)",
    lines: [
      { type: 'npc', name: 'Teacher Buzz', text: "Good morning! Welcome to the Hive Academy." },
      { type: 'player', options: [
        { text: "Good morning, teacher!", correct: true },
        { text: "I like honey.", correct: false }
      ]},
      { type: 'npc', name: 'Teacher Buzz', text: "How are you feeling today?" },
      { type: 'player', options: [
        { text: "I am very happy and ready to learn!", correct: true },
        { text: "My name is Buzzy.", correct: false }
      ]},
      { type: 'npc', name: 'Teacher Buzz', text: "That is wonderful! Let's start our English lesson." }
    ]
  },
  Adolescente: {
    title: "Escolhendo o Futuro (Profissões)",
    lines: [
      { type: 'npc', name: 'Conselheira', text: "Hello! Have you thought about your future profession?" },
      { type: 'player', options: [
        { text: "Yes, I want to be an engineer.", correct: true },
        { text: "I am a student.", correct: false }
      ]},
      { type: 'npc', name: 'Conselheira', text: "An engineer! That requires a lot of math. Are you ready?" },
      { type: 'player', options: [
        { text: "I will study very hard!", correct: true },
        { text: "I don't know where the library is.", correct: false }
      ]},
      { type: 'npc', name: 'Conselheira', text: "I believe in you. Good luck!" }
    ]
  },
  Adulta: {
    title: "Reunião de Trabalho (Negócios)",
    lines: [
      { type: 'npc', name: 'Chefe', text: "Good afternoon. Do you have the productivity report?" },
      { type: 'player', options: [
        { text: "Yes, here is the report.", correct: true },
        { text: "I am eating pollen.", correct: false }
      ]},
      { type: 'npc', name: 'Chefe', text: "Excellent. Did our honey production increase?" },
      { type: 'player', options: [
        { text: "Yes, we increased by 20%.", correct: true },
        { text: "I completely disagree with you.", correct: false }
      ]},
      { type: 'npc', name: 'Chefe', text: "Great job! Keep up the good work for the hive." }
    ]
  },
  Idosa: {
    title: "Passando Sabedoria (Conselhos)",
    lines: [
      { type: 'npc', name: 'Jovem Abelha', text: "Excuse me, can you give me some advice?" },
      { type: 'player', options: [
        { text: "Of course! Always work as a team.", correct: true },
        { text: "I want to sleep now.", correct: false }
      ]},
      { type: 'npc', name: 'Jovem Abelha', text: "Is teamwork really that important?" },
      { type: 'player', options: [
        { text: "Yes, together we are stronger.", correct: true },
        { text: "No, do everything alone.", correct: false }
      ]},
      { type: 'npc', name: 'Jovem Abelha', text: "Thank you for the wisdom! I will remember that." }
    ]
  }
};

export const QUIZ_WORDS = [
  { en: 'Bee', pt: 'Abelha', options: ['Abelha', 'Mosca', 'Pássaro', 'Formiga'] },
  { en: 'Honey', pt: 'Mel', options: ['Açúcar', 'Néctar', 'Mel', 'Xarope'] },
  { en: 'Flower', pt: 'Flor', options: ['Folha', 'Árvore', 'Raiz', 'Flor'] },
  { en: 'Hive', pt: 'Colmeia', options: ['Casa', 'Colmeia', 'Ninho', 'Caixa'] },
  { en: 'Queen', pt: 'Rainha', options: ['Princesa', 'Zangão', 'Rainha', 'Rei'] },
  { en: 'Yellow', pt: 'Amarelo', options: ['Azul', 'Vermelho', 'Verde', 'Amarelo'] },
  { en: 'Wings', pt: 'Asas', options: ['Pernas', 'Asas', 'Olhos', 'Antenas'] },
];

export const PROFESSIONS = {
  operario: { name: 'Operário', mult: 1.0, icon: Settings, color: 'bg-gray-400' },
  soldado: { name: 'Soldado', mult: 1.2, icon: Shield, color: 'bg-red-500' },
  enfermeiro: { name: 'Enfermeiro', mult: 1.5, icon: Heart, color: 'bg-pink-400' },
  engenheiro: { name: 'Engenheiro', mult: 1.8, icon: Wrench, color: 'bg-orange-500' },
  medico: { name: 'Médico', mult: 2.2, icon: Activity, color: 'bg-green-500' },
  administrador: { name: 'Administrador', mult: 2.5, icon: Briefcase, color: 'bg-blue-500' }
};

export const COSMETICS = [
  { id: 'glasses', name: 'Óculos Cool', price: 150, icon: '🕶️' },
  { id: 'bowtie', name: 'Gravata Borboleta', price: 100, icon: '🎀' },
  { id: 'headphone', name: 'Fones Gamer', price: 250, icon: '🎧' },
  { id: 'crown', name: 'Coroa Real', price: 500, icon: '👑' }
];

export const LEARNING_PATH = [
  { id: 1, type: 'start', title: 'Início', level: 1, icon: '🚀', description: 'Sua jornada começa aqui.', lessonId: 'basics' },
  { id: 2, type: 'lesson', title: 'Cores & Números', level: 1, icon: '🎨', description: 'Aprenda o básico.', lessonId: 'basics' },
  { id: 3, type: 'lesson', title: 'Cumprimentos', level: 2, icon: '👋', description: 'Diga olá ao mundo.', lessonId: 'greetings' },
  { id: 4, type: 'chest', title: 'Baú de Incentivo', level: 2, icon: '🎁', reward: 20, description: 'Recompensa especial.' },
  { id: 5, type: 'lesson', title: 'Escola & Rotina', level: 3, icon: '📚', description: 'Vocabulário do dia a dia.', lessonId: 'school' },
  { id: 6, type: 'quiz', title: 'Quiz Rápido', level: 3, icon: '⚡', description: 'Teste seus conhecimentos.' },
  { id: 7, type: 'lesson', title: 'Profissões', level: 4, icon: '💼', description: 'O que você quer ser?', lessonId: 'professions' },
  { id: 8, type: 'chest', title: 'Baú Raro', level: 5, icon: '💎', reward: 50, description: 'Um tesouro valioso.' },
  { id: 9, type: 'lesson', title: 'Viagens & Turismo', level: 6, icon: '✈️', description: 'Explore novos lugares.', lessonId: 'travel' },
  { id: 10, type: 'boss', title: 'Desafio Final', level: 10, icon: '🏆', description: 'Prove sua maestria.' }
];

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
  // MÓDULO 1: BÁSICO (Fundamentos)
  'basics_1': [ // Cores e Números
    { en: "Red, Blue and Yellow", pt: "Vermelho, Azul e Amarelo", ctx: "Cores" },
    { en: "One, Two, Three", pt: "Um, Dois, Três", ctx: "Números" },
    { en: "Green and Orange", pt: "Verde e Laranja", ctx: "Cores" },
    { en: "Four, Five, Six", pt: "Quatro, Cinco, Seis", ctx: "Números" }
  ],
  'basics_2': [ // Cumprimentos
    { en: "Hello, nice to meet you!", pt: "Olá, prazer em te conhecer!", ctx: "Cumprimentos" },
    { en: "Good morning!", pt: "Bom dia!", ctx: "Cumprimentos" },
    { en: "How are you?", pt: "Como você está?", ctx: "Cumprimentos" },
    { en: "Goodbye, see you later.", pt: "Adeus, até logo.", ctx: "Despedidas" }
  ],
  'basics_3': [ // Família
    { en: "This is my mother.", pt: "Esta é a minha mãe.", ctx: "Família" },
    { en: "My father is tall.", pt: "Meu pai é alto.", ctx: "Família" },
    { en: "I have a brother.", pt: "Eu tenho um irmão.", ctx: "Família" },
    { en: "My sister loves cats.", pt: "Minha irmã ama gatos.", ctx: "Família" }
  ],
  'basics_4': [ // Objetos Comuns
    { en: "The book is on the table.", pt: "O livro está sobre a mesa.", ctx: "Objetos" },
    { en: "I need a pen.", pt: "Eu preciso de uma caneta.", ctx: "Objetos" },
    { en: "This chair is comfortable.", pt: "Esta cadeira é confortável.", ctx: "Objetos" },
    { en: "Where is my bag?", pt: "Onde está a minha bolsa?", ctx: "Objetos" }
  ],
  'basics_5': [ // Animais
    { en: "The dog barks.", pt: "O cachorro late.", ctx: "Animais" },
    { en: "Cats are cute.", pt: "Gatos são fofos.", ctx: "Animais" },
    { en: "Birds can fly.", pt: "Pássaros podem voar.", ctx: "Animais" },
    { en: "The fish swims.", pt: "O peixe nada.", ctx: "Animais" }
  ],
  'basics_6': [ // Comida
    { en: "I like apples.", pt: "Eu gosto de maçãs.", ctx: "Comida" },
    { en: "Water is important.", pt: "Água é importante.", ctx: "Comida" },
    { en: "Do you want bread?", pt: "Você quer pão?", ctx: "Comida" },
    { en: "Milk and coffee.", pt: "Leite e café.", ctx: "Comida" }
  ],

  // MÓDULO 2: INTERMEDIÁRIO (Construção)
  'inter_1': [ // Escola
    { en: "Where is the library?", pt: "Onde fica a biblioteca?", ctx: "Escola" },
    { en: "I have a math test.", pt: "Tenho um teste de matemática.", ctx: "Escola" },
    { en: "My teacher is smart.", pt: "Meu professor é inteligente.", ctx: "Escola" },
    { en: "Open your books.", pt: "Abram seus livros.", ctx: "Escola" }
  ],
  'inter_2': [ // Rotina
    { en: "I wake up at 7 AM.", pt: "Eu acordo às 7 da manhã.", ctx: "Rotina" },
    { en: "I brush my teeth.", pt: "Eu escovo meus dentes.", ctx: "Rotina" },
    { en: "I go to work by bus.", pt: "Eu vou para o trabalho de ônibus.", ctx: "Rotina" },
    { en: "I sleep early.", pt: "Eu durmo cedo.", ctx: "Rotina" }
  ],
  'inter_3': [ // Clima
    { en: "It is sunny today.", pt: "Está ensolarado hoje.", ctx: "Clima" },
    { en: "Is it raining?", pt: "Está chovendo?", ctx: "Clima" },
    { en: "It is very cold.", pt: "Está muito frio.", ctx: "Clima" },
    { en: "The sky is blue.", pt: "O céu está azul.", ctx: "Clima" }
  ],
  'inter_4': [ // Hobbies
    { en: "I like to play soccer.", pt: "Eu gosto de jogar futebol.", ctx: "Hobbies" },
    { en: "She loves reading.", pt: "Ela ama ler.", ctx: "Hobbies" },
    { en: "Do you play guitar?", pt: "Você toca violão?", ctx: "Hobbies" },
    { en: "We watch movies.", pt: "Nós assistimos filmes.", ctx: "Hobbies" }
  ],
  'inter_5': [ // Viagem
    { en: "Where is the passport?", pt: "Onde está o passaporte?", ctx: "Viagem" },
    { en: "I want a window seat.", pt: "Eu quero um assento na janela.", ctx: "Viagem" },
    { en: "The flight is delayed.", pt: "O voo está atrasado.", ctx: "Viagem" },
    { en: "I love new places.", pt: "Eu amo novos lugares.", ctx: "Viagem" }
  ],
  'inter_6': [ // Compras
    { en: "How much is this?", pt: "Quanto custa isto?", ctx: "Compras" },
    { en: "I want to buy a shirt.", pt: "Eu quero comprar uma camisa.", ctx: "Compras" },
    { en: "Do you accept credit card?", pt: "Você aceita cartão de crédito?", ctx: "Compras" },
    { en: "It is too expensive.", pt: "É muito caro.", ctx: "Compras" }
  ],

  // MÓDULO 3: AVANÇADO (Conversação)
  'adv_1': [ // Profissões
    { en: "I work as a developer.", pt: "Eu trabalho como desenvolvedor.", ctx: "Profissões" },
    { en: "She is a great doctor.", pt: "Ela é uma ótima médica.", ctx: "Profissões" },
    { en: "He manages the team.", pt: "Ele gerencia a equipe.", ctx: "Profissões" },
    { en: "We are hiring.", pt: "Estamos contratando.", ctx: "Profissões" }
  ],
  'adv_2': [ // Negócios
    { en: "Let's schedule a meeting.", pt: "Vamos agendar uma reunião.", ctx: "Negócios" },
    { en: "Send me the report.", pt: "Envie-me o relatório.", ctx: "Negócios" },
    { en: "We need to increase sales.", pt: "Precisamos aumentar as vendas.", ctx: "Negócios" },
    { en: "The project is finished.", pt: "O projeto está finalizado.", ctx: "Negócios" }
  ],
  'adv_3': [ // Tecnologia
    { en: "The internet is slow.", pt: "A internet está lenta.", ctx: "Tecnologia" },
    { en: "I need to update my phone.", pt: "Preciso atualizar meu celular.", ctx: "Tecnologia" },
    { en: "Is there Wi-Fi here?", pt: "Tem Wi-Fi aqui?", ctx: "Tecnologia" },
    { en: "Technology changes fast.", pt: "A tecnologia muda rápido.", ctx: "Tecnologia" }
  ],
  'adv_4': [ // Emoções
    { en: "I am feeling happy.", pt: "Estou me sentindo feliz.", ctx: "Emoções" },
    { en: "Why are you sad?", pt: "Por que você está triste?", ctx: "Emoções" },
    { en: "Don't be angry.", pt: "Não fique com raiva.", ctx: "Emoções" },
    { en: "I am excited!", pt: "Estou empolgado!", ctx: "Emoções" }
  ],
  'adv_5': [ // Saúde
    { en: "I have a headache.", pt: "Estou com dor de cabeça.", ctx: "Saúde" },
    { en: "Drink more water.", pt: "Beba mais água.", ctx: "Saúde" },
    { en: "I need to see a doctor.", pt: "Preciso ver um médico.", ctx: "Saúde" },
    { en: "Exercise is good.", pt: "Exercício é bom.", ctx: "Saúde" }
  ],
  'adv_6': [ // Meio Ambiente
    { en: "Save the bees.", pt: "Salve as abelhas.", ctx: "Natureza" },
    { en: "Pollution is bad.", pt: "Poluição é ruim.", ctx: "Natureza" },
    { en: "We must recycle.", pt: "Devemos reciclar.", ctx: "Natureza" },
    { en: "Nature is beautiful.", pt: "A natureza é linda.", ctx: "Natureza" }
  ]
};

export const CURRICULUM = {
  Jovem: LESSONS_CONTENT['basics_1'],
  Adolescente: LESSONS_CONTENT['inter_1'],
  Adulta: LESSONS_CONTENT['adv_1'],
  Idosa: LESSONS_CONTENT['inter_5']
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
  // MÓDULO 1: BÁSICO (1-8)
  { id: 1, type: 'start', title: 'Básico: Início', level: 1, icon: '🚀', description: 'Comece pelo essencial.', lessonId: 'basics_1' },
  { id: 2, type: 'lesson', title: 'Cores & Números', level: 1, icon: '🎨', description: 'Fundamentos.', lessonId: 'basics_1' },
  { id: 3, type: 'lesson', title: 'Cumprimentos', level: 2, icon: '👋', description: 'Olá e Tchau.', lessonId: 'basics_2' },
  { id: 4, type: 'lesson', title: 'Família', level: 3, icon: '👨‍👩‍👧', description: 'Quem é quem?', lessonId: 'basics_3' },
  { id: 5, type: 'chest', title: 'Baú Básico', level: 3, icon: '🎁', reward: 20, description: 'Recompensa.' },
  { id: 6, type: 'lesson', title: 'Objetos', level: 4, icon: '✏️', description: 'Coisas do dia a dia.', lessonId: 'basics_4' },
  { id: 7, type: 'lesson', title: 'Animais', level: 5, icon: '🐶', description: 'Nossos amigos.', lessonId: 'basics_5' },
  { id: 8, type: 'lesson', title: 'Comida', level: 6, icon: '🍎', description: 'Alimentação.', lessonId: 'basics_6' },
  { id: 9, type: 'quiz', title: 'Quiz Básico', level: 7, icon: '⚡', description: 'Revisão do Módulo 1.' },
  { id: 10, type: 'chest', title: 'Super Baú', level: 8, icon: '💎', reward: 50, description: 'Grande prêmio.' },

  // MÓDULO 2: INTERMEDIÁRIO (9-16)
  { id: 11, type: 'lesson', title: 'Inter: Escola', level: 9, icon: '📚', description: 'Aprendizado.', lessonId: 'inter_1' },
  { id: 12, type: 'lesson', title: 'Rotina Diária', level: 10, icon: '⏰', description: 'Dia a dia.', lessonId: 'inter_2' },
  { id: 13, type: 'lesson', title: 'Clima & Tempo', level: 11, icon: '☀️', description: 'Como está o tempo?', lessonId: 'inter_3' },
  { id: 14, type: 'lesson', title: 'Hobbies', level: 12, icon: '⚽', description: 'O que você gosta?', lessonId: 'inter_4' },
  { id: 15, type: 'chest', title: 'Baú Interm.', level: 13, icon: '🎁', reward: 30, description: 'Continue assim!' },
  { id: 16, type: 'lesson', title: 'Viagem', level: 14, icon: '✈️', description: 'Pelo mundo.', lessonId: 'inter_5' },
  { id: 17, type: 'lesson', title: 'Compras', level: 15, icon: '🛍️', description: 'Gastando HNY.', lessonId: 'inter_6' },
  { id: 18, type: 'quiz', title: 'Quiz Interm.', level: 16, icon: '⚡', description: 'Revisão do Módulo 2.' },

  // MÓDULO 3: AVANÇADO (17-25)
  { id: 19, type: 'lesson', title: 'Avançado: Profissões', level: 17, icon: '💼', description: 'Carreira.', lessonId: 'adv_1' },
  { id: 20, type: 'lesson', title: 'Negócios', level: 18, icon: '🤝', description: 'Corporativo.', lessonId: 'adv_2' },
  { id: 21, type: 'lesson', title: 'Tecnologia', level: 19, icon: '💻', description: 'Mundo digital.', lessonId: 'adv_3' },
  { id: 22, type: 'chest', title: 'Baú Épico', level: 20, icon: '👑', reward: 100, description: 'Recompensa Elite.' },
  { id: 23, type: 'lesson', title: 'Emoções', level: 21, icon: '🎭', description: 'Sentimentos.', lessonId: 'adv_4' },
  { id: 24, type: 'lesson', title: 'Saúde', level: 22, icon: '🏥', description: 'Cuidados.', lessonId: 'adv_5' },
  { id: 25, type: 'lesson', title: 'Meio Ambiente', level: 23, icon: '🌍', description: 'Planeta.', lessonId: 'adv_6' },
  { id: 26, type: 'boss', title: 'Fluência Total', level: 25, icon: '🏆', description: 'O Desafio Final.' }
];
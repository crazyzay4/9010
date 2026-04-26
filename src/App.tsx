import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Play, Star, MapPin, Coffee, Car, X, Home, Facebook, Twitter, Instagram, Gamepad2, Trophy, RefreshCcw, Globe } from 'lucide-react';

const TRANSLATIONS = {
  ua: {
    heroTitle: 'Поза межами',
    heroSubtitle: 'Міннесоти',
    heroDesc1: 'Ласкаво просимо до найпрестижнішого поштового індексу у світі. Коли близнюки Брендон і Бренда Волш переїжджають зі спокійної Міннесоти до гламурного Беверлі-Хіллз, їхнє життя змінюється назавжди.',
    heroDesc2: 'Нова школа West Beverly High, елітні вечірки, перше справжнє кохання, складні підліткові проблеми, зради та дружба, яка переживе будь-які випробування.',
    houseTitle: 'Культова локація',
    houseDesc1: 'Дім родини Волш (Альтудено, Каліфорнія) став справжнім серцем серіалу. Саме тут, на легендарній кухні, обговорювалися найважливіші події.',
    houseDesc2: 'Побудований у стилі Spanish Colonial Revival, цей будинок символізував американську мрію та родинний затишок, контрастуючи з більш холодними особняками менш щасливих у сімейному плані підлітків Беверлі-Хіллз.',
    charsTitle: 'Знайомтесь з елітою',
    charsSubtitle: 'Натисніть на фото, щоб дізнатися більше',
    gameTitle: 'Memory Match',
    gameSubtitle: 'Знайди пару кожному герою!',
    moves: 'Ходів',
    win: 'Перемога!',
    restart: 'Почати заново',
    episodesTitle: 'Гід по Епізодах',
    episodesSubtitle: 'Освіжіть пам\'ять або оберіть вашу улюблену серію з 1-го сезону для перегляду сьогодні вночі.',
    watchNow: 'Дивитися зараз',
    watch: 'Дивитися',
    stream: 'Stream'
  },
  en: {
    heroTitle: 'Beyond',
    heroSubtitle: 'Minnesota',
    heroDesc1: 'Welcome to the most prestigious zip code in the world. When twins Brandon and Brenda Walsh move from quiet Minnesota to glamorous Beverly Hills, their lives change forever.',
    heroDesc2: 'The new West Beverly High, elite parties, first true love, complex teen issues, betrayals, and friendship that will survive any trial.',
    houseTitle: 'Iconic Location',
    houseDesc1: 'The Walsh family home (Altadena, California) became the true heart of the series. This is where, in the legendary kitchen, the most important events were discussed.',
    houseDesc2: 'Built in the Spanish Colonial Revival style, this house symbolized the American dream and family comfort, contrasting with the colder mansions of the less fortunate Beverly Hills teens.',
    charsTitle: 'Meet the Elite',
    charsSubtitle: 'Click on a photo to learn more',
    gameTitle: 'Memory Match',
    gameSubtitle: 'Find a pair for each character!',
    moves: 'Moves',
    win: 'Victory!',
    restart: 'Restart',
    episodesTitle: 'Episode Guide',
    episodesSubtitle: 'Refresh your memory or choose your favorite episode from season 1 to watch tonight.',
    watchNow: 'Watch Now',
    watch: 'Watch',
    stream: 'Stream',
    characters: {
      brandon: {
        role: 'Idealist from Minnesota',
        bio: 'Brandon is the moral compass of the group. He always tries to do the right thing, is passionate about journalism, and works at the Peach Pit. Moving from Minnesota to Beverly Hills was a challenge for him, but he quickly won the respect of new friends.',
        car: '1965 Ford Mustang (nicknamed "Mondale")'
      },
      brenda: {
        role: 'Rebel with a Kind Heart',
        bio: 'Brandon\'s twin sister. Brenda quickly embraced the glamorous lifestyle of Beverly Hills. She is emotional, sometimes impulsive, but a loyal friend. Her relationship with Dylan became one of the most interesting storylines of the series.',
        car: 'Red Volkswagen Cabriolet'
      },
      kelly: {
        role: 'High School Queen',
        bio: 'At first glance, Kelly is a typical spoiled Beverly Hills blonde, but as the story develops, she reveals herself as a deep person struggling with family problems and looking for true love.',
        car: 'Red BMW 325i Convertible'
      },
      dylan: {
        role: 'Mysterious Lone Wolf',
        bio: 'Dylan is a modern James Dean. A guy from a rich family, but with big problems. He\'s a surfer, likes to read poetry, and has a complex relationship with his father. His love triangle with Brenda and Kelly became legendary.',
        car: 'Black 1990 Porsche 356 Speedster (replica)'
      },
      steve: {
        role: 'Life of the Party',
        bio: 'Stylish, rich, and a bit frivolous. Steve is a typical rich kid, but with a good heart. His mom is a famous TV star. He is always ready to party and often gets into funny situations.',
        car: 'Black Chevrolet Corvette C4 (plate "I8A 4RE")'
      },
      donna: {
        role: 'Naive and Loyal Friend',
        bio: 'Donna is Kelly\'s best friend. She grew up in a strict Catholic family, always dresses in the latest fashion, and dreams of becoming a designer. She is distinguished by her kindness and naivety.',
        car: 'Red BMW Convertible / Red Pontiac'
      },
      david: {
        role: 'Aspiring Musician',
        bio: 'Younger than the others, David tried to gain popularity and a place in the group. He is the school radio DJ, writes music, and eventually becomes an integral part of the group and Donna\'s love.',
        car: 'Various vintage cars, later SUVs'
      },
      andrea: {
        role: 'Smart Editor',
        bio: 'The editor-in-chief of the school newspaper. Andrea is not from Beverly Hills and has to hide her real address to study at West Beverly. She is extremely smart, principled, and secretly in love with Brandon.',
        car: 'Initially didn\'t have her own car, took the bus, later practical sedans'
      },
      valerie: {
        role: 'Cunning Beauty',
        bio: 'A family friend of the Walshes from Minnesota who comes to stay after Brenda leaves. She is manipulative, secretive, but ultimately looking for love and a place to belong.',
        car: 'Red Porsche 911 Carrera Cabriolet'
      },
      clare: {
        role: 'Rebellious Chancellor\'s Daughter',
        bio: 'Daughter of the California University chancellor. Intelligent, wild, and incredibly forward. She pursues Brandon relentlessly before mellowing out and joining the main cast permanently.',
        car: 'Silver BMW Z3'
      },
      matt: {
        role: 'Idealistic Lawyer',
        bio: 'A young lawyer who sets up a practice in the same building as Kelly\'s PR firm. A good guy who often takes on pro bono cases, becoming Kelly\'s major love interest in later seasons.',
        car: 'Classic Ford Mustang (Blue)'
      },
      gina: {
        role: 'Jealous Cousin',
        bio: 'Donna\'s cousin and former ice skating champion who comes to LA. Feeling inadequate next to Donna\'s wealth, she often acts out of jealousy and resentment.',
        car: 'Yellow Volkswagen New Beetle'
      },
      noah: {
        role: 'Broody Heir',
        bio: 'A seemingly poor boat dock worker who turns out to be the heir to a massive oil fortune. Haunted by tragedy, he becomes a staple of the group in the later years.',
        car: 'Black Range Rover'
      }
    },
    episodes: {
      ep1: {
        title: 'Class of Beverly Hills (Pilot)',
        synopsis: 'The Walsh twins move from Minnesota to Beverly Hills. Brandon and Brenda start their first day at West Beverly High, experiencing culture shock.'
      },
      ep2: {
        title: 'Slumber Party',
        synopsis: 'Brenda hosts a slumber party that gets out of hand. Meanwhile, Steve, Brandon, and Dylan hang out and Steve accidentally hires a call girl.'
      },
      ep3: {
        title: 'Commencement',
        synopsis: 'The gang finally graduates from West Beverly High. Memories are shared, tears are shed, and everyone prepares for the next big step in their lives.'
      },
      ep4: {
        title: 'Ode to Joy (Series Finale)',
        synopsis: 'David and Donna finally get married. The series concludes with a nostalgic farewell to the group that grew up together in Beverly Hills.'
      }
    }
  }
};

const CHARACTERS = [
  {
    id: 'brandon',
    name: 'Брендон Волш',
    nameEn: 'Brandon Walsh',
    role: 'Ідеаліст з Міннесоти',
    color: 'bg-vibrant-teal',
    border: 'border-vibrant-teal',
    portrait: '/брендон.jpg',
    rotation: '-rotate-3',
    textColor: 'text-black',
    bio: 'Брендон — моральний компас компанії. Він завжди намагається чинити правильно, захоплюється журналістикою та працює в Peach Pit. Переїзд із Міннесоти до Беверлі-Хіллз став для нього викликом, але він швидко завоював повагу нових друзів.',
    car: '1965 Ford Mustang (на прізвисько "Mondale")'
  },
  {
    id: 'brenda',
    name: 'Бренда Волш',
    nameEn: 'Brenda Walsh',
    role: 'Бунтарка з добрим серцем',
    color: 'bg-vibrant-yellow',
    border: 'border-vibrant-yellow',
    portrait: '/бренда.jpg',
    rotation: 'rotate-2',
    textColor: 'text-black',
    bio: 'Сестра-близнючка Брендона. Бренда швидко сприйняла гламурний спосіб життя Беверлі-Хіллз. Вона емоційна, іноді імпульсивна, але вірна подруга. Її стосунки з Діланом стали однією з найцікавіших ліній серіалу.',
    car: 'Червоний Volkswagen Cabriolet'
  },
  {
    id: 'kelly',
    name: 'Келлі Тейлор',
    nameEn: 'Kelly Taylor',
    role: 'Королева школи',
    color: 'bg-pink-500',
    border: 'border-pink-300',
    portrait: '/келлі.jpeg',
    rotation: '-rotate-2',
    textColor: 'text-white',
    bio: 'На перший погляд Келлі — типова розпещена блондинка з Беверлі-Хіллз, але з розвитком сюжету вона розкривається як глибока особистість, що бореться з сімейними проблемами та шукає справжнє кохання.',
    car: 'Червоний кабріолет BMW 325i'
  },
  {
    id: 'dylan',
    name: 'Ділан Маккей',
    nameEn: 'Dylan McKay',
    role: 'Загадковий самотній вовк',
    color: 'bg-black',
    border: 'border-black',
    portrait: '/діллан.webp',
    rotation: 'rotate-3',
    textColor: 'text-white',
    bio: 'Ділан — сучасний Джеймс Дін. Хлопець із багатої родини, але з великими проблемами. Він серфінгіст, любить читати поезію і має складні стосунки з батьком. Його любовний трикутник з Брендою та Келлі став легендарним.',
    car: 'Чорний 1990 Porsche 356 Speedster (репліка)'
  },
  {
    id: 'steve',
    name: 'Стів Сандерс',
    nameEn: 'Steve Sanders',
    role: 'Душа компанії',
    color: 'bg-white',
    border: 'border-white',
    portrait: '/стіві.webp',
    rotation: '-rotate-3',
    textColor: 'text-vibrant-pink',
    bio: 'Стильний, багатий і трохи легковажний. Стів — типовий мажор, але з добрим серцем. Його мама — відома телезірка. Він завжди готовий до вечірок і часто потрапляє у кумедні перепитії.',
    car: 'Чорний Chevrolet Corvette C4 (номер "I8A 4RE")'
  },
  {
    id: 'donna',
    name: 'Донна Мартін',
    nameEn: 'Donna Martin',
    role: 'Наївна та вірна подруга',
    color: 'bg-vibrant-yellow',
    border: 'border-vibrant-yellow',
    portrait: '/донна.webp',
    rotation: 'rotate-2',
    textColor: 'text-black',
    bio: 'Донна — найкраща подруга Келлі. Вона виросла в суворій католицькій родині, завжди одягається за останньою модою і мріє стати дизайнеркою. Відрізняється добротою та наївністю.',
    car: 'Червоний BMW кабріолет / Червоний Pontiac'
  },
  {
    id: 'david',
    name: 'Девід Сільвер',
    nameEn: 'David Silver',
    role: 'Музикант-початківець',
    color: 'bg-vibrant-teal',
    border: 'border-vibrant-teal',
    portrait: '/девід.jpg',
    rotation: '-rotate-2',
    textColor: 'text-black',
    bio: 'Молодший за інших, Девід намагався завоювати популярність і місце в компанії. Він діджей шкільного радіо, пише музику і зрештою стає невід\'ємною частиною групи та коханням Донни.',
    car: 'Різні вінтажні авто, пізніше позашляховики'
  },
  {
    id: 'andrea',
    name: 'Андреа Цукерман',
    nameEn: 'Andrea Zuckerman',
    role: 'Розумна редакторка',
    color: 'bg-pink-500',
    border: 'border-pink-300',
    portrait: '/андреа.jpg',
    rotation: 'rotate-3',
    textColor: 'text-white',
    bio: 'Головна редакторка шкільної газети. Андреа не з Беверлі-Хіллз і змушена приховувати свою справжню адресу, щоб навчатися у West Beverly. Вона надзвичайно розумна, принципова і таємно закохана в Брендона.',
    car: 'Спочатку не мала власного авто, їздила на автобусі, пізніше практичні седани'
  },
  {
    id: 'valerie',
    name: 'Валері Мелоун',
    nameEn: 'Valerie Malone',
    role: 'Хитра красуня',
    color: 'bg-vibrant-pink',
    border: 'border-vibrant-pink',
    portrait: '/валері.webp',
    rotation: '-rotate-2',
    textColor: 'text-white',
    bio: 'Подруга родини Волшів з Міннесоти, яка приїжджає після від\'їзду Бренди. Вона маніпулятивна, скритна, але в глибині душі шукає любов і своє місце в світі.',
    car: 'Червоний Porsche 911 Carrera Cabriolet'
  },
  {
    id: 'clare',
    name: 'Клер Арнольд',
    nameEn: 'Clare Arnold',
    role: 'Бунтарка на кампусі',
    color: 'bg-vibrant-yellow',
    border: 'border-vibrant-yellow',
    portrait: '/клер.jpg',
    rotation: 'rotate-3',
    textColor: 'text-black',
    bio: 'Донька ректора Каліфорнійського університету. Розумна, дика та неймовірно прямолінійна. Спочатку переслідує Брендона, а потім стає невід\'ємною частиною компанії.',
    car: 'Сріблястий BMW Z3'
  },
  {
    id: 'matt',
    name: 'Метт Дьорнінг',
    nameEn: 'Matt Durning',
    role: 'Ідеалістичний адвокат',
    color: 'bg-vibrant-teal',
    border: 'border-vibrant-teal',
    portrait: 'https://placehold.co/400x500/00ffee/000?text=Matt',
    rotation: '-rotate-3',
    textColor: 'text-black',
    bio: 'Молодий адвокат, який відкриває практику в тій самій будівлі, що й PR-агентство Келлі. Хороший хлопець, який часто бере справи pro bono, стає головним коханням Келлі в пізніх сезонах.',
    car: 'Класичний Ford Mustang (Синій)'
  },
  {
    id: 'gina',
    name: 'Джинна Кінкейд',
    nameEn: 'Gina Kincaid',
    role: 'Заздрісна кузина',
    color: 'bg-black',
    border: 'border-black',
    portrait: '/джинна.jpg',
    rotation: 'rotate-2',
    textColor: 'text-white',
    bio: 'Кузина Донни і колишня чемпіонка з фігурного катання. Почуваючись неповноцінною поруч із багатством Донни, вона часто діє з заздрості та образи.',
    car: 'Жовтий Volkswagen New Beetle'
  },
  {
    id: 'noah',
    name: 'Ноа Хантер',
    nameEn: 'Noah Hunter',
    role: 'Спадкоємець із таємницею',
    color: 'bg-white',
    border: 'border-white',
    portrait: '/ноа.webp',
    rotation: '-rotate-2',
    textColor: 'text-vibrant-pink',
    bio: 'На перший погляд бідний працівник порту, який виявляється спадкоємцем величезних статків. Переслідуваний трагедією, він стає важливою частиною групи.',
    car: 'Чорний Range Rover'
  }
];

const EPISODES = [
  {
    t_id: 'ep1',
    id: 'S01E01',
    title: 'Клас Беверлі-Хіллз (Пілот)',
    synopsis: 'Близнюки Волш переїжджають з Міннесоти в Беверлі-Хіллз. Брендон і Бренда розпочинають перший день у школі West Beverly High, стикаючись із культурним шоком.',
    link: 'https://uakino.club/search?q=Беверлі-Гіллз+90210',
    color: 'bg-vibrant-pink'
  },
  {
    t_id: 'ep2',
    id: 'S01E13',
    title: 'Піжамна вечірка',
    synopsis: 'Бренда влаштовує піжамну вечірку, що виходить з-під контролю. Тим часом Стів, Ділан і Брендон випадково викликають "дівчину за викликом".',
    link: 'https://uaserials.pro/search/?do=search&subaction=search&story=%D0%91%D0%B5%D0%B2%D0%B5%D1%80%D0%BB%D1%96',
    color: 'bg-vibrant-teal'
  },
  {
    t_id: 'ep3',
    id: 'S03E29',
    title: 'Випускний',
    synopsis: 'Компанія нарешті закінчує школу West Beverly High. Усі згадують минуле, готуються до дорослого життя і прощаються зі школою.',
    link: 'https://uakino.club/search?q=Беверлі-Гіллз+90210',
    color: 'bg-vibrant-yellow'
  },
  {
    t_id: 'ep4',
    id: 'S10E27',
    title: 'Ода (Фінал серіалу)',
    synopsis: 'Девід і Донна нарешті одружуються. Серіал завершується ностальгічним прощанням із компанією, яка виросла разом у Беверлі-Хіллз.',
    link: 'https://uaserials.pro/search/?do=search&subaction=search&story=%D0%91%D0%B5%D0%B2%D0%B5%D1%80%D0%BB%D1%96',
    color: 'bg-vibrant-pink'
  }
];

export default function App() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  // Modal state
  const [selectedChar, setSelectedChar] = useState<typeof CHARACTERS[0] | null>(null);
  
  // Easter eggs and interaction states
  const [showDonnaBanner, setShowDonnaBanner] = useState(false);
  const [fallingItems, setFallingItems] = useState<{id: number, emoji: string, left: string}[]>([]);
  const [zipCode, setZipCode] = useState('90210');
  const [subtitleText, setSubtitleText] = useState('The Original Zip Code of Drama');

  // Language state
  const [lang, setLang] = useState<'ua' | 'en'>('ua');
  const t = TRANSLATIONS[lang] as any;

  const [showEndEasterEgg, setShowEndEasterEgg] = useState(false);

  // "90210" Secret Code Hook
  useEffect(() => {
    let keystrokes = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      keystrokes += e.key;
      if (keystrokes.length > 5) keystrokes = keystrokes.slice(-5);
      if (keystrokes === '90210') {
        setShowDonnaBanner(true);
        setTimeout(() => setShowDonnaBanner(false), 6000);
        keystrokes = ''; // reset after success
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePeachPitClick = () => {
    const newItem = {
      id: Date.now() + Math.random(),
      emoji: Math.random() > 0.6 ? '🍔' : (Math.random() > 0.3 ? '☕' : '🍩'),
      left: `${Math.random() * 80 + 10}%`
    };
    setFallingItems(prev => [...prev, newItem]);
    setTimeout(() => {
      setFallingItems(prev => prev.filter(item => item.id !== newItem.id));
    }, 3000);
  };

  // Memory Game Logic
  const generateCards = () => {
    const gameCharacters = CHARACTERS.slice(0, 8); // always 8 pairs (16 cards)
    return [...gameCharacters, ...gameCharacters]
      .map((char) => ({ ...char, gameId: Math.random(), isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(generateCards);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index] = { ...newCards[index], isFlipped: true };
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      if (newCards[newFlipped[0]].name === newCards[newFlipped[1]].name) {
        setTimeout(() => {
          setCards(prev => {
            const next = [...prev];
            next[newFlipped[0]] = { ...next[newFlipped[0]], isMatched: true };
            next[newFlipped[1]] = { ...next[newFlipped[1]], isMatched: true };
            return next;
          });
          setFlippedIndices([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => {
            const next = [...prev];
            next[newFlipped[0]] = { ...next[newFlipped[0]], isFlipped: false };
            next[newFlipped[1]] = { ...next[newFlipped[1]], isFlipped: false };
            return next;
          });
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  const restartGame = () => {
    setCards(generateCards());
    setFlippedIndices([]);
    setMoves(0);
  };

  return (
    <div className="min-h-screen bg-vibrant-pink text-white font-sans selection:bg-vibrant-yellow selection:text-black overflow-hidden relative">
      
      {/* Top Banner */}
      <div className="bg-black text-vibrant-yellow py-2 px-4 overflow-hidden relative z-[60] border-b-4 border-black">
        <motion.div 
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="whitespace-nowrap font-black uppercase tracking-widest text-sm flex gap-10"
        >
          <span>{lang === 'en' ? 'MADE BY GLADKIY IGOR' : 'ЗРОБИВ ГЛАДКИЙ ІГОР'}</span>
          <span>★</span>
          <span>{lang === 'en' ? 'MADE BY GLADKIY IGOR' : 'ЗРОБИВ ГЛАДКИЙ ІГОР'}</span>
          <span>★</span>
          <span>{lang === 'en' ? 'MADE BY GLADKIY IGOR' : 'ЗРОБИВ ГЛАДКИЙ ІГОР'}</span>
          <span>★</span>
          <span>{lang === 'en' ? 'MADE BY GLADKIY IGOR' : 'ЗРОБИВ ГЛАДКИЙ ІГОР'}</span>
        </motion.div>
      </div>

      {/* 90210 Easter Egg Banner Overlay */}
      <AnimatePresence>
        {showDonnaBanner && (
          <motion.div 
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            className="fixed top-0 left-0 right-0 z-[150] bg-vibrant-pink border-b-8 border-black shadow-[0_10px_0_#FFE700] py-4 text-center overflow-hidden flex items-center"
          >
             <motion.div 
               animate={{ x: ['100%', '-100%'] }}
               transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
               className="whitespace-nowrap font-black text-5xl md:text-7xl italic uppercase text-white drop-shadow-[5px_5px_0_#000]"
             >
               DONNA MARTIN GRADUATES! 🎓 DONNA MARTIN GRADUATES! 🎓 DONNA MARTIN GRADUATES!
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Falling Items Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
        <AnimatePresence>
          {fallingItems.map(item => (
            <motion.div
              key={item.id}
              initial={{ y: -100, opacity: 1, rotate: 0 }}
              animate={{ y: '100vh', opacity: 0, rotate: 720 }}
              transition={{ duration: 2.5, ease: 'easeIn' }}
              className="absolute text-7xl"
              style={{ left: item.left }}
            >
              {item.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Background Decorative Shapes (Memphis Style) - Draggable for fun */}
      <motion.div drag dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }} className="absolute -top-10 -left-10 w-64 h-64 bg-vibrant-yellow rounded-full opacity-30 blur-3xl cursor-grab active:cursor-grabbing z-20"></motion.div>
      <motion.div drag dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }} className="absolute top-1/2 -right-20 w-80 h-80 bg-vibrant-teal rounded-full opacity-40 blur-2xl cursor-grab active:cursor-grabbing z-20"></motion.div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-20 bg-vibrant-yellow -rotate-6 transform pointer-events-none z-0"></div>

      {/* Distinct Draggable Memphis Decors */}
      <motion.div drag dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }} className="absolute z-20 top-40 right-20 w-16 h-16 bg-vibrant-yellow border-4 border-black rotate-12 cursor-grab active:cursor-grabbing shadow-[4px_4px_0_#000]" />
      <motion.div drag dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }} className="absolute z-20 bottom-32 left-12 w-20 h-20 bg-vibrant-teal border-4 border-black rounded-full cursor-grab active:cursor-grabbing shadow-[4px_4px_0_#000]" />
      <motion.div drag dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }} className="absolute z-20 top-1/2 left-1/3 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[50px] border-b-pink-500 filter drop-shadow-[4px_4px_0_#000] cursor-grab active:cursor-grabbing" />

      {/* Navigation */}
      <nav className="relative z-30 flex items-center justify-between px-6 md:px-12 py-8">
        <div className="flex items-center space-x-2">
          <div className="bg-white text-vibrant-pink px-3 py-1 font-black text-2xl rounded-sm tracking-tighter">FOX</div>
          <div className="text-xl font-bold uppercase tracking-widest hidden sm:block">Primetime</div>
          
          {/* Language Selector */}
          <div className="ml-4 flex items-center bg-black/50 backdrop-blur-sm rounded-full p-1 border-2 border-white/20">
            <button 
              onClick={() => setLang('ua')}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-colors ${lang === 'ua' ? 'bg-vibrant-yellow text-black' : 'text-white hover:text-vibrant-yellow'}`}
            >
              UA
            </button>
            <button 
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-colors ${lang === 'en' ? 'bg-vibrant-teal text-black' : 'text-white hover:text-vibrant-teal'}`}
            >
              EN
            </button>
          </div>
        </div>
        <div className="hidden md:flex space-x-10 text-sm font-black uppercase tracking-widest bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border-2 border-white/30">
          <a href="#about" className="hover:text-vibrant-yellow transition-colors drop-shadow-md">{lang === 'en' ? 'Story' : 'Сюжет'}</a>
          <a href="#characters" className="hover:text-vibrant-yellow transition-colors drop-shadow-md">{lang === 'en' ? 'Cast' : 'Герої'}</a>
          <a href="#house" className="hover:text-vibrant-yellow transition-colors drop-shadow-md">{lang === 'en' ? 'House' : 'Будинок'}</a>
          <a href="#episodes" className="hover:text-vibrant-yellow transition-colors drop-shadow-md">{lang === 'en' ? 'Episodes' : 'Епізоди'}</a>
          <a href="https://uakino.club/search?q=Беверлі-Гіллз+90210" target="_blank" rel="noopener noreferrer" className="border-b-4 border-vibrant-teal pb-1 hover:text-vibrant-yellow transition-colors drop-shadow-md">
            {t.watch}
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 py-12 md:py-20 mt-10">
        <div className="flex flex-col lg:flex-row items-start gap-16">
          <div className="w-full lg:w-2/3">
            <h2 className="text-vibrant-yellow font-black text-2xl uppercase italic tracking-wider mb-2 drop-shadow-[2px_2px_0_#000]">
              {subtitleText}
            </h2>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              onHoverStart={() => { setZipCode('55432'); setSubtitleText('Straight outta Minnesota'); }}
              onHoverEnd={() => { setZipCode('90210'); setSubtitleText('The Original Zip Code of Drama'); }}
              className="text-[100px] sm:text-[140px] md:text-[180px] leading-[0.8] font-black tracking-tighter text-white drop-shadow-[10px_10px_0px_var(--color-vibrant-teal)] italic cursor-pointer select-none transition-all duration-300 transform-gpu relative"
            >
              {zipCode}
              <motion.span 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1, y: -20 }}
                className="absolute text-sm font-bold bg-black text-white px-3 py-1 rounded-full top-0 left-0 -translate-y-full -translate-x-4 uppercase border-2 border-white pointer-events-none"
              >
                *Glitch*
              </motion.span>
            </motion.h1>
            <p className="mt-10 text-2xl font-medium max-w-xl leading-relaxed text-pink-50 bg-black/30 p-4 rounded-xl border border-white/20 backdrop-blur-sm">
              {lang === 'en' ? 'The iconic 90s series. Friendship, love, drama, and California sun.' : 'Культовий серіал епохи 90-х. Дружба, кохання, драма та сонце Каліфорнії.'}
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <a href="https://uakino.club/search?q=Беверлі-Гіллз+90210" target="_blank" rel="noopener noreferrer" className="bg-vibrant-yellow text-black px-10 py-5 rounded-full font-black text-xl uppercase tracking-tighter hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[6px_6px_0_#000]">
                <Play fill="currentColor" size={24} /> {t.watch}
              </a>
              <a href="#characters" className="bg-white text-vibrant-pink border-4 border-vibrant-pink px-10 py-5 rounded-full font-black text-xl uppercase tracking-tighter text-center hover:bg-black hover:text-white hover:border-black transition-colors shadow-[6px_6px_0_rgba(0,0,0,0.5)]">
                {lang === 'ua' ? 'Герої' : 'Characters'}
              </a>
            </div>
          </div>
          
          {/* Character Preview Layout */}
          <div className="w-full lg:w-1/3 flex flex-col space-y-4">
            <div className="bg-white p-4 rounded-3xl -rotate-3 border-4 border-vibrant-teal shadow-2xl overflow-hidden group hover:rotate-0 transition-transform">
              <div className="w-full h-40 bg-vibrant-teal rounded-2xl flex items-center justify-center overflow-hidden relative">
                <img src={CHARACTERS[0].portrait} alt={CHARACTERS[0].name} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-50 group-hover:scale-110 group-hover:filter-none group-hover:mix-blend-normal transition-all duration-500" />
                <span className="text-black font-black text-4xl italic relative z-10 uppercase tracking-tighter px-4 text-center drop-shadow-[2px_2px_0_white] group-hover:opacity-0 transition-opacity">{CHARACTERS[0].name.split(' ')[0]}</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-3xl rotate-2 translate-x-12 border-4 border-vibrant-yellow shadow-2xl overflow-hidden group hidden md:block hover:rotate-0 transition-transform">
              <div className="w-full h-40 bg-vibrant-yellow rounded-2xl flex items-center justify-center overflow-hidden relative">
                 <img src={CHARACTERS[1].portrait} alt={CHARACTERS[1].name} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-50 group-hover:scale-110 group-hover:filter-none group-hover:mix-blend-normal transition-all duration-500" />
                 <span className="text-black font-black text-4xl italic relative z-10 uppercase tracking-tighter px-4 text-center drop-shadow-[2px_2px_0_white] group-hover:opacity-0 transition-opacity">{CHARACTERS[1].name.split(' ')[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Feature Bar */}
      <div className="relative z-10 bg-black/30 backdrop-blur-md px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-6 mt-12 mb-10 border-y border-white/20">
        <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-12 w-full md:w-auto">
          <div className="flex flex-col">
            <span className="text-vibrant-yellow text-xs font-black uppercase tracking-widest">Tonight</span>
            <span className="text-xl font-bold italic uppercase">8 / 7c PM</span>
          </div>
          <div className="flex flex-col border-l-0 sm:border-l border-white/20 pl-0 sm:pl-12">
            <span className="text-vibrant-teal text-xs font-black uppercase tracking-widest">Category</span>
            <span className="text-xl font-bold italic uppercase">Teen Drama</span>
          </div>
          <div className="flex flex-col border-l-0 sm:border-l border-white/20 pl-0 sm:pl-12">
            <span className="text-pink-300 text-xs font-black uppercase tracking-widest">Status</span>
            <span className="text-xl font-bold italic uppercase">Must Watch</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.4)]">
            <svg className="w-6 h-6 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <span className="font-black uppercase tracking-widest text-sm">Series Preview</span>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="relative z-20 py-32 px-6 md:px-12 bg-white text-black border-t-8 border-vibrant-teal">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-vibrant-pink">
              {t.heroTitle} <br /><span className="text-black italic">{t.heroSubtitle}</span>
            </h2>
            <div className="h-4 w-32 bg-vibrant-yellow" />
            <p className="text-2xl font-bold leading-relaxed">
              {t.heroDesc1}
            </p>
            <p className="text-xl font-medium text-gray-600">
              {t.heroDesc2}
            </p>
          </div>
          
          <div className="relative p-6 group">
            <div className="absolute inset-0 bg-vibrant-teal translate-x-4 translate-y-4 rounded-3xl group-hover:translate-x-6 group-hover:translate-y-6 transition-transform" />
            <img 
              src="https://images.unsplash.com/photo-1549488344-c28d578bce06?auto=format&fit=crop&q=80&w=800" 
              alt="90s high school aesthetic" 
              className="relative z-10 w-full h-[500px] object-cover rounded-3xl border-8 border-black grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
            />
            {/* Stamp decoration */}
            <div className="absolute -bottom-8 -left-8 z-20 bg-vibrant-yellow text-black px-8 py-4 rounded-full font-black text-2xl uppercase tracking-tighter italic border-4 border-black rotate-12 shadow-[8px_8px_0px_#FF4FAD] group-hover:scale-110 transition-transform">
              10 Seasons
            </div>
          </div>
        </div>
      </section>

      {/* House Section */}
      <section id="house" className="py-32 px-6 md:px-12 bg-vibrant-pink border-t-8 border-black text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZiNGYiLz48L3N2Zz4=')] opacity-30 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative group">
            <div className="absolute inset-0 bg-vibrant-yellow translate-x-4 translate-y-4 rounded-3xl group-hover:-translate-x-4 group-hover:-translate-y-4 transition-transform" />
            <img 
              src="/90210-01.jpg" 
              alt="Casa Walsh aesthetic" 
              className="relative z-10 w-full h-[500px] object-cover rounded-3xl border-8 border-black grayscale contrast-125 saturate-200 group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="space-y-8 order-1 lg:order-2 relative z-10">
            <div className="inline-flex items-center gap-3 bg-black px-6 py-2 rounded-full border-2 border-white shadow-[4px_4px_0_#FFE700]">
              <Home size={20} className="text-vibrant-teal" />
              <span className="font-bold uppercase tracking-widest">{t.houseTitle}</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-vibrant-yellow drop-shadow-[4px_4px_0px_#000]">
              Casa Walsh
            </h2>
            <div className="h-4 w-32 bg-black" />
            <p className="text-2xl font-bold leading-relaxed text-pink-50">
              {t.houseDesc1}
            </p>
            <p className="text-lg font-medium">
              {t.houseDesc2}
            </p>
          </div>
        </div>
      </section>

      {/* Characters Section */}
      <section id="characters" className="py-32 px-6 md:px-12 bg-vibrant-teal border-t-8 border-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto mb-20 text-center relative z-10">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-black drop-shadow-[5px_5px_0px_white]">{t.charsTitle}</h2>
          <p className="text-2xl font-bold mt-4 text-black italic">{t.charsSubtitle}</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
          {CHARACTERS.map((char, idx) => (
            <motion.button 
              key={char.id}
              onClick={() => setSelectedChar(char)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`bg-white p-4 rounded-3xl border-4 ${char.border} shadow-[10px_10px_0px_rgba(0,0,0,0.2)] ${char.rotation} group hover:rotate-0 transition-all duration-300 text-left`}
            >
              <div className={`w-full aspect-square ${char.color} rounded-2xl flex items-end overflow-hidden relative mb-6 border-2 border-black`}>
                <img 
                  src={char.portrait} 
                  alt={char.name} 
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay grayscale group-hover:grayscale-0 group-hover:mix-blend-normal transition-all duration-500 scale-105 group-hover:scale-100"
                />
                 <span className={`p-4 ${char.textColor} font-black text-2xl md:text-xl xl:text-3xl uppercase tracking-tighter italic relative z-10 bg-white/90 backdrop-blur-sm w-full leading-none group-hover:bg-white transition-colors border-t-2 border-black`}>{(lang === 'en' ? char.nameEn : char.name).split(' ')[0]}</span>
              </div>
              <div className="px-2 pb-2">
                <h3 className="font-bold text-xl uppercase tracking-widest text-black mb-1">{lang === 'en' ? char.nameEn : char.name}</h3>
                <p className="font-semibold text-sm uppercase text-gray-500">{lang === 'en' ? t.characters[char.id].role : char.role}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Memory Game Section */}
      <section id="game" className="py-32 px-6 md:px-12 bg-pink-500 border-t-8 border-black relative">
        <div className="absolute top-10 left-10 text-white/20">
           <Gamepad2 size={200} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white drop-shadow-[5px_5px_0px_#000] mb-4">{t.gameTitle}</h2>
            <p className="text-2xl font-bold bg-white text-black inline-block px-6 py-2 border-4 border-black shadow-[4px_4px_0_#FFE700]">{t.gameSubtitle}</p>
            <div className="flex items-center justify-center gap-6 mt-8">
               <span className="text-xl font-black uppercase tracking-widest bg-black px-4 py-2 rounded-xl border-2 border-white">{t.moves}: {moves}</span>
               {cards.every(c => c.isMatched) && (
                 <motion.span 
                   initial={{ scale: 0 }} 
                   animate={{ scale: 1 }} 
                   className="text-vibrant-yellow font-black text-2xl flex items-center gap-2"
                 >
                   <Trophy /> {t.win}
                 </motion.span>
               )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 md:gap-6 bg-black/20 p-6 md:p-10 rounded-3xl backdrop-blur-sm border-4 border-white/30 max-w-4xl mx-auto">
            {cards.map((card, index) => (
              <div key={card.gameId} className="w-20 h-24 sm:w-28 sm:h-36 md:w-36 md:h-48" style={{ perspective: 1000 }}>
                <motion.div
                  onClick={() => handleCardClick(index)}
                  animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
                  whileHover={!card.isFlipped && !card.isMatched ? { scale: 1.05 } : {}}
                  whileTap={!card.isFlipped && !card.isMatched ? { scale: 0.95 } : {}}
                  className="w-full h-full cursor-pointer relative preserve-3d"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Back (Cover) */}
                  <div 
                     className="absolute inset-0 backface-hidden bg-vibrant-yellow border-4 border-black shadow-[4px_4px_0_#000] rounded-xl flex items-center justify-center bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4=')] opacity-80"
                     style={{ backfaceVisibility: 'hidden' }}
                  >
                    <span className="text-4xl">?</span>
                  </div>
                  
                  {/* Front (Character) */}
                  <div 
                     className={`absolute inset-0 backface-hidden ${card.color} border-4 ${card.isMatched ? 'border-white' : 'border-black'} shadow-[4px_4px_0_#000] rounded-xl overflow-hidden flex flex-col`}
                     style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <img src={card.portrait} alt={card.name} className={`w-full h-full object-cover mix-blend-multiply ${card.isMatched ? 'grayscale-0' : 'grayscale'}`} />
                    <div className="absolute bottom-0 left-0 w-full bg-white text-black text-center text-[10px] sm:text-xs md:text-sm font-black italic uppercase leading-none py-1 md:py-2 border-t-2 border-black">
                       {(lang === 'en' ? card.nameEn : card.name).split(' ')[0]}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          <button 
             onClick={restartGame}
             className="mt-12 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest flex items-center gap-3 border-4 border-black shadow-[6px_6px_0_#FFE700] hover:bg-vibrant-yellow transition-colors"
          >
            <RefreshCcw size={20} /> {t.restart}
          </button>
        </div>
      </section>

      {/* Episodes Section */}
      <section id="episodes" className="py-32 px-6 md:px-12 bg-vibrant-yellow border-t-8 border-black">
        <div className="max-w-7xl mx-auto mb-20">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-black drop-shadow-[5px_5px_0px_white] text-center md:text-left mb-6">{t.episodesTitle}</h2>
          <p className="text-2xl font-bold max-w-2xl text-black">{t.episodesSubtitle}</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {EPISODES.map((ep, idx) => (
            <motion.div 
              key={ep.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 border-8 border-black shadow-[12px_12px_0px_#000] rotate-1 hover:rotate-0 transition-transform duration-300 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <span className={`px-4 py-2 ${ep.color} text-black font-black uppercase tracking-widest border-4 border-black inline-block -rotate-2 -ml-2 -mt-4 shadow-[4px_4px_0px_#000]`}>
                  {ep.id}
                </span>
                <a href={ep.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold uppercase tracking-widest hover:text-vibrant-pink transition-colors text-black border-b-2 border-transparent hover:border-black">
                  <Play size={20} fill="currentColor" /> {t.stream}
                </a>
              </div>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic text-black mb-4 leading-none">{lang === 'en' ? t.episodes[ep.t_id].title : ep.title}</h3>
              <p className="font-medium text-gray-700 text-lg flex-1 mb-6">{lang === 'en' ? t.episodes[ep.t_id].synopsis : ep.synopsis}</p>
              
              <a href={ep.link} target="_blank" rel="noopener noreferrer" className="bg-black text-white px-8 py-4 font-black uppercase tracking-widest text-center block mt-auto hover:bg-vibrant-pink hover:text-black transition-colors border-2 border-transparent hover:border-black shadow-[4px_4px_0px_#FF4FAD] active:translate-x-1 active:translate-y-1 active:shadow-none">
                {t.watchNow}
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 text-center bg-black text-white border-t-8 border-vibrant-yellow relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-vibrant-pink rounded-full blur-[100px] opacity-20 Mix-blend-screen pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <motion.button 
            whileHover={{ scale: 1.1, rotate: -10 }}
            whileTap={{ scale: 0.9, rotate: 10 }}
            onClick={handlePeachPitClick}
            className="mb-10 text-vibrant-yellow drop-shadow-[5px_5px_0_#FF4FAD] relative"
            title={lang === 'en' ? 'Click me!' : 'Натисни мене!'}
          >
            <Coffee className="w-24 h-24 mx-auto" />
            <motion.span 
               initial={{ opacity: 0 }}
               whileHover={{ opacity: 1 }}
               className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded-full border border-black shadow-sm"
            >
              Click!
            </motion.span>
          </motion.button>

          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 italic">
            {lang === 'en' ? 'Meet me at the' : 'Зустрінемось у'} <br /><span className="text-vibrant-pink">Peach Pit</span>?
          </h2>
          <p className="text-2xl font-medium max-w-2xl mx-auto mb-16 text-gray-400">
            {lang === 'en' ? 'Dive into the 90s atmosphere. All seasons are now available for streaming. Put on your best denim jacket and hit Play.' : 'Поринь в атмосферу 90-х. Усі сезони вже доступні для перегляду. Одягай свою найкращу джинсову куртку і натискай Play.'}
          </p>
          <button className="bg-vibrant-teal text-black px-12 py-6 rounded-full font-black text-2xl uppercase tracking-tighter hover:scale-105 transition-transform inline-flex items-center gap-4 shadow-[10px_10px_0px_white]">
            {lang === 'en' ? 'Start Watching' : 'Почати перегляд'} <Play fill="currentColor" size={28} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-center py-16 px-6 border-t-8 border-vibrant-teal relative z-10">
        <div className="flex justify-center space-x-6 mb-8">
          <a onClick={(e) => { e.preventDefault(); window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank') }} href="#" className="w-12 h-12 rounded-full border-2 border-vibrant-yellow flex items-center justify-center hover:bg-vibrant-yellow hover:text-black transition-colors text-vibrant-yellow">
            <Facebook size={24} />
          </a>
          <a onClick={(e) => { e.preventDefault(); window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent('Перевірте цей класний сайт про Беверлі-Хіллз 90210!')}`, '_blank') }} href="#" className="w-12 h-12 rounded-full border-2 border-vibrant-pink flex items-center justify-center hover:bg-vibrant-pink hover:text-black transition-colors text-vibrant-pink">
            <Twitter size={24} />
          </a>
          <a onClick={(e) => { e.preventDefault(); window.open('https://www.instagram.com/explore/tags/bh90210/', '_blank') }} href="#" className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors text-white">
            <Instagram size={24} />
          </a>
        </div>
         <p className="text-sm font-bold uppercase tracking-widest text-vibrant-teal mb-2 cursor-pointer hover:text-vibrant-yellow transition-colors" onClick={() => setShowEndEasterEgg(true)}>BH90210 PROMO SITE &copy; {new Date().getFullYear()}</p>
         <p className="text-xs text-gray-400 font-medium max-w-lg mx-auto">{lang === 'en' ? 'Made for lovers of 90s aesthetic. Not an official Fox website.' : 'Створено для любителів естетики 90-х. Не є офіційним сайтом телеканалу Fox.'}</p>
         <div className="mt-8 pt-4 border-t border-white/20 inline-block w-full max-w-sm">
            <p className="text-[10px] text-gray-500 uppercase font-black italic">Pssst... Type "90210" anywhere on this page.</p>
         </div>
      </footer>

      {/* End Footer Easter Egg */}
      <AnimatePresence>
        {showEndEasterEgg && (
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          >
            <div className="bg-vibrant-pink border-8 border-black text-white p-12 rounded-full absolute shadow-[20px_20px_0px_white] flex flex-col items-center justify-center transform hover:scale-110 pointer-events-auto cursor-pointer" onClick={() => setShowEndEasterEgg(false)}>
               <div className="text-8xl mb-4">📺</div>
               <h2 className="text-4xl font-black uppercase tracking-widest italic drop-shadow-[4px_4px_0_black]">PEACH PIT AWAITS!</h2>
               <p className="text-xl font-bold bg-black text-white px-4 py-2 mt-4">{lang === 'en' ? 'You found the secret ending!' : 'Ти знайшов секретну кінцівку!'}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character Modal Backdrop & Content */}
      <AnimatePresence>
        {selectedChar && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedChar(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className={`bg-white text-black w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border-8 ${selectedChar.border} shadow-[20px_20px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row`}
            >
              {/* Modal Image */}
              <div className={`md:w-2/5 ${selectedChar.color} relative border-b-8 md:border-b-0 md:border-r-8 ${selectedChar.border}`}>
                <img 
                  src={selectedChar.portrait} 
                  alt={selectedChar.name} 
                  className="w-full h-64 md:h-full object-cover mix-blend-overlay grayscale"
                />
                <button 
                  onClick={() => setSelectedChar(null)}
                  className="absolute top-4 left-4 md:hidden bg-black text-white p-2 rounded-full border-2 border-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Details */}
              <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center relative bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=')]">
                <button 
                  onClick={() => setSelectedChar(null)}
                  className="absolute top-6 right-6 hidden md:block bg-black text-white p-2 rounded-full hover:scale-110 transition-transform border-4 border-transparent hover:border-vibrant-pink shadow-[4px_4px_0_#FFE700]"
                >
                  <X size={24} />
                </button>

                <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic mb-4 leading-none drop-shadow-[2px_2px_0_white]">
                  {lang === 'en' ? selectedChar.nameEn : selectedChar.name}
                </h3>
                <p className="text-vibrant-pink text-xl font-bold uppercase tracking-widest mb-8 border-b-4 border-vibrant-yellow inline-block pb-1 self-start bg-white px-2">
                  {lang === 'en' ? t.characters[selectedChar.id].role : selectedChar.role}
                </p>
                <div className="space-y-8">
                  <p className="text-xl font-medium text-gray-700 leading-relaxed bg-white/80 p-4 rounded-xl border-2 border-gray-200">
                    {lang === 'en' ? t.characters[selectedChar.id].bio : selectedChar.bio}
                  </p>
                  
                  {/* Car Card inside Modal */}
                  <motion.div 
                    whileHover={{ rotate: 0, scale: 1.02 }}
                    className="bg-vibrant-yellow p-6 border-4 border-black shadow-[6px_6px_0px_#000] -rotate-1 transition-transform relative overflow-hidden group"
                  >
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-vibrant-teal rounded-full border-4 border-black flex items-center justify-center opacity-80 group-hover:scale-110 transition-transform">
                      <Car size={32} className="text-black ml-4 mt-4" />
                    </div>
                    <div className="flex items-center gap-2 text-black mb-3 relative z-10">
                       <Car size={20} className="text-vibrant-pink" />
                       <span className="font-black uppercase tracking-widest text-sm bg-white px-2 py-0.5 border-2 border-black">The Ride</span>
                    </div>
                    <p className="font-bold text-xl md:text-2xl uppercase tracking-tighter text-black bg-white inline-block px-4 py-2 border-4 border-black relative z-10 shadow-[4px_4px_0_#FF4FAD] group-hover:shadow-[6px_6px_0_#FF4FAD] transition-shadow">{lang === 'en' ? t.characters[selectedChar.id].car : selectedChar.car}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

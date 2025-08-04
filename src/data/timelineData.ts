export interface TimelineEvent {
  year: number
  description: string
}

export interface TimelinePeriod {
  id: number
  startYear: number
  endYear: number
  category: string
  events: TimelineEvent[]
}

export const timelineData: TimelinePeriod[] = [
  {
    id: 1,
    startYear: 1997,
    endYear: 2001,
    category: 'Литература',
    events: [
      {
        year: 1997,
        description:
          'Джоан Роулинг публикует первую книгу о Гарри Поттере — «Гарри Поттер и философский камень»'
      },
      {
        year: 1998,
        description: 'Выходит роман «Американский психопат» Брета Истона Эллиса'
      },
      {
        year: 1999,
        description: 'Джон Ирвинг получает премию Оскар за сценарий к фильму «Правила виноделов»'
      },
      {
        year: 2000,
        description:
          'Дж.К. Роулинг публикует четвертую книгу о Гарри Поттере — «Гарри Поттер и Кубок огня»'
      },
      {
        year: 2001,
        description: 'Джонатан Сафран Фоер дебютирует с романом «Полная иллюминация»'
      }
    ]
  },
  {
    id: 2,
    startYear: 2001,
    endYear: 2005,
    category: 'Кино',
    events: [
      {
        year: 2001,
        description:
          'Питер Джексон выпускает первую часть трилогии «Властелин колец» — «Братство кольца»'
      },
      {
        year: 2002,
        description: 'Выходит фильм «Пианист» Романа Полански, получивший премию Оскар'
      },
      {
        year: 2003,
        description: 'Завершается трилогия «Властелин колец» фильмом «Возвращение короля»'
      },
      {
        year: 2004,
        description: 'Майкл Мур снимает документальный фильм «Фаренгейт 9/11»'
      },
      {
        year: 2005,
        description: 'Выходит фильм «Горбатая гора» Энга Ли, получивший премию Оскар'
      }
    ]
  },
  {
    id: 3,
    startYear: 2005,
    endYear: 2009,
    category: 'Музыка',
    events: [
      {
        year: 2005,
        description:
          'Группа Coldplay выпускает альбом «X&Y», который становится одним из продаваемых альбомов года'
      },
      {
        year: 2006,
        description: 'Джастин Тимберлейк выпускает альбом «FutureSex/LoveSounds»'
      },
      {
        year: 2007,
        description: 'Эми Уайнхаус выпускает альбом «Back to Black», получивший премию Грэмми'
      },
      {
        year: 2008,
        description: 'Леди Гага дебютирует с альбомом «The Fame»'
      },
      {
        year: 2009,
        description:
          'Майкл Джексон умирает в возрасте 50 лет, оставив огромное музыкальное наследие'
      }
    ]
  },
  {
    id: 4,
    startYear: 2009,
    endYear: 2013,
    category: 'Компьютерные игры',
    events: [
      {
        year: 2009,
        description:
          'Minecraft создан Маркусом Перссоном и становится одной из самых популярных игр в истории'
      },
      {
        year: 2010,
        description: 'Выходит игра «Red Dead Redemption» от Rockstar Games'
      },
      {
        year: 2011,
        description: 'Выходит игра «The Elder Scrolls V: Skyrim» от Bethesda'
      },
      {
        year: 2012,
        description: 'Выходит игра «Journey» от Thatgamecompany, получившая множество наград'
      },
      {
        year: 2013,
        description: 'Выходит игра «Grand Theft Auto V» от Rockstar Games'
      }
    ]
  },
  {
    id: 5,
    startYear: 2013,
    endYear: 2017,
    category: 'Мода',
    events: [
      {
        year: 2013,
        description: 'Александр Ванг становится креативным директором Balenciaga'
      },
      {
        year: 2014,
        description: 'H&M запускает коллаборацию с Александром Вангом'
      },
      {
        year: 2015,
        description: 'Демна Гвасалия становится креативным директором Balenciaga'
      },
      {
        year: 2016,
        description: 'Версаче представляет коллекцию в честь 40-летия бренда'
      },
      {
        year: 2017,
        description: 'Virgil Abloh становится креативным директором Louis Vuitton мужской линии'
      }
    ]
  },
  {
    id: 6,
    startYear: 2017,
    endYear: 2021,
    category: 'Наука',
    events: [
      {
        year: 2017,
        description:
          'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi'
      },
      {
        year: 2018,
        description: 'Ученые впервые отредактировали гены человеческих эмбрионов с помощью CRISPR'
      },
      {
        year: 2019,
        description:
          'Ученые получили первое изображение черной дыры с помощью Event Horizon Telescope'
      },
      {
        year: 2020,
        description: 'Pfizer и Moderna разработали вакцины против COVID-19 на основе мРНК'
      },
      {
        year: 2021,
        description: 'NASA успешно посадило марсоход Perseverance на Марс'
      }
    ]
  }
]

export const getCurrentPeriod = (activeIndex: number): TimelinePeriod => {
  return timelineData[activeIndex] || timelineData[0]
}

export const getTotalPeriods = (): number => {
  return timelineData.length
}

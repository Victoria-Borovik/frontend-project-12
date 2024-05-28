export default {
  translation: {
    Layout: {
      title: 'Hexlet Chat',
      btn: 'Выйти',
    },
    Spinner: {
      title: 'Загрузка сообщение',
    },
    Channels: {
      title: 'Каналы',
      toggleTitle: 'Управление каналом',
      removeDropdown: 'Удалить',
      renameDropdown: 'Переименовать',
    },
    Messages: {
      sendBtn: 'Отправить',
      inputLabel: 'Новое сообщение',
      messagesCounter: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
    },
    Modals: {
      add: 'Добавить канал',
      remove: 'Удалить канал',
      removeMessage: 'Уверены?',
      rename: 'Переименовать канал',
      sendBtn: 'Отправить',
      cancelBtn: 'Отменить',
      removeBtn: 'Удалить',
      label: 'Имя канала',
      validation: {
        channelSize: 'От 3 до 20 символов',
        required: 'Обязательное поле',
        unique: 'Должно быть уникальным',
      },
    },
    SignUpPage: {
      title: 'Регистрация',
      logo: 'Регистрация',
      form: {
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        submitBtn: 'Зарегистрироваться',
        validation: {
          required: 'Обязательное поле',
          usernameSize: 'От 3 до 20 символов',
          passwordSize: 'Не менее 6 символов',
          notEqualPassword: 'Пароли должны совпадать',
          notUniqueLogin: 'Такой пользователь уже существует',
        },
      },
    },
    LogInPage: {
      title: 'Войти',
      logo: 'Войти',
      form: {
        username: 'Ваш ник',
        password: 'Пароль',
        submitBtm: 'Войти',
        invalid: 'Неверные имя пользователя или пароль',
      },
      footer: {
        message: 'Нет аккаунта?',
        link: 'Регистрация',
      },
    },
    ErrorPage: {
      title: 'Страница не найдена',
      logo: 'Страница не найдена',
      message: 'Но вы можете перейти',
      link: 'на главную страницу',
    },
    toast: {
      networkError: 'Ошибка соединения',
      loadingError: 'Ошибка загрузки данных',
      userError: 'Устаревший пользователь',
      addChannel: 'Канал создан',
      removeChannel: 'Канал удалён',
      renameChannel: 'Канал переименован',
    },
  },
};

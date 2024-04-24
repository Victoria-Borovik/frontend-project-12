export default {
  translation: {
    Layout: {
      title: 'Hexlet Chat',
    },
    Channels: {
      title: 'Каналы',
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
          passwordsShouldBeEqual: 'Пароли должны совпадать',
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
  },
};

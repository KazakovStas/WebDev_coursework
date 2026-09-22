/* ==========================================================================
   СЛОВАРЬ ПЕРЕВОДОВ RU / EN — ВСЕ СТРАНИЦЫ ПРОЕКТА «ЛИЦА»
   ========================================================================== */
const i18n = {

    // ---------- ШАПКА (все страницы) ----------
    'nav-find':        { ru: 'Найти кандидата', en: 'Find a Candidate' },
    'nav-projects':    { ru: 'Биржа проектов',  en: 'Project Exchange' },
    'nav-join':        { ru: 'Попасть в базу',  en: 'Join the Database' },
    'nav-about':       { ru: 'О сервисе',       en: 'About' },
    'search-ph':       { ru: 'Поиск по навыкам...', en: 'Search by skills...' },
    'nav-login':       { ru: 'Войти',           en: 'Log In' },
    'dropdown-profile':{ ru: 'Мой профиль',     en: 'My Profile' },
    'dropdown-logout': { ru: 'Выйти',           en: 'Log Out' },

    // ---------- Категории (нижняя навигация, все страницы) ----------
    'cat-marketing':   { ru: 'Маркетологи',          en: 'Marketers' },
    'cat-development': { ru: 'Backend-разработчики', en: 'Backend Developers' },
    'cat-design':      { ru: 'Дизайнеры',            en: 'Designers' },
    'cat-sales':       { ru: 'Менеджеры по продажам',en: 'Sales Managers' },
    'cat-analytics':   { ru: 'Аналитики',            en: 'Analysts' },
    'cat-content':     { ru: 'Контент-менеджеры',    en: 'Content Managers' },
    'cat-management':  { ru: 'Топ-менеджмент',       en: 'Top Management' },
    'cat-hr':          { ru: 'HR-специалисты',       en: 'HR Specialists' },
    'cat-finance':     { ru: 'Финансисты',           en: 'Financiers' },
    'cat-legal':       { ru: 'Юристы',               en: 'Lawyers' },
    'cat-support':     { ru: 'Техподдержка',         en: 'Tech Support' },
    'nav-more':        { ru: 'Ещё',   en: 'More' },
    'nav-hide':        { ru: 'Скрыть', en: 'Hide' },

    // ---------- ФУТЕР (все страницы) ----------
    'f-cand':       { ru: 'ЛИЦА.КАНДИДАТЫ', en: 'LICA.CANDIDATES' },
    'f-work':       { ru: 'ЛИЦА.РАБОТА',    en: 'LICA.WORK' },
    'f-portal':     { ru: 'О ПОРТАЛЕ',      en: 'ABOUT THE PORTAL' },
    'f-recruit':    { ru: 'Рекрутинг',           en: 'Recruiting' },
    'f-constructor':{ ru: 'Конструктор подбора', en: 'Hiring Constructor' },
    'f-analytics':  { ru: 'Аналитика подбора',   en: 'Hiring Analytics' },
    'f-support':    { ru: 'Поддержка',  en: 'Support' },
    'f-updates':    { ru: 'Обновления', en: 'Updates' },
    'f-contacts':   { ru: 'Контакты',   en: 'Contacts' },
    'f-copy':       { ru: 'ООО «ЛИЦА»', en: 'LICA LLC' },
    'f-requisites': { ru: 'Реквизиты',  en: 'Company Details' },
    'f-legal':      { ru: 'Правовая информация', en: 'Legal Information' },

    // ---------- МОДАЛКА ВХОДА (все страницы) ----------
    'modal-title':   { ru: 'Получить доступ к базе<br>проверенных кандидатов', en: 'Get access to the database<br>of verified candidates' },
    'modal-email-ph':{ ru: 'Email',  en: 'Email' },
    'modal-pass-ph': { ru: 'Пароль', en: 'Password' },
    'modal-forgot':  { ru: 'Забыли пароль?', en: 'Forgot password?' },
    'modal-login-btn':{ ru: 'Войти', en: 'Log In' },
    'modal-reg-btn': { ru: 'Зарегистрироваться', en: 'Sign Up' },

    // ---------- МОДАЛКА «О СЕРВИСЕ» (все страницы) ----------
    'about-title': { ru: 'О сервисе', en: 'About the Service' },
    'about-p1':    { ru: '<strong>ЛИЦА.Кандидаты</strong> — это платформа для поиска проверенных специалистов.', en: '<strong>LICA.Candidates</strong> is a platform for finding verified specialists.' },
    'about-p2':    { ru: 'Мы уже провели собеседования с сотнями кандидатов и подтверждаем их профессионализм. Вам остаётся только выбрать подходящего специалиста.', en: 'We have already interviewed hundreds of candidates and confirm their professionalism. All you need to do is choose the right specialist.' },
    'about-how':   { ru: 'Как это работает:', en: 'How it works:' },
    'about-li1':   { ru: 'Все кандидаты проходят проверку компетенций', en: 'All candidates pass competence verification' },
    'about-li2':   { ru: 'Вы получаете доступ к базе по подписке', en: 'You get subscription-based access to the database' },
    'about-li3':   { ru: 'Самостоятельно связываетесь с подходящими специалистами', en: 'You contact suitable specialists yourself' },
    'about-price': { ru: '<strong>Стоимость:</strong> 4900 ₽ в месяц<br><em>Это в 10-100 раз ниже стоимости любого подбора</em>', en: '<strong>Cost:</strong> 4900 ₽ per month<br><em>10-100 times lower than any hiring cost</em>' },
    'about-ok':    { ru: 'Понятно', en: 'Got It' },

    // ---------- INDEX: hero ----------
    'hero-title': { ru: 'Нанимайте проверенных <span class="highlight">кандидатов</span>', en: 'Hire verified <span class="highlight">candidates</span>' },
    'hero-desc':  { ru: 'Мы уже со всеми провели собеседования и подтверждаем их профессионализм', en: 'We have interviewed all of them and confirm their professionalism' },
    'hero-btn1':  { ru: 'Выбрать кандидата', en: 'Choose a Candidate' },
    'hero-btn2':  { ru: 'Попасть в базу',    en: 'Join the Database' },

    // ---------- INDEX: направления ----------
    'dir-title':     { ru: 'Выберите направление работы', en: 'Choose a Work Direction' },
    'dir-marketing': { ru: 'Маркетинг',      en: 'Marketing' },
    'dir-dev':       { ru: 'Разработка',     en: 'Development' },
    'dir-analytics': { ru: 'Аналитика',      en: 'Analytics' },
    'dir-community': { ru: 'Комьюнити',      en: 'Community' },
    'dir-design':    { ru: 'Дизайн',         en: 'Design' },
    'dir-sales':     { ru: 'Продажи',        en: 'Sales' },
    'dir-content':   { ru: 'Контент',        en: 'Content' },
    'dir-top':       { ru: 'Топ-менеджмент', en: 'Top Management' },

    // ---------- INDEX: преимущества ----------
    'benefits-title': { ru: 'Почему работодатели выбирают ЛИЦА?', en: 'Why Employers Choose LICA?' },
    'ben1-title': { ru: 'Проверка компетенций', en: 'Competence Verification' },
    'ben1-desc':  { ru: 'Всех кандидатов с нашей стороны собеседуют не рекрутера, а эксперты в своих областях. По результаты мы составляем справку о кандидате, чтобы вы могли узнать его лучше.', en: 'All candidates are interviewed not by recruiters but by experts in their fields. Based on the results, we compile a candidate report so you can get to know them better.' },
    'ben2-title': { ru: 'Сотни кандидатов по подписке', en: 'Hundreds of Candidates by Subscription' },
    'ben2-desc':  { ru: 'Вы сможете самостоятельно связываться с кандидатами – все они дали согласие на это.', en: 'You will be able to contact candidates yourself — they have all given their consent.' },
    'ben3-title': { ru: 'Еженедельное обновление базы', en: 'Weekly Database Updates' },
    'ben3-desc':  { ru: 'В рамках сервиса ЛИЦА.Работа мы проводим по несколько десятков собеседований еженедельно, и пополняем базу новыми справками по лучшим кандидатам.', en: 'As part of the LICA.Work service, we conduct dozens of interviews every week and replenish the database with new reports on the best candidates.' },
    'subcard-title': { ru: 'Кандидаты по подписке', en: 'Candidates by Subscription' },
    'subcard-price': { ru: '4900 ₽ в месяц', en: '4900 ₽ per month' },
    'subcard-note':  { ru: 'В 10-100 раз ниже стоимости любого подбора', en: '10-100 times lower than any hiring cost' },

    // ---------- INDEX: база кандидатов и подписка ----------
    'cand-title':      { ru: 'Как выглядит база кандидатов', en: 'What the Candidate Database Looks Like' },
    'subscribe-title': { ru: 'Подписаться на обновления базы', en: 'Subscribe to Database Updates' },
    'subscribe-desc':  { ru: 'Мы будет присылать вам информацию каждую неделю, по каким сферам у нас появились кандидаты.', en: 'We will send you information every week about which fields new candidates have appeared in.' },
    'sub-name-ph':  { ru: 'Ваше имя', en: 'Your Name' },
    'sub-phone-ph': { ru: 'Номер телефона', en: 'Phone Number' },
    'sub-btn':      { ru: 'Подписаться', en: 'Subscribe' },
    'sub-agreement':{ ru: 'Отправка данной формы означает согласие с <a href="#" class="agreement-link">Пользовательским соглашением</a> и <a href="#" class="agreement-link">Политикой конфиденциальности</a>', en: 'Submitting this form means agreement with the <a href="#" class="agreement-link">User Agreement</a> and <a href="#" class="agreement-link">Privacy Policy</a>' },
    'sub-ok-title': { ru: 'Вы успешно подписались!', en: 'You Have Successfully Subscribed!' },
    'sub-ok-desc':  { ru: 'Теперь вы будете получать обновления базы кандидатов каждую неделю.', en: 'Now you will receive candidate database updates every week.' },

    // ---------- CATALOG: фильтры и пагинация ----------
    'filters-title': { ru: 'Фильтры', en: 'Filters' },
    'filters-clear': { ru: 'Очистить', en: 'Clear' },
    'filter-salary': { ru: 'Зарплата, ₽', en: 'Salary, ₽' },
    'filter-from-ph':{ ru: 'от', en: 'from' },
    'filter-to-ph':  { ru: 'до', en: 'to' },
    'filter-exp':    { ru: 'Опыт', en: 'Experience' },
    'exp-1-3':  { ru: '1-3 года', en: '1-3 years' },
    'exp-3-5':  { ru: '3-5 лет',  en: '3-5 years' },
    'exp-5':    { ru: '5+ лет',   en: '5+ years' },
    'filter-format':  { ru: 'Формат', en: 'Format' },
    'format-fulltime':{ ru: 'Полная занятость',   en: 'Full-time' },
    'format-parttime':{ ru: 'Частичная занятость',en: 'Part-time' },
    'format-remote':  { ru: 'Удалённо',           en: 'Remote' },
    'filters-apply':  { ru: 'Применить', en: 'Apply' },
    'pagination-more':{ ru: 'Показать ещё', en: 'Show More' },

    // ---------- CATALOG / INDEX: карточки кандидатов (JS) ----------
    'cand-exp':    { ru: 'Опыт:', en: 'Experience:' },
    'cand-salary': { ru: 'Зарплата: от', en: 'Salary: from' },
    'cand-view':   { ru: 'Посмотреть справку', en: 'View Report' },
    'cand-empty':  { ru: 'Кандидаты не найдены', en: 'No Candidates Found' },
    'cand-error':  { ru: 'Не удалось загрузить кандидатов', en: 'Failed to Load Candidates' },
    'cand-title-default': { ru: 'Кандидаты', en: 'Candidates' },

    // ---------- CREATE-PROFILE: форма ----------
    'create-title':    { ru: 'Заполните профиль кандидата', en: 'Fill in the Candidate Profile' },
    'create-subtitle': { ru: 'Эта информация будет видна работодателям', en: 'This information will be visible to employers' },
    'form-fio':     { ru: 'ФИО *', en: 'Full Name *' },
    'form-fio-ph':  { ru: 'Например: Анциферов Владимир', en: 'Example: John Smith' },
    'form-color':   { ru: 'Выберите цвет профиля', en: 'Choose Profile Color' },
    'form-position':   { ru: 'Должность / Позиция *', en: 'Position *' },
    'form-position-ph':{ ru: 'Например: Директор по маркетингу', en: 'Example: Marketing Director' },
    'form-category':   { ru: 'Категория *', en: 'Category *' },
    'form-category-ph':{ ru: 'Выберите категорию', en: 'Select a Category' },
    'opt-marketing':  { ru: 'Маркетинг',     en: 'Marketing' },
    'opt-development':{ ru: 'Разработка',    en: 'Development' },
    'opt-design':     { ru: 'Дизайн',        en: 'Design' },
    'opt-sales':      { ru: 'Продажи',       en: 'Sales' },
    'opt-analytics':  { ru: 'Аналитика',     en: 'Analytics' },
    'opt-content':    { ru: 'Контент',       en: 'Content' },
    'opt-management': { ru: 'Топ-менеджмент',en: 'Top Management' },
    'opt-hr':         { ru: 'HR-специалисты',en: 'HR Specialists' },
    'opt-finance':    { ru: 'Финансисты',    en: 'Financiers' },
    'opt-legal':      { ru: 'Юристы',        en: 'Lawyers' },
    'opt-support':    { ru: 'Техподдержка',  en: 'Tech Support' },
    'form-exp':    { ru: 'Опыт работы *', en: 'Work Experience *' },
    'form-exp-ph': { ru: 'Например: 3 года, 10+ лет', en: 'Example: 3 years, 10+ years' },
    'form-salary': { ru: 'Зарплатные ожидания, ₽ *', en: 'Salary Expectations, ₽ *' },
    'form-format': { ru: 'Формат работы', en: 'Work Format' },
    'form-age':    { ru: 'Возраст', en: 'Age' },
    'form-age-ph': { ru: 'Например: 34 года', en: 'Example: 34 years old' },
    'form-city':   { ru: 'Город', en: 'City' },
    'form-city-ph':{ ru: 'Например: Москва', en: 'Example: Moscow' },
    'form-telegram':{ ru: 'Telegram (для связи)', en: 'Telegram (for contact)' },
    'form-portfolio':{ ru: 'Ссылка на портфолио', en: 'Portfolio Link' },
    'form-reason':    { ru: 'Причина поиска работы', en: 'Reason for Job Search' },
    'form-reason-ph': { ru: 'Расскажите, почему вы ищете новую работу...', en: 'Tell us why you are looking for a new job...' },
    'form-general':   { ru: 'Общая информация', en: 'General Information' },
    'form-general-ph':{ ru: 'Ключевые достижения, экспертиза...', en: 'Key achievements, expertise...' },
    'form-test':   { ru: 'Опыт в тестировании / аналитике', en: 'Experience in Testing / Analytics' },
    'form-test-ph':{ ru: 'Инструменты, методики, проекты...', en: 'Tools, methodologies, projects...' },
    'form-api':    { ru: 'Опыт работы с API / интеграциями', en: 'Experience with API / Integrations' },
    'form-api-ph': { ru: 'REST, GraphQL, вебхуки...', en: 'REST, GraphQL, webhooks...' },
    'form-save':   { ru: 'Сохранить профиль', en: 'Save Profile' },
    'form-cancel': { ru: '↩ Отмена', en: '↩ Cancel' },
    'create-ok-title': { ru: 'Профиль успешно создан!', en: 'Profile Successfully Created!' },
    'create-ok-desc':  { ru: 'Теперь вы есть в базе кандидатов. Работодатели могут с вами связаться.', en: 'You are now in the candidate database. Employers can contact you.' },
    'create-ok-btn':   { ru: 'Вернуться в кабинет', en: 'Return to Dashboard' },

    // ---------- DASHBOARD ----------
    'dash-edit':      { ru: 'Редактировать профиль', en: 'Edit Profile' },
    'dash-stats':     { ru: 'Статистика', en: 'Statistics' },
    'stat-active':    { ru: 'Активных проектов:', en: 'Active Projects:' },
    'stat-completed': { ru: 'Завершённых:', en: 'Completed:' },
    'stat-earned':    { ru: 'Заработано:', en: 'Earned:' },
    'dash-mailing':   { ru: 'Рассылка', en: 'Mailing' },
    'dash-status':    { ru: 'Статус:', en: 'Status:' },
    'dash-subscribed':    { ru: 'Подписан', en: 'Subscribed' },
    'dash-not-subscribed':{ ru: 'Не подписан', en: 'Not Subscribed' },
    'dash-sub-on':  { ru: '🔔 Подписаться на рассылку', en: '🔔 Subscribe to Mailing' },
    'dash-sub-off': { ru: '🔕 Отписаться от рассылки', en: '🔕 Unsubscribe from Mailing' },
    'dash-cand-title': { ru: '👤 Профиль кандидата', en: '👤 Candidate Profile' },
    'dash-cand-note':  { ru: 'Ваш профиль виден работодателям в базе кандидатов.', en: 'Your profile is visible to employers in the candidate database.' },
    'dash-view':    { ru: '👁 Посмотреть профиль', en: '👁 View Profile' },
    'dash-delete':  { ru: 'Удалить себя из базы', en: 'Remove Yourself from Database' },
    'dash-quick':   { ru: 'Быстрые действия', en: 'Quick Actions' },
    'dash-create':  { ru: '+ Создать проект', en: '+ Create Project' },
    'dash-projects':{ ru: 'Мои проекты', en: 'My Projects' },
    'tab-all':        { ru: 'Все', en: 'All' },
    'tab-inprogress': { ru: 'В работе', en: 'In Progress' },
    'tab-completed':  { ru: 'Завершённые', en: 'Completed' },
    'tab-open':       { ru: 'Открытые', en: 'Open' },
    'dash-empty':   { ru: 'У вас пока нет проектов', en: 'You Have No Projects Yet' },
    'dash-first':   { ru: 'Создать первый проект', en: 'Create First Project' },
    'del-title': { ru: 'Удалить профиль кандидата?', en: 'Delete Candidate Profile?' },
    'del-text':  { ru: 'Ваш профиль будет полностью удалён из базы кандидатов. Работодатели больше не смогут вас найти. Это действие нельзя отменить.', en: 'Your profile will be completely removed from the candidate database. Employers will no longer be able to find you. This action cannot be undone.' },
    'del-cancel':  { ru: 'Отмена', en: 'Cancel' },
    'del-confirm': { ru: 'Удалить профиль', en: 'Delete Profile' },
    'create-modal-title': { ru: 'Создать новый проект', en: 'Create a New Project' },
    'proj-title-ph':  { ru: 'Название проекта *', en: 'Project Name *' },
    'proj-desc-ph':   { ru: 'Описание проекта *', en: 'Project Description *' },
    'proj-budget-ph': { ru: 'Бюджет, ₽ *', en: 'Budget, ₽ *' },
    'create-submit':  { ru: '💾 Создать проект', en: '💾 Create Project' },
    'edit-modal-title': { ru: 'Редактировать проект', en: 'Edit Project' },
    'status-open':       { ru: 'Открыт', en: 'Open' },
    'status-inprogress': { ru: 'В работе', en: 'In Progress' },
    'status-completed':  { ru: 'Завершён', en: 'Completed' },
    'edit-save': { ru: 'Сохранить', en: 'Save' },
    'apps-title':  { ru: 'Отклики на проект', en: 'Project Applications' },
    'apps-pending':  { ru: 'Ожидает', en: 'Pending' },
    'apps-accepted': { ru: 'Принят', en: 'Accepted' },
    'apps-view':    { ru: '👁 Профиль кандидата', en: '👁 Candidate Profile' },
    'apps-accept':  { ru: 'Принять', en: 'Accept' },
    'apps-reject':  { ru: 'Отказать', en: 'Reject' },
    'apps-assigned':{ ru: '✓ Проект назначен', en: '✓ Project Assigned' },
    'apps-none':    { ru: 'Пока нет откликов', en: 'No Applications Yet' },
    'proj-actions-apps':  { ru: 'Отклики', en: 'Applications' },
    'proj-actions-edit':  { ru: 'Изменить', en: 'Edit' },
    'proj-actions-contact':{ ru: 'Связаться', en: 'Contact' },
    'proj-actions-details':{ ru: 'Детали', en: 'Details' },
    'modal-proj-word': { ru: 'Проекты', en: 'Projects' },
    'dash-budget': { ru: 'Бюджет:', en: 'Budget:' },

    // ---------- EDIT-PROFILE ----------
    'edit-title':    { ru: 'Редактирование профиля', en: 'Profile Editing' },
    'edit-subtitle': { ru: 'Обновите информацию и контакты', en: 'Update Information and Contacts' },
    'edit-position': { ru: 'Должность *', en: 'Position *' },
    'edit-exp':      { ru: 'Опыт *', en: 'Experience *' },
    'edit-salary':   { ru: 'Зарплата *', en: 'Salary *' },
    'edit-age':      { ru: 'Возраст', en: 'Age' },
    'edit-city':     { ru: 'Город', en: 'City' },
    'edit-telegram': { ru: 'Telegram (без @)', en: 'Telegram (without @)' },
    'edit-portfolio':{ ru: 'Ссылка на портфолио', en: 'Portfolio Link' },
    'edit-reason':   { ru: 'Причина поиска работы', en: 'Reason for Job Search' },
    'edit-general':  { ru: 'Общая информация', en: 'General Information' },
    'edit-save-btn': { ru: '💾 Сохранить', en: '💾 Save' },
    'edit-ok-title': { ru: 'Профиль обновлён!', en: 'Profile Updated!' },
    'edit-ok-btn':   { ru: 'Вернуться к профилю', en: 'Return to Profile' },

    // ---------- PROFILE ----------
    'profile-salary':   { ru: 'Зарплатные ожидания:', en: 'Salary Expectations:' },
    'profile-contacts': { ru: 'Открыть контакты', en: 'Open Contacts' },
    'profile-telegram': { ru: 'Telegram', en: 'Telegram' },
    'profile-portfolio':{ ru: 'Портфолио', en: 'Portfolio' },
    'profile-reason':   { ru: 'Причина поиска работы', en: 'Reason for Job Search' },
    'profile-general':  { ru: 'Общая информация, почему именно этот кандидат', en: 'General Information: Why This Candidate' },
    'profile-test':     { ru: 'Опыт в тестировании', en: 'Testing Experience' },
    'profile-api':      { ru: 'Опыт работы с API и тестирования бэкенда', en: 'API and Backend Testing Experience' },
    'profile-notfound': { ru: 'Кандидат не найден', en: 'Candidate Not Found' },
    'profile-nocontacts':{ ru: 'Контакты не указаны', en: 'No Contacts Provided' },

    // ---------- PROJECT-DETAILS ----------
    'pd-loading':  { ru: 'Загрузка...', en: 'Loading...' },
    'pd-notfound': { ru: 'Проект не найден', en: 'Project Not Found' },
    'pd-back':     { ru: 'Вернуться к бирже', en: 'Return to Exchange' },
    'pd-desc':     { ru: 'Описание задачи', en: 'Task Description' },
    'pd-req':      { ru: 'Требования', en: 'Requirements' },
    'pd-timeline': { ru: 'Сроки', en: 'Timeline' },
    'pd-published':{ ru: 'Опубликовано:', en: 'Published:' },
    'pd-deadline': { ru: 'Дедлайн:', en: 'Deadline:' },
    'pd-format':   { ru: 'Формат:', en: 'Format:' },
    'pd-client':   { ru: 'Заказчик:', en: 'Client:' },
    'apply-title': { ru: 'Откликнуться на проект', en: 'Apply for the Project' },
    'apply-note':  { ru: 'Ваш отклик будет отправлен заказчику', en: 'Your application will be sent to the client' },
    'apply-ph':    { ru: 'Расскажите, почему вы подходите для этого проекта...', en: 'Tell us why you are suitable for this project...' },
    'apply-hint':  { ru: 'Войдите, чтобы отправить отклик', en: 'Log In to Send an Application' },
    'apply-btn':   { ru: 'Отправить отклик', en: 'Send Application' },
    'applied-badge':{ ru: '✓ Отклик отправлен', en: '✓ Application Sent' },
    'applied-text': { ru: 'Заказчик получит уведомление и свяжется с вами в ближайшее время.', en: 'The client will receive a notification and contact you soon.' },
    'applied-btn':  { ru: 'Перейти в кабинет', en: 'Go to Dashboard' },
    'own-badge': { ru: 'Это ваш проект', en: 'This Is Your Project' },
    'own-edit':  { ru: 'Редактировать', en: 'Edit' },
    'own-close': { ru: 'Закрыть проект', en: 'Close Project' },
    'own-note':  { ru: 'Редактирование доступно только для открытых проектов', en: 'Editing is available only for open projects' },
    'action-save':   { ru: 'Сохранить в избранное', en: 'Save to Favorites' },
    'action-notify': { ru: 'Уведомить о похожих', en: 'Notify About Similar' },
    'action-report': { ru: 'Пожаловаться', en: 'Report' },

    // ---------- PROJECTS: биржа ----------
    'prj-clear':   { ru: 'Сбросить', en: 'Reset' },
    'prj-category':{ ru: 'Категория', en: 'Category' },
    'prj-budget':  { ru: 'Бюджет, ₽', en: 'Budget, ₽' },
    'prj-count':   { ru: 'Найдено:', en: 'Found:' },
    'prj-empty':   { ru: 'Проекты не найдены', en: 'No Projects Found' },
    'prj-reset':   { ru: 'Сбросить фильтры', en: 'Reset Filters' },
    'prj-deadline':{ ru: 'Срок:', en: 'Deadline:' },
    'prj-apply':   { ru: 'Откликнуться', en: 'Apply' },
    'prj-login-hint': { ru: 'Войдите, чтобы откликнуться', en: 'Log In to Apply' }
};

/* ==========================================================================
   ЛОГИКА ПРИМЕНЕНИЯ ЯЗЫКА
   ========================================================================== */

// Получить перевод по ключу для текущего языка (для JS-строк)
window.t = function(key) {
    const lang = localStorage.getItem('lang') || 'ru';
    return (i18n[key] && i18n[key][lang]) || key;
};

// Применить язык ко всем элементам с data-i18n / data-i18n-ph
window.applyLang = function(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const tr = i18n[el.getAttribute('data-i18n')];
        if (tr && tr[lang]) el.innerHTML = tr[lang];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const tr = i18n[el.getAttribute('data-i18n-ph')];
        if (tr && tr[lang]) el.placeholder = tr[lang];
    });
    document.querySelectorAll('.lang-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.lang === lang));
    // Событие для страниц: перечитать динамический контент на новом языке
    window.dispatchEvent(new Event('langchange'));
};

// Переключить и сохранить
window.toggleLang = function(lang) {
    localStorage.setItem('lang', lang);
    applyLang(lang);
};

// Восстановление при загрузке
(function() {
    const saved = localStorage.getItem('lang') || 'ru';
    const run = () => applyLang(saved);
    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', run)
        : run();
})();
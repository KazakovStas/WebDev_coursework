// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ =====
window.toggleNav = function() {
    const hidden = document.querySelectorAll('.nav-hidden');
    const more = document.querySelector('.more-li');
    const hide = document.querySelector('.hide-li');
    const arrow = document.querySelector('.more-btn .arrow');
    const isVisible = document.querySelector('.nav-hidden.show');
    
    if (!isVisible) {
        hidden.forEach(i => i.classList.add('show'));
        more.style.display = 'none';
        hide.style.display = 'flex';
    } else {
        hidden.forEach(i => i.classList.remove('show'));
        more.style.display = 'flex';
        hide.style.display = 'none';
        if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
};

// ===== ОСНОВНАЯ ЛОГИКА =====
document.addEventListener('DOMContentLoaded', () => {
    // --- Элементы модального окна ---
    const openModalBtn = document.getElementById('openModalBtn');
    const modal = document.getElementById('loginModal');
    const closeBtn = document.getElementById('closeModalBtn');
    
    // Вкладки
    const loginView = document.getElementById('loginView');
    const registerView = document.getElementById('registerView');
    
    // Формы
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Кнопки переключения
    const toRegisterBtn = document.getElementById('toRegisterBtn');
    const backToLoginBtn = document.getElementById('backToLoginBtn');
    
    // Модальное окно "О сервисе"
    const aboutServiceBtn = document.getElementById('aboutServiceBtn');
    const aboutModal = document.getElementById('aboutModal');
    const closeAboutModal = document.getElementById('closeAboutModal');
    const closeAboutBtn = document.getElementById('closeAboutBtn');

    // --- Функция отображения профиля в шапке ---
    function showUserProfile(user) {
        if (openModalBtn) openModalBtn.style.display = 'none';
        const wrap = document.getElementById('userProfileWrapper');
        const nameEl = document.getElementById('userName');
        const avatarEl = document.getElementById('userAvatar');
        
        if (wrap && nameEl && avatarEl) { 
            wrap.style.display = 'flex'; 
            nameEl.textContent = user.name?.split(' ')[0] || 'Пользователь'; 
            avatarEl.textContent = (user.name?.charAt(0) || 'П').toUpperCase(); 
        }
        
        const dropdown = document.getElementById('userDropdown');
        const profileBtn = document.getElementById('userProfile');
        
        if (profileBtn) {
            profileBtn.addEventListener('click', (e) => { 
                e.stopPropagation(); 
                if (dropdown) dropdown.classList.toggle('show'); 
            });
        }
        
        document.addEventListener('click', (e) => { 
            if (dropdown && !e.target.closest('.user-profile-wrapper')) {
                dropdown.classList.remove('show'); 
            }
        });
        
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => { 
                if (confirm('Выйти?')) { 
                    localStorage.removeItem('currentUser'); 
                    window.location.href = 'index.html'; 
                } 
            });
        }
    }

    window.hideUserProfile = function() {
        const wrap = document.getElementById('userProfileWrapper');
        if (wrap) wrap.style.display = 'none';
        if (openModalBtn) { 
            openModalBtn.style.display = 'block'; 
            openModalBtn.textContent = 'Войти'; 
            openModalBtn.style.backgroundColor = ''; 
        }
    }

    // === УПРАВЛЕНИЕ МОДАЛКОЙ ===
    if (openModalBtn && modal) {
        openModalBtn.addEventListener('click', (e) => { 
            e.stopPropagation(); 
            modal.classList.add('active'); 
            document.body.style.overflow = 'hidden'; 
        });
    }
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => { 
            modal.classList.remove('active'); 
            document.body.style.overflow = ''; 
        });
    }
    if (modal) {
        modal.addEventListener('click', (e) => { 
            if (e.target === modal) { 
                modal.classList.remove('active'); 
                document.body.style.overflow = ''; 
            } 
        });
    }

    // === ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК ВХОД/РЕГИСТРАЦИЯ ===
    function showLoginView() {
        if (loginView) loginView.style.display = 'block';
        if (registerView) registerView.style.display = 'none';
        const title = document.querySelector('#loginModal .modal-title');
        if (title) title.innerHTML = 'Получить доступ к базе<br>проверенных кандидатов';
    }
    
    function showRegisterView() {
        if (loginView) loginView.style.display = 'none';
        if (registerView) registerView.style.display = 'block';
        const title = document.querySelector('#loginModal .modal-title');
        if (title) title.textContent = 'Создать аккаунт';
    }

    if (toRegisterBtn) {
        toRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showRegisterView();
        });
    }
    if (backToLoginBtn) {
        backToLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLoginView();
        });
    }

    // === ФОРМА ВХОДА ===
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('authEmail').value.trim();
            const password = document.getElementById('authPassword').value.trim();
            
            let errorEl = document.querySelector('#loginForm .auth-error');
            if (!errorEl) { 
                errorEl = document.createElement('span'); 
                errorEl.className = 'auth-error'; 
                errorEl.style.cssText = 'color: #d32f2f; font-size: 13px; text-align: center; display: block; margin-top: 8px;'; 
                loginForm.appendChild(errorEl); 
            }
            
            try {
                const res = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`);
                const users = await res.json();
                
                if (users.length > 0 && users[0].password === password) {
                    const user = users[0];
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    modal.classList.remove('active'); 
                    document.body.style.overflow = ''; 
                    loginForm.reset(); 
                    errorEl.style.display = 'none';
                    showUserProfile(user);
                } else { 
                    errorEl.textContent = 'Неверный email или пароль'; 
                    errorEl.style.display = 'block'; 
                }
            } catch (err) { 
                console.error('Ошибка входа:', err); 
                errorEl.textContent = 'Ошибка сервера'; 
                errorEl.style.display = 'block'; 
            }
        });
    }

    // === ФОРМА РЕГИСТРАЦИИ ===
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value.trim();
            
            if (password.length < 4) { 
                alert('Пароль должен быть не менее 4 символов'); 
                return; 
            }
            
            try {
                // Проверка на существующий email
                const checkRes = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`);
                const existing = await checkRes.json();
                if (existing.length > 0) { 
                    alert('Этот email уже зарегистрирован. Попробуйте войти.'); 
                    return; 
                }
                
                // Создание нового пользователя
                const res = await fetch('http://localhost:3000/users', {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        name, 
                        email, 
                        password, 
                        candidateId: null, 
                        subscribed: false 
                    })
                });
                
                if (res.ok) {
                    const newUser = await res.json();
                    localStorage.setItem('currentUser', JSON.stringify(newUser));
                    registerForm.reset(); 
                    modal.classList.remove('active'); 
                    document.body.style.overflow = '';
                    showLoginView(); // Возврат на вкладку входа
                    showUserProfile(newUser);
                    alert(`Добро пожаловать, ${name.split(' ')[0]}!`);
                } else { 
                    alert('Ошибка при создании аккаунта'); 
                }
            } catch (err) { 
                console.error('Ошибка регистрации:', err); 
                alert('Не удалось подключиться к серверу.'); 
            }
        });
    }

    // === ПОИСК (Live Search) ===
    const searchInput = document.getElementById('liveSearchInput');
    const resultsDropdown = document.getElementById('searchResults');
    let allCandidatesCache = [];
    let isCacheReady = false;

    fetch('http://localhost:3000/candidates')
        .then(res => res.json())
        .then(data => { allCandidatesCache = data; isCacheReady = true; })
        .catch(err => console.error('Ошибка загрузки базы:', err));

    if (searchInput && resultsDropdown) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (!isCacheReady || query.length < 3) { 
                resultsDropdown.style.display = 'none'; 
                return; 
            }

            const filtered = allCandidatesCache.filter(c => {
                const tags = (c.tags || []).join(' ').toLowerCase();
                return tags.includes(query) || 
                       (c.experience || '').toLowerCase().includes(query) || 
                       (c.position || '').toLowerCase().includes(query);
            });

            resultsDropdown.innerHTML = filtered.length === 0 
                ? '<div style="padding:16px;text-align:center;color:#999">Не найдено</div>'
                : filtered.slice(0, 5).map(c => `
                    <a href="profile.html?id=${c.id}" class="search-result-item">
                        <div class="search-result-avatar">${(c.name || '?').charAt(0).toUpperCase()}</div>
                        <div class="search-result-info">
                            <h4>${c.position || 'Специалист'}</h4>
                            <p>${c.name || 'Аноним'} • ${(c.tags || []).slice(0, 3).join(', ')}</p>
                        </div>
                    </a>`).join('');
            resultsDropdown.style.display = 'block';
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !resultsDropdown.contains(e.target)) {
                resultsDropdown.style.display = 'none';
            }
        });
    }

    // === КНОПКА "ПОПАСТЬ В БАЗУ" ===
    const joinDatabaseBtn = document.getElementById('joinDatabaseBtn');
    
    function handleJoinDatabaseClick(e) {
        e.preventDefault();
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        } else if (currentUser.candidateId === null || currentUser.candidateId === undefined) {
            window.location.href = 'create-profile.html';
        } else {
            window.location.href = `profile.html?id=${currentUser.candidateId}`;
        }
    }

    if (joinDatabaseBtn) {
        joinDatabaseBtn.addEventListener('click', handleJoinDatabaseClick);
    }
    document.querySelectorAll('.join-database-btn').forEach(link => {
        link.addEventListener('click', handleJoinDatabaseClick);
    });

    // === МОДАЛЬНОЕ ОКНО "О СЕРВИСЕ" ===
    if (aboutServiceBtn && aboutModal) {
        aboutServiceBtn.addEventListener('click', (e) => {
            e.preventDefault();
            aboutModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        const closeAbout = () => { 
            aboutModal.classList.remove('active'); 
            document.body.style.overflow = ''; 
        };
        
        if (closeAboutModal) closeAboutModal.addEventListener('click', closeAbout);
        if (closeAboutBtn) closeAboutBtn.addEventListener('click', closeAbout);
        aboutModal.addEventListener('click', (e) => { 
            if (e.target === aboutModal) closeAbout(); 
        });
    }

    // === ПРОВЕРКА АВТОРИЗАЦИИ ПРИ ЗАГРУЗКЕ ===
    const saved = localStorage.getItem('currentUser');
    if (saved) { 
        try { 
            showUserProfile(JSON.parse(saved)); 
        } catch(e) {
            console.error('Ошибка восстановления сессии:', e);
            localStorage.removeItem('currentUser');
        }
    }

    // === БУРГЕР-МЕНЮ ===
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileJoinBtn = document.getElementById('mobileJoinBtn');
    const mobileAboutBtn = document.getElementById('mobileAboutBtn');

    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const spans = burgerBtn.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const spans = burgerBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });

        if (mobileJoinBtn) {
            mobileJoinBtn.addEventListener('click', (e) => {
                e.preventDefault();
                handleJoinDatabaseClick(e);
            });
        }
        
        if (mobileAboutBtn) {
            mobileAboutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                aboutModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    }
});
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

document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('openModalBtn');
    const modal = document.getElementById('loginModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const loginForm = document.getElementById('loginForm');
    const loginView = document.getElementById('loginView');
    const registerView = document.getElementById('registerView');
    const toRegisterBtn = document.getElementById('toRegisterBtn');
    const backToLoginBtn = document.getElementById('backToLoginBtn');
    const registerForm = document.getElementById('registerForm');

    function showUserProfile(user) {
        if (openModalBtn) openModalBtn.style.display = 'none';
        const wrap = document.getElementById('userProfileWrapper');
        const nameEl = document.getElementById('userName');
        const avatarEl = document.getElementById('userAvatar');
        
        if (wrap && nameEl && avatarEl) { 
            wrap.style.display = 'flex'; 
            nameEl.textContent = user.name.split(' ')[0]; 
            avatarEl.textContent = user.name.charAt(0).toUpperCase(); 
        }
        
        const dropdown = document.getElementById('userDropdown');
        document.getElementById('userProfile')?.addEventListener('click', (e) => { 
            e.stopPropagation(); 
            dropdown?.classList.toggle('show'); 
        });
        
        document.addEventListener('click', (e) => { 
            if (dropdown && !e.target.closest('.user-profile-wrapper')) dropdown.classList.remove('show'); 
        });
        
        document.getElementById('logoutBtn')?.addEventListener('click', () => { 
            if (confirm('Выйти?')) { 
                localStorage.removeItem('currentUser'); 
                window.location.href = 'index.html'; 
            } 
        });
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

    if (openModalBtn) {
        openModalBtn.addEventListener('click', (e) => { 
            e.stopPropagation(); 
            modal.classList.add('active'); 
            document.body.style.overflow = 'hidden'; 
        });
    }
    if (closeBtn) closeBtn.addEventListener('click', () => { 
        modal.classList.remove('active'); 
        document.body.style.overflow = ''; 
    });
    if (modal) modal.addEventListener('click', (e) => { 
        if (e.target === modal) { modal.classList.remove('active'); document.body.style.overflow = ''; } 
    });

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('authEmail').value.trim();
            const password = document.getElementById('authPassword').value.trim();
            let errorEl = document.querySelector('.auth-error');
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

    if (toRegisterBtn) {
        toRegisterBtn.addEventListener('click', () => {
            loginView.style.display = 'none';
            registerView.style.display = 'block';
            document.querySelector('.modal-title').textContent = 'Создать аккаунт';
        });
    }
    if (backToLoginBtn) {
        backToLoginBtn.addEventListener('click', () => {
            registerView.style.display = 'none';
            loginView.style.display = 'block';
            document.querySelector('.modal-title').innerHTML = 'Получить доступ к базе<br>проверенных кандидатов';
        });
    }
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value.trim();
            if (password.length < 4) { alert('Пароль должен быть не менее 4 символов'); return; }
            try {
                const checkRes = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`);
                const existing = await checkRes.json();
                if (existing.length > 0) { alert('Этот email уже зарегистрирован. Попробуйте войти.'); return; }
                const res = await fetch('http://localhost:3000/users', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password, candidateId: null, subscribed: false })
                });
                if (res.ok) {
                    const newUser = await res.json();
                    localStorage.setItem('currentUser', JSON.stringify(newUser));
                    registerForm.reset(); 
                    modal.classList.remove('active'); 
                    document.body.style.overflow = '';
                    loginView.style.display = 'block'; 
                    registerView.style.display = 'none';
                    document.querySelector('.modal-title').innerHTML = 'Получить доступ к базе<br>проверенных кандидатов';
                    showUserProfile(newUser);
                    alert(`Добро пожаловать, ${name.split(' ')[0]}!`);
                } else { alert('Ошибка при создании аккаунта'); }
            } catch (err) { console.error('Ошибка регистрации:', err); alert('Не удалось подключиться к серверу.'); }
        });
    }

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
            if (!isCacheReady || query.length < 3) { resultsDropdown.style.display = 'none'; return; }

            const filtered = allCandidatesCache.filter(c => {
                const tags = (c.tags || []).join(' ').toLowerCase();
                return tags.includes(query) || 
                       (c.test_exp || '').toLowerCase().includes(query) || 
                       (c.api_exp || '').toLowerCase().includes(query) || 
                       (c.general_info || '').toLowerCase().includes(query);
            });

            resultsDropdown.innerHTML = filtered.length === 0 
                ? '<div style="padding:16px;text-align:center;color:#999">Не найдено</div>'
                : filtered.slice(0, 5).map(c => `
                    <a href="profile.html?id=${c.id}" class="search-result-item">
                        <div class="search-result-avatar">${c.name.charAt(0)}</div>
                        <div class="search-result-info">
                            <h4>${c.position || 'Специалист'}</h4>
                            <p>${c.name} • ${(c.tags || []).slice(0, 3).join(', ')}</p>
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

    const joinDatabaseBtn = document.getElementById('joinDatabaseBtn');
    const aboutServiceBtn = document.getElementById('aboutServiceBtn');
    const aboutModal = document.getElementById('aboutModal');
    const closeAboutModal = document.getElementById('closeAboutModal');
    const closeAboutBtn = document.getElementById('closeAboutBtn');

    function handleJoinDatabaseClick(e) {
        e.preventDefault();
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else if (currentUser.candidateId === null || currentUser.candidateId === undefined) {
            window.location.href = 'create-profile.html';
        } else {
            window.location.href = `profile.html?id=${currentUser.candidateId}`;
        }
    }

    if (joinDatabaseBtn) joinDatabaseBtn.addEventListener('click', handleJoinDatabaseClick);
    document.querySelectorAll('.join-database-btn').forEach(link => link.addEventListener('click', handleJoinDatabaseClick));

    if (aboutServiceBtn && aboutModal) {
        aboutServiceBtn.addEventListener('click', (e) => {
            e.preventDefault();
            aboutModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        const closeAbout = () => { aboutModal.classList.remove('active'); document.body.style.overflow = ''; };
        closeAboutModal?.addEventListener('click', closeAbout);
        closeAboutBtn?.addEventListener('click', closeAbout);
        aboutModal?.addEventListener('click', (e) => { if (e.target === aboutModal) closeAbout(); });
    }

    const saved = localStorage.getItem('currentUser');
    if (saved) { try { showUserProfile(JSON.parse(saved)); } catch(e) {} }

        // === БУРГЕР-МЕНЮ ===
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileJoinBtn = document.getElementById('mobileJoinBtn');
    const mobileAboutBtn = document.getElementById('mobileAboutBtn');

    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            // Анимация бургера
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

        // Закрытие при клике на ссылку
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const spans = burgerBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });

        // Дублируем функционал кнопок для мобильного меню
        if (mobileJoinBtn) {
            mobileJoinBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (!currentUser) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                } else if (currentUser.candidateId === null || currentUser.candidateId === undefined) {
                    window.location.href = 'create-profile.html';
                } else {
                    window.location.href = `profile.html?id=${currentUser.candidateId}`;
                }
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
document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('openModalBtn');
    const modal = document.getElementById('loginModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const loginForm = document.getElementById('loginForm');

    openModalBtn?.addEventListener('click', () => { modal.classList.add('active'); document.body.style.overflow = 'hidden'; });
    closeBtn?.addEventListener('click', () => { modal.classList.remove('active'); document.body.style.overflow = ''; });
    modal?.addEventListener('click', (e) => { if (e.target === modal) { modal.classList.remove('active'); document.body.style.overflow = ''; } });

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('authEmail').value.trim();
            const password = document.getElementById('authPassword').value.trim();
            let errorEl = document.querySelector('.auth-error');
            if (!errorEl) { errorEl = document.createElement('span'); errorEl.className = 'auth-error'; errorEl.style.cssText = 'color: #d32f2f; font-size: 13px; text-align: center; display: block; margin-top: 8px;'; loginForm.appendChild(errorEl); }
            try {
                const res = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`);
                const users = await res.json();
                if (users.length > 0 && users[0].password === password) {
                    const user = users[0];
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    modal.classList.remove('active'); document.body.style.overflow = ''; loginForm.reset(); errorEl.style.display = 'none';
                    showUserProfile(user); loadData();
                } else { errorEl.textContent = 'Неверный email или пароль'; errorEl.style.display = 'block'; }
            } catch (err) { console.error(err); errorEl.textContent = 'Ошибка сервера'; errorEl.style.display = 'block'; }
        });
    }

    function showUserProfile(user) {
        if (openModalBtn) openModalBtn.style.display = 'none';
        const wrap = document.getElementById('userProfileWrapper');
        const nameEl = document.getElementById('userName');
        const avatarEl = document.getElementById('userAvatar');
        if (wrap && nameEl && avatarEl) { wrap.style.display = 'flex'; nameEl.textContent = user.name.split(' ')[0]; avatarEl.textContent = user.name.charAt(0).toUpperCase(); }
        const dropdown = document.getElementById('userDropdown');
        document.getElementById('userProfile')?.addEventListener('click', (e) => { e.stopPropagation(); dropdown?.classList.toggle('show'); });
        document.addEventListener('click', (e) => { if (dropdown && !e.target.closest('.user-profile-wrapper')) dropdown.classList.remove('show'); });
        document.getElementById('logoutBtn')?.addEventListener('click', () => { 
            if (confirm('Выйти?')) { 
                localStorage.removeItem('currentUser'); 
                window.location.href = 'index.html';
            } 
        });
    }

    function hideUserProfile() {
        const wrap = document.getElementById('userProfileWrapper');
        if (wrap) wrap.style.display = 'none';
        if (openModalBtn) { openModalBtn.style.display = 'block'; openModalBtn.textContent = 'Войти'; openModalBtn.style.backgroundColor = ''; }
    }

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) { window.location.href = 'index.html'; }

    const form = document.getElementById('editProfileForm');
    const nameInput = document.getElementById('editName');
    const emailInput = document.getElementById('editEmail');
    const passInput = document.getElementById('editPassword');
    const saveBtn = document.getElementById('saveBtn');
    const successMsg = document.getElementById('successMessage');

    async function loadData() {
        try {
            const res = await fetch(`http://localhost:3000/users/${currentUser.id}`);
            if (!res.ok) throw new Error('Failed');
            const user = await res.json();
            nameInput.value = user.name || '';
            emailInput.value = user.email || '';
        } catch (err) {
            console.error('Ошибка загрузки:', err);
            alert('Не удалось загрузить данные профиля');
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        saveBtn.disabled = true;
        saveBtn.textContent = 'Сохранение...';

        const payload = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            password: currentUser.password
        };

        if (passInput.value.trim()) {
            if (passInput.value.trim().length < 6) {
                alert('Пароль должен быть не менее 6 символов');
                saveBtn.disabled = false; saveBtn.textContent = '💾 Сохранить изменения';
                return;
            }
            payload.password = passInput.value.trim();
        }

        try {
            const res = await fetch(`http://localhost:3000/users/${currentUser.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Update failed');

            const updatedUser = { ...currentUser, name: payload.name, email: payload.email, password: payload.password };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));

            form.style.display = 'none';
            successMsg.style.display = 'flex';
            if (document.getElementById('userName')) document.getElementById('userName').textContent = updatedUser.name.split(' ')[0];

        } catch (err) {
            console.error(err);
            alert('Ошибка при сохранении. Проверьте подключение к серверу.');
            saveBtn.disabled = false;
            saveBtn.textContent = ' Сохранить изменения';
        }
    });

    if (currentUser) showUserProfile(currentUser);
    loadData();
});
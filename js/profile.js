document.addEventListener('DOMContentLoaded', () => {
    async function loadProfile() {
        const params = new URLSearchParams(window.location.search);
        let targetId = params.get('id');
        
        if (!targetId) {
            try {
                const session = JSON.parse(localStorage.getItem('currentUser'));
                if (session?.candidateId) targetId = String(session.candidateId);
            } catch(e) {}
        }
        
        targetId = targetId || "1";

        try {
            const res = await fetch('http://localhost:3000/candidates');
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const candidates = await res.json();
            
            const c = Array.isArray(candidates) 
                ? candidates.find(candidate => String(candidate.id) === String(targetId)) 
                : null;
            
            if (!c) {
                document.getElementById('profileName').textContent = 'Кандидат не найден';
                return;
            }

            // Аватар
            const avatarEl = document.getElementById('profileAvatar');
            const avatarContainer = avatarEl.parentElement;
            
            if (c.avatar?.startsWith('gradient-')) {
                const gradients = {
                    'gradient-purple': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    'gradient-blue': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    'gradient-green': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    'gradient-orange': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                    'gradient-red': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
                };
                
                const gradientDiv = document.createElement('div');
                gradientDiv.className = 'profile-avatar-gradient';
                gradientDiv.style.cssText = `
                    width: 120px; height: 120px; border-radius: 50%; 
                    background: ${gradients[c.avatar] || gradients['gradient-purple']}; 
                    display: flex; align-items: center; justify-content: center; 
                    color: #fff; font-size: 48px; font-weight: 700; border: 3px solid var(--border);
                `;
                gradientDiv.textContent = c.name.charAt(0).toUpperCase();
                avatarContainer.replaceChild(gradientDiv, avatarEl);
            } else {
                avatarEl.src = c.avatar || 'img/default-avatar.png';
                avatarEl.style.display = 'block';
            }

            // Данные
            document.getElementById('profileName').textContent = c.name || '—';
            document.getElementById('profileAge').textContent = c.age || '—';
            document.getElementById('profileSpecialty').textContent = c.position || '—';
            document.getElementById('profileLocation').textContent = `📍 ${c.location || '—'}`;
            document.getElementById('profileSalary').textContent = `${Number(c.salary || 0).toLocaleString()} ₽`;
            document.getElementById('profileStatus').textContent = c.tags?.[0] || 'full-time';
            document.title = `ЛИЦА - ${c.name}`;

            document.getElementById('reasonBlock').innerHTML = `<p>${c.reason || '—'}</p>`;
            document.getElementById('generalBlock').innerHTML = `<p>${c.general_info || '—'}</p>`;
            document.getElementById('testExpBlock').innerHTML = `<p>${c.test_exp || '—'}</p>`;
            document.getElementById('apiBlock').innerHTML = `<p>${c.api_exp || '—'}</p>`;
            
            // Настройка кнопок контактов
            const telegramLink = document.getElementById('profileTelegram');
            const portfolioLink = document.getElementById('profilePortfolio');
            const showContactsBtn = document.getElementById('showContactsBtn');
            const revealedContacts = document.getElementById('revealedContacts');

            // Скрываем кнопки по умолчанию
            telegramLink.style.display = 'none';
            portfolioLink.style.display = 'none';
            revealedContacts.style.display = 'none';

            // Если есть данные, готовим ссылки
            if (c.telegram) {
                const username = c.telegram.replace(/^@/, '');
                telegramLink.href = `https://t.me/${username}`;
                telegramLink.style.display = 'inline-block';
            }
            if (c.portfolio) {
                portfolioLink.href = c.portfolio;
                portfolioLink.style.display = 'inline-block';
            }

            // Логика кнопки "Открыть контакты"
            if (c.telegram || c.portfolio) {
                showContactsBtn.addEventListener('click', () => {
                    showContactsBtn.style.display = 'none'; // Скрываем кнопку
                   revealedContacts.style.display = 'flex'; // Показываем ссылки
                });
            } else {
                showContactsBtn.textContent = 'Контакты не указаны';
                showContactsBtn.disabled = true;
                showContactsBtn.style.opacity = '0.5';
            }
            
        } catch (err) {
            console.error('Ошибка загрузки профиля:', err);
            document.getElementById('profileName').textContent = 'Ошибка загрузки';
        }
    }

    loadProfile();
});
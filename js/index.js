document.addEventListener('DOMContentLoaded', () => {
    let allCandidates = [];

    async function loadAllCandidates() {
        try {
            const res = await fetch('http://localhost:3000/candidates');
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            allCandidates = await res.json();
            console.log('Загружено кандидатов:', allCandidates.length);
            renderCandidates(allCandidates); 
        } catch (err) {
            console.error('Ошибка загрузки:', err);
            document.getElementById('candidatesGrid').innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Не удалось загрузить кандидатов</p>';
        }
    }

    function renderCandidates(candidates) {
        const grid = document.getElementById('candidatesGrid');
        if (!grid) return;
        
        if (candidates.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">Кандидаты не найдены</p>';
            return;
        }
        
        function getGradient(avatarName) {
            const gradients = {
                'gradient-purple': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'gradient-blue': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'gradient-green': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                'gradient-orange': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                'gradient-red': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
            };
            return gradients[avatarName] || gradients['gradient-purple'];
        }
        
        grid.innerHTML = candidates.map(c => {
            const avatarHTML = c.avatar?.startsWith('gradient-') 
                ? `<div class="avatar-gradient" style="width: 104px; height: 104px; border-radius: 50%; background: ${getGradient(c.avatar)}; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 36px; font-weight: 700;">${c.name.charAt(0).toUpperCase()}</div>`
                : `<img src="${c.avatar || 'img/default-avatar.png'}" alt="${c.name}" style="width: 104px; height: 104px; border-radius: 50%; object-fit: cover;">`;
            
            return `
            <div class="candidate-card">
                <div class="candidate-badges">
                    ${c.tags?.map(t => {
                        const tagNames = {
                            'fulltime': 'Полная занятость',
                            'parttime': 'Частичная занятость',
                            'remote': 'Удалённо'
                        };
                        return `<span class="badge badge-${t}">${tagNames[t] || t}</span>`;
                    }).join('') || ''}
                </div>
                <div class="candidate-avatar">${avatarHTML}</div>
                <h3 class="candidate-name">${c.name}</h3>
                <p class="candidate-position">${c.position}</p>
                <div class="candidate-info">
                    <p class="info-item">Опыт: ${c.experience}</p>
                    <p class="info-item">Зарплата: от ${c.salary?.toLocaleString() || '0'} ₽</p>
                </div>
                <a href="profile.html?id=${c.id}" class="btn-candidate" style="text-decoration: none;">Посмотреть справку</a>
            </div>`;
        }).join('');
    }

    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('subscribeEmail').value.trim();
            const btn = document.getElementById('subscribeBtn');
            const successMsg = document.getElementById('subscribeSuccess');
            btn.disabled = true; btn.textContent = 'Проверка...';
            try {
                const res = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`);
                const users = await res.json();
                if (users.length > 0) {
                    await fetch(`http://localhost:3000/users/${users[0].id}`, {
                        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ subscribed: true })
                    });
                    subscribeForm.style.display = 'none'; successMsg.style.display = 'block';
                } else { alert('Email не найден в базе. Пожалуйста, зарегистрируйтесь сначала.'); btn.disabled = false; btn.textContent = 'Подписаться'; }
            } catch (err) { console.error('Ошибка подписки:', err); alert('Произошла ошибка.'); btn.disabled = false; btn.textContent = 'Подписаться'; }
        });
    }

    loadAllCandidates();
});
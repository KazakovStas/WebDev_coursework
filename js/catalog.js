document.addEventListener('DOMContentLoaded', () => {
    let allCandidates = [];
    let currentCategory = null;

    async function loadAllCandidates(category = null) {
        try {
            const res = await fetch('http://localhost:3000/candidates');
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            let candidates = await res.json();
            
            if (category) {
                candidates = candidates.filter(c => c.category === category);
                
                const categoryNames = {
                    'marketing': 'Маркетологи',
                    'development': 'Backend-разработчики',
                    'design': 'Дизайнеры',
                    'sales': 'Менеджеры по продажам',
                    'analytics': 'Аналитики',
                    'content': 'Контент-менеджеры',
                    'management': 'Топ-менеджмент',
                    'hr': 'HR-специалисты',
                    'finance': 'Финансисты',
                    'legal': 'Юристы',
                    'support': 'Техподдержка'
                };
                const pageTitle = document.querySelector('.catalog-main h1') || document.querySelector('.content-header h1');
                if (pageTitle) {
                    pageTitle.textContent = categoryNames[category] || 'Кандидаты';
                }
            }
            
            allCandidates = candidates;
            renderCandidates(candidates); 
        } catch (err) {
            console.error('Ошибка загрузки:', err);
            document.getElementById('candidatesGrid').innerHTML = '<p>Не удалось загрузить кандидатов</p>';
        }
    }

    window.applyFilters = function() {
        const salaryMin = document.getElementById('salaryMin')?.value;
        const salaryMax = document.getElementById('salaryMax')?.value;
        const expChecks = Array.from(document.querySelectorAll('input[name="exp"]:checked')).map(i => i.value);
        const formatChecks = Array.from(document.querySelectorAll('input[name="format"]:checked')).map(i => i.value);
        
        let filtered = [...allCandidates];
        
        if (salaryMin) filtered = filtered.filter(c => (c.salary || 0) >= Number(salaryMin));
        if (salaryMax) filtered = filtered.filter(c => (c.salary || 0) <= Number(salaryMax));
        
        if (formatChecks.length > 0) {
            filtered = filtered.filter(c => {
                const candidateTags = c.tags || [];
                return formatChecks.some(format => candidateTags.includes(format));
            });
        }
        
        if (expChecks.length > 0) {
            filtered = filtered.filter(c => {
                const exp = c.experience || '';
                const match = exp.match(/(\d+)/);
                const years = match ? parseInt(match[1]) : 0;
                
                return expChecks.some(e => {
                    if (e === '1-3') return years >= 1 && years <= 3;
                    if (e === '3-5') return years >= 3 && years <= 5;
                    if (e === '5+') return years >= 5;
                    return false;
                });
            });
        }
        
        renderCandidates(filtered);
    };

    window.clearFilters = function() {
        document.getElementById('salaryMin').value = '';
        document.getElementById('salaryMax').value = '';
        document.querySelectorAll('input[name="exp"]').forEach(i => i.checked = false);
        document.querySelectorAll('input[name="format"]').forEach(i => i.checked = false);
        
        const url = new URL(window.location);
        url.searchParams.delete('category');
        window.history.replaceState({}, '', url);
        
        loadAllCandidates();
    };

    window.renderCandidates = function(candidates) {
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
    };

    const params = new URLSearchParams(window.location.search);
    currentCategory = params.get('category');
    loadAllCandidates(currentCategory);
    
    document.querySelector('.apply-filters')?.addEventListener('click', applyFilters);
    document.querySelector('.clear-filters')?.addEventListener('click', clearFilters);
    
    document.querySelectorAll('.secondary-nav a[href*="category"]').forEach(link => {
        link.addEventListener('click', () => {
            clearFilters();
        });
    });
});
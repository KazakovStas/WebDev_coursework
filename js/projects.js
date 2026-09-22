document.addEventListener('DOMContentLoaded', () => {
    let allJobs = [];

    async function loadProjects() {
        try {
            const res = await fetch('http://localhost:3000/jobs');
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            allJobs = Array.isArray(data) ? data : [];
            applyFilters();
        } catch (err) {
            console.error('Ошибка загрузки проектов:', err);
            allJobs = [];
            renderProjects([]);
        }
    }

    window.renderProjects = function(jobs) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const list = document.getElementById('projectsList');
        const empty = document.getElementById('emptyState');
        const count = document.getElementById('projectsCount');

        if (!jobs || !Array.isArray(jobs)) {
            if (list) list.innerHTML = '';
            if (empty) empty.style.display = 'block';
            if (count) count.textContent = '0';
            return;
        }

        if (jobs.length === 0) {
            list.style.display = 'none';
            empty.style.display = 'block';
            count.textContent = '0';
            return;
        }

        list.style.display = 'flex';
        empty.style.display = 'none';
        count.textContent = jobs.length;

        list.innerHTML = jobs.map(job => {
            // Переводы через t() — реагируют на текущий язык (ru/en)
            const statusMap = {
                'open':        t('status-open'),
                'in-progress': t('status-inprogress'),
                'completed':   t('status-completed')
            };
            const formatMap = {
                'remote':   t('format-remote'),
                'fulltime': t('format-fulltime'),
                'parttime': t('format-parttime')
            };
            const catMap = {
                'development': t('opt-development'),
                'marketing':   t('opt-marketing'),
                'design':      t('opt-design'),
                'analytics':   t('opt-analytics')
            };

            // Защита от undefined: нет поля — бейдж не рисуется
            const category = job.category   ? (catMap[job.category]     || job.category)   : '';
            const format   = job.workFormat ? (formatMap[job.workFormat] || job.workFormat) : '';

            return `
                <div class="project-card-lg">
                    <div class="project-header-lg">
                        <div class="project-meta-left">
                            <span class="project-status status-${job.status}">${statusMap[job.status] || job.status}</span>
                            ${category ? `<span class="project-category">${category}</span>` : ''}
                        </div>
                        <span class="project-budget">${job.budget?.toLocaleString() || '0'} ₽</span>
                    </div>
                    <h3 class="project-title-lg">${job.title || '—'}</h3>
                    <p class="project-desc-lg">${(job.description || '').length > 180 ? (job.description || '').substring(0, 180) + '...' : (job.description || '')}</p>
                    <div class="project-tags">
                        ${(job.skills || []).map(s => `<span class="tag">${s}</span>`).join('')}
                        ${format ? `<span class="tag tag-format">${format}</span>` : ''}
                    </div>
                    <div class="project-footer">
                        <span class="project-date">${t('prj-deadline')} ${job.deadline ? new Date(job.deadline).toLocaleDateString('ru-RU') : '—'}</span>
                        ${currentUser
                            ? `<a href="project-details.html?id=${job.id}" class="btn-sm btn-primary">${t('prj-apply')}</a>`
                            : `<span class="login-hint">${t('prj-login-hint')}</span>`}
                    </div>
                </div>
            `;
        }).join('');
    };

    window.applyFilters = function() {
        const cats = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(i => i.value);
        const fmts = Array.from(document.querySelectorAll('input[name="format"]:checked')).map(i => i.value);
        const min = document.getElementById('budgetMin').value;
        const max = document.getElementById('budgetMax').value;

        let filtered = allJobs;
        if (cats.length) filtered = filtered.filter(j => cats.includes(j.category));
        if (fmts.length) filtered = filtered.filter(j => fmts.includes(j.workFormat));
        if (min) filtered = filtered.filter(j => j.budget >= +min);
        if (max) filtered = filtered.filter(j => j.budget <= +max);

        renderProjects(filtered);
    };

    window.clearFilters = function() {
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        document.getElementById('budgetMin').value = '';
        document.getElementById('budgetMax').value = '';
        renderProjects(allJobs);
    };

    // Перерисовка карточек при смене языка (RU/EN)
    window.addEventListener('langchange', loadProjects);

    loadProjects();
});
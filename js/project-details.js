document.addEventListener('DOMContentLoaded', () => {
    async function loadProject() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('id');
        
        const loading = document.getElementById('projectLoading');
        const notFound = document.getElementById('projectNotFound');
        const content = document.getElementById('projectContent');
        const sidebar = document.getElementById('projectSidebar');
        
        loading.style.display = 'block';
        notFound.style.display = 'none';
        content.style.display = 'none';
        if (sidebar) sidebar.style.display = 'none';
        
        if (!projectId) {
            loading.style.display = 'none';
            notFound.style.display = 'block';
            return;
        }
        
        try {
            const res = await fetch(`http://localhost:3000/jobs/${projectId}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const job = await res.json();
            
            document.getElementById('projTitle').textContent = job.title;
            document.getElementById('projDescription').textContent = job.description;
            document.getElementById('projBudget').textContent = `${job.budget?.toLocaleString() || '0'} ₽`;
            document.getElementById('projCreated').textContent = job.createdAt ? new Date(job.createdAt).toLocaleDateString('ru-RU') : '—';
            document.getElementById('projDeadline').textContent = job.deadline ? new Date(job.deadline).toLocaleDateString('ru-RU') : '—';
            document.getElementById('projFormat').textContent = {'remote':'Удалённо','fulltime':'Full-time','parttime':'Part-time'}[job.workFormat] || job.workFormat;
            document.getElementById('projCategory').textContent = {'development':'Разработка','marketing':'Маркетинг','design':'Дизайн','analytics':'Аналитика'}[job.category] || job.category;
            document.getElementById('projStatus').textContent = {'open':'Открыт','in-progress':'В работе','completed':'Завершён'}[job.status] || job.status;
            document.getElementById('projStatus').className = `project-status-large status-${job.status}`;
            
            const skillsEl = document.getElementById('projSkills');
            skillsEl.innerHTML = (job.skills || []).map(s => `<span class="skill-tag">${s}</span>`).join('');
            
            try {
                const usersRes = await fetch(`http://localhost:3000/users?candidateId=${job.creatorId}`);
                const users = await usersRes.json();
                if (users.length > 0) {
                    document.getElementById('clientName').textContent = users[0].name;
                } else {
                    document.getElementById('clientName').textContent = 'Заказчик';
                }
            } catch (err) {
                console.error('Ошибка загрузки заказчика:', err);
                document.getElementById('clientName').textContent = 'Заказчик';
            }
            document.getElementById('clientProfileLink').href = `profile.html?id=${job.creatorId}`;
            
            loading.style.display = 'none';
            content.style.display = 'block';
            if (sidebar) sidebar.style.display = 'block';
            
            initProjectActions();
            updateProjectButtons(job);
            
            const applySection = document.getElementById('applySection');
            const appliedSection = document.getElementById('appliedSection');
            const ownProjectSection = document.getElementById('ownProjectSection');
            const applyBtn = document.getElementById('applyBtn');
            const applyHint = document.getElementById('applyHint');
            
            if (currentUser?.candidateId == job.creatorId) {
                applySection.style.display = 'none';
                appliedSection.style.display = 'none';
                ownProjectSection.style.display = 'block';
            } else if (currentUser) {
                applySection.style.display = 'block';
                appliedSection.style.display = 'none';
                ownProjectSection.style.display = 'none';
                applyBtn.disabled = false;
                applyHint.style.display = 'none';
            } else {
                applySection.style.display = 'block';
                appliedSection.style.display = 'none';
                ownProjectSection.style.display = 'none';
                applyBtn.disabled = true;
                applyHint.style.display = 'block';
            }
            
        } catch (err) {
            console.error('Ошибка загрузки:', err);
            loading.style.display = 'none';
            notFound.style.display = 'block';
            if (sidebar) sidebar.style.display = 'none';
        }
    }

    const applyForm = document.getElementById('applyForm');
    if (applyForm) {
        applyForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const message = document.getElementById('applyMessage').value.trim();
            const projectId = new URLSearchParams(window.location.search).get('id');

            if (!currentUser) { alert('Сначала войдите!'); return; }

            try {
                await fetch('http://localhost:3000/applications', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        jobId: projectId,
                        candidateId: currentUser.candidateId,
                        applicantName: currentUser.name,
                        status: 'pending',
                        message: message,
                        createdAt: new Date().toISOString()
                    })
                });

                document.getElementById('applySection').style.display = 'none';
                document.getElementById('appliedSection').style.display = 'block';

            } catch (err) {
                alert('Ошибка отправки отклика');
                console.error(err);
            }
        });
    }

    function initProjectActions() {
        const editBtn = document.getElementById('editProjectBtn');
        const closeBtn = document.getElementById('closeProjectBtn');
        const saveBtn = document.getElementById('saveProjectBtn');
        const notifyBtn = document.getElementById('notifySimilarBtn');
        const reportBtn = document.getElementById('reportBtn');
        
        editBtn?.addEventListener('click', () => {
            const currentStatus = document.getElementById('projStatus').textContent;
            if (currentStatus === 'Завершён') {
                alert('Завершённый проект нельзя редактировать с этой страницы.\n\nПерейдите в личный кабинет (dashboard.html), чтобы изменить его.');
                return;
            }
            const projectId = new URLSearchParams(window.location.search).get('id');
            window.location.href = `dashboard.html?edit=${projectId}`;
        });
        
        closeBtn?.addEventListener('click', async () => {
            if (!confirm('Закрыть проект?\n\nОн больше не будет отображаться в бирже.')) return;
            const projectId = new URLSearchParams(window.location.search).get('id');
            try {
                await fetch(`http://localhost:3000/jobs/${projectId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'completed' })
                });
                alert('Проект закрыт');
                loadProject();
            } catch (err) {
                alert('Ошибка при закрытии проекта');
                console.error(err);
            }
        });
        
        saveBtn?.addEventListener('click', () => {
            alert('Проект добавлен в избранное (функция в разработке)');
        });
        
        notifyBtn?.addEventListener('click', () => {
            alert('Вы будете получать уведомления о похожих проектах (функция в разработке)');
        });
        
        reportBtn?.addEventListener('click', () => {
            const reason = prompt('Пожалуйста, укажите причину жалобы:\n(спам, мошенничество, неактуально и т.д.)');
            if (reason) {
                const projectId = new URLSearchParams(window.location.search).get('id');
                console.log('Жалоба на проект:', projectId, 'Причина:', reason);
                alert('Жалоба отправлена. Мы проверим проект.');
            }
        });
    }

    function updateProjectButtons(job) {
        const editBtn = document.getElementById('editProjectBtn');
        const closeBtn = document.getElementById('closeProjectBtn');
        
        if (job.status === 'completed') {
            if (editBtn) {
                editBtn.disabled = true;
                editBtn.style.opacity = '0.5';
                editBtn.style.cursor = 'not-allowed';
                editBtn.textContent = 'Редактирование недоступно';
            }
            if (closeBtn) {
                closeBtn.disabled = true;
                closeBtn.style.opacity = '0.5';
                closeBtn.style.cursor = 'not-allowed';
                closeBtn.textContent = 'Проект завершён';
            }
        } else {
            if (editBtn) {
                editBtn.disabled = false;
                editBtn.style.opacity = '1';
                editBtn.style.cursor = 'pointer';
                editBtn.textContent = 'Редактировать';
            }
            if (closeBtn) {
                closeBtn.disabled = false;
                closeBtn.style.opacity = '1';
                closeBtn.style.cursor = 'pointer';
                closeBtn.textContent = 'Закрыть проект';
            }
        }
    }

    loadProject();
});
document.addEventListener('DOMContentLoaded', () => {
    let allJobs = [];

    async function loadDashboard() {
        const session = JSON.parse(localStorage.getItem('currentUser'));
        if (!session) {
            window.location.href = 'index.html';
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/users/${session.id}`);
            if (!res.ok) throw new Error('User load error');
            const freshUser = await res.json();

            localStorage.setItem('currentUser', JSON.stringify(freshUser));

            document.getElementById('dashName').textContent = freshUser.name;
            document.getElementById('dashEmail').textContent = freshUser.email;
            document.getElementById('dashAvatar').textContent = freshUser.name.charAt(0).toUpperCase();

            const statusEl = document.getElementById('subscribedStatus');
            const toggleBtn = document.getElementById('toggleSubscribeBtn');

            if (statusEl && toggleBtn) {
                const isSubscribed = freshUser.subscribed === true;
                if (isSubscribed) {
                    statusEl.textContent = t('dash-subscribed');
                    statusEl.className = 'subscribed';
                    toggleBtn.textContent = t('dash-sub-off');
                    toggleBtn.onclick = () => toggleSubscription(false);
                } else {
                    statusEl.textContent = t('dash-not-subscribed');
                    statusEl.className = 'not-subscribed';
                    toggleBtn.textContent = t('dash-sub-on');
                    toggleBtn.onclick = () => toggleSubscription(true);
                }
                toggleBtn.style.display = 'block';
            }

            const jobsRes = await fetch('http://localhost:3000/jobs');
            if (!jobsRes.ok) throw new Error('Jobs load error');
            allJobs = await jobsRes.json();

            const userId = freshUser.candidateId;
            const userJobs = userId !== null && userId !== undefined
                ? allJobs.filter(job => job.creatorId == userId || job.applicantId == userId)
                : [];

            renderProjects(userJobs, 'all');
            updateStats(userJobs, freshUser.candidateId);
            initCandidateManagement();

        } catch (err) {
            console.error('Dashboard init error:', err);
            alert(t('dash-load-error'));
        }
    }

    async function toggleSubscription(subscribe) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;
        try {
            await fetch(`http://localhost:3000/users/${currentUser.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subscribed: subscribe })
            });
            loadDashboard();
        } catch (err) {
            console.error(err);
            alert(t('dash-sub-error'));
        }
    }

    function renderProjects(jobs, filter = 'all') {
        const list = document.getElementById('projectsList');
        const empty = document.getElementById('emptyState');
        if (!list || !empty) return;

        const filtered = filter === 'all' ? jobs : jobs.filter(j => j.status === filter);

        if (filtered.length === 0) {
            list.style.display = 'none';
            empty.style.display = 'block';
            return;
        }

        list.style.display = 'grid';
        empty.style.display = 'none';

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        list.innerHTML = filtered.map(job => {
            const isCreator = job.creatorId == currentUser?.candidateId;
            const statusMap = { 'open': t('status-open'), 'in-progress': t('status-inprogress'), 'completed': t('status-completed') };
            const statusClass = { 'open': 'status-open', 'in-progress': 'status-progress', 'completed': 'status-completed' };

            return `
                <div class="project-card">
                    <div class="project-header">
                        <span class="project-status ${statusClass[job.status]}">${statusMap[job.status] || job.status}</span>
                        <span class="project-date">${job.createdAt ? new Date(job.createdAt).toLocaleDateString('ru-RU') : '—'}</span>
                    </div>
                    <h3 class="project-title">${job.title}</h3>
                    <p class="project-desc">${job.description}</p>
                    <div class="project-meta">
                        <span>${t('dash-budget')} <strong>${job.budget.toLocaleString()} ₽</strong></span>
                        <span>${t('prj-deadline')} ${new Date(job.deadline).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div class="project-actions">
                        ${isCreator ? `
                            <button class="btn-sm btn-outline" onclick="viewApplications('${job.id}')">${t('proj-actions-apps')}</button>
                            <button class="btn-sm" onclick="openEditModal('${job.id}')">${t('proj-actions-edit')}</button>
                        ` : `<button class="btn-sm">${t('proj-actions-contact')}</button>`}
                        <a href="project-details.html?id=${job.id}" class="btn-sm btn-outline">${t('proj-actions-details')}</a>
                    </div>
                </div>
            `;
        }).join('');
    }

    function updateStats(jobs, candidateId) {
        const active = jobs.filter(j => j.status === 'in-progress').length;
        const completed = jobs.filter(j => j.status === 'completed').length;
        const earned = jobs
            .filter(j => j.status === 'completed' && j.applicantId == candidateId)
            .reduce((sum, j) => sum + j.budget, 0);

        const elActive = document.getElementById('statActive');
        const elCompleted = document.getElementById('statCompleted');
        const elEarned = document.getElementById('statEarned');

        if (elActive) elActive.textContent = active;
        if (elCompleted) elCompleted.textContent = completed;
        if (elEarned) elEarned.textContent = `${earned.toLocaleString()} ₽`;
    }

    function initCandidateManagement() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const managementCard = document.getElementById('candidateManagementCard');
        const deleteBtn = document.getElementById('deleteCandidateBtn');
        const viewBtn = document.getElementById('viewProfileBtn');

        if (!currentUser || !managementCard) return;

        if (currentUser.candidateId) {
            managementCard.style.display = 'block';
            if (viewBtn) viewBtn.href = `profile.html?id=${currentUser.candidateId}`;
            if (deleteBtn) {
                deleteBtn.onclick = () => {
                    document.getElementById('deleteConfirmModal').classList.add('active');
                    document.body.style.overflow = 'hidden';
                };
            }
        } else {
            managementCard.style.display = 'none';
        }

        const deleteModal = document.getElementById('deleteConfirmModal');
        const closeDeleteBtn = document.getElementById('closeDeleteModal');
        const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
        const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

        function closeDeleteModal() {
            deleteModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // onclick вместо addEventListener — иначе при перерисовке (langchange)
        // обработчики накапливались бы и удаление срабатывало несколько раз
        if (closeDeleteBtn) closeDeleteBtn.onclick = closeDeleteModal;
        if (cancelDeleteBtn) cancelDeleteBtn.onclick = closeDeleteModal;
        if (deleteModal) deleteModal.onclick = (e) => { if (e.target === deleteModal) closeDeleteModal(); };

        if (confirmDeleteBtn) confirmDeleteBtn.onclick = async () => {
            try {
                confirmDeleteBtn.disabled = true;
                confirmDeleteBtn.textContent = t('dash-del-progress');

                await fetch(`http://localhost:3000/candidates/${currentUser.candidateId}`, { method: 'DELETE' });
                await fetch(`http://localhost:3000/users/${currentUser.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ candidateId: null })
                });

                localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, candidateId: null }));
                closeDeleteModal();
                loadDashboard();
            } catch (err) {
                console.error('Delete error:', err);
            } finally {
                confirmDeleteBtn.disabled = false;
                confirmDeleteBtn.textContent = t('del-confirm');
            }
        };
    }

    function initCreateProject() {
        const createProjectBtn = document.getElementById('createProjectBtn');
        const createFirstProjectBtn = document.getElementById('createFirstProjectBtn');
        const createProjectModal = document.getElementById('createProjectModal');
        const closeCreateProjectModal = document.getElementById('closeCreateProjectModal');
        const cancelCreateProjectBtn = document.getElementById('cancelCreateProjectBtn');
        const createProjectForm = document.getElementById('createProjectForm');

        function openCreateModal() {
            createProjectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        createProjectBtn?.addEventListener('click', openCreateModal);
        createFirstProjectBtn?.addEventListener('click', openCreateModal);

        function closeCreateModal() {
            createProjectModal.classList.remove('active');
            document.body.style.overflow = '';
            createProjectForm.reset();
        }

        closeCreateProjectModal?.addEventListener('click', closeCreateModal);
        cancelCreateProjectBtn?.addEventListener('click', closeCreateModal);
        createProjectModal?.addEventListener('click', (e) => {
            if (e.target === createProjectModal) closeCreateModal();
        });

        createProjectForm?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) { alert(t('auth-required')); return; }

            const projectData = {
                title: document.getElementById('projectTitle').value.trim(),
                description: document.getElementById('projectDescription').value.trim(),
                budget: Number(document.getElementById('projectBudget').value) || 0,
                deadline: document.getElementById('projectDeadline').value,
                status: 'open',
                creatorId: currentUser.candidateId || null,
                applicantId: null,
                createdAt: new Date().toISOString().split('T')[0]
            };

            try {
                const res = await fetch('http://localhost:3000/jobs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(projectData)
                });
                if (!res.ok) throw new Error('Failed to create project');
                await res.json();
                closeCreateModal();
                await loadDashboard();
                alert(`${t('prj-created')} «${projectData.title}»`);
            } catch (err) {
                console.error('Project create error:', err);
                alert(t('prj-create-error'));
            }
        });
    }

    function initEditProject() {
        const editModal = document.getElementById('editProjectModal');
        const closeEditBtn = document.getElementById('closeEditProjectModal');
        const cancelEditBtn = document.getElementById('cancelEditProjectBtn');
        const editForm = document.getElementById('editProjectForm');

        window.openEditModal = async (projectId) => {
            try {
                const res = await fetch(`http://localhost:3000/jobs/${projectId}`);
                if (!res.ok) throw new Error('Project not found');
                const project = await res.json();
                document.getElementById('editProjectId').value = project.id;
                document.getElementById('editProjectTitle').value = project.title;
                document.getElementById('editProjectDescription').value = project.description;
                document.getElementById('editProjectBudget').value = project.budget;
                document.getElementById('editProjectDeadline').value = project.deadline;
                document.getElementById('editProjectStatus').value = project.status || 'open';
                editModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            } catch (err) {
                console.error(err);
                alert(t('prj-load-error'));
            }
        };

        function closeEditModal() {
            editModal.classList.remove('active');
            document.body.style.overflow = '';
            editForm.reset();
        }

        closeEditBtn?.addEventListener('click', closeEditModal);
        cancelEditBtn?.addEventListener('click', closeEditModal);
        editModal?.addEventListener('click', (e) => {
            if (e.target === editModal) closeEditModal();
        });

        editForm?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = editForm.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.textContent = t('dash-save-progress');

            const projectId = document.getElementById('editProjectId').value;
            const updatedData = {
                title: document.getElementById('editProjectTitle').value.trim(),
                description: document.getElementById('editProjectDescription').value.trim(),
                budget: Number(document.getElementById('editProjectBudget').value) || 0,
                deadline: document.getElementById('editProjectDeadline').value,
                status: document.getElementById('editProjectStatus').value
            };

            try {
                const res = await fetch(`http://localhost:3000/jobs/${projectId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedData)
                });
                if (!res.ok) throw new Error('Server error');
                closeEditModal();
                loadDashboard();
            } catch (err) {
                console.error(err);
                alert(t('prj-save-error'));
            } finally {
                btn.disabled = false;
                btn.textContent = t('edit-save');
            }
        });
    }

    window.viewApplications = async (jobId) => {
        const modal = document.getElementById('applicationsModal');
        const list = document.getElementById('applicationsList');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        list.innerHTML = `<p>${t('pd-loading')}</p>`;

        try {
            const res = await fetch('http://localhost:3000/applications');
            const allApps = await res.json();
            const apps = allApps.filter(app => String(app.jobId) === String(jobId));

            if (apps.length === 0) {
                list.innerHTML = `<p style="text-align:center; color:#999; padding:20px;">${t('apps-none')}</p>`;
                return;
            }

            list.innerHTML = apps.map(app => `
                <div class="app-card" style="border:1px solid #eee; padding:16px; margin-bottom:12px; border-radius:12px; background:#fff;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                        <div>
                            <strong style="font-size:15px;">${app.applicantName || '—'}</strong>
                            <span style="font-size:12px; padding:3px 8px; border-radius:12px; background:${app.status === 'pending' ? '#FFF4CC' : '#E8F5E9'}; margin-left:8px;">
                                ${app.status === 'pending' ? t('apps-pending') : t('apps-accepted')}
                            </span>
                        </div>
                        <small style="color:#999;">${new Date(app.createdAt).toLocaleDateString('ru-RU')}</small>
                    </div>
                    ${app.message ? `<p style="margin:0 0 12px; font-size:14px; color:#555; background:#f9f9f9; padding:10px; border-radius:8px;">${app.message}</p>` : ''}
                    <div style="display:flex; gap:10px; flex-wrap:wrap;">
                        <a href="profile.html?id=${app.candidateId}" class="btn-sm btn-outline" target="_blank" style="text-decoration:none;">${t('apps-view')}</a>
                        ${app.status === 'pending' ? `
                            <button class="btn-sm" style="background:#4CAF50; color:#fff; border:none; cursor:pointer;" onclick="window.acceptApplicant('${app.id}', '${jobId}', '${app.candidateId}', this)">${t('apps-accept')}</button>
                            <button class="btn-sm" style="background:#f44336; color:#fff; border:none; cursor:pointer;" onclick="window.rejectApplicant('${app.id}', this)">${t('apps-reject')}</button>
                        ` : `<span style="color:#4CAF50; font-weight:600; padding:8px;">${t('apps-assigned')}</span>`}
                    </div>
                </div>
            `).join('');
        } catch (err) {
            console.error('Applications load error:', err);
            list.innerHTML = `<p style="color:#f44336; text-align:center;">${t('apps-load-error')}</p>`;
        }
    };

    window.acceptApplicant = async (appId, jobId, candidateId) => {
        try {
            await fetch(`http://localhost:3000/jobs/${jobId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'in-progress', applicantId: candidateId })
            });
            await fetch(`http://localhost:3000/applications/${appId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'accepted' })
            });
            const res = await fetch('http://localhost:3000/applications');
            const allApps = await res.json();
            const otherApps = allApps.filter(app => String(app.jobId) === String(jobId) && app.id !== appId);
            for (const otherApp of otherApps) {
                await fetch(`http://localhost:3000/applications/${otherApp.id}`, { method: 'DELETE' });
            }
            alert(t('app-accepted-ok'));
            window.viewApplications(jobId);
            loadDashboard();
        } catch (err) {
            console.error('Accept error:', err);
            alert(t('app-accept-error'));
        }
    };

    window.rejectApplicant = async (appId) => {
        try {
            await fetch(`http://localhost:3000/applications/${appId}`, { method: 'DELETE' });
            const list = document.getElementById('applicationsList');
            const btn = document.querySelector(`[onclick*="rejectApplicant('${appId}'"]`);
            if (btn) btn.closest('.app-card')?.remove();
            if (list.children.length === 0) {
                list.innerHTML = `<p style="text-align:center; color:#999; padding:20px;">${t('apps-none')}</p>`;
            }
            alert(t('app-rejected-ok'));
        } catch (err) {
            console.error('Reject error:', err);
            alert(t('app-reject-error'));
        }
    };

    const closeAppsBtn = document.getElementById('closeAppsModal');
    const appsModalOverlay = document.getElementById('applicationsModal');
    if (closeAppsBtn && appsModalOverlay) {
        closeAppsBtn.onclick = () => { appsModalOverlay.classList.remove('active'); document.body.style.overflow = ''; };
        appsModalOverlay.onclick = (e) => { if (e.target === appsModalOverlay) { appsModalOverlay.classList.remove('active'); document.body.style.overflow = ''; } };
    }

    // ГЛАВНОЕ: перерисовка дашборда при смене языка
    window.addEventListener('langchange', loadDashboard);

    loadDashboard();
    initCreateProject();
    initEditProject();

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const filter = e.target.dataset.tab;
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser || currentUser.candidateId === null || currentUser.candidateId === undefined) {
                renderProjects([], filter);
                return;
            }
            if (currentUser && allJobs.length > 0) {
                const userJobs = allJobs.filter(job => job.creatorId == currentUser.candidateId || job.applicantId == currentUser.candidateId);
                renderProjects(userJobs, filter);
            }
        });
    });
});
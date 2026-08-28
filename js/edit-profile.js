document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.candidateId) {
        window.location.href = 'index.html';
        return;
    }

    const form = document.getElementById('editProfileForm');
    const saveBtn = document.getElementById('saveEditBtn');
    const successMsg = document.getElementById('editSuccess');

    async function loadCandidateData() {
        try {
            const res = await fetch(`http://localhost:3000/candidates/${currentUser.candidateId}`);
            if (!res.ok) throw new Error('Not found');
            const data = await res.json();
            
            document.getElementById('editPosition').value = data.position || '';
            document.getElementById('editExperience').value = data.experience || '';
            document.getElementById('editSalary').value = data.salary || '';
            document.getElementById('editAge').value = data.age || '';
            document.getElementById('editLocation').value = data.location || '';
            document.getElementById('editTelegram').value = data.telegram ? data.telegram.replace('@', '') : '';
            document.getElementById('editPortfolio').value = data.portfolio || '';
            document.getElementById('editReason').value = data.reason || '';
            document.getElementById('editGeneralInfo').value = data.general_info || '';
        } catch (err) {
            alert('Ошибка загрузки профиля');
            window.location.href = 'profile.html';
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        saveBtn.disabled = true;
        saveBtn.textContent = 'Сохранение...';

        const payload = {
            position: document.getElementById('editPosition').value.trim(),
            experience: document.getElementById('editExperience').value.trim(),
            salary: Number(document.getElementById('editSalary').value) || 0,
            age: document.getElementById('editAge').value.trim(),
            location: document.getElementById('editLocation').value.trim(),
            telegram: document.getElementById('editTelegram').value.trim() ? `@${document.getElementById('editTelegram').value.trim()}` : '',
            portfolio: document.getElementById('editPortfolio').value.trim(),
            reason: document.getElementById('editReason').value.trim(),
            general_info: document.getElementById('editGeneralInfo').value.trim()
        };

        try {
            const res = await fetch(`http://localhost:3000/candidates/${currentUser.candidateId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error('Save failed');
            
            form.style.display = 'none';
            successMsg.style.display = 'flex';
        } catch (err) {
            alert('Ошибка сохранения');
            saveBtn.disabled = false;
            saveBtn.textContent = '💾 Сохранить';
        }
    });

    loadCandidateData();
});
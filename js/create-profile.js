document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    if (currentUser.candidateId !== null && currentUser.candidateId !== undefined) {
        window.location.href = `profile.html?id=${currentUser.candidateId}`;
        return;
    }

    document.getElementById('fullName').value = currentUser.name;

    const form = document.getElementById('createProfileForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('saveProfileBtn');
            btn.disabled = true;
            btn.textContent = 'Сохранение...';

            const selectedAvatar = document.querySelector('input[name="avatar"]:checked').value;
            const tags = Array.from(document.querySelectorAll('input[name="tags"]:checked')).map(cb => cb.value);

            const candidateData = {
                name: document.getElementById('fullName').value.trim(),
                position: document.getElementById('position').value.trim(),
                avatar: selectedAvatar,
                experience: document.getElementById('experience').value.trim(),
                salary: Number(document.getElementById('salary').value) || 0,
                category: document.getElementById('category').value,
                tags: tags,
                age: document.getElementById('age').value.trim(),
                location: document.getElementById('location').value.trim(),
                reason: document.getElementById('reason').value.trim(),
                general_info: document.getElementById('general_info').value.trim(),
                test_exp: document.getElementById('test_exp').value.trim(),
                api_exp: document.getElementById('api_exp').value.trim()
            };

            try {
                const res = await fetch('http://localhost:3000/candidates', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(candidateData)
                });
                
                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(`HTTP ${res.status}: ${errorText}`);
                }
                
                const newCandidate = await res.json();

                const updateRes = await fetch(`http://localhost:3000/users/${currentUser.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ candidateId: newCandidate.id })
                });
                
                if (!updateRes.ok) {
                    const errorText = await updateRes.text();
                    throw new Error(`Не удалось обновить пользователя: HTTP ${updateRes.status}: ${errorText}`);
                }
                
                const updatedUser = await updateRes.json();
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));

                form.style.display = 'none';
                document.getElementById('successMessage').style.display = 'flex';

            } catch (err) {
                console.error('Ошибка:', err);
                alert(`Не удалось сохранить профиль: ${err.message}`);
                btn.disabled = false;
                btn.textContent = 'Сохранить профиль';
            }
        });
    }
});
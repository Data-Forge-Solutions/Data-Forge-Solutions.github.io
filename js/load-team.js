window.addEventListener('DOMContentLoaded', () => {
    fetch('data/team.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('team-container');
            if (!container) return;
            data.members.forEach((member, index) => {
                const card = document.createElement('div');
                card.className = 'card mb-4 shadow-sm';

                const row = document.createElement('div');
                row.className = 'row g-0';
                card.appendChild(row);

                const imgCol = document.createElement('div');
                imgCol.className = 'col-md-3 text-center p-3';
                row.appendChild(imgCol);

                const img = document.createElement('img');
                img.src = member.avatar;
                img.alt = member.name;
                img.className = 'rounded-circle img-fluid';
                img.onerror = () => { img.src = 'assets/default-avatar.png'; };
                imgCol.appendChild(img);

                const bodyCol = document.createElement('div');
                bodyCol.className = 'col-md-9';
                row.appendChild(bodyCol);

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';
                bodyCol.appendChild(cardBody);

                const header = document.createElement('div');
                header.className = 'd-flex justify-content-between align-items-start mb-2';
                cardBody.appendChild(header);

                const title = document.createElement('div');
                title.innerHTML = `<h3 class="card-title mb-0 h3 neon-gradient-icon neon-delay-2">${member.name}</h3><p class="card-subtitle text-body-secondary">${member.role}</p>`;
                header.appendChild(title);

                const ghLink = document.createElement('a');
                ghLink.href = member.github;
                ghLink.target = '_blank';
                ghLink.rel = 'noopener';
                ghLink.title = `${member.name}'s GitHub Profile`;
                ghLink.className = 'text-decoration-none fs-4 ms-2';
                ghLink.setAttribute('aria-label', 'GitHub Profile');
                ghLink.innerHTML = '<i class="bi bi-github neon-gradient-icon neon-delay-1"></i>';
                header.appendChild(ghLink);

                const bio = document.createElement('p');
                bio.className = 'card-text';
                bio.textContent = member.bio;
                cardBody.appendChild(bio);

                const gpg = document.createElement('section');
                gpg.className = 'gpg-key bg-body-tertiary text-body border rounded p-3';
                const fpId = `fp-${index}`;
                gpg.innerHTML = `
                    <details>
                        <summary class="h6" title="Click to view the developer's GPG key details">🔐 GPG Public Key <small class='text-muted'>(What is this?)</small></summary>
                        <div class="mt-2">
                            <p class="mb-1"><strong>Fingerprint:</strong><br>
                                <span id="${fpId}" class="gpg-fingerprint">${member.fingerprint}</span>
                                <button class="btn btn-sm btn-copy ms-2 copy-btn" data-fingerprint="${member.fingerprint}" style="border: none; background: none; color: white;">
                                    <i class="bi bi-clipboard"></i>
                                </button>
                            </p>
                            <div class="d-flex flex-wrap gap-3 align-items-center my-2">
                                <a href="/${member.keyFile}" download class="btn btn-sm btn-outline-success d-flex align-items-center gap-2">
                                    <i class="bi bi-download"></i> Download Public Key .asc File
                                </a>
                                <a href="${member.keySearch}" target="_blank" rel="noopener" class="btn btn-sm btn-outline-info d-flex align-items-center gap-2">
                                    <i class="bi bi-box-arrow-up-right"></i> This key is also available from: keys.openpgp.org
                                </a>
                            </div>
                            <p class="small text-muted mb-0">Use this key to verify signed messages or send secure communication.</p>
                        </div>
                    </details>`;
                cardBody.appendChild(gpg);

                // Clipboard copy handler with icon change
                const copyBtn = gpg.querySelector('.copy-btn');
                if (copyBtn) {
                    copyBtn.addEventListener('click', () => {
                        const text = copyBtn.getAttribute('data-fingerprint');
                        navigator.clipboard.writeText(text).then(() => {
                            const icon = copyBtn.querySelector('i');
                            if (icon) {
                                icon.classList.remove('bi-clipboard');
                                icon.classList.add('bi-check');
                            }
                            setTimeout(() => {
                                if (icon) {
                                    icon.classList.remove('bi-check');
                                    icon.classList.add('bi-clipboard');
                                }
                            }, 2000);
                        });
                    });
                }

                container.appendChild(card);
            });
        })
        .catch(err => console.error('Failed to load team data', err));
});

// window.addEventListener('DOMContentLoaded', () => {
//     fetch('data/team.json')
//         .then(response => response.json())
//         .then(data => {
//             const container = document.getElementById('team-container');
//             if (!container) return;
//             data.members.forEach(member => {
//                 const card = document.createElement('div');
//                 card.className = 'card mb-4 shadow-sm';

//                 const row = document.createElement('div');
//                 row.className = 'row g-0';
//                 card.appendChild(row);

//                 const imgCol = document.createElement('div');
//                 imgCol.className = 'col-md-3 text-center p-3';
//                 row.appendChild(imgCol);

//                 const img = document.createElement('img');
//                 img.src = member.avatar;
//                 img.alt = member.name;
//                 img.className = 'rounded-circle img-fluid';
//                 imgCol.appendChild(img);

//                 const bodyCol = document.createElement('div');
//                 bodyCol.className = 'col-md-9';
//                 row.appendChild(bodyCol);

//                 const cardBody = document.createElement('div');
//                 cardBody.className = 'card-body';
//                 bodyCol.appendChild(cardBody);

//                 const header = document.createElement('div');
//                 header.className = 'd-flex justify-content-between align-items-start mb-2';
//                 cardBody.appendChild(header);

//                 const title = document.createElement('div');
//                 title.innerHTML = `<h5 class="card-title mb-0">${member.name}</h5><p class="card-subtitle text-body-secondary">${member.role}</p>`;
//                 header.appendChild(title);

//                 const ghLink = document.createElement('a');
//                 ghLink.href = member.github;
//                 ghLink.target = '_blank';
//                 ghLink.rel = 'noopener';
//                 ghLink.className = 'text-decoration-none fs-4 ms-2';
//                 ghLink.setAttribute('aria-label', 'GitHub Profile');
//                 ghLink.innerHTML = '<i class="bi bi-github neon-gradient-icon neon-delay-1"></i>';
//                 header.appendChild(ghLink);

//                 const bio = document.createElement('p');
//                 bio.className = 'card-text';
//                 bio.textContent = member.bio;
//                 cardBody.appendChild(bio);

//                 const gpg = document.createElement('section');
//                 gpg.className = 'gpg-key bg-body-tertiary text-body border rounded p-3';
//                 gpg.innerHTML = `
//                     <h6 class="text-primary">🔐 GPG Public Key</h6>
//                     <p class="mb-1"><strong>Fingerprint:</strong><br>${member.fingerprint}</p>
//                     <p class="mb-1">📄 <a href="/${member.keyFile}" download>Download Public Key (.asc)</a></p>
//                     <p class="mb-1">📥 This key is also available from:<br><a href="${member.keySearch}" target="_blank" rel="noopener">keys.openpgp.org</a></p>
//                     <p class="small text-muted mb-0">Use this key to verify signed messages and software, or to send encrypted communication securely.</p>
//                 `;
//                 cardBody.appendChild(gpg);

//                 const col = document.createElement('div');
//                 col.className = 'col';
//                 col.appendChild(card);
//                 container.appendChild(col);
//             });
//         })
//         .catch(err => console.error('Failed to load team data', err));
// });